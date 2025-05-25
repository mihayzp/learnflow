import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export class AILearningEngine {
  
  /**
   * Generate personalized learning insights based on user data
   */
  static async generateLearningInsights(userProfile, progressData) {
    if (!process.env.OPENAI_API_KEY) {
      // Fallback to mock insights if no API key
      return {
        insights: [
          "You learn best in the morning with hands-on exercises.",
          "Your accuracy improves when lessons include visual examples.",
          "Interactive exercises boost your retention by 40%."
        ],
        recommendations: [
          "Try scheduling challenging lessons in the morning",
          "Focus on interactive coding exercises",
          "Take short breaks between concept and practice sections"
        ]
      }
    }

    try {
      const prompt = `
      Analyze this learner's profile and progress, then provide personalized insights and recommendations.

      User Profile:
      - Learning Style: ${userProfile.learning_style}
      - Primary Goal: ${userProfile.primary_goals?.[0] || 'programming'}
      
      Progress Data:
      - Lessons Completed: ${progressData.total_lessons_completed}
      - Total Learning Time: ${progressData.total_learning_minutes} minutes
      - Current Streak: ${progressData.current_streak} days
      - Average Accuracy: ${Math.round((progressData.average_accuracy || 0.85) * 100)}%
      - Learning Velocity: ${progressData.learning_velocity || 1.0}x

      Provide 3 personalized insights and 3 actionable recommendations in JSON format:
      {
        "insights": ["insight1", "insight2", "insight3"],
        "recommendations": ["rec1", "rec2", "rec3"]
      }
      `

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an AI learning coach that provides personalized insights and recommendations based on learner data. Be encouraging, specific, and actionable."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })

      const result = JSON.parse(response.choices[0].message.content)
      return result
    } catch (error) {
      console.error('Error generating AI insights:', error)
      
      // Return fallback insights
      return {
        insights: [
          "You're making great progress with consistent daily practice.",
          "Your learning pattern shows strong engagement with interactive content.",
          `You've maintained a ${progressData.current_streak}-day streak - excellent consistency!`
        ],
        recommendations: [
          "Continue your daily learning habit for maximum retention",
          "Try increasing lesson difficulty to maintain challenge",
          "Set a goal to reach 100 total minutes this month"
        ]
      }
    }
  }

  /**
   * Adapt lesson difficulty based on user performance
   */
  static async adaptLessonDifficulty(userPerformance, lessonData) {
    const { accuracy, responseTime, engagement } = userPerformance
    
    // Rule-based adaptation (can be enhanced with AI)
    let adaptations = {
      difficultyAdjustment: 0,
      addHints: false,
      simplifyExplanations: false,
      addExtraExamples: false,
      reasoning: "Standard lesson flow"
    }

    // Struggling learner
    if (accuracy < 0.6 || responseTime > 600) {
      adaptations = {
        difficultyAdjustment: -1,
        addHints: true,
        simplifyExplanations: true,
        addExtraExamples: true,
        reasoning: "Added support due to lower performance"
      }
    }
    // High performer
    else if (accuracy > 0.9 && responseTime < 180) {
      adaptations = {
        difficultyAdjustment: 1,
        addHints: false,
        simplifyExplanations: false,
        addExtraExamples: false,
        reasoning: "Increased challenge for high performance"
      }
    }

    return adaptations
  }

  /**
   * Generate personalized lesson content
   */
  static async generatePersonalizedContent(baseLesson, userProfile, adaptations) {
    if (!process.env.OPENAI_API_KEY) {
      return baseLesson // Return original lesson if no API key
    }

    try {
      const prompt = `
      Personalize this lesson for a ${userProfile.learning_style} learner.
      
      Original Lesson: ${baseLesson.title}
      Learning Style: ${userProfile.learning_style}
      Adaptations Needed: ${JSON.stringify(adaptations)}
      
      Enhance the lesson while keeping the same structure but adapting the content style.
      Return the modified lesson content in the same JSON format.
      `

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system", 
            content: "You are an AI tutor that personalizes lesson content based on learning styles. Maintain the lesson structure but adapt the presentation style."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 1000
      })

      const personalizedContent = JSON.parse(response.choices[0].message.content)
      return { ...baseLesson, content: personalizedContent }
    } catch (error) {
      console.error('Error personalizing content:', error)
      return baseLesson // Return original on error
    }
  }

  /**
   * Generate study recommendations
   */
  static generateStudyRecommendations(progressData, userProfile) {
    const recommendations = []
    
    // Streak-based recommendations
    if (progressData.current_streak === 0) {
      recommendations.push({
        type: 'habit',
        title: 'Start Your Learning Streak',
        description: 'Begin with just 5 minutes today to build momentum',
        action: 'Take a lesson now'
      })
    } else if (progressData.current_streak < 7) {
      recommendations.push({
        type: 'streak',
        title: 'Keep Your Streak Going',
        description: `You're on day ${progressData.current_streak}! Don't break the chain.`,
        action: 'Continue streak'
      })
    } else {
      recommendations.push({
        type: 'celebration',
        title: 'Amazing Streak!',
        description: `${progressData.current_streak} days of consistent learning!`,
        action: 'Keep it up'
      })
    }

    // Time-based recommendations
    if (progressData.total_learning_minutes < 30) {
      recommendations.push({
        type: 'time',
        title: 'Build Your Foundation',
        description: 'Complete a few more lessons to establish your learning base',
        action: 'Take another lesson'
      })
    }

    // Difficulty recommendations
    if (progressData.average_accuracy > 0.9) {
      recommendations.push({
        type: 'challenge',
        title: 'Ready for More Challenge',
        description: 'Your high accuracy suggests you can handle harder material',
        action: 'Try advanced lessons'
      })
    }

    return recommendations
  }
}