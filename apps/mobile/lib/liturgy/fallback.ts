/**
 * Fallback Liturgy Content
 * Used when API is unavailable
 */

import { DailyMassReadings, NightPrayerContent } from './types';

/**
 * Fallback daily readings when API fails
 */
export function getFallbackReadings(date: Date): DailyMassReadings {
  const dateStr = date.toISOString().split('T')[0];
  const dayOfWeek = date.getDay();

  // Rotate through a set of beautiful readings
  const readings = FALLBACK_READINGS[dayOfWeek % FALLBACK_READINGS.length];

  return {
    ...readings,
    date: dateStr,
  };
}

/**
 * Fallback Night Prayer content
 */
export function getFallbackNightPrayer(date: Date): NightPrayerContent {
  const dateStr = date.toISOString().split('T')[0];

  return {
    date: dateStr,
    examen: {
      openingPrayer: "Lord God, you have given us another day. As night falls, I turn to you in gratitude and ask for your grace to examine my heart.",
      examinationPrompts: [
        "Where did I experience God's presence today?",
        "What moments brought me peace or joy?",
        "Where did I fall short of love?",
        "What am I most grateful for?",
        "What do I need to surrender to God?",
      ],
      actOfContrition: "My God, I am sorry for my sins with all my heart. In choosing to do wrong and failing to do good, I have sinned against you whom I should love above all things. I firmly intend, with your help, to do penance, to sin no more, and to avoid whatever leads me to sin. Amen.",
    },
    psalm: {
      antiphon: "Into your hands, Lord, I commend my spirit.",
      reference: "Psalm 91",
      text: "He who dwells in the shelter of the Most High, who abides in the shadow of the Almighty, will say to the Lord, 'My refuge and my fortress; my God, in whom I trust.' For he will deliver you from the snare of the fowler and from the deadly pestilence.",
    },
    reading: {
      reference: "Jeremiah 14:9",
      text: "You, O Lord, are in the midst of us, and we are called by your name; do not leave us.",
    },
    responsory: {
      versicle: "Into your hands, Lord, I commend my spirit.",
      response: "You have redeemed us, Lord God of truth.",
    },
    canticleOfSimeon: {
      antiphon: "Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.",
      text: "Lord, now you let your servant go in peace; your word has been fulfilled: my own eyes have seen the salvation which you have prepared in the sight of every people: a light to reveal you to the nations and the glory of your people Israel.",
    },
    closingPrayer: "Visit this house, we beg you, Lord, and banish from it the deadly power of the evil one. May your holy angels dwell here to keep us in peace, and may your blessing be always upon us. Through Christ our Lord. Amen.",
    marianAntiphon: {
      name: "Salve Regina",
      text: "Hail, holy Queen, Mother of mercy, our life, our sweetness and our hope. To you do we cry, poor banished children of Eve. To you do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, your eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of your womb, Jesus. O clement, O loving, O sweet Virgin Mary.",
    },
  };
}

