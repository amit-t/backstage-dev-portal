# User Onboarding Plugin

This plugin provides a guided onboarding experience for new users of the Backstage Developer Portal.

## Features

- Step-by-step onboarding wizard
- Component registration guidance
- Documentation setup assistance
- Progress tracking for onboarding steps
- Optional and required tasks clearly marked

## Installation

1. Install the plugin package:

```bash
# From your Backstage root directory
pnpm add --filter app @internal/plugin-user-onboarding
```

2. Add the plugin to your Backstage app:

```typescript
// In packages/app/src/App.tsx
import { UserOnboardingPage } from '@internal/plugin-user-onboarding';

// Add to your app routes
<Route path="/onboarding" element={<UserOnboardingPage />} />
```

3. Add the plugin to your sidebar:

```typescript
// In packages/app/src/components/Root/Root.tsx
import SchoolIcon from '@material-ui/icons/School';

// Add to your sidebar items
<SidebarItem icon={SchoolIcon} to="onboarding" text="Onboarding" />
```

## Usage

The onboarding plugin provides:

1. A welcome experience for new users
2. A sequence of steps to follow for setting up components
3. Links to relevant documentation and resources
4. Progress tracking through the onboarding flow

## Configuration

By default, the onboarding plugin includes steps for component registration, documentation, CI/CD setup, and API registration.

You can customize the onboarding steps through app configuration.
