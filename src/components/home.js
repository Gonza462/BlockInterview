import React from 'react';
import Button from '@material-ui/core/Button';
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

function Home(props) {
  const { classes } = props;
  return (
    <div className="App">
      <header className="App-header">
        <h1>Products</h1>
        <div>
          <a href="/todo">
            <Button className={classes.root}>TODO</Button>
          </a>
          <a href="/counter">
            <Button className={classes.root}>Counter</Button>
          </a>
          <a href="/calculator">
            <Button className={classes.root}>Calculator</Button>
          </a>
        </div>
      </header>
    </div>
  );
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home);
