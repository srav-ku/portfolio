# Sravanth Kumar's Portfolio

## Overview

This is a premium, modern developer portfolio website built with React, TypeScript, and Tailwind CSS. The application showcases a professional single-page design with smooth section transitions, inspired by Huly.io's sophisticated aesthetic. It features multiple portfolio sections including hero, about, skills, projects, experience, certifications, and contact areas, all presented with elegant animations and glassmorphic design elements.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**September 22, 2025**: Project successfully imported and configured for Replit environment
- Successfully installed all npm dependencies (569 packages installed)
- Configured "Portfolio Server" development workflow on port 5000 with webview output
- Verified Vite configuration properly allows all hosts for Replit proxy support (allowedHosts: true, host: 0.0.0.0)
- Confirmed Express server configuration properly binds to 0.0.0.0:5000 for Replit environment
- Set up autoscale deployment configuration with npm build and start scripts
- Application running successfully with both frontend React SPA and Express backend
- Project uses memory storage (MemStorage) for basic functionality
- Portfolio website displaying correctly with Vite HMR connected
- TypeScript configuration correct with proper path aliases and module resolution
- Both main portfolio (/) and admin interface (/admin.html) working correctly
- Screenshots confirmed proper rendering of the website
- Firebase configuration present but requires VITE_FIREBASE_API_KEY environment variable (optional for basic portfolio functionality)
- Application fully functional and ready for use

## System Architecture

### Frontend Architecture
The application uses a **React SPA (Single Page Application)** architecture with TypeScript for type safety. The main components are organized into distinct sections that transition smoothly without traditional scrolling. Key architectural decisions include:

- **Component-based structure** with reusable UI components from shadcn/ui
- **Section-based navigation** where each portfolio section is a separate component
- **No continuous scrolling** - sections change only through navigation interactions
- **Wouter for routing** providing lightweight client-side routing
- **Framer Motion** for sophisticated animations and page transitions

### State Management
- **React Context** for theme management (light/dark mode)
- **Local component state** for navigation and UI interactions
- **TanStack Query** for potential future API integration (currently configured but unused)

### Styling Architecture
- **Tailwind CSS** with custom design system inspired by Huly.io
- **CSS Custom Properties** for theme variables and design tokens
- **shadcn/ui component library** providing consistent, accessible UI components
- **Responsive design** with mobile-first approach
- **Custom spacing system** using Tailwind units (4, 6, 8, 12, 16) for consistent rhythm

### Design System
The portfolio implements a sophisticated design system with:
- **Glassmorphic navigation** with backdrop blur effects
- **Premium minimalism** emphasizing clean layouts and typography
- **Dual theme support** with carefully crafted light and dark color schemes
- **Typography-first hierarchy** using Inter font family
- **Smooth animations** for enhanced user engagement

### Build System
- **Vite** for fast development and optimized production builds
- **TypeScript** compilation with strict type checking
- **PostCSS** with Autoprefixer for CSS processing
- **ESM modules** throughout the application
- **Path aliases** for clean import statements (@/, @shared/, @assets/)

## External Dependencies

### UI and Animation Libraries
- **@radix-ui/react-*** - Comprehensive set of accessible, unstyled UI primitives
- **framer-motion** - Production-ready motion library for React animations
- **lucide-react** - Beautiful, customizable SVG icons
- **class-variance-authority** - Utility for creating type-safe component variants
- **tailwindcss** - Utility-first CSS framework for rapid UI development

### Form and Data Management
- **react-hook-form** with **@hookform/resolvers** - Performant forms with easy validation
- **@tanstack/react-query** - Powerful data synchronization for React (configured for future use)
- **zod** with **drizzle-zod** - TypeScript-first schema validation

### Database and Backend (Prepared)
- **drizzle-orm** - Type-safe SQL ORM for TypeScript
- **@neondatabase/serverless** - Serverless PostgreSQL database client
- **express** - Web application framework for Node.js (minimal backend setup)

### Development and Build Tools
- **vite** - Next generation frontend tooling
- **typescript** - Typed superset of JavaScript
- **@vitejs/plugin-react** - Official Vite plugin for React support
- **wouter** - Minimalist routing library for React

### Utilities
- **clsx** and **tailwind-merge** - Utility for constructing className strings
- **date-fns** - Modern JavaScript date utility library
- **nanoid** - URL-friendly unique ID generator

The application is structured to easily scale with additional features like a content management system, blog integration, or dynamic project showcase capabilities.