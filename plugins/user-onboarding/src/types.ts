/**
 * Represents a step in the onboarding process.
 */
export type OnboardingStep = {
  /** Unique identifier for the step */
  id: string;
  /** The title displayed at the top of the step */
  title: string;
  /** Longer description explaining what the user needs to do */
  description: string;
  /** Whether this step is optional or required */
  optional?: boolean;
  /** Whether this step is completed */
  completed?: boolean;
  /** Order in the sequence of steps */
  order: number;
  /** Link to documentation or help for this step */
  helpLink?: string;
};

/**
 * Metadata for a component being registered during onboarding.
 */
export type ComponentMetadata = {
  /** Name of the component */
  name: string;
  /** Description of what the component does */
  description: string;
  /** The type of component (service, website, library, etc) */
  type: string;
  /** The team or person that owns this component */
  owner: string;
  /** The lifecycle status of the component */
  lifecycle?: 'experimental' | 'production' | 'deprecated';
  /** System that this component is part of */
  system?: string;
  /** Tags to help categorize the component */
  tags?: string[];
  /** Link to source code repository */
  repoUrl?: string;
  /** Link to API documentation */
  apiDocLink?: string;
};

/**
 * Configuration options for the onboarding process.
 */
export type OnboardingOptions = {
  /** Whether onboarding is required for new users */
  required?: boolean;
  /** The default steps to display in the onboarding process */
  defaultSteps?: OnboardingStep[];
  /** The maximum number of steps to show at once */
  maxStepsVisible?: number;
  /** Whether to show a progress indicator */
  showProgress?: boolean;
};

/**
 * Props for the OnboardingStepCard component
 */
export interface OnboardingStepCardProps {
  /** The step to display */
  step: OnboardingStep;
  /** Handler for when the step is completed */
  onStepComplete?: (stepId: string) => void;
  /** Handler for when the step action is clicked */
  onStepAction?: (stepId: string) => void;
  /** Whether the step is active (currently being worked on) */
  isActive?: boolean;
}

/**
 * Props for the OnboardingWelcomeCard component
 */
export interface OnboardingWelcomeCardProps {
  /** Handler for when the user clicks the Get Started button */
  onGetStarted: () => void;
}

/**
 * Props for the OnboardingWizard component
 */
export interface OnboardingWizardProps {
  /** Steps to display in the wizard */
  steps: OnboardingStep[];
  /** Handler for when a step is completed */
  onStepComplete?: (stepId: string) => void;
  /** Handler for when the entire onboarding process is completed */
  onComplete?: () => void;
  /** Maximum number of steps to show at once */
  maxVisibleSteps?: number;
}

/**
 * State types for the OnboardingWizard component
 */
export type OnboardingWizardState =
  | { status: 'not_started' }
  | { status: 'in_progress'; currentStepId: string }
  | { status: 'completed' };
