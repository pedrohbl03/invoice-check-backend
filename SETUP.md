# Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Yarn or npm

## Installation

1. **Install dependencies:**
   ```bash
   yarn install
   # or
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Then update the `.env` file with your configuration:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/invoice_check"
   JWT_SECRET="your-secret-key"
   PORT=3000
   ```

3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

## Development

Start the development server:
```bash
yarn start:dev
# or
npm run start:dev
```

The API will be available at `http://localhost:3000/api`

## Available Endpoints

Once running, you can test the following endpoints:

- `GET http://localhost:3000/api/auth` - Auth module
- `GET http://localhost:3000/api/users` - User module
- `GET http://localhost:3000/api/invoices` - Invoice module
- `GET http://localhost:3000/api/interactions` - Interaction module

## Building for Production

```bash
yarn build
# or
npm run build

# Run production build
yarn start:prod
# or
npm run start:prod
```

## Testing

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## Project Structure

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## Common Commands

```bash
# Format code
yarn format

# Lint code
yarn lint

# Generate Prisma client
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Open Prisma Studio
npx prisma studio
```

## Troubleshooting

### Prisma Client not found
If you get errors about Prisma client not being found, run:
```bash
npx prisma generate
```

### Database connection errors
1. Ensure PostgreSQL is running
2. Verify your DATABASE_URL in `.env`
3. Check database credentials and permissions

### Port already in use
Change the PORT in your `.env` file to a different value.

