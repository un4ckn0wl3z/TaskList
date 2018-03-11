// Defind UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn =  document.querySelector('.clear-task');
const filter =  document.querySelector('#filter');
const taskInput =  document.querySelector('#task');

// Load all event listeners

loadEventListeners();

// Load all event listeners func

function loadEventListeners(){

  // DOM Load event
  document.addEventListener('DOMContentLoaded',getTasks);

  // Add task event
  form.addEventListener('submit',addTask);
  // Remove task event
  taskList.addEventListener('click',removeTask);
  // Clear task event
  clearBtn.addEventListener('click',clearTasks);
  // Filter task
  filter.addEventListener('keyup',filterTasks);
}

// Get tasks from LS
function getTasks(e){
  let tasks;
  if(localStorage.getItem('tasks') === null ){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
        // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';

  // Create Text node and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon  html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link into li
  li.appendChild(link);

  // Append li to ui

  taskList.appendChild(li);

  });
}

// Add task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
  }else{
    // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';

  // Create Text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon  html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link into li
  li.appendChild(link);

  // Append li to ui

  taskList.appendChild(li);
  
  // Store in local store
  storeTaskLocalStore(taskInput.value);

  // Clear input
  taskInput.value = '';

  console.log(li);

  }
  
  e.preventDefault();
}
function storeTaskLocalStore(task){
  let tasks;
  if(localStorage.getItem('tasks') === null ){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));

}


// Remove Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
    
  }
 
}
function removeTaskFromLocalStorage(taskItem,index){
  let tasks;
  if(localStorage.getItem('tasks') === null ){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Clear task
function clearTasks(e){
  // taskList.innerHTML = '';

  // Faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStore();

  e.preventDefault();

}
// Clear task from local storage
function clearTasksFromLocalStore(){
  localStorage.clear();
}

// filter task
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLocaleLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });
}