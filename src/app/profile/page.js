'use client'

import { useState, useEffect } from 'react'
import { User, Save, ArrowLeft, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Navigation } from '@/components/ui/Navigation'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [progress, setProgress] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = JSON.parse(localStorage.getItem('learnflow-user') || 'null')
      const savedProgress = JSON.parse(localStorage.getItem('learnflow-progress') || '{}')
      
      if (!savedUser) {
        window.location.href = '/'
        return
      }
      
      setUser(savedUser)
      setProgress(savedProgress)
      setIsLoaded(true)
    }
  }, [])

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
      localStorage.removeItem('learnflow-progress')
      localStorage.removeItem('learnflow-completions')
      localStorage.removeItem('learnflow-achievements')
      localStorage.removeItem('learnflow-activity')
      
      // Reset to initial state
      const initialProgress = {
        completedLessons: 0,
        totalMinutes: 0,
        currentStreak: 0,
        averageAccuracy: 0,
        startedAt: new Date().toISOString()
      }
      
      localStorage.setItem('learnflow-progress', JSON.stringify(initialProgress))
      alert('Progress reset successfully!')
      window.location.reload()
    }
  }

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="flex items-center text-white/70 hover:text-white transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-3xl font-bold text-white">Profile & Settings</h1>
          </div>

          {/* Profile Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mr-6">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="text-white/70">{user.learningStyle} learner</p>
                <p className="text-white/60 text-sm">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Learning Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-3">Learning Style</h3>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-emerald-400 font-medium">
                    {user.learningStyle.charAt(0).toUpperCase() + user.learningStyle.slice(1)} Learner
                  </p>
                  <p className="text-white/70 text-sm mt-1">
                    {user.learningStyle === 'visual' && 'You learn best with diagrams and visual aids'}
                    {user.learningStyle === 'hands-on' && 'You learn best by doing and practicing'}
                    {user.learningStyle === 'explain' && 'You learn best through detailed explanations'}
                    {user.learningStyle === 'fast' && 'You prefer quick, essential information'}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-3">Primary Goal</h3>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-blue-400 font-medium">
                    {user.goals[0] === 'python' && 'Python Programming'}
                    {user.goals[0] === 'ai' && 'AI & Machine Learning'}
                    {user.goals[0] === 'web' && 'Web Development'}
                    {user.goals[0] === 'data' && 'Data Science'}
                    {user.goals[0] === 'design' && 'UI/UX Design'}
                    {user.goals[0] === 'business' && 'Business Skills'}
                  </p>
                  <p className="text-white/70 text-sm mt-1">
                    {Math.round((progress.completedLessons || 0) / 10 * 100)}% complete
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Summary */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 mb-8">
            <h3 className="text-xl font-bold text-white mb-6">Progress Summary</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{progress.completedLessons || 0}</div>
                <div className="text-white/70 text-sm">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{progress.totalMinutes || 0}m</div>
                <div className="text-white/70 text-sm">Time Invested</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{progress.currentStreak || 0}</div>
                <div className="text-white/70 text-sm">Current Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{progress.averageAccuracy || 0}%</div>
                <div className="text-white/70 text-sm">Avg Accuracy</div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-500/10 backdrop-blur-sm rounded-3xl p-8 border border-red-400/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">Reset Progress</h3>
            <p className="text-white/70 mb-6">
              This will permanently delete all your learning progress, completed lessons, and achievements. 
              This action cannot be undone.
            </p>
            
            <Button
              onClick={resetProgress}
              variant="secondary"
              className="bg-red-500/20 border-red-400 text-red-400 hover:bg-red-500/30"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset All Progress
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}