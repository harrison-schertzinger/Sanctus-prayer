-- =============================================
-- Daily Mass Readings — Feb 6 to Apr 15, 2026
-- Fallback readings (rotate by day of week)
-- Replace with actual USCCB lectionary when available
-- Run in Supabase SQL Editor
-- =============================================

-- Clear existing daily readings in this range
DELETE FROM public.daily_readings WHERE date >= '2026-02-06' AND date <= '2026-04-15';

-- 2026-02-06 (Fri)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-06',
  'Friday in Ordinary Time',
  'green',
  'ordinary_time',
  '1 John 4:7-12',
  'Beloved, let us love one another, because love is of God; everyone who loves is begotten by God and knows God. Whoever is without love does not know God, for God is love.',
  'A reading from the First Letter of Saint John',
  'Psalm 116:12-19',
  'Precious in the eyes of the Lord is the death of his faithful.',
  'How shall I make a return to the Lord for all the good he has done for me? The cup of salvation I will take up, and I will call upon the name of the Lord.',
  'John 15:12-17',
  'Jesus said to his disciples: "This is my commandment: love one another as I love you. No one has greater love than this, to lay down one''s life for one''s friends."',
  'A reading from the holy Gospel according to John'
);

-- 2026-02-07 (Sat)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-07',
  'Saturday in Ordinary Time',
  'green',
  'ordinary_time',
  'Ephesians 3:14-21',
  'I kneel before the Father, from whom every family in heaven and on earth is named, that he may grant you in accord with the riches of his glory to be strengthened with power through his Spirit in the inner self.',
  'A reading from the Letter of Saint Paul to the Ephesians',
  'Psalm 34:2-9',
  'Taste and see the goodness of the Lord.',
  'I will bless the Lord at all times; his praise shall be always in my mouth. My soul makes its boast in the Lord; let the humble hear and be glad.',
  'Matthew 11:28-30',
  'Jesus said: "Come to me, all you who labor and are burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am meek and humble of heart; and you will find rest for yourselves."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-02-08 (Sun)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-08',
  'Sunday in Ordinary Time',
  'green',
  'ordinary_time',
  'Isaiah 55:10-11',
  'Thus says the Lord: Just as from the heavens the rain and snow come down and do not return there till they have watered the earth, making it fertile and fruitful, giving seed to the one who sows and bread to the one who eats, so shall my word be that goes forth from my mouth; my word shall not return to me void, but shall do my will, achieving the end for which I sent it.',
  'A reading from the Book of the Prophet Isaiah',
  'Psalm 65:10-14',
  'The seed that falls on good ground will yield a fruitful harvest.',
  'You have visited the land and watered it; greatly have you enriched it. God''s watercourses are filled; you have prepared the grain.',
  'Matthew 13:1-23',
  'On that day, Jesus went out of the house and sat down by the sea. Such large crowds gathered around him that he got into a boat and sat down, and the whole crowd stood along the shore. And he spoke to them at length in parables.',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-02-09 (Mon)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-09',
  'Monday in Ordinary Time',
  'green',
  'ordinary_time',
  'Hebrews 11:1-6',
  'Faith is the realization of what is hoped for and evidence of things not seen. Because of it the ancients were well attested. By faith we understand that the universe was ordered by the word of God, so that what is visible came into being through the invisible.',
  'A reading from the Letter to the Hebrews',
  'Psalm 145:2-5',
  'I will praise your name for ever, Lord.',
  'Every day I will bless you; I will praise your name forever and ever. Great is the Lord and worthy of much praise; his grandeur is beyond understanding.',
  'Mark 9:14-29',
  'When Jesus came down from the mountain with Peter, James, and John and approached the disciples, they saw a large crowd around them and scribes arguing with them.',
  'A reading from the holy Gospel according to Mark'
);

-- 2026-02-10 (Tue)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-10',
  'Tuesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Romans 8:28-30',
  'We know that all things work for good for those who love God, who are called according to his purpose. For those he foreknew he also predestined to be conformed to the image of his Son, so that he might be the firstborn among many brothers and sisters.',
  'A reading from the Letter of Saint Paul to the Romans',
  'Psalm 105:1-9',
  'The Lord remembers his covenant for ever.',
  'Give thanks to the Lord, invoke his name; make known among the peoples his deeds. Sing praise to him, play music; proclaim all his wondrous deeds.',
  'Matthew 25:14-30',
  'Jesus told his disciples this parable: "A man going on a journey called in his servants and entrusted his possessions to them. To one he gave five talents; to another, two; to a third, one— to each according to his ability."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-02-11 (Wed)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-11',
  'Wednesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Philippians 4:4-9',
  'Rejoice in the Lord always. I shall say it again: rejoice! Your kindness should be known to all. The Lord is near. Have no anxiety at all, but in everything, by prayer and petition, with thanksgiving, make your requests known to God.',
  'A reading from the Letter of Saint Paul to the Philippians',
  'Psalm 23:1-6',
  'The Lord is my shepherd; there is nothing I shall want.',
  'The Lord is my shepherd; there is nothing I shall want. In green pastures he makes me lie down; to still waters he leads me; he restores my soul.',
  'John 14:27-31',
  'Jesus said to his disciples: "Peace I leave with you; my peace I give to you. Not as the world gives do I give it to you. Do not let your hearts be troubled or afraid."',
  'A reading from the holy Gospel according to John'
);

-- 2026-02-12 (Thu)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-12',
  'Thursday in Ordinary Time',
  'green',
  'ordinary_time',
  'Colossians 3:12-17',
  'Put on, as God''s chosen ones, holy and beloved, heartfelt compassion, kindness, humility, gentleness, and patience, bearing with one another and forgiving one another, if one has a grievance against another; as the Lord has forgiven you, so must you also do.',
  'A reading from the Letter of Saint Paul to the Colossians',
  'Psalm 100:1-5',
  'Enter his gates with thanksgiving.',
  'Make a joyful noise to the Lord, all the earth! Serve the Lord with gladness! Come into his presence with singing!',
  'Luke 6:27-38',
  'Jesus said to his disciples: "Love your enemies, do good to those who hate you, bless those who curse you, pray for those who mistreat you."',
  'A reading from the holy Gospel according to Luke'
);

-- 2026-02-13 (Fri)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-13',
  'Friday in Ordinary Time',
  'green',
  'ordinary_time',
  '1 John 4:7-12',
  'Beloved, let us love one another, because love is of God; everyone who loves is begotten by God and knows God. Whoever is without love does not know God, for God is love.',
  'A reading from the First Letter of Saint John',
  'Psalm 116:12-19',
  'Precious in the eyes of the Lord is the death of his faithful.',
  'How shall I make a return to the Lord for all the good he has done for me? The cup of salvation I will take up, and I will call upon the name of the Lord.',
  'John 15:12-17',
  'Jesus said to his disciples: "This is my commandment: love one another as I love you. No one has greater love than this, to lay down one''s life for one''s friends."',
  'A reading from the holy Gospel according to John'
);

