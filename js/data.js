/**
 * B2B Hospitality Resource Exchange - Central Data Layer
 * Universal Browser & Node module: Live Location & Store Schema + Mock Assets & Bookings
 */

const STORE_HUBS = [
  {
    id: "hub-1",
    name: "Grand Palace Central Hub",
    city: "Mumbai South",
    address: "Apollo Bunder, Colaba, Mumbai 400001",
    coordinates: { lat: 18.9220, lng: 72.8347 },
    contact: "+91 22 6665 3366",
    manager: "Vikram Rathore"
  },
  {
    id: "hub-2",
    name: "BKC Commercial Depot",
    city: "Bandra Kurla Complex",
    address: "G Block, BKC, Bandra East, Mumbai 400051",
    coordinates: { lat: 19.0674, lng: 72.8687 },
    contact: "+91 22 4008 1200",
    manager: "Ananya Sharma"
  },
  {
    id: "hub-3",
    name: "Andheri North Logistics Base",
    city: "Andheri East",
    address: "MIDC Industrial Area, Andheri East, Mumbai 400093",
    coordinates: { lat: 19.1136, lng: 72.8697 },
    contact: "+91 22 2830 5544",
    manager: "Rajesh Kulkarni"
  },
  {
    id: "hub-4",
    name: "Thane Regional Distribution Center",
    city: "Thane / Navi Mumbai",
    address: "Wagle Industrial Estate, Thane West 400604",
    coordinates: { lat: 19.1998, lng: 72.9554 },
    contact: "+91 22 2582 8900",
    manager: "Sunil Deshmukh"
  },
  {
    id: "hub-5",
    name: "Vashi Harbor Hospitality Depot",
    city: "Navi Mumbai",
    address: "Sector 19A, APMC Market Road, Vashi 400703",
    coordinates: { lat: 19.0771, lng: 72.9986 },
    contact: "+91 22 2789 4411",
    manager: "Meera Nair"
  }
];

const CATEGORIES = [
  { id: "all", label: "All Categories", icon: "grid" },
  { id: "Kitchens", label: "Kitchen Equipment", icon: "utensils" },
  { id: "Banquets", label: "Banquet & Staging", icon: "champagne-glasses" },
  { id: "Vehicles", label: "Logistics & Vans", icon: "truck" },
  { id: "Furniture", label: "Furniture & Decor", icon: "chair" },
  { id: "AudioVisual", label: "Sound & Lighting", icon: "speaker" }
];

const BUSINESS_TYPES = [
  "Hotel & Resort",
  "Catering Enterprise",
  "Banquet Venue",
  "Event Planner & Production",
  "Cloud Kitchen Network",
  "Institutional Kitchen"
];

