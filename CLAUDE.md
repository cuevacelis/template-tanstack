# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server on port 3000
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Testing
npm run test

# Linting and formatting
npm run lint
npm run format
npm run check  # Format with prettier and fix eslint issues
```

## Architecture Overview

This is a full-stack TypeScript application built with modern React ecosystem tools. The architecture follows these key patterns:

### Frontend Architecture

- **TanStack Start**: Full-stack React framework handling routing, SSR, and API integration
- **TanStack Router**: File-based routing with type-safe navigation and SSR support
- **TanStack Query**: Server state management and caching
- **TanStack Form**: Form management with validation
- **Clerk**: Authentication and user management
- **Convex**: Backend-as-a-Service for database and real-time data

### Route Structure

- File-based routing using TanStack Start conventions
- Routes are organized in `src/routes/` with special folder naming:
  - `(auth)/` - Protected routes requiring authentication
  - `(not-auth)/` - Public routes for unauthenticated users
  - `api/` - API endpoints
  - `__root.tsx` - Root layout component
  - `page.tsx` - Route pages (using `indexToken: 'page'`)
  - `layout.tsx` - Layout components (using `routeToken: 'layout'`)

### State Management

- **TanStack Query** for server state and API calls
- **Convex** for real-time backend data synchronization
- **ORPC** for type-safe RPC calls between client and server
- Context providers for theme and authentication

### Styling System

- **Tailwind CSS** with custom configuration
- **shadcn/ui** components library
- Component variants using `class-variance-authority`
- Theme system with dark/light mode support via `next-themes`

### Database Schema

- **Convex** schema definitions in `convex/schema.ts`
- Type-safe database operations with generated types
- Real-time subscriptions and mutations

## Key Configuration Files

- `vite.config.ts`: TanStack Start plugin configuration with custom routing tokens
- `tsconfig.json`: Path aliases configured with `@/*` pointing to `src/*`
- `eslint.config.js`: Uses TanStack ESLint configuration
- `.cursorrules`: Contains Convex-specific development guidelines and shadcn usage instructions

## Important Development Patterns

### Form Handling

- Use TanStack Form with custom form components in `src/components/form/`
- Form fields follow consistent naming and validation patterns
- Integration with Zod for type-safe validation

### API Integration

- ORPC router configuration in `src/orpc/router/`
- Type-safe client in `src/orpc/client.ts`
- API endpoints in `src/routes/api/` directory

### Component Organization

- UI components in `src/components/ui/` (shadcn/ui components)
- Custom form components in `src/components/form/`
- Utility functions organized by domain in `src/lib/utils/`

### Authentication Flow

- Clerk provider wraps the entire application
- Protected routes use `(auth)` folder structure
- Authentication state available throughout the app via Clerk hooks

### Database Operations

- Convex functions in `convex/` directory
- Type-safe operations using generated API types
- Real-time data synchronization with React components

## Installing New Components

Use the latest shadcn CLI for adding new UI components:

```bash
pnpx shadcn@latest add [component-name]
```

## Convex Development Guidelines

When working with Convex schemas:

- Use `v.id("tableName")` for foreign key references
- System fields `_id` and `_creationTime` are automatically added
- Add indices for query performance: `.index("indexName", ["field"])`
- Use proper validator types from `convex/values`

## Testing

- Vitest for unit testing
- Testing Library for React component testing
- Test files should follow standard naming conventions
