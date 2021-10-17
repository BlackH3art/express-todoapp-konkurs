const express = require('express');
const { readFile, writeFile } = require('fs').promises;

const doneRouter = express.Router(); 

doneRouter.patch('/:id', async (req, res) => {

  const { id } = req.params;

  try {
    const db = await readFile('./db.json', 'utf8');
    const dbObject = JSON.parse(db);
    
    const todoToChange = dbObject.todos.find(todo => todo.id === Number(id))
    todoToChange.done = !todoToChange.done

    const todosJSON = JSON.stringify({ todos: dbObject.todos });
    await writeFile('./db.json', todosJSON);

    res.status(200).json({ updated: true, done: todoToChange.done });
    
  } catch (error) {
    console.error(error);
    res.status(404).json({ updated: false, done: null });
  }
});

module.exports = {
  doneRouter,
}