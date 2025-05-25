'use client'

import { useState, useEffect } from 'react'
import { Brain, User, LogOut, Settings, BarChart3, Trophy } from 'lucide-react'

export function Navigation() {
  const [user, setUser] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Try both Supabase user and localStorage user
      const localUser = localStorage.getItem('learnflow-user')
      if (localUser) {
        setUser(JSON.parse(localUser))
      }
    }
  }, [])

  const handleLogout = () => {
    // Clear all stored data
    localStorage.clear()
    window.location.href = '/'
  }

  if (!user) return null

  return (
    <nav className="bg-white/5 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => window.location.href = '/dashboard'}
          >
            <Brain className="w-8 h-8 text-emerald-400 mr-3" />
            <span className="text-xl font-bold text-white">LearnFlow</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="text-white/70 hover:text-white transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => window.location.href = '/analytics'}
              className="text-white/70 hover:text-white transition-colors flex items-center"
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Analytics
            </button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden md:block">{user.name || user.full_name || 'User'}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg z-50">
                <div className="py-2">
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="text-white font-semibold">{user.name || user.full_name || 'User'}</p>
                    <p className="text-white/60 text-sm">{user.learning_style || 'learner'}</p>
                  </div>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}