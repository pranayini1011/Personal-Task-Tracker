// Load tasks when the page loads
window.onload = function() {
    loadTasks();
  };
  
  // Function to add a task
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const priority = document.getElementById('priority');
    const taskList = document.getElementById('taskList');
  
    const taskText = taskInput.value.trim();
    const priorityValue = priority.value;
  
    if (taskText === '') {
      alert('Please enter a task');
      return;
    }
  
    // Create task object
    const task = {
      text: taskText,
      priority: priorityValue
    };
  
    // Get existing tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Add new task to the array
    tasks.push(task);
  
    // Save the updated tasks array back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  
    // Display the task on the page
    displayTask(task);
  
    // Clear input field
    taskInput.value = '';
  }
  
  // Function to display a task on the page
  function displayTask(task) {
    const taskList = document.getElementById('taskList');
  
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;
    taskItem.classList.add(task.priority);
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.onclick = function() {
      removeTask(task);
      taskItem.remove();
    };
  
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  }
  
  // Function to load tasks from local storage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      displayTask(task);
    });
  }
  
  // Function to remove a task from local storage
  function removeTask(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskToRemove.text || task.priority !== taskToRemove.priority);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Function to filter tasks by priority
  function filterTasks() {
    const filterValue = document.getElementById('filterPriority').value;
    const taskList = document.getElementById('taskList');
  
    // Clear the current task list
    taskList.innerHTML = '';
  
    // Get tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Filter tasks based on the selected priority
    const filteredTasks = filterValue === 'all' 
      ? tasks 
      : tasks.filter(task => task.priority === filterValue);
  
    // Display the filtered tasks
    filteredTasks.forEach(task => displayTask(task));
  }
  