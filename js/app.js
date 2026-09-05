/**
 * B2B Hospitality Resource Exchange - Main Application Controller
 * Universal ES script: Theme toggling, authentication, live store/location schema,
 * rental calculator, and provider dashboard.
 */

(function() {
  'use strict';

  // Read data from window globals (populated by js/data.js)
  const STORE_HUBS = window.STORE_HUBS || [];
  const CATEGORIES = window.CATEGORIES || [];
  const BUSINESS_TYPES = window.BUSINESS_TYPES || [];
  const INITIAL_INVENTORY = window.INITIAL_INVENTORY || [];
  const INITIAL_REQUESTS = window.INITIAL_REQUESTS || [];
  const DEMO_USERS = window.DEMO_USERS || [];

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
        selectedStore: 'all',
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
      if (!localStorage.getItem('hospitalink_inventory')) {
        localStorage.setItem('hospitalink_inventory', JSON.stringify(INITIAL_INVENTORY));
      }
      if (!localStorage.getItem('hospitalink_requests')) {
        localStorage.setItem('hospitalink_requests', JSON.stringify(INITIAL_REQUESTS));
      }
    }

    loadInventory() {
      try {
        const stored = localStorage.getItem('hospitalink_inventory');
        return stored ? JSON.parse(stored) : INITIAL_INVENTORY;
      } catch {
        return INITIAL_INVENTORY;
      }
    }

    saveInventory() {
      localStorage.setItem('hospitalink_inventory', JSON.stringify(this.state.inventory));
    }

    loadRequests() {
      try {
        const stored = localStorage.getItem('hospitalink_requests');
        return stored ? JSON.parse(stored) : INITIAL_REQUESTS;
      } catch {
        return INITIAL_REQUESTS;
      }
    }

    saveRequests() {
      localStorage.setItem('hospitalink_requests', JSON.stringify(this.state.requests));
    }

    loadCurrentUser() {
      try {
        const stored = localStorage.getItem('hospitalink_current_user');
        return stored ? JSON.parse(stored) : DEMO_USERS[0]; // Default to Grand Palace
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
      this.populateStaticDropdowns();
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
      this.dom.filterStore = document.getElementById('filter-store');
      this.dom.filterFulfillment = document.getElementById('filter-fulfillment');
      this.dom.sortSelect = document.getElementById('sort-select');
      this.dom.btnResetFilters = document.getElementById('btn-reset-filters');
      this.dom.categoryPillsContainer = document.getElementById('category-pills-container');
      this.dom.resultsCountText = document.getElementById('results-count-text');
      this.dom.listingsGrid = document.getElementById('listings-grid');
      this.dom.metricListingsCount = document.getElementById('metric-listings-count');

      // Rental Modal
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

      // List Asset Modal
      this.dom.listAssetModal = document.getElementById('list-asset-modal');
      this.dom.btnCloseList = document.getElementById('btn-close-list');
      this.dom.btnCancelList = document.getElementById('btn-cancel-list');
      this.dom.formListAsset = document.getElementById('form-list-asset');
      this.dom.assetStore = document.getElementById('asset-store');

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

      // Toast Container
      this.dom.toastContainer = document.getElementById('toast-container');
      this.dom.footerHubs = document.getElementById('footer-hubs');
    }

    // --- Dynamic Dropdown Population ---
    populateStaticDropdowns() {
      // Store Hub Dropdowns
      const hubOptions = STORE_HUBS.map(
        hub => `<option value="${hub.name}">${hub.name} (${hub.city})</option>`
      ).join('');

      if (this.dom.filterStore) {
        this.dom.filterStore.innerHTML = `<option value="all">All Regional Store Hubs</option>` + hubOptions;
      }
      if (this.dom.assetStore) {
        this.dom.assetStore.innerHTML = hubOptions;
      }
      if (this.dom.regHub) {
        this.dom.regHub.innerHTML = hubOptions;
      }

      // Business Types
      if (this.dom.regBizType) {
        this.dom.regBizType.innerHTML = BUSINESS_TYPES.map(
          type => `<option value="${type}">${type}</option>`
        ).join('');
      }

      // Footer Hubs
      if (this.dom.footerHubs) {
        this.dom.footerHubs.innerHTML = STORE_HUBS.map(
          hub => `<span class="footer-hub-chip">${hub.name} (${hub.coordinates.lat.toFixed(2)}, ${hub.coordinates.lng.toFixed(2)})</span>`
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

      this.dom.filterStore?.addEventListener('change', (e) => {
        this.state.selectedStore = e.target.value;
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

      // Rental Modal Events
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
      
      // Update theme toggle icon
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
      const hub = document.getElementById('reg-hub').value;
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
          this.renderCategoryPills();
          this.renderMarketplaceListings();
        });
      });
    }

    // --- Marketplace Listings ---
    filterListings() {
      return this.state.inventory.filter(item => {
        // Category match
        if (this.state.activeCategory !== 'all' && item.category !== this.state.activeCategory) {
          return false;
        }
        // Store Hub match
        if (this.state.selectedStore !== 'all' && item.storeName !== this.state.selectedStore) {
          return false;
        }
        // Fulfillment match
        if (this.state.selectedFulfillment !== 'all') {
          if (item.fulfillmentType !== 'Both Available' && item.fulfillmentType !== this.state.selectedFulfillment) {
            return false;
          }
        }
        // Search query match
        if (this.state.searchQuery) {
          const q = this.state.searchQuery;
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchSpecs = item.specs.toLowerCase().includes(q);
          const matchCity = item.city.toLowerCase().includes(q);
          const matchStore = item.storeName.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchSpecs && !matchCity && !matchStore) {
            return false;
          }
        }
        return true;
      }).sort((a, b) => {
        if (this.state.sortBy === 'price-asc') return a.pricePerDay - b.pricePerDay;
        if (this.state.sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay;
        if (this.state.sortBy === 'rating') return (b.provider?.rating || 0) - (a.provider?.rating || 0);
        return 0; // default featured
      });
    }

    renderMarketplaceListings() {
      const grid = this.dom.listingsGrid;
      if (!grid) return;

      const items = this.filterListings();

      // Update Results Meta
      if (this.dom.resultsCountText) {
        this.dom.resultsCountText.innerHTML = `Showing <strong class="results-count">${items.length}</strong> of ${this.state.inventory.length} commercial assets`;
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
            <h3>No matching commercial equipment found</h3>
            <p>Try resetting filters or adjusting search keywords to find available catering and banquet equipment.</p>
            <button class="reset-filters-btn" id="btn-empty-reset">Reset All Filters</button>
          </div>
        `;
        document.getElementById('btn-empty-reset')?.addEventListener('click', () => this.resetFilters());
        this.refreshIcons();
        return;
      }

      grid.innerHTML = items.map(item => {
        const fulfillmentClass = item.fulfillmentType === 'Direct Site Delivery' 
          ? 'fulfillment-delivery' 
          : item.fulfillmentType === 'In-Store Pickup' 
          ? 'fulfillment-pickup' 
          : 'fulfillment-both';

        const fulfillmentIcon = item.fulfillmentType === 'Direct Site Delivery'
          ? 'truck'
          : item.fulfillmentType === 'In-Store Pickup'
          ? 'map-pin'
          : 'check-check';

        return `
          <article class="asset-card" data-id="${item.id}">
            <div class="card-media">
              <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80'">
              <span class="card-category-badge">${item.category}</span>
              <span class="card-status-pill ${item.status === 'Reserved' ? 'reserved' : ''}">${item.status === 'Available' ? 'Available Now' : 'Reserved'}</span>
            </div>

            <div class="card-body">
              <div class="card-provider-row">
                <span class="provider-info">
                  <i data-lucide="shield-check" class="verified-icon" style="width: 0.95rem; height: 0.95rem;"></i>
                  <span>${item.provider?.name || 'Verified Enterprise Partner'}</span>
                </span>
                <span class="provider-rating">★ ${item.provider?.rating?.toFixed(1) || '4.9'}</span>
              </div>

              <h3 class="card-title" title="${item.title}">${item.title}</h3>
              <div class="card-specs" title="${item.specs}">${item.specs}</div>

              <div class="card-location-row">
                <span class="store-location-badge">
                  <i data-lucide="map-pin" style="width: 0.88rem; height: 0.88rem;"></i>
                  <span>${item.storeName} • <strong>${item.city}</strong></span>
                </span>
                <div style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap;">
                  <span class="coordinates-tag" title="GPS Coordinates">
                    [${item.coordinates.lat.toFixed(4)}, ${item.coordinates.lng.toFixed(4)}]
                  </span>
                  <span class="fulfillment-badge ${fulfillmentClass}">
                    <i data-lucide="${fulfillmentIcon}" style="width: 0.75rem; height: 0.75rem;"></i>
                    <span>${item.fulfillmentType}</span>
                  </span>
                </div>
              </div>

              <div class="card-footer">
                <div class="price-box">
                  <span class="price-amount">₹${item.pricePerDay.toLocaleString('en-IN')}</span>
                  <span class="price-period">per calendar day</span>
                </div>
                <div class="card-actions">
                  <button class="btn-quickview" data-quickview="${item.id}" title="Quick View & GPS Info">
                    <i data-lucide="eye" style="width: 1rem; height: 1rem;"></i>
                  </button>
                  <button class="btn-request-rent" data-rent="${item.id}">
                    Request Rent
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
      this.state.selectedStore = 'all';
      this.state.selectedFulfillment = 'all';
      this.state.sortBy = 'featured';

      if (this.dom.searchInput) this.dom.searchInput.value = '';
      if (this.dom.filterStore) this.dom.filterStore.value = 'all';
      if (this.dom.filterFulfillment) this.dom.filterFulfillment.value = 'all';
      if (this.dom.sortSelect) this.dom.sortSelect.value = 'featured';

      this.renderCategoryPills();
      this.renderMarketplaceListings();
      this.showToast({
        title: 'Filters Cleared',
        message: 'Showing all regional commercial inventory.',
        type: 'info'
      });
    }

    // --- Rental Request Modal & Live Calculation ---
    openRentalModal(assetId) {
      const asset = this.state.inventory.find(item => item.id === assetId);
      if (!asset) return;

      this.state.activeModalAsset = asset;
      this.dom.rentalAssetId.value = asset.id;

      // Set today + tomorrow as default range
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

      // Populate asset preview card
      this.dom.rentalAssetSummary.innerHTML = `
        <img src="${asset.image}" style="width: 60px; height: 60px; border-radius: 6px; object-fit: cover;" alt="${asset.title}">
        <div style="flex: 1; display: flex; flex-direction: column; gap: 0.2rem;">
          <strong style="font-size: 0.9rem; color: var(--text-primary);">${asset.title}</strong>
          <span style="font-size: 0.75rem; color: var(--text-secondary);">
            ${asset.storeName} • ₹${asset.pricePerDay.toLocaleString('en-IN')}/day • ${asset.fulfillmentType}
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
      const deposit = asset.deposit;
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
        deposit: asset.deposit,
        fulfillmentType: asset.fulfillmentType,
        deliveryLocation: deliveryLocation,
        status: 'Pending',
        notes: notes || 'Direct booking transmitted via HospitaLink Exchange.'
      };

      // Prepend to requests
      this.state.requests.unshift(newRequest);
      this.saveRequests();

      this.closeModal(this.dom.rentalModal);

      this.showToast({
        title: 'Rental Request Submitted!',
        message: `Request ${newRequest.id} dispatched to ${asset.provider?.name || 'Equipment Provider'}.`,
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
      const totalRevenue = approved.reduce((sum, r) => sum + r.totalAmount, 168000); // base + new

      if (this.dom.provStatRevenue) {
        this.dom.provStatRevenue.textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
      }
      if (this.dom.provStatPending) {
        this.dom.provStatPending.textContent = `${pending.length} Request${pending.length !== 1 ? 's' : ''}`;
      }
      if (this.dom.provStatActive) {
        this.dom.provStatActive.textContent = `${approved.length + 2} Units`;
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
                  <div style="max-width: 240px; font-weight: 600; color: var(--text-primary);" title="${req.assetTitle}">
                    ${this.truncate(req.assetTitle, 35)}
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
            <td><span class="req-id-pill">${item.id}</span></td>
            <td><strong>${item.title}</strong></td>
            <td><span class="brand-badge">${item.category}</span></td>
            <td>${item.storeName} (${item.city})</td>
            <td><span class="coordinates-tag">${item.coordinates.lat.toFixed(4)}, ${item.coordinates.lng.toFixed(4)}</span></td>
            <td>${item.fulfillmentType}</td>
            <td><strong>₹${item.pricePerDay.toLocaleString('en-IN')}</strong> / day</td>
            <td><span class="status-badge ${item.status === 'Available' ? 'approved' : 'pending'}">${item.status}</span></td>
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
      this.dom.negCounterPrice.value = Math.round(req.totalAmount * 0.9); // default 10% discount suggestion

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

    // --- List New Asset Modal (Provider) ---
    handleListAssetSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('asset-name').value;
      const category = document.getElementById('asset-category').value;
      const storeName = document.getElementById('asset-store').value;
      const rate = parseInt(document.getElementById('asset-rate').value, 10);
      const deposit = parseInt(document.getElementById('asset-deposit').value, 10);
      const fulfillment = document.getElementById('asset-fulfillment').value;
      const status = document.getElementById('asset-status').value;
      const specs = document.getElementById('asset-specs').value;
      const desc = document.getElementById('asset-desc').value;
      const imgUrl = document.getElementById('asset-image').value;

      const selectedHub = STORE_HUBS.find(h => h.name === storeName) || STORE_HUBS[0];

      const currentUser = this.state.currentUser || DEMO_USERS[0];

      const newAsset = {
        id: `AST-${this.state.inventory.length + 101}`,
        title: name,
        category: category,
        description: desc,
        storeName: storeName,
        city: selectedHub.city,
        coordinates: { lat: selectedHub.coordinates.lat, lng: selectedHub.coordinates.lng },
        fulfillmentType: fulfillment,
        pricePerDay: rate,
        deposit: deposit,
        specs: specs,
        status: status,
        provider: {
          name: currentUser.businessName,
          rating: 5.0,
          verified: true,
          dealsCompleted: 1
        },
        image: imgUrl
      };

      this.state.inventory.unshift(newAsset);
      this.saveInventory();

      this.closeModal(this.dom.listAssetModal);
      this.dom.formListAsset.reset();

      this.showToast({
        title: 'Commercial Asset Listed!',
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

      const hub = STORE_HUBS.find(h => h.name === asset.storeName) || STORE_HUBS[0];

      this.dom.qvContent.innerHTML = `
        <div style="border-radius: var(--radius-md); overflow: hidden; max-height: 240px; margin-bottom: 1rem;">
          <img src="${asset.image}" alt="${asset.title}" style="width: 100%; height: 240px; object-fit: cover;">
        </div>

        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.75rem;">
          <div>
            <span class="brand-badge">${asset.category}</span>
            <span class="status-badge approved" style="margin-left: 0.5rem;">${asset.status}</span>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary);">₹${asset.pricePerDay.toLocaleString('en-IN')}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">per day + ₹${asset.deposit.toLocaleString('en-IN')} refundable deposit</div>
          </div>
        </div>

        <div style="margin-bottom: 1rem;">
          <h4 style="font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-primary);">Description &amp; Condition</h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">${asset.description}</p>
        </div>

        <div style="background-color: var(--bg-secondary); padding: 0.9rem; border-radius: var(--radius-md); margin-bottom: 1rem;">
          <h4 style="font-size: 0.85rem; margin-bottom: 0.5rem; color: var(--text-primary);">Technical Specifications</h4>
          <div style="font-size: 0.82rem; color: var(--text-secondary); font-family: monospace;">${asset.specs}</div>
        </div>

        <div style="border: 1px solid var(--border-subtle); padding: 0.9rem; border-radius: var(--radius-md);">
          <h4 style="font-size: 0.85rem; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
            <i data-lucide="map-pin" style="width: 1rem; height: 1rem; color: var(--accent-rose);"></i>
            <span>Physical Store Location &amp; Logistics Hub</span>
          </h4>
          <div style="font-size: 0.82rem; color: var(--text-primary); font-weight: 600;">${hub.name} (${hub.city})</div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.15rem;">${hub.address}</div>
          <div style="display: flex; gap: 0.5rem; margin-top: 0.6rem; align-items: center;">
            <span class="coordinates-tag">GPS: ${hub.coordinates.lat.toFixed(5)}, ${hub.coordinates.lng.toFixed(5)}</span>
            <a href="https://maps.google.com/?q=${hub.coordinates.lat},${hub.coordinates.lng}" target="_blank" rel="noopener noreferrer" style="font-size: 0.75rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">
              Open Map Pin <i data-lucide="external-link" style="width: 0.75rem; height: 0.75rem;"></i>
            </a>
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

    // --- Utility Helpers ---
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

  // Instantiate application
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.hospitaLinkApp = new HospitaLinkApp();
    });
  } else {
    window.hospitaLinkApp = new HospitaLinkApp();
  }
})();
