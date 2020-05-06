import {fetchTodos} from "../api/task.js";
import {createTodo} from "../api/task.js";
import {deleteTodo} from "../api/task.js";
import {setTodos, getTodos, setTodo} from "../idb.js";

export default function Todo(page, data) {
    page.innerHTML = '';
    const constructor = document.createElement('div');
    constructor.innerHTML = `
    <div class="card">
  <section class="text-gray-700 body-font border-t border-gray-200">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
   
      <form class="w-full max-w-sm">
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
      Nom de la tâche :
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="name bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="name" type="text" name="name">
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
      Description de la tâche :
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="content bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="content" name="content" type="text">
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">

  <div class="md:flex md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button class="button  rounded" type="button">
        Add TODO
      </button>
    </div>
  </div>
</form>   
    </div>
    </div>
    </section>
    
    <section class="text-gray-700 body-font border-t border-gray-200">
  <div class="container px-5 py-24 mx-auto">
  <ul>
  
    <li class="flex flex-col text-center todolist">
    </li>
   
    </ul>
    </div>
    </section>

    </div>
  `;




let dataToSave = [];

    const card = constructor
        .querySelector('.card')
        .cloneNode(true);


    var el = card.querySelector('.button');
    el.addEventListener("click", () => {
        let name = card.querySelector('#name').value;
        let content = card.querySelector('#content').value;

        if(!document.offline) {
            let data = {name: name, content: content}

            createTodo(data).then(() => {
                let chril = card.querySelector('.todolist').cloneNode(true)
                chril.innerHTML = "<span class='pb-10'>" + data.name + " - " + data.content + `  <a class='button rounded' href="/${data.id}" >Voir</a>` + "</span> <hr class='pt-4 pb-5'>";
                card.appendChild(chril);

            })
        }else{
            let data = {id: Date.now(),name: name, content: content}

            setTodo(data).then(() => {
                dataToSave.push(data);
                let chril = card.querySelector('.todolist').cloneNode(true)
                chril.innerHTML = "<span class='pb-10'>" + data.name + " - " + data.content + `  <a class='button rounded' href="/${data.id}" >Voir</a>` + "</span> <hr class='pt-4 pb-5'>";
                card.appendChild(chril);
            })
        }
         }, false);


    window.addEventListener('online', () => {
        if(dataToSave.length > 0){
            dataToSave.map(data => {
                createTodo(data)
            })
            dataToSave = [];
        }
    });


    if(!document.offline){
        fetchTodos().then(
            result => {
                setTodos(result)
                result.map(data=>{
                    let chril = card.querySelector('.todolist').cloneNode(true)
                    chril.innerHTML = "<span class='pb-10'>" + data.name + " - " + data.content + `  <a class='button rounded' href="/${data.id}" >Voir</a>` + "</span> <hr class='pt-4 pb-5'>";
                    card.appendChild(chril);
                })
            }
    )
    }else{
        getTodos().then(result=>{
            result.map(data=>{
                let chril = card.querySelector('.todolist').cloneNode(true)
                chril.innerHTML = "<span class='pb-10'>" + data.name + " - " + data.content + `  <a class='button  rounded' href="/${data.id}" >Voir</a>` + "</span> <hr class='pt-4 pb-5'>";
                card.appendChild(chril);
            })
        })
    }

    page.appendChild(card);
    return card;
};
