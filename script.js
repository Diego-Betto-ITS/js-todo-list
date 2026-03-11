// creare un array di oggetti che rappresentano le todo
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

// recuperare gli elementi del DOM
const listaTodo = document.getElementById('lista-todo');
const btnAdd    = document.getElementById('add');
const inputTodo = document.getElementById('new');

// disegnare l'elenco delle todo
function disegnaElenco() {
    // svuotare la lista prima di ridisegnarla
    listaTodo.innerText = '';

    // ciclare l'array di oggetti e creare un elemento li per ogni todo
    todoList.forEach(
        function(item){
            // creare un elemento li, impostare il testo e aggiungerlo alla lista
            const elementoLi = document.createElement('li');
            elementoLi.innerText = item.etichetta;
            elementoLi.classList.add('todo-item');
            listaTodo.append(elementoLi);
        }
    );
}

// disegnare l'elenco delle todo all'avvio della pagina
disegnaElenco();

function addItem () {
    // creare un nuovo oggetto todo con i dati dell'input
    const newTodo = {
        etichetta: inputTodo.value,
        stato: false,
        order: 1,
    };

    // aggiungere il nuovo oggetto all'array di todo
    todoList.push(newTodo);

    // ridisegna l'elenco delle todo
    disegnaElenco();
}

// aggiungere un event listener al pulsante per aggiungere una nuova todo
btnAdd.addEventListener("click", addItem);
