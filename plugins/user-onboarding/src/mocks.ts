import type { OnboardingStep } from './types';

/**
 * Default onboarding steps for new users of the Developer Portal.
 */
export const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to the Developer Portal',
    description:
      'Get started with the Backstage developer portal and learn how to register your components',
    order: 0,
    completed: false,
  },
  {
    id: 'register-component',
    title: 'Register Your Component',
    description: 'Add your software component to the Backstage catalog',
    order: 1,
    completed: false,
  },
  {
    id: 'documentation',
    title: 'Add Documentation',
    description:
      'Learn how to document your component using Markdown and TechDocs',
    order: 2,
    completed: false,
    optional: true,
  },
  {
    id: 'ci-cd',
    title: 'Set Up CI/CD',
    description:
      'Configure continuous integration and delivery for your component',
    order: 3,
    completed: false,
    optional: true,
  },
  {
    id: 'apis',
    title: 'Register APIs',
    description:
      'If your component exposes APIs, learn how to document and register them',
    order: 4,
    completed: false,
    optional: true,
  },
];
