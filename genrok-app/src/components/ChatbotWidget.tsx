'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Monkey Genie GIF URL (resting/sitting state)
const MONKEY_GIF_URL = 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_a_Genie_sitting_on_a_cloud_pure_blank_100_whit_8387780b-cd4e-4151-91b0-6e4cebebf077_1.mp4';

// Landing animation GIF URL (jumping/landing on cloud)
const LANDING_GIF_URL = 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_a_Genie_sitting_on_a_cloud_pure_blank_100_whit_8387780b-cd4e-4151-91b0-6e4cebebf077_3.mp4';

// =============================================================================
// 100 CONVERSATION-OPENING GREETINGS
// These ASK what the user needs help with (displayed with typewriter effect)
// {NAME} will be replaced with the user's actual name
// =============================================================================

const conversationOpeners = [
  // Direct Help Offers (20)
  "Hey {NAME}! What are we building today?",
  "{NAME}, I'm ready to help. What's on your mind?",
  "What challenge can I help you crush today, {NAME}?",
  "Let's make something happen, {NAME}. What do you need?",
  "{NAME}! The genie is at your service. What's your wish?",
  "Ready to help you win, {NAME}. What's the mission?",
  "What can I help you figure out today, {NAME}?",
  "{NAME}, let's solve something together. What's up?",
  "Your success sidekick is here, {NAME}. How can I help?",
  "What's the one thing I can help you with right now, {NAME}?",
  "{NAME}! Let's get you some wins. Where do we start?",
  "I'm all yours, {NAME}. What do you want to tackle?",
  "Hey {NAME}, let's move the needle. What needs attention?",
  "{NAME}, what problem can we solve together today?",
  "I've got answers, {NAME}. What are your questions?",
  "Let's make progress, {NAME}. What's the focus?",
  "{NAME}! Your genie awaits. What do you need help with?",
  "Ready to brainstorm, {NAME}? What's on the agenda?",
  "What's the biggest thing I can help you with today, {NAME}?",
  "{NAME}, I'm here to help you level up. What's first?",

  // Curiosity/Discovery (20)
  "{NAME}, what's the biggest roadblock you're facing right now?",
  "Tell me what's been on your mind, {NAME}...",
  "What part of your business needs the most attention, {NAME}?",
  "{NAME}, what would make today a huge win for you?",
  "If you could fix ONE thing right now, what would it be, {NAME}?",
  "{NAME}, what's been the trickiest part of your journey lately?",
  "What's keeping you from hitting your goals, {NAME}?",
  "{NAME}, I'm curious - what's your biggest opportunity right now?",
  "What would change everything for your business, {NAME}?",
  "{NAME}, what area do you wish you had more clarity on?",
  "Tell me about your biggest challenge right now, {NAME}...",
  "{NAME}, what's the one thing you keep putting off?",
  "Where are you feeling stuck, {NAME}? Let's figure it out.",
  "{NAME}, what would make your life 10x easier right now?",
  "What's the gap between where you are and where you want to be, {NAME}?",
  "{NAME}, what's been frustrating you lately? I want to help.",
  "If I could wave a magic wand for you, {NAME}, what would you wish for?",
  "{NAME}, what's the elephant in the room you've been avoiding?",
  "What question have you been dying to ask, {NAME}?",
  "{NAME}, what's one thing you wish someone would just explain?",

  // Action-Oriented (20)
  "Ready to make some moves, {NAME}? What's first?",
  "Let's get you to the next level, {NAME}. Where do we start?",
  "{NAME}, what's the ONE thing that would change everything?",
  "Time to take action, {NAME}! What's the priority?",
  "Let's crush a goal today, {NAME}. Which one?",
  "{NAME}, what's the first domino we need to knock down?",
  "Ready to execute, {NAME}? What's the game plan?",
  "Let's build something great, {NAME}. What are we making?",
  "{NAME}, what needs to happen for you to win this week?",
  "Let's turn ideas into action, {NAME}. What's the move?",
  "{NAME}, what would make you feel unstoppable today?",
  "Ready to level up, {NAME}? Let's do this.",
  "What's the first step we need to take, {NAME}?",
  "{NAME}, let's solve this once and for all. What is it?",
  "Let's make some magic happen, {NAME}. What's the spell?",
  "{NAME}, I'm here to help you execute. What's the target?",
  "Ready to move fast, {NAME}? What's urgent?",
  "Let's break through that wall, {NAME}. What's in the way?",
  "{NAME}, what quick win can we get you today?",
  "Action time, {NAME}! What are we tackling?",

  // Supportive/Friendly (20)
  "I'm here for you, {NAME}. What do you need?",
  "No question is too small, {NAME}. What's up?",
  "Your success is my mission, {NAME}. How can I help today?",
  "{NAME}, whatever it is, we'll figure it out together.",
  "I've got your back, {NAME}. What's going on?",
  "Hey {NAME}, let's talk. What's on your mind?",
  "{NAME}, I'm listening. What do you want to share?",
  "You're not alone in this, {NAME}. How can I support you?",
  "Let's work through this together, {NAME}. What's happening?",
  "{NAME}, tell me what you need. I'm here to help.",
  "Whatever challenge you're facing, {NAME}, we've got this.",
  "{NAME}, how are things going? What can I do for you?",
  "I'm in your corner, {NAME}. What do you want to chat about?",
  "{NAME}, let's make sure you get what you need today.",
  "Here to help you succeed, {NAME}. What's the situation?",
  "{NAME}, nothing is impossible. What do you want to achieve?",
  "Let's turn your questions into answers, {NAME}. Fire away!",
  "{NAME}, I believe in you. What can we accomplish together?",
  "Your journey matters, {NAME}. How can I help you today?",
  "{NAME}, let's make progress. What's your biggest question?",

  // Time-Based Contextual (20)
  "Morning hustle time, {NAME}! What's the priority?",
  "Afternoon check-in, {NAME}! What can we knock out?",
  "Evening grind session, {NAME}? I'm with you. What's the task?",
  "Late night warrior, {NAME}! What are we working on?",
  "{NAME}, perfect timing! What do you need help with?",
  "Good to see you, {NAME}! What brings you here today?",
  "{NAME}! Glad you stopped by. What can I do for you?",
  "Hey {NAME}, you caught me at the perfect time. What's up?",
  "The genie's ready, {NAME}! What's your wish today?",
  "{NAME}, let's make the most of this moment. What do you need?",
  "Perfect time to chat, {NAME}! What's the focus?",
  "{NAME}, your timing is impeccable. How can I help?",
  "Hey {NAME}! The monkey's been waiting for you. What's new?",
  "Great timing, {NAME}! I was just thinking about how to help you.",
  "{NAME}, you're here! Let's make something awesome happen.",
  "Welcome back, {NAME}! What's on the agenda today?",
  "{NAME}! Let's dive in. What do you want to explore?",
  "The floor is yours, {NAME}. What would you like to discuss?",
  "{NAME}, I'm pumped to help! What's the challenge?",
  "Let's go, {NAME}! What are we conquering today?",
];

