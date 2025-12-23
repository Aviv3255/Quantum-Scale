/**
 * Quantum Scale - Lesson Welcome Greetings
 * 240 dopamine-sparking greetings (16 time slots x 15 each)
 * {name} placeholder gets replaced with user's actual name
 */

const welcomeAnimations = {
  // 5:00 - 5:59 AM — The Elite Hour
  'early_bird_5am': [
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "{name}. 5 AM. The hour that separates dreamers from empire builders." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "Is that {name} I see? At 5 AM? You absolute psychopath. I love it." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runXIb_HMRUiT0_He_is_streching_his_arms_ha_2d6fbd3c-4b32-49eb-a5f7-c2b0f2d7bbbc_0.mp4', greeting: "The world is asleep. But not {name}. Never {name}." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "{name} just entered the 5 AM club. Your competitors? Still unconscious." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "Plot twist: While they hit snooze, {name} hits profit." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "5 AM and {name} is already winning. This is why you'll make it." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "Before sunrise, {name} is already putting in the work. Respect." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "{name}, you're up at 5 AM? That's not dedication. That's obsession. Beautiful." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "The early bird doesn't just get the worm. {name} gets the whole damn market." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "Coffee hits different at 5 AM, doesn't it {name}? Let's build." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "{name} doesn't wait for motivation. {name} creates it. At 5 AM." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runXIb_HMRUiT0_He_is_streching_his_arms_ha_2d6fbd3c-4b32-49eb-a5f7-c2b0f2d7bbbc_0.mp4', greeting: "You know what 5 AM is? It's {name}'s unfair advantage. Use it." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "They'll ask how {name} got so far ahead. The answer? 5 AM." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "Welcome to the hour that millionaires are made, {name}." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "{name} at 5 AM. That's not a person. That's a force of nature." }
  ],

  // 6:00 - 6:59 AM — Sunrise Warriors
  'sunrise_6am': [
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runXIb_HMRUiT0_He_is_streching_his_arms_ha_2d6fbd3c-4b32-49eb-a5f7-c2b0f2d7bbbc_0.mp4', greeting: "Sun's coming up, {name}. So is your revenue. Let's make it happen." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "{name} catches sunrise studying business? Your future self is crying happy tears." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "Good morning, {name}. While others dream, you build. That's the difference." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "Dawn breaks, and so do {name}'s barriers. New day, new records." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "6 AM. {name}. Grinding. This is the recipe for legendary." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "The sun rises. {name} rises harder. Today is conquest day." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "Most people are still in bed, {name}. You're already 3 steps ahead." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "{name}! Early morning learner detected. Success probability: extremely high." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "Morning champion {name} has entered the building. World: take notice." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "Fresh coffee, fresh start, fresh opportunities. Let's go, {name}." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "{name} is up before the competition even sets their alarm. Savage." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runXIb_HMRUiT0_He_is_streching_his_arms_ha_2d6fbd3c-4b32-49eb-a5f7-c2b0f2d7bbbc_0.mp4', greeting: "Golden hour for building empires. Perfect timing, {name}." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "Sunrise learner {name} has a 6-hour head start. Use it wisely." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "They say the early bird gets the worm. {name} gets the whole ecosystem." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "Sunrise and {name}? Name a more iconic duo. I'll wait." }
  ],

  // 7:00 - 7:59 AM — Peak Morning Power
  'morning_power_7am': [
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "{name}! 7 AM and you're already investing in yourself. That's CEO behavior." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "7 AM brain is the sharpest brain. Use it well, {name}." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "Look who showed up before the chaos begins. Smart move, {name}." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "Morning magic hour, {name}. Your brain is firing on all cylinders right now." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "{name} at 7 AM learning new skills. Your competitors? Still scrolling Instagram." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "This is the hour winners lock in, {name}. And here you are." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "Good morning, future millionaire. Ready to earn it, {name}?" },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "{name}'s morning routine includes winning. I can respect that." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runXIb_HMRUiT0_He_is_streching_his_arms_ha_2d6fbd3c-4b32-49eb-a5f7-c2b0f2d7bbbc_0.mp4', greeting: "7 AM learners are statistically more successful. {name} is on track." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "Before most people even open their eyes, {name} is leveling up." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "{name}! Morning momentum is real momentum. Let's capture it." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "The world is waking up, but {name} is already running laps around it." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "Morning power hour activated, {name}. Time to become unstoppable." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "{name} chose growth over the snooze button. Legendary decision." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "7 AM is {name}'s secret weapon. Shh. Don't tell the competition." }
  ],

  // 8:00 - 8:59 AM — Full Throttle
  'peak_morning_8am': [
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "{name}! 8 AM. Brain fully online. Let's learn something that makes money." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "While the 9-to-5ers commute, {name} is already winning. Perfect strategy." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "8 AM learning session with {name}. This is how empires begin." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "Peak focus hours, {name}. Everything you learn now sticks forever." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "{name} is investing in knowledge at 8 AM. ROI: unlimited." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "The traffic is horrible right now. But {name}? Already at work. Smart." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "{name} didn't come here to play. {name} came here to dominate." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "Morning momentum is unmatched, {name}. Ride it all the way to the bank." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "8 AM brain = maximum retention. {name} is playing chess, not checkers." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runXIb_HMRUiT0_He_is_streching_his_arms_ha_2d6fbd3c-4b32-49eb-a5f7-c2b0f2d7bbbc_0.mp4', greeting: "Fresh, focused, and ready to win. That's {name} at 8 AM." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "{name}'s 8 AM looks different than most people's. That's why {name} wins." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "Good morning, {name}. Your dedication just moved you up 10 spots." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "While others check social media, {name} checks the profit playbook." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "8 AM learner {name} has already accomplished more than most will all day." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "{name} before 9 AM: Learning. Competitors: Still complaining about Monday." }
  ],

  // 9:00 - 9:59 AM — Momentum Builder
  'mid_morning_9am': [
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "{name}! 9 AM and you're stacking skills. Your future self is doing a victory dance." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "While corporate slaves punch in, {name} is building an empire. Different lanes." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "9 AM hustle hits different when you're {name}. Let's add to your arsenal." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "Morning coffee + {name} + knowledge bombs = Unstoppable combination." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "{name} chose learning over meetings. That's main character energy." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "Prime learning time, {name}. Your brain is absorbing everything right now." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "9 AM and {name} is already in the zone. This energy is contagious." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "{name}'s morning priorities: Growth first, everything else second. Respect." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runXIb_HMRUiT0_He_is_streching_his_arms_ha_2d6fbd3c-4b32-49eb-a5f7-c2b0f2d7bbbc_0.mp4', greeting: "The momentum is building, {name}. Keep stacking those wins." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "Mid-morning magic with {name}. Perfect time for breakthrough ideas." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "{name} is treating 9 AM like a weapon. And it absolutely is one." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "Most people are just getting started. {name}? Already ahead." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "Morning person or not, {name} shows up. That's what matters." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "{name}'s 9 AM grind is someone else's impossible. Stay dangerous." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "Locked in at 9 AM, {name}. This is where legends are forged." }
  ],

  // 10:00 - 10:59 AM — Steady Climb
  'late_morning_10am': [
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "10 AM. {name} is deep in learning mode. Beautiful sight to see." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "{name}! Mid-morning sessions hit different. Focus level: maximum." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "10 AM brain is warmed up and ready. Perfect timing, {name}." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "The day is flowing, and so is {name}. Steady climb to the top." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "{name} at 10 AM: Absorbing knowledge. Competitors: In useless meetings." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "Mid-morning momentum is real, {name}. Ride this wave hard." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "The 10 AM zone is {name}'s secret weapon. Sharp, focused, unstoppable." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "{name}'s brain is firing at peak capacity right now. Let's use it." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runXIb_HMRUiT0_He_is_streching_his_arms_ha_2d6fbd3c-4b32-49eb-a5f7-c2b0f2d7bbbc_0.mp4', greeting: "10 AM learner {name} is stacking advantages. One lesson at a time." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "Coffee break? Nah. {name} takes knowledge breaks instead." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "{name} is making 10 AM count. Every minute is an investment." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "Halfway to lunch, {name} is halfway to genius. Keep going." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "The morning momentum continues with {name}. This is how you win." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "10 AM and {name} is still hungry. That hunger will take you far." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "{name}'s 10 AM looks productive as hell. Right where you should be." }
  ],

  // 11:00 - 11:59 AM — Pre-Noon Hustle
  'pre_noon_11am': [
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "{name}! Squeezing in some growth before lunch? Absolute power move." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "11 AM and {name} is still in the game. This is championship mentality." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "Pre-lunch power session with {name}. Maximum efficiency mode activated." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "While everyone's thinking about lunch, {name} is thinking about winning." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "{name} doesn't wait for the perfect time. {name} makes the time perfect." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "Almost noon and {name} is still stacking skills. Relentless." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "11 AM learning session? {name} knows the game. Every hour counts." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "{name}'s morning is almost complete. But the growth? Never complete." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runXIb_HMRUiT0_He_is_streching_his_arms_ha_2d6fbd3c-4b32-49eb-a5f7-c2b0f2d7bbbc_0.mp4', greeting: "Last stretch of the morning, {name}. Make it count." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "Pre-noon productivity with {name}. This is how empires are built." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "{name} at 11 AM: Finishing strong. Competitors: Already checked out." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "The morning's final hour belongs to {name}. Own it." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "11 AM focus session with {name}. Peak productivity before the break." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "{name} is maximizing every morning minute. That's the difference." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "Almost lunchtime, but {name} is feasting on knowledge instead." }
  ],

  // 12:00 - 12:59 PM — High Noon
  'high_noon_12pm': [
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "High noon, {name}. While they eat, you feast on knowledge." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "{name} at noon: Learning. Others at noon: Scrolling memes. Different breeds." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "Lunchtime learning with {name}? This is next-level commitment." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "12 PM and {name} is still hungry - for success. Let's feed that hunger." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "Midday power move by {name}. Using lunch break to build empires." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "{name} treats noon like a second morning. Fresh energy, fresh start." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "High noon showdown: {name} vs mediocrity. We know who wins." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "Noon learning session activated. {name} is playing a different game." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runXIb_HMRUiT0_He_is_streching_his_arms_ha_2d6fbd3c-4b32-49eb-a5f7-c2b0f2d7bbbc_0.mp4', greeting: "While the office gossips at lunch, {name} levels up. Priorities." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "{name}'s lunch hour: More productive than most people's entire day." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "12 PM knowledge drop incoming, {name}. Ready to catch it?" },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "Midday momentum with {name}. Half the day done, but you're just getting started." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "{name} uses lunch breaks like weapons. Strategic and deadly effective." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "Noon grinder {name} is here. The afternoon is about to be dominated." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "High noon, high ambition. That's the {name} way." }
  ],

  // 1:00 - 1:59 PM — Post-Lunch Revival
  'post_lunch_1pm': [
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "Post-lunch slump? Not for {name}. {name} turns 1 PM into power hour." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "While others nap, {name} attacks. 1 PM is go time." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "{name}! Most people crash after lunch. You? You accelerate." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "1 PM learning session? {name} fights the food coma with knowledge." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "The afternoon belongs to {name}. Starting right now, right here." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "Post-lunch power move by {name}. This is why you'll outpace everyone." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "{name} doesn't believe in afternoon slumps. Just afternoon domination." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "1 PM and {name} is still locked in. That's main character energy." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runXIb_HMRUiT0_He_is_streching_his_arms_ha_2d6fbd3c-4b32-49eb-a5f7-c2b0f2d7bbbc_0.mp4', greeting: "The food coma tried to get {name}. It failed. Let's learn." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "{name}'s afternoon: A continuation of morning victories. Non-stop." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "Post-lunch and {name} is sharper than ever. This is how it's done." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "While the office nods off, {name} grinds on. Different breed." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "1 PM focus with {name}. The afternoon is about to be conquered." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "{name} treats every hour the same: As an opportunity. Including 1 PM." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "Post-lunch warrior {name} reporting for duty. Let's make gains." }
  ],

  // 2:00 - 2:59 PM — Afternoon Grind
  'afternoon_grind_2pm': [
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "2 PM grind mode with {name}. While they crash, you climb." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "Afternoon warrior {name}! The tired ones quit. You double down." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "{name}! 2 PM separates the serious from the pretenders. You're serious." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "The 2 PM wall? {name} breaks through walls for breakfast." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "Most people are running on fumes now. Not {name}. Never {name}." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "2 PM focus session? {name} is built different. Literally unstoppable." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "Afternoon grinder {name} is here. The competition is getting nervous." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "{name} at 2 PM: Learning. Office workers: Watching the clock." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runXIb_HMRUiT0_He_is_streching_his_arms_ha_2d6fbd3c-4b32-49eb-a5f7-c2b0f2d7bbbc_0.mp4', greeting: "The 2 PM session is when {name} separates from the pack. Let's go." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "{name}'s afternoon: Still productive. Still hungry. Still winning." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "2 PM energy from {name} is unmatched. Keep that fire burning." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "While they count hours until 5 PM, {name} counts victories." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "Afternoon fuel-up with {name}. Knowledge is the real caffeine." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "{name} doesn't slow down after lunch. {name} speeds up." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "2 PM and {name} is still stacking skills. This is the grind." }
  ],

  // 3:00 - 3:59 PM — Second Wind
  'mid_afternoon_3pm': [
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "3 PM second wind, {name}. While others fade, you flourish." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "{name}! The afternoon lull is a myth. You're proving it right now." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "3 PM knowledge session with {name}. Peak commitment on display." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "{name}'s 3 PM: Learning. Everyone else's 3 PM: Daydreaming about leaving." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "Second wind activated for {name}. The home stretch starts now." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "{name} at 3 PM is still dangerous. That energy is contagious." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "The 3 PM zone is where {name} thrives. Let's capture that energy." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "Mid-afternoon magic with {name}. Still hungry, still hunting." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runXIb_HMRUiT0_He_is_streching_his_arms_ha_2d6fbd3c-4b32-49eb-a5f7-c2b0f2d7bbbc_0.mp4', greeting: "{name} caught a second wind. Time to use it wisely." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "3 PM and {name} is still leveling up. Relentless is the word." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "{name}'s afternoon productivity is someone else's entire day." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "The afternoon is far from over, {name}. Let's make it count." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "3 PM refresh for {name}. New energy, same unstoppable attitude." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "{name} doesn't wind down at 3 PM. {name} winds up." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "Mid-afternoon and {name} is still attacking. Pure champion mentality." }
  ],

  // 4:00 - 4:59 PM — Home Stretch
  'late_afternoon_4pm': [
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "{name}! 4 PM and still going strong. This is what winners do." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "Late afternoon grind with {name}. The finish line is for starters." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "4 PM and {name} is still hungry. That hunger will take you to the top." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "While others start packing up, {name} keeps stacking up wins." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "Home stretch, {name}. But you're not slowing down. Never do." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "{name} at 4 PM: Learning mode. Coworkers: Exit mode. Different DNA." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "Late afternoon learner {name} is built for this. Keep pushing." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "4 PM and {name} is finishing the day stronger than most start it." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runXIb_HMRUiT0_He_is_streching_his_arms_ha_2d6fbd3c-4b32-49eb-a5f7-c2b0f2d7bbbc_0.mp4', greeting: "{name}'s 4 PM is prime time for learning. Let's maximize it." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "The workday is ending for most. For {name}? It's just getting good." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "4 PM focus from {name}. End-of-day excellence on display." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "{name} doesn't coast to the finish. {name} sprints through it." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Holding_coffee_mug_taking_a_sip_tired_but_dete_ea89f0bd-3cec-424c-b616-3ef902b2ce07_3.mp4', greeting: "Late afternoon power session with {name}. Still sharp, still winning." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "4 PM and {name} is squeezing every drop of value from the day." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "Home stretch warrior {name} is here. Let's finish strong together." }
  ],

  // 5:00 - 5:59 PM — Golden Hour
  'golden_hour_5pm': [
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_back_in_chair_arms_behind_head_relaxed_850faa8d-67d9-4b68-8cae-277e0f191db1_1.mp4', greeting: "5 PM. The rat race ends. But {name}'s race to the top? Just getting started." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "Golden hour with {name}. While they commute, you convert knowledge to power." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "{name}! Everyone's clocking out. You're clocking in to success." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Adjusting_glasses_thoughtfully_intellectual_ev_90f03bdd-89f1-4707-98c6-091573624247_2.mp4', greeting: "5 PM brain is sharp and focused. Perfect timing, {name}." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "The 9-to-5 is over. But {name}'s ambition doesn't clock out." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "Golden hour learning with {name}. This is the extra mile that counts." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "{name} at 5 PM: Leveling up. Coworkers at 5 PM: Happy hour. Priorities." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "5 PM and {name} is still hungry. That hunger is your superpower." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "While the masses rush home, {name} rushes toward greatness." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_back_in_chair_arms_behind_head_relaxed_850faa8d-67d9-4b68-8cae-277e0f191db1_1.mp4', greeting: "Golden hour genius {name} is in the building. Let's make magic." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "{name}'s 5 PM looks different. Not winding down - powering up." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "5 PM is when the real work begins for {name}. Side hustle hours." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Adjusting_glasses_thoughtfully_intellectual_ev_90f03bdd-89f1-4707-98c6-091573624247_2.mp4', greeting: "The shift is over. {name}'s shift to success is just beginning." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "5 PM and {name} is investing in tomorrow's wealth. Smart play." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "Golden hour with {name}. The light is perfect for building empires." }
  ],

  // 6:00 - 7:59 PM — Evening Architect
  'evening_6pm': [
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_back_in_chair_arms_behind_head_relaxed_850faa8d-67d9-4b68-8cae-277e0f191db1_1.mp4', greeting: "Evening mastermind {name}! Relaxed but ready. This is YOUR time." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Adjusting_glasses_thoughtfully_intellectual_ev_90f03bdd-89f1-4707-98c6-091573624247_2.mp4', greeting: "While they binge Netflix, {name} builds. Different priorities, different results." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "Evening learning with {name}? Respect. This is how legends are made." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "{name}! Prime time learner detected. While they watch, you build." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "Evening architect mode activated, {name}. Let's design your future." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "{name}'s evening: Productive. Average person's evening: Wasted. Be {name}." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "After hours with {name}. The quiet time is the productive time." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "Evening session with {name}. You're making tomorrow easier right now." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "{name} shows up in the evening too. 24/7 growth mindset. Legendary." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_back_in_chair_arms_behind_head_relaxed_850faa8d-67d9-4b68-8cae-277e0f191db1_1.mp4', greeting: "Evening brain is creative brain, {name}. Perfect for breakthroughs." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Adjusting_glasses_thoughtfully_intellectual_ev_90f03bdd-89f1-4707-98c6-091573624247_2.mp4', greeting: "{name} uses evenings wisely. That's the compound effect in action." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "Evening warrior {name} is here. The night is young, so is your empire." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "After dinner learning with {name}. Feeding the mind, not just the body." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "{name}'s evening routine includes winning. I can respect that." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "Evening session activated, {name}. Let's end this day on top." }
  ],

  // 8:00 - 9:59 PM — Night Owl Mode
  'night_8pm': [
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "Night owl {name}! While they sleep, you're building dreams into reality." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Typing_rapidly_on_invisible_keyboard_completel_e28a1205-4e65-4eb7-908d-4eacbc5c3a49_1.mp4', greeting: "The night belongs to {name}. Quiet hours, loud results." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "{name}! Can't sleep until you win? Welcome home, fellow night warrior." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "Night mode with {name}. The world is quiet. Your mind is loud." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "8 PM and {name} is still grinding. That's championship DNA right there." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "Night session with {name}. Some of the best ideas come after dark." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "{name}'s night: Learning. Everyone else's night: Scrolling. Levels." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Adjusting_glasses_thoughtfully_intellectual_ev_90f03bdd-89f1-4707-98c6-091573624247_2.mp4', greeting: "Night owl energy from {name}. The quiet hours are profitable hours." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "{name} at night is dangerous. In the best way possible." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_back_in_chair_arms_behind_head_relaxed_850faa8d-67d9-4b68-8cae-277e0f191db1_1.mp4', greeting: "Evening learner {name} knows the secret: nights are for building." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "The night crew is different, {name}. Welcome to the inner circle." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Typing_rapidly_on_invisible_keyboard_completel_e28a1205-4e65-4eb7-908d-4eacbc5c3a49_1.mp4', greeting: "{name} shows up after hours. That's the extra 10% that matters." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "Night mode {name}: Activated. Distractions: Eliminated. Let's learn." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "While the world winds down, {name} powers up. Night owl supremacy." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "{name} and the night: A legendary partnership. Let's build." }
  ],

  // 10:00 PM - 4:59 AM — Midnight Grind
  'midnight_10pm': [
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "Midnight grind mode, {name}. The profitable hours are the quiet ones." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Typing_rapidly_on_invisible_keyboard_completel_e28a1205-4e65-4eb7-908d-4eacbc5c3a49_1.mp4', greeting: "{name} at midnight? That's not dedication. That's obsession. I love it." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "You're one of us, {name}. The midnight warriors. The 1%." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "While the world sleeps, {name} is creating their future. Respect." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "Midnight knowledge with {name}. These hours will change your life." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "{name} can't sleep until they win? Same. Welcome to the club." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Slow_clapping_with_respect_impressed_expressio_0b19509f-cc4b-42f9-8f0b-c3815f48e892_1.mp4', greeting: "The midnight hour belongs to {name}. No distractions. Pure focus." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Adjusting_glasses_thoughtfully_intellectual_ev_90f03bdd-89f1-4707-98c6-091573624247_2.mp4', greeting: "Late night learner {name} is built different. Literally unstoppable." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Pointing_forward_with_determination_focused_ey_6c200771-c0a0-4ccf-99de-53e21b0d89f0_2.mp4', greeting: "{name}'s midnight: Learning mode. Everyone else: Sleep mode. Levels." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Fist_pump_in_the_air_burning_eyes_midnight_war_e1620aa7-f682-4a1e-939d-72e21a68bdfc_3.mp4', greeting: "The graveyard shift for learning. {name} doesn't mess around." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Typing_rapidly_on_invisible_keyboard_completel_e28a1205-4e65-4eb7-908d-4eacbc5c3a49_1.mp4', greeting: "Midnight oil burning bright, {name}. This is how legends are forged." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Standing_in_superhero_power_pose_with_superman_bccd0d91-830b-4696-bed8-5bdead0eba36_2.mp4', greeting: "{name} at these hours? That's not normal. That's extraordinary." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Leaning_forward_slightly_focused_eyes_fingers__5c0d1465-878c-49ea-a8c9-2238975718b0_1.mp4', greeting: "The quiet hours. The productive hours. {name}'s hours. Let's go." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_Nodding_head_a_few_times_subtle_smile_lets_do__6ed8d140-2dc3-4f10-823d-79bfbee8cedc_3.mp4', greeting: "Late night session with {name}. Tomorrow's success starts right now." },
    { gif: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.run4YtlydUb6iQ_He_is_doing_Military_salute_f147476f-7106-4200-bc87-65549ff24b91_2.mp4', greeting: "Midnight warrior {name} reporting for duty. The night is ours." }
  ]
};

