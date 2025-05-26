'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export default function LearningPlanPage() {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const topic = localStorage.getItem('latestTopic')
    const level = localStorage.getItem('latestLevel')
    const key = `learningPath:${topic}:${level}`

    const stored = localStorage.getItem(key)
    if (stored) {
      setLessons(JSON.parse(stored))
    }
    setLoading(false)
  }, [])

  const startNextLesson = async () => {
    const topic = localStorage.getItem('latestTopic')
    const level = localStorage.getItem('latestLevel')
    const key = `learningPath:${topic}:${level}`
    const path = JSON.parse(localStorage.getItem(key) || '[]')
    const nextLesson = path.find(p => !p.completed)?.title

    if (!nextLesson) {
      alert('All lessons complete!');
      return;
    }

    const res = await fetch('/api/auth/generateLesson', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, level, nextLessonTitle: nextLesson }),
    })

    const data = await res.json()
    if (!res.ok || !data.lesson) {
      alert('Lesson generation failed')
      return
    }

    localStorage.setItem(`latestLesson:${topic}:${level}`, JSON.stringify(data.lesson))
    localStorage.setItem(`nextLessonTitle:${topic}:${level}`, nextLesson)
    router.push('/lesson')
  }

  if (loading) return <div className="text-white p-8">Loading plan...</div>

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Your Learning Plan</h1>
      <p className="text-white/70 mb-6">Here’s your personalized path. Start learning when you&apos;re ready!</p>

      <ul className="space-y-4 mb-6">
        {lessons.map((step, i) => (
          <li key={i} className="bg-white/10 p-4 rounded border border-white/20 flex justify-between items-center">
            <span>
              {step.completed ? '✅' : '🟩'} {step.title || step}
            </span>
            {step.completed && (
              <span className="text-sm text-white/50">Completed</span>
            )}
          </li>
        ))}
      </ul>

      <Button onClick={startNextLesson} className="px-6 py-3">
        Start Next Lesson →
      </Button>
    </div>
  )
}
