# Event Ticketing Platform - Design Guidelines

## Design Approach: Reference-Based (E-commerce/Booking Hybrid)

**Primary Inspiration:** Eventbrite (event browsing), Airbnb (search/discovery), Stripe Dashboard (admin), Apple (clean aesthetics)

**Key Principle:** Create a dual-personality interface - professional admin tools with streamlined utility, and engaging customer experience with visual appeal and trust-building elements.

---

## Core Design Elements

### A. Color Palette

**Customer Interface (Light Mode):**
- Primary: 262 80% 50% (vibrant purple/blue - trust and excitement)
- Accent: 142 70% 45% (green for success states, "Buy Tickets")
- Background: 0 0% 98% (soft white)
- Surface: 0 0% 100% (pure white cards)
- Text Primary: 220 15% 20%
- Text Secondary: 220 10% 50%

**Customer Interface (Dark Mode):**
- Primary: 262 70% 60%
- Accent: 142 60% 50%
- Background: 220 15% 10%
- Surface: 220 12% 15%
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 65%

**Admin Dashboard:**
- Primary: 220 80% 55% (professional blue)
- Accent: 30 90% 55% (amber for warnings/alerts)
- Background: 220 15% 96%
- Surface: 0 0% 100%
- Success: 142 70% 45%
- Error: 0 70% 50%

### B. Typography

**Font Families:**
- Headings: 'Inter' (600-700 weight) - modern, readable
- Body: 'Inter' (400-500 weight)
- Accent/Display: 'Playfair Display' (600 weight) for event names in customer view

**Scale:**
- Hero Headlines: text-5xl to text-6xl (customer), text-3xl (admin)
- Section Headers: text-3xl to text-4xl
- Card Titles: text-xl to text-2xl
- Body: text-base to text-lg
- Labels/Meta: text-sm

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 (p-2, m-4, gap-6, h-8, py-12, etc.)

**Grid System:**
- Event Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Admin Tables: Single column responsive tables with horizontal scroll on mobile
- Venue Zones: grid-cols-2 lg:grid-cols-4 for zone selection
- Cart Items: Single column layout with summary sidebar

**Container Widths:**
- Customer Pages: max-w-7xl
- Admin Dashboard: max-w-full with sidebar
- Content Areas: max-w-6xl
- Forms: max-w-2xl

### D. Component Library

**Customer Interface:**

*Navigation:* Fixed header with logo left, search bar center, cart/account icons right. Sticky on scroll with shadow.

*Hero Section:* Full-width 70vh hero with background image (live event atmosphere), search bar overlay, "Featured Events" headline with gradient text effect.

*Event Cards:* Elevated cards with event image (16:9 ratio), overlay gradient bottom with event name, date/time, venue, price from badge, "Get Tickets" CTA. Hover: lift effect with increased shadow.

*Search/Filter Bar:* Horizontal filters (Category dropdown, Date picker, Location input, Price range slider) with "Search" button. Collapsible on mobile.

*Event Detail Page:* Hero image, breadcrumb navigation, title section, tabs for (Overview, Zones & Tickets, Add-ons), zone selector with visual layout, quantity controls, add to cart sticky footer.

*Seat/Zone Selector:* Visual venue map with clickable zones, color-coded availability (available/limited/sold out), tooltips showing zone names and prices.

*Shopping Cart:* Slide-over panel from right, itemized list with thumbnails, quantity adjusters, remove buttons, subtotal/total, "Proceed to Checkout" CTA.

*QR Ticket Display:* Centered large QR code, event details above, ticket ID below, "Save to Wallet" and "Share" buttons, printable layout.

**Admin Dashboard:**

*Sidebar Navigation:* Fixed left sidebar (260px) with logo top, menu items with icons, collapsed state on mobile (hamburger).

*Menu Structure:* Dashboard, Events (Create, Manage, Analytics), Venues, Products (Food, Services), Orders, Settings.

*Data Tables:* Striped rows, sortable headers, action dropdown per row, bulk actions checkbox, pagination bottom, search/filter top.

*Event Creation Form:* Multi-step wizard (1. Basic Info, 2. Venue & Zones, 3. Media, 4. Products, 5. Review), progress indicator top, save draft option.

*Image Upload:* Drag-and-drop zones, thumbnail preview grid, crop/rotate tools, multiple image support with reordering.

*Venue Zone Manager:* Visual builder to add zones, name input, capacity input, pricing fields, seated/general toggle, zone color picker.

*Analytics Cards:* Grid of metric cards (Total Sales, Tickets Sold, Upcoming Events, Revenue), line charts for trends, recent orders table.

### E. Interactions & Animations

**Minimal Animation Approach:**
- Card hovers: Subtle lift (translateY: -4px) + shadow increase (200ms ease)
- Button states: Scale 0.98 on active
- Page transitions: Fade in content (300ms)
- Cart slide-in: translateX animation (250ms ease-out)
- QR code reveal: Scale from 0.95 to 1 (400ms cubic-bezier)

**NO complex scroll animations, parallax effects, or decorative motions**

---

## Images

**Hero Section:** Large atmospheric image (1920x800px minimum) showing diverse crowd at live event - vibrant, energetic, inclusive. Overlay: dark gradient bottom to top (opacity 0.7 to 0).

**Event Cards:** Each event requires 16:9 thumbnail (800x450px) - venue/performance/atmosphere shots.

**Event Detail Pages:** 2-3 high-quality images in gallery format showing venue interior, stage view, crowd perspective.

**Admin Interface:** Icon-based, no decorative images. Product thumbnails (200x200px) for food/merchandise items.

---

## Platform-Specific Notes

**Customer Experience Priority:** Visual storytelling through images, effortless search/browse, one-click add to cart, trust signals (secure checkout badges, venue capacity indicators).

**Admin Efficiency Priority:** Quick event creation, bulk management tools, clear data visualization, keyboard shortcuts for power users.

**Responsive Breakpoints:** Mobile-first approach, critical breakpoints at 640px (sm), 768px (md), 1024px (lg), 1280px (xl).

**Accessibility:** WCAG 2.1 AA compliance, keyboard navigation throughout, screen reader optimized labels, high contrast mode support, QR codes include alternative ticket number.