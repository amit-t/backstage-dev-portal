import {
  ContentHeader,
  InfoCard,
  LinkButton,
} from '@backstage/core-components';
import {
  Button,
  Grid,
  type Theme,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginBottom: theme.spacing(4),
  },
  getStartedButton: {
    marginTop: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  benefitIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  welcomeHeader: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
  },
}));

type OnboardingWelcomeCardProps = {
  /** Handler for when the user clicks the Get Started button */
  onGetStarted: () => void;
};

/**
 * A welcome card component for the onboarding experience.
 *
 * Displays a friendly introduction to the developer portal
 * and encourages the user to start the onboarding process.
 */
export const OnboardingWelcomeCard = ({
  onGetStarted,
}: OnboardingWelcomeCardProps) => {
  const classes = useStyles();

  return (
    <InfoCard title="Welcome to the Developer Portal" className={classes.card}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Typography variant="h6" className={classes.welcomeHeader}>
            Get started with your developer journey
          </Typography>

          <Typography variant="body1" paragraph>
            The Developer Portal helps you discover, build, and manage software
            components across your organization. We'll guide you through the
            process of registering your first component and unlocking all the
            features of the platform.
          </Typography>

          <Typography variant="body1" paragraph>
            This onboarding experience will help you:
          </Typography>

          <div className={classes.benefitItem}>
            <EmojiPeopleIcon className={classes.benefitIcon} fontSize="small" />
            <Typography variant="body1">
              Register your components in the catalog
            </Typography>
          </div>

          <div className={classes.benefitItem}>
            <EmojiPeopleIcon className={classes.benefitIcon} fontSize="small" />
            <Typography variant="body1">
              Learn how to document your software
            </Typography>
          </div>

          <div className={classes.benefitItem}>
            <EmojiPeopleIcon className={classes.benefitIcon} fontSize="small" />
            <Typography variant="body1">
              Set up continuous integration and delivery
            </Typography>
          </div>

          <div className={classes.benefitItem}>
            <EmojiPeopleIcon className={classes.benefitIcon} fontSize="small" />
            <Typography variant="body1">
              Register and document your APIs
            </Typography>
          </div>

          <Button
            variant="contained"
            color="primary"
            className={classes.getStartedButton}
            endIcon={<ArrowForwardIcon />}
            onClick={onGetStarted}
          >
            Get Started
          </Button>
        </Grid>

        <Grid item xs={12} md={5}>
          <ContentHeader title="Quick Links" />
          <Typography variant="body2" paragraph>
            You can also explore these resources to learn more about the
            developer portal:
          </Typography>

          <LinkButton
            color="primary"
            to="https://backstage.io/docs"
            variant="outlined"
            fullWidth
            style={{ marginBottom: 8 }}
          >
            Backstage Documentation
          </LinkButton>

          <LinkButton
            color="primary"
            to="/catalog"
            variant="outlined"
            fullWidth
            style={{ marginBottom: 8 }}
          >
            Software Catalog
          </LinkButton>

          <LinkButton color="primary" to="/docs" variant="outlined" fullWidth>
            TechDocs
          </LinkButton>
        </Grid>
      </Grid>
    </InfoCard>
  );
};
