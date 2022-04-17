import React from 'react';
import './App.css';
import Counter from './components/counter';
import Calculator from './components/calculator';
import TodoList from './components/todo';
import Home from './components/home';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = {
  root: {
    '&.MuiButton-root': {
      margin: '5px',
    },
  },
};

function App(props) {
  const { classes } = props;

  return (
    <div className="App">
      <Navbar bg="myColor" variant="dark" fixed="top" expand="lg">
        <Navbar.Brand href="/">
          <div style={{ padding: '5px' }}>HOME</div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="counter">Counter</Nav.Link>
            <Nav.Link href="todo">Todo List</Nav.Link>
            <Nav.Link href="calculator">Calculator</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/counter" element={<Counter />} />
            <Route exact path="/calculator" element={<Calculator />} />
            <Route exact path="/todo" element={<TodoList />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
