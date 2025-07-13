// Wellness API integrations for external services
import fetch from 'node-fetch';

export interface Quote {
  content: string;
  author: string;
  id?: string;
}

export interface MeditationSession {
  title: string;
  duration: number;
  description: string;
  url?: string;
  category: 'mindfulness' | 'breathing' | 'sleep' | 'focus';
}

export interface WellnessData {
  dailyQuote: Quote;
  recommendedSessions: MeditationSession[];
  breathingExercise: {
    name: string;
    duration: number;
    instructions: string[];
  };
}

// Quotable API for inspirational quotes
export async function getDailyQuote(): Promise<Quote> {
  try {
    const response = await fetch('https://api.quotable.io/random?tags=wisdom,motivational,inspirational&minLength=50&maxLength=150');
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const data = await response.json() as any;
    return {
      content: data.content,
      author: data.author,
      id: data._id
    };
  } catch (error) {
    console.error('Error fetching daily quote:', error);
    // Fallback to curated quotes if API fails
    const fallbackQuotes: Quote[] = [
      {
        content: "Mindfulness is about being fully awake in our lives. It is about perceiving the exquisite vividness of each moment.",
        author: "Jon Kabat-Zinn"
      },
      {
        content: "The present moment is the only time over which we have dominion.",
        author: "Thích Nhất Hạnh"
      },
      {
        content: "Wherever you are, be there totally. If you find your here and now intolerable and it makes you unhappy, you have three options: remove yourself from the situation, change it, or accept it totally.",
        author: "Eckhart Tolle"
      }
    ];
    return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
  }
}

// Zen Quotes API for mindfulness-specific quotes
export async function getMindfulnessQuote(): Promise<Quote> {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    if (!response.ok) {
      throw new Error('Failed to fetch zen quote');
    }
    const data = await response.json() as any;
    return {
      content: data[0].q,
      author: data[0].a
    };
  } catch (error) {
    console.error('Error fetching zen quote:', error);
    return getDailyQuote(); // Fallback to quotable API
  }
}

// Curated meditation sessions (can be extended with YouTube API later)
export async function getRecommendedSessions(): Promise<MeditationSession[]> {
  const sessions: MeditationSession[] = [
    {
      title: "Morning Mindfulness",
      duration: 10,
      description: "Start your day with intention and awareness",
      category: "mindfulness"
    },
    {
      title: "Breathing Space",
      duration: 5,
      description: "Quick breathing exercise for stress relief",
      category: "breathing"
    },
    {
      title: "Evening Wind Down",
      duration: 15,
      description: "Gentle meditation to prepare for restful sleep",
      category: "sleep"
    },
    {
      title: "Focus Boost",
      duration: 8,
      description: "Enhance concentration and mental clarity",
      category: "focus"
    }
  ];

  // Randomize order to provide variety
  return sessions.sort(() => Math.random() - 0.5).slice(0, 3);
}

// Breathing exercise generator
export async function getBreathingExercise() {
  const exercises = [
    {
      name: "4-7-8 Breathing",
      duration: 4,
      instructions: [
        "Exhale completely through your mouth",
        "Close your mouth and inhale through your nose for 4 counts",
        "Hold your breath for 7 counts",
        "Exhale through your mouth for 8 counts",
        "Repeat the cycle 3-4 times"
      ]
    },
    {
      name: "Box Breathing",
      duration: 5,
      instructions: [
        "Sit comfortably with your back straight",
        "Inhale slowly for 4 counts",
        "Hold your breath for 4 counts",
        "Exhale slowly for 4 counts",
        "Hold empty for 4 counts",
        "Repeat for 5-10 cycles"
      ]
    },
    {
      name: "Belly Breathing",
      duration: 6,
      instructions: [
        "Place one hand on your chest, one on your belly",
        "Breathe slowly through your nose",
        "Feel your belly rise more than your chest",
        "Exhale slowly through pursed lips",
        "Focus on the rhythm and sensation",
        "Continue for 5-10 minutes"
      ]
    }
  ];

  return exercises[Math.floor(Math.random() * exercises.length)];
}

// Main function to get all wellness data
export async function getWellnessData(): Promise<WellnessData> {
  const [dailyQuote, recommendedSessions, breathingExercise] = await Promise.all([
    getDailyQuote(),
    getRecommendedSessions(),
    getBreathingExercise()
  ]);

  return {
    dailyQuote,
    recommendedSessions,
    breathingExercise
  };
}

// Weather-based mood recommendations (for when we add weather API)
export function getWeatherMoodRecommendation(weather: string): string {
  const recommendations: Record<string, string> = {
    'sunny': 'Perfect day for outdoor walking meditation',
    'rainy': 'Ideal weather for cozy indoor mindfulness practice',
    'cloudy': 'Great time for reflection and gratitude exercises',
    'snowy': 'Beautiful day for winter mindfulness and warm tea meditation',
    'stormy': 'Practice grounding techniques and calming breathwork'
  };
  
  return recommendations[weather] || 'Take a moment to connect with the present moment';
}