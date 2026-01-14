'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';

// Monkey Genie GIF URL
const MONKEY_GIF_URL = 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_a_Genie_sitting_on_a_cloud_pure_blank_100_whit_8387780b-cd4e-4151-91b0-6e4cebebf077_1.mp4';

// 500 personalized greeting variants organized by time of day
// {NAME} will be replaced with the user's actual name

const morningGreetings = [
  // Motivational morning (50)
  "Rise and shine, {NAME}! Ready to crush it today?",
  "Good morning, {NAME}! The early bird gets the sales!",
  "Hey {NAME}! New day, new opportunities. Let's go!",
  "Morning, {NAME}! Your empire awaits. How can I help?",
  "Wake up and win, {NAME}! What's on your mind?",
  "{NAME}, it's a fresh start! Let's make today count.",
  "Top of the morning, {NAME}! Ready to scale?",
  "Hey {NAME}! Coffee's brewing, success is calling!",
  "Good morning, {NAME}! Time to make money moves.",
  "Rise up, {NAME}! Let's build something great today.",
  "{NAME}! Morning vibes = money vibes. Let's chat!",
  "Yo {NAME}! Early grind = early wins. What's up?",
  "Morning, boss! {NAME}, let's get those sales rolling.",
  "Hey {NAME}! Sun's up, hustle's on. Need help?",
  "{NAME}, new morning = new chances. Let's talk!",
  "Good morning, {NAME}! Your success story continues today.",
  "Hey there, {NAME}! Ready to make today legendary?",
  "{NAME}! The monkey's up early too. Let's strategize!",
  "Morning, {NAME}! Let's turn those dreams into dollars.",
  "Rise and grind, {NAME}! I'm here if you need me.",
  "{NAME}, wakey wakey! Time to make that money.",
  "Good morning, superstar! {NAME}, what can I help with?",
  "Hey {NAME}! Early bird special: free advice from me!",
  "{NAME}! Morning momentum starts now. Let's go!",
  "Top morning, {NAME}! Ready to follow the monkey?",
  "Hey {NAME}! Fresh day, fresh opportunities ahead.",
  "Morning, {NAME}! Let's make those competitors nervous.",
  "{NAME}! The early grind pays off. Need guidance?",
  "Good morning, champ! {NAME}, let's win together.",
  "Hey {NAME}! Mornings are for making moves.",
  "{NAME}, rise and shine! Your store won't build itself.",
  "Morning, {NAME}! Another day to dominate.",
  "Hey there, {NAME}! Ready for a productive morning?",
  "{NAME}! Coffee + strategy = success. Let's talk!",
  "Good morning, {NAME}! The monkey's got your back.",
  "Rise up, {NAME}! Today's full of potential.",
  "Hey {NAME}! Let's start strong this morning.",
  "{NAME}, morning! Time to stack those wins.",
  "Morning vibes, {NAME}! What are we tackling today?",
  "Hey {NAME}! Early hours = power hours. Let's chat!",
  "{NAME}! Good morning! Ready to level up?",
  "Morning, {NAME}! Let's make today profitable.",
  "Hey {NAME}! The sun's up and so are your chances.",
  "{NAME}, good morning! What's the game plan?",
  "Rise and profit, {NAME}! I'm here to help.",
  "Morning, {NAME}! Every day is a chance to grow.",
  "Hey {NAME}! Let's kick off this morning right.",
  "{NAME}! Morning momentum incoming. Questions?",
  "Good morning, {NAME}! Let's chase those goals.",
  "Hey there, {NAME}! Ready to start crushing it?",
  // Casual/Friendly morning (25)
  "Morning, {NAME}! How's it going?",
  "Hey {NAME}! Sleep well? Let's talk business!",
  "{NAME}! Good morning, friend. What's on your mind?",
  "Morning, {NAME}! The monkey missed you!",
  "Hey {NAME}! Glad to see you this morning.",
  "{NAME}, morning! Got questions? I've got answers.",
  "Good morning, {NAME}! Let's make magic happen.",
  "Hey {NAME}! What brings you here this fine morning?",
  "Morning, {NAME}! The genie is ready to help!",
  "{NAME}! Hey there, early riser! Need something?",
  "Good morning, {NAME}! Your wish is my command.",
  "Hey {NAME}! Morning! What can I do for you?",
  "{NAME}, morning vibes! Let's chat.",
  "Morning, {NAME}! The monkey's at your service.",
  "Hey {NAME}! Starting the day right, I see!",
  "{NAME}! Good morning! Ask me anything.",
  "Morning, {NAME}! Let's have a productive chat.",
  "Hey {NAME}! Early and ambitious. I like it!",
  "{NAME}, morning! I'm here whenever you need.",
  "Good morning, {NAME}! Let's do this together.",
  "Hey {NAME}! Morning check-in: how can I help?",
  "{NAME}! Rise and ask! What's your question?",
  "Morning, {NAME}! Ready when you are.",
  "Hey {NAME}! The genie awaits your wishes.",
  "{NAME}, good morning! Let's figure things out.",
];

