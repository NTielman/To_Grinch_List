/* update tekst btn
taak doorstrepen */

// global variables
const getBtnInput = document.querySelector('#submit-btn');
const getTextInput = document.querySelector('#text-field');
const getTaskList = document.querySelector('#task-list');

// creates and displays existing list from api data 
const displayTasks = async () => {
    const taskArray = await getData();
    //clears the DOM
    getTaskList.innerHTML = ``;
    taskArray.forEach(task => {
        let listItem = `<li class="list-item"> 
        <input type="checkbox" class="markAsDone" value="${task._id}">${task.description}
        <i class="fas fa-edit ${task._id}"></i>
        <i id="${task._id}" class="fas fa-trash-alt"></i></li>`;
        getTaskList.innerHTML += listItem;
    });
}

displayTasks(); //displays initial list 

//dynamically creates list element from user-input 
const createListItem = (task) => {

    if (typeof task === 'object') {
        //remove temporary item
        getTaskList.removeChild(getTaskList.children[0]);
        const listItem = `<li class="list-item"> 
        <input type="checkbox" class="markAsDone" value="${task._id}">${task.description}
        <i class="fas fa-edit ${task._id}"></i>
        <i id="${task._id}" class="fas fa-trash-alt"></i></li>`;
        getTaskList.innerHTML = listItem + getTaskList.innerHTML;

    } else {
        const temporaryItem = `<li class="list-item"> 
        <input type="checkbox" class="markAsDone">${task}
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash-alt"></i></li>`;
        getTaskList.innerHTML = temporaryItem + getTaskList.innerHTML;
    }
}

const removeTask = (task) => {
    //this happens in realtime
    const listItem = task.target.parentElement;
    listItem.parentNode.removeChild(listItem);
    // this happens in background
    const taskId = task.target.id;
    deleteData(taskId);
}

const createTask = async () => {
    //this happens in realtime
    const userInput = getTextInput.value;
    createListItem(userInput);
    getTextInput.value = '';
    //this happens in background
    const raw = JSON.stringify({ description: userInput, done: false });
    const getTaskId = await postData(raw);

    // if api returned post_id, update task html in background
    if (getTaskId) {
        createListItem(getTaskId);
    }
}

const updateTask = (task) => {
    console.log(task);
}

//eventlisteners
getBtnInput.addEventListener('click', () => {
    if (getTextInput.value !== "") {
        createTask();
    }
});

getTextInput.addEventListener('keypress', (event) => {
    if (event.keyCode === 13 && getTextInput.value !== "") {
        createTask();
    }
});

document.body.addEventListener('click', (event) => {
    //if trash icon is clicked
    if (event.target.className === "fas fa-trash-alt") {
        removeTask(event);
    };
    if (event.target.className === "fas fa-edit") {
        updateTask(event);
    };
});
