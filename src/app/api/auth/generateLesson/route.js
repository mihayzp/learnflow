import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req) {
  try {
    const { topic, level, nextLessonTitle } = await req.json()

    const prompt = `
Generate a concise lesson called "${nextLessonTitle}" for a ${level} learner studying ${topic}.

Break it down into 3-5 steps. Each step should include:
- step_number
- topic (what it's about)
- content (short explanation)

Return the result as a JSON object like:
{
  "lesson_title": "Introduction to Testing",
  "steps": [
    {
      "step_number": 1,
      "topic": "What is Testing?",
      "content": "..."
    },
    ...
  ]
}
Only return valid JSON.
    `.trim()

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })

    const json = JSON.parse(response.choices[0].message.content)
    return NextResponse.json({ lesson: json })
  } catch (err) {
    console.error('[generateLesson]', err)
    return NextResponse.json({ error: 'Failed to generate lesson' }, { status: 500 })
  }
}