-- 2026-02-14 (Sat)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-14',
  'Saturday in Ordinary Time',
  'green',
  'ordinary_time',
  'Ephesians 3:14-21',
  'I kneel before the Father, from whom every family in heaven and on earth is named, that he may grant you in accord with the riches of his glory to be strengthened with power through his Spirit in the inner self.',
  'A reading from the Letter of Saint Paul to the Ephesians',
  'Psalm 34:2-9',
  'Taste and see the goodness of the Lord.',
  'I will bless the Lord at all times; his praise shall be always in my mouth. My soul makes its boast in the Lord; let the humble hear and be glad.',
  'Matthew 11:28-30',
  'Jesus said: "Come to me, all you who labor and are burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am meek and humble of heart; and you will find rest for yourselves."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-02-15 (Sun)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-15',
  'Sunday in Ordinary Time',
  'green',
  'ordinary_time',
  'Isaiah 55:10-11',
  'Thus says the Lord: Just as from the heavens the rain and snow come down and do not return there till they have watered the earth, making it fertile and fruitful, giving seed to the one who sows and bread to the one who eats, so shall my word be that goes forth from my mouth; my word shall not return to me void, but shall do my will, achieving the end for which I sent it.',
  'A reading from the Book of the Prophet Isaiah',
  'Psalm 65:10-14',
  'The seed that falls on good ground will yield a fruitful harvest.',
  'You have visited the land and watered it; greatly have you enriched it. God''s watercourses are filled; you have prepared the grain.',
  'Matthew 13:1-23',
  'On that day, Jesus went out of the house and sat down by the sea. Such large crowds gathered around him that he got into a boat and sat down, and the whole crowd stood along the shore. And he spoke to them at length in parables.',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-02-16 (Mon)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-16',
  'Monday in Ordinary Time',
  'green',
  'ordinary_time',
  'Hebrews 11:1-6',
  'Faith is the realization of what is hoped for and evidence of things not seen. Because of it the ancients were well attested. By faith we understand that the universe was ordered by the word of God, so that what is visible came into being through the invisible.',
  'A reading from the Letter to the Hebrews',
  'Psalm 145:2-5',
  'I will praise your name for ever, Lord.',
  'Every day I will bless you; I will praise your name forever and ever. Great is the Lord and worthy of much praise; his grandeur is beyond understanding.',
  'Mark 9:14-29',
  'When Jesus came down from the mountain with Peter, James, and John and approached the disciples, they saw a large crowd around them and scribes arguing with them.',
  'A reading from the holy Gospel according to Mark'
);

-- 2026-02-17 (Tue)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-17',
  'Tuesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Romans 8:28-30',
  'We know that all things work for good for those who love God, who are called according to his purpose. For those he foreknew he also predestined to be conformed to the image of his Son, so that he might be the firstborn among many brothers and sisters.',
  'A reading from the Letter of Saint Paul to the Romans',
  'Psalm 105:1-9',
  'The Lord remembers his covenant for ever.',
  'Give thanks to the Lord, invoke his name; make known among the peoples his deeds. Sing praise to him, play music; proclaim all his wondrous deeds.',
  'Matthew 25:14-30',
  'Jesus told his disciples this parable: "A man going on a journey called in his servants and entrusted his possessions to them. To one he gave five talents; to another, two; to a third, one— to each according to his ability."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-02-18 (Wed)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-18',
  'Wednesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Philippians 4:4-9',
  'Rejoice in the Lord always. I shall say it again: rejoice! Your kindness should be known to all. The Lord is near. Have no anxiety at all, but in everything, by prayer and petition, with thanksgiving, make your requests known to God.',
  'A reading from the Letter of Saint Paul to the Philippians',
  'Psalm 23:1-6',
  'The Lord is my shepherd; there is nothing I shall want.',
  'The Lord is my shepherd; there is nothing I shall want. In green pastures he makes me lie down; to still waters he leads me; he restores my soul.',
  'John 14:27-31',
  'Jesus said to his disciples: "Peace I leave with you; my peace I give to you. Not as the world gives do I give it to you. Do not let your hearts be troubled or afraid."',
  'A reading from the holy Gospel according to John'
);

-- 2026-02-19 (Thu)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-19',
  'Thursday in Ordinary Time',
  'green',
  'ordinary_time',
  'Colossians 3:12-17',
  'Put on, as God''s chosen ones, holy and beloved, heartfelt compassion, kindness, humility, gentleness, and patience, bearing with one another and forgiving one another, if one has a grievance against another; as the Lord has forgiven you, so must you also do.',
  'A reading from the Letter of Saint Paul to the Colossians',
  'Psalm 100:1-5',
  'Enter his gates with thanksgiving.',
  'Make a joyful noise to the Lord, all the earth! Serve the Lord with gladness! Come into his presence with singing!',
  'Luke 6:27-38',
  'Jesus said to his disciples: "Love your enemies, do good to those who hate you, bless those who curse you, pray for those who mistreat you."',
  'A reading from the holy Gospel according to Luke'
);

-- 2026-02-20 (Fri)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-20',
  'Friday in Ordinary Time',
  'green',
  'ordinary_time',
  '1 John 4:7-12',
  'Beloved, let us love one another, because love is of God; everyone who loves is begotten by God and knows God. Whoever is without love does not know God, for God is love.',
  'A reading from the First Letter of Saint John',
  'Psalm 116:12-19',
  'Precious in the eyes of the Lord is the death of his faithful.',
  'How shall I make a return to the Lord for all the good he has done for me? The cup of salvation I will take up, and I will call upon the name of the Lord.',
  'John 15:12-17',
  'Jesus said to his disciples: "This is my commandment: love one another as I love you. No one has greater love than this, to lay down one''s life for one''s friends."',
  'A reading from the holy Gospel according to John'
);

-- 2026-02-21 (Sat)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-21',
  'Saturday in Ordinary Time',
  'green',
  'ordinary_time',
  'Ephesians 3:14-21',
  'I kneel before the Father, from whom every family in heaven and on earth is named, that he may grant you in accord with the riches of his glory to be strengthened with power through his Spirit in the inner self.',
  'A reading from the Letter of Saint Paul to the Ephesians',
  'Psalm 34:2-9',
  'Taste and see the goodness of the Lord.',
  'I will bless the Lord at all times; his praise shall be always in my mouth. My soul makes its boast in the Lord; let the humble hear and be glad.',
  'Matthew 11:28-30',
  'Jesus said: "Come to me, all you who labor and are burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am meek and humble of heart; and you will find rest for yourselves."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-02-22 (Sun)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-22',
  'Sunday in Ordinary Time',
  'green',
  'ordinary_time',
  'Isaiah 55:10-11',
  'Thus says the Lord: Just as from the heavens the rain and snow come down and do not return there till they have watered the earth, making it fertile and fruitful, giving seed to the one who sows and bread to the one who eats, so shall my word be that goes forth from my mouth; my word shall not return to me void, but shall do my will, achieving the end for which I sent it.',
  'A reading from the Book of the Prophet Isaiah',
  'Psalm 65:10-14',
  'The seed that falls on good ground will yield a fruitful harvest.',
  'You have visited the land and watered it; greatly have you enriched it. God''s watercourses are filled; you have prepared the grain.',
  'Matthew 13:1-23',
  'On that day, Jesus went out of the house and sat down by the sea. Such large crowds gathered around him that he got into a boat and sat down, and the whole crowd stood along the shore. And he spoke to them at length in parables.',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-02-23 (Mon)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-23',
  'Monday in Ordinary Time',
  'green',
  'ordinary_time',
  'Hebrews 11:1-6',
  'Faith is the realization of what is hoped for and evidence of things not seen. Because of it the ancients were well attested. By faith we understand that the universe was ordered by the word of God, so that what is visible came into being through the invisible.',
  'A reading from the Letter to the Hebrews',
  'Psalm 145:2-5',
  'I will praise your name for ever, Lord.',
  'Every day I will bless you; I will praise your name forever and ever. Great is the Lord and worthy of much praise; his grandeur is beyond understanding.',
  'Mark 9:14-29',
  'When Jesus came down from the mountain with Peter, James, and John and approached the disciples, they saw a large crowd around them and scribes arguing with them.',
  'A reading from the holy Gospel according to Mark'
);

