# Invoice Check Backend - Architecture

## Overview
This is a NestJS backend application following Domain-Driven Design (DDD) principles with a modular architecture.

## Project Structure

```
src/
├── common/                    # Shared utilities across modules
│   ├── decorators/           # Custom decorators
│   ├── filters/              # Exception filters
│   ├── interceptors/         # Request/Response interceptors
│   └── interfaces/           # Shared interfaces
│
├── config/                    # Application configuration
│   └── env.config.ts         # Environment configuration
│
├── database/                  # Database configuration
│   ├── prisma.module.ts      # Prisma module
│   └── prisma.service.ts     # Prisma service
│
├── modules/                   # Feature modules
│   ├── auth/                 # Authentication module
│   ├── interaction/          # Interaction module
│   ├── invoice/              # Invoice module
│   └── user/                 # User module
│
├── app.module.ts             # Root application module
└── main.ts                   # Application entry point
```

## Module Structure (DDD Pattern)

Each module follows the same DDD structure:

```
module/
├── application/              # Application layer
│   ├── dto/                 # Data Transfer Objects
│   └── services/            # Application services
│
├── domain/                   # Domain layer
│   ├── entities/            # Domain entities
│   └── validators/          # Domain validators
│
├── infrastructure/           # Infrastructure layer
│   ├── repositories/        # Data repositories
│   └── mappers/             # Data mappers (optional)
│
├── module.controller.ts      # REST API endpoints
├── module.module.ts          # Module configuration
├── module.error.ts           # Module-specific errors
└── index.ts                  # Barrel exports
```

## Layers Explained

### 1. Application Layer
- **Services**: Contains business logic and orchestrates domain operations
- **DTOs**: Defines data structures for API requests/responses

### 2. Domain Layer
- **Entities**: Core business objects with business rules
- **Validators**: Domain validation logic

### 3. Infrastructure Layer
- **Repositories**: Data access and persistence
- **Mappers**: Convert between domain entities and persistence models

## API Structure

All API endpoints are prefixed with `/api`:

- `GET /api/auth` - Auth module endpoints
- `GET /api/users` - User module endpoints
- `GET /api/invoices` - Invoice module endpoints
- `GET /api/interactions` - Interaction module endpoints

## Global Features

### Exception Handling
- Global exception filter (`AllExceptionsFilter`)
- Module-specific error classes
- Standardized error responses

### Logging
- Request/Response logging interceptor
- Logs method, URL, status code, and response time

### Validation
- Global validation pipe with DTO transformation
- Whitelist and forbid non-whitelisted properties

### CORS
- Configurable via `CORS_ORIGIN` environment variable
- Credentials support enabled

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
```

## Database

- **ORM**: Prisma
- **Database**: PostgreSQL
- **Migrations**: Run `npx prisma migrate dev`
- **Generate Client**: Run `npx prisma generate`

## Running the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Module Guidelines

When creating a new module:

1. Follow the DDD structure (application/domain/infrastructure)
2. Create module-specific error classes
3. Export everything through `index.ts`
4. Register the module in `app.module.ts`
5. Add proper route prefix to controller

## Best Practices

1. **Separation of Concerns**: Each layer has specific responsibilities
2. **Dependency Injection**: Use NestJS DI container
3. **Type Safety**: Leverage TypeScript's type system
4. **Error Handling**: Use custom error classes for better error tracking
5. **Validation**: Validate all inputs using DTOs and class-validator
6. **Testing**: Write unit tests for services and e2e tests for endpoints

