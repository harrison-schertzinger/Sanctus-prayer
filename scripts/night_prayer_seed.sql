-- =============================================
-- Night Prayer (Compline) — 7 days
-- Run in Supabase SQL Editor
-- =============================================

-- Clear existing night prayer data
DELETE FROM public.night_prayer;

-- Sunday
INSERT INTO public.night_prayer (
  day_of_week,
  examen_opening_prayer,
  examen_prompts,
  examen_act_of_contrition,
  hymn,
  psalm_antiphon,
  psalm_reference,
  psalm_text,
  reading_reference,
  reading_text,
  responsory_versicle,
  responsory_response,
  canticle_antiphon,
  canticle_text,
  closing_prayer,
  marian_antiphon_name,
  marian_antiphon_text
) VALUES (
  0,
  'God, come to my assistance. Lord, make haste to help me. Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
  '{}',
  '',
  'Now that the daylight dies away,
By all thy grace and love,
Thee, Maker of the world, we pray
To watch our bed above.

Let dreams depart and phantoms fly,
The offspring of the night,
Keep us, like shrines, beneath thine eye,
Pure in our foe''s despite.

This grace on thy redeemed confer,
Father, co-equal Son,
And Holy Ghost, the Comforter,
Eternal Three in One.',
  'He will conceal you with his wings; you will not fear the terror of the night.',
  'Psalm 91',
  'Psalm 91 — The protection of the Most High

He who lives under the protection of the Most High
dwells under the shade of the Almighty.
He will say to the Lord:
"You are my shelter and my strength,
my God, in whom I trust."

For he will free you from the hunter''s snare,
from the voice of the slanderer.
He will shade you with his wings,
you will hide underneath his wings.
His faithfulness will be your armour and your shield.

You will not fear the terror of the night,
nor the arrow that flies by day;
nor the plague that walks in the shadows,
nor the death that lays waste at noon.

A thousand will fall at your side,
at your right hand ten thousand will fall,
but you it will never come near.
You will look with your eyes
and see the reward of sinners.

For the Lord is your shelter and refuge;
you have made the Most High your dwelling-place.
Evil will not reach you,
harm cannot approach your tent;
for he has set his angels to guard you
and keep you safe in all your ways.

They will carry you in their arms
in case you hurt your foot on a stone.
You walk on the viper and cobra,
you will tread on the lion and the serpent.

Because he clung to me, I shall free him:
I shall lift him up because he knows my name.
He will call upon me and for my part, I will hear him:
I am with him in his time of trouble.
I shall rescue him and lead him to glory.
I shall fill him with length of days
and show him my salvation.',
  'Apocalypse 22:4-5',
  'They will see the Lord face to face, and his name will be written on their foreheads. It will never be night again and they will not need lamplight or sunlight, because the Lord God will be shining on them. They will reign for ever and ever.',
  'Into your hands, Lord, I commend my spirit.',
  'Into your hands, Lord, I commend my spirit. You have redeemed us, Lord God of truth. — I commend my spirit. Glory be to the Father, and to the Son, and to the Holy Spirit. — Into your hands, Lord, I commend my spirit.',
  'Save us, Lord, while we are awake; protect us while we sleep; that we may keep watch with Christ and rest with him in peace.',
  'At last, all-powerful Master, you give leave to your servant to go in peace, according to your promise. For my eyes have seen your salvation which you have prepared for all nations, the light to enlighten the Gentiles and give glory to Israel, your people.',
  'God our Father, as we have celebrated today the mystery of the Lord''s resurrection, grant our humble prayer: free us from all harm that we may sleep in peace and rise in joy to sing your praise. Through Christ our Lord. Amen.',
  'Salve Regina',
  'Hail, holy Queen, Mother of mercy, hail, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve: to thee do we send up our sighs, mourning and weeping in this vale of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen.'
);

