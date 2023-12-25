let taskFormEL = document.querySelector('#task-form');
taskFormEL.addEventListener('submit', function (event) {
    event.preventDefault();

    let taskInputEL = document.querySelector('#input-item');
    let task = taskInputEL.value.trim();

    // Retrieve tasks from localStorage or create an empty array
    let taskList = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

    // Add the new task to the taskList array
    taskList.unshift(task);

    // Store the updated taskList in localStorage
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // Clear the input field
    taskInputEL.value = '';
    displayTasks();
});

let displayTasks = () => {
    let taskListEL = document.querySelector(".list-group"); // Fixed the query selector
    let taskList = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

    if (taskList.length !== 0) {
        let tasksHTML = '';
        for (let task of taskList) {
            tasksHTML += `<li class="list-group-item list-group-item-success">
                <span>${task}</span>
                <button class="close">
                    <i class="fa fa-times"></i>
                </button>
            </li>`;
        }
        taskListEL.innerHTML = tasksHTML;
    }
}

displayTasks();

let taskListEL = document.querySelector('#task-list');
taskListEL.addEventListener('click', function (event) {
    let targetElement = event.target;
    if (targetElement.classList.contains('fa-times')) {
        let actualEl = targetElement.parentElement.parentElement;
        let selectedTask = actualEl.querySelector('span').textContent.trim();
        let taskList = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        taskList = taskList.filter(function (task) {
            return task.trim() !== selectedTask;
        });
        localStorage.setItem('tasks', JSON.stringify(taskList));
        displayTasks();
    }
});
