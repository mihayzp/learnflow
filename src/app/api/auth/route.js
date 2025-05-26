import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const body = await req.json();
    const { topic, level } = body;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `Create a short interactive lesson about "${topic}" for a ${level} level learner.`,
        },
      ],
    });

    return NextResponse.json({ lesson: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