-- Monday
INSERT INTO public.night_prayer (
  day_of_week,
  examen_opening_prayer,
  examen_prompts,
  examen_act_of_contrition,
  hymn,
  psalm_antiphon,
  psalm_reference,
  psalm_text,
  reading_reference,
  reading_text,
  responsory_versicle,
  responsory_response,
  canticle_antiphon,
  canticle_text,
  closing_prayer,
  marian_antiphon_name,
  marian_antiphon_text
) VALUES (
  1,
  'God, come to my assistance. Lord, make haste to help me. Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
  '{}',
  '',
  'Now that the daylight dies away,
By all thy grace and love,
Thee, Maker of the world, we pray
To watch our bed above.

Let dreams depart and phantoms fly,
The offspring of the night,
Keep us, like shrines, beneath thine eye,
Pure in our foe''s despite.

This grace on thy redeemed confer,
Father, co-equal Son,
And Holy Ghost, the Comforter,
Eternal Three in One.',
  'You, Lord God, are slow to anger, abounding in love.',
  'Psalm 86',
  'Psalm 86 — A poor man''s prayer in time of trouble

Turn your ear to me, Lord, and hear me,
for I am poor and destitute.
Keep my life safe, for I am faithful;
O God, save your servant, who trusts in you.

Take pity upon me, O Lord,
for I call to you all the day long.
Make your servant''s heart glad,
for to you, O Lord, I have raised it.

For you, Lord, are gentle and mild:
you are kind to all those who call on you.
Let your ears hear my prayer, O Lord!
Turn to the voice of my pleading!

In my time of trouble I call on you,
for you, O Lord, will hear me.
No other god is like you, O Lord,
and nothing compares with your works.

All people – all nations you made –
will come and worship before you;
they will give glory to your name.
For you are great, you work wonders:
you alone are God.

O Lord, teach me your paths,
and I will come to your truth.
Make my heart simple and guileless,
so that it honours your name.

I will proclaim you, Lord my God,
and give you praise with all my heart.
I will give glory to your name for ever,
for your great kindness is upon me:
you have rescued me from the deepest depths.

O God, the proud rise against me,
in the meetings of the powerful they seek my life:
they do not keep you in their sight.

And you, Lord, are a God of compassion,
full of mercies, patient and true.
Look upon me, have mercy upon me,
give your strength and protection to your servant:
your servant, the child of your handmaid.

Give me a sign of your goodness,
let my enemies see it and be confounded;
because you, O Lord, have helped me
and given me comfort.',
  '1 Thessalonians 5:9-10',
  'God chose us to possess salvation through our Lord Jesus Christ, who died for us in order that we might live together with him, whether we are alive or dead when he comes.',
  'Into your hands, Lord, I commend my spirit.',
  'Into your hands, Lord, I commend my spirit. You have redeemed us, Lord God of truth. — I commend my spirit. Glory be to the Father, and to the Son, and to the Holy Spirit. — Into your hands, Lord, I commend my spirit.',
  'Save us, Lord, while we are awake; protect us while we sleep; that we may keep watch with Christ and rest with him in peace.',
  'At last, all-powerful Master, you give leave to your servant to go in peace, according to your promise. For my eyes have seen your salvation which you have prepared for all nations, the light to enlighten the Gentiles and give glory to Israel, your people.',
  'Lord, give our bodies restful sleep; and let the work we have done today be sown for an eternal harvest. Through Christ our Lord. Amen.',
  'Salve Regina',
  'Hail, holy Queen, Mother of mercy, hail, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve: to thee do we send up our sighs, mourning and weeping in this vale of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen.'
);

