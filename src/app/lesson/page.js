'use client'

import { useState } from 'react'
import { Brain, ArrowLeft, CheckCircle, Clock, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Navigation } from '@/components/ui/Navigation'

export default function LessonPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [lessonComplete, setLessonComplete] = useState(false)

  const lesson = {
    title: "Python Variables Made Simple",
    difficulty: 2,
    estimatedTime: 5,
    steps: [
      {
        type: 'concept',
        title: 'What are Variables?',
        content: 'Variables are like labeled containers that store data. In Python, you create them by assigning a value using the = sign.',
        codeExample: `name = "Alice"\nage = 25\nis_student = True`
      },
      {
        type: 'interactive',
        title: 'Quick Check',
        question: 'Which of these creates a variable correctly in Python?',
        options: [
          'name = "John"',
          '"John" = name',
          'var name = "John"',
          'name := "John"'
        ],
        correct: 0,
        explanation: 'Correct! In Python, we use = to assign values to variables, with the variable name on the left.'
      },
      {
        type: 'practice',
        title: 'Try It Yourself',
        task: 'Create a variable called favorite_color and set it to your favorite color',
        hint: 'Remember to use quotes for text values',
        solution: 'favorite_color = "blue"'
      }
    ]
  }

  const currentContent = lesson.steps[currentStep]
  const progress = ((currentStep + 1) / lesson.steps.length) * 100

  const handleAnswer = (answerIndex) => {
    const correct = answerIndex === currentContent.correct
    setIsCorrect(correct)
    setShowFeedback(true)
    
    setTimeout(() => {
      nextStep()
    }, 2000)
  }

  const nextStep = () => {
    setShowFeedback(false)
    setUserAnswer('')
    
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setLessonComplete(true)
    }
  }

  const completeLesson = () => {
    // Store completion data
    const completionData = {
      lessonId: 'python-variables-1',
      completedAt: new Date().toISOString(),
      accuracy: 0.95,
      timeSpent: 4.5
    }
    
    // Save to localStorage
    const existingCompletions = JSON.parse(localStorage.getItem('learnflow-completions') || '[]')
    existingCompletions.push(completionData)
    localStorage.setItem('learnflow-completions', JSON.stringify(existingCompletions))
    
    // Redirect to completion page
    window.location.href = '/lesson/complete'
  }

  if (lessonComplete) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Complete!</h2>
              <p className="text-white/80 mb-8">
                You&apos;ve finished all the lesson steps. Let&apos;s see your results!
              </p>
              <Button onClick={completeLesson} className="w-full">
                See My Results
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <Navigation />
    
    <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="flex items-center text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <div className="flex items-center">
              <Brain className="w-6 h-6 text-emerald-400 mr-2" />
              <span className="text-white font-semibold">LearnFlow</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
              <div className="flex items-center text-white/70">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{lesson.estimatedTime} min</span>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-white/70 text-sm mt-2">
              Step {currentStep + 1} of {lesson.steps.length}
            </p>
          </div>

          {/* Lesson Content */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            {currentContent.type === 'concept' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  💡 {currentContent.title}
                </h3>
                <div className="text-white/90 text-lg leading-relaxed mb-6">
                  {currentContent.content}
                </div>
                {currentContent.codeExample && (
                  <div className="bg-slate-800 rounded-xl p-6 font-mono text-emerald-400 mb-8 border border-slate-700">
                    <pre className="text-sm leading-relaxed">{currentContent.codeExample}</pre>
                  </div>
                )}
                <Button onClick={nextStep} className="w-full text-lg py-4">
                  Got it! Continue
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            )}

            {currentContent.type === 'interactive' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  🤔 {currentContent.title}
                </h3>
                <div className="text-white/90 text-lg mb-8">
                  {currentContent.question}
                </div>
                
                {!showFeedback ? (
                  <div className="space-y-4">
                    {currentContent.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="w-full p-6 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-left text-white transition-all duration-300 hover:scale-105"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-4 text-sm font-semibold">
                            {String.fromCharCode(65 + index)}
                          </div>
                          {option}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className={`${isCorrect ? 'bg-green-500/20 border-green-400' : 'bg-red-500/20 border-red-400'} border rounded-2xl p-8`}>
                    <div className="flex items-center mb-4">
                      <CheckCircle className={`w-8 h-8 mr-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`} />
                      <span className={`font-bold text-xl ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {isCorrect ? 'Correct!' : 'Not quite, but good try!'}
                      </span>
                    </div>
                    <p className="text-white/90 text-lg">{currentContent.explanation}</p>
                  </div>
                )}
              </div>
            )}

            {currentContent.type === 'practice' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  ✍️ {currentContent.title}
                </h3>
                <div className="text-white/90 text-lg mb-6">
                  {currentContent.task}
                </div>
                <textarea
                  placeholder="Type your Python code here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full p-6 bg-slate-800 border border-slate-600 rounded-xl text-emerald-400 placeholder-slate-400 focus:border-emerald-400 focus:outline-none mb-4 font-mono text-lg resize-none"
                  rows="4"
                />
                <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4 mb-6">
                  <p className="text-blue-300 text-sm">
                    💡 <strong>Hint:</strong> {currentContent.hint}
                  </p>
                </div>
                <Button 
                  onClick={nextStep} 
                  className="w-full text-lg py-4"
                  disabled={!userAnswer.trim()}
                >
                  Check My Answer
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
        </main>
  </div>
)
}