-- 2026-02-24 (Tue)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-24',
  'Tuesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Romans 8:28-30',
  'We know that all things work for good for those who love God, who are called according to his purpose. For those he foreknew he also predestined to be conformed to the image of his Son, so that he might be the firstborn among many brothers and sisters.',
  'A reading from the Letter of Saint Paul to the Romans',
  'Psalm 105:1-9',
  'The Lord remembers his covenant for ever.',
  'Give thanks to the Lord, invoke his name; make known among the peoples his deeds. Sing praise to him, play music; proclaim all his wondrous deeds.',
  'Matthew 25:14-30',
  'Jesus told his disciples this parable: "A man going on a journey called in his servants and entrusted his possessions to them. To one he gave five talents; to another, two; to a third, one— to each according to his ability."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-02-25 (Wed)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-25',
  'Wednesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Philippians 4:4-9',
  'Rejoice in the Lord always. I shall say it again: rejoice! Your kindness should be known to all. The Lord is near. Have no anxiety at all, but in everything, by prayer and petition, with thanksgiving, make your requests known to God.',
  'A reading from the Letter of Saint Paul to the Philippians',
  'Psalm 23:1-6',
  'The Lord is my shepherd; there is nothing I shall want.',
  'The Lord is my shepherd; there is nothing I shall want. In green pastures he makes me lie down; to still waters he leads me; he restores my soul.',
  'John 14:27-31',
  'Jesus said to his disciples: "Peace I leave with you; my peace I give to you. Not as the world gives do I give it to you. Do not let your hearts be troubled or afraid."',
  'A reading from the holy Gospel according to John'
);

-- 2026-02-26 (Thu)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-26',
  'Thursday in Ordinary Time',
  'green',
  'ordinary_time',
  'Colossians 3:12-17',
  'Put on, as God''s chosen ones, holy and beloved, heartfelt compassion, kindness, humility, gentleness, and patience, bearing with one another and forgiving one another, if one has a grievance against another; as the Lord has forgiven you, so must you also do.',
  'A reading from the Letter of Saint Paul to the Colossians',
  'Psalm 100:1-5',
  'Enter his gates with thanksgiving.',
  'Make a joyful noise to the Lord, all the earth! Serve the Lord with gladness! Come into his presence with singing!',
  'Luke 6:27-38',
  'Jesus said to his disciples: "Love your enemies, do good to those who hate you, bless those who curse you, pray for those who mistreat you."',
  'A reading from the holy Gospel according to Luke'
);

-- 2026-02-27 (Fri)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-27',
  'Friday in Ordinary Time',
  'green',
  'ordinary_time',
  '1 John 4:7-12',
  'Beloved, let us love one another, because love is of God; everyone who loves is begotten by God and knows God. Whoever is without love does not know God, for God is love.',
  'A reading from the First Letter of Saint John',
  'Psalm 116:12-19',
  'Precious in the eyes of the Lord is the death of his faithful.',
  'How shall I make a return to the Lord for all the good he has done for me? The cup of salvation I will take up, and I will call upon the name of the Lord.',
  'John 15:12-17',
  'Jesus said to his disciples: "This is my commandment: love one another as I love you. No one has greater love than this, to lay down one''s life for one''s friends."',
  'A reading from the holy Gospel according to John'
);

-- 2026-02-28 (Sat)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-02-28',
  'Saturday in Ordinary Time',
  'green',
  'ordinary_time',
  'Ephesians 3:14-21',
  'I kneel before the Father, from whom every family in heaven and on earth is named, that he may grant you in accord with the riches of his glory to be strengthened with power through his Spirit in the inner self.',
  'A reading from the Letter of Saint Paul to the Ephesians',
  'Psalm 34:2-9',
  'Taste and see the goodness of the Lord.',
  'I will bless the Lord at all times; his praise shall be always in my mouth. My soul makes its boast in the Lord; let the humble hear and be glad.',
  'Matthew 11:28-30',
  'Jesus said: "Come to me, all you who labor and are burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am meek and humble of heart; and you will find rest for yourselves."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-03-01 (Sun)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-01',
  'Sunday in Ordinary Time',
  'green',
  'ordinary_time',
  'Isaiah 55:10-11',
  'Thus says the Lord: Just as from the heavens the rain and snow come down and do not return there till they have watered the earth, making it fertile and fruitful, giving seed to the one who sows and bread to the one who eats, so shall my word be that goes forth from my mouth; my word shall not return to me void, but shall do my will, achieving the end for which I sent it.',
  'A reading from the Book of the Prophet Isaiah',
  'Psalm 65:10-14',
  'The seed that falls on good ground will yield a fruitful harvest.',
  'You have visited the land and watered it; greatly have you enriched it. God''s watercourses are filled; you have prepared the grain.',
  'Matthew 13:1-23',
  'On that day, Jesus went out of the house and sat down by the sea. Such large crowds gathered around him that he got into a boat and sat down, and the whole crowd stood along the shore. And he spoke to them at length in parables.',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-03-02 (Mon)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-02',
  'Monday in Ordinary Time',
  'green',
  'ordinary_time',
  'Hebrews 11:1-6',
  'Faith is the realization of what is hoped for and evidence of things not seen. Because of it the ancients were well attested. By faith we understand that the universe was ordered by the word of God, so that what is visible came into being through the invisible.',
  'A reading from the Letter to the Hebrews',
  'Psalm 145:2-5',
  'I will praise your name for ever, Lord.',
  'Every day I will bless you; I will praise your name forever and ever. Great is the Lord and worthy of much praise; his grandeur is beyond understanding.',
  'Mark 9:14-29',
  'When Jesus came down from the mountain with Peter, James, and John and approached the disciples, they saw a large crowd around them and scribes arguing with them.',
  'A reading from the holy Gospel according to Mark'
);