// Get a random conversation opener
function getRandomConversationOpener(name: string): string {
  const randomIndex = Math.floor(Math.random() * conversationOpeners.length);
  return conversationOpeners[randomIndex].replace('{NAME}', name);
}

// =============================================================================
// 500 DOPAMINE-INDUCING GREETINGS
// Psychological triggers: Curiosity, Validation, Exclusivity, Mystery, Rewards
// {NAME} will be replaced with the user's actual name
// =============================================================================

const morningGreetings = [
  // Curiosity & Mystery (20)
  "{NAME}, I found something incredible while you slept...",
  "Psst {NAME}... I discovered a trick that's printing money for others",
  "{NAME}! I've been analyzing winning stores all night. Want the secrets?",
  "Good morning {NAME}... I have news that'll make your day",
  "{NAME}, wake up! I found the missing piece to your success",
  "I couldn't wait to tell you this, {NAME}...",
  "{NAME}! Something exciting happened overnight. Let me show you",
  "Morning {NAME}... I've got insider info you need to hear",
  "{NAME}, I uncovered something BIG. Got a minute?",
  "Rise and shine {NAME}! I have a surprise for you",
  "{NAME}... I know why top sellers wake up excited. Want in?",
  "Good morning! {NAME}, I've been saving something special for you",
  "{NAME}, before you start your day... I found gold",
  "I noticed something about your potential, {NAME}. Let's talk",
  "{NAME}! The early bird gets the secrets. I have one for you",
  "Morning {NAME}... What if I told you today could change everything?",
  "{NAME}, I woke up with an idea that could 10x your sales...",
  "Good morning! {NAME}, top performers just shared something with me",
  "{NAME}... I analyzed 1000 winning ads. Guess what I found?",
  "Rise up {NAME}! I have the blueprint everyone's been asking for",

  // Validation & Ego Boost (20)
  "{NAME}! The fact that you're up early proves you're different",
  "Good morning superstar! {NAME}, ready to outwork everyone?",
  "{NAME}, morning warriors like you are the ones who win",
  "I knew you'd be up early, {NAME}. That's why you'll succeed",
  "{NAME}! Your dedication this morning is rare. Let's capitalize on it",
  "Morning {NAME}! While others sleep, champions like you prepare",
  "{NAME}, early risers are 3x more likely to hit 6 figures. You're one of them",
  "Good morning, future millionaire! What's on your mind, {NAME}?",
  "{NAME}! I respect the grind. Let me help you win faster",
  "Morning {NAME}... Your consistency is why you'll make it",
  "{NAME}, you're already ahead of 90% of sellers by being here now",
  "Rise and shine, boss! {NAME}, ready to dominate today?",
  "{NAME}! Morning champions deserve morning wins. I've got one for you",
  "Good morning {NAME}! Your work ethic is about to pay off...",
  "{NAME}, I've seen a lot of sellers. You've got something special",
  "Morning {NAME}! The winners are awake. And you're one of them",
  "{NAME}! Most people hit snooze. You show up. That's power",
  "Good morning! {NAME}, success loves early risers like you",
  "{NAME}, your morning energy is contagious! Let's channel it",
  "Rise up {NAME}! The universe rewards the dedicated. That's you",

  // Exclusivity & FOMO (20)
  "{NAME}! Only 3% of sellers know this morning hack...",
  "Good morning! {NAME}, want to know what elite sellers do first?",
  "{NAME}, I'm only sharing this with serious sellers like you",
  "Morning {NAME}... Top performers swear by this. Want in?",
  "{NAME}! I have access to something most sellers would pay for",
  "Good morning! {NAME}, ready for your unfair advantage today?",
  "{NAME}, while others guess, I'll give you the exact blueprint",
  "Morning {NAME}! The inner circle is talking. Want to listen in?",
  "{NAME}! This morning tip made one seller $47K. Interested?",
  "Good morning! {NAME}, elite sellers are using this right now",
  "{NAME}, I'm about to tell you something your competitors don't know",
  "Morning {NAME}! Want the same edge that 7-figure sellers have?",
  "{NAME}! Only dedicated sellers like you get this intel",
  "Good morning! {NAME}, ready for insider knowledge?",
  "{NAME}, the top 1% do this every morning. Let me show you",
  "Morning {NAME}! I saved the best strategy just for you",
  "{NAME}! While your competitors sleep, let's strategize",
  "Good morning! {NAME}, you're about to know something they don't",
  "{NAME}, early access: I have a winning formula to share",
  "Morning {NAME}! Let's give you the edge before anyone else",

  // Reward & Anticipation (15)
  "{NAME}! Good morning! Your patience is about to pay off",
  "Morning {NAME}... I have a gift waiting for you",
  "{NAME}, you've unlocked: Morning Winner Status. Let's chat!",
  "Good morning! {NAME}, your reward for being early? My best tip",
  "{NAME}! Something good is coming your way. I can feel it",
  "Morning {NAME}! You showed up. Now let me show you something",
  "{NAME}, early birds get rewarded. Want yours?",
  "Good morning! {NAME}, I've been preparing something just for you",
  "{NAME}! Your dedication just unlocked premium insights",
  "Morning {NAME}... Ready for your morning win?",
  "{NAME}, I have something that'll make this your best day yet",
  "Good morning! {NAME}, winners like you deserve winners' secrets",
  "{NAME}! Start your day with a breakthrough. I have one ready",
  "Morning {NAME}! Your gift for showing up: game-changing advice",
  "{NAME}, you earned this by being here. Let me share it...",
];

