const templateTodoItem = {
    etichetta: '',
    stato: false,
    order: 1,
    priorita: 2,
}

// creare un array di oggetti che rappresentano le todo
const todoList = [
    {
        etichetta: 'prima todo',
        stato: false,
        order: 1,
        priorita: 2
    },
    {
        etichetta: 'seconda todo',
        stato: true,
        order: 10,
        priorita: 2,
    },
    {
        etichetta: 'terza todo',
        stato: false,
        order: 1,
        priorita: 3,
    },
    {
        etichetta: 'quarta todo',
        stato: false,
        order: 1,
        priorita: 1,
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

    // ordina l'elenco in base all'attributo order
    todoList.sort(function(a, b) {
        return a.order - b.order;
    })

    // ciclare l'array di oggetti e creare un elemento li per ogni todo
    todoList.forEach(
        function(item){
            // creare un elemento li, impostare il testo e aggiungerlo alla lista
            const elementoLi = document.createElement('li');
            elementoLi.innerText = item.etichetta;
            elementoLi.classList.add('todo-item');

            // se l'elemento ha stato true aggiungi la classe
            if (item.stato) {
                elementoLi.classList.add('todo-item--checked');
            }

            elementoLi.classList.add('todo-item--priority-1')

            // creo elemento <input type="checkbox" /> e setto lo stato
            const elementoCheckbox = document.createElement('input');
            elementoCheckbox.type = 'checkbox';
            elementoCheckbox.checked = item.stato;

            // se clicco sulla checkbox...
            elementoCheckbox.addEventListener('change', function(event) {
                // cambio lo stato del item dentro la lista
                item.stato = event.target.checked;
                // cambio l'order del item dentro la lista
                item.order = event.target.checked ? 10 : 1;

                // ridisegno/aggiorno la visualizzazione
                disegnaElenco();
            });

            // inserisco all'inizio del "li" il mio input checkbox
            elementoLi.prepend(elementoCheckbox);

            // inserisco all'interno della lista il mio "li" completo
            listaTodo.append(elementoLi);
        }
    );
}

// disegnare l'elenco delle todo all'avvio della pagina
disegnaElenco();

// funzione che aggiunge un elmento alla todolist
function addItem () {
    // creare un nuovo oggetto todo con i dati dell'input
    /*const newTodo = {
        etichetta: inputTodo.value,
        stato: false,
        order: 1,
    };*/

    const newTodo = {
        ...templateTodoItem, 
        etichetta: inputTodo.value,
    };

    // aggiungere il nuovo oggetto all'array di todo
    todoList.push(newTodo);

    // ridisegna l'elenco delle todo
    disegnaElenco();
}

// aggiungere un event listener al pulsante per aggiungere una nuova todo
btnAdd.addEventListener("click", addItem);
