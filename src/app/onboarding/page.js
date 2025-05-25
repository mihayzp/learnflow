'use client'

import { useState, useEffect } from 'react'
import { Brain, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/components/auth/AuthProvider'

export default function OnboardingPage() {
  const { user, profile, completeOnboarding, loading: authLoading } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    full_name: '',
    learning_style: '',
    primary_goals: [],
    time_preference: ''
  })

  useEffect(() => {
    // Redirect to dashboard if onboarding already completed
    if (profile?.onboarding_completed) {
      window.location.href = '/dashboard'
    }
    
    // Pre-fill name if available
    if (user && !formData.full_name) {
      setFormData(prev => ({
        ...prev,
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || ''
      }))
    }
  }, [profile, user, formData.full_name]) 

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    window.location.href = '/'
    return null
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const handleCompleteOnboarding = async () => {
    setLoading(true)
    setError('')

    try {
      const { error: onboardingError } = await completeOnboarding(formData)
      
      if (onboardingError) {
        setError(onboardingError)
      } else {
        // Success - redirect to dashboard
        window.location.href = '/dashboard'
      }
    } catch (err) {
      setError('An error occurred during onboarding')
    } finally {
      setLoading(false)
    }
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
            <p className="text-white/80">Let&apos;s personalize your AI learning experience</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Step Content */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            {step === 1 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-6">What should we call you?</h2>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.full_name}
                  onChange={(e) => updateFormData('full_name', e.target.value)}
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:border-emerald-400 focus:outline-none text-lg"
                  autoFocus
                />
                <div className="mt-8">
                  <Button 
                    onClick={nextStep} 
                    disabled={!formData.full_name.trim()}
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
                  How do you learn best, {formData.full_name}?
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
                        updateFormData('learning_style', style.id)
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
                    { id: 'javascript', label: '⚡ JavaScript', trending: true },
                    { id: 'react', label: '⚛️ React Development' },
                    { id: 'data-science', label: '📊 Data Science' },
                    { id: 'web-dev', label: '🌐 Web Development' },
                    { id: 'ai-ml', label: '🤖 AI & ML' }
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => {
                        updateFormData('primary_goals', [goal.id])
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
                    Perfect! You&apos;re all set, {formData.full_name}!
                  </h2>
                  <p className="text-white/80 text-lg">Your AI-powered learning journey is ready to begin.</p>
                </div>
                
                {/* Profile Summary */}
                <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl p-6 mb-8 border border-emerald-400/30">
                  <h3 className="text-emerald-400 font-bold mb-4">Your Learning Profile</h3>
                  <div className="space-y-2 text-white/90">
                    <div>
                      <strong>Learning Style:</strong> {
                        formData.learning_style === 'visual' ? 'Visual Learner' :
                        formData.learning_style === 'hands-on' ? 'Hands-on Learner' :
                        formData.learning_style === 'explain' ? 'Explanation Learner' :
                        'Quick Learner'
                      }
                    </div>
                    <div>
                      <strong>First Goal:</strong> {
                        formData.primary_goals[0] === 'python' ? 'Python Programming' :
                        formData.primary_goals[0] === 'javascript' ? 'JavaScript' :
                        formData.primary_goals[0] === 'react' ? 'React Development' :
                        formData.primary_goals[0] === 'data-science' ? 'Data Science' :
                        formData.primary_goals[0] === 'web-dev' ? 'Web Development' :
                        'AI & Machine Learning'
                      }
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handleCompleteOnboarding}
                    className="w-full text-lg py-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Setting up your experience...
                      </>
                    ) : (
                      <>
                        Start My AI Learning Journey
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-white/60 text-sm">
                    ✨ AI will personalize every lesson based on your preferences
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