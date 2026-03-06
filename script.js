const todoList = [
    {
        etichetta: 'prima todo',
        stato: false,
        order: 1,
    },
    {
        etichetta: 'seconda todo',
        stato: false,
        order: 1,
    }
];

const listaTodo = document.getElementById('lista-todo');
const btnAdd    = document.getElementById('add');
const inputTodo = document.getElementById('new');

console.log(inputTodo)

function disegnaElenco() {
    listaTodo.innerText = '';

    todoList.forEach(
        function(item){
            // console.log(item);
            const elementoLi = document.createElement('li');
            elementoLi.innerText = item.etichetta;
            elementoLi.classList.add('todo-item');
            listaTodo.append(elementoLi);
        }
    );
}

disegnaElenco();

function addItem () {
    console.log(inputTodo.value);

    const newTodo = {
        etichetta: inputTodo.value,
        stato: false,
        order: 1,
    };

    todoList.push(newTodo);

    disegnaElenco();
}

btnAdd.addEventListener("click", addItem);