const INITIAL_INVENTORY = [
  {
    id: "AST-101",
    title: "Rational iCombi Pro 10-Grid Commercial Combi Oven",
    category: "Kitchens",
    description: "Multi-functional smart combi steamer for high-volume banqueting. 3-phase 415V power, integrated steam injection, touch controls, and automated self-clean cycle.",
    storeName: "BKC Commercial Depot",
    city: "Bandra Kurla Complex",
    coordinates: { lat: 19.0674, lng: 72.8687 },
    fulfillmentType: "Direct Site Delivery",
    pricePerDay: 4800,
    deposit: 15000,
    specs: "10x 1/1 GN Trays • 18.9 kW • 415V 3-Phase • HACCP Compliant",
    status: "Available",
    provider: {
      name: "Oberoi Catering Systems",
      rating: 4.9,
      verified: true,
      dealsCompleted: 84
    },
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "AST-102",
    title: "Luxury Crystal Chandelier & Truss Rigging Setup",
    category: "Banquets",
    description: "Complete modular aluminum box-truss square (12m x 12m) rigged with 8 Bohemian crystal chandeliers and motorized chain-hoists for gala balls.",
    storeName: "Grand Palace Central Hub",
    city: "Mumbai South",
    coordinates: { lat: 18.9220, lng: 72.8347 },
    fulfillmentType: "Direct Site Delivery",
    pricePerDay: 18500,
    deposit: 35000,
    specs: "12x12m Truss • 8 Chandeliers • 4x D8+ Motors • Certified Rigging Crew Included",
    status: "Available",
    provider: {
      name: "Grand Regal Banquets",
      rating: 4.95,
      verified: true,
      dealsCompleted: 112
    },
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "AST-103",
    title: "Tata Winger Refrigerated 2.5-Ton Food Logistics Van",
    category: "Vehicles",
    description: "Multi-temperature cold chain refrigerated transit vehicle. Temp range -18°C to +4°C with digital GPS thermal data logging for perishable event transport.",
    storeName: "Andheri North Logistics Base",
    city: "Andheri East",
    coordinates: { lat: 19.1136, lng: 72.8697 },
    fulfillmentType: "In-Store Pickup",
    pricePerDay: 6200,
    deposit: 20000,
    specs: "2.5-Ton Payload • Carrier Reefer Unit • -18°C to +4°C • Dedicated Driver Available",
    status: "Available",
    provider: {
      name: "Apex ColdChain Solutions",
      rating: 4.8,
      verified: true,
      dealsCompleted: 67
    },
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "AST-104",
    title: "400-Piece Royal Gold Chiavari Banquet Seating Suite",
    category: "Furniture",
    description: "High-grade beechwood gold-leaf Chiavari chairs equipped with ivory high-density waterproof cushions. Packed in custom stackable transit carts.",
    storeName: "Thane Regional Distribution Center",
    city: "Thane / Navi Mumbai",
    coordinates: { lat: 19.1998, lng: 72.9554 },
    fulfillmentType: "Direct Site Delivery",
    pricePerDay: 12000,
    deposit: 25000,
    specs: "400 Units • Beechwood Finish • Fire-Retardant Cushioning • Transport Pallets",
    status: "Available",
    provider: {
      name: "Monarch Event Furnishings",
      rating: 4.88,
      verified: true,
      dealsCompleted: 94
    },
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "AST-105",
    title: "Commercial Blast Chiller & Shock Freezer (15 Tray)",
    category: "Kitchens",
    description: "Rapid cooling unit capable of dropping 50kg of food from +90°C to +3°C in under 90 minutes. Critical for large hotel pre-cook and banquet staging.",
    storeName: "BKC Commercial Depot",
    city: "Bandra Kurla Complex",
    coordinates: { lat: 19.0674, lng: 72.8687 },
    fulfillmentType: "In-Store Pickup",
    pricePerDay: 5400,
    deposit: 18000,
    specs: "15x GN 1/1 Trays • R452A Refrigerant • Core Temperature Probe • Digital Log",
    status: "Available",
    provider: {
      name: "Culinary Tech Rentals",
      rating: 4.75,
      verified: true,
      dealsCompleted: 43
    },
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "AST-106",
    title: "L-Acoustics Concert Audio Array & Digital Mixer Kit",
    category: "AudioVisual",
    description: "Premium professional sound reinforcement system with Syva colinear speakers, subwoofers, and Allen & Heath SQ-6 48-channel digital console.",
    storeName: "Grand Palace Central Hub",
    city: "Mumbai South",
    coordinates: { lat: 18.9220, lng: 72.8347 },
    fulfillmentType: "Direct Site Delivery",
    pricePerDay: 15500,
    deposit: 30000,
    specs: "2x Syva + 2x Low Subs • SQ6 48-Ch Console • 4x Wireless Mics • Sound Tech Support",
    status: "Available",
    provider: {
      name: "Acoustic Craft Audio",
      rating: 4.92,
      verified: true,
      dealsCompleted: 78
    },
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "AST-107",
    title: "Modular Stainless Steel Food Warming Stations (12-Unit)",
    category: "Kitchens",
    description: "Insulated roll-top chafing buffet line with digital induction warming cradles. Guarantees uniform 68°C buffet hold without open fire hazards.",
    storeName: "Vashi Harbor Hospitality Depot",
    city: "Navi Mumbai",
    coordinates: { lat: 19.0771, lng: 72.9986 },
    fulfillmentType: "Both Available",
    pricePerDay: 3600,
    deposit: 10000,
    specs: "12 Induction Units • 304 Marine Grade SS • Glass View Lids • 1.2kW Each",
    status: "Available",
    provider: {
      name: "Saffron Hospitality Equipments",
      rating: 4.83,
      verified: true,
      dealsCompleted: 52
    },
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "AST-108",
    title: "Silent Diesel Generator Truck (125 kVA Silent DG Set)",
    category: "Vehicles",
    description: "Cummins powered acoustic-enclosed mobile DG set mounted on Eicher chassis. Super silent <65dB at 1 meter, with 300L fuel reserve and changeover switch.",
    storeName: "Andheri North Logistics Base",
    city: "Andheri East",
    coordinates: { lat: 19.1136, lng: 72.8697 },
    fulfillmentType: "Direct Site Delivery",
    pricePerDay: 14000,
    deposit: 25000,
    specs: "125 kVA Output • 415V 3-Phase • Super Silent Acoustic Hood • 24/7 Operator",
    status: "Available",
    provider: {
      name: "PowerPro Energy Fleet",
      rating: 4.9,
      verified: true,
      dealsCompleted: 110
    },
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80"
  }
];

