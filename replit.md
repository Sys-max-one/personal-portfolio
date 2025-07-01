# Portfolio Application

## Overview

This is a full-stack portfolio application built with React frontend and Express.js backend. The application displays a professional portfolio with sections for personal information, skills, work experience, education, projects, and contact functionality. It uses PostgreSQL as the database with Drizzle ORM for data management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **API Design**: RESTful API endpoints
- **Development**: Hot module replacement with Vite integration
- **Build**: ESBuild for production bundling

## Key Components

### Database Schema
The application uses a relational database structure with the following main entities:
- **users**: User authentication and basic info
- **portfolios**: Main portfolio information (name, title, contact details)
- **skills**: Technical and soft skills with proficiency levels
- **experiences**: Work experience entries with descriptions and technologies
- **education**: Education and certification records
- **projects**: Portfolio projects with links and descriptions
- **highlights**: Key achievements and highlights
- **contactMessages**: Messages submitted through contact form

### API Endpoints
- `GET /api/portfolio` - Retrieve main portfolio information
- `GET /api/portfolio/skills` - Fetch skills data
- `GET /api/portfolio/experiences` - Get work experience
- `GET /api/portfolio/education` - Retrieve education records
- `GET /api/portfolio/projects` - Fetch project portfolio
- `GET /api/portfolio/highlights` - Get highlights/achievements
- `POST /api/contact` - Submit contact form messages

### UI Components Structure
- **Navigation**: Fixed header with smooth scrolling navigation
- **Hero Section**: Main introduction with social links and call-to-action
- **About Section**: Personal description with highlights
- **Skills Section**: Technical and soft skills with visual proficiency indicators
- **Experience Section**: Timeline-based work experience display
- **Education Section**: Academic background and certifications
- **Projects Section**: Featured projects with links and technologies
- **Contact Section**: Contact form with validation
- **Footer**: Social links and additional information

## Data Flow

1. **Client Request**: React components use TanStack Query to fetch data from API endpoints
2. **API Processing**: Express.js routes handle requests and interact with database through Drizzle ORM
3. **Database Query**: Drizzle ORM executes PostgreSQL queries and returns structured data
4. **Response**: JSON data is returned to client and cached by TanStack Query
5. **UI Update**: React components re-render with fetched data using loading and error states

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: PostgreSQL database driver for serverless environments
- **drizzle-orm**: Type-safe SQL ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router

### UI and Styling
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant management
- **lucide-react**: Icon library

### Development Tools
- **vite**: Fast build tool and dev server
- **typescript**: Type safety and enhanced developer experience
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Development
- Uses Vite dev server with HMR for frontend development
- Express.js server runs with tsx for TypeScript execution
- Database migrations managed through Drizzle Kit
- Environment variables required: `DATABASE_URL`

### Production Build
1. Frontend builds to `dist/public` directory using Vite
2. Backend bundles with ESBuild to `dist/index.js`
3. Static files served by Express.js in production
4. Database schema pushed using `drizzle-kit push`

### Environment Configuration
- **Development**: `NODE_ENV=development` with hot reloading
- **Production**: `NODE_ENV=production` with optimized builds
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable

## Changelog
- July 01, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.