// 'use strict';

// let todos = [];
// const list = document.querySelector('.js-todo-list');


// //adding a new todo to the list
// const addTodo = function (text) {
//     const todo = {
//         text,
//         checked: false,
//         id: Date.now(),
//     };
//     const found = todos.some(el => el.text === text);
//     const check = todos.filter(el => el.checked === true);

//     if (found && check) {
//         alert("Already Exists");
//         return;
//     } else {
//         todos.push(todo);
//         document.querySelector('.nodata').style.display = "none";
//         renderTodo(todos);
//     }
// }

// //displaying todo
// const renderTodo = function (todolist) {
//     list.innerHTML = '';
//     todolist.forEach(element => {
//         const node = document.createElement("li");
//         node.setAttribute('data-key', element.id);
//         node.innerHTML = `
//             <div class="lists">
//                 <div>
//                     <div class="upc">
//                     <input type="checkbox" ${element.checked ? "checked" : ''} onchange="todoCompleted(${element.id})"/>
//                     <label class="tick js-tick"></label>
//                     <div class="textcontent">${element.text}</div>
//                     </div>
//                 </div>
//             <div class="btns">
//             <button class="edit-todo js-edit-todo">Edit</button>
//             <button class="delte-todo js-delete-todo" onclick="deleteTodo(${element.id})">Delete</button>
//             </div>
//             </div>
//             `;
//         list.append(node)
//     })
// }

// //completed todo
// function todoCompleted(todoid) {
//     if (todoid) {
//         todos.forEach(todo => {
//             if (todo.id === todoid) {
//                 todo.checked = !todo.checked;
//             }
//         });
//         renderTodo(todos);
//     } else {
//         document.querySelector('.nodata').style.display = "none";
//     }

// }

// //delete todo
// function deleteTodo(todoid) {
//     const todoindex = todos.findIndex(idx => idx.id === todoid);
//     if (todoindex > -1) {
//         todos.splice(todoindex, 1);
//         renderTodo(todos);
//     }
//     if (todos.length <= 0) {
//         document.querySelector('.nodata').style.display = "block";
//     }
// }



// const form = document.querySelector('.js-form');

// form.addEventListener('submit', event => {
//     event.preventDefault();
//     const input = document.querySelector('.js-todo-input');
//     const text = input.value.trim();
//     if (text !== '') {
//         addTodo(text);
//     }
//     input.value = '';
// })

// //search button
// document.querySelector('#searchbtn').addEventListener('click', function () {
//     const searchValue = document.querySelector('#todoinput').value;
//     const filterdSearchValue = todos.filter(element => element.text.includes(searchValue));
//     if (filterdSearchValue.length > 0 && searchValue) {
//         renderTodo(filterdSearchValue);
//     } else {
//         list.innerHTML = '';
//         document.querySelector('.nodata').style.display = "block";
//     }

// })


// //Actions
// function sorts(e) {
//     switch (e.value) {
//         case 'atoz':
//             var naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
//             todos.sort((a, b) => naturalCollator.compare(a.text, b.text));
//             renderTodo(todos);
//             e.value = 'sort';
//             break;

//         case 'ztoa':
//             naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
//             todos.sort((a, b) => naturalCollator.compare(b.text, a.text));
//             renderTodo(todos);
//             e.value = 'sort';
//             break;

//         case 'newest':
//             naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
//             todos.sort((a, b) => naturalCollator.compare(b.id, a.id));
//             renderTodo(todos);
//             e.value = 'sort';
//             break;

//         case 'oldest':
//             naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
//             todos.sort((a, b) => naturalCollator.compare(a.id, b.id));
//             renderTodo(todos);
//             e.value = 'sort';
//             break;

//         default:
//             console.log("Invalid event");
//             break;
//     }
// }

// //all button
// function findAll() {
//     renderTodo(todos);
// }

// //active button
// function findActive() {
//     const active = todos.filter((element) => element.checked === false);
//     renderTodo(active);
// }

// //completed button
// function findCompleted() {
//     const completed = todos.filter(element => element.checked === true);
//     renderTodo(completed);
// }

