# Import Guide

## Barrel Export Pattern

All modules now have a complete barrel export structure for cleaner imports throughout the application.

## Structure Overview

Each module follows this structure:

```
module/
├── application/
│   ├── dto/
│   │   └── index.ts          # Export all DTOs
│   ├── services/
│   │   └── index.ts          # Export all services
│   └── index.ts              # Export * from dto & services
├── domain/
│   ├── entities/
│   │   └── index.ts          # Export all entities
│   ├── validators/
│   │   └── index.ts          # Export all validators
│   └── index.ts              # Export * from entities & validators
├── infrastructure/
│   ├── repositories/
│   │   └── index.ts          # Export all repositories
│   ├── mappers/              # (Invoice module only)
│   │   └── index.ts          # Export all mappers
│   └── index.ts              # Export * from repositories & mappers
└── index.ts                  # Export everything from module
```

## Import Examples

### ✅ Clean Imports (Recommended)

```typescript
// Import from module root - gets everything
import { AuthService, AuthModule, AuthController } from '@/modules/auth';

// Import from layer
import { UserService } from '@/modules/user/application';
import { UserEntity } from '@/modules/user/domain';
import { UserRepository } from '@/modules/user/infrastructure';

// Import specific layers
import { InvoiceService } from '@/modules/invoice/application/services';
import { CreateInvoiceDto } from '@/modules/invoice/application/dto';
```

### ❌ Avoid Deep Imports

```typescript
// Don't do this anymore
import { AuthService } from '@/modules/auth/application/services/auth.service';

// Use this instead
import { AuthService } from '@/modules/auth';
// or
import { AuthService } from '@/modules/auth/application';
// or
import { AuthService } from '@/modules/auth/application/services';
```

## Usage by Module

### Auth Module

```typescript
// Get everything
import { 
  AuthModule,
  AuthController,
  AuthService,
  AuthError,
  InvalidCredentialsError
} from '@/modules/auth';

// Or by layer
import { AuthService } from '@/modules/auth/application';
import { AuthEntity } from '@/modules/auth/domain';
import { AuthRepository } from '@/modules/auth/infrastructure';
```

### User Module

```typescript
// Get everything
import { 
  UserModule,
  UserController,
  UserService,
  UserError,
  UserNotFoundError
} from '@/modules/user';

// Or by layer
import { UserService } from '@/modules/user/application';
import { UserEntity } from '@/modules/user/domain';
import { UserRepository } from '@/modules/user/infrastructure';
```

### Invoice Module

```typescript
// Get everything
import { 
  InvoiceModule,
  InvoiceController,
  InvoiceService,
  InvoiceError
} from '@/modules/invoice';

// Or by layer
import { InvoiceService } from '@/modules/invoice/application';
import { InvoiceEntity } from '@/modules/invoice/domain';
import { InvoiceRepository } from '@/modules/invoice/infrastructure';
import { InvoiceMapper } from '@/modules/invoice/infrastructure/mappers';
```

### Interaction Module

```typescript
// Get everything
import { 
  InteractionModule,
  InteractionController,
  InteractionService,
  InteractionError
} from '@/modules/interaction';

// Or by layer
import { InteractionService } from '@/modules/interaction/application';
import { InteractionEntity } from '@/modules/interaction/domain';
import { InteractionRepository } from '@/modules/interaction/infrastructure';
```

## Benefits

1. **Cleaner Code**: Shorter, more readable import statements
2. **Maintainability**: Easy to reorganize internal structure without breaking imports
3. **Discoverability**: Clear what each module exports
4. **Consistency**: All modules follow the same pattern
5. **IDE Support**: Better autocomplete and IntelliSense

## Adding New Files

When you add new files to any layer:

### 1. Create your file
```typescript
// src/modules/user/application/services/user-profile.service.ts
export class UserProfileService { ... }
```

### 2. Export from layer index
```typescript
// src/modules/user/application/services/index.ts
export * from './user.service';
export * from './user-profile.service';  // Add this line
```

### 3. Import anywhere
```typescript
import { UserProfileService } from '@/modules/user/application';
// or
import { UserProfileService } from '@/modules/user';
```

## Common Patterns

### In Controllers
```typescript
import { Controller, Get } from '@nestjs/common';
import { UserService } from './application';  // Relative import from same module

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
```

### In Services
```typescript
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infrastructure';  // Relative import from same module
import { UserEntity } from '../domain';              // Relative import from same module

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
}
```

### Cross-Module Imports
```typescript
import { Injectable } from '@nestjs/common';
import { AuthService } from '@/modules/auth';         // Absolute import for other modules
import { InvoiceService } from '@/modules/invoice';   // Absolute import for other modules

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private readonly invoiceService: InvoiceService,
  ) {}
}
```

## Tips

- Use **relative imports** within the same module
- Use **absolute imports** for cross-module dependencies
- Import from the **highest level** that makes sense (prefer module root)
- Keep the **index.ts files updated** when adding new files
- Follow the **same pattern** across all modules for consistency

