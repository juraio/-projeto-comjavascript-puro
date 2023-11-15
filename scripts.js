// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// Funções
const saveTodo = (Text) => {


    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = Text;
    todo.appendChild(todoTitle);

    const editBtn = document.createElement("button")
    editBtn.classList.add("finish-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-delete-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();


};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo  = (Text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo)=> {

        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = Text;
            
        }

    });

}
// Eventos
todoForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    console.log("Enviou form");
    
    const inputValue = todoInput.value;

    if(inputValue){
        
        saveTodo(inputValue);

    }
});

document.addEventListener("click", (e) => {

    const targetEL = e.target;
    const parentEl = targetEL.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEL.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }

    if(targetEL.classList.contains("remove-todo")){
        parentEl.remove();
    }
        
    if(targetEL.classList.contains("edit-todo")){
       toggleForms();

       editInput.value = todoTitle;
       oldInputValue = todoTitle;
    }
});

cancelEditBtn.addsEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();

});

editForm.addEventListener("submit", (e) => { 
    e.preventDefault(); 

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();


});