const afternoonGreetings = [
  // Curiosity & Mystery (20)
  "{NAME}! I just discovered something that could change your afternoon",
  "Hey {NAME}... I've been researching. You need to see this",
  "{NAME}, I figured out why some stores explode in the afternoon",
  "Psst {NAME}... Want to know what's working RIGHT NOW?",
  "{NAME}! I cracked the code on afternoon conversions. Interested?",
  "Hey {NAME}... Something interesting just happened. Let me tell you",
  "{NAME}, I've been dying to share this with you all day",
  "Afternoon secret incoming, {NAME}... Ready?",
  "{NAME}! I found the afternoon hack that top sellers use",
  "Hey {NAME}... What if I told you the next few hours could be huge?",
  "{NAME}, I noticed a pattern. Your competitors haven't. Let's talk",
  "Hold up {NAME}... I have intel you're going to love",
  "{NAME}! The afternoon is prime time. Want to know why?",
  "Hey {NAME}... I've got a midday breakthrough to share",
  "{NAME}, curiosity got you here. Let me satisfy it with gold",
  "Afternoon {NAME}! I've been waiting to tell you something...",
  "{NAME}! I analyzed peak buying hours. Guess what I found?",
  "Hey {NAME}... I know something your competition doesn't",
  "{NAME}, right now is the perfect moment. Here's why...",
  "Interesting timing, {NAME}... I just uncovered something big",

  // Validation & Ego Boost (20)
  "{NAME}! Still going strong? That's elite mentality",
  "Hey {NAME}... Your afternoon grind is noticed and respected",
  "{NAME}, most people fade by now. Not you. That's why you'll win",
  "Afternoon check: {NAME}, you're outworking 95% of sellers right now",
  "{NAME}! Your consistency today? Chef's kiss. Let's maximize it",
  "Hey {NAME}... The fact you're here mid-day shows real commitment",
  "{NAME}, afternoon warriors like you are built different",
  "Still crushing it, {NAME}? Of course you are. You're a machine",
  "{NAME}! Your dedication this afternoon sets you apart. Truly",
  "Hey {NAME}... Most sellers take breaks. You take action. Respect",
  "{NAME}, midday motivation: You're closer to success than you think",
  "Afternoon {NAME}! Your persistence is your superpower",
  "{NAME}! Half the day done, still going? That's champion energy",
  "Hey {NAME}... You're in the top 10% just by being here now",
  "{NAME}, your afternoon hustle is exactly why you'll make it",
  "Still here {NAME}? That's the difference between dreamers and doers",
  "{NAME}! Your work ethic today is inspiring, honestly",
  "Hey {NAME}... While others nap, you level up. Beautiful",
  "{NAME}, afternoon performers like you deserve afternoon wins",
  "Keep going {NAME}! Your future self is thanking you right now",

  // Exclusivity & FOMO (20)
  "{NAME}! Afternoon gold: A strategy that made $23K this week",
  "Hey {NAME}... Want to know what 6-figure sellers do after lunch?",
  "{NAME}, this afternoon hack is only for serious sellers like you",
  "Exclusive for {NAME}: The afternoon conversion secret",
  "{NAME}! I'm only sharing this with my favorite people. You're in",
  "Hey {NAME}... The pros just revealed their midday routine",
  "{NAME}, while others scroll, I'll show you how to scale",
  "Afternoon insider tip, {NAME}. Only for the committed",
  "{NAME}! Want access to what the top 5% are doing right now?",
  "Hey {NAME}... I have something most sellers would kill for",
  "{NAME}, your competitors are slowing down. Time for your edge",
  "This afternoon {NAME}, I'm giving you an unfair advantage",
  "{NAME}! Elite sellers check in at this hour. You're one of them",
  "Hey {NAME}... Ready for your secret weapon of the day?",
  "{NAME}, exclusive afternoon briefing. Just for you",
  "Right now {NAME}, I can show you what's working this week",
  "{NAME}! The inner circle's afternoon strategy. Want in?",
  "Hey {NAME}... Only 2% know this afternoon optimization trick",
  "{NAME}, VIP access: My best midday growth hack",
  "This hour {NAME}, we're separating winners from everyone else",

  // Reward & Anticipation (15)
  "{NAME}! Afternoon reward incoming... You've earned this",
  "Hey {NAME}... Your midday prize is ready. Want it?",
  "{NAME}, you showed up. Here's your reward: insider secrets",
  "Afternoon gift for {NAME}: A tip that actually works",
  "{NAME}! You've unlocked Afternoon Achiever status. Let's chat!",
  "Hey {NAME}... Good things come to those who hustle. Here's yours",
  "{NAME}, your persistence just earned you premium insights",
  "Afternoon {NAME}! Ready to claim your midday win?",
  "{NAME}! Something exciting is about to happen. I can feel it",
  "Hey {NAME}... I've been saving the best for dedicated sellers like you",
  "{NAME}, afternoon breakthrough loading... Almost ready for you",
  "You made it to midday {NAME}! Here's your prize...",
  "{NAME}! Your reward for not quitting: Game-changing advice",
  "Hey {NAME}... I have something that'll make your afternoon amazing",
  "{NAME}, your dedication just unlocked something special",
];