-- 2026-03-03 (Tue)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-03',
  'Tuesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Romans 8:28-30',
  'We know that all things work for good for those who love God, who are called according to his purpose. For those he foreknew he also predestined to be conformed to the image of his Son, so that he might be the firstborn among many brothers and sisters.',
  'A reading from the Letter of Saint Paul to the Romans',
  'Psalm 105:1-9',
  'The Lord remembers his covenant for ever.',
  'Give thanks to the Lord, invoke his name; make known among the peoples his deeds. Sing praise to him, play music; proclaim all his wondrous deeds.',
  'Matthew 25:14-30',
  'Jesus told his disciples this parable: "A man going on a journey called in his servants and entrusted his possessions to them. To one he gave five talents; to another, two; to a third, one— to each according to his ability."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-03-04 (Wed)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-04',
  'Wednesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Philippians 4:4-9',
  'Rejoice in the Lord always. I shall say it again: rejoice! Your kindness should be known to all. The Lord is near. Have no anxiety at all, but in everything, by prayer and petition, with thanksgiving, make your requests known to God.',
  'A reading from the Letter of Saint Paul to the Philippians',
  'Psalm 23:1-6',
  'The Lord is my shepherd; there is nothing I shall want.',
  'The Lord is my shepherd; there is nothing I shall want. In green pastures he makes me lie down; to still waters he leads me; he restores my soul.',
  'John 14:27-31',
  'Jesus said to his disciples: "Peace I leave with you; my peace I give to you. Not as the world gives do I give it to you. Do not let your hearts be troubled or afraid."',
  'A reading from the holy Gospel according to John'
);

-- 2026-03-05 (Thu)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-05',
  'Thursday in Ordinary Time',
  'green',
  'ordinary_time',
  'Colossians 3:12-17',
  'Put on, as God''s chosen ones, holy and beloved, heartfelt compassion, kindness, humility, gentleness, and patience, bearing with one another and forgiving one another, if one has a grievance against another; as the Lord has forgiven you, so must you also do.',
  'A reading from the Letter of Saint Paul to the Colossians',
  'Psalm 100:1-5',
  'Enter his gates with thanksgiving.',
  'Make a joyful noise to the Lord, all the earth! Serve the Lord with gladness! Come into his presence with singing!',
  'Luke 6:27-38',
  'Jesus said to his disciples: "Love your enemies, do good to those who hate you, bless those who curse you, pray for those who mistreat you."',
  'A reading from the holy Gospel according to Luke'
);

-- 2026-03-06 (Fri)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-06',
  'Friday in Ordinary Time',
  'green',
  'ordinary_time',
  '1 John 4:7-12',
  'Beloved, let us love one another, because love is of God; everyone who loves is begotten by God and knows God. Whoever is without love does not know God, for God is love.',
  'A reading from the First Letter of Saint John',
  'Psalm 116:12-19',
  'Precious in the eyes of the Lord is the death of his faithful.',
  'How shall I make a return to the Lord for all the good he has done for me? The cup of salvation I will take up, and I will call upon the name of the Lord.',
  'John 15:12-17',
  'Jesus said to his disciples: "This is my commandment: love one another as I love you. No one has greater love than this, to lay down one''s life for one''s friends."',
  'A reading from the holy Gospel according to John'
);

-- 2026-03-07 (Sat)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-07',
  'Saturday in Ordinary Time',
  'green',
  'ordinary_time',
  'Ephesians 3:14-21',
  'I kneel before the Father, from whom every family in heaven and on earth is named, that he may grant you in accord with the riches of his glory to be strengthened with power through his Spirit in the inner self.',
  'A reading from the Letter of Saint Paul to the Ephesians',
  'Psalm 34:2-9',
  'Taste and see the goodness of the Lord.',
  'I will bless the Lord at all times; his praise shall be always in my mouth. My soul makes its boast in the Lord; let the humble hear and be glad.',
  'Matthew 11:28-30',
  'Jesus said: "Come to me, all you who labor and are burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am meek and humble of heart; and you will find rest for yourselves."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-03-08 (Sun)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-08',
  'Sunday in Ordinary Time',
  'green',
  'ordinary_time',
  'Isaiah 55:10-11',
  'Thus says the Lord: Just as from the heavens the rain and snow come down and do not return there till they have watered the earth, making it fertile and fruitful, giving seed to the one who sows and bread to the one who eats, so shall my word be that goes forth from my mouth; my word shall not return to me void, but shall do my will, achieving the end for which I sent it.',
  'A reading from the Book of the Prophet Isaiah',
  'Psalm 65:10-14',
  'The seed that falls on good ground will yield a fruitful harvest.',
  'You have visited the land and watered it; greatly have you enriched it. God''s watercourses are filled; you have prepared the grain.',
  'Matthew 13:1-23',
  'On that day, Jesus went out of the house and sat down by the sea. Such large crowds gathered around him that he got into a boat and sat down, and the whole crowd stood along the shore. And he spoke to them at length in parables.',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-03-09 (Mon)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-09',
  'Monday in Ordinary Time',
  'green',
  'ordinary_time',
  'Hebrews 11:1-6',
  'Faith is the realization of what is hoped for and evidence of things not seen. Because of it the ancients were well attested. By faith we understand that the universe was ordered by the word of God, so that what is visible came into being through the invisible.',
  'A reading from the Letter to the Hebrews',
  'Psalm 145:2-5',
  'I will praise your name for ever, Lord.',
  'Every day I will bless you; I will praise your name forever and ever. Great is the Lord and worthy of much praise; his grandeur is beyond understanding.',
  'Mark 9:14-29',
  'When Jesus came down from the mountain with Peter, James, and John and approached the disciples, they saw a large crowd around them and scribes arguing with them.',
  'A reading from the holy Gospel according to Mark'
);

-- 2026-03-10 (Tue)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-10',
  'Tuesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Romans 8:28-30',
  'We know that all things work for good for those who love God, who are called according to his purpose. For those he foreknew he also predestined to be conformed to the image of his Son, so that he might be the firstborn among many brothers and sisters.',
  'A reading from the Letter of Saint Paul to the Romans',
  'Psalm 105:1-9',
  'The Lord remembers his covenant for ever.',
  'Give thanks to the Lord, invoke his name; make known among the peoples his deeds. Sing praise to him, play music; proclaim all his wondrous deeds.',
  'Matthew 25:14-30',
  'Jesus told his disciples this parable: "A man going on a journey called in his servants and entrusted his possessions to them. To one he gave five talents; to another, two; to a third, one— to each according to his ability."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-03-11 (Wed)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-11',
  'Wednesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Philippians 4:4-9',
  'Rejoice in the Lord always. I shall say it again: rejoice! Your kindness should be known to all. The Lord is near. Have no anxiety at all, but in everything, by prayer and petition, with thanksgiving, make your requests known to God.',
  'A reading from the Letter of Saint Paul to the Philippians',
  'Psalm 23:1-6',
  'The Lord is my shepherd; there is nothing I shall want.',
  'The Lord is my shepherd; there is nothing I shall want. In green pastures he makes me lie down; to still waters he leads me; he restores my soul.',
  'John 14:27-31',
  'Jesus said to his disciples: "Peace I leave with you; my peace I give to you. Not as the world gives do I give it to you. Do not let your hearts be troubled or afraid."',
  'A reading from the holy Gospel according to John'
);

-- 2026-03-12 (Thu)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-12',
  'Thursday in Ordinary Time',
  'green',
  'ordinary_time',
  'Colossians 3:12-17',
  'Put on, as God''s chosen ones, holy and beloved, heartfelt compassion, kindness, humility, gentleness, and patience, bearing with one another and forgiving one another, if one has a grievance against another; as the Lord has forgiven you, so must you also do.',
  'A reading from the Letter of Saint Paul to the Colossians',
  'Psalm 100:1-5',
  'Enter his gates with thanksgiving.',
  'Make a joyful noise to the Lord, all the earth! Serve the Lord with gladness! Come into his presence with singing!',
  'Luke 6:27-38',
  'Jesus said to his disciples: "Love your enemies, do good to those who hate you, bless those who curse you, pray for those who mistreat you."',
  'A reading from the holy Gospel according to Luke'
);

