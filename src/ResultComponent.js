import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import ResultTable from './ResultTable';



function getModalStyle() {
  const top = 30;
  const left = 40

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: '45%'
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class ResultComponent extends React.Component {
    constructor(props){
       super(props)
       this.state = {
            open: props.open,
          };
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    componentWillReceiveProps(newProps){
        this.setState({open:newProps.open})
    }
    handleOpen(){
        this.setState({ open: true });
    };

    handleClose(){
        this.setState({ open: false });
    };

    render() {
        const { classes, items } = this.props;

        return (
        <div>
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
            >
            <div style={getModalStyle()} className={classes.paper}>
                <Typography variant="title" id="modal-title">
                Result
                </Typography>
                <ResultTable items={items}/>
            </div>
            </Modal>
        </div>
        );
    }
}

ResultComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultComponent);
