'use client'

import { useState } from 'react'
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function AuthModal({ isOpen, onClose, mode = 'signin' }) {
  const [authMode, setAuthMode] = useState(mode)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate auth delay
    setTimeout(() => {
      // Mock authentication - save user to localStorage
      const user = {
        id: Date.now(),
        email: formData.email,
        name: formData.name || formData.email.split('@')[0],
        createdAt: new Date().toISOString(),
        completedOnboarding: false
      }
      
      localStorage.setItem('learnflow-user', JSON.stringify(user))
      
      // Redirect based on auth mode
      if (authMode === 'signup') {
        window.location.href = '/onboarding'
      } else {
        // For sign in, check if onboarding is complete
        const existingUser = JSON.parse(localStorage.getItem('learnflow-user') || '{}')
        if (existingUser.completedOnboarding) {
          window.location.href = '/dashboard'
        } else {
          window.location.href = '/onboarding'
        }
      }
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {authMode === 'signin' ? 'Welcome Back' : 'Join LearnFlow'}
          </h2>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-emerald-400 focus:outline-none"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-emerald-400 focus:outline-none"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-emerald-400 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <Button 
            type="submit" 
            className="w-full mt-6"
            disabled={loading}
          >
            {loading ? 'Loading...' : (authMode === 'signin' ? 'Sign In' : 'Create Account')}
          </Button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center mt-6">
          <p className="text-white/70">
            {authMode === 'signin' ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
            className="text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

        {/* Demo Note */}
        <div className="mt-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-xl">
          <p className="text-blue-300 text-sm text-center">
            🚀 This is a demo - any email/password will work!
          </p>
        </div>
      </div>
    </div>
  )
}