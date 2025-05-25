'use client'

import { useState, useEffect, useCallback } from 'react'
import { db } from '@/lib/supabase/client'

export function useLessons(skillSlug = 'python-fundamentals') {
  const [skills, setSkills] = useState([])
  const [currentSkill, setCurrentSkill] = useState(null)
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Wrap fetchSkillsAndLessons in useCallback to avoid recreating it
  const fetchSkillsAndLessons = useCallback(async () => {
    try {
      setLoading(true)
      
      // Fetch all skills
      const { data: skillsData, error: skillsError } = await db.getSkills()
      if (skillsError) throw skillsError
      
      setSkills(skillsData || [])
      
      // Fetch specific skill
      const { data: skillData, error: skillError } = await db.getSkill(skillSlug)
      if (skillError) throw skillError
      
      setCurrentSkill(skillData)
      
      // Fetch lessons for this skill
      if (skillData) {
        const { data: lessonsData, error: lessonsError } = await db.getLessons(skillData.id)
        if (lessonsError) throw lessonsError
        
        setLessons(lessonsData || [])
      }
    } catch (err) {
      console.error('Error fetching lessons:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [skillSlug]) // Add skillSlug as dependency

  useEffect(() => {
    fetchSkillsAndLessons()
  }, [fetchSkillsAndLessons]) // Now include the memoized function

  // Rest of your code remains the same...
  const getLesson = async (lessonId) => {
    try {
      const { data, error } = await db.getLesson(lessonId)
      if (error) throw error
      
      return { data, error: null }
    } catch (err) {
      console.error('Error fetching lesson:', err)
      return { data: null, error: err.message }
    }
  }

  const getNextLesson = (currentLessonOrder = 0) => {
    return lessons.find(lesson => lesson.lesson_order === currentLessonOrder + 1) || lessons[0]
  }

  const getLessonProgress = (userProgress) => {
    if (!userProgress || !lessons.length) return 0
    
    const completedLessons = userProgress.total_lessons_completed || 0
    return Math.min(100, (completedLessons / lessons.length) * 100)
  }

  return {
    skills,
    currentSkill,
    lessons,
    loading,
    error,
    getLesson,
    getNextLesson,
    getLessonProgress,
    refetch: fetchSkillsAndLessons
  }
}