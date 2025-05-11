# Configuration

This guide covers how to configure your Backstage Developer Portal.

## App Configuration

The main configuration files for Backstage are:

- `app-config.yaml` - Base configuration
- `app-config.local.yaml` - Local development overrides
- `app-config.production.yaml` - Production configuration

### Example Configuration

```yaml
app:
  title: Backstage Developer Portal
  baseUrl: https://example.com

organization:
  name: Your Organization

backend:
  baseUrl: https://example.com
  listen:
    port: 7007
  cors:
    origin: https://example.com
    methods: [GET, POST, PUT, DELETE]
    credentials: true
```

## Environment Variables

You can use environment variables in your configuration:

```yaml
backend:
  database:
    client: pg
    connection:
      host: ${POSTGRES_HOST}
      user: ${POSTGRES_USER}
      password: ${POSTGRES_PASSWORD}
```

## Adding Plugins

To add plugins to your portal, update your `packages/app/src/App.tsx` file to include the plugin components.

See the [Plugins](plugins.md) section for details on available plugins.