-- 2026-03-13 (Fri)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-13',
  'Friday in Ordinary Time',
  'green',
  'ordinary_time',
  '1 John 4:7-12',
  'Beloved, let us love one another, because love is of God; everyone who loves is begotten by God and knows God. Whoever is without love does not know God, for God is love.',
  'A reading from the First Letter of Saint John',
  'Psalm 116:12-19',
  'Precious in the eyes of the Lord is the death of his faithful.',
  'How shall I make a return to the Lord for all the good he has done for me? The cup of salvation I will take up, and I will call upon the name of the Lord.',
  'John 15:12-17',
  'Jesus said to his disciples: "This is my commandment: love one another as I love you. No one has greater love than this, to lay down one''s life for one''s friends."',
  'A reading from the holy Gospel according to John'
);

-- 2026-03-14 (Sat)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-14',
  'Saturday in Ordinary Time',
  'green',
  'ordinary_time',
  'Ephesians 3:14-21',
  'I kneel before the Father, from whom every family in heaven and on earth is named, that he may grant you in accord with the riches of his glory to be strengthened with power through his Spirit in the inner self.',
  'A reading from the Letter of Saint Paul to the Ephesians',
  'Psalm 34:2-9',
  'Taste and see the goodness of the Lord.',
  'I will bless the Lord at all times; his praise shall be always in my mouth. My soul makes its boast in the Lord; let the humble hear and be glad.',
  'Matthew 11:28-30',
  'Jesus said: "Come to me, all you who labor and are burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am meek and humble of heart; and you will find rest for yourselves."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-03-15 (Sun)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-15',
  'Sunday in Ordinary Time',
  'green',
  'ordinary_time',
  'Isaiah 55:10-11',
  'Thus says the Lord: Just as from the heavens the rain and snow come down and do not return there till they have watered the earth, making it fertile and fruitful, giving seed to the one who sows and bread to the one who eats, so shall my word be that goes forth from my mouth; my word shall not return to me void, but shall do my will, achieving the end for which I sent it.',
  'A reading from the Book of the Prophet Isaiah',
  'Psalm 65:10-14',
  'The seed that falls on good ground will yield a fruitful harvest.',
  'You have visited the land and watered it; greatly have you enriched it. God''s watercourses are filled; you have prepared the grain.',
  'Matthew 13:1-23',
  'On that day, Jesus went out of the house and sat down by the sea. Such large crowds gathered around him that he got into a boat and sat down, and the whole crowd stood along the shore. And he spoke to them at length in parables.',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-03-16 (Mon)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-16',
  'Monday in Ordinary Time',
  'green',
  'ordinary_time',
  'Hebrews 11:1-6',
  'Faith is the realization of what is hoped for and evidence of things not seen. Because of it the ancients were well attested. By faith we understand that the universe was ordered by the word of God, so that what is visible came into being through the invisible.',
  'A reading from the Letter to the Hebrews',
  'Psalm 145:2-5',
  'I will praise your name for ever, Lord.',
  'Every day I will bless you; I will praise your name forever and ever. Great is the Lord and worthy of much praise; his grandeur is beyond understanding.',
  'Mark 9:14-29',
  'When Jesus came down from the mountain with Peter, James, and John and approached the disciples, they saw a large crowd around them and scribes arguing with them.',
  'A reading from the holy Gospel according to Mark'
);

-- 2026-03-17 (Tue)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-17',
  'Tuesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Romans 8:28-30',
  'We know that all things work for good for those who love God, who are called according to his purpose. For those he foreknew he also predestined to be conformed to the image of his Son, so that he might be the firstborn among many brothers and sisters.',
  'A reading from the Letter of Saint Paul to the Romans',
  'Psalm 105:1-9',
  'The Lord remembers his covenant for ever.',
  'Give thanks to the Lord, invoke his name; make known among the peoples his deeds. Sing praise to him, play music; proclaim all his wondrous deeds.',
  'Matthew 25:14-30',
  'Jesus told his disciples this parable: "A man going on a journey called in his servants and entrusted his possessions to them. To one he gave five talents; to another, two; to a third, one— to each according to his ability."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-03-18 (Wed)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-18',
  'Wednesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Philippians 4:4-9',
  'Rejoice in the Lord always. I shall say it again: rejoice! Your kindness should be known to all. The Lord is near. Have no anxiety at all, but in everything, by prayer and petition, with thanksgiving, make your requests known to God.',
  'A reading from the Letter of Saint Paul to the Philippians',
  'Psalm 23:1-6',
  'The Lord is my shepherd; there is nothing I shall want.',
  'The Lord is my shepherd; there is nothing I shall want. In green pastures he makes me lie down; to still waters he leads me; he restores my soul.',
  'John 14:27-31',
  'Jesus said to his disciples: "Peace I leave with you; my peace I give to you. Not as the world gives do I give it to you. Do not let your hearts be troubled or afraid."',
  'A reading from the holy Gospel according to John'
);

-- 2026-03-19 (Thu)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-19',
  'Thursday in Ordinary Time',
  'green',
  'ordinary_time',
  'Colossians 3:12-17',
  'Put on, as God''s chosen ones, holy and beloved, heartfelt compassion, kindness, humility, gentleness, and patience, bearing with one another and forgiving one another, if one has a grievance against another; as the Lord has forgiven you, so must you also do.',
  'A reading from the Letter of Saint Paul to the Colossians',
  'Psalm 100:1-5',
  'Enter his gates with thanksgiving.',
  'Make a joyful noise to the Lord, all the earth! Serve the Lord with gladness! Come into his presence with singing!',
  'Luke 6:27-38',
  'Jesus said to his disciples: "Love your enemies, do good to those who hate you, bless those who curse you, pray for those who mistreat you."',
  'A reading from the holy Gospel according to Luke'
);

-- 2026-03-20 (Fri)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-20',
  'Friday in Ordinary Time',
  'green',
  'ordinary_time',
  '1 John 4:7-12',
  'Beloved, let us love one another, because love is of God; everyone who loves is begotten by God and knows God. Whoever is without love does not know God, for God is love.',
  'A reading from the First Letter of Saint John',
  'Psalm 116:12-19',
  'Precious in the eyes of the Lord is the death of his faithful.',
  'How shall I make a return to the Lord for all the good he has done for me? The cup of salvation I will take up, and I will call upon the name of the Lord.',
  'John 15:12-17',
  'Jesus said to his disciples: "This is my commandment: love one another as I love you. No one has greater love than this, to lay down one''s life for one''s friends."',
  'A reading from the holy Gospel according to John'
);

