import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, count) {
  id += 1;
  return { id, name, count};
}


function ResultTable(props) {
  const { classes, items } = props;
  let rows = items.map((item)=>{ return createData(item.itemName,item.count)})
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow >
            <CustomTableCell style={{fontSize:'18px',fontWeight:'bold'}}>Item Name</CustomTableCell>
            <CustomTableCell numeric style={{fontSize:'18px',fontWeight:'bold'}}>Count</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow className={classes.row} key={rows.id}>
                <CustomTableCell>{row.name} </CustomTableCell>
                <CustomTableCell numeric>{row.count}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

ResultTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultTable);
