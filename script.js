// script.js

// Variables globales
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filter-btn');

let tasks = [];

// Función para guardar tareas en el almacenamiento local
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar tareas desde el almacenamiento local
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

// Función para renderizar las tareas
function renderTasks(filter = 'all') {
  taskList.innerHTML = '';
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');
    if (task.completed) li.classList.add('completed');

    const taskText = document.createElement('span');
    taskText.classList.add('task-text');
    taskText.textContent = task.text;

    const actions = document.createElement('div');
    actions.classList.add('task-actions');

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.textContent = task.completed ? 'Desmarcar' : 'Completar';
    completeBtn.addEventListener('click', () => toggleTaskCompletion(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', () => deleteTask(index));

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

// Función para agregar una nueva tarea
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Por favor, escribe una tarea.');
    return;
  }

  tasks.push({ text: taskText, completed: false });
  taskInput.value = '';
  saveTasks();
  renderTasks();
}

// Función para marcar/desmarcar una tarea como completada
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Función para eliminar una tarea
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Evento para agregar tarea al hacer clic en el botón
addTaskBtn.addEventListener('click', addTask);

// Evento para agregar tarea al presionar Enter
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Eventos para filtrar tareas
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    button.classList.add('active');
    const filter = button.dataset.filter;
    renderTasks(filter);
  });
});

// Cargar tareas al iniciar la aplicación
loadTasks();
