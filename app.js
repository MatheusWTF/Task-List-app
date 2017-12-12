//Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Call Function loadEventListeners()
loadEventListeners();

//Load all EventListeners
function loadEventListeners() {
  //Add Task Event
  form.addEventListener('submit', addTask);
}

//AddTask
function addTask(e) {
  e.preventDefault();
  if(taskInput.value === ''){alert('Add a Task')}

  //Create li Element
  const li = document.createElement('li');
  //Add Class to li
  li.className = 'collection-item';
  //Create Text node and Append to li
  li.appendChild(document.createTextNode(taskInput.value));

  //Create new Link Element
  const link = document.createElement('a');
  //Add Class
  link.className = 'delete-item secondary-content';
  //Add Icon
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //Append the link to li
  li.appendChild(link);
  //Append li to ul
  taskList.appendChild(li);
  //Clear input
  taskInput.value = '';
}