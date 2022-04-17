import React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/actions/countSlice';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = {
  root: {
    '&.MuiButton-root': {
      backgroundColor: 'white',
      padding: '10px',
      margin: '5px',
    },
  },
};

function Counter(props) {
  const { classes } = props;

  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.count);

  var increaseCount = () => {
    dispatch(increment());
  };
  var decreaseCount = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <header>Counter App</header>
      <div>
        <Button onClick={increaseCount} className={classes.root}>
          + 1
        </Button>

        <Button onClick={decreaseCount} className={classes.root}>
          - 1
        </Button>
      </div>
      <div>{counter}</div>
    </div>
  );
}
Counter.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Counter);