const INITIAL_REQUESTS = [
  {
    id: "REQ-8091",
    assetId: "AST-101",
    assetTitle: "Rational iCombi Pro 10-Grid Commercial Combi Oven",
    seekerBusiness: "The St. Regis Grand Ballroom",
    seekerContact: "chef.kapoor@stregis.com",
    startDate: "2026-09-12",
    endDate: "2026-09-15",
    days: 3,
    dailyRate: 4800,
    totalAmount: 14400,
    deposit: 15000,
    fulfillmentType: "Direct Site Delivery",
    deliveryLocation: "St. Regis Ballroom, Lower Parel, Mumbai",
    status: "Pending",
    notes: "Crucial for International Diamond Summit banquet. Require pre-delivery inspection."
  },
  {
    id: "REQ-8092",
    assetId: "AST-102",
    assetTitle: "Luxury Crystal Chandelier & Truss Rigging Setup",
    seekerBusiness: "Elite Wedding Destinations Pvt Ltd",
    seekerContact: "ops@eliteweddings.in",
    startDate: "2026-09-18",
    endDate: "2026-09-21",
    days: 3,
    dailyRate: 18500,
    totalAmount: 55500,
    deposit: 35000,
    fulfillmentType: "Direct Site Delivery",
    deliveryLocation: "Turf Club, Mahalaxmi Racecourse, Mumbai",
    status: "Approved",
    notes: "Rigging technicians requested 4 hours before setup."
  },
  {
    id: "REQ-8093",
    assetId: "AST-104",
    assetTitle: "400-Piece Royal Gold Chiavari Banquet Seating Suite",
    seekerBusiness: "Gourmet Symphony Caterers",
    seekerContact: "logistics@gourmetsymphony.com",
    startDate: "2026-09-24",
    endDate: "2026-09-26",
    days: 2,
    dailyRate: 12000,
    totalAmount: 24000,
    deposit: 25000,
    fulfillmentType: "Direct Site Delivery",
    deliveryLocation: "Jio World Convention Centre, Hall 3",
    status: "Negotiating",
    negotiationOffer: 21500,
    notes: "Seeking ₹21,500 package deal for continuous 2-day corporate conference."
  },
  {
    id: "REQ-8094",
    assetId: "AST-103",
    assetTitle: "Tata Winger Refrigerated 2.5-Ton Food Logistics Van",
    seekerBusiness: "Taj Lands End Banqueting",
    seekerContact: "banquet.ops@tajhotels.com",
    startDate: "2026-09-08",
    endDate: "2026-09-09",
    days: 1,
    dailyRate: 6200,
    totalAmount: 6200,
    deposit: 20000,
    fulfillmentType: "In-Store Pickup",
    deliveryLocation: "Andheri Depot Pickup",
    status: "Approved",
    notes: "Self-pickup by certified commercial driver with cold chain validation."
  }
];

const DEMO_USERS = [
  {
    businessName: "The Grand Palace Hotel & Suites",
    email: "procurement@grandpalace.com",
    businessType: "Hotel & Resort",
    role: "Provider & Seeker",
    location: "Mumbai South",
    verified: true
  },
  {
    businessName: "Apex Culinary & Banquet Ops",
    email: "fleet@apexculinary.in",
    businessType: "Catering Enterprise",
    role: "Provider",
    location: "BKC Mumbai",
    verified: true
  },
  {
    businessName: "Royal Zenith Events & Staging",
    email: "production@zenithevents.com",
    businessType: "Event Planner & Production",
    role: "Seeker",
    location: "Andheri East",
    verified: true
  }
];

// Universal browser & Node export
if (typeof window !== 'undefined') {
  window.STORE_HUBS = STORE_HUBS;
  window.CATEGORIES = CATEGORIES;
  window.BUSINESS_TYPES = BUSINESS_TYPES;
  window.INITIAL_INVENTORY = INITIAL_INVENTORY;
  window.INITIAL_REQUESTS = INITIAL_REQUESTS;
  window.DEMO_USERS = DEMO_USERS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    STORE_HUBS,
    CATEGORIES,
    BUSINESS_TYPES,
    INITIAL_INVENTORY,
    INITIAL_REQUESTS,
    DEMO_USERS
  };
}
