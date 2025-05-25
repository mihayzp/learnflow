import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get user progress
  const { data: progress, error: progressError } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (progressError) {
    return NextResponse.json({ error: progressError.message }, { status: 500 })
  }

  // Get recent lesson attempts
  const { data: attempts, error: attemptsError } = await supabase
    .from('lesson_attempts')
    .select(`
      *,
      lessons(title)
    `)
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .order('completed_at', { ascending: false })
    .limit(5)

  if (attemptsError) {
    return NextResponse.json({ error: attemptsError.message }, { status: 500 })
  }

  return NextResponse.json({
    progress,
    recentAttempts: attempts
  })
}

export async function POST(request) {
  const supabase = createRouteHandlerClient({ cookies })
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { lessonCompleted, timeSpent, accuracy } = body

  // Update user progress
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: user.id,
      total_lessons_completed: supabase.sql`total_lessons_completed + 1`,
      total_learning_minutes: supabase.sql`total_learning_minutes + ${timeSpent}`,
      last_lesson_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}