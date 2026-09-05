# HospitaLink B2B — Enterprise Hospitality Resource Exchange

A modern, enterprise-grade web prototype for commercial hospitality resource sharing. Built for hotels, caterers, banquet venues, and event production enterprises across Mumbai and Thane metropolitan hubs.

---

## 🌟 Key Capabilities & Architectural Highlights

### 1. Design System & Sophisticated Styling
- **Enterprise Typography**: Uses **Plus Jakarta Sans** for headings and **Inter** for UI data density and readability.
- **Theme Switcher (Light & Deep Dark Mode)**: 
  - One-click global toggle in the header with a sun/moon micro-animation.
  - Built on CSS custom variables (`--bg-primary`, `--text-primary`, `--card-bg`, `--accent-primary`, etc.) providing seamless switching between a crisp Light Mode and a deep, low-contrast Slate/Obsidian Dark Mode.
  - Persisted in `localStorage`.
- **Visual Polish**: Balanced `8px–14px` border radius, subtle multi-tier drop shadows, and clean category/status badges.

### 2. Authentication & Header Architecture
- **Navigation**: Brand insignia, view mode switcher (Seeker Marketplace vs. Provider Dashboard), Theme Toggle, and dynamic Auth status.
- **Enterprise Auth Modal**: 
  - Clean tabbed overlay for **Sign In** and **Register Organization**.
  - Dropdown for business types: *Hotel & Resort, Catering Enterprise, Banquet Venue, Event Planner & Production, Cloud Kitchen Network, Institutional Kitchen*.
  - **1-Click Quick Demo Login**: Pre-populated accounts (e.g. *The Grand Palace Hotel & Suites*, *Apex Culinary & Banquet Ops*) for instant hackathon demonstrations.
  - Updates navbar state with avatar, verified badge, and clean sign-out capabilities.

### 3. Expandable Live Location & Store Schema
Central data structure in `js/data.js` with geographic metadata:
- `storeName`: e.g. *Grand Palace Central Hub*, *BKC Commercial Depot*, *Andheri North Logistics Base*, *Thane Regional Center*, *Vashi Harbor Depot*.
- `city`: Regional metropolitan coverage across Mumbai South, BKC, Andheri East, Thane, and Navi Mumbai.
- `coordinates`: `{ lat: 18.9220, lng: 72.8347 }` enabling live distance calculation, coordinate tags, and Google Maps pin integration.
- `fulfillmentType`: *Direct Site Delivery* | *In-Store Pickup* | *Both Available*.

### 4. Structured Sections & UI Views
- **Hero & Live Metric Bar**: 4 real-time KPI counters tracking active commercial assets, verified enterprise partners, saved capital expenditure, and dispatch speed.
- **Seeker Marketplace**:
  - **Search & Multi-Filter Bar**: Real-time keyword search, category pills with count badges, store hub filter, fulfillment filter, and sort selector.
  - **Listing Cards**: High-res imagery, provider rating, store hub badge with coordinates, daily pricing, quick-view specs, and "Request Rent" triggers.
  - **Rental Request Modal**: Dynamic date-range calculator that computes rental days, base rate, refundable security deposit, 5% B2B platform insurance, and total amount. Submitting immediately dispatches the booking to the Provider's pipeline!
- **Provider Dashboard**:
  - **Stat Cards**: Total Revenue Generated, Pending Requests, Active Rentals, Fleet Utilization.
  - **"List New Asset" Form**: Enterprise form with auto hub coordinate mapping, pricing, specifications, and preset image selectors.
  - **Request Management Table**: Live pipeline of booking requests with **Accept** (green), **Reject** (red), and **Negotiate** (counter-offer dialog with custom price and notes).

### 5. Interactions & Feedback
- Floating toast notification engine with success, info, and warning states.
- Fully modular, zero-dependency vanilla ES architecture. Works directly in any browser with zero build steps or npm installations.

---

## 🚀 How to Run

### Option 1: Direct File Launch (No server required)
Double-click `index.html` in Windows Explorer or open it in any modern browser (Chrome, Edge, Firefox).

### Option 2: Local Web Server
Run the included batch script:
```cmd
run_demo.bat
```
Or run using Python / Node:
```bash
python -m http.server 8080
# Or
npx serve .
```
Then navigate to `http://localhost:8080`.

---

## 📁 Project Structure
```
pillai hackathon/
├── index.html       # Semantic HTML5 layout, modals, tables, and views
├── styles.css       # Enterprise design system tokens, Light/Dark themes, responsive grids
├── js/
│   ├── data.js      # Central store hubs, geo-coordinates, categories, inventory, and requests
│   └── app.js       # Reactive state controller, filters, calculation engine, modals, toasts
├── run_demo.bat     # 1-click Windows launcher
└── package.json     # Node module metadata & launch scripts
```
