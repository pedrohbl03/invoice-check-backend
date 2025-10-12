# Export Structure Diagram

## Complete Barrel Export Pattern

This document visualizes the complete export structure for all modules.

## Module Export Flow

```
module/index.ts (Root)
    ├── module.module.ts
    ├── module.controller.ts
    ├── module.error.ts
    ├── application/index.ts ─┐
    ├── domain/index.ts ───────┤
    └── infrastructure/index.ts┘
```

## Detailed Layer Structure

### Application Layer
```
application/
├── dto/
│   ├── create-*.dto.ts
│   ├── update-*.dto.ts
│   └── index.ts ──────────┐
│                          │
├── services/              │
│   ├── *.service.ts       │
│   └── index.ts ──────────┤
│                          │
└── index.ts ◄─────────────┴─ Exports all from dto/ & services/
```

### Domain Layer
```
domain/
├── entities/
│   ├── *.entity.ts
│   └── index.ts ──────────┐
│                          │
├── validators/            │
│   ├── *.validator.ts     │
│   └── index.ts ──────────┤
│                          │
└── index.ts ◄─────────────┴─ Exports all from entities/ & validators/
```

### Infrastructure Layer
```
infrastructure/
├── repositories/
│   ├── *.repository.ts
│   └── index.ts ──────────┐
│                          │
├── mappers/ (optional)    │
│   ├── *.mapper.ts        │
│   └── index.ts ──────────┤
│                          │
└── index.ts ◄─────────────┴─ Exports all from repositories/ & mappers/
```

## Import Levels

### Level 1: Module Root (Highest Level)
```typescript
import { UserService, UserModule, UserError } from '@/modules/user';
```
✅ **Use when:** Importing any module component from outside the module

### Level 2: Layer Level
```typescript
import { UserService } from '@/modules/user/application';
import { UserEntity } from '@/modules/user/domain';
import { UserRepository } from '@/modules/user/infrastructure';
```
✅ **Use when:** You want to be explicit about which layer you're importing from

### Level 3: Sublayer Level
```typescript
import { UserService } from '@/modules/user/application/services';
import { CreateUserDto } from '@/modules/user/application/dto';
```
✅ **Use when:** You want to be very specific about the component type

### Level 4: File Level (Avoid)
```typescript
import { UserService } from '@/modules/user/application/services/user.service';
```
❌ **Avoid:** Too specific, breaks encapsulation

## All Modules Structure

### Auth Module
```
auth/
├── index.ts ──────────────── AuthModule, AuthController, AuthService, AuthError
│
├── application/
│   ├── index.ts ──────────── Services & DTOs
│   ├── services/
│   │   ├── index.ts ──────── AuthService
│   │   └── auth.service.ts
│   └── dto/
│       └── index.ts ──────── (Future DTOs)
│
├── domain/
│   ├── index.ts ──────────── Entities & Validators
│   ├── entities/
│   │   └── index.ts ──────── (Future Entities)
│   └── validators/
│       └── index.ts ──────── (Future Validators)
│
└── infrastructure/
    ├── index.ts ──────────── Repositories
    └── repositories/
        └── index.ts ──────── (Future Repositories)
```

### User Module
```
user/
├── index.ts ──────────────── UserModule, UserController, UserService, UserError
│
├── application/
│   ├── index.ts ──────────── Services & DTOs
│   ├── services/
│   │   ├── index.ts ──────── UserService
│   │   └── user.service.ts
│   └── dto/
│       └── index.ts ──────── (Future DTOs)
│
├── domain/
│   ├── index.ts ──────────── Entities & Validators
│   ├── entities/
│   │   └── index.ts ──────── (Future Entities)
│   └── validators/
│       └── index.ts ──────── (Future Validators)
│
└── infrastructure/
    ├── index.ts ──────────── Repositories
    └── repositories/
        └── index.ts ──────── (Future Repositories)
```

### Invoice Module
```
invoice/
├── index.ts ──────────────── InvoiceModule, InvoiceController, InvoiceService
│
├── application/
│   ├── index.ts ──────────── Services & DTOs
│   ├── services/
│   │   ├── index.ts ──────── InvoiceService
│   │   └── invoice.service.ts
│   └── dto/
│       └── index.ts ──────── (Future DTOs)
│
├── domain/
│   ├── index.ts ──────────── Entities & Validators
│   ├── entities/
│   │   └── index.ts ──────── (Future Entities)
│   └── validators/
│       └── index.ts ──────── (Future Validators)
│
└── infrastructure/
    ├── index.ts ──────────── Repositories & Mappers
    ├── repositories/
    │   └── index.ts ──────── (Future Repositories)
    └── mappers/
        └── index.ts ──────── (Future Mappers)
```

### Interaction Module
```
interaction/
├── index.ts ──────────────── InteractionModule, InteractionController, InteractionService
│
├── application/
│   ├── index.ts ──────────── Services & DTOs
│   ├── services/
│   │   ├── index.ts ──────── InteractionService
│   │   └── interaction.service.ts
│   └── dto/
│       └── index.ts ──────── (Future DTOs)
│
├── domain/
│   ├── index.ts ──────────── Entities & Validators
│   ├── entities/
│   │   └── index.ts ──────── (Future Entities)
│   └── validators/
│       └── index.ts ──────── (Future Validators)
│
└── infrastructure/
    ├── index.ts ──────────── Repositories
    └── repositories/
        └── index.ts ──────── (Future Repositories)
```

## Example: Adding a New Service

### 1. Create the service file
```typescript
// src/modules/user/application/services/user-profile.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserProfileService {
  getProfile(userId: string) {
    return { userId, name: 'John Doe' };
  }
}
```

### 2. Export from services/index.ts
```typescript
// src/modules/user/application/services/index.ts
export * from './user.service';
export * from './user-profile.service';  // ← Add this
```

### 3. Already exported through the chain!
```
user-profile.service.ts
    ↓ (exported by)
services/index.ts
    ↓ (exported by)
application/index.ts
    ↓ (exported by)
user/index.ts (module root)
```

### 4. Now importable at any level
```typescript
// Level 1 - Module root
import { UserProfileService } from '@/modules/user';

// Level 2 - Layer
import { UserProfileService } from '@/modules/user/application';

// Level 3 - Sublayer
import { UserProfileService } from '@/modules/user/application/services';
```

## Summary

✅ **All modules have complete barrel exports**
✅ **Each layer properly exports its contents**
✅ **Imports can be made at any level**
✅ **Future files just need to be added to nearest index.ts**
✅ **Build and linting successful**

## Quick Reference

| What you want | Import from |
|---------------|-------------|
| Anything from a module | `@/modules/module-name` |
| Services | `@/modules/module-name/application` |
| DTOs | `@/modules/module-name/application/dto` |
| Entities | `@/modules/module-name/domain` |
| Repositories | `@/modules/module-name/infrastructure` |
| Specific service | `@/modules/module-name/application/services` |

