import { Practice, DailyReading, Scripture } from './types';

// ============================================
// PRACTICES
// ============================================

export const practices: Record<'peace' | 'joy', Practice> = {
  peace: {
    id: 'peace_in_his_presence',
    name: 'Peace in His Presence',
    tagline: "Find rest in God's unwavering love",
    focus: 'Trust and Surrender',
    scripture: {
      text: 'Thomas said to him, "My Lord and my God!"',
      reference: 'John 20:28',
    },
    phases: {
      recollection: {
        inhalePhrase: null,
        exhalePhrase: null,
        breathPattern: { inhale: 4, hold: 7, exhale: 8 },
      },
      contemplation: {
        inhalePhrase: 'My Lord and My God',
        exhalePhrase: 'Jesus, I Trust in You',
        breathPattern: { inhale: 5.5, hold: 0, exhale: 5.5 },
      },
    },
    completionMessages: [
      'You have placed your trust in the Lord. Go forth in His peace.',
      'My Lord and my God. May this surrender carry you through the day.',
      'The Lord is your peace. Return to this sacred center whenever you need.',
      'You have given your day to God. Watch how He moves.',
      'Trust, surrender, peace. These are now woven into your day. Amen.',
    ],
  },
  joy: {
    id: 'habit_of_joy',
    name: 'The Habit of Joy',
    tagline: 'Cultivate gratitude, discover lasting joy',
    focus: 'Gratitude and Joy',
    scripture: {
      text: 'Rejoice in the Lord always. I will say it again: Rejoice!',
      reference: 'Philippians 4:4',
    },
    phases: {
      recollection: {
        inhalePhrase: null,
        exhalePhrase: null,
        breathPattern: { inhale: 5, hold: 4, exhale: 7 },
      },
      contemplation: {
        inhalePhrase: 'Thank You Lord',
        exhalePhrase: 'For You are Near',
        breathPattern: { inhale: 5.5, hold: 0, exhale: 5.5 },
      },
    },
    completionMessages: [
      'Rejoice! The Lord is near. Carry this joy with you.',
      'Gratitude has opened your heart. Let joy overflow.',
      'You have tasted joy. May it season every moment of your day.',
      'The habit of joy is forming. Return tomorrow.',
      'Joy is not circumstance. Joy is presence. You have practiced presence.',
    ],
  },
};

// ============================================
// DAILY READINGS (7 days for prototype)
// ============================================

