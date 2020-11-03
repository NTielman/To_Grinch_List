/* 
taak doorstrepen */

// global variables
const getBtnInput = document.querySelector('#submit-btn');
const getTextInput = document.querySelector('#text-field');
const getTaskList = document.querySelector('#task-list');
const temporaryplace = document.getElementById('temp');

// creates and displays an existing list from api data 
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

//creates list element from user-input 
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

const updateTask = (clickEvent) => {
    const taskId = clickEvent.target.classList[2];
    const listElement = clickEvent.target.parentElement;

    //make a copy of old state
    const originalState = listElement.innerHTML;

    //create new inputfield
    const newInputField = `<input type="text" placeholder="${listElement.textContent}" id="update">
    <input type="submit" value="Save" id="save-btn">
    <input type="submit" value="Cancel" id="cancel-btn">`;
    listElement.innerHTML = newInputField;

    const getNewInputField = document.querySelector('#update');
    const saveBtn = document.getElementById('save-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    //btn eventlisteners
    cancelBtn.addEventListener('click', () => {
        listElement.innerHTML = originalState;
    });
    saveBtn.addEventListener('click', () => {
        if (getNewInputField.value !== "") {
            const userInput = getNewInputField.value;
            const newState = `<input type="checkbox" class="markAsDone" value="${taskId}">${userInput}
            <i class="fas fa-edit ${taskId}"></i>
            <i id="${taskId}" class="fas fa-trash-alt"></i>`;
            listElement.innerHTML = newState;

            //this happens in background
            const raw = JSON.stringify({ description: userInput, done: false });
            updateData(taskId, raw);
        }
    });
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
    if (event.target.classList.contains("fa-trash-alt")) {
        removeTask(event);
    };

    //if edit icon is clicked
    if (event.target.classList.contains("fa-edit")) {
        updateTask(event);
    };
});

/*
if checkbox is clicked addeventlistener change
onchange calls function markAsDone
markasdone ta check if (checkbox ta checked)
finds caller list element (parentnode di e checkbox)
store listelement su textcontent den un var
list element. textcontent = strikethrough frontend
set raw as stored texcontent, i done: true
backend call updatedata pass in id di caller element i raw

update displaytasks() if (task.done == true) textcontent is strikethrough


*/
