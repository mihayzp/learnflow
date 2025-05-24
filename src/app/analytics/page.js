'use client'

import { useState } from 'react'
import { Brain, ArrowLeft, TrendingUp, Clock, Target, Zap, Calendar, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('week')

  // Mock analytics data
  const analyticsData = {
    week: {
      lessonsCompleted: 12,
      totalTime: 60,
      averageAccuracy: 89,
      streak: 4,
      learningVelocity: 1.2,
      dailyProgress: [
        { day: 'Mon', lessons: 2, accuracy: 85 },
        { day: 'Tue', lessons: 3, accuracy: 90 },
        { day: 'Wed', lessons: 1, accuracy: 95 },
        { day: 'Thu', lessons: 2, accuracy: 88 },
        { day: 'Fri', lessons: 3, accuracy: 92 },
        { day: 'Sat', lessons: 1, accuracy: 87 },
        { day: 'Sun', lessons: 0, accuracy: 0 }
      ]
    }
  }

  const currentData = analyticsData[timeRange]

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
                <BarChart3 className="w-8 h-8 text-emerald-400 mr-3" />
                <h1 className="text-2xl font-bold text-white">Learning Analytics</h1>
              </div>
              <p className="text-gray-300">Deep insights into your learning journey</p>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex bg-white/10 rounded-xl p-1">
            {['week', 'month', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-emerald-500 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {[
            { 
              icon: Target, 
              label: 'Lessons Completed', 
              value: currentData.lessonsCompleted,
              change: '+23%',
              color: 'text-emerald-400'
            },
            { 
              icon: Clock, 
              label: 'Time Invested', 
              value: `${currentData.totalTime}m`,
              change: '+15%',
              color: 'text-blue-400'
            },
            { 
              icon: TrendingUp, 
              label: 'Avg Accuracy', 
              value: `${currentData.averageAccuracy}%`,
              change: '+5%',
              color: 'text-purple-400'
            },
            { 
              icon: Zap, 
              label: 'Current Streak', 
              value: `${currentData.streak} days`,
              change: '+1',
              color: 'text-orange-400'
            },
            { 
              icon: BarChart3, 
              label: 'Learning Velocity', 
              value: `${currentData.learningVelocity}x`,
              change: '+0.2x',
              color: 'text-pink-400'
            }
          ].map((metric, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <metric.icon className={`w-7 h-7 ${metric.color}`} />
                <span className="text-xs text-green-400 bg-green-400/20 px-2 py-1 rounded-full">
                  {metric.change}
                </span>
              </div>
              <p className="text-white/70 text-sm mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Progress Chart */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Daily Progress</h3>
            <div className="space-y-4">
              {currentData.dailyProgress.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-white/70 w-12">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2 rounded-full"
                        style={{ width: `${(day.lessons / 3) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-white text-sm w-16 text-right">
                    {day.lessons} lessons
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Accuracy Trend */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Accuracy Trend</h3>
            <div className="space-y-4">
              {currentData.dailyProgress.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-white/70 w-12">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full"
                        style={{ width: `${day.accuracy}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-white text-sm w-16 text-right">
                    {day.accuracy > 0 ? `${day.accuracy}%` : '-'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-emerald-400" />
            AI-Generated Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-500/20 rounded-xl p-6 border border-green-400/30">
              <h4 className="font-semibold text-green-400 mb-2">🎯 Peak Performance</h4>
              <p className="text-white/80 text-sm">
                You perform best on Tuesday and Friday mornings. Consider scheduling challenging lessons during these times.
              </p>
            </div>
            <div className="bg-blue-500/20 rounded-xl p-6 border border-blue-400/30">
              <h4 className="font-semibold text-blue-400 mb-2">⚡ Learning Pattern</h4>
              <p className="text-white/80 text-sm">
                Your accuracy increases by 12% when lessons include interactive examples. Keep engaging with hands-on content!
              </p>
            </div>
            <div className="bg-purple-500/20 rounded-xl p-6 border border-purple-400/30">
              <h4 className="font-semibold text-purple-400 mb-2">🚀 Recommendation</h4>
              <p className="text-white/80 text-sm">
                You&apos;re ready for advanced difficulty. Consider increasing lesson complexity to maintain growth momentum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}