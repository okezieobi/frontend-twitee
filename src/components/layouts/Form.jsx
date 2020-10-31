import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

export default function Form({
  content, setContent, formBtnState, handleSubmit, contentErr,
}) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography color="error">{contentErr}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="input-content"
            label="Content"
            name="input-content"
            autoComplete="input-content"
            multiline
            rows={12}
            defaultValue={content}
            onChange={({ target: { value } }) => setContent(value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={formBtnState}
            onClick={handleSubmit}
          >
            {formBtnState ? 'Sending ...' : 'Submit'}
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
  );
}

Form.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func,
  formBtnState: PropTypes.bool,
  handleSubmit: PropTypes.func,
  contentErr: PropTypes.string,
};

Form.defaultProps = {
  content: '',
  setContent: undefined,
  formBtnState: false,
  handleSubmit: undefined,
  contentErr: '',
};
