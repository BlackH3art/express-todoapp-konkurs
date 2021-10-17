const ul = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input');
const form = document.querySelector('form');


const createLi = (id, created, todo) => {

  // utworzenie potrzebnych elementów
  const li = document.createElement('li');
  const textContainerDiv = document.createElement('div');
  const buttonContainerDiv = document.createElement('div');
  const dateParagraph = document.createElement('p');
  const todoParagraph = document.createElement('p');
  const checkboxInput = document.createElement('input');
  const deleteButton = document.createElement('button');

  // zagnieżdżenie
  textContainerDiv.appendChild(dateParagraph);
  textContainerDiv.appendChild(todoParagraph);
  buttonContainerDiv.appendChild(checkboxInput);
  buttonContainerDiv.appendChild(deleteButton);
  li.appendChild(textContainerDiv);
  li.appendChild(buttonContainerDiv);

  // nadanie klas elementom
  li.classList.add('todo-li');
  textContainerDiv.classList.add('text-container');
  buttonContainerDiv.classList.add('button-container');
  dateParagraph.classList.add('created-date');
  todoParagraph.classList.add('todo-text');
  checkboxInput.classList.add('input-checkbox');
  deleteButton.classList.add('delete-button');

  // przekazanie textu i atrybutów
  dateParagraph.innerText = created;
  todoParagraph.innerText = todo;
  deleteButton.innerText = 'x';
  checkboxInput.setAttribute('type', 'checkbox');

  deleteButton.addEventListener('click', async (e) => {
    
    try {
      const result = await fetch(`/todo/delete/${id}`, {
        method: "DELETE",
      });

      const data = await result.json();
      const { deleted } = data;
  
      if(deleted) {
        e.target.parentNode.parentNode.remove()
      }

    } catch (error) {
      console.error(error)
    }

  });

  checkboxInput.addEventListener('change', async function (e) {

    try {

      const result = await fetch(`/todo/checked/${id}`, {
        method: "PATCH",
      });
  
      const data = await result.json();
      const { updated, done } = data;
  
      if(done) {
        e.target.parentNode.parentNode.classList.add('done-todo');
      } else {
        e.target.parentNode.parentNode.classList.remove('done-todo');
      }
      
    } catch (error) {
      console.error(error);
    }

  });

  return li;
}


form.addEventListener('submit', async (e) => {

  e.preventDefault();

  const todoValue = todoInput.value;
  const createdDate = new Date();

  const result = await fetch('/todo/add', {
    method: "POST",
    body: JSON.stringify({
      created: createdDate.toLocaleString(),
      todo: todoValue,
      done: false,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  const data = await result.json();
  console.log(data);

  const { id, created, todo } = data
  const newTodo = createLi(id, created, todo);

  ul.appendChild(newTodo);

});


(async () => {

  ul.innerText = "Wczytywanie.."

  try {
    const result = await fetch('/todo/get-todos');
  
    const data = await result.json();
    ul.innerText = "";
  
    data.map(todoObject => {
  
      const { id, created, todo } = todoObject;
      const li = createLi(id, created, todo);
  
      ul.appendChild(li);
    })
    
  } catch (error) {
    console.log(error);
  }
})(); 
