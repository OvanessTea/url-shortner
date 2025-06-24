# URL Shortener Service

A full-featured URL shortening service with REST API on Express and web interface on React.

## Technologies

### Backend (Express)
- **Express.js** - web framework for Node.js
- **TypeScript** - typed JavaScript
- **PostgreSQL** - database
- **TypeORM** - ORM for database operations
- **class-validator** - data validation
- **nanoid** - unique ID generation

### Frontend (React)
- **React** - library for building user interfaces
- **TypeScript** - typed JavaScript
- **Axios** - HTTP client
- **SCSS module** - styling

### Infrastructure
- **Docker** - containerization
- **Docker Compose** - container orchestration

## Functionality

### Backend API (Express)

1. **Create Short URL** - `POST /shorten`
   - Accepts: `originalUrl` (required), `expiresAt` (optional), `alias` (optional)
   - Returns: information about the created short URL

2. **Redirection** - `GET /{shortUrl}`
   - Redirects user to the original URL
   - Records click statistics

3. **URL Information** - `GET /info/{shortUrl}`
   - Returns: original URL, creation date, click count

4. **Delete URL** - `DELETE /delete/{shortUrl}`
   - Deletes the short URL and related statistics

5. **Analytics** - `GET /analytics/{shortUrl}`
   - Returns: click count and last 5 IP addresses

### Frontend (React)

- Form for creating short URLs
- List of created URLs with ability to:
  - Copy to clipboard
  - View analytics
  - Delete URLs
- Display of click statistics

## Quick Start

### Requirements
- Docker
- Docker Compose

### Project Launch

1. Clone the repository:
```bash
git clone https://github.com/OvanessTea/url-shortner
cd url-shortener
```
2. Lounch project:
```bash
docker-compose up --build
```
3. Usage URLs:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Turn off project
```bash
docker-compose down
```