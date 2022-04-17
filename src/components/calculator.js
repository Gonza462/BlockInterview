import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import '../index.css';

const styles = {
  root: {
    '&.MuiButton-root': {
      backgroundColor: 'white',
      padding: '10px',
      margin: '5px',
      outline: 'auto',
    },
  },
  operators: {
    '&.MuiButton-root': {
      backgroundColor: '#ffc107',
      padding: '10px',
      margin: '5px',
      outline: 'auto',
    },
  },
  clearButton: {
    '&.MuiButton-root': {
      backgroundColor: 'black',
      color: 'white',
      padding: '10px',
      margin: '5px',
      outline: 'auto',
    },
  },
};

function Calculator(props) {
  const [calc, setCalc] = useState('');
  const [answer, setAnswer] = useState('');
  const operators = ['+', '-', 'x'];

  const calculateExpression = (val) => {
    //prevent adjacent operators
    if (
      (operators.includes(val) && calc === '') ||
      (operators.includes(val) && operators.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + val);
    if (!operators.includes(val)) {
      setAnswer(eval(calc + val).toString());
    }
  };

  const makeDigits = () => {
    const nums = [];
    for (let i = 0; i < 10; i++) {
      nums.push(
        <Button
          onClick={() => calculateExpression(i.toString())}
          className={classes.root}
          key={i}
        >
          {i}
        </Button>
      );
    }
    return nums;
  };

  const evaulate = () => {
    setCalc(eval(calc).toString());
  };
  const deleteVal = () => {
    if (calc === '') return;
    const val = calc.slice(0, -1);
    setCalc(val);
  };

  const { classes } = props;

  return (
    <React.Fragment>
      <div className="calculator">
        <div className="display">
          {answer ? <span>({answer})</span> : ''}
          {calc || '0.0'}
        </div>
        <div className="operators">
          <Button
            onClick={() => calculateExpression('+')}
            className={classes.operators}
          >
            +
          </Button>
          <Button
            onClick={() => calculateExpression('-')}
            className={classes.operators}
          >
            -
          </Button>
          <Button
            onClick={() => calculateExpression('x')}
            className={classes.operators}
          >
            x
          </Button>
        </div>
        <div className="digits">
          {makeDigits()}
          <Button onClick={deleteVal} className={classes.clearButton}>
            DEL
          </Button>
          <Button onClick={evaulate} className={classes.clearButton}>
            =
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

Calculator.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Calculator);
