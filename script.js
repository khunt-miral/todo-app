'use strict';

const todos = [];
const list = document.querySelector('.js-todo-list');

const addTodo = function (text, todos) {
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
        renderTodo(todo);
    }
    console.log(todos);
}

const renderTodo = function (todo) {
    const isChecked = todo.checked ? true : '';
    const node = document.createElement("li");
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="edit-todo js-edit-todo">Edit</button>
    <button class="delte-todo js-delete-todo">Delete</button>`;
    list.append(node);
    todos.forEach((key)=>console.log(key))
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');
    const text = input.value.trim();
    if (text !== '') {
        addTodo(text, todos);
        input.value = '';
    }
})