const eveningGreetings = [
  // Curiosity & Mystery (20)
  "{NAME}! I've been waiting all day to tell you this...",
  "Evening {NAME}... I discovered something incredible today",
  "{NAME}, before you wind down... I have to show you something",
  "Psst {NAME}... The evening is when the real secrets come out",
  "{NAME}! What if I told you tonight could be a turning point?",
  "Evening secret for {NAME}... Ready to hear it?",
  "{NAME}, I saved the best intel for this exact moment",
  "Hey {NAME}... I noticed something about successful evening workers",
  "{NAME}! The night owls are onto something. Want to know what?",
  "Evening {NAME}... I cracked something that's going to excite you",
  "{NAME}, curiosity question: What would you do with an extra $10K?",
  "Hey {NAME}... I have news that couldn't wait until tomorrow",
  "{NAME}! Before the day ends, I need to share this with you",
  "Evening mystery for {NAME}: Why do top sellers work nights?",
  "{NAME}, I figured something out. Let me blow your mind",
  "Hey {NAME}... Tonight's insight is going to change everything",
  "{NAME}! I've been researching all day. The results are wild",
  "Evening {NAME}... Ready for an 'aha' moment?",
  "{NAME}, the night holds secrets. Let me reveal one",
  "Hey {NAME}... I have something that'll keep you up (in a good way)",

  // Validation & Ego Boost (20)
  "{NAME}! Still here at this hour? You're THAT dedicated. Love it",
  "Evening {NAME}... The late grinders always win. You know this",
  "{NAME}, most people are watching Netflix. You're building an empire",
  "Hey {NAME}... Your evening dedication is rare and powerful",
  "{NAME}! Night shifters like you are the ones who make it",
  "Evening {NAME}... While the world rests, champions prepare",
  "{NAME}, your commitment right now is genuinely impressive",
  "Hey {NAME}... The fact you're here tonight proves everything",
  "{NAME}! Evening hustlers have a 4x higher success rate. That's you",
  "Still going strong {NAME}? That's exactly why you'll succeed",
  "{NAME}, your evening energy is giving future millionaire vibes",
  "Hey {NAME}... I respect anyone still working at this hour",
  "{NAME}! Tonight's effort is tomorrow's success. You get it",
  "Evening {NAME}... The dedicated ones always find me at night",
  "{NAME}, working evenings separates the serious from the dreamers",
  "Hey {NAME}... Your persistence tonight is everything",
  "{NAME}! Most quit by evening. You're still here. That's power",
  "Evening {NAME}... Winners work when others won't. That's you",
  "{NAME}, your evening grind is going to pay off massively",
  "Hey {NAME}... The universe rewards late-night dedication like yours",

  // Exclusivity & FOMO (20)
  "{NAME}! Evening exclusive: What top sellers do after hours",
  "Hey {NAME}... Want the night shift secrets of 7-figure sellers?",
  "{NAME}, only the committed get this evening intel",
  "Exclusive night briefing for {NAME}... Ready?",
  "{NAME}! I save the best stuff for evening warriors like you",
  "Hey {NAME}... The inner circle meets at night. Welcome",
  "{NAME}, this evening hack made someone $15K yesterday",
  "Night access unlocked, {NAME}. Here's what the elite know",
  "{NAME}! Evening insiders get evening advantages. You're in",
  "Hey {NAME}... Ready for after-hours secrets?",
  "{NAME}, while others sleep on opportunity, I'll show you gold",
  "Evening exclusive for {NAME}: The late-night money maker",
  "{NAME}! The night shift knows something. Let me tell you",
  "Hey {NAME}... Premium evening content just for dedicated sellers",
  "{NAME}, your competitors logged off. Your advantage starts now",
  "Late night {NAME}... Want to know the overnight success secret?",
  "{NAME}! Evening VIP access: My most valuable insights",
  "Hey {NAME}... The after-hours strategy that changes everything",
  "{NAME}, evening gold for evening grinders like you",
  "Tonight {NAME}, I'm revealing what I don't share during the day",

  // Reward & Anticipation (15)
  "{NAME}! Evening reward unlocked. You earned it",
  "Hey {NAME}... Your prize for working late: My best strategy",
  "{NAME}, you stayed. Here's your gift: insider knowledge",
  "Evening {NAME}! Ready to claim your end-of-day win?",
  "{NAME}! Something magical is about to happen. I feel it",
  "Hey {NAME}... Good things come to those who grind nights",
  "{NAME}, your evening dedication just unlocked premium access",
  "Night gift for {NAME}: A tip that's actually going to work",
  "{NAME}! You've reached Evening Elite status. Let's celebrate",
  "Hey {NAME}... I saved something special for this moment",
  "{NAME}, tonight's reward for your commitment: Gold-tier advice",
  "Evening {NAME}! Your persistence pays off... starting now",
  "{NAME}! Your reward for not giving up: Tomorrow's success today",
  "Hey {NAME}... I've been waiting all day to give you this",
  "{NAME}, evening breakthrough incoming. You're going to love it",
];

