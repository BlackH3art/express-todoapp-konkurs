const express = require('express');
const { getTodosRouter } = require('./routes/getTodosRouter');
const { addTodoRouter } = require('./routes/addTodoRouter');
const { deleteRouter } = require('./routes/deleteRouter');
const { doneRouter } = require('./routes/doneRouter');

const app = express();

app.use(express.json());
app.use(express.static('public'));

// routes
app.use('/get-todos', getTodosRouter);
app.use('/add', addTodoRouter);
app.use('/delete', deleteRouter);
app.use('/checked', doneRouter);

app.listen(3000, 'localhost');