-- Tuesday
INSERT INTO public.night_prayer (
  day_of_week,
  examen_opening_prayer,
  examen_prompts,
  examen_act_of_contrition,
  hymn,
  psalm_antiphon,
  psalm_reference,
  psalm_text,
  reading_reference,
  reading_text,
  responsory_versicle,
  responsory_response,
  canticle_antiphon,
  canticle_text,
  closing_prayer,
  marian_antiphon_name,
  marian_antiphon_text
) VALUES (
  2,
  'God, come to my assistance. Lord, make haste to help me. Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
  '{}',
  '',
  'Now that the daylight dies away,
By all thy grace and love,
Thee, Maker of the world, we pray
To watch our bed above.

Let dreams depart and phantoms fly,
The offspring of the night,
Keep us, like shrines, beneath thine eye,
Pure in our foe''s despite.

This grace on thy redeemed confer,
Father, co-equal Son,
And Holy Ghost, the Comforter,
Eternal Three in One.',
  'Do not hide your face from me, for in you have I put my trust.',
  'Psalm 143:1-11',
  'Psalm 143:1-11 — A prayer in time of trouble

Lord, listen to my prayer:
in your faithfulness turn your ear to my pleading;
in your justice, hear me.
Do not judge your servant:
nothing that lives can justify itself before you.

The enemy has hounded my spirit,
he has crushed my life to the ground,
he has shut me in darkness,
like the dead of long ago.
So my spirit trembles within me,
my heart turns to stone.

I remind myself of the days of old,
I reflect on all your works,
I meditate once more on the work of your hands.
I stretch out my arms to you,
I stretch out my soul, like a land without water.

Come quickly and hear me, O Lord,
for my spirit is weakening.
Do not hide your face from me,
do not let me be like the dead,
who go down to the underworld.

Show me your mercy at daybreak,
because of my trust in you.
Tell me the way I should follow,
for I lift up my soul towards you.

Rescue me from my enemies:
Lord, I flee to you for refuge.
Teach me to do your will,
for you are my God.
Your good spirit will lead me
to the land of justice;
for your name''s sake, Lord, you will give me life.
In your righteousness you will lead my soul
away from all tribulation.',
  '1 Peter 5:8-9',
  'Be calm but vigilant, because your enemy the devil is prowling round like a roaring lion, looking for someone to eat. Stand up to him, strong in faith.',
  'Into your hands, Lord, I commend my spirit.',
  'Into your hands, Lord, I commend my spirit. You have redeemed us, Lord God of truth. — I commend my spirit. Glory be to the Father, and to the Son, and to the Holy Spirit. — Into your hands, Lord, I commend my spirit.',
  'Save us, Lord, while we are awake; protect us while we sleep; that we may keep watch with Christ and rest with him in peace.',
  'At last, all-powerful Master, you give leave to your servant to go in peace, according to your promise. For my eyes have seen your salvation which you have prepared for all nations, the light to enlighten the Gentiles and give glory to Israel, your people.',
  'In your mercy, Lord, dispel the darkness of this night. Let your household so sleep in peace that at the dawn of a new day they may, with joy, waken in your name. Through Christ our Lord. Amen.',
  'Salve Regina',
  'Hail, holy Queen, Mother of mercy, hail, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve: to thee do we send up our sighs, mourning and weeping in this vale of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen.'
);

