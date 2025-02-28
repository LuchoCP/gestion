// Obtener referencias a los elementos del DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Función para agregar una nueva tarea
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Por favor, escribe una tarea.');
    return;
  }

  // Crear un nuevo elemento de lista
  const li = document.createElement('li');
  li.textContent = taskText;

  // Botón para eliminar la tarea
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
  });

  // Marcar tarea como completada
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  // Agregar el botón de eliminar al elemento de lista
  li.appendChild(deleteBtn);

  // Agregar la tarea a la lista
  taskList.appendChild(li);

  // Limpiar el campo de entrada
  taskInput.value = '';
}

// Agregar evento al botón "Agregar"
addTaskBtn.addEventListener('click', addTask);

// Permitir agregar tarea presionando Enter
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});
