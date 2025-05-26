'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Navigation } from '@/components/ui/Navigation'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [topic, setTopic] = useState('')
  const [level, setLevel] = useState('beginner')
  const [topics, setTopics] = useState([])
  const router = useRouter()

  useEffect(() => {
    const localUser = localStorage.getItem('learnflow-user')
    if (localUser) setUser(JSON.parse(localUser))

    const progress = JSON.parse(localStorage.getItem('lessonProgress') || '[]')

    const uniqueTopics = Array.from(new Set(progress.map(p => `${p.topic.toLowerCase()}__${p.level}`))).map(str => {
      const [topic, level] = str.split('__')
      return { topic, level }
    })

    setTopics(uniqueTopics)
    setLoading(false)
  }, [])

  const handleContinue = (topic, level) => {
    localStorage.setItem('latestTopic', topic)
    localStorage.setItem('latestLevel', level)
    router.push('/lesson/plan')
  }

  const handleStart = () => {
    if (!topic) return alert('Please enter a topic')
    localStorage.setItem('latestTopic', topic)
    localStorage.setItem('latestLevel', level)
    router.push('/lesson/setup')
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Learner'}! 👋</h1>
        <p className="text-white/70">Here’s your learning journey:</p>

        {/* Start New Topic */}
        <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
          <h3 className="text-xl font-bold mb-4">Start a New Topic</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic (e.g. JavaScript)"
              className="w-full p-3 rounded border border-white/30 bg-white/10 text-white placeholder-white/50"
            />
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-3 rounded border border-white/30 bg-white/10 text-white"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <Button onClick={handleStart}>Start Learning</Button>
          </div>
        </div>

        {/* Existing Topics */}
        <div>
          <h3 className="text-xl font-bold mb-4">Your Learning Topics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {topics.map(({ topic, level }, i) => {
              const pathKey = `learningPath:${topic.toLowerCase()}:${level}`
              const path = JSON.parse(localStorage.getItem(pathKey) || '[]')
              const done = path.filter(p => p.completed).length
              const total = path.length
              const percent = total > 0 ? (done / total) * 100 : 0

              const progress = JSON.parse(localStorage.getItem('lessonProgress') || '[]')
                .filter(p => p.topic === topic && p.level === level)
              const correct = progress.reduce((acc, p) => acc + p.score, 0)
              const totalQ = progress.reduce((acc, p) => acc + p.total, 0)
              const accuracy = totalQ ? Math.round((correct / totalQ) * 100) : 0

              return (
                <div key={i} className="bg-white/10 p-5 rounded-xl border border-white/20 shadow">
                  <h4 className="text-lg font-semibold">{topic.charAt(0).toUpperCase() + topic.slice(1)} ({level})</h4>
                  <p className="text-sm text-white/60 mt-1">{done}/{total} lessons completed</p>
                  <p className="text-sm text-white/50 mt-1">Accuracy: {accuracy}%</p>
                  <div className="h-2 bg-white/20 rounded mt-2">
                    <div className="h-full bg-emerald-400 rounded" style={{ width: `${percent}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-4 space-x-2">
                    <Button size="sm" onClick={() => handleContinue(topic, level)}>
                      Continue
                    </Button>
                    <button onClick={() => router.push('/lesson/plan')} className="text-xs text-white/70 hover:underline">
                      View Plan
                    </button>
                    <button onClick={() => router.push('/lesson/review')} className="text-xs text-white/70 hover:underline">
                      Review
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