-- 2026-03-21 (Sat)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-21',
  'Saturday in Ordinary Time',
  'green',
  'ordinary_time',
  'Ephesians 3:14-21',
  'I kneel before the Father, from whom every family in heaven and on earth is named, that he may grant you in accord with the riches of his glory to be strengthened with power through his Spirit in the inner self.',
  'A reading from the Letter of Saint Paul to the Ephesians',
  'Psalm 34:2-9',
  'Taste and see the goodness of the Lord.',
  'I will bless the Lord at all times; his praise shall be always in my mouth. My soul makes its boast in the Lord; let the humble hear and be glad.',
  'Matthew 11:28-30',
  'Jesus said: "Come to me, all you who labor and are burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am meek and humble of heart; and you will find rest for yourselves."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-03-22 (Sun)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-22',
  'Sunday in Ordinary Time',
  'green',
  'ordinary_time',
  'Isaiah 55:10-11',
  'Thus says the Lord: Just as from the heavens the rain and snow come down and do not return there till they have watered the earth, making it fertile and fruitful, giving seed to the one who sows and bread to the one who eats, so shall my word be that goes forth from my mouth; my word shall not return to me void, but shall do my will, achieving the end for which I sent it.',
  'A reading from the Book of the Prophet Isaiah',
  'Psalm 65:10-14',
  'The seed that falls on good ground will yield a fruitful harvest.',
  'You have visited the land and watered it; greatly have you enriched it. God''s watercourses are filled; you have prepared the grain.',
  'Matthew 13:1-23',
  'On that day, Jesus went out of the house and sat down by the sea. Such large crowds gathered around him that he got into a boat and sat down, and the whole crowd stood along the shore. And he spoke to them at length in parables.',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-03-23 (Mon)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-23',
  'Monday in Ordinary Time',
  'green',
  'ordinary_time',
  'Hebrews 11:1-6',
  'Faith is the realization of what is hoped for and evidence of things not seen. Because of it the ancients were well attested. By faith we understand that the universe was ordered by the word of God, so that what is visible came into being through the invisible.',
  'A reading from the Letter to the Hebrews',
  'Psalm 145:2-5',
  'I will praise your name for ever, Lord.',
  'Every day I will bless you; I will praise your name forever and ever. Great is the Lord and worthy of much praise; his grandeur is beyond understanding.',
  'Mark 9:14-29',
  'When Jesus came down from the mountain with Peter, James, and John and approached the disciples, they saw a large crowd around them and scribes arguing with them.',
  'A reading from the holy Gospel according to Mark'
);

-- 2026-03-24 (Tue)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-24',
  'Tuesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Romans 8:28-30',
  'We know that all things work for good for those who love God, who are called according to his purpose. For those he foreknew he also predestined to be conformed to the image of his Son, so that he might be the firstborn among many brothers and sisters.',
  'A reading from the Letter of Saint Paul to the Romans',
  'Psalm 105:1-9',
  'The Lord remembers his covenant for ever.',
  'Give thanks to the Lord, invoke his name; make known among the peoples his deeds. Sing praise to him, play music; proclaim all his wondrous deeds.',
  'Matthew 25:14-30',
  'Jesus told his disciples this parable: "A man going on a journey called in his servants and entrusted his possessions to them. To one he gave five talents; to another, two; to a third, one— to each according to his ability."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-03-25 (Wed)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-25',
  'Wednesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Philippians 4:4-9',
  'Rejoice in the Lord always. I shall say it again: rejoice! Your kindness should be known to all. The Lord is near. Have no anxiety at all, but in everything, by prayer and petition, with thanksgiving, make your requests known to God.',
  'A reading from the Letter of Saint Paul to the Philippians',
  'Psalm 23:1-6',
  'The Lord is my shepherd; there is nothing I shall want.',
  'The Lord is my shepherd; there is nothing I shall want. In green pastures he makes me lie down; to still waters he leads me; he restores my soul.',
  'John 14:27-31',
  'Jesus said to his disciples: "Peace I leave with you; my peace I give to you. Not as the world gives do I give it to you. Do not let your hearts be troubled or afraid."',
  'A reading from the holy Gospel according to John'
);

-- 2026-03-26 (Thu)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-26',
  'Thursday in Ordinary Time',
  'green',
  'ordinary_time',
  'Colossians 3:12-17',
  'Put on, as God''s chosen ones, holy and beloved, heartfelt compassion, kindness, humility, gentleness, and patience, bearing with one another and forgiving one another, if one has a grievance against another; as the Lord has forgiven you, so must you also do.',
  'A reading from the Letter of Saint Paul to the Colossians',
  'Psalm 100:1-5',
  'Enter his gates with thanksgiving.',
  'Make a joyful noise to the Lord, all the earth! Serve the Lord with gladness! Come into his presence with singing!',
  'Luke 6:27-38',
  'Jesus said to his disciples: "Love your enemies, do good to those who hate you, bless those who curse you, pray for those who mistreat you."',
  'A reading from the holy Gospel according to Luke'
);

-- 2026-03-27 (Fri)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-27',
  'Friday in Ordinary Time',
  'green',
  'ordinary_time',
  '1 John 4:7-12',
  'Beloved, let us love one another, because love is of God; everyone who loves is begotten by God and knows God. Whoever is without love does not know God, for God is love.',
  'A reading from the First Letter of Saint John',
  'Psalm 116:12-19',
  'Precious in the eyes of the Lord is the death of his faithful.',
  'How shall I make a return to the Lord for all the good he has done for me? The cup of salvation I will take up, and I will call upon the name of the Lord.',
  'John 15:12-17',
  'Jesus said to his disciples: "This is my commandment: love one another as I love you. No one has greater love than this, to lay down one''s life for one''s friends."',
  'A reading from the holy Gospel according to John'
);

-- 2026-03-28 (Sat)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-28',
  'Saturday in Ordinary Time',
  'green',
  'ordinary_time',
  'Ephesians 3:14-21',
  'I kneel before the Father, from whom every family in heaven and on earth is named, that he may grant you in accord with the riches of his glory to be strengthened with power through his Spirit in the inner self.',
  'A reading from the Letter of Saint Paul to the Ephesians',
  'Psalm 34:2-9',
  'Taste and see the goodness of the Lord.',
  'I will bless the Lord at all times; his praise shall be always in my mouth. My soul makes its boast in the Lord; let the humble hear and be glad.',
  'Matthew 11:28-30',
  'Jesus said: "Come to me, all you who labor and are burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am meek and humble of heart; and you will find rest for yourselves."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-03-29 (Sun)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-29',
  'Sunday in Ordinary Time',
  'green',
  'ordinary_time',
  'Isaiah 55:10-11',
  'Thus says the Lord: Just as from the heavens the rain and snow come down and do not return there till they have watered the earth, making it fertile and fruitful, giving seed to the one who sows and bread to the one who eats, so shall my word be that goes forth from my mouth; my word shall not return to me void, but shall do my will, achieving the end for which I sent it.',
  'A reading from the Book of the Prophet Isaiah',
  'Psalm 65:10-14',
  'The seed that falls on good ground will yield a fruitful harvest.',
  'You have visited the land and watered it; greatly have you enriched it. God''s watercourses are filled; you have prepared the grain.',
  'Matthew 13:1-23',
  'On that day, Jesus went out of the house and sat down by the sea. Such large crowds gathered around him that he got into a boat and sat down, and the whole crowd stood along the shore. And he spoke to them at length in parables.',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-03-30 (Mon)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-30',
  'Monday in Ordinary Time',
  'green',
  'ordinary_time',
  'Hebrews 11:1-6',
  'Faith is the realization of what is hoped for and evidence of things not seen. Because of it the ancients were well attested. By faith we understand that the universe was ordered by the word of God, so that what is visible came into being through the invisible.',
  'A reading from the Letter to the Hebrews',
  'Psalm 145:2-5',
  'I will praise your name for ever, Lord.',
  'Every day I will bless you; I will praise your name forever and ever. Great is the Lord and worthy of much praise; his grandeur is beyond understanding.',
  'Mark 9:14-29',
  'When Jesus came down from the mountain with Peter, James, and John and approached the disciples, they saw a large crowd around them and scribes arguing with them.',
  'A reading from the holy Gospel according to Mark'
);

