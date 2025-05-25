import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const action = formData.get('action') // 'signin' or 'signup'

  const supabase = createRouteHandlerClient({ cookies })

  if (action === 'signup') {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      },
    })

    if (error) {
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=Could not authenticate user`,
        {
          status: 301,
        }
      )
    }

    return NextResponse.redirect(
      `${requestUrl.origin}/login?message=Check email to continue sign in process`,
      {
        status: 301,
      }
    )
  }

  if (action === 'signin') {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=Could not authenticate user`,
        {
          status: 301,
        }
      )
    }

    return NextResponse.redirect(`${requestUrl.origin}/dashboard`, {
      status: 301,
    })
  }
}