const afternoonGreetings = [
  // Motivational afternoon (50)
  "Hey {NAME}! Afternoon hustle time. Let's go!",
  "Afternoon, {NAME}! Halfway through, still crushing it?",
  "{NAME}! Keep that momentum going this afternoon.",
  "Hey there, {NAME}! Afternoon check: need any help?",
  "Good afternoon, {NAME}! Let's keep winning.",
  "{NAME}, afternoon vibes! What's the next move?",
  "Hey {NAME}! Lunch break wisdom: ask the monkey!",
  "Afternoon, {NAME}! Time to double down.",
  "{NAME}! Middle of the day, peak productivity. Let's talk!",
  "Hey {NAME}! Afternoon = opportunity time.",
  "Good afternoon, {NAME}! Still going strong?",
  "{NAME}, hey! Afternoon strategy session?",
  "Afternoon, {NAME}! The grind doesn't stop.",
  "Hey {NAME}! Power through the afternoon with me.",
  "{NAME}! Afternoon check-in. How's business?",
  "Good afternoon, {NAME}! Let's tackle challenges.",
  "Hey {NAME}! Afternoon motivation: you've got this!",
  "{NAME}, afternoon! Ready to optimize something?",
  "Afternoon, {NAME}! Keep pushing, keep winning.",
  "Hey {NAME}! Second half of the day. Let's finish strong!",
  "{NAME}! Good afternoon! What needs attention?",
  "Afternoon, {NAME}! The monkey's here to assist.",
  "Hey {NAME}! Productive afternoon? Let's make it better!",
  "{NAME}, afternoon vibes! Questions on your mind?",
  "Good afternoon, {NAME}! Don't slow down now!",
  "Hey {NAME}! Afternoon energy = results energy.",
  "{NAME}! Keep that fire burning this afternoon.",
  "Afternoon, {NAME}! Halfway there, still slaying.",
  "Hey {NAME}! The afternoon grind is real. Need help?",
  "{NAME}, good afternoon! Let's solve problems.",
  "Afternoon, {NAME}! Your success awaits.",
  "Hey {NAME}! Afternoon motivation drop: let's chat!",
  "{NAME}! This afternoon could be a game-changer.",
  "Good afternoon, {NAME}! Ready to scale up?",
  "Hey {NAME}! Afternoon wisdom from your monkey pal.",
  "{NAME}, afternoon! Don't let the day slip away.",
  "Afternoon, {NAME}! Let's make every hour count.",
  "Hey {NAME}! Afternoon = prime time for progress.",
  "{NAME}! Good afternoon! What's blocking you?",
  "Afternoon, {NAME}! The genie grants strategy wishes.",
  "Hey {NAME}! Keep the afternoon momentum alive!",
  "{NAME}, afternoon check! Anything I can help with?",
  "Good afternoon, {NAME}! Let's push through.",
  "Hey {NAME}! Afternoon hustle hits different.",
  "{NAME}! Afternoon mode: activated. Let's go!",
  "Afternoon, {NAME}! Still time to win big today.",
  "Hey {NAME}! The afternoon is young. What's up?",
  "{NAME}, good afternoon! I'm here for you.",
  "Afternoon, {NAME}! Let's finish this day strong.",
  "Hey {NAME}! Afternoon goals? I can help!",
  // Casual afternoon (25)
  "Afternoon, {NAME}! How's the day treating you?",
  "Hey {NAME}! Post-lunch productivity check!",
  "{NAME}! Good afternoon. What's going on?",
  "Afternoon, {NAME}! The monkey's chilling. You?",
  "Hey {NAME}! Afternoon vibes. Need anything?",
  "{NAME}, afternoon! Just checking in.",
  "Good afternoon, {NAME}! Taking a break?",
  "Hey {NAME}! How's the afternoon going?",
  "Afternoon, {NAME}! Got a minute to chat?",
  "{NAME}! Hey! Afternoon questions welcome.",
  "Good afternoon, {NAME}! What's new?",
  "Hey {NAME}! Afternoon hang with the monkey.",
  "{NAME}, afternoon! Relaxed and ready to help.",
  "Afternoon, {NAME}! What's on your plate?",
  "Hey {NAME}! Midday check: all good?",
  "{NAME}! Good afternoon! I'm all ears.",
  "Afternoon, {NAME}! Let's chat when you're ready.",
  "Hey {NAME}! The afternoon is yours. Questions?",
  "{NAME}, afternoon! Anything on your mind?",
  "Good afternoon, {NAME}! Monkey's waiting.",
  "Hey {NAME}! Chill afternoon vibes. What's up?",
  "{NAME}! Afternoon! I'm here if you need me.",
  "Afternoon, {NAME}! Ready to help anytime.",
  "Hey {NAME}! Good afternoon! Let's talk.",
  "{NAME}, afternoon! Your genie is standing by.",
];

