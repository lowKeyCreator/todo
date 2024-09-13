window.addEventListener('load', () => {
   const form = document.querySelector('#todo-form');
   const input = document.querySelector('#todo-input');
   const list_el = document.querySelector('#todos');
   
   loadToStorage ();

   form.addEventListener('submit', (e) => {
    e.preventDefault();
     const todo = input.value.trim();

     if(!todo) {
      alert ('Please fill your todo');
      return;
     }
     addTodo(todo);
     input.value = '';
     saveToStorage();

    });

     function createTodoElement(todo) {
      const todo_el = document.createElement('div');
      todo_el.classList.add('todo');
     
      const todo_content_el = document.createElement('div');
      todo_content_el.classList.add('content');
 
      const todo_input_el = document.createElement('input');
      todo_input_el.classList.add('text');
      todo_input_el.type = 'text';
      todo_input_el.value = todo;
      todo_input_el.setAttribute('readonly', 'readonly');

      todo_content_el.appendChild(todo_input_el);
      todo_el.appendChild(todo_content_el);
 
      const todo_actions_el = document.createElement('div');
      todo_actions_el.classList.add('actions');
      
     const todo_update_el = createActionButton('update', 'Update');
     const todo_delete_el = createActionButton('delete', 'Delete');

     todo_actions_el.appendChild(todo_update_el);
     todo_actions_el.appendChild(todo_delete_el);
     todo_el.appendChild(todo_actions_el);
      
     return{todo_el, todo_update_el, todo_input_el, todo_delete_el};
    }
     

    function createActionButton(className, text) {
      const button = document.createElement('button');
      button.classList.add(className);
      button.innerText = text;
      return button;
    }

    function addTodo (todo) {
      const {todo_el, todo_update_el, todo_input_el, todo_delete_el} = createTodoElement(todo);

      list_el.appendChild(todo_el);

      todo_update_el.addEventListener ('click', () => {
        if (todo_update_el.innerText.toLowerCase() === 'update') {
            todo_update_el.innerText = 'Save';
            todo_input_el.removeAttribute('readonly');
            todo_input_el.focus();
        } else {
          todo_update_el.innerText = 'Update';
          todo_input_el.setAttribute('readonly', 'readonly');
          saveToStorage();
        }
      });

      todo_delete_el.addEventListener('click', () => {
        list_el.removeChild(todo_el);
        saveToStorage();
      });
    }
 
    function saveToStorage(){
      try {
        const todos = [];
        document.querySelectorAll('.todo').forEach((todo_el) => {
           const todos_text = todo_el.querySelector('.text').value;
           todos.push(todos_text);
        });
        localStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
        alert('An error occurred while saving your tasks.');
      }
    }

    function loadToStorage() {

      try {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTodo(todo));
      } catch (error) {
        console.error('Failed to load from localStorage:', error);
        alert('An error occurred while loading your tasks.');
      }
    }
});
