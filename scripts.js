var tasks = [
    {
        "title": "Arrumar a casa",
        "done": true
    },
    {
        "title": "oioioi",
        "done": false
    },
    {
        "title": "Ir no mercado",
        "done": false
    }
];

var body = document.body;
var main = document.getElementById('list')

const variables = {}

body.addEventListener('load', gerarTasks(tasks))

function gerarTasks(tasks) {
    var i = 0;

    tasks.map( element => {
        element.id = i;

        var task = document.createElement('li');

        task.setAttribute('class', `${element.done === true ? "done" : "undone"}`);
        task.innerHTML = `<input></input><p><span>${element.title}</span><span><button><img></button><button><img></button></span></p>`;
        task.querySelector('input').setAttribute('type', 'checkbox');
        task.querySelector('input').setAttribute('class', `input${element.id}`);
        task.querySelector(`input.input${element.id}`).setAttribute('onclick', `marcarFeito(${element.id})`);
        element.done === true ? task.querySelector('input').setAttribute('checked', true) : '';

        task.querySelectorAll('span')[0].setAttribute('class', 'task-text');

        task.querySelector('p').setAttribute('class', "text");
        task.querySelector('p').setAttribute('class', `text${element.id}`);
        task.querySelector(`p.text${element.id}`).setAttribute('onmousemove', `showTrash(${element.id});showPencil(${element.id})`);
        task.querySelector(`p.text${element.id}`).setAttribute('onmouseout', `hideTrash(${element.id});hidePencil(${element.id})`);

        task.querySelectorAll('button')[0].setAttribute('alt', "edit task");
        task.querySelectorAll('button')[0].setAttribute('class', `edit-task butedt${element.id}`);
        task.querySelector(`button.butedt${element.id}`).setAttribute('onclick', `editTask(${element.id})`);

        task.querySelectorAll('button')[1].setAttribute('alt', "delete task");
        task.querySelectorAll('button')[1].setAttribute('class', `delete-task butdel${element.id}`);
        task.querySelector(`button.butdel${element.id}`).setAttribute('onclick', `deletarTask(${element.id})`);

        task.querySelectorAll('img')[0].setAttribute('src', "assets/pen.svg");
        task.querySelectorAll('img')[1].setAttribute('src', "assets/trash.svg");

        console.log(task);
        main.appendChild(task);
        i++;
    })

    return refreshTasks();
}



function refreshTasks() {
    variables.task = document.querySelectorAll("li");
    variables.taskText = document.querySelectorAll("p.text");
    variables.trash = document.querySelectorAll("button.delete-task");
    variables.pencil = document.querySelectorAll("button.edit-task");
}

function marcarFeito(i) {
    var updatedTask = tasks.find( task => task.id === i);

    if(updatedTask.done === true)
    {
        variables.task[i].setAttribute('class', 'undone');
        variables.task[i].removeAttribute('checked');
        updatedTask.done = false;
    }
    else
    {
        variables.task[i].setAttribute('class', 'done');
        updatedTask.done = true;
    }

    return;
}

function showTrash(i) {
    variables.trash[i].setAttribute('style', 'visibility:visible;');
}

function hideTrash(i) {
    variables.trash[i].setAttribute('style', 'visibility:hidden;');
}

function showPencil(i) {
    variables.pencil[i].setAttribute('style', 'visibility:visible;');
}

function hidePencil(i) {
    variables.pencil[i].setAttribute('style', 'visibility:hidden;');
}

function deletarTask(id) {
    const tasksUpdated = [...tasks];

    const taskIndex = tasksUpdated.findIndex( tasksUpdated => tasksUpdated.id === id);

    tasksUpdated.splice(taskIndex, 1);

    tasks = tasksUpdated;

    main.innerHTML = "";
    gerarTasks(tasks);
}

function editTask(id) {

    const taskUpdated = tasks.find( task => task.id === id);

    const task = document.querySelectorAll('li')[id];
    task.querySelector('p').remove();

    task.innerHTML = `<input></input><form><input></input><input></input></form>`;

    task.querySelector('input').setAttribute('type', 'checkbox');
    task.querySelector('input').setAttribute('class', `input${id}`);
    task.querySelector(`input.input${id}`).setAttribute('onclick', `marcarFeito(${id})`);
    taskUpdated.done === true ? task.querySelector('input').setAttribute('checked', true) : '';

    task.querySelector('form').addEventListener('submit', () => {
        if (task.querySelector('input.edit-name').value == '') return;

        taskUpdated.title = task.querySelector('input.edit-name').value;

        main.innerHTML = "";
        gerarTasks(tasks);
    })

    task.querySelectorAll('input')[1].setAttribute('type', 'text');
    task.querySelectorAll('input')[1].setAttribute('class', 'edit-name');
    task.querySelectorAll('input')[1].setAttribute('placeholder', `${taskUpdated.title}`);

    task.querySelectorAll('input')[2].setAttribute('type', 'submit');
    task.querySelectorAll('input')[2].setAttribute('value', 'Pronto');
    task.querySelectorAll('input')[2].setAttribute('class', 'submit-name');

    console.log(task);
}

function createTask() {
    main.querySelector('button.new-task').remove();

    var newTask = document.createElement('li');

    newTask.innerHTML = '<form><input></input><input></input></form>';

    task.querySelectorAll('input')[0].setAttribute('type', 'text');
    task.querySelectorAll('input')[0].setAttribute('class', 'edit-name');


}