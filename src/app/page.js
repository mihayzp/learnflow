'use client'

import { useState } from 'react'
import { Brain, Clock, Target, Zap, ArrowRight, LogIn } from 'lucide-react'
import { AuthModal } from '@/components/auth/authModal'


export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('signup')

  const openAuth = (mode) => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="w-8 h-8 text-emerald-400 mr-3" />
            <h1 className="text-2xl font-bold text-white">LearnFlow</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => openAuth('signin')}
              className="text-white/70 hover:text-white transition-colors flex items-center"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </button>
            <button
              onClick={() => openAuth('signup')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero */}
          <h2 className="text-5xl font-bold text-white mb-6">
            Master Any Skill in{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              5 Minutes a Day
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            AI-powered micro-learning that adapts to your brain. 
            Personalized lessons that fit your schedule.
          </p>
          
          {/* Features */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Brain, title: "AI-Powered", desc: "Adapts to you" },
              { icon: Clock, title: "5 Minutes", desc: "Perfect sessions" },
              { icon: Target, title: "Goal-Focused", desc: "Clear objectives" },
              { icon: Zap, title: "Instant Results", desc: "See progress" }
            ].map((feature, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <feature.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <button 
            onClick={() => openAuth('signup')}
            className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 flex items-center mx-auto group"
          >
            Start Learning Free
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Social Proof */}
          <div className="mt-12 flex items-center justify-center space-x-8 text-gray-400">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full border-2 border-slate-900" />
                ))}
              </div>
              <span className="ml-3 text-sm">50,000+ learners</span>
            </div>
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <span className="ml-1 text-sm">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </main>
  )
}