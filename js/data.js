/**
 * B2B Hospitality Resource Exchange - Central Data Layer
 * Mumbai Metropolitan Region (MMR) Localization
 */

export const MMR_REGIONS = [
  "Mumbai",
  "Thane",
  "Navi Mumbai",
  "Bhiwandi",
  "Kalyan",
  "Dombivli",
  "Vasai"
];

export const CATEGORIES = [
  { id: "all", label: "All Categories", icon: "grid" },
  { id: "Venue", label: "Venues & Banquets", icon: "champagne-glasses" },
  { id: "Commercial Kitchen", label: "Commercial Kitchens", icon: "utensils" },
  { id: "Logistics Vehicle", label: "Logistics & Vehicles", icon: "truck" },
  { id: "Event Equipment", label: "Event Equipment", icon: "speaker" }
];

export const BUSINESS_TYPES = [
  "Hotel & Resort",
  "Catering Enterprise",
  "Banquet Venue",
  "Event Planner & Production",
  "Cloud Kitchen Network",
  "Institutional Kitchen"
];

export let inventoryData = [
  // 1. VENUES & BANQUETS
  {
    id: "mmr-01",
    title: "500-Seater Banquet & Outdoor Lawn",
    category: "Venue",
    shopName: "Imperial Banquets & Warehousing",
    vendorType: "Venue Provider",
    location: "Lower Parel, Mumbai",
    fulfillmentType: "In-Store Pickup",
    pricePerDay: 25000,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "mmr-02",
    title: "Air-Conditioned Grand Celebration Hall",
    category: "Venue",
    shopName: "Majestic Grand Venue",
    vendorType: "Event Space",
    location: "Majiwada, Thane",
    fulfillmentType: "In-Store Pickup",
    pricePerDay: 35000,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1545232979-fbfd43e1d1eb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "mmr-03",
    title: "Seaside Open-Air Pavilion",
    category: "Venue",
    shopName: "Palm Beach Resort & Events",
    vendorType: "Hospitality Partner",
    location: "Vashi, Navi Mumbai",
    fulfillmentType: "In-Store Pickup",
    pricePerDay: 40000,
    availabilityStatus: "Booked",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
  },

  // 2. COMMERCIAL KITCHENS & APPLIANCES
  {
    id: "mmr-04",
    title: "Commercial Bulk Kitchen Setup & Cold Storage",
    category: "Commercial Kitchen",
    shopName: "Royal Kitchens & Depot",
    vendorType: "Kitchen Facility",
    location: "Ghatkopar West, Mumbai",
    fulfillmentType: "In-Store Pickup",
    pricePerDay: 12000,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "mmr-05",
    title: "Industrial Heavy-Duty Gas Ranges & Fryers",
    category: "Commercial Kitchen",
    shopName: "Metro Catering Hub",
    vendorType: "Equipment Rental Depot",
    location: "Kalyan West, Thane",
    fulfillmentType: "Site Delivery",
    pricePerDay: 3500,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1590725140246-20acdee442be?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "mmr-06",
    title: "Walk-In Blast Freezer Unit (Trailer Mounted)",
    category: "Commercial Kitchen",
    shopName: "ColdChain Express Depot",
    vendorType: "Warehouse Provider",
    location: "Bhiwandi Industrial Hub",
    fulfillmentType: "Site Delivery",
    pricePerDay: 7000,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
  },

  // 3. LOGISTICS & VEHICLES
  {
    id: "mmr-07",
    title: "Refrigerated Catering Transport Van (3 Ton)",
    category: "Logistics Vehicle",
    shopName: "Apex Catering Logistics",
    vendorType: "Fleet Owner",
    location: "Anjur Phata, Bhiwandi",
    fulfillmentType: "Site Delivery",
    pricePerDay: 4500,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "mmr-08",
    title: "Heavy-Duty Food Transport Truck",
    category: "Logistics Vehicle",
    shopName: "TransMMR Hospitality Fleet",
    vendorType: "Logistics Partner",
    location: "Panvel, Navi Mumbai",
    fulfillmentType: "Site Delivery",
    pricePerDay: 6000,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80"
  },

  // 4. EVENT EQUIPMENT & FURNITURE
  {
    id: "mmr-09",
    title: "High-Capacity Line Array Sound & Lighting Rig",
    category: "Event Equipment",
    shopName: "Grand Event Supplies",
    vendorType: "Event Warehouse",
    location: "Andheri East, Mumbai",
    fulfillmentType: "Site Delivery",
    pricePerDay: 15000,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "mmr-10",
    title: "Luxury Dining Tables & Banquet Chairs (Set of 200)",
    category: "Event Equipment",
    shopName: "Elite Furniture Depot",
    vendorType: "Rental Depot",
    location: "Dadar West, Mumbai",
    fulfillmentType: "Site Delivery",
    pricePerDay: 8500,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "mmr-11",
    title: "Outdoor Waterproof German Canopy Tents (50x30ft)",
    category: "Event Equipment",
    shopName: "Suburban Tent & Decor House",
    vendorType: "Event Decorator",
    location: "Dombivli East, Thane",
    fulfillmentType: "Site Delivery",
    pricePerDay: 11000,
    availabilityStatus: "Booked",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "mmr-12",
    title: "Silent Diesel Generator Unit (125 kVA)",
    category: "Event Equipment",
    shopName: "PowerGrid Events Solutions",
    vendorType: "Power Equipment Depot",
    location: "Vasai East, Extended MMR",
    fulfillmentType: "Site Delivery",
    pricePerDay: 5000,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  }
];

