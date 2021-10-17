const express = require('express');
const { readFile, writeFile } = require('fs').promises;

const addTodoRouter = express.Router();

addTodoRouter.post('/', async (req, res) => {

  try {
    // odczyt bazy danych
    const db = await readFile('./db.json', 'utf8');
    const dbObject = JSON.parse(db);
  
    // dodanie nowego todo do tablicy todos
    dbObject.todos.push(req.body);
    
    // nadanie nowych ID's
    const todosWithIDs = dbObject.todos.map((todo, index) => ({id: Math.ceil(2152352195 * index * Math.random()), ...todo}))
  
    // zamiana na string
    const todosJSON = JSON.stringify({ todos: todosWithIDs });
  
    // zapis w pliku
    await writeFile('./db.json', todosJSON);
    
    // wysłanie odpowiedzi z dodanym todo.
    const addedTodoIndex = todosWithIDs.length - 1;
    res.status(201).json(todosWithIDs[addedTodoIndex]);
    
  } catch (error) {
    console.log(error);
    res.status(500).end();
  } 
});

module.exports = { 
  addTodoRouter
};