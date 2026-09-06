/**
 * B2B Hospitality Resource Exchange - Central Data Layer
 * Localized exclusively for Mumbai Metropolitan Region (MMR)
 * Includes GPS coordinates, Instant Dispatch flags, and Escrow/Audit schemas.
 */

const MMR_CLIENT_ORIGIN = {
  name: "Bandra Kurla Complex (BKC) Enterprise Depot",
  coordinates: { lat: 19.0674, lng: 72.8687 }
};

const MMR_REGIONS = [
  "Mumbai",
  "Thane",
  "Navi Mumbai",
  "Bhiwandi",
  "Kalyan",
  "Vasai"
];

const CATEGORIES = [
  { id: "all", label: "All Categories", icon: "grid" },
  { id: "Venue", label: "Venues & Banquets", icon: "champagne-glasses" },
  { id: "Kitchen", label: "Commercial Kitchens", icon: "utensils" },
  { id: "Vehicle", label: "Logistics & Vehicles", icon: "truck" },
  { id: "Equipment", label: "Event Equipment", icon: "speaker" }
];

const BUSINESS_TYPES = [
  "Hotel & Resort",
  "Catering Enterprise",
  "Banquet Venue",
  "Event Planner & Production",
  "Cloud Kitchen Network",
  "Institutional Kitchen"
];

let inventoryData = [
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
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 18.9986, lng: 72.8311 },
    instantDispatchAvailable: false
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
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 19.2132, lng: 72.9774 },
    instantDispatchAvailable: false
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
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 19.0771, lng: 72.9986 },
    instantDispatchAvailable: false
  },

  // 2. COMMERCIAL KITCHENS & APPLIANCES
  {
    id: "mmr-04",
    title: "Commercial Bulk Kitchen Setup & Cold Storage",
    category: "Kitchen",
    shopName: "Royal Kitchens & Depot",
    vendorType: "Kitchen Facility",
    location: "Ghatkopar West, Mumbai",
    fulfillmentType: "In-Store Pickup",
    pricePerDay: 12000,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 19.0860, lng: 72.9090 },
    instantDispatchAvailable: true
  },
  {
    id: "mmr-05",
    title: "Industrial Heavy-Duty Gas Ranges & Fryers",
    category: "Kitchen",
    shopName: "Metro Catering Hub",
    vendorType: "Equipment Rental Depot",
    location: "Kalyan West, Thane",
    fulfillmentType: "Site Delivery",
    pricePerDay: 3500,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1590725140246-20acdee442be?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 19.2437, lng: 73.1355 },
    instantDispatchAvailable: true
  },
  {
    id: "mmr-06",
    title: "Walk-In Blast Freezer Unit (Trailer Mounted)",
    category: "Kitchen",
    shopName: "ColdChain Express Depot",
    vendorType: "Warehouse Provider",
    location: "Bhiwandi Industrial Hub",
    fulfillmentType: "Site Delivery",
    pricePerDay: 7000,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 19.2813, lng: 73.0483 },
    instantDispatchAvailable: false
  },

  // 3. LOGISTICS & VEHICLES
  {
    id: "mmr-07",
    title: "Refrigerated Catering Transport Van (3 Ton)",
    category: "Vehicle",
    shopName: "Apex Catering Logistics",
    vendorType: "Fleet Owner",
    location: "Anjur Phata, Bhiwandi",
    fulfillmentType: "Site Delivery",
    pricePerDay: 4500,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 19.2736, lng: 73.0321 },
    instantDispatchAvailable: true
  },
  {
    id: "mmr-08",
    title: "Heavy-Duty Food Transport Truck",
    category: "Vehicle",
    shopName: "TransMMR Hospitality Fleet",
    vendorType: "Logistics Partner",
    location: "Panvel, Navi Mumbai",
    fulfillmentType: "Site Delivery",
    pricePerDay: 6000,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 18.9894, lng: 73.1175 },
    instantDispatchAvailable: false
  },

  // 4. EVENT EQUIPMENT & FURNITURE
  {
    id: "mmr-09",
    title: "High-Capacity Line Array Sound & Lighting Rig",
    category: "Equipment",
    shopName: "Grand Event Supplies",
    vendorType: "Event Warehouse",
    location: "Andheri East, Mumbai",
    fulfillmentType: "Site Delivery",
    pricePerDay: 15000,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 19.1136, lng: 72.8697 },
    instantDispatchAvailable: true
  },
  {
    id: "mmr-10",
    title: "Luxury Dining Tables & Banquet Chairs (Set of 200)",
    category: "Equipment",
    shopName: "Elite Furniture Depot",
    vendorType: "Rental Depot",
    location: "Dadar West, Mumbai",
    fulfillmentType: "Site Delivery",
    pricePerDay: 8500,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 19.0178, lng: 72.8478 },
    instantDispatchAvailable: true
  },
  {
    id: "mmr-11",
    title: "Outdoor Waterproof German Canopy Tents (50x30ft)",
    category: "Equipment",
    shopName: "Suburban Tent & Decor House",
    vendorType: "Event Decorator",
    location: "Dombivli East, Thane",
    fulfillmentType: "Site Delivery",
    pricePerDay: 11000,
    availabilityStatus: "Booked",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 19.2184, lng: 73.0867 },
    instantDispatchAvailable: false
  },
  {
    id: "mmr-12",
    title: "Silent Diesel Generator Unit (125 kVA)",
    category: "Equipment",
    shopName: "PowerGrid Events Solutions",
    vendorType: "Power Equipment Depot",
    location: "Vasai East, Extended MMR",
    fulfillmentType: "Site Delivery",
    pricePerDay: 5000,
    availabilityStatus: "Available",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 19.3919, lng: 72.8397 },
    instantDispatchAvailable: true
  }
];

