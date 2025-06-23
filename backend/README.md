# URL Shortener Backend

Backend API for URL shortening service, built with Express.js and TypeORM.

## Setup

```bash
npm install
```

## Setup DB

Create file `.env` in the root of project:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=urlshortener
```

## Lounche

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run start:prod
```

## Testing

### Lounche tests
```bash
# Start all tests
npm test

# Start all tests in watch mode
npm run test:watch

# Start all tests in coverage mode
npm run test:coverage
```

### Setup test DB

For tests, a separate database is used. Make sure that:

1. A test PostgreSQL database is created
2. The `.env` file contains parameters for the test database
3. The database is accessible for connections

### Test Structure

- `src/__tests__/shorten.test.ts` - Tests for creating links with a unique alias
- `src/__tests__/redirect.test.ts` - Tests for redirection to the original URL
- `src/__tests__/setup.ts` - Test environment setup
- `src/__tests__/test-db.ts` - Test database configuration

## API Endpoints

### Create a short link
```
POST /shorten
Content-Type: application/json

{
  "originalUrl": "https://example.com",
  "alias": "custom-alias", // optional
  "expiresAt": "2024-12-31T23:59:59.000Z" // optional
}
```

### Redirection
```
GET /:shortUrl
```

### Link information
```
GET /info/:shortUrl
```

### Analytics
```
GET /analytics/:shortUrl
```

### Delete link
```
DELETE /delete/:shortUrl
```

## Technologies

- **Express.js** - web framework
- **TypeORM** - ORM for database interaction
- **PostgreSQL** - database
- **TypeScript** - typed JavaScript
- **Jest** - testing framework
- **Supertest** - library for testing HTTP APIs