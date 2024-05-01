const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('public')); // Serve static files

let tasks = []; // Placeholder for tasks

app.listen(port, () => {
  console.log(`Task Manager app listening at http://localhost:${port}`);
});

app.use(express.static('public'));


// Create a new task
app.post('/tasks', (req, res) => {
  const { description, category, dueDate, priority, subtasks } = req.body;
  if (!description) {
    return res.status(400).send({ error: 'Description is required' });
  }
  const task = {
    id: tasks.length + 1,
    description,
    category, // New property
    dueDate, // New property
    priority, // New property
    subtasks: subtasks || [], // New property, optional and defaults to an empty array
  };
  tasks.push(task);
  res.status(201).send(task);
});

// Get all tasks, with optional filtering
app.get('/tasks', (req, res) => {
  let filteredTasks = tasks;
  const { category, priority } = req.query;

  // Simple filtering
  if (category) {
    filteredTasks = filteredTasks.filter(task => task.category === category);
  }
  if (priority) {
    filteredTasks = filteredTasks.filter(task => task.priority === priority);
  }

  res.send(filteredTasks);
});

// Get a single task
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send({ error: 'Task not found' });
  res.send(task);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send({ error: 'Task not found' });

  const { description, category, dueDate, priority, subtasks } = req.body;
  // Update task properties
  task.description = description || task.description;
  task.category = category || task.category;
  task.dueDate = dueDate || task.dueDate;
  task.priority = priority || task.priority;
  if (subtasks) task.subtasks = subtasks;

  res.send(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex < 0) return res.status(404).send({ error: 'Task not found' });

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