// //actions
// document.querySelector('#actions').addEventListener('change', function (e) {
//     if (e.target.value === "deleteallselected") {
//         let activeValues = todos.filter((element) => element.checked === true);
//         console.log('before filter',activeValues);
//         // activeValues.forEach(function (active) {
//         //     activescreen = activescreen.filter(function (todoactive) {
//         //         return todoactive.checked !== active.checked;
//         //     })
//         // });
//         activeValues = activeValues.filter(ele => activeValues.indexOf(ele) == -1);
//         renderTodo(activeValues);
//         e.target.value = 'action';
//     }
//     if (e.target.value === 'selectall') {
//         const activescreen = todos.map(element => element.checked = true);
//         renderTodo(activescreen);
//         e.target.value = 'action';
//     }
//     if (e.target.value === 'unselectall') {
//         const activescreen = todos.map(element => element.checked = false);
//         renderTodo(activescreen);
//         e.target.value = 'action';
//     }
// })

const todoInput = document.querySelector('#todo');
const add = document.querySelector('#add')
const search = document.querySelector('#search')

const allBtn = document.querySelector('#allbtn');
const activeBtn = document.querySelector('#activebtn');
const completeBtn = document.querySelector('#completebtn');

const edit = document.querySelector('#edit');
const noData = document.querySelector('h3');
const main = document.querySelector('.main');

const select = document.getElementById('select');
const sort = document.getElementById('sort');
let listElement;
let listEdit;
let listDelete;

let list = [];
let active = [];
let completed = [];

let arr;

const emptyList = noData.hidden = false;
todoInput.hidden = true

const updateUI = (e, obj = list) => {
    arr = obj
    updateUI.currList = obj;
    console.log('ui', obj);
    if (obj.length == 0) {
        noData.hidden = false;
    } else {
        noData.hidden = true;
    }

    obj.forEach((curr, i) => {
        curr.id = i + 1
    })

    main.innerHTML = '';
    let html;
    obj.forEach((curr, i) => {
        html = `<div class="listContainer">
                    <div class="left">
                        <input type="checkbox" id="list${curr.id}" name="list${curr.id}" class="list">
                        <label id="label${curr.id}" for="list${curr.id}">${curr.task}</label>
                        <input hidden type="text" id="areaedit${curr.id}" class="areaedit">
                    </div>
                    <div class="right">
                        <button id="edit${curr.id}" class="edit">Edit</button>
                        <button id="delete${curr.id}" class="delete">Delete</button>
                    </div>
                </div>`

        main.insertAdjacentHTML('afterbegin', html);
    })

    listElement = document.querySelectorAll('.list');

    listEdit = document.querySelectorAll('.edit');
    listEdit.forEach((li) => {
        li.addEventListener('click', editHandle)
    })

    listDelete = document.querySelectorAll('.delete');
    listDelete.forEach((li) => {
        li.addEventListener('click', delHandle)
    })


    obj.forEach(li => {
        li.toggle = function () {
            this.active = !this.active;
        }
        if (!li.active) {
            console.log(li.id, document.querySelector(`#list${li.id}`));
            document.querySelector(`#list${li.id}`).checked = true;
        }
    })

    listElement.forEach((curr) => {
        curr.addEventListener('change', () => {
            console.log('id', curr.id.slice(4));
            list.find((item) => item.id == curr.id.slice(4)).toggle();
        })
    })
}


const sortHandler = () => {
    let listCopy = arr.slice();
    listCopy.sort((a, b) => {
        if (!isNaN(a.task) && !isNaN(b.task)) {
            return parseInt(a.task) - parseInt(b.task);
        }
        if (!isNaN(a.task)) {
            return -1;
        }
        if (!isNaN(b.task)) {
            return 1;
        }
        return a.task.localeCompare(b.task);
    });
    console.log('lc', listCopy);
    console.log('li', arr);

    let listtime = arr.slice();
    listtime.sort((a, b) => {
        if (!isNaN(a.time) && !isNaN(b.time)) {
            return parseInt(a.time) - parseInt(b.time);
        }
        if (!isNaN(a.time)) {
            return -1;
        }
        if (!isNaN(b.time)) {
            return 1;
        }
        return a.time.localeCompare(b.time);
    });

    console.log('obj', updateUI.currList);
    console.log('listtime', listtime);

    let sortType = sort.value;
    switch (sortType) {
        case 'A-Z':
            updateUI(undefined, listCopy.reverse());
            break;
        case 'Z-A':
            updateUI(undefined, listCopy);
            break;

        case 'newest':
            updateUI(undefined, listtime)
            break;
        case 'oldest':
            updateUI(undefined, listtime.slice().reverse())
            break;
    }

}
sort.addEventListener('change', sortHandler);


const editHandle = (e) => {
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
            list.find((item) => item.id == editid).task = labeledit.textContent = editInput.value;
            editInput.hidden = true;
        }
    })

    editInput.addEventListener('blur', () => {
        editInput.hidden = true;
        labeledit.hidden = false;
    })
}

