# Installation Guide

This guide will help you set up the Backstage Developer Portal in your environment.

## Prerequisites

- Node.js 20 or 22
- pnpm 8.15.4 or later
- Git

## Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/backstage-dev-portal.git
   cd backstage-dev-portal
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm start
   ```

4. Access the portal at http://localhost:3000

## Production Deployment

For production deployment, you can build and serve the application:

```bash
pnpm build:all
pnpm build-image
```

See the [configuration documentation](configuration.md) for details on configuring your production environment.
