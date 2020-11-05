// ----------------------- global variables ------------------------- 
const getAddBtn = document.querySelector('.add-task-btn');
const getTextInput = document.querySelector('#add-task-field');
const getTaskList = document.querySelector('#task-list');

// -------------------------- functions -----------------------------

//creates HTML list elements
const createListItem = (taskObj) => {

    //create elements
    const listItem = document.createElement('li');
    const checkBox = document.createElement('input');
    const text = document.createElement('label');
    const btnsContainer = document.createElement('div');
    const editIcon = document.createElement('i');
    const trashIcon = document.createElement('i');

    //add attributes
    listItem.className = "list-item";
    checkBox.type = "checkbox";
    checkBox.className = "markAsDone";
    checkBox.value = taskObj._id;
    checkBox.id = taskObj._id;
    if (taskObj.done) {
        checkBox.checked = true;
        listItem.classList.add('checked');
    }
    text.innerText = taskObj.description;
    text.htmlFor = taskObj._id;
    btnsContainer.className = "btns-container";
    editIcon.className = `fas fa-edit ${taskObj._id}`;
    trashIcon.className = "fas fa-trash-alt";
    trashIcon.id = taskObj._id;

    // append children
    listItem.appendChild(checkBox);
    listItem.appendChild(text);
    btnsContainer.appendChild(editIcon);
    btnsContainer.appendChild(trashIcon);
    listItem.appendChild(btnsContainer);

    return listItem;

}

//displays an existing list (if available) from api data 
const displayTasks = async () => {

    const taskArray = await getData();

    taskArray.forEach(taskObj => {
        const listItem = createListItem(taskObj);
        getTaskList.appendChild(listItem);
    });

}

//displays initial list 
displayTasks();

const removeTask = (trashTarget) => {

    //realtime: removes tasknode
    const listItem = trashTarget.target.parentElement.parentElement;
    listItem.parentNode.removeChild(listItem);

    //in background: sends DELETE request to api
    const taskId = trashTarget.target.id;
    deleteData(taskId);

}

const createTask = async () => {

    //realtime: creates temporary taskObj to display to DOM
    const userInput = getTextInput.value;
    const tempTaskObj = {
        description: userInput,
        done: false,
        _id: "undefined"
    };
    const tempListItem = createListItem(tempTaskObj);
    //add to DOM
    getTaskList.insertBefore(tempListItem, getTaskList.children[0])
    //reset inputfield
    getTextInput.value = '';

    //in background: send POST request, await response
    const raw = JSON.stringify({ description: userInput, done: false });
    const getTaskId = await postData(raw);
    //if api has returned response, update task_id (html)
    if (typeof getTaskId === 'object') {
        const newListItem = createListItem(getTaskId);
        getTaskList.replaceChild(newListItem, getTaskList.children[0]);
    }

}

const editTask = (editTarget) => {

    //make copy of state before edits
    const taskId = editTarget.target.classList[2];
    const listElement = editTarget.target.parentElement.parentElement;
    const originalState = listElement.innerHTML;
    const isChecked = listElement.children[0].checked;

    //create new (temporary) inputfield and buttons
    const newInputField = `<input type="text" 
    placeholder="${listElement.textContent}" id="edit-inputfield">
    <div class="edit-btns-container">
    <input type="submit" value="Save" class="btn save-btn">
    <input type="submit" value="Cancel" class="btn cancel-btn">
    </div>`;
    listElement.innerHTML = newInputField;

    //add eventlisteners to new btns
    const getEditInput = document.querySelector('#edit-inputfield');
    const saveBtn = document.querySelector('.save-btn');
    const cancelBtn = document.querySelector('.cancel-btn');

    //if "cancel" is clicked revert to original state
    cancelBtn.addEventListener('click', () => {
        listElement.innerHTML = originalState;
    });

    //if "save" is clicked update the listItem
    saveBtn.addEventListener('click', () => {
        if (getEditInput.value !== "") {
            const userInput = getEditInput.value;
            const updatedTaskObj = {
                description: userInput,
                done: isChecked,
                _id: taskId
            };

            //realtime: replace old listItem with new one
            const newListElement = createListItem(updatedTaskObj);
            getTaskList.replaceChild(newListElement, listElement);

            //in background: send PUT request to api
            const raw = JSON.stringify({ description: userInput, done: isChecked });
            updateData(taskId, raw);
        }
    });

}

const markAsDone = (chkBoxTarget) => {

    const checkBox = chkBoxTarget.target;
    const listItem = checkBox.parentElement;
    const taskId = checkBox.value;
    const isChecked = checkBox.checked;
    const taskDescr = checkBox.nextElementSibling.innerText;

    //realtime: strikethrough text in CSS
    listItem.classList.toggle('checked');
    //in background: PUT request update task.done
    const raw = JSON.stringify({ description: taskDescr, done: isChecked });
    updateData(taskId, raw);

}

// ------------------------ eventlisteners --------------------------
getAddBtn.addEventListener('click', () => {
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
        editTask(event);
    };
});

document.body.addEventListener('change', (event) => {
    //if checkbox gets checked or unchecked
    if (event.target.classList.contains("markAsDone")) {
        markAsDone(event);
    };
});