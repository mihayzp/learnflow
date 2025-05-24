'use client'

import { useState } from 'react'
import { Brain, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    learningStyle: '',
    goals: [],
    timePreference: ''
  })

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const completeOnboarding = () => {
    // Save user profile
    const userProfile = {
      ...formData,
      completedOnboarding: true,
      createdAt: new Date().toISOString(),
      id: Date.now()
    }
    
    localStorage.setItem('learnflow-user', JSON.stringify(userProfile))
    
    // Initialize user progress
    const initialProgress = {
      completedLessons: 0,
      totalMinutes: 0,
      currentStreak: 0,
      averageAccuracy: 0,
      startedAt: new Date().toISOString()
    }
    
    localStorage.setItem('learnflow-progress', JSON.stringify(initialProgress))
    
    // Redirect to dashboard
    window.location.href = '/dashboard'
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-10 h-10 text-emerald-400 mr-3" />
              <h1 className="text-3xl font-bold text-white">LearnFlow</h1>
            </div>
            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i <= step ? 'bg-emerald-400 scale-110' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <p className="text-white/80">Let&apos;s personalize your learning experience</p>
          </div>

          {/* Step Content */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            {step === 1 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-6">What should we call you?</h2>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-emerald-400 focus:outline-none text-lg"
                  autoFocus
                />
                <div className="mt-8">
                  <Button 
                    onClick={nextStep} 
                    disabled={!formData.name.trim()}
                    className="w-full text-lg py-4"
                  >
                    Continue
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  How do you learn best, {formData.name}?
                </h2>
                <div className="space-y-4">
                  {[
                    { id: 'visual', label: '👁️ Visual Learner', desc: 'I learn best with diagrams, examples, and visual aids' },
                    { id: 'hands-on', label: '🖐️ Hands-on Learner', desc: 'I learn by doing, practicing, and experimenting' },
                    { id: 'explain', label: '💬 Explanation Learner', desc: 'I learn through detailed explanations and discussions' },
                    { id: 'fast', label: '⚡ Quick Learner', desc: 'Give me the key points fast and let me practice' }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => {
                        updateFormData('learningStyle', style.id)
                        setTimeout(nextStep, 200)
                      }}
                      className="w-full p-6 text-left bg-white/5 hover:bg-white/15 border border-white/20 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-white font-bold text-lg mb-2">{style.label}</div>
                      <div className="text-white/70">{style.desc}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex justify-between">
                  <Button variant="secondary" onClick={prevStep}>
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    Back
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  What would you like to master first?
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'python', label: '🐍 Python Programming', popular: true },
                    { id: 'ai', label: '🤖 AI & Machine Learning', trending: true },
                    { id: 'web', label: '🌐 Web Development' },
                    { id: 'data', label: '📊 Data Science' },
                    { id: 'design', label: '🎨 UI/UX Design' },
                    { id: 'business', label: '💼 Business Skills' }
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => {
                        updateFormData('goals', [goal.id])
                        setTimeout(nextStep, 200)
                      }}
                      className="relative p-6 bg-white/5 hover:bg-white/15 border border-white/20 rounded-xl transition-all duration-300 hover:scale-105 text-center"
                    >
                      <div className="text-white font-semibold text-lg">{goal.label}</div>
                      {goal.popular && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-1 rounded-full text-white font-semibold">
                          Popular
                        </span>
                      )}
                      {goal.trending && (
                        <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-2 py-1 rounded-full text-white font-semibold">
                          Hot
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex justify-between">
                  <Button variant="secondary" onClick={prevStep}>
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    Back
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎉</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Perfect! You&apos;re all set, {formData.name}!
                  </h2>
                  <p className="text-white/80 text-lg">Your personalized learning journey is ready to begin.</p>
                </div>
                
                {/* Profile Summary */}
                <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl p-6 mb-8 border border-emerald-400/30">
                  <h3 className="text-emerald-400 font-bold mb-4">Your Learning Profile</h3>
                  <div className="space-y-2 text-white/90">
                    <div>
                      <strong>Learning Style:</strong> {
                        formData.learningStyle === 'visual' ? 'Visual Learner' :
                        formData.learningStyle === 'hands-on' ? 'Hands-on Learner' :
                        formData.learningStyle === 'explain' ? 'Explanation Learner' :
                        'Quick Learner'
                      }
                    </div>
                    <div>
                      <strong>First Goal:</strong> {
                        formData.goals[0] === 'python' ? 'Python Programming' :
                        formData.goals[0] === 'ai' ? 'AI & Machine Learning' :
                        formData.goals[0] === 'web' ? 'Web Development' :
                        formData.goals[0] === 'data' ? 'Data Science' :
                        formData.goals[0] === 'design' ? 'UI/UX Design' :
                        'Business Skills'
                      }
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={completeOnboarding}
                    className="w-full text-lg py-4"
                  >
                    Start My First Lesson
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <p className="text-white/60 text-sm">
                    ✨ AI will adapt your lessons based on your progress and learning style
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}