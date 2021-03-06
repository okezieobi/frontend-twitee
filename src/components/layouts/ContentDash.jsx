import React from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Dashboard from './Dashboard';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

export default function ContentDash() {
  const history = useHistory();
  const classes = useStyles();
  const rowData = JSON.parse(localStorage.getItem('clickedRow'));

  const handleEditClick = () => {
    history.push('/home/twit/edit');
  };

  return (
    <Dashboard homeSelect>
      <Paper className={classes.paper}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Name:
              <br />
              {rowData ? rowData[0] : ''}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Content:
              <br />
              {rowData ? rowData[1] : ''}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Created On:
              <br />
              {rowData ? rowData[2] : ''}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleEditClick}
            >
              Comment
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Dashboard>
  );
}
