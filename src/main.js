import a ,{ userData, sum as s } from "../data/user.js";

const olCards = document.getElementById('olcards');

function renderData(dataSource) {
    dataSource.forEach((item, index) => {
        const liElement = document.createElement('li');
        liElement.setAttribute('style',`--cardColor:${item.color}`);
        liElement.id = `product-${index}`;

        const divElement = document.createElement('div');
        divElement.setAttribute('class','content');

        const divIcon = document.createElement('div');
        divIcon.setAttribute('class','icon');
        divIcon.innerHTML = item.icon;

        const divTitle = document.createElement('div');
        divTitle.setAttribute('class','title');
        divTitle.innerHTML = item.title;

        const divText = document.createElement('div');
        divText.setAttribute('class','text');
        divText.innerHTML = item.content;

        olCards.appendChild(liElement);
        liElement.appendChild(divElement);
        divElement.appendChild(divIcon);
        divElement.appendChild(divTitle);
        divElement.appendChild(divText);
    });
};

renderData(userData);

const addressVN = [
    { id: 1, title: 'HCM' },
    { id: 2, title: 'HN' },
    { id: 3, title: 'DN' },
    { id: 4, title: 'HP' },
    { id: 5, title: 'CT' },
];

// exercise 2:
/*
- change all title short hand = full name
- show length of title
- in ra output2 with title length >= 10
    const output = [
    { id: 1, title: 'Ho Chi Minh', length: 12},
    { id: 2, title: 'Ha Noi', length: 6},
    { id: 3, title: 'Da Nang', length: 8},
    { id: 4, title: 'Hai Phong', length: 10},
    { id: 5, title: 'Can Tho', length: 8},
    ]
    const output2 = [
    { id: 1, title: 'Ho Chi Minh', length: 12},
    { id: 4, title: 'Hai Phong', length: 10},
    ]

*/

const listElement = document.getElementById('taskList');
const inputTask = document.getElementById('inputTask');
const btnAdd = document.getElementById('btn__add');
const valid = document.getElementById('validNofication');

const taskList = [
    {
        id: 1,
        title: "Finish Codedex Course",
        status: 'new',
    },
    {
        id: 2,
        title: "HTML",
        status: 'new',
    },
    {
        id: 3,
        title: "CSS",
        status: 'done',
    },
];


function render(dataSource) {
    listElement.innerHTML = "";
    dataSource.forEach((item) => {
        const liElement = document.createElement('li');

        const inputElement = document.createElement('input');
        inputElement.setAttribute('class','check__task');
        inputElement.setAttribute('type','checkbox');
        inputElement.setAttribute('name','checkInput');
        inputElement.addEventListener('change', () => {
            if(inputElement.checked) {
                item.status = "done";
                checked();
            } else {
                item.status = 'new';
                checked();
            }
        })

        const pElement = document.createElement('p');
        pElement.setAttribute('class', 'task__title');
        pElement.innerHTML = item.title;

        const divButton = document.createElement('div');
        divButton.setAttribute('class','btnBlock');

        const buttonDelete = document.createElement('button');
        buttonDelete.setAttribute('class','btn--delete');
        buttonDelete.innerHTML = "Delete";
        buttonDelete.addEventListener('click',() => delTask(item.id));

        const buttonUpdate = document.createElement('button');
        buttonUpdate.setAttribute('class','btn--update');
        buttonUpdate.innerHTML = "Update";
        buttonUpdate.addEventListener('click',() => update(item.id,item.title));

        listElement.appendChild(liElement);
        liElement.appendChild(inputElement);
        liElement.appendChild(pElement);
        liElement.appendChild(divButton);
        divButton.appendChild(buttonDelete);
        divButton.appendChild(buttonUpdate);

        function checked() {
            if(item.status === "done") {
                pElement.setAttribute('class','task__title lineThrough');
                inputElement.checked = true;
            } else {
                pElement.setAttribute('class','task__title');
            }
        }
        checked();
    });
};

render(taskList);

btnAdd.addEventListener('click', (event) => {
    event.preventDefault();

    if(inputTask.value.length <= 10) {
        inputTask.setAttribute('class','inputValid');
        valid.setAttribute('class','validNofication');
    } else {
        const newTask = {
        id: taskList.length + 1,
        title: inputTask.value,
        status: "new",
    };

        taskList.push(newTask);
        inputTask.value = "";
        inputTask.setAttribute('class','inputCheck');
        valid.setAttribute('class','validNofication hidden');
        render(taskList);
    }
});

