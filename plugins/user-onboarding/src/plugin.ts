import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

/**
 * The Backstage plugin that provides onboarding functionality for new users.
 * This plugin guides users through setting up new components in the catalog.
 */
export const userOnboardingPlugin = createPlugin({
  id: 'user-onboarding',
  routes: {
    root: rootRouteRef,
  },
});

/**
 * A Routable Extension for the onboarding page.
 */
export const UserOnboardingPage = userOnboardingPlugin.provide(
  createRoutableExtension({
    name: 'UserOnboardingPage',
    component: () =>
      import('./components/UserOnboardingPage').then(
        (m) => m.UserOnboardingPage,
      ),
    mountPoint: rootRouteRef,
  }),
);
