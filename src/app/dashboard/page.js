'use client'

import { useState, useEffect } from 'react'
import { Clock, Target, TrendingUp, Play, Award, Zap, Star, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Navigation } from '@/components/ui/Navigation'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [progress, setProgress] = useState({
    completedLessons: 0,
    totalMinutes: 0,
    currentStreak: 0,
    averageAccuracy: 85
  })
  const [recentLessons, setRecentLessons] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = JSON.parse(localStorage.getItem('learnflow-user') || 'null')
      
      if (!savedUser || !savedUser.completedOnboarding) {
        window.location.href = '/onboarding'
        return
      }
      
      setUser(savedUser)
      
      const savedProgress = JSON.parse(localStorage.getItem('learnflow-progress') || '{}')
      const completions = JSON.parse(localStorage.getItem('learnflow-completions') || '[]')
      
      setProgress({
        completedLessons: savedProgress.completedLessons || 0,
        totalMinutes: Math.round(savedProgress.totalMinutes || 0),
        currentStreak: savedProgress.currentStreak || 0,
        averageAccuracy: 85
      })
      
      setRecentLessons(completions.slice(-5).reverse())
      setIsLoaded(true)
    }
  }, [])

  if (!isLoaded || !user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your dashboard...</div>
      </main>
    )
  }

  const todayLesson = {
    id: 1,
    title: progress.completedLessons === 0 ? "Python Variables Made Simple" : "Python Lists and Loops",
    difficulty: progress.completedLessons === 0 ? 2 : 3,
    estimatedTime: 5
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
            {getGreeting()}, {user.name}! 👋
          </h1>
          <p className="text-white/70 text-lg">
            {progress.completedLessons === 0 
              ? "Ready to start your learning journey?" 
              : "Ready for your next 5-minute boost?"
            }
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{progress.completedLessons}</div>
            <div className="text-white/70 text-sm">Lessons</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{progress.totalMinutes}m</div>
            <div className="text-white/70 text-sm">Time</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{progress.currentStreak}</div>
            <div className="text-white/70 text-sm">Streak</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{progress.averageAccuracy}%</div>
            <div className="text-white/70 text-sm">Accuracy</div>
          </div>
        </div>

        {/* Main Lesson Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {progress.completedLessons === 0 ? "Your First Lesson" : "Continue Learning"}
              </h2>
              <p className="text-white/70">
                Personalized for {user.learningStyle} learners
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-emerald-400 mb-2">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-semibold">{todayLesson.estimatedTime} minutes</span>
              </div>
              <div className="text-white/70 text-sm">Perfect timing</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/20 to-blue-600/20 rounded-2xl p-6 border border-emerald-400/30">
            <h3 className="text-xl font-bold text-white mb-2">{todayLesson.title}</h3>
            <p className="text-white/80 mb-6">
              Difficulty {todayLesson.difficulty}/5 • 
              {progress.completedLessons === 0 ? " Perfect for beginners" : " Building on your progress"}
            </p>
            
            <Button
              onClick={() => window.location.href = '/lesson'}
              className="flex items-center text-lg px-8 py-4"
            >
              <Play className="w-5 h-5 mr-2" />
              {progress.completedLessons === 0 ? "Start Learning" : "Continue"}
            </Button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6">Your Learning Journey</h3>
          
          {recentLessons.length > 0 ? (
            <div className="space-y-4">
              {recentLessons.map((lesson, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <p className="text-white font-medium">Python Variables</p>
                    <p className="text-white/60 text-sm">
                      {new Date(lesson.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-emerald-400 font-semibold">✓ Complete</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Ready to Begin!</h4>
              <p className="text-white/70 mb-6">
                Start your journey into {user.goals[0] === 'python' ? 'Python programming' : 'new skills'}.
              </p>
              <Button 
                onClick={() => window.location.href = '/lesson'}
                variant="secondary"
              >
                Take First Lesson
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}