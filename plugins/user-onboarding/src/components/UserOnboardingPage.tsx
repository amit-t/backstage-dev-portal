import {
  Content,
  ContentHeader,
  InfoCard,
  Progress,
  SupportButton,
} from '@backstage/core-components';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import React, { useState, Suspense } from 'react';
import { defaultSteps } from '../mocks';
import type {
  OnboardingStep,
  OnboardingWelcomeCardProps,
  OnboardingWizardProps,
} from '../types';

// Dynamic imports with proper type annotations to avoid circular dependencies
const OnboardingWizard = React.lazy(() =>
  import('./OnboardingWizard').then((module) => ({
    default:
      module.OnboardingWizard as React.ComponentType<OnboardingWizardProps>,
  })),
);

const OnboardingWelcomeCard = React.lazy(() =>
  import('./OnboardingWelcomeCard').then((module) => ({
    default:
      module.OnboardingWelcomeCard as React.ComponentType<OnboardingWelcomeCardProps>,
  })),
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  container: {
    marginTop: theme.spacing(2),
  },
  infoCard: {
    marginBottom: theme.spacing(3),
  },
  progressContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  welcomeContainer: {
    margin: theme.spacing(2, 0),
  },
}));

// Default steps moved to mocks.ts
/*const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to the Developer Portal',
    description: 'Get started with the Backstage developer portal and learn how to register your components',
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
    description: 'Learn how to document your component using Markdown and TechDocs',
    order: 2,
    completed: false,
    optional: true,
  },
  {
    id: 'ci-cd',
    title: 'Set Up CI/CD',
    description: 'Configure continuous integration and delivery for your component',
    order: 3,
    completed: false,
    optional: true,
  },
  {
    id: 'apis',
    title: 'Register APIs',
    description: 'If your component exposes APIs, learn how to document and register them',
    order: 4,
    completed: false,
    optional: true,
  },
];*/

/**
 * The main page component for the user onboarding plugin.
 *
 * Provides a guided flow for new users to get started with the Backstage
 * developer portal, focusing on component registration and related tasks.
 */
export const UserOnboardingPage: React.FC = () => {
  const classes = useStyles();
  const [steps, setSteps] = useState<OnboardingStep[]>(defaultSteps);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading] = useState(false);

  // Calculate the percentage of required steps completed
  const requiredSteps = steps.filter((step) => !step.optional);
  const completedRequired = requiredSteps.filter(
    (step) => step.completed,
  ).length;
  const progressPercentage =
    requiredSteps.length > 0
      ? Math.round((completedRequired / requiredSteps.length) * 100)
      : 0;

  const handleStartOnboarding = () => {
    setIsStarted(true);
  };

  const handleStepComplete = (stepId: string) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, completed: true } : step,
      ),
    );
  };

  if (isLoading) {
    return <Progress />;
  }

  return (
    <Content className={classes.root}>
      <ContentHeader title="Developer Onboarding">
        <SupportButton>
          This tool guides you through the process of registering and
          documenting your software within the developer portal.
        </SupportButton>
      </ContentHeader>

      {!isStarted ? (
        <div className={classes.welcomeContainer}>
          <Suspense fallback={<Progress />}>
            <OnboardingWelcomeCard onGetStarted={handleStartOnboarding} />
          </Suspense>
        </div>
      ) : (
        <>
          <Grid container spacing={3} className={classes.container}>
            <Grid item xs={12}>
              <InfoCard className={classes.progressContainer}>
                <Typography variant="subtitle1">
                  Onboarding Progress: {progressPercentage}% complete
                </Typography>
                <Progress variant="determinate" value={progressPercentage} />
              </InfoCard>
            </Grid>

            <Grid item xs={12}>
              <Suspense fallback={<Progress />}>
                <OnboardingWizard
                  steps={steps}
                  onStepComplete={handleStepComplete}
                />
              </Suspense>
            </Grid>

            {progressPercentage === 100 && (
              <Grid item xs={12}>
                <InfoCard title="Onboarding Complete!">
                  <Typography variant="body1">
                    Congratulations! You've completed all required onboarding
                    steps. You can now fully utilize the Backstage developer
                    portal.
                  </Typography>
                </InfoCard>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Content>
  );
};
