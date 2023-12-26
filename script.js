document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const totalTasks = document.getElementById('totalTasks');
    const clearCompletedBtn = document.getElementById('clearCompleted');

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (taskInput.value.trim() !== '') {
            addTask(taskInput.value);
            taskInput.value = '';
            updateTotalTasks();
        }
    });

    clearCompletedBtn.addEventListener('click', function () {
        const completedTasks = document.querySelectorAll('.completed');
        completedTasks.forEach(task => taskList.removeChild(task));
        updateTotalTasks();
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div class="task-buttons">
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
                <button class="edit-btn" onclick="editTask(this)">Edit</button>
                <button class="done-btn" onclick="toggleDoneTask(this)">Done</button>
            </div>
        `;
        taskList.appendChild(li);
    }

    window.deleteTask = function (element) {
        const li = element.closest('li');
        taskList.removeChild(li);
        updateTotalTasks();
    };

    window.editTask = function (element) {
        const li = element.closest('li');
        const taskText = li.querySelector('.task-text');
        const newText = prompt('Edit task:', taskText.textContent);
        if (newText !== null) {
            taskText.textContent = newText;
        }
    };

    window.toggleDoneTask = function (element) {
        const li = element.closest('li');
        li.classList.toggle('completed');
        const doneBtn = li.querySelector('.done-btn');
        doneBtn.textContent = li.classList.contains('completed') ? 'Undone' : 'Done';
        updateTotalTasks();
    };

    function updateTotalTasks() {
        const total = document.querySelectorAll('li').length;
        totalTasks.textContent = total;
    }
});