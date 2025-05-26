'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export default function TestPage() {
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const topic = localStorage.getItem('latestTopic')
    const level = localStorage.getItem('latestLevel')
    const raw = localStorage.getItem(`latestLesson:${topic}:${level}`)
    const lesson = raw ? JSON.parse(raw) : null

    if (!lesson?.steps || !Array.isArray(lesson.steps)) {
      console.warn('Invalid lesson or no steps')
      router.push('/dashboard')
      return
    }

    const questions = lesson.steps.map(step => ({
      question: step.topic || 'What does this step cover?',
      answer: step.content,
      options: [step.content, 'Incorrect A', 'Incorrect B', 'Incorrect C'].sort(() => Math.random() - 0.5)
    }))

    setQuestions(questions)
  }, [router])

  const handleAnswer = (option) => {
    if (selected) return
    setSelected(option)
    if (option === questions[index].answer) {
      setScore(score + 1)
    }
  }

  const next = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1)
      setSelected(null)
    } else {
      saveProgress()
      setShowResults(true)
    }
  }

  const saveProgress = () => {
    const topic = localStorage.getItem('latestTopic')
    const level = localStorage.getItem('latestLevel')
    const title = localStorage.getItem(`nextLessonTitle:${topic}:${level}`)

    const entry = {
      topic,
      level,
      lessonTitle: title,
      score,
      total: questions.length,
      date: new Date().toISOString()
    }

    const prev = JSON.parse(localStorage.getItem('lessonProgress') || '[]')
    const filtered = prev.filter(p => !(p.topic === topic && p.level === level && p.lessonTitle === title))
    filtered.push(entry)
    localStorage.setItem('lessonProgress', JSON.stringify(filtered))

    const pathKey = `learningPath:${topic}:${level}`
    const path = JSON.parse(localStorage.getItem(pathKey) || '[]')
    const updated = path.map(p => p.title === title ? { ...p, completed: true } : p)
    localStorage.setItem(pathKey, JSON.stringify(updated))
  }

  if (!questions.length && !showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        Loading quiz...
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete</h2>
        <p>You scored {score} out of {questions.length}</p>
        <Button onClick={() => router.push('/dashboard')}>Return to Dashboard</Button>
      </div>
    )
  }

  const q = questions[index]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <h2 className="text-xl font-bold mb-2">Question {index + 1} of {questions.length}</h2>
      <p className="mb-4 font-medium">{q.question}</p>
      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            disabled={!!selected}
            className={`block w-full text-left p-3 rounded ${
              selected
                ? opt === q.answer
                  ? 'bg-green-600'
                  : opt === selected
                  ? 'bg-red-600'
                  : 'bg-white/10'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {selected && (
        <div className="mt-6 text-right">
          <Button onClick={next}>Next</Button>
        </div>
      )}
    </div>
  )
}