export const dailyReadings: DailyReading[] = [
  {
    scripture: {
      text: 'Do not be conformed to this world, but be transformed by the renewal of your mind.',
      reference: 'Romans 12:2',
    },
    reflection:
      "The world constantly shapes our thinking. Today, let the practice of Sacred Center begin the quiet work of renewal—not by adding more, but by creating space for God to restore what distraction has scattered.",
    quote: {
      text: 'The soul that is attached to anything, however much good there may be in it, will not arrive at the liberty of divine union.',
      author: 'St. John of the Cross',
    },
  },
  {
    scripture: {
      text: 'Be still, and know that I am God.',
      reference: 'Psalm 46:10',
    },
    reflection:
      'Stillness is not emptiness. It is fullness—full attention, full presence, full surrender. In the stillness, we remember who God is and who we are in Him.',
    quote: {
      text: 'God is the friend of silence. See how nature grows in silence. We need silence to be able to touch souls.',
      author: 'St. Teresa of Calcutta',
    },
  },
  {
    scripture: {
      text: 'Come to me, all who labor and are heavy laden, and I will give you rest.',
      reference: 'Matthew 11:28',
    },
    reflection:
      "Rest is not earned. It is received. Today's practice is an act of coming—bringing your weariness to the One who promises rest.",
    quote: {
      text: 'We are not human beings having a spiritual experience. We are spiritual beings having a human experience.',
      author: 'Pierre Teilhard de Chardin',
    },
  },
  {
    scripture: {
      text: 'The Lord is my shepherd; I shall not want. He makes me lie down in green pastures.',
      reference: 'Psalm 23:1-2',
    },
    reflection:
      'The shepherd leads to rest, not to productivity. Green pastures are not for working—they are for restoration. Let yourself be led today.',
    quote: {
      text: 'Prayer is not asking. Prayer is putting oneself in the hands of God.',
      author: 'St. Teresa of Avila',
    },
  },
  {
    scripture: {
      text: 'In returning and rest you shall be saved; in quietness and in trust shall be your strength.',
      reference: 'Isaiah 30:15',
    },
    reflection:
      'Strength through quietness seems backwards to the world. But the kingdom operates differently. Your practice today is an act of holy defiance against the myth that more effort equals more peace.',
    quote: {
      text: 'The beginning of prayer is silence.',
      author: 'St. John of the Cross',
    },
  },
  {
    scripture: {
      text: 'Peace I leave with you; my peace I give to you. Not as the world gives do I give to you.',
      reference: 'John 14:27',
    },
    reflection:
      "Christ's peace is not the absence of trouble. It is presence in the midst of trouble. Today, practice receiving a peace that does not depend on circumstances.",
    quote: {
      text: 'Let nothing disturb you. Let nothing frighten you. All things pass away. God never changes.',
      author: 'St. Teresa of Avila',
    },
  },
  {
    scripture: {
      text: 'Trust in the Lord with all your heart, and do not lean on your own understanding.',
      reference: 'Proverbs 3:5',
    },
    reflection:
      "Trust is not understanding—it is surrender when understanding fails. Today's practice is training in trust, preparing you for the moments when the path is unclear.",
    quote: {
      text: 'Pray as though everything depended on God. Work as though everything depended on you.',
      author: 'St. Augustine',
    },
  },
];

// ============================================
// NIGHT SCRIPTURES
// ============================================

export const nightScriptures: Scripture[] = [
  {
    text: 'He gives to his beloved sleep.',
    reference: 'Psalm 127:2',
  },
  {
    text: 'In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.',
    reference: 'Psalm 4:8',
  },
  {
    text: 'When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.',
    reference: 'Proverbs 3:24',
  },
  {
    text: 'I will both lie down and sleep in peace, for you alone, O Lord, make me dwell in safety.',
    reference: 'Psalm 4:8',
  },
  {
    text: 'It is in vain that you rise up early and go late to rest. For he gives to his beloved sleep.',
    reference: 'Psalm 127:2',
  },
  {
    text: 'The Lord gives strength to his people; the Lord blesses his people with peace.',
    reference: 'Psalm 29:11',
  },
  {
    text: 'Cast all your anxiety on him because he cares for you.',
    reference: '1 Peter 5:7',
  },
];

// ============================================
// PRAISE & PETITION PROMPTS
// ============================================

export const praisePrompts = {
  gratitude: {
    title: 'Gratitude',
    instruction: 'Give thanks for three blessings',
    description: 'What gifts has God given you today? Name them silently before Him.',
  },
  petition: {
    title: 'Petition',
    instruction: 'Intercede for three intentions',
    description: 'Who needs your prayers? Lift them to the Lord.',
  },
  visualization: {
    title: 'Vision',
    instruction: 'See the completion of three dreams',
    description: 'What is God calling you toward? See it as already accomplished in His timing.',
  },
  surrender: {
    title: 'Surrender',
    instruction: 'Release the day to God',
    description: 'Open your hands. Let go of what you cannot control. Trust.',
  },
};

// ============================================
// BREATH INSTRUCTIONS
// ============================================

export const breathInstructions = {
  inhale: 'Breathe in...',
  hold: 'Hold...',
  exhale: 'Breathe out...',
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getTodayReading(): DailyReading {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % dailyReadings.length;
  return dailyReadings[index];
}

export function getTodayNightScripture(): Scripture {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % nightScriptures.length;
  return nightScriptures[index];
}

export function getRandomCompletionMessage(practiceId: 'peace' | 'joy'): string {
  const messages = practices[practiceId].completionMessages;
  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
}

export function formatDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}
