'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export default function LessonReviewPage() {
  const [progress, setProgress] = useState([])
  const router = useRouter()

  useEffect(() => {
    const raw = localStorage.getItem('lessonProgress')
    if (raw) {
      const parsed = JSON.parse(raw)
      const sorted = parsed.sort((a, b) => new Date(b.date) - new Date(a.date))
      setProgress(sorted)
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Lesson Review</h1>
      {progress.length === 0 ? (
        <p className="text-white/70">No lessons completed yet.</p>
      ) : (
        <ul className="space-y-4">
          {progress.map((entry, i) => (
            <li key={i} className="bg-white/10 p-4 rounded border border-white/20">
              <h2 className="text-lg font-semibold">{entry.lessonTitle}</h2>
              <p className="text-sm text-white/70">
                {entry.topic} ({entry.level}) — {new Date(entry.date).toLocaleString()}
              </p>
              <p className="mt-1">Score: {entry.score} / {entry.total}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <Button onClick={() => router.push('/dashboard')}>← Back to Dashboard</Button>
      </div>
    </div>
  )
}