-- 2026-03-31 (Tue)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-03-31',
  'Tuesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Romans 8:28-30',
  'We know that all things work for good for those who love God, who are called according to his purpose. For those he foreknew he also predestined to be conformed to the image of his Son, so that he might be the firstborn among many brothers and sisters.',
  'A reading from the Letter of Saint Paul to the Romans',
  'Psalm 105:1-9',
  'The Lord remembers his covenant for ever.',
  'Give thanks to the Lord, invoke his name; make known among the peoples his deeds. Sing praise to him, play music; proclaim all his wondrous deeds.',
  'Matthew 25:14-30',
  'Jesus told his disciples this parable: "A man going on a journey called in his servants and entrusted his possessions to them. To one he gave five talents; to another, two; to a third, one— to each according to his ability."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-04-01 (Wed)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-04-01',
  'Wednesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Philippians 4:4-9',
  'Rejoice in the Lord always. I shall say it again: rejoice! Your kindness should be known to all. The Lord is near. Have no anxiety at all, but in everything, by prayer and petition, with thanksgiving, make your requests known to God.',
  'A reading from the Letter of Saint Paul to the Philippians',
  'Psalm 23:1-6',
  'The Lord is my shepherd; there is nothing I shall want.',
  'The Lord is my shepherd; there is nothing I shall want. In green pastures he makes me lie down; to still waters he leads me; he restores my soul.',
  'John 14:27-31',
  'Jesus said to his disciples: "Peace I leave with you; my peace I give to you. Not as the world gives do I give it to you. Do not let your hearts be troubled or afraid."',
  'A reading from the holy Gospel according to John'
);

-- 2026-04-02 (Thu)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-04-02',
  'Thursday in Ordinary Time',
  'green',
  'ordinary_time',
  'Colossians 3:12-17',
  'Put on, as God''s chosen ones, holy and beloved, heartfelt compassion, kindness, humility, gentleness, and patience, bearing with one another and forgiving one another, if one has a grievance against another; as the Lord has forgiven you, so must you also do.',
  'A reading from the Letter of Saint Paul to the Colossians',
  'Psalm 100:1-5',
  'Enter his gates with thanksgiving.',
  'Make a joyful noise to the Lord, all the earth! Serve the Lord with gladness! Come into his presence with singing!',
  'Luke 6:27-38',
  'Jesus said to his disciples: "Love your enemies, do good to those who hate you, bless those who curse you, pray for those who mistreat you."',
  'A reading from the holy Gospel according to Luke'
);

-- 2026-04-03 (Fri)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-04-03',
  'Friday in Ordinary Time',
  'green',
  'ordinary_time',
  '1 John 4:7-12',
  'Beloved, let us love one another, because love is of God; everyone who loves is begotten by God and knows God. Whoever is without love does not know God, for God is love.',
  'A reading from the First Letter of Saint John',
  'Psalm 116:12-19',
  'Precious in the eyes of the Lord is the death of his faithful.',
  'How shall I make a return to the Lord for all the good he has done for me? The cup of salvation I will take up, and I will call upon the name of the Lord.',
  'John 15:12-17',
  'Jesus said to his disciples: "This is my commandment: love one another as I love you. No one has greater love than this, to lay down one''s life for one''s friends."',
  'A reading from the holy Gospel according to John'
);

-- 2026-04-04 (Sat)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-04-04',
  'Saturday in Ordinary Time',
  'green',
  'ordinary_time',
  'Ephesians 3:14-21',
  'I kneel before the Father, from whom every family in heaven and on earth is named, that he may grant you in accord with the riches of his glory to be strengthened with power through his Spirit in the inner self.',
  'A reading from the Letter of Saint Paul to the Ephesians',
  'Psalm 34:2-9',
  'Taste and see the goodness of the Lord.',
  'I will bless the Lord at all times; his praise shall be always in my mouth. My soul makes its boast in the Lord; let the humble hear and be glad.',
  'Matthew 11:28-30',
  'Jesus said: "Come to me, all you who labor and are burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am meek and humble of heart; and you will find rest for yourselves."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-04-05 (Sun)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-04-05',
  'Sunday in Ordinary Time',
  'green',
  'ordinary_time',
  'Isaiah 55:10-11',
  'Thus says the Lord: Just as from the heavens the rain and snow come down and do not return there till they have watered the earth, making it fertile and fruitful, giving seed to the one who sows and bread to the one who eats, so shall my word be that goes forth from my mouth; my word shall not return to me void, but shall do my will, achieving the end for which I sent it.',
  'A reading from the Book of the Prophet Isaiah',
  'Psalm 65:10-14',
  'The seed that falls on good ground will yield a fruitful harvest.',
  'You have visited the land and watered it; greatly have you enriched it. God''s watercourses are filled; you have prepared the grain.',
  'Matthew 13:1-23',
  'On that day, Jesus went out of the house and sat down by the sea. Such large crowds gathered around him that he got into a boat and sat down, and the whole crowd stood along the shore. And he spoke to them at length in parables.',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-04-06 (Mon)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-04-06',
  'Monday in Ordinary Time',
  'green',
  'ordinary_time',
  'Hebrews 11:1-6',
  'Faith is the realization of what is hoped for and evidence of things not seen. Because of it the ancients were well attested. By faith we understand that the universe was ordered by the word of God, so that what is visible came into being through the invisible.',
  'A reading from the Letter to the Hebrews',
  'Psalm 145:2-5',
  'I will praise your name for ever, Lord.',
  'Every day I will bless you; I will praise your name forever and ever. Great is the Lord and worthy of much praise; his grandeur is beyond understanding.',
  'Mark 9:14-29',
  'When Jesus came down from the mountain with Peter, James, and John and approached the disciples, they saw a large crowd around them and scribes arguing with them.',
  'A reading from the holy Gospel according to Mark'
);

