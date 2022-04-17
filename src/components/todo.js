import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = {
  root: {
    '&.MuiFormControl-root': {
      backgroundColor: 'white',
    },
  },
};

function TodoList(props) {
  let [tasks, setTask] = useState([]);
  let [taskName, saveTaskItemName] = useState('');

  const { classes } = props;

  //set the task name
  const saveTaskName = (task) => {
    saveTaskItemName(task);
  };

  //grab task name to add 'onChange'
  var saveTask = (task) => {
    var taskName = task.target.value;
    //set it
    // if (!taskName || /^\s*s/.test(taskName)) return;
    saveTaskName(taskName);
  };

  //reset after adding each item
  var clearInput = () => {
    var input = '';
    document.getElementById('text-input').value = input;
    saveTaskItemName('');
  };

  var addTask = (task) => {
    //TODO: dispatch and state in store

    //locally for now...
    if (!taskName || /^\s*s/.test(taskName)) return;
    setTask((arr) => [...arr, taskName]);
    clearInput();
  };

  return (
    <div>
      <header>Todo App</header>
      <TextField
        id="text-input"
        name="task name"
        type="text"
        label="task name"
        variant="filled"
        onChange={saveTask}
        className={classes.root}
        placeholder="ex: buy groceries: April 15th"
        fullWidth
      />

      <Button onClick={addTask} className={classes.root} variant="contained">
        Add Task
      </Button>
      <ul>
        {tasks.map((task, x) => {
          return <li key={x}>{task}</li>;
        })}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TodoList);