-- Wednesday
INSERT INTO public.night_prayer (
  day_of_week,
  examen_opening_prayer,
  examen_prompts,
  examen_act_of_contrition,
  hymn,
  psalm_antiphon,
  psalm_reference,
  psalm_text,
  reading_reference,
  reading_text,
  responsory_versicle,
  responsory_response,
  canticle_antiphon,
  canticle_text,
  closing_prayer,
  marian_antiphon_name,
  marian_antiphon_text
) VALUES (
  3,
  'God, come to my assistance. Lord, make haste to help me. Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
  '{}',
  '',
  'Now that the daylight dies away,
By all thy grace and love,
Thee, Maker of the world, we pray
To watch our bed above.

Let dreams depart and phantoms fly,
The offspring of the night,
Keep us, like shrines, beneath thine eye,
Pure in our foe''s despite.

This grace on thy redeemed confer,
Father, co-equal Son,
And Holy Ghost, the Comforter,
Eternal Three in One.',
  'O God, be my protector and my refuge.',
  'Psalm 31:1-6; Psalm 130',
  'Psalm 31:1-6 — Trustful prayer in time of adversity

In you, Lord, I put my trust:
may I never be put to shame.
In your justice, set me free,
Turn your ear to me, make haste to rescue me.

Be my rampart, my fortification; keep me safe.
For you are my strength and my refuge:
you will lead me out to the pastures,
for your own name''s sake.

You will lead me out of the trap
that they laid for me – for you are my strength.
Into your hands I commend my spirit:
you have redeemed me, Lord God of truth.

Glory be to the Father and to the Son and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.

Antiphon: O God, be my protector and my refuge.

Antiphon: Out of the depths I cry to you, O Lord.

Psalm 130 — Out of the depths

Out of the depths I have cried to you, Lord:
Lord, hear my voice.
Let your ears listen out
for the voice of my pleading.

If you took notice of our transgressions, Lord –
Lord, who would be left?
But with you is forgiveness,
and for this we revere you.

I rely on you, Lord,
my spirit relies on your promise;
my soul hopes in the Lord,
more than the watchman for daybreak.

More than the watchman for daybreak,
let Israel hope in the Lord:
for with the Lord there is kindness
and abundant redemption.
He himself will redeem Israel
from all its transgressions.',
  'Ephesians 4:26-27',
  'Do not let resentment lead you into sin; the sunset must not find you still angry. Do not give the devil his opportunity.',
  'Into your hands, Lord, I commend my spirit.',
  'Into your hands, Lord, I commend my spirit. You have redeemed us, Lord God of truth. — I commend my spirit. Glory be to the Father, and to the Son, and to the Holy Spirit. — Into your hands, Lord, I commend my spirit.',
  'Save us, Lord, while we are awake; protect us while we sleep; that we may keep watch with Christ and rest with him in peace.',
  'At last, all-powerful Master, you give leave to your servant to go in peace, according to your promise. For my eyes have seen your salvation which you have prepared for all nations, the light to enlighten the Gentiles and give glory to Israel, your people.',
  'Lord Jesus Christ, meek and humble of heart, you offer to those who follow you a yoke that is good to bear, a burden that is light. Accept, we beg you, our prayer and work of this day, and grant us the rest we need that we may be ever more willing to serve you, who live and reign for ever and ever. Amen.',
  'Salve Regina',
  'Hail, holy Queen, Mother of mercy, hail, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve: to thee do we send up our sighs, mourning and weeping in this vale of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen.'
);

-- Thursday
INSERT INTO public.night_prayer (
  day_of_week,
  examen_opening_prayer,
  examen_prompts,
  examen_act_of_contrition,
  hymn,
  psalm_antiphon,
  psalm_reference,
  psalm_text,
  reading_reference,
  reading_text,
  responsory_versicle,
  responsory_response,
  canticle_antiphon,
  canticle_text,
  closing_prayer,
  marian_antiphon_name,
  marian_antiphon_text
) VALUES (
  4,
  'God, come to my assistance. Lord, make haste to help me. Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
  '{}',
  '',
  'Now that the daylight dies away,
By all thy grace and love,
Thee, Maker of the world, we pray
To watch our bed above.

Let dreams depart and phantoms fly,
The offspring of the night,
Keep us, like shrines, beneath thine eye,
Pure in our foe''s despite.

This grace on thy redeemed confer,
Father, co-equal Son,
And Holy Ghost, the Comforter,
Eternal Three in One.',
  'My body shall rest in safety.',
  'Psalm 16',
  'Psalm 16 — The Lord, my inheritance

Preserve me, Lord, I put my hope in you.
I have said to the Lord "You are my Lord,
in you alone is all my good."

As for the holy and noble men of the land,
in them is all my delight.
But for those who run to alien gods,
their sorrows are many.
I will not share in their libations of blood.
I will not speak their names.

You, Lord, are my inheritance and my cup.
You control my destiny,
the lot marked out for me is of the best,
my inheritance is all I could ask for.

I will bless the Lord who gave me understanding;
even in the night my heart will teach me wisdom.
I will hold the Lord for ever in my sight:
with him at my side I can never be shaken.

Thus it is that my heart rejoices,
heart and soul together;
while my body rests in calm hope.
You will not leave my soul in the underworld.
You will not let your chosen one see decay.

You will show me the paths of life,
the fullness of joy before your face,
and delights at your right hand for ever.',
  '1 Thessalonians 5:23',
  'May the God who gives us peace make you completely his, and keep your whole being, spirit, soul, and body, free from all fault, at the coming of our Lord Jesus Christ.',
  'Into your hands, Lord, I commend my spirit.',
  'Into your hands, Lord, I commend my spirit. You have redeemed us, Lord God of truth. — I commend my spirit. Glory be to the Father, and to the Son, and to the Holy Spirit. — Into your hands, Lord, I commend my spirit.',
  'Save us, Lord, while we are awake; protect us while we sleep; that we may keep watch with Christ and rest with him in peace.',
  'At last, all-powerful Master, you give leave to your servant to go in peace, according to your promise. For my eyes have seen your salvation which you have prepared for all nations, the light to enlighten the Gentiles and give glory to Israel, your people.',
  'Lord our God, restore us again by the repose of sleep after the fatigue of our daily work, so that, continually renewed by your help, we may serve you in body and soul. Through Christ our Lord. Amen.',
  'Salve Regina',
  'Hail, holy Queen, Mother of mercy, hail, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve: to thee do we send up our sighs, mourning and weeping in this vale of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen.'
);

