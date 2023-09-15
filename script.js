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

let li;
//displaying todo
const renderTodo = function (todolist) {
    list.innerHTML = '';
    todolist.forEach((element, idx) => {
        const node = document.createElement("li");
        node.setAttribute('data-key', element.id);
        node.innerHTML = `
            <div class="lists">
                <div>
                    <div class="upc">
                    <input type="checkbox" ${element.checked ? "checked" : ''} onchange="todoCompleted(${element.id})"/>
                    <label class="tick js-tick" id="label${element.id}" for="list${element.id}">${element.text}</label>
                    <input hidden type="text" id="areaedit${element.id}" class="areaedit">
                    </div>
                </div>
            <div class="btns">
            <button class="edit-todo js-edit-todo" id='edit${element.id}'>Edit</button>
            <button class="delte-todo js-delete-todo" onclick="deleteTodo(${element.id})">Delete</button>
            </div>
            </div>
            `;
        list.append(node);
    });
    li = document.querySelectorAll('.js-edit-todo');
    li.forEach(listedit => {
        listedit.addEventListener('click', editHandle);
    })
}

function editHandle(e){

    let editid = e.target.id.slice(4);
    let editInput = document.querySelector(`#area${e.target.id}`);
    editInput.hidden = false;
    editInput.focus();
    
    let labeledit = document.querySelector(`#label${e.target.id.slice(4)}`);
    labeledit.hidden = true;
    
    editInput.value = labeledit.textContent
    editInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            labeledit.hidden = false;
            if(!editInput.value){
                alert("Empty values not allowed");
                return;
            }
            todos.find((item) => item.id == editid).task = labeledit.textContent = editInput.value;
            editInput.hidden = true;
        }
    })
    
    editInput.addEventListener('blur', () => {
        editInput.hidden = true;
        labeledit.hidden = false;
    })
}
//completed todo
function todoCompleted(todoid) {
    if (todoid) {
        todos.forEach(todo => {
            if (todo.id === todoid) {
                todo.checked = !todo.checked;
            }
        });
        renderTodo(todos);
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
const add = document.querySelector('#addBtn');
form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');
    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
    }
    input.value = '';
})
add.addEventListener('click', event => {
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
        alert("No Data Found");
        // list.innerHTML = '';
        // document.querySelector('.nodata').style.display = "block";
    }

})


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

//all button
function findAll() {
    renderTodo(todos);
}

//active button
function findActive() {
    const active = todos.filter((element) => element.checked === false);
    renderTodo(active);
}

//completed button
function findCompleted() {
    const completed = todos.filter(element => element.checked === true);
    renderTodo(completed);
}

//actions
document.querySelector('#actions').addEventListener('change', function (e) {
    if (e.target.value === "deleteallselected") {
        let selected = document.querySelectorAll("input[type='checkbox']:checked");
			for (let i = 0; i < selected.length; i++) {
				let index = todos.findIndex(todo => todo.text === selected[i].nextSibling.innerHTML);
				todos.splice(index, 1);
			}
        renderTodo(todos);
        e.target.value = 'action';
    }
    if (e.target.value === 'selectall') {
        let checkboxes = document.querySelectorAll("input[type='checkbox']");
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
            todos[i].checked = true;
        }
        e.target.value = 'action';
    }
    if (e.target.value === 'unselectall') {
        let checkboxes = document.querySelectorAll("input[type='checkbox']");
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
            todos[i].checked = false;
        }
        e.target.value = 'action';
    }
})