-- 2026-04-07 (Tue)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-04-07',
  'Tuesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Romans 8:28-30',
  'We know that all things work for good for those who love God, who are called according to his purpose. For those he foreknew he also predestined to be conformed to the image of his Son, so that he might be the firstborn among many brothers and sisters.',
  'A reading from the Letter of Saint Paul to the Romans',
  'Psalm 105:1-9',
  'The Lord remembers his covenant for ever.',
  'Give thanks to the Lord, invoke his name; make known among the peoples his deeds. Sing praise to him, play music; proclaim all his wondrous deeds.',
  'Matthew 25:14-30',
  'Jesus told his disciples this parable: "A man going on a journey called in his servants and entrusted his possessions to them. To one he gave five talents; to another, two; to a third, one— to each according to his ability."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-04-08 (Wed)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-04-08',
  'Wednesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Philippians 4:4-9',
  'Rejoice in the Lord always. I shall say it again: rejoice! Your kindness should be known to all. The Lord is near. Have no anxiety at all, but in everything, by prayer and petition, with thanksgiving, make your requests known to God.',
  'A reading from the Letter of Saint Paul to the Philippians',
  'Psalm 23:1-6',
  'The Lord is my shepherd; there is nothing I shall want.',
  'The Lord is my shepherd; there is nothing I shall want. In green pastures he makes me lie down; to still waters he leads me; he restores my soul.',
  'John 14:27-31',
  'Jesus said to his disciples: "Peace I leave with you; my peace I give to you. Not as the world gives do I give it to you. Do not let your hearts be troubled or afraid."',
  'A reading from the holy Gospel according to John'
);

-- 2026-04-09 (Thu)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-04-09',
  'Thursday in Ordinary Time',
  'green',
  'ordinary_time',
  'Colossians 3:12-17',
  'Put on, as God''s chosen ones, holy and beloved, heartfelt compassion, kindness, humility, gentleness, and patience, bearing with one another and forgiving one another, if one has a grievance against another; as the Lord has forgiven you, so must you also do.',
  'A reading from the Letter of Saint Paul to the Colossians',
  'Psalm 100:1-5',
  'Enter his gates with thanksgiving.',
  'Make a joyful noise to the Lord, all the earth! Serve the Lord with gladness! Come into his presence with singing!',
  'Luke 6:27-38',
  'Jesus said to his disciples: "Love your enemies, do good to those who hate you, bless those who curse you, pray for those who mistreat you."',
  'A reading from the holy Gospel according to Luke'
);

-- 2026-04-10 (Fri)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-04-10',
  'Friday in Ordinary Time',
  'green',
  'ordinary_time',
  '1 John 4:7-12',
  'Beloved, let us love one another, because love is of God; everyone who loves is begotten by God and knows God. Whoever is without love does not know God, for God is love.',
  'A reading from the First Letter of Saint John',
  'Psalm 116:12-19',
  'Precious in the eyes of the Lord is the death of his faithful.',
  'How shall I make a return to the Lord for all the good he has done for me? The cup of salvation I will take up, and I will call upon the name of the Lord.',
  'John 15:12-17',
  'Jesus said to his disciples: "This is my commandment: love one another as I love you. No one has greater love than this, to lay down one''s life for one''s friends."',
  'A reading from the holy Gospel according to John'
);

-- 2026-04-11 (Sat)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-04-11',
  'Saturday in Ordinary Time',
  'green',
  'ordinary_time',
  'Ephesians 3:14-21',
  'I kneel before the Father, from whom every family in heaven and on earth is named, that he may grant you in accord with the riches of his glory to be strengthened with power through his Spirit in the inner self.',
  'A reading from the Letter of Saint Paul to the Ephesians',
  'Psalm 34:2-9',
  'Taste and see the goodness of the Lord.',
  'I will bless the Lord at all times; his praise shall be always in my mouth. My soul makes its boast in the Lord; let the humble hear and be glad.',
  'Matthew 11:28-30',
  'Jesus said: "Come to me, all you who labor and are burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am meek and humble of heart; and you will find rest for yourselves."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-04-12 (Sun)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-04-12',
  'Sunday in Ordinary Time',
  'green',
  'ordinary_time',
  'Isaiah 55:10-11',
  'Thus says the Lord: Just as from the heavens the rain and snow come down and do not return there till they have watered the earth, making it fertile and fruitful, giving seed to the one who sows and bread to the one who eats, so shall my word be that goes forth from my mouth; my word shall not return to me void, but shall do my will, achieving the end for which I sent it.',
  'A reading from the Book of the Prophet Isaiah',
  'Psalm 65:10-14',
  'The seed that falls on good ground will yield a fruitful harvest.',
  'You have visited the land and watered it; greatly have you enriched it. God''s watercourses are filled; you have prepared the grain.',
  'Matthew 13:1-23',
  'On that day, Jesus went out of the house and sat down by the sea. Such large crowds gathered around him that he got into a boat and sat down, and the whole crowd stood along the shore. And he spoke to them at length in parables.',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-04-13 (Mon)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-04-13',
  'Monday in Ordinary Time',
  'green',
  'ordinary_time',
  'Hebrews 11:1-6',
  'Faith is the realization of what is hoped for and evidence of things not seen. Because of it the ancients were well attested. By faith we understand that the universe was ordered by the word of God, so that what is visible came into being through the invisible.',
  'A reading from the Letter to the Hebrews',
  'Psalm 145:2-5',
  'I will praise your name for ever, Lord.',
  'Every day I will bless you; I will praise your name forever and ever. Great is the Lord and worthy of much praise; his grandeur is beyond understanding.',
  'Mark 9:14-29',
  'When Jesus came down from the mountain with Peter, James, and John and approached the disciples, they saw a large crowd around them and scribes arguing with them.',
  'A reading from the holy Gospel according to Mark'
);

-- 2026-04-14 (Tue)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-04-14',
  'Tuesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Romans 8:28-30',
  'We know that all things work for good for those who love God, who are called according to his purpose. For those he foreknew he also predestined to be conformed to the image of his Son, so that he might be the firstborn among many brothers and sisters.',
  'A reading from the Letter of Saint Paul to the Romans',
  'Psalm 105:1-9',
  'The Lord remembers his covenant for ever.',
  'Give thanks to the Lord, invoke his name; make known among the peoples his deeds. Sing praise to him, play music; proclaim all his wondrous deeds.',
  'Matthew 25:14-30',
  'Jesus told his disciples this parable: "A man going on a journey called in his servants and entrusted his possessions to them. To one he gave five talents; to another, two; to a third, one— to each according to his ability."',
  'A reading from the holy Gospel according to Matthew'
);

-- 2026-04-15 (Wed)
INSERT INTO public.daily_readings (
  date, liturgical_day, liturgical_color, season,
  first_reading_reference, first_reading_text, first_reading_introduction,
  psalm_reference, psalm_response, psalm_text,
  gospel_reference, gospel_text, gospel_introduction
) VALUES (
  '2026-04-15',
  'Wednesday in Ordinary Time',
  'green',
  'ordinary_time',
  'Philippians 4:4-9',
  'Rejoice in the Lord always. I shall say it again: rejoice! Your kindness should be known to all. The Lord is near. Have no anxiety at all, but in everything, by prayer and petition, with thanksgiving, make your requests known to God.',
  'A reading from the Letter of Saint Paul to the Philippians',
  'Psalm 23:1-6',
  'The Lord is my shepherd; there is nothing I shall want.',
  'The Lord is my shepherd; there is nothing I shall want. In green pastures he makes me lie down; to still waters he leads me; he restores my soul.',
  'John 14:27-31',
  'Jesus said to his disciples: "Peace I leave with you; my peace I give to you. Not as the world gives do I give it to you. Do not let your hearts be troubled or afraid."',
  'A reading from the holy Gospel according to John'
);

-- Verify: should return 69 rows
SELECT date, liturgical_day, first_reading_reference, gospel_reference FROM public.daily_readings WHERE date >= '2026-02-06' ORDER BY date LIMIT 10;