const nightGreetings = [
  // Curiosity & Mystery (20)
  "{NAME}! The midnight hour holds the best secrets...",
  "Late night {NAME}... I discovered something you need to see",
  "{NAME}, can't sleep? Perfect. I have something mind-blowing",
  "Psst {NAME}... The night owls know things day-walkers don't",
  "{NAME}! What if this late night changed everything?",
  "Midnight secret for {NAME}... Ready?",
  "{NAME}, I've been analyzing all night. The results are insane",
  "Hey {NAME}... I found the 3am secret to overnight success",
  "{NAME}! Night discoveries hit different. Let me show you",
  "Late night {NAME}... I cracked the code. Literally",
  "{NAME}, the quiet hours reveal the biggest truths...",
  "Hey {NAME}... I have something that'll make this night worth it",
  "{NAME}! Before you sleep, you need to know this",
  "Midnight {NAME}... The stars aligned. I found your answer",
  "{NAME}, late night + curiosity = breakthroughs. Ready?",
  "Hey {NAME}... Tonight's discovery could change your life",
  "{NAME}! I've been waiting for a night owl like you",
  "Late night {NAME}... Want to know what billion-dollar ideas have in common?",
  "{NAME}, midnight is when magic happens. Let me prove it",
  "Hey {NAME}... I have late-night intel that couldn't wait",

  // Validation & Ego Boost (20)
  "{NAME}! Working at this hour? You're absolutely legendary",
  "Late night {NAME}... Only the truly committed are awake now",
  "{NAME}, the 3am club is where millionaires are made. Welcome",
  "Hey {NAME}... Your late-night dedication is honestly inspiring",
  "{NAME}! Night warriors like you are the ones who change the game",
  "Midnight {NAME}... The fact you're here says everything about you",
  "{NAME}, while the world dreams, you build. That's power",
  "Hey {NAME}... I deeply respect anyone grinding at this hour",
  "{NAME}! Late night? Early success. That's how it works",
  "Night owl {NAME}... You're built different. I can tell",
  "{NAME}, your midnight hustle is going to be worth it. Trust me",
  "Hey {NAME}... The ones who work nights are the ones who make it",
  "{NAME}! 2am grinders have a 5x higher success rate. You're one",
  "Late night {NAME}... Champions don't sleep on their dreams",
  "{NAME}, your dedication right now is genuinely rare",
  "Hey {NAME}... The night shift is where legends are forged",
  "{NAME}! Still awake? That's exactly why you'll succeed",
  "Midnight {NAME}... Success loves the ones who lose sleep for it",
  "{NAME}, your late-night energy is future billionaire vibes",
  "Hey {NAME}... The universe sees your 3am effort. It counts",

  // Exclusivity & FOMO (20)
  "{NAME}! Midnight exclusive: The secret that made $100K this month",
  "Late night {NAME}... Want to know what the 1% do at this hour?",
  "{NAME}, only true night owls get this intel",
  "Exclusive midnight access for {NAME}...",
  "{NAME}! I save the best secrets for the late-night warriors",
  "Hey {NAME}... The 3am club has insider knowledge. You're invited",
  "{NAME}, this late-night hack is responsible for millions in sales",
  "Night VIP access unlocked, {NAME}. Welcome to the inner circle",
  "{NAME}! Midnight members get midnight advantages. That's you",
  "Hey {NAME}... Ready for after-midnight secrets?",
  "{NAME}, while the competition sleeps, you get the edge",
  "Late night exclusive for {NAME}: The overnight money machine",
  "{NAME}! The midnight crew knows something special. Let me share",
  "Hey {NAME}... Premium 3am content for premium hustlers like you",
  "{NAME}, your competitors are unconscious. Your advantage is now",
  "Midnight {NAME}... Want to know the secret of overnight millionaires?",
  "{NAME}! Late night VIP: My most closely guarded strategies",
  "Hey {NAME}... The 2am strategy that changes everything",
  "{NAME}, midnight gold for midnight grinders only",
  "Tonight {NAME}, secrets come out. Ready for yours?",

  // Caring + Reward (15)
  "{NAME}! Your late night dedication unlocked something special",
  "Hey {NAME}... Can't sleep? Let me make it productive",
  "{NAME}, you stayed up. Here's your gift: insider secrets",
  "Midnight {NAME}! Your reward for this dedication? My best tip",
  "{NAME}! Night owl status achieved. Let's make it count",
  "Hey {NAME}... The universe rewards 3am effort. Here's yours",
  "{NAME}, your midnight persistence just unlocked premium access",
  "Late night gift for {NAME}: Knowledge that actually converts",
  "{NAME}! You've reached Night Legend status. Congratulations",
  "Hey {NAME}... I saved something powerful for this moment",
  "{NAME}, tonight's reward: Tomorrow's success, delivered now",
  "Midnight {NAME}! Your prize for not sleeping: Game-changer advice",
  "{NAME}! Your late night commitment unlocks: Million-dollar insights",
  "Hey {NAME}... Stay a bit longer. This tip is worth it",
  "{NAME}, your 3am dedication just paid off. Here's why...",
];

