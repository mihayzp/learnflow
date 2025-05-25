'use client'

import { useState, useEffect } from 'react'
import { Clock, Target, TrendingUp, Play, Award, Zap, Star, User, Brain, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Navigation } from '@/components/ui/Navigation'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for user in localStorage (fallback)
    const localUser = localStorage.getItem('learnflow-user')
    if (localUser) {
      setUser(JSON.parse(localUser))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Welcome to LearnFlow</h2>
          <p className="text-white/70 mb-6">Please sign in to continue</p>
          <Button onClick={() => window.location.href = '/'}>
            Go to Homepage
          </Button>
        </div>
      </div>
    )
  }

  // Mock data for testing
  const progress = {
    total_lessons_completed: 3,
    total_learning_minutes: 15,
    current_streak: 2,
    average_accuracy: 0.87
  }

  const nextLesson = {
    id: '1',
    title: 'Python Variables Made Simple',
    difficulty: 2,
    estimated_duration: 5
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {getGreeting()}, {user.name || user.full_name || 'Learner'}! 👋
          </h1>
          <p className="text-white/70 text-lg">
            Ready for your next 5-minute learning boost?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <div className="text-2xl font-bold text-emerald-400">{progress.total_lessons_completed}</div>
            <div className="text-white/70 text-sm">Lessons</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <div className="text-2xl font-bold text-blue-400">{progress.total_learning_minutes}m</div>
            <div className="text-white/70 text-sm">Time</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <div className="text-2xl font-bold text-purple-400">{progress.current_streak}</div>
            <div className="text-white/70 text-sm">Streak</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <div className="text-2xl font-bold text-yellow-400">{Math.round(progress.average_accuracy * 100)}%</div>
            <div className="text-white/70 text-sm">Accuracy</div>
          </div>
        </div>

        {/* Today's Lesson */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Today&apos;s Lesson</h3>
              <p className="text-white/70">Personalized for your learning style</p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-emerald-400 mb-2">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-semibold">{nextLesson.estimated_duration} minutes</span>
              </div>
              <div className="text-white/70 text-sm">Perfect timing</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/20 to-blue-600/20 rounded-2xl p-6 border border-emerald-400/30">
            <h4 className="text-xl font-bold text-white mb-2">{nextLesson.title}</h4>
            <p className="text-white/80 mb-6">
              Difficulty: {nextLesson.difficulty}/5 • Interactive coding exercises
            </p>
            
            <Button
              onClick={() => window.location.href = '/lesson'}
              className="flex items-center text-lg px-8 py-4"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Learning
            </Button>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-emerald-400" />
            AI Learning Insights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-400/30">
              <h4 className="font-semibold text-white mb-2">Your Learning Pattern</h4>
              <p className="text-white/80 text-sm">
                You perform best with hands-on exercises in the morning. Your accuracy increases 23% with interactive content.
              </p>
            </div>
            <div className="bg-green-500/20 rounded-xl p-4 border border-green-400/30">
              <h4 className="font-semibold text-white mb-2">Progress Prediction</h4>
              <p className="text-white/80 text-sm">
                At your current pace, you&apos;ll complete Python basics in 8 days. Keep up the great momentum!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}