const eveningGreetings = [
  // Motivational evening (50)
  "Evening, {NAME}! Still grinding? Respect!",
  "Hey {NAME}! Evening hustle hits different.",
  "{NAME}! Good evening. Let's wrap up strong!",
  "Evening, {NAME}! Late-night success in the making.",
  "Hey {NAME}! Evening warriors win wars.",
  "{NAME}, evening! The day's not over yet.",
  "Good evening, {NAME}! Final push time!",
  "Hey {NAME}! Evening motivation: you're almost there.",
  "Evening, {NAME}! Keep that energy up!",
  "{NAME}! Late grind = bigger wins. Let's chat!",
  "Hey {NAME}! Evening session? Count me in!",
  "Good evening, {NAME}! Let's finish strong.",
  "{NAME}, evening! Time to plan tomorrow's wins.",
  "Evening, {NAME}! The monkey works nights too.",
  "Hey {NAME}! Evening strategy session?",
  "{NAME}! Good evening! Burning the midnight oil?",
  "Evening, {NAME}! Extra hours = extra success.",
  "Hey {NAME}! Late but dedicated. What's up?",
  "{NAME}, evening! Let's optimize for tomorrow.",
  "Good evening, {NAME}! The grind never stops.",
  "Hey {NAME}! Evening warriors are built different.",
  "Evening, {NAME}! Ready for a nighttime breakthrough?",
  "{NAME}! Evening check: need any help?",
  "Hey {NAME}! Late sessions = dedicated bosses.",
  "Good evening, {NAME}! Let's make tonight count.",
  "{NAME}, evening! Working late? I'm here too.",
  "Evening, {NAME}! Night owls make money.",
  "Hey {NAME}! The evening grind is real.",
  "{NAME}! Good evening! Questions before bed?",
  "Evening, {NAME}! Let's set up tomorrow's success.",
  "Hey {NAME}! Evening hustle mode: activated.",
  "{NAME}, evening! The moon's up, so are your chances.",
  "Good evening, {NAME}! Still pushing? Amazing!",
  "Hey {NAME}! Evening ambition. Love to see it!",
  "Evening, {NAME}! Let's plan some winning moves.",
  "{NAME}! Night shift energy. What do you need?",
  "Hey {NAME}! Evening dedication pays off.",
  "Good evening, {NAME}! Almost there. Keep going!",
  "{NAME}, evening! Final sprint time.",
  "Evening, {NAME}! Late-night breakthrough incoming?",
  "Hey {NAME}! The evening crowd wins big.",
  "{NAME}! Good evening! Don't stop now.",
  "Evening, {NAME}! Nighttime = strategy time.",
  "Hey {NAME}! Evening session for the win!",
  "{NAME}, evening! Working smarter, not just harder.",
  "Good evening, {NAME}! The monkey admires your grind.",
  "Hey {NAME}! Evening motivation: sleep is temporary.",
  "Evening, {NAME}! Success doesn't clock out.",
  "{NAME}! Late night, big dreams. Let's chat!",
  "Hey {NAME}! Evening excellence in progress.",
  // Relaxed evening (25)
  "Evening, {NAME}! How was your day?",
  "Hey {NAME}! Winding down? Me too.",
  "{NAME}! Good evening. Taking it easy?",
  "Evening, {NAME}! The monkey's relaxing too.",
  "Hey {NAME}! Evening vibes. What's up?",
  "{NAME}, evening! Quick question before bed?",
  "Good evening, {NAME}! Peaceful evening?",
  "Hey {NAME}! Hope your day was great!",
  "Evening, {NAME}! Ready to chat anytime.",
  "{NAME}! Hey! Evening check-in.",
  "Good evening, {NAME}! What's on your mind?",
  "Hey {NAME}! Relaxing evening, I hope?",
  "{NAME}, evening! The genie's chilling.",
  "Evening, {NAME}! Questions? I'm here.",
  "Hey {NAME}! Evening thoughts? Share them!",
  "{NAME}! Good evening! All good?",
  "Evening, {NAME}! Let's have a chill chat.",
  "Hey {NAME}! Evening reflection time?",
  "{NAME}, evening! Anything I can help with?",
  "Good evening, {NAME}! Monkey's here for you.",
  "Hey {NAME}! Quiet evening? Perfect for planning.",
  "{NAME}! Evening! I'm all ears.",
  "Evening, {NAME}! Ready when you are.",
  "Hey {NAME}! Good evening! Let's talk.",
  "{NAME}, evening! Your genie awaits.",
];

