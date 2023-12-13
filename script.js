// Data storage - Initialize the array of To Do items
let todoItems = [];
let uniqueCount = [0];

// Function to add a todo to the list
function addToDoItem(taskDescription, dueDate, priority) {
  if (typeof taskDescription === "string") {
    console.log("Thanks a lot!");
    let isTaskCompleted = false;
    let taskID = uniqueCount[0]++;

    // Check if ID already exists, generate a new one if needed
    while (todoItems.some(item => item.id === taskID)) {
      taskID = uniqueCount[0]++;
    }

    let taskObj = { id: taskID, text: taskDescription, dueDate: dueDate, priority: priority, completed: isTaskCompleted };
    todoItems.push(taskObj);
    console.log(todoItems);
  } else {
    console.log("Please input a string, my friend");
  }
}

// Function to delete a task from the array
function deleteToDoItem(taskID) {
  if (Number.isInteger(taskID) && taskID > 0) {
    console.log("Excellent choice of ID");
    let remainingTasks = [];
    let removed = false;

    for (let i = 0; i < todoItems.length; i++) {
      if (todoItems[i].id === taskID) {
        console.log("Successfully removed!");
        removed = true;
        break; // Exit the loop once the item is found and removed
      } else {
        remainingTasks.push(todoItems[i]);
      }
    }

    if (!removed) {
      console.log("Couldn't find a todo with that ID");
    }

    todoItems = remainingTasks;
  } else {
    console.log("Please input a valid ID, my friend");
  }
}

// ... (Previous code)

document.addEventListener('DOMContentLoaded', function () {
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');
    const newTodoInput = document.getElementById('new-todo');
    const dueDateInput = document.getElementById('due-date');
    const priorityInput = document.getElementById('priority');
    const addButton = document.getElementById('add-button');
    const clearCompletedButton = document.getElementById('clear-completed');

    addButton.addEventListener('click', addTodo);
    clearCompletedButton.addEventListener('click', clearCompletedTasks);

    // Initialize with some tasks
    addToDoItem("Build an awesome Todo app", "2023-12-01", "high");
    addToDoItem("Learn JavaScript", "2023-12-15", "medium");
    addToDoItem("Have fun coding!", "2023-12-31", "low");

    function renderTodoList() {
        todoList.innerHTML = ''; // Clear existing list

        for (const todoItem of todoItems) {
            const todoItemElement = createTodoItemElement(todoItem);
            todoList.appendChild(todoItemElement);
        }

        updateEmptyState();
    }

    function createTodoItemElement(todoItem) {
        const todoItemElement = document.createElement('li');
        todoItemElement.classList.add('todo-item');
        if (todoItem.completed) {
            todoItemElement.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todoItem.completed;
        checkbox.addEventListener('change', function () {
            markToDoItemAsCompleted(todoItem.id);
            renderTodoList();
        });

        const todoText = document.createElement('span');
        todoText.textContent = todoItem.text;

        const dueDate = document.createElement('span');
        dueDate.textContent = todoItem.dueDate ? `Due: ${todoItem.dueDate}` : '';

        const priority = document.createElement('span');
        priority.textContent = todoItem.priority ? `Priority: ${todoItem.priority}` : '';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            deleteToDoItem(todoItem.id);
            renderTodoList();
        });

        todoItemElement.appendChild(checkbox);
        todoItemElement.appendChild(todoText);
        todoItemElement.appendChild(dueDate);
        todoItemElement.appendChild(priority);
        todoItemElement.appendChild(deleteButton);

        return todoItemElement;
    }

    function addTodo() {
        const text = newTodoInput.value.trim();
        const dueDate = dueDateInput.value.trim();
        const priority = priorityInput.value.trim();

        if (text === '') return;

        addToDoItem(text, dueDate, priority);
        renderTodoList();
        newTodoInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = 'low';
    }

    // ... (Previous functions) ...

    // Render initial tasks
    renderTodoList();
});
