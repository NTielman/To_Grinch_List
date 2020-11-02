/*  
(called after every postdata or delete/ update call)
how to use cache and update per 5 seconds 
watch video
*/

// variables
const getBtnInput = document.querySelector('#submit-btn');
const getTextInput = document.querySelector('#text-field');
const getTaskList = document.querySelector('#task-list');

//displays list of tasks
const displayTasks = async () => {
    const taskArray = await getData();
    let listItem = ``;

    taskArray.forEach(task => {
        // const listItem = document.createElement("li");
        // listItem.classList.add('list-item');
        // listItem.textContent = `${task.description}`;
        // getTaskList.appendChild(listItem);

        /* note to instructor:
        in de lessen werd mij geleerd om new elements op bovenstaand
        manier te maken. maar ik vraag me af of onderstaand manier 
        ook correct is? sinds het beknopter is om te schrijven?*/
        listItem += `<li class="list-item">${task.description}
        <i id="${task._id}" class="fas fa-edit"></i>
        <i id="${task._id}" class="fas fa-trash-alt"></i></li>`;
    });
    getTaskList.innerHTML = listItem;
}

displayTasks();

//stores and POST's userinput to API
const getUserInput = () => {
    const userInput = getTextInput.value;
    const raw = JSON.stringify({ description: userInput, done: false });
    postData(raw);
}

const getRandomFunc = () => {
    getUserInput();
    setTimeout(() => {
        displayTasks();
    }, 500);
}

//eventlisteners
getBtnInput.addEventListener('click', () => {
    if (getTextInput.value !== "") {
        getRandomFunc();
    }
});

getTextInput.addEventListener('keypress', (event) => {
    if (event.keyCode === 13 && getTextInput.value !== "") {
        getRandomFunc();
    }
});
