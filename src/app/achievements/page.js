'use client'

import { useState, useEffect } from 'react'
import { Brain, ArrowLeft, Trophy, Star, Lock, Zap, Target, CheckCircle } from 'lucide-react'
import { getUserAchievements, getTotalXP, ACHIEVEMENTS } from '@/lib/gamification/achievements'

export default function AchievementsPage() {
  const [unlockedAchievements, setUnlockedAchievements] = useState([])
  const [totalXP, setTotalXP] = useState(0)

  useEffect(() => {
    setUnlockedAchievements(getUserAchievements())
    setTotalXP(getTotalXP())
  }, [])

  const unlockedIds = unlockedAchievements.map(a => a.id)
  const allAchievements = Object.values(ACHIEVEMENTS)
  const unlockedCount = unlockedAchievements.length
  const totalCount = allAchievements.length

  const getIcon = (type) => {
    const icons = {
      streak: Zap,
      completion: CheckCircle,
      accuracy: Target,
      milestone: Trophy
    }
    return icons[type] || Star
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="flex items-center text-white/70 hover:text-white transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <div>
              <div className="flex items-center mb-2">
                <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
                <h1 className="text-2xl font-bold text-white">Achievements</h1>
              </div>
              <p className="text-gray-300">Track your learning milestones</p>
            </div>
          </div>

          {/* Stats */}
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{unlockedCount}/{totalCount}</div>
            <div className="text-white/70 text-sm">Achievements Unlocked</div>
            <div className="text-yellow-400 font-semibold mt-1">{totalXP} Total XP</div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Progress Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">{Math.round((unlockedCount / totalCount) * 100)}%</div>
              <div className="text-white/70 text-sm">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{unlockedCount}</div>
              <div className="text-white/70 text-sm">Unlocked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{totalCount - unlockedCount}</div>
              <div className="text-white/70 text-sm">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{totalXP}</div>
              <div className="text-white/70 text-sm">Total XP</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-blue-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allAchievements.map((achievement) => {
            const isUnlocked = unlockedIds.includes(achievement.id)
            const Icon = getIcon(achievement.type)
            const unlockedAchievement = unlockedAchievements.find(a => a.id === achievement.id)
            
            return (
              <div 
                key={achievement.id}
                className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 ${
                  isUnlocked 
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/30 hover:scale-105' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                {/* Unlock Badge */}
                {isUnlocked && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-green-500 rounded-full p-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  isUnlocked 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                    : 'bg-white/10'
                }`}>
                  {isUnlocked ? (
                    <Icon className="w-8 h-8 text-white" />
                  ) : (
                    <Lock className="w-8 h-8 text-white/50" />
                  )}
                </div>

                {/* Content */}
                <h3 className={`font-bold text-lg mb-2 ${
                  isUnlocked ? 'text-white' : 'text-white/60'
                }`}>
                  {achievement.title}
                </h3>
                
                <p className={`text-sm mb-4 ${
                  isUnlocked ? 'text-white/80' : 'text-white/40'
                }`}>
                  {achievement.description}
                </p>

                {/* XP Reward */}
                <div className="flex items-center justify-between">
                  <div className={`flex items-center ${
                    isUnlocked ? 'text-yellow-400' : 'text-white/40'
                  }`}>
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-sm font-semibold">{achievement.xp} XP</span>
                  </div>
                  
                  {isUnlocked && unlockedAchievement && (
                    <div className="text-white/60 text-xs">
                      {new Date(unlockedAchievement.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Shine Effect for Unlocked */}
                {isUnlocked && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse" />
                )}
              </div>
            )
          })}
        </div>

        {/* Next Achievement Hint */}
        {unlockedCount < totalCount && (
          <div className="mt-8 text-center">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-2">🎯 Keep Going!</h3>
              <p className="text-white/70 text-sm">
                Complete more lessons to unlock new achievements and earn XP!
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}