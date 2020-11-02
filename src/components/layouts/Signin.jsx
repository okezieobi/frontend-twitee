import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import AuthHeader from './Root';
import Copyright from './Copyright';
import SigninBG from '../../images/Signin.svg';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    backgroundImage: `url(${SigninBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
  },
}));

export default function Signin({
  setEmail, setPassword, signinErr,
  handleSubmit, formBtnState,
}) {
  const classes = useStyles();

  return (
    <div className={classes.backdrop}>
      <AuthHeader>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email-username"
                label="Email Address / Username"
                name="email-username"
                autoComplete="email-username"
                autoFocus
                onChange={({ target: { value } }) => setEmail(value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={({ target: { value } }) => setPassword(value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={handleSubmit}
                disabled={formBtnState}
              >
                {formBtnState ? 'Sending ...' : 'Submit'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/password-reset" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Do not have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Grid container justify="center">
                <Grid item>
                  <Typography color="error">{signinErr}</Typography>
                </Grid>
              </Grid>
            </form>
          </Paper>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </AuthHeader>
    </div>
  );
}

Signin.propTypes = {
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
  handleSubmit: PropTypes.func,
  formBtnState: PropTypes.bool,
  signinErr: PropTypes.string,
};

Signin.defaultProps = {
  setEmail: undefined,
  setPassword: undefined,
  handleSubmit: undefined,
  formBtnState: false,
  signinErr: undefined,
};
