// global variables
const getAddBtn = document.querySelector('.add-task-btn');
const getTextInput = document.querySelector('#add-task-field');
const getTaskList = document.querySelector('#task-list');

// creates and displays an existing list from api data 
const displayTasks = async () => {
    const taskArray = await getData();
    //clears the DOM
    getTaskList.innerHTML = ``;
    taskArray.forEach(task => {
        if (task.done) {
            //  <li class="checked">Pay bills</li>
            let listItem = `<li class="list-item"> 
           ${task.description.strike()}
            <i id="${task._id}" class="fas fa-trash-alt"></i></li>`;
            getTaskList.innerHTML += listItem;
        } else { // add div to below functions
            let listItem = `<li class="list-item"> 
            <input type="checkbox" class="markAsDone" value="${task._id}">${task.description}
            <div class="btns-container">
            <i class="fas fa-edit ${task._id}"></i>
            <i id="${task._id}" class="fas fa-trash-alt"></i>
            </div></li>`;
            getTaskList.innerHTML += listItem;
        }
    });
}

displayTasks(); //displays initial list 
//function that creates listitems
//<input type="checkbox" checked></input>
// ipv textnode por make e text un <label> of <p> easier to select and change it
// Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }

// Add a "checked" symbol when clicking on a list item
// var list = document.querySelector('ul');
// list.addEventListener('click', function(ev) {
//   if (ev.target.tagName === 'LI') {
//     ev.target.classList.toggle('checked');
//   }
// }, false);

// Create a new list item when clicking on the "Add" button
// function newElement() {
//     var li = document.createElement("li");
//     var inputValue = document.getElementById("myInput").value;
//     var t = document.createTextNode(inputValue);
//     li.appendChild(t);
//     if (inputValue === '') {
//       alert("You must write something!");
//     } else {
//       document.getElementById("myUL").appendChild(li);
//     }
//     document.getElementById("myInput").value = "";

//     var span = document.createElement("SPAN");
//     var txt = document.createTextNode("\u00D7");
//     span.className = "close";
//     span.appendChild(txt);
//     li.appendChild(span);

//     for (i = 0; i < close.length; i++) {
//       close[i].onclick = function() {
//         var div = this.parentElement;
//         div.style.display = "none";
//       }
//     }
//   }

//New task list item
/*var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button

    label.innerText=taskString;

    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";

    editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
    editButton.className="edit";
    deleteButton.innerText="Delete";
    deleteButton.className="delete";



    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}*/

/*var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

} */

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

/*function deleteCheck(e) {
    const item = e.target;
    //DELETE ITEM
    if (item.classList[0] === "delete_btn") {
        const todo = item.parentElement;
        //ANIMATION TRANSITION
        todo.classList.add("fall")
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
    } */

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

/*//Edit an existing task.

var editTask=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");


var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
        //If class of the parent is .editmode
        if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
            label.innerText=editInput.value;
        }else{
            editInput.value=label.innerText;
        }

        //toggle .editmode on the parent.
        listItem.classList.toggle("editMode");
}
 */

/*  if (item.classList[0] === "complete_btn") {
       const todo = item.parentElement;
       todo.classList.toggle("completedItem")
   } */

const updateTask = (clickEvent) => {
    const taskId = clickEvent.target.classList[2];
    //adjusted for adding div
    const listElement = clickEvent.target.parentElement.parentElement;

    //make a copy of old state
    const originalState = listElement.innerHTML;

    //create new inputfield
    const newInputField = `<input type="text" placeholder="${listElement.textContent}" id="update">
    <div class="update-btns">
    <input type="submit" value="Save" class="btn save-btn">
    <input type="submit" value="Cancel" class="btn cancel-btn">
    </div>`;
    listElement.innerHTML = newInputField;

    const getNewInputField = document.querySelector('#update');
    const saveBtn = document.querySelector('.save-btn');
    const cancelBtn = document.querySelector('.cancel-btn');

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

const markAsDone = (task) => {
    const listItem = task.target.parentElement;
    const taskId = task.target.value;
    const isChecked = task.target.checked; // returns true or false
    const str = listItem.textContent;
    const newStr = str.strike();
    const striked = `${newStr}
    <i id="${taskId}" class="fas fa-trash-alt"></i>`;

    if (isChecked) {
        listItem.innerHTML = striked;
        const raw = JSON.stringify({ description: str, done: true });
        updateData(taskId, raw);
    }

}

//eventlisteners
getAddBtn.addEventListener('click', () => {
    if (getTextInput.value !== "") {
        createTask();
        //createTask(); pass in userinput value mesora?
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

document.body.addEventListener('change', (event) => {
    //if checkbox is checked
    if (event.target.classList.contains("markAsDone")) {
        markAsDone(event);
    };
});