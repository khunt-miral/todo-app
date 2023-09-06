'use strict';

let todos = [];
const list = document.querySelector('.js-todo-list');


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
        document.querySelector('.nodata').style.display = "none";
        renderTodo(todos);
    }
}

//displaying todo
const renderTodo = function (todos) {
    list.innerHTML = '';
    todos.forEach(element => {
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
        todos.forEach(todo => {
            if (todo.id === todoid) {
                todo.checked = !todo.checked;
            }
        })
        // renderTodo(todos);
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

//all button
function findAll() {
    renderTodo(todos)
}

//active button
function findActive() {
    const activeValues = todos.filter((element) => element.checked === false)
    renderTodo(activeValues);
}

//completed button
function findCompleted() {
    const completedValues = todos.filter(element => element.checked === true);
    renderTodo(completedValues);
}


//Actions
function sorts(e) {
    switch (e.value) {
        case 'atoz':
            var naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            todos.sort((a, b) => naturalCollator.compare(a.text, b.text));
            renderTodo(todos);
            e.value = 'sort';
            break;

        case 'ztoa':
            naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            todos.sort((a, b) => naturalCollator.compare(b.text, a.text));
            renderTodo(todos);
            e.value = 'sort';
            break;

        case 'newest':
            naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            todos.sort((a, b) => naturalCollator.compare(b.id, a.id));
            renderTodo(todos);
            e.value = 'sort';
            break;

        case 'oldest':
            naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            todos.sort((a, b) => naturalCollator.compare(a.id, b.id));
            renderTodo(todos);
            e.value = 'sort';
            break;

        default:
            console.log("Invalid event");
            break;
    }
}

//actions
document.querySelector('#actions').addEventListener('change', function (e) {
    switch (e.target.value) {
        case 'deleteallselected':
            const activeValues = todos.filter((element) => element.checked === true)
            activeValues.filter(function (active) {
                todos = todos.filter(function (todoactive) {
                    return todoactive.checked !== active.checked;
                })
            })
            renderTodo(todos);
            e.target.value = 'action';
            break;

        case 'selectall':
            todos.map(element => element.checked = true);
            renderTodo(todos);
            e.target.value = 'action';
            break;

        case 'unselectall':
            todos.map(element => element.checked = false);
            renderTodo(todos);
            e.target.value = 'action';
            break;
        default:
            console.log("Select Option");
            e.target.value = 'action';
            break;
    }
})