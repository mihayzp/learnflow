'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export default function LessonPage() {
  const [lesson, setLesson] = useState(null)
  const [stepIndex, setStepIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const topic = localStorage.getItem('latestTopic')
    const level = localStorage.getItem('latestLevel')
    const raw = localStorage.getItem(`latestLesson:${topic}:${level}`)
    if (!raw) {
      router.push('/dashboard')
      return
    }

    const parsed = JSON.parse(raw)
    if (!parsed || !parsed.steps || !Array.isArray(parsed.steps)) {
      router.push('/dashboard')
      return
    }

    setLesson(parsed)
  }, [router])

  if (!lesson) {
    return <div className="text-white p-6">Loading lesson...</div>
  }

  const step = lesson.steps[stepIndex]

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">{lesson.lesson_title}</h1>
      <div className="bg-white/10 p-6 rounded-xl border border-white/20 mb-6">
        <h2 className="text-xl font-semibold mb-2">Step {step.step_number}: {step.topic}</h2>
        <p className="text-white/80">{step.content}</p>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={() => setStepIndex(prev => Math.max(0, prev - 1))}
          disabled={stepIndex === 0}
        >
          ← Previous
        </Button>
        {stepIndex < lesson.steps.length - 1 ? (
          <Button onClick={() => setStepIndex(prev => prev + 1)}>
            Next →
          </Button>
        ) : (
          <Button onClick={() => router.push('/lesson/test')}>
            Proceed to Quiz →
          </Button>
        )}
      </div>
    </div>
  )
}
