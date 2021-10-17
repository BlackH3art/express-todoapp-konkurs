const express = require('express');
const { readFile, writeFile } = require('fs').promises;

const deleteRouter = express.Router();

deleteRouter.delete('/:id', async (req, res) => {

  const { id } = req.params;

  try {
    const db = await readFile('./db.json', 'utf8');
    const dbObject = JSON.parse(db);
    
    const filteredTodos = dbObject.todos.filter(item => item.id !== Number(id));


    const todosJSON = JSON.stringify({ todos: filteredTodos });
    await writeFile('./db.json', todosJSON);

    res.status(200).json({ deleted: true });

  } catch (error) {
    console.error(error);
    res.status(404).json({ deleted: false });
  }
});

module.exports = {
  deleteRouter,
}