-- Friday
INSERT INTO public.night_prayer (
  day_of_week,
  examen_opening_prayer,
  examen_prompts,
  examen_act_of_contrition,
  hymn,
  psalm_antiphon,
  psalm_reference,
  psalm_text,
  reading_reference,
  reading_text,
  responsory_versicle,
  responsory_response,
  canticle_antiphon,
  canticle_text,
  closing_prayer,
  marian_antiphon_name,
  marian_antiphon_text
) VALUES (
  5,
  'God, come to my assistance. Lord, make haste to help me. Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
  '{}',
  '',
  'Now that the daylight dies away,
By all thy grace and love,
Thee, Maker of the world, we pray
To watch our bed above.

Let dreams depart and phantoms fly,
The offspring of the night,
Keep us, like shrines, beneath thine eye,
Pure in our foe''s despite.

This grace on thy redeemed confer,
Father, co-equal Son,
And Holy Ghost, the Comforter,
Eternal Three in One.',
  'Lord my God, I call for help by day, I cry at night before you.',
  'Psalm 88',
  'Psalm 88 — The prayer of one gravely ill

Lord God, my saviour, I have cried out to you
by day and by night.
Let my prayer come before you:
turn your ear to my request.

For my soul is full of evils,
my life has come close to its end.
I am counted with those who go down to the pit:
I am left without help.
I am one of the dead,
like the murdered who sleep in their tombs,
who lie there forgotten,
cut off from your care.

You have thrust me down into the pit,
to the gloom and the shadow of death.
Your anger weighs heavy upon me;
you have drowned me under your waves.

You have taken my friends away from me:
you have made me hateful in their sight,
I am shut in, I may not go out.
My eyes are weak from my sufferings.

I have called to you, Lord, all the day;
I have stretched out my hands to you.
Is it for the dead that you perform your wonders?
Will the ghosts rise up and proclaim you?

In the tomb, will they tell of your kindness?
Will they tell of your faithfulness
in the place of the lost?
Will your wonders be known in the darkness,
or your righteousness in the land of oblivion?

And so I have called out to you, Lord,
and in the morning my prayer will come before you.
With what purpose, Lord, do you reject my soul?
Why do you hide your face from me?

I am poor; from my youth I have been dying;
I have borne the terrors you sent, I am lost in confusion.
Your anger has overrun me,
your terrors have broken me:
they have flowed round me like water,
they have besieged me all the day long.

You have taken my friends and those close to me:
all I have left is shadows.',
  'Jeremiah 14:9',
  'Lord, you are in our midst, we are called by your name. Do not desert us, O Lord our God!',
  'Into your hands, Lord, I commend my spirit.',
  'Into your hands, Lord, I commend my spirit. You have redeemed us, Lord God of truth. — I commend my spirit. Glory be to the Father, and to the Son, and to the Holy Spirit. — Into your hands, Lord, I commend my spirit.',
  'Save us, Lord, while we are awake; protect us while we sleep; that we may keep watch with Christ and rest with him in peace.',
  'At last, all-powerful Master, you give leave to your servant to go in peace, according to your promise. For my eyes have seen your salvation which you have prepared for all nations, the light to enlighten the Gentiles and give glory to Israel, your people.',
  'Give us grace, almighty God, so to unite ourselves in faith with your only Son, who underwent death and lay buried in the tomb, that we may rise again in newness of life with him, who lives and reigns for ever and ever. Amen.',
  'Salve Regina',
  'Hail, holy Queen, Mother of mercy, hail, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve: to thee do we send up our sighs, mourning and weeping in this vale of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen.'
);

