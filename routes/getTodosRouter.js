const express = require('express');
const { readFile } = require('fs').promises;

const getTodosRouter = express.Router();

getTodosRouter.get('/', async (req, res) => {

  try {
    const db = await readFile('./db.json', 'utf8');
    const dbObject = JSON.parse(db);
  
    res.status(200).json(dbObject.todos);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

module.exports = {
  getTodosRouter,
}