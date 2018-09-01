
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import UploadImage from './uploadImage';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function App(props) {
  const { classes } = props;

  return (
    <div>
      <Toolbar style={{backgroundColor:'#074e68',color:'#fff'}}>
        <Typography variant="title" color="inherit">
          Items Detector
        </Typography>
      </Toolbar>
      <Paper className={classes.root} elevation={1} style={{minHeight:"100vh"}}>
        <UploadImage />
      </Paper>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

