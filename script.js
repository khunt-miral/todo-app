'use strict';

let todos = [];
const list = document.querySelector('.js-todo-list');
let activescreen = [];


//adding a new todo to the list
const addTodo = function (text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };
    const found = todos.some(el => el.text === text);
    const check = todos.filter(el => el.checked === true);

    if (found && check) {
        alert("Already Exists");
        return;
    } else {
        todos.push(todo);
        activescreen.push(todo);
        document.querySelector('.nodata').style.display = "none";
        renderTodo(todos);
    }
}

//displaying todo
const renderTodo = function (todolist) {
    console.log("Render todo called");
    list.innerHTML = '';
    todolist.forEach(element => {
        const node = document.createElement("li");
        node.setAttribute('data-key', element.id);
        node.innerHTML = `
            <div class="lists">
                <div>
                    <div class="upc">
                    <input type="checkbox" ${element.checked ? "checked" : ''} onchange="todoCompleted(${element.id})"/>
                    <label class="tick js-tick"></label>
                    <div class="textcontent">${element.text}</div>
                    </div>
                </div>
            <div class="btns">
            <button class="edit-todo js-edit-todo">Edit</button>
            <button class="delte-todo js-delete-todo" onclick="deleteTodo(${element.id})">Delete</button>
            </div>
            </div>
            `;
        list.append(node)
    })
}

//completed todo
function todoCompleted(todoid) {
    if (todoid) {
        activescreen.forEach(todo => {
            if (todo.id === todoid) {
                todo.checked = !todo.checked;
            }
        })
    } else {
        document.querySelector('.nodata').style.display = "none";
    }

}

//delete todo
function deleteTodo(todoid) {
    const todoindex = todos.findIndex(idx => idx.id === todoid);
    if (todoindex > -1) {
        todos.splice(todoindex, 1);
        renderTodo(todos);
    }
    if (todos.length <= 0) {
        document.querySelector('.nodata').style.display = "block";
    }
}



const form = document.querySelector('.js-form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');
    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
    }
    input.value = '';
})

//search button
document.querySelector('#searchbtn').addEventListener('click', function () {
    const searchValue = document.querySelector('#todoinput').value;
    const filterdSearchValue = todos.filter(element => element.text.includes(searchValue));
    if (filterdSearchValue.length > 0 && searchValue) {
        renderTodo(filterdSearchValue);
    } else {
        list.innerHTML = '';
        document.querySelector('.nodata').style.display = "block";
    }

})


//Actions
function sorts(e) {
    switch (e.value) {
        case 'atoz':
            var naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            activescreen.sort((a, b) => naturalCollator.compare(a.text, b.text));
            renderTodo(activescreen);
            e.value = 'sort';
            break;

        case 'ztoa':
            naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            activescreen.sort((a, b) => naturalCollator.compare(b.text, a.text));
            renderTodo(activescreen);
            e.value = 'sort';
            break;

        case 'newest':
            naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            activescreen.sort((a, b) => naturalCollator.compare(b.id, a.id));
            renderTodo(activescreen);
            e.value = 'sort';
            break;

        case 'oldest':
            naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            activescreen.sort((a, b) => naturalCollator.compare(a.id, b.id));
            renderTodo(activescreen);
            e.value = 'sort';
            break;

        default:
            console.log("Invalid event");
            break;
    }
}

//all button
function findAll() {
    renderTodo(todos);
}

//active button
function findActive() {
    activescreen = todos.filter((element) => element.checked === false);
    renderTodo(activescreen);
}

//completed button
function findCompleted() {
    activescreen = todos.filter(element => element.checked === true);
    renderTodo(activescreen);
}

//actions
document.querySelector('#actions').addEventListener('change', function (e) {
    switch (e.target.value) {
        
        case 'deleteallselected':
            const activeValues = activescreen.filter((element) => element.checked === true);
            activeValues.filter(function (active) {
                activescreen = activescreen.filter(function (todoactive) {
                    return todoactive.checked !== active.checked;
                })
            });
            activescreen = activescreen.filter(ele => activeValues.indexOf(ele) == -1);
            todos = activescreen;
            renderTodo(activescreen);
            e.target.value = 'action';
            break;

        case 'selectall':
            activescreen.map(element => element.checked = true);
            // renderTodo(activescreen);
            e.target.value = 'action';
            break;

        case 'unselectall':
            activescreen.map(element => element.checked = false);
            renderTodo(activescreen);
            e.target.value = 'action';
            break;
        default:
            console.log("Select Option");
            e.target.value = 'action';
            break;
    }
})