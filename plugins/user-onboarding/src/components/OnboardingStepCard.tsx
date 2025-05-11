import { InfoCard, Link } from '@backstage/core-components';
import {
  Button,
  Chip,
  Grid,
  type Theme,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DoneIcon from '@material-ui/icons/Done';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import React from 'react';
import type { OnboardingStep, OnboardingStepCardProps } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    transition: 'all 0.3s',
  },
  cardCompleted: {
    opacity: 0.7,
  },
  statusChip: {
    marginLeft: theme.spacing(1),
  },
  optionalChip: {
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.grey[300],
  },
  description: {
    marginTop: theme.spacing(1),
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
  },
  helpLink: {
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  helpIcon: {
    fontSize: '1rem',
    marginRight: theme.spacing(0.5),
  },
}));

// Type definition moved to types.ts

/**
 * A card component that displays a single onboarding step.
 *
 * Shows the step title, description, status (completed/optional),
 * and provides actions to complete the step.
 */
export const OnboardingStepCard = ({
  step,
  onStepComplete,
  onStepAction,
  isActive = false,
}: OnboardingStepCardProps) => {
  const classes = useStyles();
  const { id, title, description, completed, optional, helpLink } = step;

  const handleAction = () => {
    if (onStepAction) {
      onStepAction(id);
    }
  };

  const handleComplete = () => {
    if (onStepComplete) {
      onStepComplete(id);
    }
  };

  return (
    <InfoCard
      title={
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography variant="h6">{title}</Typography>
          </Grid>
          <Grid item>
            {completed && (
              <Chip
                size="small"
                label="Completed"
                color="primary"
                icon={<DoneIcon />}
                className={classes.statusChip}
              />
            )}
            {optional && !completed && (
              <Chip
                size="small"
                label="Optional"
                variant="outlined"
                className={classes.optionalChip}
              />
            )}
          </Grid>
        </Grid>
      }
      className={`${classes.card} ${completed ? classes.cardCompleted : ''}`}
    >
      <Typography variant="body1" className={classes.description}>
        {description}
      </Typography>

      <div className={classes.actions}>
        {helpLink && (
          <Link to={helpLink} className={classes.helpLink}>
            <HelpOutlineIcon className={classes.helpIcon} />
            Learn more
          </Link>
        )}

        {!completed ? (
          <>
            <Button
              color="primary"
              variant="outlined"
              onClick={handleAction}
              endIcon={<ArrowForwardIcon />}
              disabled={!isActive}
            >
              Start
            </Button>
            <Button
              color="primary"
              onClick={handleComplete}
              style={{ marginLeft: 8 }}
              disabled={!isActive}
            >
              Mark as complete
            </Button>
          </>
        ) : (
          <Button variant="text" color="primary" onClick={handleAction}>
            Review
          </Button>
        )}
      </div>
    </InfoCard>
  );
};
