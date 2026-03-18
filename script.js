const LS_TODOLIST_KEY = 'todolist';

const templateTodoItem = {
    etichetta: '',
    stato: false,
    order: 1,
    priorita: 2,
}

// creare un array di oggetti che rappresentano le todo
const savedTodoList = localStorage.getItem(LS_TODOLIST_KEY);
const todoList = savedTodoList ? JSON.parse(savedTodoList) : [];

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
        // faccio in modo che order abbia un peso maggiore rispetto alla priorità
        // order alti mandano in fondo l'item nella lista
        // all'interno di elementi con order alti avviene un ordinamento per priorità
        // idem per elementi con order basso vengono poi ordinati per priorità
        // return (a.priorita + a.order * 100) - (b.priorita + b.order * 100);
        return a.order - b.order ;
    })

    localStorage.setItem(LS_TODOLIST_KEY, JSON.stringify(todoList));

    // ciclare l'array di oggetti e creare un elemento li per ogni todo
    todoList.forEach(
        function(item, index){
            // creare un elemento li, impostare il testo e aggiungerlo alla lista
            const elementoLi = document.createElement('li');
            elementoLi.innerText = item.etichetta;
            elementoLi.classList.add('todo-item');
            elementoLi.dataset.todoId = index;
            elementoLi.dataset.todoUuid = item.id;
            elementoLi.dataset.todoOrder = item.order;

            // se l'elemento ha stato true aggiungi la classe
            if (item.stato) {
                elementoLi.classList.add('todo-item--checked');
            }

            elementoLi.classList.add(`todo-item--priority-${item.priorita}`);
            // elementoLi.classList.add('todo-item--priority-' + item.priorita);

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

            // creo due bottoni
            const elementoUp = document.createElement('button');
            const elementoDown = document.createElement('button');
            const elementoDel = document.createElement('button');

            // ci metto dentro delle icone
            elementoUp.innerText = '˄';
            elementoDown.innerText = '˅';
            elementoDel.innerText = 'D';

            elementoUp.addEventListener('click', moveTodoUp);
            elementoDown.addEventListener('click', moveTodoDown);
            elementoDel.addEventListener('click', deleteItem);

            // inserisco all'inizio del "li" il mio input checkbox
            elementoLi.prepend(elementoCheckbox);

            // inserisco i bottoni dentro il li, in fondo
            elementoLi.append(elementoUp);
            elementoLi.append(elementoDown);
            elementoLi.append(elementoDel);

            // inserisco all'interno della lista il mio "li" completo
            listaTodo.append(elementoLi);
        }
    );
}

function moveTodoUp (event) {
    // event.target è il bottone
    // event.target.parentElement è il padre, quindi il "li"
    // event.target.parentElement.dataset è il dataset del "li"
    console.log(event.target.parentElement.dataset)
    console.log('prev element', event.target.parentElement.previousElementSibling)

    const currentElement = event.target.parentElement;
    const prevElement = currentElement.previousElementSibling;

    if (!prevElement) {
        return;
    }

    const currentElementOrder = parseInt(currentElement.dataset.todoOrder);
    const prevElementOrder = parseInt(prevElement.dataset.todoOrder);

    const todoItem = todoList.find(
        function(el){
            return el.order === currentElementOrder;
        }
    );

    const prevTodoItem = todoList.find(
        function(el){
            return el.order === prevElementOrder;
        }
    );

    const oldTodoItemOrder = todoItem.order;

    todoItem.order = prevTodoItem.order;
    prevTodoItem.order = oldTodoItemOrder;

    disegnaElenco();
}

function moveTodoDown (event) {
    console.log(event.target.parentElement.dataset)
    console.log('next element', event.target.parentElement.nextElementSibling)

    const currentElement = event.target.parentElement;
    const nextElement = currentElement.nextElementSibling;

    if (!nextElement) {
        return;
    }

    const currentElementOrder = parseInt(currentElement.dataset.todoOrder);
    const nextElementOrder = parseInt(nextElement.dataset.todoOrder);

    const todoItem = todoList.find(
        function(el){
            return el.order === currentElementOrder;
        }
    );

    const nextTodoItem = todoList.find(
        function(el){
            return el.order === nextElementOrder;
        }
    );

    const oldTodoItemOrder = todoItem.order;

    todoItem.order = nextTodoItem.order;
    nextTodoItem.order = oldTodoItemOrder;

    disegnaElenco();
}

const deleteItem = (event) => {
    // cerco lo UUID del elemento LI, è nel suo data-todouuid
    const idDaEliminare = event.target.parentElement.dataset.todoUuid;
    // e la sua etichetta
    const etichettaDaEliminare = event.target.parentElement.innerText;

    // se per qualche motivo l'elemento non esiste, stop il mio compito è finito
    if (!idDaEliminare) {
        return;
    }

    // se l'utente non conferma, stop, esco.
    if (!confirm(`Vuoi davvero cancellare ${etichettaDaEliminare}?`)) {
        return;
    }

    // se conferma cerco la sua posizione nell'elenco todoList
    const posizioneElementoDaEliminare = todoList.findIndex((item) => item.id === idDaEliminare);

    // dall'elenco elimino un solo elemento alla posizione posizioneElementoDaEliminare
    todoList.splice(posizioneElementoDaEliminare, 1);

    // i dati sono aggiornati, ridisegna e salva in localStorage i dati
    disegnaElenco();
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

    if (inputTodo.value.trim() === '') {
        inputTodo.value = '';
        return;
    }

    const newTodo = {
        ...templateTodoItem, 
        etichetta: inputTodo.value,
        id: crypto.randomUUID(),
    };

    // aggiungere il nuovo oggetto all'array di todo
    todoList.push(newTodo);

    // ridisegna l'elenco delle todo
    disegnaElenco();

    // svuoto il campo di input
    inputTodo.value = '';

    // torno a dare focus al campo di input
    inputTodo.focus();
}

// aggiungere un event listener al pulsante per aggiungere una nuova todo
btnAdd.addEventListener("click", addItem);

inputTodo.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addItem();
    }
});