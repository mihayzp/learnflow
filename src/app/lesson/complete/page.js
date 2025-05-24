'use client'

import { useEffect, useState } from 'react'
import { Star, TrendingUp, Award, Trophy, Home, Repeat } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function LessonCompletePage() {
  const [stats, setStats] = useState({
    accuracy: 95,
    timeSpent: 4.2,
    xpEarned: 75,
    newStreak: 4
  })
  const [isDataSaved, setIsDataSaved] = useState(false)

  useEffect(() => {
    // Get the completion data and update user progress
    const completions = JSON.parse(localStorage.getItem('learnflow-completions') || '[]')
    const currentProgress = JSON.parse(localStorage.getItem('learnflow-progress') || '{}')
    
    // Update progress
    const updatedProgress = {
      ...currentProgress,
      completedLessons: (currentProgress.completedLessons || 0) + 1,
      totalMinutes: (currentProgress.totalMinutes || 0) + stats.timeSpent,
      currentStreak: stats.newStreak,
      lastLessonDate: new Date().toISOString()
    }
    
    localStorage.setItem('learnflow-progress', JSON.stringify(updatedProgress))
    setIsDataSaved(true)
  }, [stats.timeSpent, stats.newStreak])

  const goToDashboard = () => {
    window.location.href = '/dashboard'
  }

  const takeAnotherLesson = () => {
    window.location.href = '/lesson'
  }

  if (!isDataSaved) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Saving your progress...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            {/* Success Animation */}
            <div className="mb-8">
              <div className="relative">
                <Star className="w-24 h-24 text-yellow-400 mx-auto mb-4 animate-pulse" />
                <div className="absolute inset-0 animate-ping">
                  <Star className="w-24 h-24 text-yellow-400/30 mx-auto" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white mb-3">Lesson Complete! 🎉</h2>
              <p className="text-white/80 text-xl">You just mastered Python Variables in {stats.timeSpent} minutes!</p>
            </div>
            
            {/* Performance Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-green-500/20 border border-green-400/30 rounded-2xl p-4">
                <Award className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stats.accuracy}%</div>
                <div className="text-green-400 text-sm">Accuracy</div>
              </div>
              <div className="bg-blue-500/20 border border-blue-400/30 rounded-2xl p-4">
                <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stats.timeSpent}m</div>
                <div className="text-blue-400 text-sm">Time</div>
              </div>
              <div className="bg-purple-500/20 border border-purple-400/30 rounded-2xl p-4">
                <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stats.newStreak}</div>
                <div className="text-purple-400 text-sm">Day Streak</div>
              </div>
              <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-2xl p-4">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">+{stats.xpEarned}</div>
                <div className="text-yellow-400 text-sm">XP Earned</div>
              </div>
            </div>

            {/* Progress Message */}
            <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl p-6 mb-8 border border-emerald-400/30">
              <h3 className="font-bold text-emerald-400 mb-3">🧠 What You Just Learned</h3>
              <div className="text-white/90 text-left space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  <span>How to create variables in Python</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  <span>Different data types (strings, numbers, booleans)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  <span>Proper variable naming conventions</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-4">What&apos;s Next?</h3>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-white/80 text-sm">
                  🎯 <strong>Next Lesson:</strong> Python Lists and Loops<br/>
                  ⏱️ <strong>Estimated Time:</strong> 5 minutes<br/>
                  📈 <strong>Difficulty:</strong> Beginner+
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={goToDashboard}
                className="w-full text-lg py-4 flex items-center justify-center"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Button>
              <Button 
                variant="secondary"
                onClick={takeAnotherLesson}
                className="w-full text-lg py-4 flex items-center justify-center"
              >
                <Repeat className="w-5 h-5 mr-2" />
                Take Another Lesson
              </Button>
            </div>

            {/* Encouragement */}
            <div className="mt-6 text-white/60 text-sm">
              🔥 Keep up the momentum! Daily practice leads to mastery.
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}