const delHandle = (e) => {
    let delId = e.target.id.slice(6)
    console.log(delId);
    console.log(list.findIndex((item) => item.id == delId));
    list.splice(list.findIndex((item) => item.id == delId), 1);
    updateUI(undefined)

}



//add functionalaity
let counter = 0;
const addList = (e) => {
    if (e.key === 'Enter' && todoInput.value.trim() != '') {

        const found = list.some(el => el.task === todoInput.value);
        const check = list.filter(el => el.active === true);

        if (found && check) {
            alert("Already Exists");
            return;
        } else {
            counter++;
            list.push({
                task: `${todoInput.value.trim()}`,
                active: true,
                time: counter
            });
            todoInput.value = '';
            updateUI(undefined);
            noData.hidden = true;
        }



    }
}

const addHandler = () => {
    todoInput.removeEventListener('keyup', searchHandler);
    noData.hidden = true;
    todoInput.hidden = false;
    todoInput.focus();
    updateUI(undefined);
    todoInput.addEventListener('keyup', addList);
}
add.addEventListener('click', addHandler);

const checkExist = (search) => {
    console.log(arr);
    console.log(search);
    let arrObj = arr.filter((curr) =>
        curr.task.includes(search)
    );
    console.log('len', arrObj);
    console.log(arrObj.length == 0 ? false : true);
    return arrObj.length == 0 ? false : true
}

const searchHandler = (e) => {
    if (e.key === 'Enter') {
        if (checkExist(todoInput.value.trim())) {
            console.log(arr.filter((curr) => curr.task.includes(todoInput.value.trim())));
            updateUI(undefined, arr.filter((curr) => curr.task.includes(todoInput.value.trim())))

        }
        else if (todoInput.value.trim() == '') {
            updateUI(undefined);
        }
        else if (checkExist(todoInput.value.trim())) {
            todoInput.value = '';
            updateUI(undefined, []);
        }
    }


    if (e.key === 'Enter' && checkExist(todoInput.value.trim())) {
    
        console.log(arr.filter((curr) => curr.task.includes(todoInput.value.trim())));
        updateUI(undefined, arr.filter((curr) => curr.task.includes(todoInput.value.trim())))

    }
    else if (e.key === 'Enter' && !checkExist(todoInput.value.trim())) {
        todoInput.value = '';
        updateUI(undefined, []);
    }
    else if (e.key === 'Enter' || todoInput.value.trim() == '') {
        updateUI(undefined);
    }
}

const searchList = () => {
    todoInput.removeEventListener('keyup', addList);
    todoInput.focus();
    todoInput.addEventListener('keyup', searchHandler);
}

search.addEventListener('click', searchList);


let del;
const selectionHandler = () => {
    console.log(list);
    switch (select.value) {
        case 'delete':
            del = arr.filter(curr => document.querySelector(`#list${curr.id}`).checked);
            console.log('del', del);
            console.log('l', list);
            list = list.filter(item => !del.some(d => d.id === item.id));
            updateUI(undefined)
            break;

        case 'unselect':
            console.log(list);
            list.forEach((curr, i) => {
                document.querySelector(`#list${curr.id}`).checked = false;
                curr.active = true;
                console.log("unsel");
            })

            break;

        case 'select':
            list.forEach((curr) => {
                document.querySelector(`#list${curr.id}`).checked = true;
                curr.active = false
            })
            break;
    }

}

select.addEventListener('change', selectionHandler);

allBtn.addEventListener('click', updateUI);
activeBtn.addEventListener('click', () => {
    updateUI(undefined, list.filter(curr => curr.active));
});

completeBtn.addEventListener('click', () => {
    completed = list.filter(curr => !curr.active)
    console.log('comp', completed);
    updateUI(undefined, completed);
});

select.addEventListener('blur', () => {
    select.value = 'Action';
})
sort.addEventListener('blur', () => {
    sort.value = 'Sort';
})

//---------------------------UI------------------------------------//
function selectButton(clickedButton) {
    var buttons = document.querySelectorAll('.button');

    buttons.forEach(function (button) {
        button.style.backgroundColor = '#9dd6ff';
    });
    clickedButton.style.backgroundColor = 'white';
}
function selectBtn(clickedButton) {
    var btns = document.querySelectorAll('.btn');

    btns.forEach(function (button) {
        button.style.backgroundColor = '#9dd6ff';
    });
    clickedButton.style.backgroundColor = 'white';
}
