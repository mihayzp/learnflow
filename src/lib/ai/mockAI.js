// Mock AI responses for demonstration
export class MockAI {
    static async adaptLesson(userPerformance, currentLesson) {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const { accuracy, responseTime } = userPerformance
      
      // Mock AI adaptation logic
      let adaptations = {
        difficulty: currentLesson.difficulty,
        hints: false,
        encouragement: "Keep going!",
        nextRecommendation: "Continue with the next lesson"
      }
      
      if (accuracy < 0.6) {
        adaptations.difficulty = Math.max(1, currentLesson.difficulty - 1)
        adaptations.hints = true
        adaptations.encouragement = "Take your time - you're learning!"
        adaptations.nextRecommendation = "Let's try an easier lesson to build confidence"
      } else if (accuracy > 0.9 && responseTime < 3000) {
        adaptations.difficulty = Math.min(5, currentLesson.difficulty + 1)
        adaptations.encouragement = "Excellent work! You're ready for more challenge!"
        adaptations.nextRecommendation = "Ready for advanced concepts"
      }
      
      return adaptations
    }
    
    static generateInsight(userStats) {
      const insights = [
        "You learn best in the morning with hands-on exercises.",
        "Your accuracy improves when lessons include visual examples.",
        "You prefer bite-sized concepts over long explanations.",
        "Interactive exercises boost your retention by 40%.",
        "Your learning velocity is 23% above average!"
      ]
      
      return insights[Math.floor(Math.random() * insights.length)]
    }
    
    static predictCompletion(currentProgress, learningVelocity) {
      const daysRemaining = Math.max(1, Math.floor((100 - currentProgress) / (learningVelocity * 8)))
      return `At your current pace, you'll complete this skill in ${daysRemaining} days`
    }
  }