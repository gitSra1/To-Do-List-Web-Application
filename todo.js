let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function fetchToDo() {
    console.log("hai")
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(function(response) {
            return response.json();
            console.log(response)
        }).then(function(data) {
            console.log(tasks);
            tasks = data.slice(0, 10);

        })
    renderList();
}
fetchToDo();

function addTaskToDom(task) {
    const li = document.createElement('li');
    li.innerHTML = `
          <input type="checkbox" id="${task.id}" ${task.completed?"checked":'.'} class="custom-checkbox">
          <label for="${task.id}">${task.title}</label>
          <img src="images/delete.svg" class="delete" data-id="${task.id}"/>
    `;
    taskList.append(li);

}


function renderList() {
    taskList.innerHTML = "";
    for (let i in tasks) {
        addTaskToDom(tasks[i])
    }
    tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
    const task = tasks.filter(function(task) {
        return task.id === Number(taskId);
    })
    renderList();

}

function deleteTask(taskId) {
    console.log(taskId);
    const newTasks = tasks.filter(function(task) {
        return task.id != Number(taskId);
    })
    tasks = newTasks;
    renderList()
    showNotification('Task deleted successfully');
}

function addTask(task) {
    tasks.push(task);
    console.log(tasks);
    renderList();
    showNotification('Task added succesfully')
}

function showNotification(text) {
    alert(text);
}

function inputHandler(e) {

    if (e.key === 'Enter') {
        const text = e.target.value
        e.target.value = ''
        console.log(e.target, e)
        if (!text) {
            showNotification(text + "task cannot be blank");
            return;
        }
        const x = Date.now()
        const task = {
            title: text,
            id: x,
            completed: false,
        }
        addTask(task);
    }


}

function handleClickListener(e) {
    const target = e.target;
    if (target.className === 'delete') {
        deleteTask(target.dataset.id);
    }
    if (target.className === 'ccustom-checkbox') {

    }

}




addTaskInput.addEventListener('keyup', inputHandler);
document.addEventListener('click', handleClickListener);