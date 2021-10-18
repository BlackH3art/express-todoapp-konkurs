const express = require('express');
const { readFile, writeFile } = require('fs').promises;

const todoRouter = express.Router(); 

todoRouter
  .get('/get-todos', async (req, res) => {

    try {
      const db = await readFile('./db.json', 'utf8');
      const dbObject = JSON.parse(db);
    
      res.status(200).json(dbObject.todos);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  })

  .post('/add', async (req, res) => {

    try {
      const db = await readFile('./db.json', 'utf8');
      const dbObject = JSON.parse(db);

      const { todo } = req.body;
    
      if(todo === '') {

        res.status(400).json({ error: "Nie zostało wprowadzone żadne zadanie."})
      } else if (todo.length >= 36) {
        res.status(400).json({ error: "To lista zadań, nie pamiętnik! Za dużo znaków."})
      } else {

        dbObject.todos.push(req.body);
        
        const todosWithIDs = dbObject.todos.map((todo, index) => ({id: Math.ceil(2152352195 * index * Math.random()), ...todo}))
      
        const todosJSON = JSON.stringify({ todos: todosWithIDs });
      
        await writeFile('./db.json', todosJSON);
        
        const addedTodoIndex = todosWithIDs.length - 1;

        console.log(todosWithIDs[addedTodoIndex]); // zwracam dodane todo
        res.status(201).json(todosWithIDs[addedTodoIndex]);

      }
      
    } catch (error) {
      console.log(error);
      res.status(500).end();
    } 
  })

  .delete('/delete/:id', async (req, res) => {

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
  })

  .patch('/checked/:id', async (req, res) => {

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
  todoRouter,
}