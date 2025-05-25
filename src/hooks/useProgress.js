'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { db } from '@/lib/supabase/client'

export function useProgress() {
  const { user } = useAuth()
  const [progress, setProgress] = useState({
    total_lessons_completed: 0,
    total_learning_minutes: 0,
    current_streak: 0,
    longest_streak: 0,
    average_accuracy: 0,
    last_lesson_date: null
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Wrap fetchUserProgress in useCallback
  const fetchUserProgress = useCallback(async () => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error } = await db.getUserProgress(user.id)
      
      if (error) throw error
      
      if (data) {
        setProgress(data)
      } else {
        // Create initial progress if none exists
        const { data: newProgress, error: createError } = await db.updateProgress(user.id, {
          total_lessons_completed: 0,
          total_learning_minutes: 0,
          current_streak: 0,
          longest_streak: 0,
          average_accuracy: 0
        })
        
        if (createError) throw createError
        if (newProgress) setProgress(newProgress)
      }
    } catch (err) {
      console.error('Error fetching progress:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [user?.id]) // Add user.id as dependency

  useEffect(() => {
    if (user) {
      fetchUserProgress()
    } else {
      setLoading(false)
    }
  }, [user, fetchUserProgress]) // Include both dependencies

  // Update progress method
  const updateProgress = async (updates) => {
    if (!user?.id) return { error: 'No user logged in' }
    
    try {
      const { data, error } = await db.updateProgress(user.id, updates)
      if (error) throw error
      
      if (data) {
        setProgress(data)
      }
      
      return { data, error: null }
    } catch (err) {
      console.error('Error updating progress:', err)
      return { data: null, error: err.message }
    }
  }

  // Complete lesson method
  const completeLesson = async (lessonId, attemptData) => {
    if (!user?.id) return { error: 'No user logged in' }
    
    try {
      // Update progress
      const newProgress = {
        total_lessons_completed: progress.total_lessons_completed + 1,
        total_learning_minutes: progress.total_learning_minutes + (attemptData.duration || 5),
        average_accuracy: ((progress.average_accuracy * progress.total_lessons_completed) + attemptData.accuracy) / (progress.total_lessons_completed + 1),
        last_lesson_date: new Date().toISOString()
      }
      
      // Update streak
      const today = new Date().toDateString()
      const lastLesson = progress.last_lesson_date ? new Date(progress.last_lesson_date).toDateString() : null
      
      if (lastLesson !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString()
        if (lastLesson === yesterday) {
          newProgress.current_streak = progress.current_streak + 1
          newProgress.longest_streak = Math.max(progress.longest_streak, newProgress.current_streak)
        } else {
          newProgress.current_streak = 1
        }
      }
      
      const { error } = await updateProgress(newProgress)
      if (error) throw error
      
      return { success: true, error: null }
    } catch (err) {
      console.error('Error completing lesson:', err)
      return { success: false, error: err.message }
    }
  }

  return {
    progress,
    loading,
    error,
    updateProgress,
    completeLesson,
    refetch: fetchUserProgress
  }
} // This closing brace was missing