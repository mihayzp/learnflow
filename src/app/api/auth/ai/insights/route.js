import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { AILearningEngine } from '@/lib/ai/openai'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 })
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

    // Generate AI insights
    const insights = await AILearningEngine.generateLearningInsights(profile, progress)
    
    // Generate study recommendations
    const recommendations = AILearningEngine.generateStudyRecommendations(progress, profile)

    return NextResponse.json({
      insights: insights.insights,
      aiRecommendations: insights.recommendations,
      studyRecommendations: recommendations,
      profile,
      progress
    })
  } catch (error) {
    console.error('Error generating insights:', error)
    return NextResponse.json({ error: 'Failed to generate insights' }, { status: 500 })
  }
}