export const INITIAL_REQUESTS = [
  {
    id: "REQ-8091",
    assetId: "mmr-01",
    assetTitle: "500-Seater Banquet & Outdoor Lawn",
    seekerBusiness: "Taj Lands End Banquets",
    seekerContact: "events@tajhotels.com",
    startDate: "2026-09-12",
    endDate: "2026-09-15",
    days: 3,
    dailyRate: 25000,
    totalAmount: 75000,
    fulfillmentType: "In-Store Pickup",
    deliveryLocation: "Lower Parel, Mumbai",
    status: "Pending",
    notes: "International Corporate Diamond Gala."
  },
  {
    id: "REQ-8092",
    assetId: "mmr-04",
    assetTitle: "Commercial Bulk Kitchen Setup & Cold Storage",
    seekerBusiness: "Apex Gourmet Catering",
    seekerContact: "kitchen.ops@apexcatering.in",
    startDate: "2026-09-18",
    endDate: "2026-09-22",
    days: 4,
    dailyRate: 12000,
    totalAmount: 48000,
    fulfillmentType: "In-Store Pickup",
    deliveryLocation: "Ghatkopar West, Mumbai",
    status: "Approved",
    notes: "Pre-event prep kitchen validation completed."
  },
  {
    id: "REQ-8093",
    assetId: "mmr-07",
    assetTitle: "Refrigerated Catering Transport Van (3 Ton)",
    seekerBusiness: "Gourmet Symphony Caterers",
    seekerContact: "logistics@gourmetsymphony.com",
    startDate: "2026-09-24",
    endDate: "2026-09-26",
    days: 2,
    dailyRate: 4500,
    totalAmount: 9000,
    fulfillmentType: "Site Delivery",
    deliveryLocation: "Jio World Convention Centre, BKC",
    status: "Negotiating",
    negotiationOffer: 8000,
    notes: "Seeking ₹8,000 package rate for 2-day conference delivery."
  },
  {
    id: "REQ-8094",
    assetId: "mmr-09",
    assetTitle: "High-Capacity Line Array Sound & Lighting Rig",
    seekerBusiness: "Royal Zenith Events & Staging",
    seekerContact: "production@zenithevents.com",
    startDate: "2026-09-28",
    endDate: "2026-09-30",
    days: 2,
    dailyRate: 15000,
    totalAmount: 30000,
    fulfillmentType: "Site Delivery",
    deliveryLocation: "Andheri East Exhibition Grounds",
    status: "Approved",
    notes: "Sound tech dispatch confirmed with operator."
  }
];

export const DEMO_USERS = [
  {
    businessName: "Imperial Banquets & Hospitality Ltd",
    email: "procurement@imperialbanquets.in",
    businessType: "Hotel & Resort",
    role: "Provider & Seeker",
    location: "Lower Parel, Mumbai",
    verified: true
  },
  {
    businessName: "Metro Catering Logistics Network",
    email: "fleet@metrocatering.in",
    businessType: "Catering Enterprise",
    role: "Provider",
    location: "Kalyan West, Thane",
    verified: true
  },
  {
    businessName: "Grand Event Supplies & Audio",
    email: "production@grandevents.in",
    businessType: "Event Planner & Production",
    role: "Seeker",
    location: "Andheri East, Mumbai",
    verified: true
  }
];

// Universal browser & Node exports
if (typeof window !== 'undefined') {
  window.MMR_REGIONS = MMR_REGIONS;
  window.CATEGORIES = CATEGORIES;
  window.BUSINESS_TYPES = BUSINESS_TYPES;
  window.inventoryData = inventoryData;
  window.INITIAL_REQUESTS = INITIAL_REQUESTS;
  window.DEMO_USERS = DEMO_USERS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MMR_REGIONS,
    CATEGORIES,
    BUSINESS_TYPES,
    inventoryData,
    INITIAL_REQUESTS,
    DEMO_USERS
  };
}
