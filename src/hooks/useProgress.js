'use client'

import { useState, useEffect, useCallback } from 'react'

export function useProgress() {
  const [progress, setProgress] = useState({
    totalLessons: 0,
    completedLessons: 0,
    currentStreak: 3,
    longestStreak: 7,
    totalMinutes: 60,
    averageAccuracy: 0.85,
    skills: [],
    achievements: []
  })

  const [recentActivity, setRecentActivity] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Load progress from localStorage
      const savedProgress = localStorage.getItem('learnflow-progress')
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress))
      }
      
      const savedActivity = localStorage.getItem('learnflow-activity')
      if (savedActivity) {
        setRecentActivity(JSON.parse(savedActivity))
      }
      
      setIsLoaded(true)
    }
  }, [])

  const updateProgress = useCallback((newData) => {
    if (typeof window === 'undefined') return
    
    setProgress(prevProgress => {
      const updatedProgress = { ...prevProgress, ...newData }
      localStorage.setItem('learnflow-progress', JSON.stringify(updatedProgress))
      return updatedProgress
    })
  }, [])

  const addActivity = useCallback((activity) => {
    if (typeof window === 'undefined') return
    
    setRecentActivity(prevActivity => {
      const newActivity = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        ...activity
      }
      const updatedActivity = [newActivity, ...prevActivity].slice(0, 10)
      localStorage.setItem('learnflow-activity', JSON.stringify(updatedActivity))
      return updatedActivity
    })
  }, [])

  const completeLesson = useCallback((lessonData) => {
    if (typeof window === 'undefined') return
    
    updateProgress({
      completedLessons: progress.completedLessons + 1,
      totalMinutes: progress.totalMinutes + (lessonData.duration || 5)
    })
    
    addActivity({
      type: 'lesson_completed',
      title: lessonData.title,
      duration: lessonData.duration || 5,
      accuracy: lessonData.accuracy || 0.8
    })
  }, [progress.completedLessons, progress.totalMinutes, updateProgress, addActivity])

  return {
    progress,
    recentActivity,
    updateProgress,
    addActivity,
    completeLesson,
    isLoaded
  }
}