-- Saturday
INSERT INTO public.night_prayer (
  day_of_week,
  examen_opening_prayer,
  examen_prompts,
  examen_act_of_contrition,
  hymn,
  psalm_antiphon,
  psalm_reference,
  psalm_text,
  reading_reference,
  reading_text,
  responsory_versicle,
  responsory_response,
  canticle_antiphon,
  canticle_text,
  closing_prayer,
  marian_antiphon_name,
  marian_antiphon_text
) VALUES (
  6,
  'God, come to my assistance. Lord, make haste to help me. Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
  '{}',
  '',
  'Now that the daylight dies away,
By all thy grace and love,
Thee, Maker of the world, we pray
To watch our bed above.

Let dreams depart and phantoms fly,
The offspring of the night,
Keep us, like shrines, beneath thine eye,
Pure in our foe''s despite.

This grace on thy redeemed confer,
Father, co-equal Son,
And Holy Ghost, the Comforter,
Eternal Three in One.',
  'Lord, have mercy and hear me.',
  'Psalm 4; Psalm 134',
  'Psalm 4 — Thanksgiving

When I called out, he heard me,
the God of my righteousness.
When I was in trouble, you gave me freedom:
now, take pity on me and listen to my prayer.

Sons of men, how long will your hearts be heavy?
Why do you seek for vain things?
Why do you run after illusions?

Know that the Lord has done marvellous things
for those he has chosen.
When I call upon the Lord, he will hear me.

Be vigorous, but do not sin:
speak in the silence of your heart,
in your bed, be at rest.
Offer righteousness as a sacrifice,
and put your trust in the Lord.

Many are saying, Who will give us good things?
Let your face shine on us, Lord,
let the light of your face be a sign.
You have given me a greater joy
than the others receive
from abundance of wheat and of wine.

In peace shall I sleep, Lord, in peace shall I rest:
firm in the hope you have given me.

Glory be to the Father and to the Son and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.

Antiphon: Lord, have mercy and hear me.

Antiphon: Bless the Lord through the night.

Psalm 134 — Evening prayer in the Temple

Come, bless the Lord,
all you servants of the Lord
who stand through the night
in the house of the Lord!

Lift up your arms to the sanctuary
and bless the Lord!

May the Lord bless you from Zion –
the Lord, who made heaven and earth.',
  'Deuteronomy 6:4-7',
  'Hear, O Israel: the Lord our God is one Lord; and you shall love the Lord your God with all your heart, and with all your soul, and with all your might. And these words which I command you this day shall be upon your heart; and you shall teach them diligently to your children, and shall talk of them when you sit in your house, and when you walk by the way, and when you lie down, and when you rise.',
  'Into your hands, Lord, I commend my spirit.',
  'Into your hands, Lord, I commend my spirit. You have redeemed us, Lord God of truth. — I commend my spirit. Glory be to the Father, and to the Son, and to the Holy Spirit. — Into your hands, Lord, I commend my spirit.',
  'Save us, Lord, while we are awake; protect us while we sleep; that we may keep watch with Christ and rest with him in peace.',
  'At last, all-powerful Master, you give leave to your servant to go in peace, according to your promise. For my eyes have seen your salvation which you have prepared for all nations, the light to enlighten the Gentiles and give glory to Israel, your people.',
  'Come to visit us, Lord, this night, so that by your strength we may rise at daybreak to rejoice in the resurrection of Christ, your Son, who lives and reigns for ever and ever. Amen.',
  'Salve Regina',
  'Hail, holy Queen, Mother of mercy, hail, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve: to thee do we send up our sighs, mourning and weeping in this vale of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen.'
);

-- Verify: should return 7 rows
SELECT day_of_week, psalm_reference, reading_reference, marian_antiphon_name FROM public.night_prayer ORDER BY day_of_week;
