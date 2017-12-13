//Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Call Function loadEventListeners()
loadEventListeners();

//Load all EventListeners
function loadEventListeners() {
  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add Task Event
  form.addEventListener('submit', addTask);
  //Remove task Even
  taskList.addEventListener('click', removeTask);
  //Clear Tasks Event
  clearBtn.addEventListener('click', clearTasks);
  //Filter Event
  filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from Local Storage
function getTasks(){
  let tasks;

  //Check if LS has any task already saved
  if(localStorage.getItem('tasks') === null){
    tasks = []; //If not, create array
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks')); //if does, parse into JSON
  }

  tasks.forEach((task) => {
    //Create li Element
    const li = document.createElement('li');
    //Add Class to li
    li.className = 'collection-item';
    //Create Text node and Append to li
    li.appendChild(document.createTextNode(task));

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
    })
}

//Add Task Function 
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

  //Store in LocalStorage
  storeTaskLS(taskInput.value);

  //Clear input
  taskInput.value = '';
}

//Store in Local Storage
function storeTaskLS(task){
  let tasks;

  //Check if LS has any task already saved
  if(localStorage.getItem('tasks') === null){
    tasks = []; //If not, create array
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks')); //if does, parse into JSON
  }

  //Add New Task to LS
  tasks.push(task);

  //Save in LS
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task Function
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();

      //Remove from LS
      removeTaskFromLS(e.target.parentElement.parentElement);
    }
  }
}

//Clear Tasks Function
function clearTasks(e){
  // //Option 1
  // taskList.innerHTML = '';

  //Option 2 (faster)
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  //Clear from LocalStorage
  clearLS();
}

//Filter tasks Function
function filterTasks(e){
  //Get the filter input
  const text = e.target.value.toLowerCase();

  //Get the tasks
  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent;

    //Check if Match
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });
}

//Remove Task from LS function
function removeTaskFromLS(taskItem){
  let tasks;

  //Check if LS has any task already saved
  if(localStorage.getItem('tasks') === null){
    tasks = []; //If not, create array
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks')); //if does, parse into JSON
  }

  tasks.forEach((task, index) => {
    if(taskItem.textContent === task){
      tasks.splice(index, 1);

    }
  })

  //Set LocalStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear LS function
function clearLS(){
  localStorage.clear();
};