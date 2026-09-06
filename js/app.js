/**
 * B2B Hospitality Resource Exchange - Main Application Controller
 * Localized for Mumbai Metropolitan Region (MMR)
 * Universal ES script: Theme toggling, authentication, MMR location filters,
 * real-time booking calculator, and provider management dashboard.
 */

(function() {
  'use strict';

  // EXACT DATASET AS SPECIFIED
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

  // Verified Fallback Images to guarantee NO broken placeholders
  const VERIFIED_FALLBACK_IMAGES = {
    "Venue": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    "Commercial Kitchen": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    "Logistics Vehicle": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    "Event Equipment": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
  };

  function getSafeImageUrl(imgUrl, category = "Venue") {
    // If the image URL is the known missing Unsplash hash, return verified celebration hall
    if (imgUrl && imgUrl.includes('photo-1545232979-fbfd43e1d1eb')) {
      return 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80';
    }
    return imgUrl || VERIFIED_FALLBACK_IMAGES[category] || VERIFIED_FALLBACK_IMAGES["Venue"];
  }

  const CATEGORIES = [
    { id: "all", label: "All Categories", icon: "grid" },
    { id: "Venue", label: "Venues & Banquets", icon: "champagne-glasses" },
    { id: "Commercial Kitchen", label: "Commercial Kitchens", icon: "utensils" },
    { id: "Logistics Vehicle", label: "Logistics & Vehicles", icon: "truck" },
    { id: "Event Equipment", label: "Event Equipment", icon: "speaker" }
  ];

  const MMR_REGIONS = [
    "Mumbai",
    "Thane",
    "Navi Mumbai",
    "Bhiwandi",
    "Kalyan",
    "Dombivli",
    "Vasai"
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

  class HospitaLinkApp {
    constructor() {
      this.initStorage();
      this.state = {
        theme: localStorage.getItem('hospitalink_theme') || 'light',
        currentView: 'seeker', // 'seeker' | 'provider'
        currentUser: this.loadCurrentUser(),
        inventory: this.loadInventory(),
        requests: this.loadRequests(),
        activeCategory: 'all',
        searchQuery: '',
        selectedLocation: 'all',
        selectedPriceRange: 'all',
        selectedFulfillment: 'all',
        sortBy: 'featured',
        activeModalAsset: null,
        activeNegotiatingReq: null
      };

      this.dom = {};
      this.init();
    }

    // --- Storage Helpers ---
    initStorage() {
      // Initialize with MMR dataset if not stored or outdated
      if (!localStorage.getItem('hospitalink_inventory_mmr_v2')) {
        localStorage.setItem('hospitalink_inventory_mmr_v2', JSON.stringify(inventoryData));
        localStorage.removeItem('hospitalink_inventory'); // Clear legacy mock
      }
      if (!localStorage.getItem('hospitalink_requests_mmr_v2')) {
        localStorage.setItem('hospitalink_requests_mmr_v2', JSON.stringify(INITIAL_REQUESTS));
      }
    }

    loadInventory() {
      try {
        const stored = localStorage.getItem('hospitalink_inventory_mmr_v2');
        return stored ? JSON.parse(stored) : inventoryData;
      } catch {
        return inventoryData;
      }
    }

    saveInventory() {
      localStorage.setItem('hospitalink_inventory_mmr_v2', JSON.stringify(this.state.inventory));
    }

    loadRequests() {
      try {
        const stored = localStorage.getItem('hospitalink_requests_mmr_v2');
        return stored ? JSON.parse(stored) : INITIAL_REQUESTS;
      } catch {
        return INITIAL_REQUESTS;
      }
    }

    saveRequests() {
      localStorage.setItem('hospitalink_requests_mmr_v2', JSON.stringify(this.state.requests));
    }

    loadCurrentUser() {
      try {
        const stored = localStorage.getItem('hospitalink_current_user');
        return stored ? JSON.parse(stored) : DEMO_USERS[0];
      } catch {
        return DEMO_USERS[0];
      }
    }

    saveCurrentUser(user) {
      this.state.currentUser = user;
      if (user) {
        localStorage.setItem('hospitalink_current_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('hospitalink_current_user');
      }
      this.renderAuthStatus();
    }

    // --- Initialization ---
    init() {
      this.cacheDom();
      this.applyTheme(this.state.theme);
      this.populateFooterHubs();
      this.bindEvents();
      this.renderAuthStatus();
      this.renderCategoryPills();
      this.renderMarketplaceListings();
      this.renderProviderDashboard();
      this.refreshIcons();
    }

    cacheDom() {
      this.dom.html = document.documentElement;
      this.dom.themeToggleBtn = document.getElementById('theme-toggle-btn');
      this.dom.themeIcon = document.getElementById('theme-icon');

      // Navigation & View Switching
      this.dom.btnViewSeeker = document.getElementById('btn-view-seeker');
      this.dom.btnViewProvider = document.getElementById('btn-view-provider');
      this.dom.viewSeeker = document.getElementById('view-seeker');
      this.dom.viewProvider = document.getElementById('view-provider');
      this.dom.brandLink = document.getElementById('brand-link');

      // Auth
      this.dom.authActionsContainer = document.getElementById('auth-actions-container');
      this.dom.authModal = document.getElementById('auth-modal');
      this.dom.btnOpenAuth = document.getElementById('btn-open-auth');
      this.dom.btnCloseAuth = document.getElementById('btn-close-auth');
      this.dom.tabAuthLogin = document.getElementById('tab-auth-login');
      this.dom.tabAuthRegister = document.getElementById('tab-auth-register');
      this.dom.formLogin = document.getElementById('form-login');
      this.dom.formRegister = document.getElementById('form-register');
      this.dom.regBizType = document.getElementById('reg-biz-type');
      this.dom.regHub = document.getElementById('reg-hub');

      // Marketplace Filters
      this.dom.searchInput = document.getElementById('search-input');
      this.dom.filterLocation = document.getElementById('filter-location');
      this.dom.filterCategory = document.getElementById('filter-category');
      this.dom.filterPrice = document.getElementById('filter-price');
      this.dom.filterFulfillment = document.getElementById('filter-fulfillment');
      this.dom.sortSelect = document.getElementById('sort-select');
      this.dom.btnResetFilters = document.getElementById('btn-reset-filters');
      this.dom.categoryPillsContainer = document.getElementById('category-pills-container');
      this.dom.resultsCountText = document.getElementById('results-count-text');
      this.dom.listingsGrid = document.getElementById('listings-grid');
      this.dom.metricListingsCount = document.getElementById('metric-listings-count');

      // Rental Booking Modal
      this.dom.rentalModal = document.getElementById('rental-modal');
      this.dom.btnCloseRental = document.getElementById('btn-close-rental');
      this.dom.btnCancelRental = document.getElementById('btn-cancel-rental');
      this.dom.formRental = document.getElementById('form-rental');
      this.dom.rentalAssetId = document.getElementById('rental-asset-id');
      this.dom.rentalAssetSummary = document.getElementById('rental-asset-summary');
      this.dom.rentalStartDate = document.getElementById('rental-start-date');
      this.dom.rentalEndDate = document.getElementById('rental-end-date');
      this.dom.rentalDeliveryAddress = document.getElementById('rental-delivery-address');
      this.dom.rentalNotes = document.getElementById('rental-notes');
      this.dom.calcDuration = document.getElementById('calc-duration');
      this.dom.calcDailyRate = document.getElementById('calc-daily-rate');
      this.dom.calcSubtotal = document.getElementById('calc-subtotal');
      this.dom.calcPlatformFee = document.getElementById('calc-platform-fee');
      this.dom.calcDeposit = document.getElementById('calc-deposit');
      this.dom.calcGrandTotal = document.getElementById('calc-grand-total');

      // Provider Dashboard
      this.dom.provStatRevenue = document.getElementById('prov-stat-revenue');
      this.dom.provStatPending = document.getElementById('prov-stat-pending');
      this.dom.provStatActive = document.getElementById('prov-stat-active');
      this.dom.provStatUtil = document.getElementById('prov-stat-util');
      this.dom.requestsCounterBadge = document.getElementById('requests-counter-badge');
      this.dom.requestsTableBody = document.getElementById('requests-table-body');
      this.dom.providerInventoryTableBody = document.getElementById('provider-inventory-table-body');
      this.dom.btnOpenListModal = document.getElementById('btn-open-list-modal');

      // Add Asset Modal
      this.dom.listAssetModal = document.getElementById('list-asset-modal');
      this.dom.btnCloseList = document.getElementById('btn-close-list');
      this.dom.btnCancelList = document.getElementById('btn-cancel-list');
      this.dom.formListAsset = document.getElementById('form-list-asset');

      // Quick View Modal
      this.dom.quickviewModal = document.getElementById('quickview-modal');
      this.dom.btnCloseQv = document.getElementById('btn-close-qv');
      this.dom.btnDismissQv = document.getElementById('btn-dismiss-qv');
      this.dom.qvTitle = document.getElementById('qv-title');
      this.dom.qvContent = document.getElementById('qv-content');
      this.dom.qvBtnRequest = document.getElementById('qv-btn-request');

      // Negotiate Modal
      this.dom.negotiateModal = document.getElementById('negotiate-modal');
      this.dom.btnCloseNeg = document.getElementById('btn-close-neg');
      this.dom.btnCancelNeg = document.getElementById('btn-cancel-neg');
      this.dom.formNegotiate = document.getElementById('form-negotiate');
      this.dom.negReqId = document.getElementById('neg-req-id');
      this.dom.negTargetId = document.getElementById('neg-target-id');
      this.dom.negDetailsBox = document.getElementById('neg-details-box');
      this.dom.negCounterPrice = document.getElementById('neg-counter-price');
      this.dom.negCounterMessage = document.getElementById('neg-counter-message');

      // Toast & Footer
      this.dom.toastContainer = document.getElementById('toast-container');
      this.dom.footerHubs = document.getElementById('footer-hubs');
    }

    populateFooterHubs() {
      if (this.dom.footerHubs) {
        this.dom.footerHubs.innerHTML = MMR_REGIONS.map(
          reg => `<span class="footer-hub-chip"><i data-lucide="map-pin" style="width:0.75rem;height:0.75rem;display:inline-block;vertical-align:middle;margin-right:2px;"></i>${reg}</span>`
        ).join('');
      }
    }

    // --- Event Binding ---
    bindEvents() {
      // Theme toggle
      this.dom.themeToggleBtn?.addEventListener('click', () => this.toggleTheme());

      // View Switching
      this.dom.btnViewSeeker?.addEventListener('click', () => this.switchView('seeker'));
      this.dom.btnViewProvider?.addEventListener('click', () => this.switchView('provider'));
      this.dom.brandLink?.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchView('seeker');
      });

      // Auth Modal Handlers
      this.dom.btnOpenAuth?.addEventListener('click', () => this.openModal(this.dom.authModal));
      this.dom.btnCloseAuth?.addEventListener('click', () => this.closeModal(this.dom.authModal));
      this.dom.tabAuthLogin?.addEventListener('click', () => this.toggleAuthTab('login'));
      this.dom.tabAuthRegister?.addEventListener('click', () => this.toggleAuthTab('register'));

      // Quick Demo logins
      document.querySelectorAll('.demo-quick-btn[data-demo]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = parseInt(e.target.dataset.demo, 10);
          this.loginDemoUser(index);
        });
      });

      // Form Submissions
      this.dom.formLogin?.addEventListener('submit', (e) => this.handleLogin(e));
      this.dom.formRegister?.addEventListener('submit', (e) => this.handleRegister(e));

      // Marketplace Filters
      this.dom.searchInput?.addEventListener('input', (e) => {
        this.state.searchQuery = e.target.value.trim().toLowerCase();
        this.renderMarketplaceListings();
      });

      this.dom.filterLocation?.addEventListener('change', (e) => {
        this.state.selectedLocation = e.target.value;
        this.renderMarketplaceListings();
      });

      this.dom.filterCategory?.addEventListener('change', (e) => {
        this.state.activeCategory = e.target.value;
        this.renderCategoryPills();
        this.renderMarketplaceListings();
      });

      this.dom.filterPrice?.addEventListener('change', (e) => {
        this.state.selectedPriceRange = e.target.value;
        this.renderMarketplaceListings();
      });

      this.dom.filterFulfillment?.addEventListener('change', (e) => {
        this.state.selectedFulfillment = e.target.value;
        this.renderMarketplaceListings();
      });

      this.dom.sortSelect?.addEventListener('change', (e) => {
        this.state.sortBy = e.target.value;
        this.renderMarketplaceListings();
      });

      this.dom.btnResetFilters?.addEventListener('click', () => this.resetFilters());

      // Rental Booking Modal Events
      this.dom.btnCloseRental?.addEventListener('click', () => this.closeModal(this.dom.rentalModal));
      this.dom.btnCancelRental?.addEventListener('click', () => this.closeModal(this.dom.rentalModal));
      this.dom.rentalStartDate?.addEventListener('change', () => this.recalculateRentalQuote());
      this.dom.rentalEndDate?.addEventListener('change', () => this.recalculateRentalQuote());
      this.dom.formRental?.addEventListener('submit', (e) => this.handleRentalSubmit(e));

      // List Asset Modal Events
      this.dom.btnOpenListModal?.addEventListener('click', () => this.openModal(this.dom.listAssetModal));
      this.dom.btnCloseList?.addEventListener('click', () => this.closeModal(this.dom.listAssetModal));
      this.dom.btnCancelList?.addEventListener('click', () => this.closeModal(this.dom.listAssetModal));
      this.dom.formListAsset?.addEventListener('submit', (e) => this.handleListAssetSubmit(e));

      // Preset images
      document.querySelectorAll('.preset-img-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const url = e.target.getAttribute('data-url');
          const assetImgInput = document.getElementById('asset-image');
          if (assetImgInput) assetImgInput.value = url;
        });
      });

      // Quick View Modal Events
      this.dom.btnCloseQv?.addEventListener('click', () => this.closeModal(this.dom.quickviewModal));
      this.dom.btnDismissQv?.addEventListener('click', () => this.closeModal(this.dom.quickviewModal));
      this.dom.qvBtnRequest?.addEventListener('click', () => {
        this.closeModal(this.dom.quickviewModal);
        if (this.state.activeModalAsset) {
          this.openRentalModal(this.state.activeModalAsset.id);
        }
      });

      // Negotiate Modal Events
      this.dom.btnCloseNeg?.addEventListener('click', () => this.closeModal(this.dom.negotiateModal));
      this.dom.btnCancelNeg?.addEventListener('click', () => this.closeModal(this.dom.negotiateModal));
      this.dom.formNegotiate?.addEventListener('submit', (e) => this.handleNegotiateSubmit(e));

      // Close modals on escape key or backdrop click
      document.querySelectorAll('.modal-backdrop').forEach(modal => {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            this.closeModal(modal);
          }
        });
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.querySelectorAll('.modal-backdrop.active').forEach(m => this.closeModal(m));
        }
      });
    }

    // --- Theme Controller ---
    applyTheme(theme) {
      this.state.theme = theme;
      this.dom.html.setAttribute('data-theme', theme);
      localStorage.setItem('hospitalink_theme', theme);
      
      if (this.dom.themeIcon) {
        this.dom.themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
        this.refreshIcons();
      }
    }

    toggleTheme() {
      const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
      this.applyTheme(newTheme);
      this.showToast({
        title: 'Theme Switched',
        message: `Interface shifted to ${newTheme === 'dark' ? 'Deep Dark' : 'Refined Light'} mode.`,
        type: 'info'
      });
    }

    // --- View Mode Switching ---
    switchView(viewName) {
      this.state.currentView = viewName;
      if (viewName === 'seeker') {
        this.dom.btnViewSeeker?.classList.add('active');
        this.dom.btnViewSeeker?.setAttribute('aria-selected', 'true');
        this.dom.btnViewProvider?.classList.remove('active');
        this.dom.btnViewProvider?.setAttribute('aria-selected', 'false');
        this.dom.viewSeeker?.classList.add('active');
        this.dom.viewProvider?.classList.remove('active');
        this.renderMarketplaceListings();
      } else {
        this.dom.btnViewProvider?.classList.add('active');
        this.dom.btnViewProvider?.setAttribute('aria-selected', 'true');
        this.dom.btnViewSeeker?.classList.remove('active');
        this.dom.btnViewSeeker?.setAttribute('aria-selected', 'false');
        this.dom.viewProvider?.classList.add('active');
        this.dom.viewSeeker?.classList.remove('active');
        this.renderProviderDashboard();
      }
      this.refreshIcons();
    }

    // --- Authentication Handlers ---
    toggleAuthTab(tab) {
      if (tab === 'login') {
        this.dom.tabAuthLogin?.classList.add('active');
        this.dom.tabAuthRegister?.classList.remove('active');
        if (this.dom.formLogin) this.dom.formLogin.style.display = 'flex';
        if (this.dom.formRegister) this.dom.formRegister.style.display = 'none';
        const title = document.getElementById('auth-modal-title');
        if (title) title.textContent = 'Enterprise Portal Access';
      } else {
        this.dom.tabAuthRegister?.classList.add('active');
        this.dom.tabAuthLogin?.classList.remove('active');
        if (this.dom.formRegister) this.dom.formRegister.style.display = 'flex';
        if (this.dom.formLogin) this.dom.formLogin.style.display = 'none';
        const title = document.getElementById('auth-modal-title');
        if (title) title.textContent = 'Register Hospitality Organization';
      }
      this.refreshIcons();
    }

    loginDemoUser(index) {
      const user = DEMO_USERS[index] || DEMO_USERS[0];
      this.saveCurrentUser(user);
      this.closeModal(this.dom.authModal);
      this.showToast({
        title: 'Authenticated Successfully',
        message: `Welcome, ${user.businessName} (${user.businessType}).`,
        type: 'success'
      });
    }

    handleLogin(e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const namePart = email.split('@')[0].replace(/[._]/g, ' ').toUpperCase();
      const newUser = {
        businessName: `${namePart} HOSPITALITY`,
        email: email,
        businessType: 'Hotel & Resort',
        role: 'Enterprise Partner',
        location: 'Mumbai Central',
        verified: true
      };
      this.saveCurrentUser(newUser);
      this.closeModal(this.dom.authModal);
      this.showToast({
        title: 'Enterprise Sign In Complete',
        message: `Signed in as ${newUser.businessName}`,
        type: 'success'
      });
    }

    handleRegister(e) {
      e.preventDefault();
      const bizName = document.getElementById('reg-biz-name').value;
      const bizType = document.getElementById('reg-biz-type').value;
      const hub = document.getElementById('reg-hub')?.value || 'Lower Parel, Mumbai';
      const email = document.getElementById('reg-email').value;

      const newUser = {
        businessName: bizName,
        email: email,
        businessType: bizType,
        role: 'Enterprise Partner',
        location: hub,
        verified: true
      };

      this.saveCurrentUser(newUser);
      this.closeModal(this.dom.authModal);
      this.showToast({
        title: 'Enterprise Account Created',
        message: `Welcome ${bizName}! Your verified status is active.`,
        type: 'success'
      });
    }

    renderAuthStatus() {
      const container = this.dom.authActionsContainer;
      if (!container) return;

      if (this.state.currentUser) {
        const user = this.state.currentUser;
        const initials = user.businessName
          .split(' ')
          .slice(0, 2)
          .map(w => w[0])
          .join('');

        container.innerHTML = `
          <div class="user-profile-badge">
            <div class="user-avatar" title="${user.businessName}">${initials}</div>
            <div class="user-info">
              <span class="user-name">${this.truncate(user.businessName, 22)}</span>
              <span class="user-type">${user.businessType}</span>
            </div>
            <button class="btn-signout" id="btn-sign-out" title="Sign Out">
              <i data-lucide="log-out" style="width: 0.95rem; height: 0.95rem;"></i>
            </button>
          </div>
        `;

        document.getElementById('btn-sign-out')?.addEventListener('click', () => {
          this.saveCurrentUser(null);
          this.showToast({
            title: 'Signed Out',
            message: 'You have logged out of the enterprise session.',
            type: 'info'
          });
        });
      } else {
        container.innerHTML = `
          <button class="auth-trigger-btn" id="btn-open-auth">
            <i data-lucide="building" style="width: 1rem; height: 1rem;"></i>
            <span>Enterprise Login</span>
          </button>
        `;
        document.getElementById('btn-open-auth')?.addEventListener('click', () => {
          this.openModal(this.dom.authModal);
        });
      }
      this.refreshIcons();
    }

    // --- Category Pills Bar ---
    renderCategoryPills() {
      const container = this.dom.categoryPillsContainer;
      if (!container) return;

      const counts = {};
      counts['all'] = this.state.inventory.length;
      CATEGORIES.forEach(cat => {
        if (cat.id !== 'all') {
          counts[cat.id] = this.state.inventory.filter(item => item.category === cat.id).length;
        }
      });

      container.innerHTML = CATEGORIES.map(cat => {
        const isActive = this.state.activeCategory === cat.id ? 'active' : '';
        return `
          <button class="category-pill ${isActive}" data-category="${cat.id}">
            <span>${cat.label}</span>
            <span class="category-count">${counts[cat.id] || 0}</span>
          </button>
        `;
      }).join('');

      container.querySelectorAll('.category-pill').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const cat = e.currentTarget.dataset.category;
          this.state.activeCategory = cat;
          if (this.dom.filterCategory) {
            this.dom.filterCategory.value = cat;
          }
          this.renderCategoryPills();
          this.renderMarketplaceListings();
        });
      });
    }

    // --- Marketplace Listings & Filtering ---
    filterListings() {
      return this.state.inventory.filter(item => {
        // 1. Category match
        if (this.state.activeCategory !== 'all' && item.category !== this.state.activeCategory) {
          return false;
        }

        // 2. MMR Location match
        if (this.state.selectedLocation !== 'all') {
          const locFilter = this.state.selectedLocation.toLowerCase();
          const itemLoc = item.location.toLowerCase();
          
          if (locFilter === 'mumbai') {
            // Must contain mumbai, but not navi mumbai
            if (!itemLoc.includes('mumbai') || itemLoc.includes('navi mumbai')) {
              return false;
            }
          } else {
            if (!itemLoc.includes(locFilter)) {
              return false;
            }
          }
        }

        // 3. Price Range match
        if (this.state.selectedPriceRange !== 'all') {
          const price = item.pricePerDay;
          if (this.state.selectedPriceRange === 'under-5k' && price >= 5000) return false;
          if (this.state.selectedPriceRange === '5k-15k' && (price < 5000 || price > 15000)) return false;
          if (this.state.selectedPriceRange === '15k-30k' && (price < 15000 || price > 30000)) return false;
          if (this.state.selectedPriceRange === 'above-30k' && price <= 30000) return false;
        }

        // 4. Fulfillment match
        if (this.state.selectedFulfillment !== 'all') {
          if (item.fulfillmentType !== this.state.selectedFulfillment) {
            return false;
          }
        }

        // 5. Search query match
        if (this.state.searchQuery) {
          const q = this.state.searchQuery;
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchShop = item.shopName.toLowerCase().includes(q);
          const matchVendor = item.vendorType.toLowerCase().includes(q);
          const matchCat = item.category.toLowerCase().includes(q);
          const matchLoc = item.location.toLowerCase().includes(q);
          if (!matchTitle && !matchShop && !matchVendor && !matchCat && !matchLoc) {
            return false;
          }
        }

        return true;
      }).sort((a, b) => {
        if (this.state.sortBy === 'price-asc') return a.pricePerDay - b.pricePerDay;
        if (this.state.sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay;
        return 0; // default featured
      });
    }

    renderMarketplaceListings() {
      const grid = this.dom.listingsGrid;
      if (!grid) return;

      const items = this.filterListings();

      // Update Results Meta
      if (this.dom.resultsCountText) {
        this.dom.resultsCountText.innerHTML = `Showing <strong class="results-count">${items.length}</strong> of ${this.state.inventory.length} MMR commercial assets`;
      }
      if (this.dom.metricListingsCount) {
        this.dom.metricListingsCount.textContent = `${this.state.inventory.length} Assets`;
      }

      if (items.length === 0) {
        grid.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon">
              <i data-lucide="package-x"></i>
            </div>
            <h3>No matching MMR commercial equipment found</h3>
            <p>Try resetting filters or adjusting search keywords to find available hospitality infrastructure.</p>
            <button class="reset-filters-btn" id="btn-empty-reset">Reset All Filters</button>
          </div>
        `;
        document.getElementById('btn-empty-reset')?.addEventListener('click', () => this.resetFilters());
        this.refreshIcons();
        return;
      }

      grid.innerHTML = items.map(item => {
        const safeImageUrl = getSafeImageUrl(item.image, item.category);
        const isAvailable = item.availabilityStatus === 'Available';
        const statusClass = isAvailable ? 'available' : 'booked';
        const statusLabel = isAvailable ? 'Available Now' : 'Currently Booked';

        const fulfillmentClass = item.fulfillmentType === 'Site Delivery' 
          ? 'fulfillment-delivery' 
          : 'fulfillment-pickup';

        const fulfillmentIcon = item.fulfillmentType === 'Site Delivery'
          ? 'truck'
          : 'store';

        return `
          <article class="asset-card" data-id="${item.id}">
            <div class="card-media">
              <img 
                src="${safeImageUrl}" 
                alt="${item.title}" 
                loading="lazy" 
                onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80';"
              >
              <span class="card-category-badge">${item.category}</span>
              <span class="card-status-pill ${statusClass}">${statusLabel}</span>
            </div>

            <div class="card-body">
              <div class="card-provider-row">
                <span class="provider-info" title="${item.vendorType}">
                  <i data-lucide="shield-check" class="verified-icon" style="width: 0.95rem; height: 0.95rem;"></i>
                  <span>${item.vendorType}</span>
                </span>
                <span style="font-size: 0.75rem; font-weight: 600; color: var(--accent-emerald);">MMR Verified</span>
              </div>

              <h3 class="card-title" title="${item.title}">${item.title}</h3>

              <div class="card-specs" title="${item.shopName}" style="display: flex; align-items: center; gap: 0.4rem;">
                <i data-lucide="building-2" style="width: 0.85rem; height: 0.85rem; color: var(--text-muted); flex-shrink: 0;"></i>
                <strong style="color: var(--text-primary); font-weight: 600;">${item.shopName}</strong>
              </div>

              <div class="card-location-row">
                <span class="store-location-badge" title="${item.location}">
                  <i data-lucide="map-pin" style="width: 0.88rem; height: 0.88rem;"></i>
                  <span>${item.location}</span>
                </span>
                <div style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap;">
                  <span class="fulfillment-badge ${fulfillmentClass}">
                    <i data-lucide="${fulfillmentIcon}" style="width: 0.75rem; height: 0.75rem;"></i>
                    <span>${item.fulfillmentType}</span>
                  </span>
                  <span class="coordinates-tag">MMR Hub ID: ${item.id.toUpperCase()}</span>
                </div>
              </div>

              <div class="card-footer">
                <div class="price-box">
                  <span class="price-amount">₹${item.pricePerDay.toLocaleString('en-IN')}</span>
                  <span class="price-period">per calendar day</span>
                </div>
                <div class="card-actions">
                  <button class="btn-quickview" data-quickview="${item.id}" title="Quick Specs & Details">
                    <i data-lucide="eye" style="width: 1rem; height: 1rem;"></i>
                  </button>
                  <button 
                    class="btn-request-rent ${!isAvailable ? 'btn-booked-action' : ''}" 
                    data-rent="${item.id}"
                    style="${!isAvailable ? 'background-color: var(--accent-amber);' : ''}"
                  >
                    ${isAvailable ? 'Request Rent' : 'Pre-Book'}
                  </button>
                </div>
              </div>
            </div>
          </article>
        `;
      }).join('');

      // Bind card actions
      grid.querySelectorAll('[data-quickview]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.quickview;
          this.openQuickViewModal(id);
        });
      });

      grid.querySelectorAll('[data-rent]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.rent;
          this.openRentalModal(id);
        });
      });

      this.refreshIcons();
    }

    resetFilters() {
      this.state.activeCategory = 'all';
      this.state.searchQuery = '';
      this.state.selectedLocation = 'all';
      this.state.selectedPriceRange = 'all';
      this.state.selectedFulfillment = 'all';
      this.state.sortBy = 'featured';

      if (this.dom.searchInput) this.dom.searchInput.value = '';
      if (this.dom.filterLocation) this.dom.filterLocation.value = 'all';
      if (this.dom.filterCategory) this.dom.filterCategory.value = 'all';
      if (this.dom.filterPrice) this.dom.filterPrice.value = 'all';
      if (this.dom.filterFulfillment) this.dom.filterFulfillment.value = 'all';
      if (this.dom.sortSelect) this.dom.sortSelect.value = 'featured';

      this.renderCategoryPills();
      this.renderMarketplaceListings();
      this.showToast({
        title: 'Filters Cleared',
        message: 'Showing all 12 MMR regional commercial assets.',
        type: 'info'
      });
    }

    // --- Rental Request Modal & Live Calculation ---
    openRentalModal(assetId) {
      const asset = this.state.inventory.find(item => item.id === assetId);
      if (!asset) return;

      this.state.activeModalAsset = asset;
      this.dom.rentalAssetId.value = asset.id;

      // Default date range (tomorrow to +3 days)
      const today = new Date();
      const start = new Date(today);
      start.setDate(today.getDate() + 1);
      const end = new Date(today);
      end.setDate(today.getDate() + 4);

      const formatISO = (d) => d.toISOString().split('T')[0];
      this.dom.rentalStartDate.min = formatISO(today);
      this.dom.rentalStartDate.value = formatISO(start);
      this.dom.rentalEndDate.min = formatISO(start);
      this.dom.rentalEndDate.value = formatISO(end);

      const safeImageUrl = getSafeImageUrl(asset.image, asset.category);

      // Populate asset preview
      this.dom.rentalAssetSummary.innerHTML = `
        <img 
          src="${safeImageUrl}" 
          style="width: 70px; height: 70px; border-radius: 8px; object-fit: cover;" 
          alt="${asset.title}"
          onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80';"
        >
        <div style="flex: 1; display: flex; flex-direction: column; gap: 0.2rem;">
          <strong style="font-size: 0.92rem; color: var(--text-primary);">${asset.title}</strong>
          <span style="font-size: 0.78rem; color: var(--text-secondary);">
            ${asset.shopName} • <strong>${asset.location}</strong>
          </span>
          <span style="font-size: 0.75rem; color: var(--accent-primary); font-weight: 600;">
            ₹${asset.pricePerDay.toLocaleString('en-IN')} / day • ${asset.fulfillmentType}
          </span>
        </div>
      `;

      this.recalculateRentalQuote();
      this.openModal(this.dom.rentalModal);
    }

    recalculateRentalQuote() {
      const asset = this.state.activeModalAsset;
      if (!asset) return;

      const startVal = this.dom.rentalStartDate.value;
      const endVal = this.dom.rentalEndDate.value;

      let days = 1;
      if (startVal && endVal) {
        const s = new Date(startVal);
        const e = new Date(endVal);
        const diffMs = e - s;
        days = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
      }

      const baseRental = days * asset.pricePerDay;
      const platformFee = Math.round(baseRental * 0.05); // 5% Logistics & Insurance Fee
      const deposit = Math.round(asset.pricePerDay * 0.5); // 50% Daily Deposit
      const grandTotal = baseRental + platformFee + deposit;

      this.dom.calcDuration.textContent = `${days} Calendar Day${days > 1 ? 's' : ''}`;
      this.dom.calcDailyRate.textContent = `₹${asset.pricePerDay.toLocaleString('en-IN')} / day`;
      this.dom.calcSubtotal.textContent = `₹${baseRental.toLocaleString('en-IN')}`;
      this.dom.calcPlatformFee.textContent = `₹${platformFee.toLocaleString('en-IN')}`;
      this.dom.calcDeposit.textContent = `₹${deposit.toLocaleString('en-IN')} (Refundable)`;
      this.dom.calcGrandTotal.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
    }

    handleRentalSubmit(e) {
      e.preventDefault();
      const asset = this.state.activeModalAsset;
      if (!asset) return;

      const startDate = this.dom.rentalStartDate.value;
      const endDate = this.dom.rentalEndDate.value;
      const deliveryLocation = this.dom.rentalDeliveryAddress.value;
      const notes = this.dom.rentalNotes.value;

      const s = new Date(startDate);
      const eDate = new Date(endDate);
      const days = Math.max(1, Math.round((eDate - s) / (1000 * 60 * 60 * 24)));
      const totalAmount = days * asset.pricePerDay;

      const currentUser = this.state.currentUser || DEMO_USERS[0];

      const newRequest = {
        id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
        assetId: asset.id,
        assetTitle: asset.title,
        seekerBusiness: currentUser.businessName,
        seekerContact: currentUser.email,
        startDate: startDate,
        endDate: endDate,
        days: days,
        dailyRate: asset.pricePerDay,
        totalAmount: totalAmount,
        fulfillmentType: asset.fulfillmentType,
        deliveryLocation: deliveryLocation,
        status: 'Pending',
        notes: notes || `Direct reservation booked for ${asset.shopName} in ${asset.location}.`
      };

      // Prepend to requests
      this.state.requests.unshift(newRequest);
      this.saveRequests();

      this.closeModal(this.dom.rentalModal);

      this.showToast({
        title: 'Booking Request Transmitted!',
        message: `Reservation ${newRequest.id} dispatched to ${asset.shopName}.`,
        type: 'success'
      });

      // Refresh Provider Dashboard
      this.renderProviderDashboard();
    }

    // --- Provider Dashboard View ---
    renderProviderDashboard() {
      const requests = this.state.requests;

      // Recalculate KPIs
      const approved = requests.filter(r => r.status === 'Approved');
      const pending = requests.filter(r => r.status === 'Pending' || r.status === 'Negotiating');
      const totalRevenue = approved.reduce((sum, r) => sum + r.totalAmount, 162000);

      // Total daily fleet value
      const fleetDailyValue = this.state.inventory.reduce((sum, item) => sum + item.pricePerDay, 0);

      if (this.dom.provStatRevenue) {
        this.dom.provStatRevenue.textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
      }
      if (this.dom.provStatPending) {
        this.dom.provStatPending.textContent = `${pending.length} Request${pending.length !== 1 ? 's' : ''}`;
      }
      if (this.dom.provStatActive) {
        this.dom.provStatActive.textContent = `${approved.length + 3} Units`;
      }
      if (this.dom.provStatUtil) {
        this.dom.provStatUtil.textContent = `₹${fleetDailyValue.toLocaleString('en-IN')}/day`;
      }
      if (this.dom.requestsCounterBadge) {
        this.dom.requestsCounterBadge.textContent = `${requests.length} Total Requests`;
      }

      // Render Requests Table
      const tbody = this.dom.requestsTableBody;
      if (tbody) {
        if (requests.length === 0) {
          tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2rem;">No rental requests currently recorded.</td></tr>`;
        } else {
          tbody.innerHTML = requests.map(req => {
            const statusClass = req.status.toLowerCase();
            return `
              <tr>
                <td><span class="req-id-pill">${req.id}</span></td>
                <td>
                  <div style="max-width: 220px; font-weight: 600; color: var(--text-primary);" title="${req.assetTitle}">
                    ${this.truncate(req.assetTitle, 32)}
                  </div>
                </td>
                <td>
                  <div class="business-cell">
                    <span class="business-name">${req.seekerBusiness}</span>
                    <span class="business-contact">${req.seekerContact}</span>
                  </div>
                </td>
                <td>
                  <div style="font-size: 0.8rem; font-weight: 600;">${req.days} Day${req.days > 1 ? 's' : ''}</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted);">${req.startDate} → ${req.endDate}</div>
                </td>
                <td>
                  <strong style="color: var(--text-primary);">₹${req.totalAmount.toLocaleString('en-IN')}</strong>
                  ${req.negotiationOffer ? `<div style="font-size: 0.72rem; color: var(--accent-purple); font-weight: 600;">Counter: ₹${req.negotiationOffer.toLocaleString('en-IN')}</div>` : ''}
                </td>
                <td>
                  <span style="font-size: 0.75rem; font-weight: 500;">${req.fulfillmentType}</span>
                </td>
                <td>
                  <span class="status-badge ${statusClass}">${req.status}</span>
                </td>
                <td style="text-align: right;">
                  <div class="table-actions-group" style="justify-content: flex-end;">
                    ${req.status !== 'Approved' ? `
                      <button class="btn-table-action btn-accept" data-action="accept" data-id="${req.id}" title="Accept Booking">Accept</button>
                    ` : ''}
                    ${req.status !== 'Approved' && req.status !== 'Rejected' ? `
                      <button class="btn-table-action btn-negotiate" data-action="negotiate" data-id="${req.id}" title="Send Counter-Offer">Negotiate</button>
                      <button class="btn-table-action btn-reject" data-action="reject" data-id="${req.id}" title="Decline Request">Reject</button>
                    ` : ''}
                    ${req.status === 'Approved' ? `
                      <span style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 700;">✓ Confirmed</span>
                    ` : ''}
                  </div>
                </td>
              </tr>
            `;
          }).join('');

          // Bind table action clicks
          tbody.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
              const action = e.currentTarget.dataset.action;
              const reqId = e.currentTarget.dataset.id;
              this.handleTableAction(action, reqId);
            });
          });
        }
      }

      // Render Provider Registered Inventory Fleet
      const invTbody = this.dom.providerInventoryTableBody;
      if (invTbody) {
        invTbody.innerHTML = this.state.inventory.map(item => `
          <tr>
            <td><span class="req-id-pill">${item.id.toUpperCase()}</span></td>
            <td><strong>${item.title}</strong></td>
            <td><span class="brand-badge">${item.category}</span></td>
            <td><strong>${item.shopName}</strong></td>
            <td><span style="font-size: 0.75rem; color: var(--text-secondary);">${item.vendorType}</span></td>
            <td><span class="store-location-badge"><i data-lucide="map-pin" style="width:0.75rem;height:0.75rem;"></i>${item.location}</span></td>
            <td><span class="fulfillment-badge ${item.fulfillmentType === 'Site Delivery' ? 'fulfillment-delivery' : 'fulfillment-pickup'}">${item.fulfillmentType}</span></td>
            <td><strong>₹${item.pricePerDay.toLocaleString('en-IN')}</strong> / day</td>
            <td><span class="status-badge ${item.availabilityStatus === 'Available' ? 'approved' : 'pending'}">${item.availabilityStatus}</span></td>
          </tr>
        `).join('');
      }

      this.refreshIcons();
    }

    handleTableAction(action, reqId) {
      const req = this.state.requests.find(r => r.id === reqId);
      if (!req) return;

      if (action === 'accept') {
        req.status = 'Approved';
        this.saveRequests();
        this.renderProviderDashboard();
        this.showToast({
          title: 'Booking Accepted',
          message: `Request ${req.id} for ${req.seekerBusiness} confirmed. Site dispatch notified.`,
          type: 'success'
        });
      } else if (action === 'reject') {
        req.status = 'Rejected';
        this.saveRequests();
        this.renderProviderDashboard();
        this.showToast({
          title: 'Request Declined',
          message: `Request ${req.id} marked as declined.`,
          type: 'warning'
        });
      } else if (action === 'negotiate') {
        this.openNegotiateModal(req);
      }
    }

    // --- Negotiation Modal ---
    openNegotiateModal(req) {
      this.state.activeNegotiatingReq = req;
      this.dom.negReqId.textContent = `Counter-offer for ${req.id}`;
      this.dom.negTargetId.value = req.id;
      this.dom.negCounterPrice.value = Math.round(req.totalAmount * 0.9);

      this.dom.negDetailsBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
          <span>Asset:</span> <strong>${req.assetTitle}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
          <span>Requester:</span> <strong>${req.seekerBusiness}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Current Contract Value:</span> <strong>₹${req.totalAmount.toLocaleString('en-IN')}</strong>
        </div>
      `;

      this.openModal(this.dom.negotiateModal);
    }

    handleNegotiateSubmit(e) {
      e.preventDefault();
      const req = this.state.activeNegotiatingReq;
      if (!req) return;

      const counterPrice = parseFloat(this.dom.negCounterPrice.value);
      const counterMsg = this.dom.negCounterMessage.value;

      req.status = 'Negotiating';
      req.negotiationOffer = counterPrice;
      req.notes = `${req.notes} [Counter-Offer Sent: ₹${counterPrice.toLocaleString('en-IN')} - ${counterMsg}]`;

      this.saveRequests();
      this.closeModal(this.dom.negotiateModal);
      this.renderProviderDashboard();

      this.showToast({
        title: 'Counter-Offer Transmitted',
        message: `Proposed ₹${counterPrice.toLocaleString('en-IN')} to ${req.seekerBusiness}.`,
        type: 'info'
      });
    }

    // --- Add New Asset Modal (Provider) ---
    handleListAssetSubmit(e) {
      e.preventDefault();
      const title = document.getElementById('asset-name').value;
      const category = document.getElementById('asset-category').value;
      const shopName = document.getElementById('asset-shop').value;
      const vendorType = document.getElementById('asset-vendor-type').value;
      const location = document.getElementById('asset-location').value;
      const fulfillment = document.getElementById('asset-fulfillment').value;
      const rate = parseInt(document.getElementById('asset-rate').value, 10);
      const status = document.getElementById('asset-status').value;
      const imgUrl = document.getElementById('asset-image').value;

      const newAsset = {
        id: `mmr-${String(this.state.inventory.length + 1).padStart(2, '0')}`,
        title: title,
        category: category,
        shopName: shopName,
        vendorType: vendorType,
        location: location,
        fulfillmentType: fulfillment,
        pricePerDay: rate,
        availabilityStatus: status,
        image: imgUrl || VERIFIED_FALLBACK_IMAGES[category] || VERIFIED_FALLBACK_IMAGES["Venue"]
      };

      this.state.inventory.unshift(newAsset);
      this.saveInventory();

      this.closeModal(this.dom.listAssetModal);
      this.dom.formListAsset.reset();

      this.showToast({
        title: 'MMR Asset Listed!',
        message: `${newAsset.title} is now active in the Seeker Marketplace.`,
        type: 'success'
      });

      this.renderCategoryPills();
      this.renderMarketplaceListings();
      this.renderProviderDashboard();
    }

    // --- Quick View Modal ---
    openQuickViewModal(assetId) {
      const asset = this.state.inventory.find(item => item.id === assetId);
      if (!asset) return;

      this.state.activeModalAsset = asset;
      this.dom.qvTitle.textContent = asset.title;

      const safeImageUrl = getSafeImageUrl(asset.image, asset.category);

      this.dom.qvContent.innerHTML = `
        <div style="border-radius: 8px; overflow: hidden; aspect-ratio: 16 / 9; margin-bottom: 1rem;">
          <img 
            src="${safeImageUrl}" 
            alt="${asset.title}" 
            style="width: 100%; height: 100%; object-fit: cover;"
            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80';"
          >
        </div>

        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.75rem;">
          <div>
            <span class="brand-badge">${asset.category}</span>
            <span class="status-badge ${asset.availabilityStatus === 'Available' ? 'approved' : 'pending'}" style="margin-left: 0.5rem;">${asset.availabilityStatus}</span>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary);">₹${asset.pricePerDay.toLocaleString('en-IN')}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">per calendar day (${asset.fulfillmentType})</div>
          </div>
        </div>

        <div style="background-color: var(--bg-secondary); padding: 0.9rem; border-radius: var(--radius-md); margin-bottom: 1rem;">
          <h4 style="font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-primary);">MMR Vendor &amp; Facility</h4>
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary);">${asset.shopName}</div>
          <div style="font-size: 0.78rem; color: var(--accent-primary); font-weight: 600;">${asset.vendorType}</div>
        </div>

        <div style="border: 1px solid var(--border-subtle); padding: 0.9rem; border-radius: var(--radius-md);">
          <h4 style="font-size: 0.85rem; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
            <i data-lucide="map-pin" style="width: 1rem; height: 1rem; color: var(--accent-rose);"></i>
            <span>MMR Operational Location</span>
          </h4>
          <div style="font-size: 0.88rem; color: var(--text-primary); font-weight: 600;">${asset.location}</div>
          <div style="display: flex; gap: 0.5rem; margin-top: 0.6rem; align-items: center;">
            <span class="fulfillment-badge ${asset.fulfillmentType === 'Site Delivery' ? 'fulfillment-delivery' : 'fulfillment-pickup'}">
              ${asset.fulfillmentType}
            </span>
            <span class="coordinates-tag">Asset ID: ${asset.id.toUpperCase()}</span>
          </div>
        </div>
      `;

      this.openModal(this.dom.quickviewModal);
      this.refreshIcons();
    }

    // --- Modal Helpers ---
    openModal(modalEl) {
      if (!modalEl) return;
      modalEl.classList.add('active');
      modalEl.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      this.refreshIcons();
    }

    closeModal(modalEl) {
      if (!modalEl) return;
      modalEl.classList.remove('active');
      modalEl.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // --- Toast Notification Engine ---
    showToast({ title, message, type = 'info' }) {
      if (!this.dom.toastContainer) return;
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;

      let iconName = 'info';
      if (type === 'success') iconName = 'check-circle';
      if (type === 'warning') iconName = 'alert-triangle';

      toast.innerHTML = `
        <div class="toast-icon">
          <i data-lucide="${iconName}"></i>
        </div>
        <div class="toast-content">
          <span class="toast-title">${title}</span>
          <span class="toast-message">${message}</span>
        </div>
      `;

      this.dom.toastContainer.appendChild(toast);
      this.refreshIcons();

      setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }

    truncate(str, max = 30) {
      if (!str) return '';
      return str.length > max ? str.slice(0, max) + '…' : str;
    }

    refreshIcons() {
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }
  }

  // Universal DOM ready bootstrap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.hospitaLinkApp = new HospitaLinkApp();
    });
  } else {
    window.hospitaLinkApp = new HospitaLinkApp();
  }
})();
