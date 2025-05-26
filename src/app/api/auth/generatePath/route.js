import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { topic, level } = await req.json();

    const complexity = level === 'beginner' ? 7 : level === 'intermediate' ? 10 : 14;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: `
Create a structured learning path with ${complexity} step-by-step lessons for the topic "${topic}" at ${level} level.
Respond in JSON array format like:
[
  "Lesson 1 title...",
  "Lesson 2 title...",
  ...
]
`.trim(),
      }],
    });

    const path = JSON.parse(response.choices[0].message.content);
    return NextResponse.json({ path });
  } catch (err) {
    console.error('[Learning Path Generation Error]', err);
    return NextResponse.json({ error: 'Failed to generate learning path' }, { status: 500 });
  }
}
