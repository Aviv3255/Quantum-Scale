/**
 * Download all brand logos, entrepreneur photos, and monkey character videos
 * from Supabase storage to a local folder
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Output directory
const OUTPUT_DIR = path.join(__dirname, 'assets', 'downloaded-images');

// Create subdirectories
const DIRS = {
  brands: path.join(OUTPUT_DIR, 'brands'),
  entrepreneurs: path.join(OUTPUT_DIR, 'entrepreneurs'),
  monkeys: path.join(OUTPUT_DIR, 'monkey-characters'),
};

// All images from Lessons-Improvement-list.txt
const images = {
  entrepreneurs: [
    { name: 'Alex Hormozi', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/eov911dsc81vaj73li2pag9pt7-removebg-preview.png' },
    { name: 'Davie Fogarty', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/hq720__1_-removebg-preview.png' },
    { name: 'Ben Francis', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/channels4_profile__2_-removebg-preview.png' },
    { name: 'Gary Halbert', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Gary-Halbert-removebg-preview.png' },
    { name: 'Robert Cialdini', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Robert+Cialdini-removebg-preview.png' },
    { name: 'Dan Kennedy', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/49ea87c868c8056976c1f5f231c786f2.png' },
    { name: 'Seth Godin', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/seth-godin-brian-bloom-xl.jpg' },
    { name: 'Rory Sutherland', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/6aab00d0-a2dc-11ed-bfe6-65e61c4b531d-Rory_Headshot_Colour_Change_16-removebg-preview.png' },
    { name: 'Hudson Leogrande', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/584271bU03giJ3-removebg-preview.png' },
    { name: 'Jensen Huang', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/NVIDIA-Jensen-Huang-removebg-preview.png' },
    { name: 'Eugene Schwartz', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/eugene-schwartz.webp' },
    { name: 'Casey Neistat', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Casey_Neistat-removebg-preview.png' },
    { name: 'Robert Greene', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Robert-Greene-profile-01-removebg-preview.png' },
    { name: 'Simon Sinek', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/MoS_SimonSinek_colorcutout.webp' },
    { name: 'Jeff Bezos', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/MV5BNWI4ZTJiZmUtZGI5MC00NTk4LTk2OTYtNDU3NTJiM2QxNzM0XkEyXkFqcGc_._V1_-removebg-preview.png' },
    { name: 'Elon Musk', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/elon_musk_royal_society-removebg-preview.png' },
    { name: 'Vilfredo Pareto', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/960px-Vilfredo_Pareto_1870s2-removebg-preview.png' },
    { name: 'Warren Buffett', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/warren-buffett-inc-2_535185_ug6kpf-removebg-preview.png' },
    { name: 'David Ogilvy', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/GettyImages-517368152-web_91453-removebg-preview.png' },
    { name: 'Daniel Kahneman', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Daniel+Kahneman+Headshot-removebg-preview.png' },
    { name: 'Nassim Taleb', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Nassim-Taleb-removebg-preview.png' },
    { name: 'Roberto Goizueta', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Roberto_Goizueta.jpg' },
    { name: 'Michael Porter', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Michael-Porter-Headshot-scaled-removebg-preview.png' },
    { name: 'Alfred North Whitehead', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/ANWhitehead.jpg' },
    { name: 'Sheena Iyengar', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/SheenaIyengar_2011S-embed-removebg-preview.png' },
    { name: 'Gerald Zaltman', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/A17bSZoP8VL._SY450_CR112,0,450,450_.jpg' },
    { name: 'Ellen Langer', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/tempImageaKlJMv-removebg-preview.png' },
    { name: 'Albert Bandura', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Albert-Bandura.jpg' },
    { name: 'Jason Fladlien', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Jason_RB-30-no-BG.png' },
  ],
  brands: [
    { name: 'Instagram', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Instagram_logo_2016.svg.webp' },
    { name: 'DataDrew', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Geo%20Convert%20(18).jpg' },
    { name: 'TikTok', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/tiktok-app-icon-social-media-logo_277909-647.png' },
    { name: 'YouTube', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/YouTube_Logo_2017.svg.png' },
    { name: 'HyperSKU', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/HyperSKU-Logo-scaled.png' },
    { name: 'Stripe', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/free-stripe-logo-icon-svg-download-png-498440.webp' },
    { name: 'Lululemon', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/letter-a-1.jpg' },
    { name: 'TxtCart', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CLyh0p-rhJADEAE=.webp' },
    { name: 'ReConvert', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CIuoqfrDj_sCEAE=.webp' },
    { name: 'MasterCard', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Mastercard-Logo.png' },
    { name: 'Klaviyo', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Klaviyo-primary-logo-charcoal.svg.png' },
    { name: 'Hims', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/HIMS-797814ee.png' },
    { name: 'Framer', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/framer-1.svg' },
    { name: 'Triple Whale', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/67e3c7b0162e6313d4bdc706_Logo%20Icon.webp' },
    { name: 'Grapevine Surveys', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CP2bp6uL9YoDEAE=.webp' },
    { name: 'Alibaba', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Alibaba-Logo-3.png' },
    { name: 'AutoDS', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/our-supported-center-desktop-1.svg' },
    { name: 'Honey', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/unnamed%20(1).png' },
    { name: 'Pepsi', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Pepsi_2023.svg' },
    { name: 'Canva', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/dfb96cc174513093cd6ed61489ccb750.svg' },
    { name: 'Cheesecake Factory', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Cheesecake-Factory-Logo.jpg' },
    { name: 'Peloton', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Peloton-logo.png' },
    { name: 'Dollar Shave Club', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Dollar-Shave-Club.webp' },
    { name: 'Adidas', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Adidas_Logo.svg.png' },
    { name: 'Netflix', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Netflix_2015_logo.svg.png' },
    { name: 'PayPal', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Color-Paypal-Logo.jpg' },
    { name: 'Lamborghini', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Lamborghini-Logo-1998-present-700x394-1.png' },
    { name: 'Rolls-Royce', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Rolls-Royce-Logo.jpg' },
    { name: 'De Beers', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/De-Beers-Logo-before-2018.png' },
    { name: 'Geo Convert', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Geo%20Convert%20(19).jpg' },
    { name: 'KeepCart', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/CLnu1ve1jY0DEAE=.webp' },
    { name: 'Headspace', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/headspace-1.jpg' },
    { name: 'Supreme', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Supreme-Logo.jpg' },
    { name: 'Pizza Hut', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Pizza_Hut_international_logo_2014.svg.png' },
    { name: 'Porsche', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Porsche_Logo%20(1).svg' },
    { name: 'BMW', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/BMW.svg' },
    { name: 'Affirm', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Affirm_logo.svg.png' },
    { name: 'Hyros', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Helping-Marketers-Leverage-Data-with-HYROS-1024x538.png' },
    { name: 'Klarna', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Klarna_Payment_Badge.svg.png' },
    { name: 'Afterpay', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/after%20pay%20(1).png' },
    { name: 'LVMH', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/LVMH-black.png' },
    { name: 'Zara', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/2019-to-Present-Zara-logo-design-1024x538.webp' },
    { name: 'Unilever', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Unilever.svg' },
    { name: 'Ritual', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/ritual-logo.svg' },
    { name: 'H&M', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/H&M-Logo.svg.png' },
    { name: 'Chanel', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Chanel-logo.png' },
    { name: 'Ferrari', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Scuderia_Ferrari_Logo.svg.png' },
    { name: 'Lexus', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Lexus-cars-logo-emblem.jpg' },
    { name: 'Lucid', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Lucid-Motors-Logo.jpg' },
    { name: 'Visa', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Visa_Inc._logo.svg.png' },
    { name: 'American Express', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/American-Express-logo.png' },
    { name: 'Slack', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Slack_Technologies-Logo.wine.png' },
    { name: 'Allbirds', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Allbirds_logo.svg.png' },
    { name: 'BigCommerce', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Bc-logo-dark.svg.png' },
    { name: 'WooCommerce', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/WooCommerce_logo_(2015).png' },
    { name: 'Squarespace', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Squarespace-Logo.png' },
    { name: 'REI', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/REI_logo.svg.png' },
    { name: 'Subway', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Subway%20Choicemark_thumbnail.png' },
  ],
  monkeys: [
    { name: 'lightbulb-moment', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_having_a_lightbulb_moment_pure_100_white_backg_bd88fbc3-b501-446f-a37f-09b80e6320fc_3.mp4' },
    { name: 'connecting-dots', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_connecting_the_dots_drawing_lines_between_poin_66a88945-b2d0-442a-b48e-0c20060e3fcf_2.mp4' },
    { name: 'reading-intently', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_reading_intently_with_glasses_book_in_hand_--a_fae4f829-ea0b-4a5a-8fb0-3de395a6b6ee_2.mp4' },
    { name: 'taking-notes', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_taking_notes_furiously_pencil_flying_across_pa_05ef64dd-3e45-44ef-a3d0-9c5ad185cb8a_3.mp4' },
    { name: 'studying-data', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_studying_the_data_looking_at_chartsgraphs_100__02345be1-0aec-48ba-a3c3-1b3e71cf1432_2.mp4' },
    { name: 'waving-red-flag', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_httpss.mj.runL4Kiyy-A1lI_He_is_waving_a_red_flag_100_c6c04ad4-c9e2-4a37-81cc-c7da0ca2b396_2.mp4' },
    { name: 'face-palming', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is..._face-palming_embarrassedfrustrated_100_pure_2ecf9cf3-57a5-44c8-8958-1ee07c06f4b2_3.mp4' },
    { name: 'shaking-head-no', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_shaking_his_head_no_disapproving_gesture_--ar__6571be48-3bd3-4ed5-ba27-8bdadb01795a_3.mp4' },
    { name: 'running-away-scared', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_running_away_scared_fleeing_pose_100_Pure_whit_71d839ad-15b2-4283-ae8d-021fdb7ccfb2_3.mp4' },
    { name: 'building-something', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_building_something_with_tools_constructing_100_52683f04-d09a-47c4-89a1-84b57476d150_2.mp4' },
    { name: 'typing-at-computer', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is..._typing_at_a_computer_focused_work_100_pure__5fc46f1f-5169-4325-a7d2-81aceeed3514_2.mp4' },
    { name: 'pointing-at-chart', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_pointing_at_a_chart_presentingexplaining_100_p_d3ddf2c8-5905-4952-b8cc-0eaed3e8b732_3.mp4' },
    { name: 'holding-magnifying-glass', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_holding_a_magnifying_glass_investigating_--ar__50d13799-7bb7-4f9d-bb20-51dab6df6ac3_2.mp4' },
    { name: 'climbing-ladder', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_climbing_a_ladder_progressgrowth_100_pure_whit_4fc6107a-c510-4afc-ac20-a4cf12e8180b_3.mp4' },
    { name: 'scratching-chin', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_scratching_his_chin_deep_in_thought_100_pure_w_9e857f88-67b4-4496-9988-57dd621c97fe_3.mp4' },
    { name: 'weighing-options', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_weighing_options_scales_in_hands_100_pure_whit_8cbe7780-615e-48f5-aafe-2184114c1b33_2.mp4' },
    { name: 'drawing-strategy', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_drawing_a_strategy_whiteboardplanning_100_pure_95302861-8c44-460f-bcd1-7faa302067c4_3.mp4' },
    { name: 'calculating-numbers', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_calculating_numbers_with_calculator_100_pure_w_b930553b-32c0-4367-bcc5-c1b2c51a9318_2.mp4' },
    { name: 'whispering-secret', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_whispering_a_secret_hand_cupped_to_mouth_--ar__972dd80b-da4e-481d-aedc-bbcfdfb88716_3.mp4' },
    { name: 'making-announcement', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_making_an_announcement_megaphoneloudspeaker_10_c6bff133-0cee-4c7d-9c1c-32035a52aa82_0.mp4' },
    { name: 'nodding-agreement', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_nodding_in_agreement_approving_nod_100_pure_wh_be253664-9147-4cef-ae06-aa315b9f0ff5_1.mp4' },
    { name: 'listening-carefully', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_listening_carefully_hand_cupped_to_ear_100_pur_01938e87-bc4d-4e54-8675-cf6bdcd739c2_3.mp4' },
    { name: 'sharing-with-friend', url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/aviv3255_He_is_sharing_with_a_friend_two_monkeys_one_explaini_b30f53d7-8f44-4b0a-8c27-ad2e11f08a64_1.mp4' },
  ],
};

// Helper to create directories
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

// Helper to get file extension from URL
function getExtension(url) {
  const urlPath = new URL(url).pathname;
  const ext = path.extname(urlPath).split('?')[0];
  return ext || '.png'; // Default to .png if no extension
}

// Helper to sanitize filename
function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
}

// Download a single file
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        downloadFile(redirectUrl, filepath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete partial file
      reject(err);
    });
  });
}

// Main download function
async function downloadAll() {
  console.log('========================================');
  console.log('   IMAGE DOWNLOAD SCRIPT');
  console.log('========================================\n');

  // Create directories
  ensureDir(OUTPUT_DIR);
  Object.values(DIRS).forEach(dir => ensureDir(dir));

  let totalDownloaded = 0;
  let totalFailed = 0;
  const failed = [];

  // Download entrepreneurs
  console.log('\n--- Downloading Entrepreneurs ---');
  for (const item of images.entrepreneurs) {
    const ext = getExtension(item.url);
    const filename = sanitizeFilename(item.name) + ext;
    const filepath = path.join(DIRS.entrepreneurs, filename);

    try {
      await downloadFile(item.url, filepath);
      console.log(`  ✓ ${item.name}`);
      totalDownloaded++;
    } catch (err) {
      console.log(`  ✗ ${item.name}: ${err.message}`);
      failed.push({ category: 'entrepreneurs', name: item.name, url: item.url, error: err.message });
      totalFailed++;
    }
  }

  // Download brands
  console.log('\n--- Downloading Brands ---');
  for (const item of images.brands) {
    const ext = getExtension(item.url);
    const filename = sanitizeFilename(item.name) + ext;
    const filepath = path.join(DIRS.brands, filename);

    try {
      await downloadFile(item.url, filepath);
      console.log(`  ✓ ${item.name}`);
      totalDownloaded++;
    } catch (err) {
      console.log(`  ✗ ${item.name}: ${err.message}`);
      failed.push({ category: 'brands', name: item.name, url: item.url, error: err.message });
      totalFailed++;
    }
  }

  // Download monkey videos
  console.log('\n--- Downloading Monkey Character Videos ---');
  for (const item of images.monkeys) {
    const ext = getExtension(item.url);
    const filename = sanitizeFilename(item.name) + ext;
    const filepath = path.join(DIRS.monkeys, filename);

    try {
      await downloadFile(item.url, filepath);
      console.log(`  ✓ ${item.name}`);
      totalDownloaded++;
    } catch (err) {
      console.log(`  ✗ ${item.name}: ${err.message}`);
      failed.push({ category: 'monkeys', name: item.name, url: item.url, error: err.message });
      totalFailed++;
    }
  }

  // Summary
  console.log('\n========================================');
  console.log('   DOWNLOAD COMPLETE');
  console.log('========================================');
  console.log(`Total downloaded: ${totalDownloaded}`);
  console.log(`Total failed: ${totalFailed}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);

  if (failed.length > 0) {
    console.log('\nFailed downloads:');
    failed.forEach(f => {
      console.log(`  - ${f.category}/${f.name}: ${f.error}`);
    });

    // Save failed list to file
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'failed-downloads.json'),
      JSON.stringify(failed, null, 2)
    );
  }

  // Count files
  const counts = {
    entrepreneurs: fs.readdirSync(DIRS.entrepreneurs).length,
    brands: fs.readdirSync(DIRS.brands).length,
    monkeys: fs.readdirSync(DIRS.monkeys).length,
  };

  console.log('\nFiles per category:');
  console.log(`  - Entrepreneurs: ${counts.entrepreneurs}`);
  console.log(`  - Brands: ${counts.brands}`);
  console.log(`  - Monkey Characters: ${counts.monkeys}`);
  console.log(`  - TOTAL: ${counts.entrepreneurs + counts.brands + counts.monkeys}`);
}

// Run
downloadAll().catch(console.error);
