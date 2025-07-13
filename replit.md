# Luminous - Creative & Wellness Platform

## Overview

Luminous is a modern web application designed to inspire users through the organization of creative projects and wellness practices. The platform combines productivity tools for creative work with habit tracking and mindfulness features, fostering both creativity and personal well-being in a vibrant, engaging interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Replit Auth with OpenID Connect integration
- **Session Management**: Express sessions with PostgreSQL storage
- **API Design**: RESTful API endpoints with proper error handling

### Mobile-First Design
- Responsive design optimized for mobile devices
- Bottom navigation for mobile-friendly user experience
- Touch-optimized interface components

## Key Components

### Mobile App Development (NEW)
- **Platform**: Capacitor 7.x with React integration
- **iOS/Android**: Native apps sharing 95% of React codebase
- **Native Features**: Status bar, splash screen, keyboard handling, safe areas
- **Development**: Xcode/Android Studio integration with live reload
- **Distribution**: Ready for App Store and Google Play deployment

### Authentication System
- **Provider**: Replit Auth with OIDC (simplified for mobile demo)
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **User Management**: Automatic user creation and profile management
- **Security**: HTTP-only cookies with secure session handling

### Database Schema
- **Users**: Profile management with Replit integration
- **Projects**: Creative project organization and tracking
- **Tasks**: Task management with project association and priority levels
- **Habits**: Wellness habit tracking with frequency targets
- **Habit Entries**: Daily habit completion tracking
- **Community Posts**: User-generated content and sharing
- **Challenges**: Community challenges and participation tracking

### Feature Modules
1. **Creative Projects**: Visual project organization with task management
2. **Wellness Rituals**: Habit tracking and mindfulness tools
3. **Community**: Social features for sharing progress and inspiration
4. **Daily Dashboard**: Overview of tasks, habits, and inspirational content

### UI/UX Design
- **Theme**: Dark theme with vibrant accent colors (cyan, orange, yellow, green)
- **Typography**: Modern sans-serif fonts for clarity and accessibility
- **Visual Identity**: Brain icon branding with "LUMINOUS" wordmark
- **Design System**: Consistent glass-effect cards and gradient backgrounds

## Data Flow

1. **Authentication Flow**: User authenticates via Replit Auth → Session created → User profile retrieved/created
2. **Project Management**: Users create projects → Add tasks to projects → Track completion progress
3. **Wellness Tracking**: Users create habits → Log daily entries → View progress and streaks
4. **Community Interaction**: Users create posts → Share achievements → Participate in challenges
5. **Dashboard Aggregation**: System aggregates user data → Displays daily overview → Provides inspirational content

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **express**: Web server framework
- **passport**: Authentication middleware

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and enhanced development experience
- **tailwindcss**: Utility-first CSS framework
- **drizzle-kit**: Database schema management and migrations

### Replit Integration
- **Authentication**: Leverages Replit's OIDC provider for seamless user authentication
- **Development Tools**: Replit-specific plugins for enhanced development experience
- **Asset Management**: Support for attached assets and media files

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: Neon PostgreSQL for development and production
- **Environment Variables**: DATABASE_URL, SESSION_SECRET, REPLIT_DOMAINS

### Production Build
- **Frontend**: Vite builds optimized React application to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Static Assets**: Served from built frontend with fallback to API routes

### Database Management
- **Schema**: Managed via Drizzle schema files in `shared/schema.ts`
- **Migrations**: Generated and applied using drizzle-kit
- **Connection**: Serverless-optimized connection pooling for Neon PostgreSQL

### Security Considerations
- Session-based authentication with secure HTTP-only cookies
- CORS and environment-specific domain validation
- Input validation using Zod schemas
- SQL injection protection via Drizzle ORM's prepared statements