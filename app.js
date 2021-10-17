const express = require('express');
const { todoRouter } = require('./routes/todoRouter');

const app = express();

app.use(express.json());
app.use(express.static('public'));

// routes
app.use('/todo', todoRouter);

app.listen(3000, 'localhost');
