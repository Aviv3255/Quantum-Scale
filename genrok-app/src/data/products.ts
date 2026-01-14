/**
 * Products Data
 * Dropshipping products organized by niche for the "Sell These Products" feature
 */

export type ProductNiche =
  | 'mens-fashion'
  | 'womens-fashion'
  | 'electronics'
  | 'home-garden'
  | 'beauty'
  | 'fitness'
  | 'pets'
  | 'kids'
  | 'automotive';

export interface Product {
  id: number;
  name: string;
  description: string;
  niche: ProductNiche;
  price: number;
  suggestedRetail: number;
  profit: number;
  imageUrl: string;
  aliexpressUrl?: string;
  trending?: boolean;
  rating?: number;
  orders?: number;
}

// Generate product image placeholders using reliable image sources
const getProductImage = (id: number, niche: ProductNiche): string => {
  // Use picsum.photos for reliable placeholder images
  const seed = id + niche.charCodeAt(0);
  return `https://picsum.photos/seed/${seed}/400/400`;
};

export const products: Product[] = [
  // Men's Fashion
  {
    id: 1,
    name: "Minimalist Leather Watch",
    description: "Sleek stainless steel with genuine leather band. Perfect for everyday wear.",
    niche: "mens-fashion",
    price: 12.50,
    suggestedRetail: 49.99,
    profit: 37.49,
    imageUrl: getProductImage(1, "mens-fashion"),
    trending: true,
    rating: 4.8,
    orders: 15420
  },
  {
    id: 2,
    name: "Premium Sunglasses - Polarized",
    description: "UV400 protection with metal frame. Classic aviator style.",
    niche: "mens-fashion",
    price: 8.90,
    suggestedRetail: 39.99,
    profit: 31.09,
    imageUrl: getProductImage(2, "mens-fashion"),
    trending: true,
    rating: 4.6,
    orders: 12350
  },
  {
    id: 3,
    name: "Canvas Crossbody Bag",
    description: "Vintage style messenger bag with adjustable strap. Multiple pockets.",
    niche: "mens-fashion",
    price: 15.20,
    suggestedRetail: 54.99,
    profit: 39.79,
    imageUrl: getProductImage(3, "mens-fashion"),
    rating: 4.5,
    orders: 8900
  },
  {
    id: 4,
    name: "Minimalist Wallet - RFID Blocking",
    description: "Slim design with carbon fiber texture. Holds 8 cards + cash.",
    niche: "mens-fashion",
    price: 6.50,
    suggestedRetail: 29.99,
    profit: 23.49,
    imageUrl: getProductImage(4, "mens-fashion"),
    trending: true,
    rating: 4.7,
    orders: 22100
  },
  {
    id: 5,
    name: "Stainless Steel Bracelet",
    description: "Heavy-duty chain link design. Adjustable clasp.",
    niche: "mens-fashion",
    price: 4.80,
    suggestedRetail: 24.99,
    profit: 20.19,
    imageUrl: getProductImage(5, "mens-fashion"),
    rating: 4.4,
    orders: 6780
  },
  {
    id: 6,
    name: "Athletic Compression Socks",
    description: "Anti-fatigue design. Perfect for sports and daily wear. 3-pack.",
    niche: "mens-fashion",
    price: 5.20,
    suggestedRetail: 19.99,
    profit: 14.79,
    imageUrl: getProductImage(6, "mens-fashion"),
    rating: 4.6,
    orders: 18500
  },
  {
    id: 7,
    name: "Tactical Belt - Heavy Duty",
    description: "Nylon webbing with quick-release buckle. Adjustable fit.",
    niche: "mens-fashion",
    price: 7.80,
    suggestedRetail: 34.99,
    profit: 27.19,
    imageUrl: getProductImage(7, "mens-fashion"),
    rating: 4.5,
    orders: 9200
  },
  {
    id: 8,
    name: "Beanie Hat - Wireless Bluetooth",
    description: "Built-in speakers and mic. Warm knit design.",
    niche: "mens-fashion",
    price: 11.90,
    suggestedRetail: 44.99,
    profit: 33.09,
    imageUrl: getProductImage(8, "mens-fashion"),
    trending: true,
    rating: 4.3,
    orders: 14300
  },

  // Women's Fashion
  {
    id: 9,
    name: "Rose Gold Jewelry Set",
    description: "Elegant necklace and earring combo. Hypoallergenic materials.",
    niche: "womens-fashion",
    price: 8.50,
    suggestedRetail: 42.99,
    profit: 34.49,
    imageUrl: getProductImage(9, "womens-fashion"),
    trending: true,
    rating: 4.8,
    orders: 28500
  },
  {
    id: 10,
    name: "Silk Hair Scrunchies - 6 Pack",
    description: "Gentle on hair, prevents breakage. Assorted colors.",
    niche: "womens-fashion",
    price: 3.20,
    suggestedRetail: 18.99,
    profit: 15.79,
    imageUrl: getProductImage(10, "womens-fashion"),
    rating: 4.7,
    orders: 35200
  },
  {
    id: 11,
    name: "Designer Tote Bag",
    description: "Faux leather with gold hardware. Spacious interior with pockets.",
    niche: "womens-fashion",
    price: 18.90,
    suggestedRetail: 69.99,
    profit: 51.09,
    imageUrl: getProductImage(11, "womens-fashion"),
    trending: true,
    rating: 4.6,
    orders: 12800
  },
  {
    id: 12,
    name: "Crystal Drop Earrings",
    description: "Sparkling Swarovski-style crystals. Perfect for special occasions.",
    niche: "womens-fashion",
    price: 5.80,
    suggestedRetail: 32.99,
    profit: 27.19,
    imageUrl: getProductImage(12, "womens-fashion"),
    rating: 4.5,
    orders: 9600
  },
  {
    id: 13,
    name: "Cashmere-Feel Scarf",
    description: "Ultra-soft acrylic blend. Oversized wrap style.",
    niche: "womens-fashion",
    price: 9.50,
    suggestedRetail: 39.99,
    profit: 30.49,
    imageUrl: getProductImage(13, "womens-fashion"),
    rating: 4.4,
    orders: 7400
  },
  {
    id: 14,
    name: "Minimalist Watch - Women's",
    description: "Delicate mesh band with mother-of-pearl face.",
    niche: "womens-fashion",
    price: 14.20,
    suggestedRetail: 54.99,
    profit: 40.79,
    imageUrl: getProductImage(14, "womens-fashion"),
    trending: true,
    rating: 4.7,
    orders: 18900
  },
  {
    id: 15,
    name: "Leather Crossbody Purse",
    description: "Compact design with adjustable strap. Multiple compartments.",
    niche: "womens-fashion",
    price: 12.80,
    suggestedRetail: 49.99,
    profit: 37.19,
    imageUrl: getProductImage(15, "womens-fashion"),
    rating: 4.6,
    orders: 15600
  },
  {
    id: 16,
    name: "Pearl Hair Clips - Set of 10",
    description: "Elegant baroque pearls on gold clips. Various sizes.",
    niche: "womens-fashion",
    price: 4.50,
    suggestedRetail: 24.99,
    profit: 20.49,
    imageUrl: getProductImage(16, "womens-fashion"),
    rating: 4.5,
    orders: 21300
  },

  // Electronics
  {
    id: 17,
    name: "Wireless Earbuds Pro",
    description: "Active noise cancellation. 24hr battery with case.",
    niche: "electronics",
    price: 18.50,
    suggestedRetail: 79.99,
    profit: 61.49,
    imageUrl: getProductImage(17, "electronics"),
    trending: true,
    rating: 4.5,
    orders: 45200
  },
  {
    id: 18,
    name: "Smart Watch Fitness Tracker",
    description: "Heart rate, sleep tracking, notifications. IP68 waterproof.",
    niche: "electronics",
    price: 22.90,
    suggestedRetail: 89.99,
    profit: 67.09,
    imageUrl: getProductImage(18, "electronics"),
    trending: true,
    rating: 4.4,
    orders: 32100
  },
  {
    id: 19,
    name: "Phone Camera Lens Kit",
    description: "Wide angle, macro, fisheye lenses. Universal clip mount.",
    niche: "electronics",
    price: 8.90,
    suggestedRetail: 34.99,
    profit: 26.09,
    imageUrl: getProductImage(19, "electronics"),
    rating: 4.3,
    orders: 18700
  },
  {
    id: 20,
    name: "RGB Gaming Mouse",
    description: "12000 DPI sensor. 7 programmable buttons. Ergonomic design.",
    niche: "electronics",
    price: 11.50,
    suggestedRetail: 44.99,
    profit: 33.49,
    imageUrl: getProductImage(20, "electronics"),
    rating: 4.6,
    orders: 25800
  },
  {
    id: 21,
    name: "Portable Bluetooth Speaker",
    description: "360-degree sound. IPX7 waterproof. 12hr battery.",
    niche: "electronics",
    price: 15.80,
    suggestedRetail: 59.99,
    profit: 44.19,
    imageUrl: getProductImage(21, "electronics"),
    trending: true,
    rating: 4.5,
    orders: 28400
  },
  {
    id: 22,
    name: "Wireless Charging Pad",
    description: "15W fast charging. Compatible with all Qi devices.",
    niche: "electronics",
    price: 6.90,
    suggestedRetail: 29.99,
    profit: 23.09,
    imageUrl: getProductImage(22, "electronics"),
    rating: 4.4,
    orders: 38900
  },
  {
    id: 23,
    name: "Mini Projector HD",
    description: "1080p supported. 100\" display. Built-in speaker.",
    niche: "electronics",
    price: 48.50,
    suggestedRetail: 149.99,
    profit: 101.49,
    imageUrl: getProductImage(23, "electronics"),
    trending: true,
    rating: 4.2,
    orders: 12600
  },
  {
    id: 24,
    name: "LED Desk Lamp - Wireless Charger",
    description: "Adjustable brightness. Built-in Qi charging pad.",
    niche: "electronics",
    price: 19.90,
    suggestedRetail: 69.99,
    profit: 50.09,
    imageUrl: getProductImage(24, "electronics"),
    rating: 4.6,
    orders: 15300
  },

  // Home & Garden
  {
    id: 25,
    name: "LED Strip Lights - Smart WiFi",
    description: "16 million colors. Voice control compatible. 32ft length.",
    niche: "home-garden",
    price: 12.50,
    suggestedRetail: 49.99,
    profit: 37.49,
    imageUrl: getProductImage(25, "home-garden"),
    trending: true,
    rating: 4.6,
    orders: 52300
  },
  {
    id: 26,
    name: "Aromatherapy Diffuser",
    description: "Ultrasonic mist. Color-changing LED. Auto shut-off.",
    niche: "home-garden",
    price: 11.80,
    suggestedRetail: 44.99,
    profit: 33.19,
    imageUrl: getProductImage(26, "home-garden"),
    trending: true,
    rating: 4.5,
    orders: 34200
  },
  {
    id: 27,
    name: "Smart Plug - WiFi Outlet",
    description: "Voice control. Schedule and timer. Energy monitoring.",
    niche: "home-garden",
    price: 5.90,
    suggestedRetail: 24.99,
    profit: 19.09,
    imageUrl: getProductImage(27, "home-garden"),
    rating: 4.4,
    orders: 41500
  },
  {
    id: 28,
    name: "Moon Lamp 3D Printed",
    description: "Touch control. 16 colors. Realistic moon texture.",
    niche: "home-garden",
    price: 14.50,
    suggestedRetail: 54.99,
    profit: 40.49,
    imageUrl: getProductImage(28, "home-garden"),
    trending: true,
    rating: 4.7,
    orders: 28900
  },
  {
    id: 29,
    name: "Self-Watering Plant Pots - 3 Pack",
    description: "Built-in water reservoir. Modern design. Various sizes.",
    niche: "home-garden",
    price: 8.90,
    suggestedRetail: 36.99,
    profit: 28.09,
    imageUrl: getProductImage(29, "home-garden"),
    rating: 4.3,
    orders: 12800
  },
  {
    id: 30,
    name: "Galaxy Projector Night Light",
    description: "Starry sky effect. Bluetooth speaker. Timer function.",
    niche: "home-garden",
    price: 16.80,
    suggestedRetail: 59.99,
    profit: 43.19,
    imageUrl: getProductImage(30, "home-garden"),
    trending: true,
    rating: 4.6,
    orders: 38700
  },
  {
    id: 31,
    name: "Magnetic Knife Holder - Wall Mount",
    description: "Strong magnetic strip. Stainless steel. 16\" length.",
    niche: "home-garden",
    price: 7.50,
    suggestedRetail: 29.99,
    profit: 22.49,
    imageUrl: getProductImage(31, "home-garden"),
    rating: 4.5,
    orders: 18400
  },
  {
    id: 32,
    name: "Bamboo Organizer Set",
    description: "Drawer dividers and storage boxes. Eco-friendly.",
    niche: "home-garden",
    price: 12.90,
    suggestedRetail: 44.99,
    profit: 32.09,
    imageUrl: getProductImage(32, "home-garden"),
    rating: 4.4,
    orders: 14200
  },

  // Beauty
  {
    id: 33,
    name: "LED Face Mask - Light Therapy",
    description: "7 color therapy modes. Anti-aging and acne treatment.",
    niche: "beauty",
    price: 24.90,
    suggestedRetail: 89.99,
    profit: 65.09,
    imageUrl: getProductImage(33, "beauty"),
    trending: true,
    rating: 4.4,
    orders: 21500
  },
  {
    id: 34,
    name: "Jade Roller & Gua Sha Set",
    description: "Natural jade stone. Reduces puffiness and wrinkles.",
    niche: "beauty",
    price: 5.50,
    suggestedRetail: 29.99,
    profit: 24.49,
    imageUrl: getProductImage(34, "beauty"),
    trending: true,
    rating: 4.6,
    orders: 45800
  },
  {
    id: 35,
    name: "Electric Makeup Brush Cleaner",
    description: "Automatic spinner. Dries in seconds. USB rechargeable.",
    niche: "beauty",
    price: 9.80,
    suggestedRetail: 39.99,
    profit: 30.19,
    imageUrl: getProductImage(35, "beauty"),
    rating: 4.3,
    orders: 16700
  },
  {
    id: 36,
    name: "Hair Straightener Brush",
    description: "Ionic technology. 5 heat settings. Auto shut-off.",
    niche: "beauty",
    price: 15.90,
    suggestedRetail: 54.99,
    profit: 39.09,
    imageUrl: getProductImage(36, "beauty"),
    trending: true,
    rating: 4.5,
    orders: 28300
  },
  {
    id: 37,
    name: "Magnetic Eyelashes Kit",
    description: "Reusable lashes with magnetic liner. 5 pairs.",
    niche: "beauty",
    price: 6.80,
    suggestedRetail: 32.99,
    profit: 26.19,
    imageUrl: getProductImage(37, "beauty"),
    rating: 4.2,
    orders: 32100
  },
  {
    id: 38,
    name: "Ice Roller for Face",
    description: "Reduces puffiness and redness. Stainless steel head.",
    niche: "beauty",
    price: 4.90,
    suggestedRetail: 24.99,
    profit: 20.09,
    imageUrl: getProductImage(38, "beauty"),
    rating: 4.5,
    orders: 27600
  },
  {
    id: 39,
    name: "Silicone Makeup Sponge Set",
    description: "Washable and reusable. No product waste. 4 shapes.",
    niche: "beauty",
    price: 3.50,
    suggestedRetail: 18.99,
    profit: 15.49,
    imageUrl: getProductImage(39, "beauty"),
    rating: 4.3,
    orders: 38400
  },
  {
    id: 40,
    name: "LED Vanity Mirror - Tabletop",
    description: "Touch dimmer. 180-degree rotation. USB powered.",
    niche: "beauty",
    price: 13.50,
    suggestedRetail: 49.99,
    profit: 36.49,
    imageUrl: getProductImage(40, "beauty"),
    rating: 4.6,
    orders: 19800
  },

  // Fitness
  {
    id: 41,
    name: "Resistance Bands Set - 5 Levels",
    description: "Natural latex. Door anchor and handles included.",
    niche: "fitness",
    price: 8.90,
    suggestedRetail: 34.99,
    profit: 26.09,
    imageUrl: getProductImage(41, "fitness"),
    trending: true,
    rating: 4.7,
    orders: 58200
  },
  {
    id: 42,
    name: "Adjustable Jump Rope - Weighted",
    description: "Ball bearing system. Memory foam handles. Counter display.",
    niche: "fitness",
    price: 7.50,
    suggestedRetail: 29.99,
    profit: 22.49,
    imageUrl: getProductImage(42, "fitness"),
    rating: 4.5,
    orders: 34500
  },
  {
    id: 43,
    name: "Massage Gun - Percussion",
    description: "6 heads. 30 speed levels. 6hr battery life.",
    niche: "fitness",
    price: 32.50,
    suggestedRetail: 119.99,
    profit: 87.49,
    imageUrl: getProductImage(43, "fitness"),
    trending: true,
    rating: 4.6,
    orders: 25800
  },
  {
    id: 44,
    name: "Yoga Mat - Extra Thick",
    description: "Non-slip surface. 10mm cushioning. Carrying strap.",
    niche: "fitness",
    price: 11.90,
    suggestedRetail: 44.99,
    profit: 33.09,
    imageUrl: getProductImage(44, "fitness"),
    rating: 4.5,
    orders: 42300
  },
  {
    id: 45,
    name: "Ab Roller Wheel - Core Trainer",
    description: "Ergonomic handles. Knee pad included. Dual wheels.",
    niche: "fitness",
    price: 6.80,
    suggestedRetail: 27.99,
    profit: 21.19,
    imageUrl: getProductImage(45, "fitness"),
    rating: 4.4,
    orders: 28700
  },
  {
    id: 46,
    name: "Foam Roller - Muscle Recovery",
    description: "High-density EVA foam. 18\" length. Grid texture.",
    niche: "fitness",
    price: 9.50,
    suggestedRetail: 36.99,
    profit: 27.49,
    imageUrl: getProductImage(46, "fitness"),
    rating: 4.6,
    orders: 31200
  },
  {
    id: 47,
    name: "Smart Water Bottle - LED Reminder",
    description: "Tracks water intake. Glows to remind you to drink.",
    niche: "fitness",
    price: 12.80,
    suggestedRetail: 44.99,
    profit: 32.19,
    imageUrl: getProductImage(47, "fitness"),
    trending: true,
    rating: 4.3,
    orders: 19500
  },
  {
    id: 48,
    name: "Fitness Gloves - Weightlifting",
    description: "Full palm protection. Wrist support. Breathable mesh.",
    niche: "fitness",
    price: 5.90,
    suggestedRetail: 24.99,
    profit: 19.09,
    imageUrl: getProductImage(48, "fitness"),
    rating: 4.4,
    orders: 22800
  },

  // Pets
  {
    id: 49,
    name: "Pet Water Fountain - Automatic",
    description: "2L capacity. Triple filtration. Ultra quiet.",
    niche: "pets",
    price: 14.90,
    suggestedRetail: 49.99,
    profit: 35.09,
    imageUrl: getProductImage(49, "pets"),
    trending: true,
    rating: 4.6,
    orders: 28400
  },
  {
    id: 50,
    name: "Self-Cleaning Slicker Brush",
    description: "One-click hair removal. Gentle on skin. All coat types.",
    niche: "pets",
    price: 6.50,
    suggestedRetail: 26.99,
    profit: 20.49,
    imageUrl: getProductImage(50, "pets"),
    trending: true,
    rating: 4.7,
    orders: 45200
  },
  {
    id: 51,
    name: "Interactive Cat Toy - Laser",
    description: "Automatic movement. USB rechargeable. Timer function.",
    niche: "pets",
    price: 9.80,
    suggestedRetail: 34.99,
    profit: 25.19,
    imageUrl: getProductImage(51, "pets"),
    rating: 4.4,
    orders: 21800
  },
  {
    id: 52,
    name: "Dog Training Collar - No Shock",
    description: "Vibration and beep modes. Remote control. Waterproof.",
    niche: "pets",
    price: 18.50,
    suggestedRetail: 64.99,
    profit: 46.49,
    imageUrl: getProductImage(52, "pets"),
    rating: 4.3,
    orders: 15600
  },
  {
    id: 53,
    name: "Pet Carrier Backpack",
    description: "Breathable mesh. Airline approved. Up to 15lbs.",
    niche: "pets",
    price: 22.90,
    suggestedRetail: 74.99,
    profit: 52.09,
    imageUrl: getProductImage(53, "pets"),
    trending: true,
    rating: 4.5,
    orders: 18900
  },
  {
    id: 54,
    name: "Automatic Pet Feeder",
    description: "Programmable. 5L capacity. Voice recording.",
    niche: "pets",
    price: 28.50,
    suggestedRetail: 89.99,
    profit: 61.49,
    imageUrl: getProductImage(54, "pets"),
    rating: 4.4,
    orders: 12400
  },
  {
    id: 55,
    name: "Dog Poop Bag Dispenser - LED",
    description: "Built-in flashlight. Includes 15 rolls. Leak-proof bags.",
    niche: "pets",
    price: 5.80,
    suggestedRetail: 22.99,
    profit: 17.19,
    imageUrl: getProductImage(55, "pets"),
    rating: 4.5,
    orders: 34200
  },
  {
    id: 56,
    name: "Cat Window Hammock",
    description: "Strong suction cups. Holds up to 40lbs. Easy install.",
    niche: "pets",
    price: 11.50,
    suggestedRetail: 39.99,
    profit: 28.49,
    imageUrl: getProductImage(56, "pets"),
    rating: 4.6,
    orders: 26500
  },

  // Kids
  {
    id: 57,
    name: "Magnetic Tiles Building Set",
    description: "102 pieces. Educational STEM toy. Various shapes.",
    niche: "kids",
    price: 18.90,
    suggestedRetail: 59.99,
    profit: 41.09,
    imageUrl: getProductImage(57, "kids"),
    trending: true,
    rating: 4.8,
    orders: 38500
  },
  {
    id: 58,
    name: "Kids Smart Watch - GPS",
    description: "SOS button. Two-way calling. Geofencing.",
    niche: "kids",
    price: 24.50,
    suggestedRetail: 79.99,
    profit: 55.49,
    imageUrl: getProductImage(58, "kids"),
    trending: true,
    rating: 4.5,
    orders: 22300
  },
  {
    id: 59,
    name: "Water Drawing Mat",
    description: "No mess painting. Reusable. Includes pens and stamps.",
    niche: "kids",
    price: 8.90,
    suggestedRetail: 32.99,
    profit: 24.09,
    imageUrl: getProductImage(59, "kids"),
    rating: 4.6,
    orders: 29800
  },
  {
    id: 60,
    name: "Kids Camera - Instant Print",
    description: "Thermal printing. 32GB SD card. Fun filters.",
    niche: "kids",
    price: 22.80,
    suggestedRetail: 69.99,
    profit: 47.19,
    imageUrl: getProductImage(60, "kids"),
    trending: true,
    rating: 4.4,
    orders: 18600
  },
  {
    id: 61,
    name: "Dinosaur Egg Dig Kit",
    description: "12 eggs with surprises. Tools included. Educational.",
    niche: "kids",
    price: 9.50,
    suggestedRetail: 34.99,
    profit: 25.49,
    imageUrl: getProductImage(61, "kids"),
    rating: 4.7,
    orders: 25400
  },
  {
    id: 62,
    name: "Balance Board - Kids Training",
    description: "Develops coordination. Non-slip surface. Up to 150lbs.",
    niche: "kids",
    price: 14.80,
    suggestedRetail: 49.99,
    profit: 35.19,
    imageUrl: getProductImage(62, "kids"),
    rating: 4.5,
    orders: 16200
  },
  {
    id: 63,
    name: "Night Light Projector - Stories",
    description: "Projects story slides. 8 fairy tales. Auto timer.",
    niche: "kids",
    price: 12.50,
    suggestedRetail: 44.99,
    profit: 32.49,
    imageUrl: getProductImage(63, "kids"),
    rating: 4.6,
    orders: 21700
  },
  {
    id: 64,
    name: "Kids Tablet Stand - Adjustable",
    description: "360-degree rotation. Silicone grips. Universal fit.",
    niche: "kids",
    price: 7.90,
    suggestedRetail: 28.99,
    profit: 21.09,
    imageUrl: getProductImage(64, "kids"),
    rating: 4.4,
    orders: 19300
  },

  // Automotive
  {
    id: 65,
    name: "Dash Cam - Dual Camera",
    description: "Front and rear recording. Night vision. Loop recording.",
    niche: "automotive",
    price: 28.90,
    suggestedRetail: 89.99,
    profit: 61.09,
    imageUrl: getProductImage(65, "automotive"),
    trending: true,
    rating: 4.5,
    orders: 24800
  },
  {
    id: 66,
    name: "Car Phone Mount - Magnetic",
    description: "360-degree rotation. Air vent clip. Strong magnets.",
    niche: "automotive",
    price: 4.50,
    suggestedRetail: 19.99,
    profit: 15.49,
    imageUrl: getProductImage(66, "automotive"),
    rating: 4.6,
    orders: 52300
  },
  {
    id: 67,
    name: "Tire Pressure Monitor - Wireless",
    description: "Real-time display. 4 sensors. Solar powered.",
    niche: "automotive",
    price: 22.50,
    suggestedRetail: 74.99,
    profit: 52.49,
    imageUrl: getProductImage(67, "automotive"),
    trending: true,
    rating: 4.4,
    orders: 18700
  },
  {
    id: 68,
    name: "Car Vacuum - Cordless",
    description: "120W suction. LED light. HEPA filter.",
    niche: "automotive",
    price: 18.80,
    suggestedRetail: 59.99,
    profit: 41.19,
    imageUrl: getProductImage(68, "automotive"),
    rating: 4.5,
    orders: 28400
  },
  {
    id: 69,
    name: "LED Interior Lights - Bluetooth",
    description: "App control. 48 LEDs. Music sync mode.",
    niche: "automotive",
    price: 11.90,
    suggestedRetail: 42.99,
    profit: 31.09,
    imageUrl: getProductImage(69, "automotive"),
    trending: true,
    rating: 4.6,
    orders: 35600
  },
  {
    id: 70,
    name: "Car Seat Gap Filler",
    description: "Prevents items from falling. Fits all cars. 2-pack.",
    niche: "automotive",
    price: 5.80,
    suggestedRetail: 24.99,
    profit: 19.19,
    imageUrl: getProductImage(70, "automotive"),
    rating: 4.3,
    orders: 42100
  },
  {
    id: 71,
    name: "Blind Spot Mirror - Adjustable",
    description: "Wide angle view. Easy stick-on install. 2-pack.",
    niche: "automotive",
    price: 3.90,
    suggestedRetail: 16.99,
    profit: 13.09,
    imageUrl: getProductImage(71, "automotive"),
    rating: 4.5,
    orders: 38900
  },
  {
    id: 72,
    name: "Portable Jump Starter",
    description: "12000mAh. Starts up to 6.0L engines. USB charging.",
    niche: "automotive",
    price: 35.90,
    suggestedRetail: 99.99,
    profit: 64.09,
    imageUrl: getProductImage(72, "automotive"),
    trending: true,
    rating: 4.7,
    orders: 15800
  },
];

// Helper function to get products by niche
export function getProductsByNiche(niche: ProductNiche): Product[] {
  return products.filter(p => p.niche === niche);
}

// Helper function to get trending products
export function getTrendingProducts(limit?: number): Product[] {
  const trending = products.filter(p => p.trending);
  return limit ? trending.slice(0, limit) : trending;
}

// Helper function to get random products (for daily suggestions)
export function getRandomProducts(count: number, niche?: ProductNiche): Product[] {
  let pool = niche ? getProductsByNiche(niche) : products;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Niche display names
export const nicheLabels: Record<ProductNiche, string> = {
  'mens-fashion': "Men's Fashion",
  'womens-fashion': "Women's Fashion",
  'electronics': 'Electronics',
  'home-garden': 'Home & Garden',
  'beauty': 'Beauty',
  'fitness': 'Fitness',
  'pets': 'Pets',
  'kids': 'Kids',
  'automotive': 'Automotive',
};

// All available niches
export const allNiches: ProductNiche[] = [
  'mens-fashion',
  'womens-fashion',
  'electronics',
  'home-garden',
  'beauty',
  'fitness',
  'pets',
  'kids',
  'automotive',
];