/**
 * Get time-based welcome greeting
 * @returns {Object} { gif: string, greeting: string }
 */
function getTimeBasedWelcome() {
  const hour = new Date().getHours();

  const slot =
    hour === 5 ? 'early_bird_5am' :
    hour === 6 ? 'sunrise_6am' :
    hour === 7 ? 'morning_power_7am' :
    hour === 8 ? 'peak_morning_8am' :
    hour === 9 ? 'mid_morning_9am' :
    hour === 10 ? 'late_morning_10am' :
    hour === 11 ? 'pre_noon_11am' :
    hour === 12 ? 'high_noon_12pm' :
    hour === 13 ? 'post_lunch_1pm' :
    hour === 14 ? 'afternoon_grind_2pm' :
    hour === 15 ? 'mid_afternoon_3pm' :
    hour === 16 ? 'late_afternoon_4pm' :
    hour === 17 ? 'golden_hour_5pm' :
    (hour >= 18 && hour <= 19) ? 'evening_6pm' :
    (hour >= 20 && hour <= 21) ? 'night_8pm' :
    'midnight_10pm'; // 22-4

  const options = welcomeAnimations[slot];
  return options[Math.floor(Math.random() * options.length)];
}

/**
 * Format greeting with user's name
 * @param {string} template - Greeting template with {name} placeholder
 * @param {string} name - User's name
 * @returns {string} Formatted greeting
 */
function formatGreeting(template, name) {
  return template.replace(/\{name\}/g, name);
}

// Export for use in lessons
if (typeof window !== 'undefined') {
  window.welcomeAnimations = welcomeAnimations;
  window.getTimeBasedWelcome = getTimeBasedWelcome;
  window.formatGreeting = formatGreeting;
}