const FALLBACK_READINGS: Omit<DailyMassReadings, 'date'>[] = [
  // Sunday
  {
    liturgicalDay: "Sunday in Ordinary Time",
    liturgicalColor: 'green',
    season: 'ordinary_time',
    firstReading: {
      type: 'first_reading',
      reference: 'Isaiah 55:10-11',
      text: 'Thus says the Lord: Just as from the heavens the rain and snow come down and do not return there till they have watered the earth, making it fertile and fruitful, giving seed to the one who sows and bread to the one who eats, so shall my word be that goes forth from my mouth; my word shall not return to me void, but shall do my will, achieving the end for which I sent it.',
      introduction: 'A reading from the Book of the Prophet Isaiah',
    },
    responsorialPsalm: {
      reference: 'Psalm 65:10-14',
      response: 'The seed that falls on good ground will yield a fruitful harvest.',
      fullText: 'You have visited the land and watered it; greatly have you enriched it. God\'s watercourses are filled; you have prepared the grain.',
    },
    gospel: {
      type: 'gospel',
      reference: 'Matthew 13:1-23',
      text: 'On that day, Jesus went out of the house and sat down by the sea. Such large crowds gathered around him that he got into a boat and sat down, and the whole crowd stood along the shore. And he spoke to them at length in parables.',
      introduction: 'A reading from the holy Gospel according to Matthew',
    },
  },
  // Monday
  {
    liturgicalDay: "Monday in Ordinary Time",
    liturgicalColor: 'green',
    season: 'ordinary_time',
    firstReading: {
      type: 'first_reading',
      reference: 'Hebrews 11:1-6',
      text: 'Faith is the realization of what is hoped for and evidence of things not seen. Because of it the ancients were well attested. By faith we understand that the universe was ordered by the word of God, so that what is visible came into being through the invisible.',
      introduction: 'A reading from the Letter to the Hebrews',
    },
    responsorialPsalm: {
      reference: 'Psalm 145:2-5',
      response: 'I will praise your name for ever, Lord.',
      fullText: 'Every day I will bless you; I will praise your name forever and ever. Great is the Lord and worthy of much praise; his grandeur is beyond understanding.',
    },
    gospel: {
      type: 'gospel',
      reference: 'Mark 9:14-29',
      text: 'When Jesus came down from the mountain with Peter, James, and John and approached the disciples, they saw a large crowd around them and scribes arguing with them.',
      introduction: 'A reading from the holy Gospel according to Mark',
    },
  },
  // Tuesday
  {
    liturgicalDay: "Tuesday in Ordinary Time",
    liturgicalColor: 'green',
    season: 'ordinary_time',
    firstReading: {
      type: 'first_reading',
      reference: 'Romans 8:28-30',
      text: 'We know that all things work for good for those who love God, who are called according to his purpose. For those he foreknew he also predestined to be conformed to the image of his Son, so that he might be the firstborn among many brothers and sisters.',
      introduction: 'A reading from the Letter of Saint Paul to the Romans',
    },
    responsorialPsalm: {
      reference: 'Psalm 105:1-9',
      response: 'The Lord remembers his covenant for ever.',
      fullText: 'Give thanks to the Lord, invoke his name; make known among the peoples his deeds. Sing praise to him, play music; proclaim all his wondrous deeds.',
    },
    gospel: {
      type: 'gospel',
      reference: 'Matthew 25:14-30',
      text: 'Jesus told his disciples this parable: "A man going on a journey called in his servants and entrusted his possessions to them. To one he gave five talents; to another, two; to a third, one— to each according to his ability."',
      introduction: 'A reading from the holy Gospel according to Matthew',
    },
  },
  // Wednesday
  {
    liturgicalDay: "Wednesday in Ordinary Time",
    liturgicalColor: 'green',
    season: 'ordinary_time',
    firstReading: {
      type: 'first_reading',
      reference: 'Philippians 4:4-9',
      text: 'Rejoice in the Lord always. I shall say it again: rejoice! Your kindness should be known to all. The Lord is near. Have no anxiety at all, but in everything, by prayer and petition, with thanksgiving, make your requests known to God.',
      introduction: 'A reading from the Letter of Saint Paul to the Philippians',
    },
    responsorialPsalm: {
      reference: 'Psalm 23:1-6',
      response: 'The Lord is my shepherd; there is nothing I shall want.',
      fullText: 'The Lord is my shepherd; there is nothing I shall want. In green pastures he makes me lie down; to still waters he leads me; he restores my soul.',
    },
    gospel: {
      type: 'gospel',
      reference: 'John 14:27-31',
      text: 'Jesus said to his disciples: "Peace I leave with you; my peace I give to you. Not as the world gives do I give it to you. Do not let your hearts be troubled or afraid."',
      introduction: 'A reading from the holy Gospel according to John',
    },
  },
  // Thursday
  {
    liturgicalDay: "Thursday in Ordinary Time",
    liturgicalColor: 'green',
    season: 'ordinary_time',
    firstReading: {
      type: 'first_reading',
      reference: 'Colossians 3:12-17',
      text: 'Put on, as God\'s chosen ones, holy and beloved, heartfelt compassion, kindness, humility, gentleness, and patience, bearing with one another and forgiving one another, if one has a grievance against another; as the Lord has forgiven you, so must you also do.',
      introduction: 'A reading from the Letter of Saint Paul to the Colossians',
    },
    responsorialPsalm: {
      reference: 'Psalm 100:1-5',
      response: 'Enter his gates with thanksgiving.',
      fullText: 'Make a joyful noise to the Lord, all the earth! Serve the Lord with gladness! Come into his presence with singing!',
    },
    gospel: {
      type: 'gospel',
      reference: 'Luke 6:27-38',
      text: 'Jesus said to his disciples: "Love your enemies, do good to those who hate you, bless those who curse you, pray for those who mistreat you."',
      introduction: 'A reading from the holy Gospel according to Luke',
    },
  },
  // Friday
  {
    liturgicalDay: "Friday in Ordinary Time",
    liturgicalColor: 'green',
    season: 'ordinary_time',
    firstReading: {
      type: 'first_reading',
      reference: '1 John 4:7-12',
      text: 'Beloved, let us love one another, because love is of God; everyone who loves is begotten by God and knows God. Whoever is without love does not know God, for God is love.',
      introduction: 'A reading from the First Letter of Saint John',
    },
    responsorialPsalm: {
      reference: 'Psalm 116:12-19',
      response: 'Precious in the eyes of the Lord is the death of his faithful.',
      fullText: 'How shall I make a return to the Lord for all the good he has done for me? The cup of salvation I will take up, and I will call upon the name of the Lord.',
    },
    gospel: {
      type: 'gospel',
      reference: 'John 15:12-17',
      text: 'Jesus said to his disciples: "This is my commandment: love one another as I love you. No one has greater love than this, to lay down one\'s life for one\'s friends."',
      introduction: 'A reading from the holy Gospel according to John',
    },
  },
  // Saturday
  {
    liturgicalDay: "Saturday in Ordinary Time",
    liturgicalColor: 'green',
    season: 'ordinary_time',
    firstReading: {
      type: 'first_reading',
      reference: 'Ephesians 3:14-21',
      text: 'I kneel before the Father, from whom every family in heaven and on earth is named, that he may grant you in accord with the riches of his glory to be strengthened with power through his Spirit in the inner self.',
      introduction: 'A reading from the Letter of Saint Paul to the Ephesians',
    },
    responsorialPsalm: {
      reference: 'Psalm 34:2-9',
      response: 'Taste and see the goodness of the Lord.',
      fullText: 'I will bless the Lord at all times; his praise shall be always in my mouth. My soul makes its boast in the Lord; let the humble hear and be glad.',
    },
    gospel: {
      type: 'gospel',
      reference: 'Matthew 11:28-30',
      text: 'Jesus said: "Come to me, all you who labor and are burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am meek and humble of heart; and you will find rest for yourselves."',
      introduction: 'A reading from the holy Gospel according to Matthew',
    },
  },
];