function delTask(id) {
    const findIndex = taskList.findIndex(item => item.id === id);
    taskList.splice(findIndex, 1);

    render(taskList);
}

function update(id,title) {
    let result = window.prompt("Please enter the task to be edited",title);
    const findIndex = taskList.findIndex(item => item.id === id);
    taskList[findIndex].title = result;

    render(taskList)
}

const valueText = document.querySelectorAll('.value--text');

valueText.forEach(item => {
    item.addEventListener('click',() => {
        const value = item.getAttribute('aria-valuenow');
        console.log(value);
    })
})

// Promise

// fetch('https://tony-auth-express-vdee.vercel.app/api/todo',{
//     method: 'get'
// }).then(res => {
//     return res.json();
// }).then(data => {
//     todos = data;
//     console.log(todos);
// });

const contentDiv = document.getElementById('content');
const btnAddUser = document.getElementById('btn__inputUser').addEventListener('click', () => addUser());
const inputUser = document.getElementById('inputUser');
const inputUserName = document.getElementById('inputUserName');

let user = [];

function renderUser(dataSource) {
    contentDiv.innerHTML = "";
    dataSource.forEach((item) => {
        const user = document.createElement('p');
        user.innerHTML = item.name;
        const userName = document.createElement('p');
        userName.innerHTML = item.username;
        const buttonUpdate = document.createElement('button');
        buttonUpdate.innerHTML = "Update";
        buttonUpdate.addEventListener('click',() => updateUser(item.id));
        const buttonDelete = document.createElement('button');
        buttonDelete.innerHTML = "Delete";
        buttonDelete.addEventListener('click',() => deleteUser(item.id));

        contentDiv.appendChild(user);
        contentDiv.appendChild(userName);
        contentDiv.appendChild(buttonUpdate);
        contentDiv.appendChild(buttonDelete);
    });
}

function initializeApp() {
    fetchUser();
}

async function fetchUser() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: "GET"
        });
        const data = await res.json();
        user = data;
        renderUser(user);
    } catch (err) {
        console.log("Error:", err);
    }
}

async function addUser() {
    try {
        const newUser = {
        name: inputUser.value,
        username: inputUserName.value,
         }
        await fetch('https://jsonplaceholder.typicode.com/users', {
        method: "POST",
        headers: {
            "Content-type": 'application/json',
        },
        body: JSON.stringify(newUser),
    });
        user.push(newUser);
        renderUser(user);
    } catch (err) {
        console.log("Error:", err);
    }
}

async function deleteUser(id) {
    try {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE',
        });
        const findIndex = user.findIndex(item => item.id === id);
        user.splice(findIndex, 1);
        renderUser(user);
    } catch (err) {
        console.log("Error", err);
    }
}

async function updateUser(id) {
    const findIndex = user.findIndex(item => item.id === id);
    const update = {
        ...user[findIndex],
        name: inputUser.value,
        username: inputUserName.value
    }
    try {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(update),
        })
        user[findIndex].name = inputUser.value;
        user[findIndex].username = inputUserName.value;
        renderUser(user);
    } catch (err) {
        console.log("Error: =>", err);
    }
}


initializeApp();

let dataUser = [];

const accountUser = document.getElementById('userName');
const password = document.getElementById('password');
const login = document.getElementById('btnLogin');
const formHidden = document.getElementById('formHidden');
const infoUser = document.getElementById('infoUser');

login.addEventListener('click',(event) => {
    event.preventDefault();
    if(accountUser.value === "" || password.value === "") {
        console.log("Fail");
    } else {
       checkUser();
    }
})

function checkUser() {
    const getItem = JSON.parse(window.localStorage.getItem("dataUser"));
    dataUser = getItem;
    const findIndex = dataUser.findIndex(item => item.userName === accountUser.value);
    if(findIndex !== -1) {
        if(dataUser[findIndex].password === Number(password.value)) {
            formHidden.style.display = "none";
            infoUser.innerHTML = `Hello! My name is: ${dataUser[findIndex].userName}`;
        } else {
            infoUser.innerHTML = "Incorrect password please check again";
        }
    } else {
        console.log("Fail");
    }
}

console.log(s(5,3));
console.log(a(5,3));