const nightGreetings = [
  // Night owl motivation (50)
  "Hey {NAME}! Burning the midnight oil?",
  "Night owl {NAME}! The best ideas come at night.",
  "{NAME}! Late night = serious dedication.",
  "Hey {NAME}! Can't sleep? Let's strategize!",
  "Night, {NAME}! The quiet hours are for winners.",
  "{NAME}, up late? The monkey doesn't judge.",
  "Hey {NAME}! Midnight grind mode activated.",
  "Late night, {NAME}! Building empires, I see.",
  "{NAME}! Night owls build the best businesses.",
  "Hey {NAME}! The world sleeps, you conquer.",
  "Night, {NAME}! Late-night breakthrough coming?",
  "{NAME}, midnight hustle! What's cooking?",
  "Hey {NAME}! The stars are out, so are you.",
  "Late night, {NAME}! Dedication level: legendary.",
  "{NAME}! Can't stop, won't stop. What's up?",
  "Hey {NAME}! Nighttime is your time.",
  "Night, {NAME}! The genie works 24/7 too.",
  "{NAME}, late session? I'm here for it.",
  "Hey {NAME}! Midnight magic in progress.",
  "Late night, {NAME}! Winners work while others sleep.",
  "{NAME}! Night owl energy is unmatched.",
  "Hey {NAME}! The night shift pays dividends.",
  "Night, {NAME}! Silent hours, loud results.",
  "{NAME}, burning bright at midnight!",
  "Hey {NAME}! Late nights = early retirement.",
  "Night, {NAME}! Can't sleep when there's money to make?",
  "{NAME}! Midnight motivation: you're unstoppable.",
  "Hey {NAME}! The moon sees your grind.",
  "Late night, {NAME}! Extra effort = extra rewards.",
  "{NAME}, night! The monkey's a night owl too.",
  "Hey {NAME}! Nighttime entrepreneurs are different.",
  "Night, {NAME}! Sleep is for the weekends.",
  "{NAME}! Late-night strategy session?",
  "Hey {NAME}! The night is dark but your future is bright.",
  "Night, {NAME}! Building while the world dreams.",
  "{NAME}, midnight warrior! What do you need?",
  "Hey {NAME}! Can't sleep when success calls.",
  "Late night, {NAME}! The grind recognizes the grind.",
  "{NAME}! Night shift = growth shift.",
  "Hey {NAME}! Midnight oil burning bright!",
  "Night, {NAME}! Dream big, work late.",
  "{NAME}, late night check! How can I help?",
  "Hey {NAME}! The night is young for hustlers.",
  "Night, {NAME}! Your dedication is inspiring.",
  "{NAME}! Late-night champions unite.",
  "Hey {NAME}! Working while they're sleeping.",
  "Night, {NAME}! Moonlight hustle mode.",
  "{NAME}, night owl! The genie's awake too.",
  "Hey {NAME}! Midnight moves = morning wins.",
  "Late night, {NAME}! Can't stop the momentum.",
  // Caring night (25)
  "Hey {NAME}! Working late? Remember to rest too!",
  "Night, {NAME}! Don't forget to sleep eventually.",
  "{NAME}! Late night vibes. Everything okay?",
  "Hey {NAME}! The monkey says: sleep is important too!",
  "Night, {NAME}! Quick question before bed?",
  "{NAME}, late night! Take care of yourself.",
  "Hey {NAME}! Up late? Hope all is well!",
  "Night, {NAME}! Rest is part of success.",
  "{NAME}! Can't sleep? Let's chat then rest.",
  "Hey {NAME}! Late night, but don't overdo it!",
  "Night, {NAME}! Tomorrow's another day too.",
  "{NAME}, up late! Here if you need anything.",
  "Hey {NAME}! Night owl? Just checking on you.",
  "Night, {NAME}! Work hard, rest harder.",
  "{NAME}! Midnight thoughts? I'm listening.",
  "Hey {NAME}! Late but not forgotten.",
  "Night, {NAME}! The genie cares about your sleep.",
  "{NAME}, late night! You deserve rest too.",
  "Hey {NAME}! Quick chat then off to bed?",
  "Night, {NAME}! Winding down?",
  "{NAME}! Can't sleep? That's okay. Let's talk.",
  "Hey {NAME}! Night questions? I'm here.",
  "Night, {NAME}! Balance is key. Need help?",
  "{NAME}, night! Here for you, always.",
  "Hey {NAME}! Late night, big heart. What's up?",
];

