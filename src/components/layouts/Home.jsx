import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';

import Copyright from './Copyright';
import HomeBGThree from '../../images/BG_3.svg';
import Root from './Root';

const useStyles = makeStyles((theme) => ({
  iconPadding: {
    marginRight: theme.spacing(2),
  },
  homeBackdrop3: {
    backgroundImage: `url(${HomeBGThree})`,
  },
  setBackground: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '75vh',
    backgroundSize: 'contain',
  },
  description: {
    padding: theme.spacing(3),
    opacity: 0.95,
  },
  gridItem: {
    height: '30vh',
  },
  gridHeight: {
    height: '100vh',
  },
  bronzeFont: {
    color: 'brown',
  },
  goldFont: {
    color: 'orange',
  },
  platinumFont: {
    color: 'gray',
  },
  home: {
    paddingBottom: theme.spacing(3),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Root href="/signin" headerLink="Already have an account ? Sign in">
        <Container className={classes.home}>
          <Box my={2}>
            <Grid className={`${classes.home} ${classes.setBackground} ${classes.homeBackdrop3}`} alignItems="center" justify="center" container>
              <Grid item>
                <Link underline="none" href="/signup" color="inherit">
                  <Button color="secondary" variant="contained">Get Started</Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </Root>
    </>
  );
}
