import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()

// Database operations
export const db = {
  // Profile operations
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    return { data, error }
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    return { data, error }
  },

  // Progress operations
  async getUserProgress(userId) {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    return { data, error }
  },

  async updateProgress(userId, updates) {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        ...updates,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    return { data, error }
  },

  // Skills operations
  async getSkills() {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('is_active', true)
      .order('difficulty_level')
    
    return { data, error }
  },

  async getSkill(slug) {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()
    
    return { data, error }
  },

  // Lesson operations
  async getLessons(skillId) {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('skill_id', skillId)
      .eq('is_published', true)
      .order('lesson_order')
    
    return { data, error }
  },

  async getLesson(lessonId) {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', lessonId)
      .eq('is_published', true)
      .single()
    
    return { data, error }
  },

  // Lesson attempts
  async createLessonAttempt(userId, lessonId) {
    const { data, error } = await supabase
      .from('lesson_attempts')
      .insert({
        user_id: userId,
        lesson_id: lessonId,
        status: 'in_progress'
      })
      .select()
      .single()
    
    return { data, error }
  },

  async completeLessonAttempt(attemptId, results) {
    const { data, error } = await supabase
      .from('lesson_attempts')
      .update({
        completed_at: new Date().toISOString(),
        status: 'completed',
        ...results
      })
      .eq('id', attemptId)
      .select()
      .single()
    
    return { data, error }
  },

  async getUserLessonAttempts(userId, limit = 10) {
    const { data, error } = await supabase
      .from('lesson_attempts')
      .select(`
        *,
        lessons(title, skill_id),
        skills(name)
      `)
      .eq('user_id', userId)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(limit)
    
    return { data, error }
  }
}