const anytimeGreetings = [
  // Monkey Genie Theme - Curiosity (40)
  "{NAME}! The monkey found treasure. Want to see?",
  "Hey {NAME}... The genie has a wish to grant. You ready?",
  "{NAME}, follow the monkey... He found something golden",
  "The monkey's excited, {NAME}! He discovered a shortcut to success",
  "{NAME}! Psst... The genie knows something your competitors don't",
  "Hey {NAME}... The monkey's been busy. Wait till you see this",
  "{NAME}, the genie analyzed 1000 stores. Guess what he found?",
  "The monkey has a secret, {NAME}. Only for you",
  "{NAME}! The genie cracked the code. Let me show you",
  "Hey {NAME}... Trust the monkey. He's onto something huge",
  "{NAME}, the monkey sees patterns. He saw one in your niche",
  "The genie's lamp is glowing, {NAME}. Something big is coming",
  "{NAME}! The monkey figured out what winners do differently",
  "Hey {NAME}... The genie has intel. The good kind",
  "{NAME}, the monkey's been researching. You need to hear this",
  "The genie noticed something about you, {NAME}...",
  "{NAME}! Follow the monkey. He knows where the money is",
  "Hey {NAME}... The genie has 3 wishes for you. Want them?",
  "{NAME}, the monkey decoded the success formula. Interested?",
  "The genie's ready, {NAME}. Your breakthrough awaits",
  "{NAME}! The monkey see something. Monkey want to share",
  "Hey {NAME}... The genie has been dying to tell you this",
  "{NAME}, the monkey's jumping up and down. He found gold",
  "The genie made a discovery, {NAME}. It's about your success",
  "{NAME}! Trust the monkey. He hasn't been wrong yet",
  "Hey {NAME}... The genie says today is special. Here's why",
  "{NAME}, the monkey has a map. X marks your treasure",
  "The genie's excited, {NAME}! He found your missing piece",
  "{NAME}! The monkey connected the dots. Mind = blown",
  "Hey {NAME}... The genie whispered a secret. Want to hear?",
  "{NAME}, the monkey's got news that couldn't wait",
  "The genie is ready to grant, {NAME}. What's your wish?",
  "{NAME}! The monkey stumbled onto something massive",
  "Hey {NAME}... Follow the monkey. He's never steered you wrong",
  "{NAME}, the genie analyzed your potential. The results? Amazing",
  "The monkey's calling, {NAME}. He has something important",
  "{NAME}! The genie says you're closer than you think. Let's talk",
  "Hey {NAME}... The monkey found the shortcut. Want directions?",
  "{NAME}, the genie sees your future. It's bright. Very bright",
  "The monkey's got the blueprint, {NAME}. Ready to build?",

  // Validation & Dopamine (40)
  "{NAME}! You know you're special, right? Let me prove it",
  "Hey {NAME}... Winners recognize winners. I see you",
  "{NAME}, your potential is literally off the charts",
  "I've been watching your progress, {NAME}. I'm impressed",
  "{NAME}! You've got something most sellers don't. Let's use it",
  "Hey {NAME}... The fact you're here means you're going to make it",
  "{NAME}, you're in the top tier of dedicated sellers. Fact",
  "I believe in you, {NAME}. And I'm usually right about people",
  "{NAME}! Your hustle is noticed. Your success is inevitable",
  "Hey {NAME}... You're doing better than you think. Way better",
  "{NAME}, I've seen thousands of sellers. You've got IT",
  "You're built for success, {NAME}. Everything points to it",
  "{NAME}! Your dedication puts you in rare company. The winning kind",
  "Hey {NAME}... Ready to realize just how close you are?",
  "{NAME}, your breakthrough is coming. I can feel it",
  "The stars are aligning for you, {NAME}. Let's capitalize",
  "{NAME}! You've got what it takes. Now let's prove it together",
  "Hey {NAME}... Your future self is going to thank you for this",
  "{NAME}, something tells me today is YOUR day",
  "I see greatness in you, {NAME}. That's not flattery, it's fact",
  "{NAME}! You're one conversation away from your next level",
  "Hey {NAME}... Winners ask questions. That's why you're here",
  "{NAME}, your consistency is your superpower. Use it",
  "I've got a good feeling about you, {NAME}. A really good one",
  "{NAME}! The successful version of you is closer than ever",
  "Hey {NAME}... You're exactly where you need to be right now",
  "{NAME}, champions don't quit. And you're still here. Champion confirmed",
  "Your story is going to inspire people, {NAME}. I know it",
  "{NAME}! Something big is about to happen for you. Trust me",
  "Hey {NAME}... You're not average. Stop wondering if you are",
  "{NAME}, the universe rewards people like you. Watch",
  "I'm excited for your future, {NAME}. It's going to be incredible",
  "{NAME}! Your determination today is tomorrow's success story",
  "Hey {NAME}... You've got that winner energy. I can feel it",
  "{NAME}, most people doubt themselves. Don't. You've got this",
  "You're on the right path, {NAME}. Let me help you speed up",
  "{NAME}! Success is looking for you. Let's make sure it finds you",
  "Hey {NAME}... You're closer to your goals than you realize",
  "{NAME}, your moment is coming. Let's make sure you're ready",
  "I believe in your success, {NAME}. Now let's make it happen",

  // Exclusivity & FOMO (40)
  "{NAME}! I only share this with serious sellers. You qualify",
  "Hey {NAME}... Want to know what the top 1% do differently?",
  "{NAME}, this strategy is responsible for $1M+ in sales...",
  "Exclusive for {NAME}: The hack your competitors don't know",
  "{NAME}! Elite seller intel, just for you. Interested?",
  "Hey {NAME}... I have something most people would pay for",
  "{NAME}, while others struggle, I'll give you the shortcut",
  "Insider access for {NAME}. Ready for the good stuff?",
  "{NAME}! This technique is making stores explode right now",
  "Hey {NAME}... Want your unfair advantage? I've got it",
  "{NAME}, I'm about to tell you something 99% don't know",
  "VIP intel for VIP sellers like you, {NAME}",
  "{NAME}! The winning playbook is open. Want to see inside?",
  "Hey {NAME}... Top performers use this. Now you can too",
  "{NAME}, this secret helped someone hit 6 figures. Want it?",
  "Premium insights for {NAME}. No charge, just value",
  "{NAME}! I save the best for the most dedicated. That's you",
  "Hey {NAME}... Ready to know what's actually working right now?",
  "{NAME}, your competitors wish they had access to this",
  "The inner circle is talking, {NAME}. Want to listen in?",
  "{NAME}! Elite strategy unlocked. Shall we?",
  "Hey {NAME}... I've got something that changes the game",
  "{NAME}, while others guess, I'll give you the exact formula",
  "Exclusive drop for {NAME}: The million-dollar insight",
  "{NAME}! This is the stuff courses charge $5K for. Free for you",
  "Hey {NAME}... Want to know the real secret to scaling?",
  "{NAME}, insider information incoming. Just for you",
  "The winning edge, {NAME}. Only for those who ask",
  "{NAME}! I've got access to what actually moves the needle",
  "Hey {NAME}... Most sellers will never know this. But you will",
  "{NAME}, the pros just shared something. I'm passing it on",
  "Classified seller intel for {NAME}. Ready?",
  "{NAME}! What I'm about to tell you is worth thousands",
  "Hey {NAME}... Your golden ticket to success is right here",
  "{NAME}, I have the blueprint. Want a copy?",
  "Elite knowledge for elite effort, {NAME}. That's you",
  "{NAME}! The shortcut to success exists. Let me show you",
  "Hey {NAME}... I know what separates winners. Want in?",
  "{NAME}, your advantage over the competition starts here",
  "The secret sauce, {NAME}. Ready for a taste?",

  // Reward & Call to Action (40)
  "{NAME}! You've unlocked: VIP Seller Status. Let's chat!",
  "Hey {NAME}... I have something waiting for you. Claim it",
  "{NAME}, your dedication just unlocked premium insights",
  "Gift for {NAME}: A strategy that actually works. Want it?",
  "{NAME}! Ready to claim your unfair advantage?",
  "Hey {NAME}... Good things come to those who ask. Ask me",
  "{NAME}, your moment is now. What do you want to know?",
  "Achievement unlocked, {NAME}! Premium advice: Available",
  "{NAME}! Your reward for showing up: My best strategy",
  "Hey {NAME}... I've been waiting for you. Let's make magic",
  "{NAME}, your persistence just paid off. Here's how...",
  "Breakthrough incoming for {NAME}. Ready to receive it?",
  "{NAME}! You showed up. Now let me show you something amazing",
  "Hey {NAME}... Your prize is ready. All you have to do is ask",
  "{NAME}, success rewards action. Take yours now",
  "Your win is loading, {NAME}. Want to speed it up?",
  "{NAME}! I have exactly what you need. Let's talk",
  "Hey {NAME}... One question could change everything. Ask it",
  "{NAME}, your next level is one conversation away. This one",
  "Ready for your upgrade, {NAME}? I've got it right here",
  "{NAME}! Something amazing is about to happen. Can you feel it?",
  "Hey {NAME}... Your success is my mission. Let's start",
  "{NAME}, you're one insight away from a breakthrough. Ask",
  "Your answer is waiting, {NAME}. What's the question?",
  "{NAME}! Let's turn your potential into profit. Ready?",
  "Hey {NAME}... The path to success is clear. Let me show you",
  "{NAME}, winners take action. What's your first question?",
  "Game time, {NAME}! Let's get you to the next level",
  "{NAME}! Your success story starts with one chat. This one",
  "Hey {NAME}... Everything you need is one message away",
  "{NAME}, let's make something incredible happen. Together",
  "The only thing between you and success, {NAME}? One conversation",
  "{NAME}! Ready to unlock your full potential? Ask away",
  "Hey {NAME}... Your transformation begins now. What do you need?",
  "{NAME}, I'm here to turn questions into results. Fire away",
  "Your breakthrough awaits, {NAME}. Let's make it happen",
  "{NAME}! One question, unlimited value. What'll it be?",
  "Hey {NAME}... Let's make today the day everything changes",
  "{NAME}, the monkey's ready. The genie's ready. Are you?",
  "Let's build your empire together, {NAME}. First question?",

  // Simple Invites (40)
  "{NAME}! Got a minute? I've got gold for you",
  "Hey {NAME}... Quick question could change everything",
  "{NAME}, the monkey's bored. Entertain him with your questions!",
  "Yo {NAME}! What's on your mind? Let's solve it",
  "{NAME}! Come say hi. I've got something for you",
  "Hey {NAME}... Let's chat. I know things",
  "{NAME}, drop me a question. Any question. I dare you",
  "The genie awaits, {NAME}! What's your wish?",
  "{NAME}! Let's turn your questions into cash. Ready?",
  "Hey {NAME}... I'm here and I'm helpful. Use me!",
  "{NAME}, the monkey's got answers. You've got questions?",
  "Your success assistant is online, {NAME}. How can I help?",
  "{NAME}! Let's make some magic happen. Talk to me",
  "Hey {NAME}... One chat could change your whole month",
  "{NAME}, the monkey wants to help you win. Let him!",
  "Ready when you are, {NAME}! What do you need?",
  "{NAME}! The genie's lamp is lit. Make a wish",
  "Hey {NAME}... Let's solve problems and make money. Interested?",
  "{NAME}, your personal success buddy is standing by",
  "The monkey's eager, {NAME}! Give him something to help with",
  "{NAME}! Questions? Ideas? Problems? I'm here for all of it",
  "Hey {NAME}... Let's have a chat that actually matters",
  "{NAME}, stuck on something? I love puzzles. Tell me",
  "Your wish is my command, {NAME}. What'll it be?",
  "{NAME}! The fastest path to answers starts here. Ask!",
  "Hey {NAME}... Let me help you win today",
  "{NAME}, the monkey's got wisdom. Want some?",
  "I'm all ears, {NAME}! What's keeping you up?",
  "{NAME}! Let's strategize, optimize, and monetize. You in?",
  "Hey {NAME}... I've got time and tips. What do you need?",
  "{NAME}, let's turn that confusion into clarity. Talk to me",
  "The genie is listening, {NAME}. Speak your needs",
  "{NAME}! Your question + my knowledge = your success",
  "Hey {NAME}... Let's figure this out together. What's up?",
  "{NAME}, no question too small, no dream too big. Ask!",
  "Monkey see {NAME}. Monkey want to help {NAME}!",
  "{NAME}! Let's make you unstoppable. First step: chat with me",
  "Hey {NAME}... The answers are closer than you think. Ask",
  "{NAME}, I'm basically your business cheat code. Use me!",
  "Let's do something amazing today, {NAME}. What do you say?",
];

