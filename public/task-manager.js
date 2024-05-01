const priorities = { 'High': 1, 'Medium': 2, 'Low': 3 };
let tasks = []; 


// Function to add a task to the DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.classList.add('task', task.priority.toLowerCase());

    const descriptionSpan = document.createElement('span');
    descriptionSpan.classList.add('task-description');
    descriptionSpan.textContent = task.description;

    const categorySpan = document.createElement('span');
    categorySpan.classList.add('task-category');
    categorySpan.textContent = task.category;

    const dateSpan = document.createElement('span');
    dateSpan.classList.add('task-date');
    const date = new Date(task.dueDate);
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    dateSpan.textContent = formattedDate;

    const prioritySpan = document.createElement('span');
    prioritySpan.classList.add('task-priority');
    prioritySpan.textContent = task.priority;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-task');
    deleteButton.innerHTML = '&#10006;'; // 'X' symbol

    li.appendChild(descriptionSpan);
    li.appendChild(categorySpan);
    li.appendChild(dateSpan);
    li.appendChild(prioritySpan);
    li.appendChild(deleteButton);

    const taskList = document.getElementById('task-list');
    taskList.prepend(li);
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskCategory = document.getElementById('task-category');
    const taskDueDate = document.getElementById('task-due-date');
    const taskPriority = document.getElementById('task-priority');
    const taskList = document.getElementById('task-list');

    // Handle task form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const newTask = {
            description: taskInput.value,
            category: taskCategory.value,
            dueDate: taskDueDate.value,
            priority: taskPriority.value,
            index: tasks.length // Index based on the current length of the tasks array
        };

        // Add the new task at the right position
        tasks.push(newTask);
        const sortedTasks = sortTasksByPriority(tasks);

        // Clear the list and add all tasks again in sorted order
        taskList.innerHTML = '';
        sortedTasks.forEach(addTaskToDOM);

        // Clear form fields after submission
        taskInput.value = '';
        taskCategory.value = '';
        taskDueDate.value = '';
        taskPriority.value = '';
    });

    document.getElementById('task-list').addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-task')) {
            const index = e.target.dataset.index; // Get the index of the task to delete
            tasks.splice(index, 1); // Remove the task from the array
            e.target.parentElement.remove(); // Remove the task from the DOM
        }
    });
});
