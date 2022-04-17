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
  const operators = ['+', '-', '*'];

  //safe eval() method alternative
  const safeEval = (expr) => {
    let parens = /\(([0-9+\-*/ .]+)\)/; // Regex for identifying parenthetical expressions
    let exp = /(\d+(?:\.\d+)?) ?\^ ?(\d+(?:\.\d+)?)/; // Regex for identifying exponentials (x ^ y)
    let mul = /(\d+(?:\.\d+)?) ?\* ?(\d+(?:\.\d+)?)/; // Regex for identifying multiplication (x * y)
    let div = /(\d+(?:\.\d+)?) ?\/ ?(\d+(?:\.\d+)?)/; // Regex for identifying division (x / y)
    let add = /(\d+(?:\.\d+)?) ?\+ ?(\d+(?:\.\d+)?)/; // Regex for identifying addition (x + y)
    let sub = /(\d+(?:\.\d+)?) ?- ?(\d+(?:\.\d+)?)/; // Regex for identifying subtraction (x - y)

    if (isNaN(Number(expr))) {
      if (parens.test(expr)) {
        let newExpr = expr.replace(parens, function (match, subExpr) {
          return safeEval(subExpr);
        });
        return safeEval(newExpr);
      } else if (exp.test(expr)) {
        let newExpr = expr.replace(exp, function (match, base, pow) {
          return Math.pow(Number(base), Number(pow));
        });
        return safeEval(newExpr);
      } else if (mul.test(expr)) {
        let newExpr = expr.replace(mul, function (match, a, b) {
          return Number(a) * Number(b);
        });
        return safeEval(newExpr);
      } else if (div.test(expr)) {
        let newExpr = expr.replace(div, function (match, a, b) {
          if (b !== 0) return Number(a) / Number(b);
          else throw new Error('Division by zero');
        });
        return safeEval(newExpr);
      } else if (add.test(expr)) {
        let newExpr = expr.replace(add, function (match, a, b) {
          return Number(a) + Number(b);
        });
        return safeEval(newExpr);
      } else if (sub.test(expr)) {
        let newExpr = expr.replace(sub, function (match, a, b) {
          return Number(a) - Number(b);
        });
        return safeEval(newExpr);
      } else {
        return expr;
      }
    }
    return Number(expr);
  };

  const calculateExpression = (val) => {
    //prevent adjacent operators
    if (
      (operators.includes(val) && calc === '') ||
      (operators.includes(val) && operators.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + val);
    //console.log(val);
    if (!operators.includes(val)) {
      setAnswer(safeEval(calc + val).toString());
    }
  };

  //create buttons 0-9
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

  //set calculations
  const evaulate = () => {
    setCalc(safeEval(calc).toString());
  };

  //delete last number entered
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
            onClick={() => calculateExpression('*')}
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
