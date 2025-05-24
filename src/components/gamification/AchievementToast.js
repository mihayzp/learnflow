'use client'

import { useState, useEffect } from 'react'
import { Star, Trophy, Zap, Target, CheckCircle } from 'lucide-react'

export function AchievementToast({ achievement, onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (achievement) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [achievement, onClose])

  if (!achievement) return null

  const icons = {
    streak: Zap,
    completion: CheckCircle,
    accuracy: Target,
    milestone: Trophy
  }

  const Icon = icons[achievement.type] || Star

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/30 shadow-2xl max-w-sm">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 rounded-full p-3">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">Achievement Unlocked!</h3>
            <p className="text-white/90 font-semibold">{achievement.title}</p>
            <p className="text-white/80 text-sm">{achievement.description}</p>
          </div>
        </div>
        <div className="mt-4 bg-white/20 rounded-full h-1">
          <div className="bg-white h-1 rounded-full animate-pulse w-full"></div>
        </div>
      </div>
    </div>
  )
}