const INITIAL_REQUESTS = [
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
    tokenAmount: 15000, // 20%
    escrowDeposit: 12500,
    bookingMode: "Planned Advance",
    deliveryMode: "In-Store Pickup",
    deliveryFee: 0,
    deliveryLocation: "Lower Parel, Mumbai",
    status: "Pending",
    notes: "International Corporate Diamond Gala. 20% Token payment ready for instant date-locking.",
    auditStatus: "Pending Dispatch"
  },
  {
    id: "REQ-8092",
    assetId: "mmr-04",
    assetTitle: "Commercial Bulk Kitchen Setup & Cold Storage",
    seekerBusiness: "Apex Gourmet Catering",
    seekerContact: "kitchen.ops@apexcatering.in",
    startDate: "2026-09-08",
    endDate: "2026-09-10",
    days: 2,
    dailyRate: 12000,
    totalAmount: 24000,
    tokenAmount: 4800,
    escrowDeposit: 6000,
    bookingMode: "Emergency Dispatch",
    deliveryMode: "Site Delivery",
    deliveryFee: 650,
    deliveryLocation: "Ghatkopar West, Mumbai",
    status: "Approved",
    notes: "Emergency 45-min fast-track delivery. Pre-pickup photo checklist signed off.",
    auditStatus: "Pre-Pickup Verified"
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
    tokenAmount: 1800,
    escrowDeposit: 2250,
    bookingMode: "Planned Advance",
    deliveryMode: "Site Delivery (Round-Trip -20%)",
    deliveryFee: 1120,
    deliveryLocation: "Jio World Convention Centre, BKC",
    status: "Negotiating",
    negotiationOffer: 8000,
    notes: "Seeking ₹8,000 package deal. Round-trip Porter logistics selected.",
    auditStatus: "Pending Dispatch"
  },
  {
    id: "REQ-8094",
    assetId: "mmr-09",
    assetTitle: "High-Capacity Line Array Sound & Lighting Rig",
    seekerBusiness: "Royal Zenith Events & Staging",
    seekerContact: "production@zenithevents.com",
    startDate: "2026-09-02",
    endDate: "2026-09-04",
    days: 2,
    dailyRate: 15000,
    totalAmount: 30000,
    tokenAmount: 6000,
    escrowDeposit: 7500,
    bookingMode: "Planned Advance",
    deliveryMode: "Site Delivery",
    deliveryFee: 780,
    deliveryLocation: "Andheri East Exhibition Grounds",
    status: "Approved",
    notes: "Post-event return completed. Awaiting Escrow release sign-off.",
    auditStatus: "Post-Return Inspected"
  }
];

const DEMO_USERS = [
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
  window.MMR_CLIENT_ORIGIN = MMR_CLIENT_ORIGIN;
  window.MMR_REGIONS = MMR_REGIONS;
  window.CATEGORIES = CATEGORIES;
  window.BUSINESS_TYPES = BUSINESS_TYPES;
  window.inventoryData = inventoryData;
  window.INITIAL_REQUESTS = INITIAL_REQUESTS;
  window.DEMO_USERS = DEMO_USERS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MMR_CLIENT_ORIGIN,
    MMR_REGIONS,
    CATEGORIES,
    BUSINESS_TYPES,
    inventoryData,
    INITIAL_REQUESTS,
    DEMO_USERS
  };
}
