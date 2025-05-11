import { makeStyles } from '@material-ui/core';
import React, { useState, useEffect, useCallback } from 'react';
import type {
  OnboardingStep,
  OnboardingWizardProps,
  OnboardingWizardState,
} from '../types';
import { OnboardingStepCard } from './OnboardingStepCard';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

/**
 * A wizard component that guides users through the onboarding steps.
 *
 * Displays steps in sequence, tracks completion status, and
 * provides a consistent flow for users to follow.
 */

/**
 * A wizard component that guides users through the onboarding steps.
 *
 * Displays steps in sequence, tracks completion status, and
 * provides a consistent flow for users to follow.
 */
export const OnboardingWizard = ({
  steps,
  onStepComplete,
  onComplete,
  maxVisibleSteps = 3,
}: OnboardingWizardProps) => {
  const classes = useStyles();
  const [wizardState, setWizardState] = useState<OnboardingWizardState>({
    status: 'not_started',
  });

  // Sort steps by their order property
  const sortedSteps = [...steps].sort(
    (a, b) => (a.order || 0) - (b.order || 0),
  );

  // Memoize the findNextIncompleteStep function to fix dependency issues
  const findNextIncompleteStep = useCallback((): string | null => {
    // First, look for incomplete required steps
    const nextRequiredStep = sortedSteps.find(
      (step) => !step.completed && !step.optional,
    );

    if (nextRequiredStep) {
      return nextRequiredStep.id;
    }

    // If all required steps are complete, check for optional steps
    const nextOptionalStep = sortedSteps.find(
      (step) => !step.completed && step.optional,
    );

    return nextOptionalStep?.id || null;
  }, [sortedSteps]);

  // Initialize the wizard with the first step
  useEffect(() => {
    if (wizardState.status === 'not_started' && steps.length > 0) {
      const nextStepId = findNextIncompleteStep();

      if (nextStepId) {
        setWizardState({
          status: 'in_progress',
          currentStepId: nextStepId,
        });
      } else {
        setWizardState({ status: 'completed' });
      }
    }
  }, [findNextIncompleteStep, steps.length, wizardState.status]);

  // Check if all required steps are completed
  useEffect(() => {
    if (wizardState.status === 'in_progress') {
      const allRequiredComplete = sortedSteps
        .filter((step) => !step.optional)
        .every((step) => step.completed);

      if (allRequiredComplete && onComplete) {
        onComplete();
      }
    }
  }, [sortedSteps, wizardState.status, onComplete]);

  const handleStepComplete = (stepId: string) => {
    if (onStepComplete) {
      onStepComplete(stepId);
    }

    // Find the next step after a brief delay to allow state updates
    setTimeout(() => {
      const nextStepId = findNextIncompleteStep();

      if (nextStepId) {
        setWizardState({
          status: 'in_progress',
          currentStepId: nextStepId,
        });
      } else {
        setWizardState({ status: 'completed' });
      }
    }, 300);
  };

  const handleStepAction = (stepId: string) => {
    // Update the current step ID when a step is activated
    setWizardState({
      status: 'in_progress',
      currentStepId: stepId,
    });
  };

  if (wizardState.status === 'not_started' || steps.length === 0) {
    return null;
  }

  // Determine which steps to show
  // We want to show the current step and a few steps before and after
  let visibleSteps: OnboardingStep[] = [];

  if (wizardState.status === 'in_progress') {
    const currentStepIndex = sortedSteps.findIndex(
      (step) => step.id === wizardState.currentStepId,
    );

    if (currentStepIndex !== -1) {
      // Calculate the range of steps to show
      const halfVisible = Math.floor(maxVisibleSteps / 2);
      const startIndex = Math.max(0, currentStepIndex - halfVisible);
      const endIndex = Math.min(
        sortedSteps.length - 1,
        currentStepIndex + halfVisible,
      );

      visibleSteps = sortedSteps.slice(startIndex, endIndex + 1);
    }
  } else {
    // Show all steps when completed
    visibleSteps = sortedSteps;
  }

  return (
    <div className={classes.root}>
      {visibleSteps.map((step) => (
        <OnboardingStepCard
          key={step.id}
          step={step}
          onStepComplete={handleStepComplete}
          onStepAction={handleStepAction}
          isActive={
            wizardState.status === 'in_progress' &&
            wizardState.currentStepId === step.id
          }
        />
      ))}
    </div>
  );
};