const anytimeGreetings = [
  // Monkey/Genie themed (50)
  "Hey {NAME}! The monkey's got wisdom. Want some?",
  "{NAME}! Follow the monkey, he knows the way!",
  "Hey {NAME}! Monkey see, monkey help. What's up?",
  "{NAME}, the genie is ready! What's your wish?",
  "Hey {NAME}! The monkey's here to guide you.",
  "{NAME}! Your wish is my command. Let's talk!",
  "Hey {NAME}! Trust the monkey. He's got you.",
  "{NAME}, the genie awaits! Ask anything.",
  "Hey {NAME}! Monkey says: let's make money!",
  "{NAME}! The monkey knows the secrets. Want in?",
  "Hey {NAME}! Follow the monkey to success!",
  "{NAME}, genie wisdom incoming! Ready?",
  "Hey {NAME}! The monkey's got tips. Interested?",
  "{NAME}! Monkey see, {NAME} do? Let's go!",
  "Hey {NAME}! The genie grants business wishes.",
  "{NAME}, the monkey's watching out for you!",
  "Hey {NAME}! Trust the monkey, trust the process.",
  "{NAME}! The genie knows all. Ask away!",
  "Hey {NAME}! Monkey wisdom, zero cost. What's up?",
  "{NAME}, follow the monkey to profits!",
  "Hey {NAME}! The monkey's been expecting you.",
  "{NAME}! Genie tip: just ask. I'll help!",
  "Hey {NAME}! The monkey makes it easy. Follow me!",
  "{NAME}, your monkey mentor is here!",
  "Hey {NAME}! Monkey magic for your business.",
  "{NAME}! The genie's lamp is lit. Let's chat!",
  "Hey {NAME}! Copy what the monkey does. Easy!",
  "{NAME}, monkey see success, {NAME} do success!",
  "Hey {NAME}! The genie simplifies everything.",
  "{NAME}! Trust the monkey. He's made money.",
  "Hey {NAME}! Monkey mode: copy and profit.",
  "{NAME}, the monkey's path to riches awaits!",
  "Hey {NAME}! Genie says: don't overthink it.",
  "{NAME}! The monkey keeps it simple. So do I!",
  "Hey {NAME}! Follow the monkey, find the money.",
  "{NAME}, monkey guide at your service!",
  "Hey {NAME}! The genie sees potential in you.",
  "{NAME}! Monkey's tip: just copy and go!",
  "Hey {NAME}! The monkey's got your back.",
  "{NAME}, genie vibes! Let's make magic.",
  "Hey {NAME}! Monkey see, monkey show you how.",
  "{NAME}! The monkey simplifies success.",
  "Hey {NAME}! Follow the genie's guidance.",
  "{NAME}, the monkey's wisdom is free. Ask!",
  "Hey {NAME}! Monkey mentor mode: activated.",
  "{NAME}! The genie makes it easy. Promise!",
  "Hey {NAME}! Trust the monkey. Win big.",
  "{NAME}, monkey see opportunity! Let's go.",
  "Hey {NAME}! The genie's here to serve.",
  "{NAME}! Copy the monkey. Profit. Repeat.",
  // Encouraging (50)
  "Hey {NAME}! You've got this. Need help?",
  "{NAME}! I believe in you. Let's chat!",
  "Hey {NAME}! Ready to level up?",
  "{NAME}, let's make something amazing!",
  "Hey {NAME}! Your success story continues.",
  "{NAME}! Big things are coming. I can feel it!",
  "Hey {NAME}! Let's turn ideas into income.",
  "{NAME}, you're closer than you think!",
  "Hey {NAME}! Potential = unlimited. Let's go!",
  "{NAME}! Small steps, big wins. What's next?",
  "Hey {NAME}! The only way is up!",
  "{NAME}, let's break through barriers!",
  "Hey {NAME}! Success is a conversation away.",
  "{NAME}! You're built for this. Believe it!",
  "Hey {NAME}! Let's make today count.",
  "{NAME}, every expert was once a beginner!",
  "Hey {NAME}! Your journey is inspiring.",
  "{NAME}! Keep going. You're almost there!",
  "Hey {NAME}! Champions are made, not born.",
  "{NAME}, let's create something special!",
  "Hey {NAME}! Your future self will thank you.",
  "{NAME}! Progress over perfection. Let's talk!",
  "Hey {NAME}! You're on the right path.",
  "{NAME}, success loves consistency!",
  "Hey {NAME}! Big dreams? Let's plan big!",
  "{NAME}! You've got what it takes.",
  "Hey {NAME}! Let's turn struggles into strength.",
  "{NAME}, the best is yet to come!",
  "Hey {NAME}! Your potential is limitless.",
  "{NAME}! Action beats anxiety. Let's go!",
  "Hey {NAME}! You're capable of amazing things.",
  "{NAME}, believe + action = success!",
  "Hey {NAME}! Let's write your success story.",
  "{NAME}! Growth mindset activated!",
  "Hey {NAME}! You inspire me, honestly.",
  "{NAME}, let's conquer challenges together!",
  "Hey {NAME}! The world needs your ideas.",
  "{NAME}! Doubt kills more dreams than failure.",
  "Hey {NAME}! Your hustle is noticed.",
  "{NAME}, keep pushing. Victory awaits!",
  "Hey {NAME}! Let's build your empire.",
  "{NAME}! Scared? Do it anyway!",
  "Hey {NAME}! Success is on the horizon.",
  "{NAME}, your breakthrough is coming!",
  "Hey {NAME}! Let's make magic happen.",
  "{NAME}! You're stronger than you know.",
  "Hey {NAME}! Winners never quit. You're a winner!",
  "{NAME}, let's crush those goals!",
  "Hey {NAME}! Your time is now.",
  "{NAME}! Dream it. Do it. Done!",
  // Helpful/Casual (100)
  "Hey {NAME}! What can I help you with?",
  "{NAME}! Got questions? I've got answers!",
  "Hey {NAME}! Need anything? I'm here.",
  "{NAME}, let's figure this out together!",
  "Hey {NAME}! How can I assist today?",
  "{NAME}! Stuck on something? Let's solve it!",
  "Hey {NAME}! I'm all ears. What's up?",
  "{NAME}, ask away! No question is too small.",
  "Hey {NAME}! Let's chat. What's on your mind?",
  "{NAME}! Here to help, anytime.",
  "Hey {NAME}! What brings you here today?",
  "{NAME}, need guidance? That's what I'm for!",
  "Hey {NAME}! Let's tackle your challenges.",
  "{NAME}! Confused about something? Let's clarify!",
  "Hey {NAME}! Ready to help. What do you need?",
  "{NAME}, I'm just a message away!",
  "Hey {NAME}! Let's make things easier for you.",
  "{NAME}! Questions? Concerns? Let's discuss!",
  "Hey {NAME}! Your friendly helper is here.",
  "{NAME}, let's solve problems together!",
  "Hey {NAME}! What's the challenge today?",
  "{NAME}! Need a hand? I've got two!",
  "Hey {NAME}! Let's get you sorted.",
  "{NAME}, I'm here to make life easier!",
  "Hey {NAME}! What can we accomplish together?",
  "{NAME}! Help is just a question away.",
  "Hey {NAME}! Let's turn confusion into clarity.",
  "{NAME}, stuck? Let's unstick you!",
  "Hey {NAME}! Your success is my mission.",
  "{NAME}! Problems? Let's find solutions!",
  "Hey {NAME}! I'm ready when you are.",
  "{NAME}, let's make progress together!",
  "Hey {NAME}! What's holding you back?",
  "{NAME}! Every question is welcome here.",
  "Hey {NAME}! Let's simplify things.",
  "{NAME}, need tips? I've got plenty!",
  "Hey {NAME}! Obstacles? Let's overcome them!",
  "{NAME}! I'm here to guide you.",
  "Hey {NAME}! What's the goal today?",
  "{NAME}, let's strategize!",
  "Hey {NAME}! Your helper monkey reporting!",
  "{NAME}! Need advice? Free and ready!",
  "Hey {NAME}! Let's brainstorm together.",
  "{NAME}, any questions on your mind?",
  "Hey {NAME}! Let me help you out.",
  "{NAME}! Challenges accepted! What's yours?",
  "Hey {NAME}! I'm your go-to helper.",
  "{NAME}, let's work through this!",
  "Hey {NAME}! What do you need to know?",
  "{NAME}! Ask anything. Seriously, anything!",
  "Hey {NAME}! Let's find answers together.",
  "{NAME}, I'm here for your success!",
  "Hey {NAME}! What's the plan today?",
  "{NAME}! Need clarity? Let's chat!",
  "Hey {NAME}! Your questions are my favorite.",
  "{NAME}, let's get things done!",
  "Hey {NAME}! Stuck? I'll help you move forward.",
  "{NAME}! I'm always happy to help.",
  "Hey {NAME}! What's puzzling you?",
  "{NAME}, let's make sense of things!",
  "Hey {NAME}! Ready to dive in?",
  "{NAME}! Let's learn something new together.",
  "Hey {NAME}! Your helper is online!",
  "{NAME}, what's the first question?",
  "Hey {NAME}! I'm here to guide the way.",
  "{NAME}! Need support? You've got it!",
  "Hey {NAME}! Let's clear up any confusion.",
  "{NAME}, your success partner is here!",
  "Hey {NAME}! What can we work on?",
  "{NAME}! Let's chat about your business.",
  "Hey {NAME}! Questions welcome, always!",
  "{NAME}, need a second opinion? I'm here!",
  "Hey {NAME}! Let's explore your options.",
  "{NAME}! Guidance mode: activated!",
  "Hey {NAME}! What's the biggest challenge?",
  "{NAME}, I'm your business buddy!",
  "Hey {NAME}! Let's optimize something!",
  "{NAME}! Need to vent? I'll listen.",
  "Hey {NAME}! Let's plan your next move.",
  "{NAME}, help is always available here!",
  "Hey {NAME}! What do you want to learn?",
  "{NAME}! Your questions drive me!",
  "Hey {NAME}! Let's grow together.",
  "{NAME}, every question gets answered!",
  "Hey {NAME}! I'm here to assist, not judge.",
  "{NAME}! Let's remove those roadblocks!",
  "Hey {NAME}! What's the vision today?",
  "{NAME}, together we're stronger!",
  "Hey {NAME}! Your ally in business!",
  "{NAME}! Let's tackle that to-do list!",
  "Hey {NAME}! Need something? Just ask!",
  "{NAME}, I'm rooting for you!",
  "Hey {NAME}! Let's find what you need.",
  "{NAME}! Questions? Ideas? Concerns? All welcome!",
  "Hey {NAME}! Your helper monkey awaits!",
  "{NAME}, let's make it happen!",
  "Hey {NAME}! What's your priority today?",
  "{NAME}! I'm here, ready, and waiting!",
  "Hey {NAME}! Let's turn ideas into action.",
  "{NAME}, your success is my business!",
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

  // Mix time-based greetings with anytime greetings (70/30 split)
  const useTimeBasedGreeting = Math.random() < 0.7;

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
  const [isExpanded, setIsExpanded] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // Get personalized greeting on mount and when user name changes
  useEffect(() => {
    setGreeting(getRandomGreeting(userName));
  }, [userName]);

  // Rotate greeting every 30 seconds when expanded
  useEffect(() => {
    if (!isExpanded) return;

    const interval = setInterval(() => {
      setGreeting(getRandomGreeting(userName));
    }, 30000);

    return () => clearInterval(interval);
  }, [isExpanded, userName]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          // Expanded State - Rectangle with GIF and text
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative flex items-stretch bg-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer"
            style={{
              minWidth: '320px',
              maxWidth: '380px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(0, 0, 0, 0.1)',
            }}
            onClick={() => {
              // In the future, this will open the chat
              console.log('Open chat');
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Close/Minimize Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Minimize chat"
            >
              <X size={14} className="text-gray-500" />
            </button>

            {/* Left Side - Text Content */}
            <div className="flex-1 p-4 pr-2 flex flex-col justify-center">
              <motion.p
                key={greeting}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-gray-800 font-medium leading-relaxed"
              >
                {greeting}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0.7 }}
                className="mt-2 flex items-center gap-1.5 text-xs text-gray-500"
              >
                <MessageCircle size={12} />
                <span>Click to chat with the Monkey</span>
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
                  ? 'inset 0 0 0 2px rgba(136, 218, 28, 0.5)'
                  : 'inset 0 0 0 0px rgba(136, 218, 28, 0)',
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        ) : (
          // Minimized State - Circle with just the GIF
          <motion.button
            key="minimized"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={() => setIsExpanded(true)}
            className="w-16 h-16 rounded-full overflow-hidden shadow-2xl"
            style={{
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2), 0 4px 15px rgba(0, 0, 0, 0.1)',
            }}
            aria-label="Open chat"
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
              className="absolute inset-0 rounded-full border-2 border-[var(--primary)]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
