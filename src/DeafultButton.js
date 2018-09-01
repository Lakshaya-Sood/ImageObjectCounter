import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function DeafultButton(props) {
  const { classes, text, onClick } = props;
  return (
    <div>
      <Button variant="outlined" color="primary" className={classes.button} onClick={onClick}>
        {text}
      </Button>
    </div>
  );
}

DeafultButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeafultButton);
