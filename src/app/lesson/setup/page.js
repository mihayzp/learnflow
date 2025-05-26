'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export default function LessonSetupPage() {
  const [experience, setExperience] = useState('')
  const [goals, setGoals] = useState([])
  const [pace, setPace] = useState('daily')
  const router = useRouter()

  const toggleGoal = (goal) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    )
  }

  const handleSubmit = async () => {
    const topic = localStorage.getItem('latestTopic')
    const level = localStorage.getItem('latestLevel')

    const profile = { experience, goals, pace }
    localStorage.setItem(`userPreferences:${topic}:${level}`, JSON.stringify(profile))

    const res = await fetch('/api/auth/generatePath', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, level, preferences: profile }),
    })

    const data = await res.json()
    if (data.path) {
      const enriched = data.path.map(title => ({ title, completed: false }))
      localStorage.setItem(`learningPath:${topic}:${level}`, JSON.stringify(enriched))
      router.push('/lesson/plan')
    } else {
      alert('Failed to generate learning path')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Personalize Your Learning Plan</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">What&apos;s your experience level?</label>
        <select value={experience} onChange={e => setExperience(e.target.value)}
          className="w-full p-3 bg-white/10 border border-white/20 rounded text-white">
          <option value="">Select</option>
          <option value="none">No experience</option>
          <option value="basic">Basic familiarity</option>
          <option value="intermediate">Used in a few projects</option>
          <option value="advanced">Professional level</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">What are your goals?</label>
        <div className="space-y-2">
          {['Build a portfolio', 'Ace interviews', 'Master fundamentals', 'Career switch'].map((g, i) => (
            <label key={i} className="flex items-center space-x-2">
              <input type="checkbox" checked={goals.includes(g)} onChange={() => toggleGoal(g)} />
              <span>{g}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Preferred learning pace</label>
        <select value={pace} onChange={e => setPace(e.target.value)}
          className="w-full p-3 bg-white/10 border border-white/20 rounded text-white">
          <option value="daily">5-10 mins/day</option>
          <option value="weekly">30 mins/week</option>
          <option value="intensive">1-2 hours daily</option>
        </select>
      </div>

      <Button onClick={handleSubmit} className="px-6 py-3 mt-4">
        Generate My Plan →
      </Button>
    </div>
  )
}
