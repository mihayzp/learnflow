import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req) {
  try {
    const { topic, level, preferences } = await req.json()

    const prompt = `
Create a ${level} level learning plan on the topic "${topic}".
User profile:
- Experience: ${preferences?.experience || 'not specified'}
- Goals: ${(preferences?.goals || []).join(', ') || 'none'}
- Pace: ${preferences?.pace || 'not specified'}

Return 7-14 lesson titles only (no content), in a JSON array like:
["Lesson 1: Introduction...", "Lesson 2: Basics of...", ...]
Keep it concise and focused.
    `.trim()

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })

    const raw = response.choices[0].message.content.trim()
    const path = JSON.parse(raw)

    return NextResponse.json({ path })
  } catch (err) {
    console.error('[generatePath]', err)
    return NextResponse.json({ error: 'Failed to generate GPT path' }, { status: 500 })
  }
}
