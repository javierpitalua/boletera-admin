# Event Ticketing Platform

## Overview

This is a comprehensive event ticketing platform built with React, Express, TypeScript, and PostgreSQL. The system serves two primary user types: coordinators who manage events and customers who browse and purchase tickets. The platform handles event creation, multi-zone pricing, ticket reservations, coupon management, shopping cart functionality, and payment processing through Stripe integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool

**UI Component System**: 
- Shadcn/ui components built on Radix UI primitives
- Tailwind CSS for styling with a custom design system
- Theme support (light/dark mode) via ThemeProvider context
- Responsive design following e-commerce/booking hybrid patterns inspired by Eventbrite and Airbnb

**Routing**: 
- Wouter for client-side routing
- Main routes include coordinator dashboard, event preview, customer home, event details, checkout, and order confirmation

**State Management**:
- React Context API for global state (AuthContext, CartContext, ThemeContext)
- TanStack Query (React Query) for server state management
- Local component state with useState hooks

**Key Design Patterns**:
- Component composition with reusable UI primitives
- Context providers for cross-cutting concerns (auth, cart, theme)
- Custom hooks for shared logic (use-toast, use-mobile)
- Separation of concerns between customer-facing and admin/coordinator interfaces

### Backend Architecture

**Server Framework**: Express.js with TypeScript

**API Design**: RESTful API architecture with `/api` prefix for all application routes

**Middleware Stack**:
- JSON and URL-encoded body parsing
- Request logging with timing information
- Error handling middleware
- Session management with connect-pg-simple (PostgreSQL-backed sessions)

**Development Setup**:
- Vite integration for HMR in development
- Custom logger for request tracking
- Automatic error overlay in development

### Database Architecture

**ORM**: Drizzle ORM for type-safe database operations

**Database**: PostgreSQL via Neon serverless driver (@neondatabase/serverless)

**Schema Design** (from shared/schema.ts):
- Users table with UUID primary keys, username, and password fields
- Schema validation using Zod for type safety
- Prepared for multi-tenant event management with coordinator roles

**Migration Strategy**: Drizzle Kit for schema migrations with push-based workflow

**Storage Abstraction**: 
- IStorage interface defining CRUD operations
- MemStorage implementation for in-memory development/testing
- Designed for easy swap to PostgreSQL-backed storage

### Authentication & Authorization

**Authentication Flow**:
- Token-based coordinator authentication
- Local storage persistence for user sessions
- Protected routes requiring authentication
- Role-based access (coordinator role implemented)

**Security Considerations**:
- Password fields in user schema (implementation pending)
- Session-based authentication infrastructure ready
- Token validation for coordinator access

### Payment Processing

**Provider**: Stripe integration via @stripe/stripe-js and @stripe/react-stripe-js

**Features**:
- Credit card payment collection in checkout flow
- Secure payment form components
- Integration points prepared for server-side payment confirmation

### Component Architecture

**Customer-Facing Components**:
- CustomerHeader: Search, cart, user management
- HeroSection: Primary landing with search
- EventCard: Event browsing grid items
- FilterBar: Category, location, date filtering
- CartSidebar: Shopping cart with coupon support
- ZoneSelector/VenueZoneMap: Interactive seat selection
- ProductCard: Additional items (food, merchandise)
- QRTicket: Digital ticket display with QR codes

**Coordinator Components**:
- EventForm: Multi-step event creation with tabs
- ActivitiesTab: Event activity management
- VenueTab: Zone and seating configuration
- PricingTab: Zone pricing per activity
- CouponsTab: Discount code management
- AddonsTab: Additional purchasable items
- ReserveTickets: Direct ticket reservation interface

**Shared UI Components**:
- Complete Shadcn/ui component library (40+ components)
- ThemeToggle for light/dark mode switching
- Toast notifications for user feedback
- Dialog, Card, Table, Form components

### Data Flow Patterns

**Cart Management**:
- CartContext provides global cart state
- Support for tickets and additional items
- Quantity management with max limits (8 tickets)
- Coupon application with percentage and fixed discounts
- Mock data for development/testing

**Event Data**:
- Events with multiple activities (performances)
- Zone-based pricing per activity
- Capacity tracking and availability
- Image gallery support
- Status workflow (draft → review → published)

**Form Handling**:
- React Hook Form with Zod validation (@hookform/resolvers)
- Type-safe form schemas using Drizzle-Zod
- Multi-step form navigation in coordinator dashboard

## External Dependencies

### Third-Party Services

**Stripe**: Payment processing platform
- Client-side integration with Elements
- Publishable key configuration required
- Server-side API integration needed for charge confirmation

**Neon Database**: Serverless PostgreSQL hosting
- Connection via DATABASE_URL environment variable
- WebSocket-based connection pooling
- Automatic scaling for concurrent connections

### Asset Management

**Google Fonts**: 
- Inter (400, 500, 600, 700) for UI text
- Playfair Display (600, 700) for decorative event titles

**Generated Images**: Static assets stored in attached_assets/generated_images/
- Concert, theater, festival, and venue images
- Used throughout the application for event cards and hero sections

### Development Tools

**Replit Plugins**:
- @replit/vite-plugin-runtime-error-modal
- @replit/vite-plugin-cartographer  
- @replit/vite-plugin-dev-banner

**Build Tools**:
- Vite for frontend bundling
- esbuild for server-side bundling
- tsx for TypeScript execution in development

### UI Libraries

**Radix UI**: Accessible component primitives
- 30+ primitive components (Dialog, Dropdown, Select, etc.)
- Unstyled, accessible foundation for custom components

**Additional Libraries**:
- class-variance-authority: Component variant management
- clsx/tailwind-merge: Utility class composition
- cmdk: Command palette component
- date-fns: Date formatting and manipulation
- qrcode.react: QR code generation for tickets
- lucide-react: Icon library

### Environment Configuration

**Required Environment Variables**:
- DATABASE_URL: PostgreSQL connection string (Neon)
- STRIPE_PUBLIC_KEY: Stripe publishable key (implied, not in code)
- NODE_ENV: Environment mode (development/production)

**Build Scripts**:
- dev: Development server with hot reload
- build: Production build (Vite + esbuild)
- start: Production server
- db:push: Push schema changes to database