// Get time of day
function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

// Get a random greeting based on time of day
function getRandomGreeting(name: string): string {
  const timeOfDay = getTimeOfDay();

  let greetings: string[];

  // Mix time-based greetings with anytime greetings (60/40 split)
  const useTimeBasedGreeting = Math.random() < 0.6;

  if (useTimeBasedGreeting) {
    switch (timeOfDay) {
      case 'morning':
        greetings = morningGreetings;
        break;
      case 'afternoon':
        greetings = afternoonGreetings;
        break;
      case 'evening':
        greetings = eveningGreetings;
        break;
      case 'night':
        greetings = nightGreetings;
        break;
    }
  } else {
    greetings = anytimeGreetings;
  }

  const randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex].replace('{NAME}', name);
}

interface ChatbotWidgetProps {
  userName?: string;
}

export default function ChatbotWidget({ userName = 'Builder' }: ChatbotWidgetProps) {
  // View state: 'preview' (rectangle), 'minimized' (circle), 'chat' (full chat)
  const [viewState, setViewState] = useState<'preview' | 'minimized' | 'chat'>('preview');
  const [greeting, setGreeting] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // Landing animation state (only for chat view)
  const [showLandingAnimation, setShowLandingAnimation] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'big' | 'shrinking' | 'settled'>('settled');

  // Typewriter effect state
  const [conversationOpener, setConversationOpener] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Refs
  const landingVideoRef = useRef<HTMLVideoElement>(null);
  const typewriterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get personalized greeting on mount and when user name changes
  useEffect(() => {
    setGreeting(getRandomGreeting(userName));
  }, [userName]);

  // Rotate greeting every 45 seconds when in preview mode
  useEffect(() => {
    if (viewState !== 'preview') return;

    const interval = setInterval(() => {
      setGreeting(getRandomGreeting(userName));
    }, 45000);

    return () => clearInterval(interval);
  }, [viewState, userName]);

  // Typewriter effect
  useEffect(() => {
    if (!isTyping || !conversationOpener) return;

    let currentIndex = 0;
    setDisplayedText('');

    const typeNextChar = () => {
      if (currentIndex < conversationOpener.length) {
        setDisplayedText(conversationOpener.slice(0, currentIndex + 1));
        currentIndex++;
        typewriterTimeoutRef.current = setTimeout(typeNextChar, 30 + Math.random() * 20);
      } else {
        setIsTyping(false);
      }
    };

    // Start typing after a small delay
    typewriterTimeoutRef.current = setTimeout(typeNextChar, 100);

    return () => {
      if (typewriterTimeoutRef.current) {
        clearTimeout(typewriterTimeoutRef.current);
      }
    };
  }, [isTyping, conversationOpener]);

  // Handle opening the chat with landing animation (from preview or minimized)
  const handleOpenChat = useCallback(() => {
    // Get a new conversation opener
    const newOpener = getRandomConversationOpener(userName);
    setConversationOpener(newOpener);
    setDisplayedText('');

    // Start landing animation sequence
    // Video is 5 seconds: at 1s monkey takes off, between 1-4s moving up, at 4.2s lands
    setShowLandingAnimation(true);
    setAnimationPhase('big');
    setViewState('chat');

    // At 1 second: monkey takes off cloud, start shrinking animation
    setTimeout(() => {
      setAnimationPhase('shrinking');
    }, 1000);

    // At 4.2 seconds: monkey lands on cloud again, settle and start typing
    setTimeout(() => {
      setAnimationPhase('settled');
      setShowLandingAnimation(false);
      setIsTyping(true);
    }, 4200);
  }, [userName]);

  // Handle minimizing to circle
  const handleMinimize = useCallback(() => {
    setViewState('minimized');
    setShowLandingAnimation(false);
    setAnimationPhase('settled');
    setIsTyping(false);
    setDisplayedText('');
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
    }
  }, []);

  // Handle expanding from circle to preview rectangle
  const handleExpand = useCallback(() => {
    setViewState('preview');
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence mode="wait">
        {/* ============================================
            PREVIEW STATE - Rectangle with greeting (DEFAULT)
            ============================================ */}
        {viewState === 'preview' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative flex items-stretch bg-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer"
            style={{
              minWidth: '340px',
              maxWidth: '400px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(0, 0, 0, 0.1)',
            }}
            onClick={handleOpenChat}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Minimize Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMinimize();
              }}
              className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"
              aria-label="Minimize"
            >
              <X size={14} className="text-gray-600" />
            </button>

            {/* Left Side - Text Content */}
            <div className="flex-1 p-4 pr-2 flex flex-col justify-center">
              <motion.p
                key={greeting}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[15px] text-black font-semibold leading-snug"
              >
                {greeting}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0.7 }}
                className="mt-2.5 flex items-center gap-1.5"
              >
                <span className="text-xs font-medium text-gray-500">Click to chat with the Monkey</span>
                <motion.span
                  animate={{ x: isHovered ? 3 : 0 }}
                  className="text-gray-500"
                >
                  →
                </motion.span>
              </motion.div>
            </div>

            {/* Right Side - Monkey GIF */}
            <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden">
              <video
                src={MONKEY_GIF_URL}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center' }}
              />
            </div>

            {/* Hover Glow Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              animate={{
                boxShadow: isHovered
                  ? 'inset 0 0 0 2px rgba(136, 218, 28, 0.6)'
                  : 'inset 0 0 0 0px rgba(136, 218, 28, 0)',
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        )}

        {/* ============================================
            MINIMIZED STATE - Circle with just the GIF
            ============================================ */}
        {viewState === 'minimized' && (
          <motion.button
            key="minimized"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={handleExpand}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-16 h-16 rounded-full overflow-hidden shadow-2xl"
            style={{
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2), 0 4px 15px rgba(0, 0, 0, 0.1)',
            }}
            aria-label="Expand chat"
          >
            <video
              src={MONKEY_GIF_URL}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Pulse ring animation */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '2px solid var(--primary)' }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.button>
        )}

        {/* ============================================
            CHAT STATE - Full chat with landing animation
            ============================================ */}
        {viewState === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{
              width: '340px',
              height: '450px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Landing Animation Overlay - Big GIF that shrinks */}
            <AnimatePresence>
              {showLandingAnimation && (
                <motion.div
                  className="absolute z-50 flex items-center justify-center pointer-events-none"
                  initial={{
                    width: 280,
                    height: 280,
                    top: '45%',
                    left: '50%',
                    x: '-50%',
                    y: '-50%',
                    opacity: 1,
                  }}
                  animate={
                    animationPhase === 'big'
                      ? {
                          width: 280,
                          height: 280,
                          top: '45%',
                          left: '50%',
                          x: '-50%',
                          y: '-50%',
                          opacity: 1,
                        }
                      : animationPhase === 'shrinking'
                        ? {
                            width: 80,
                            height: 80,
                            top: 0,
                            left: '50%',
                            x: '-50%',
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            width: 80,
                            height: 80,
                            top: 0,
                            left: '50%',
                            x: '-50%',
                            y: 0,
                            opacity: 0,
                          }
                  }
                  exit={{ opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 50,
                    damping: 15,
                    duration: 3.2,
                  }}
                >
                  <video
                    ref={landingVideoRef}
                    src={LANDING_GIF_URL}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Chat UI - Hidden during landing animation */}
            <motion.div
              className="flex flex-col h-full"
              animate={{
                opacity: showLandingAnimation ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Header with GIF at top center - no padding, sticks to top */}
              <div className="relative flex flex-col items-center">
                {/* Minimize Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMinimize();
                  }}
                  className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                  aria-label="Minimize chat"
                >
                  <X size={16} className="text-gray-600" />
                </button>

                {/* Monkey GIF - 80px, no shadow/border, sticks to top */}
                <div className="w-20 h-20 overflow-hidden">
                  <video
                    src={LANDING_GIF_URL}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Conversation opener with typewriter effect */}
              <div className="px-6 pt-4 text-center flex-1">
                <p className="text-[16px] text-black font-semibold leading-relaxed">
                  {displayedText}
                  {isTyping && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-0.5 h-5 bg-black ml-0.5 align-middle"
                    />
                  )}
                </p>
              </div>

              {/* Future: Chat input area would go here */}
              <div className="p-4 border-t border-gray-100">
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-400 text-sm">
                  Type a message...
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
