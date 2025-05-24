export const ACHIEVEMENTS = {
    FIRST_LESSON: {
      id: 'first_lesson',
      title: 'First Steps',
      description: 'Complete your first lesson',
      type: 'completion',
      requirement: { lessonsCompleted: 1 },
      xp: 50
    },
    PERFECT_SCORE: {
      id: 'perfect_score',
      title: 'Perfectionist',
      description: 'Get 100% accuracy on a lesson',
      type: 'accuracy',
      requirement: { accuracy: 1.0 },
      xp: 100
    },
    STREAK_3: {
      id: 'streak_3',
      title: 'Getting Consistent',
      description: 'Maintain a 3-day learning streak',
      type: 'streak',
      requirement: { streak: 3 },
      xp: 150
    },
    STREAK_7: {
      id: 'streak_7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      type: 'streak',
      requirement: { streak: 7 },
      xp: 300
    }
  }
  
  // Helper function to check if we're in browser
  function isBrowser() {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
  }
  
  export function checkAchievements(userStats, lessonData = {}) {
    if (!isBrowser()) return []
    
    const newAchievements = []
    
    // Get current achievements
    const currentAchievements = JSON.parse(localStorage.getItem('learnflow-achievements') || '[]')
    const achievedIds = currentAchievements.map(a => a.id)
    
    Object.values(ACHIEVEMENTS).forEach(achievement => {
      if (achievedIds.includes(achievement.id)) return
      
      let unlocked = false
      
      switch (achievement.type) {
        case 'completion':
          if (achievement.requirement.lessonsCompleted && 
              userStats.completedLessons >= achievement.requirement.lessonsCompleted) {
            unlocked = true
          }
          break
          
        case 'accuracy':
          if (achievement.requirement.accuracy && 
              lessonData.accuracy >= achievement.requirement.accuracy) {
            unlocked = true
          }
          break
          
        case 'streak':
          if (achievement.requirement.streak && 
              userStats.currentStreak >= achievement.requirement.streak) {
            unlocked = true
          }
          break
      }
      
      if (unlocked) {
        newAchievements.push({
          ...achievement,
          unlockedAt: new Date().toISOString()
        })
      }
    })
    
    if (newAchievements.length > 0) {
      const updatedAchievements = [...currentAchievements, ...newAchievements]
      localStorage.setItem('learnflow-achievements', JSON.stringify(updatedAchievements))
    }
    
    return newAchievements
  }
  
  export function getUserAchievements() {
    if (!isBrowser()) return []
    return JSON.parse(localStorage.getItem('learnflow-achievements') || '[]')
  }
  
  export function getTotalXP() {
    if (!isBrowser()) return 0
    const achievements = getUserAchievements()
    return achievements.reduce((total, achievement) => total + achievement.xp, 0)
  }