import {fetchTodos} from "../api/task.js";
import {createTodo} from "../api/task.js";
import {setTodos, getTodos, setTodo} from "../idb.js";

export default function Todo(page, data) {
    page.innerHTML = '';
    const constructor = document.createElement('div');
    constructor.innerHTML = `
    <div class="card">
  <section>
  <div>
    <div class="d-flex justify-content-center">
   
      <form>
  <div>
    <div>
      <label>
      Nom de la tâche :
      </label>
    </div>
    <div class="d-flex justify-content-center">
      <input class="name bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="name" type="text" name="name">
    </div>
  </div>
  <div>
    <div>
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
      Description de la tâche :
      </label>
    </div>
    <div>
      <input class="content bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="content" name="content" type="text">
    </div>
  </div>
  <div>

  <div>
    <div>
      <button class="button rounded" type="button">
        Ajouter cette tâche
      </button>
    </div>
  </div>
</form>   
    </div>
    </div>
    </section>
    
    <section>
  <div>
  <hr class='pt-1 pb-1'>
  <ul>

  <div class="flex flex-col text-center todolist">
    </div>
   
  <div>
    
  </div>
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
        let state = "En cours";

        if(!document.offline) {
            let data = {name: name, content: content, state: state}

            createTodo(data).then(() => {
                let chril = card.querySelector('.todolist').cloneNode(true)
                chril.innerHTML = "<span class='pb-10'>" + data.name + " - " + data.content + "-" + data.state + `  <a class='button rounded' href="/task/${data.id}" >Voir</a>` + "</span> <hr class='pt-1 pb-1'>";
                card.appendChild(chril);

            })
        }else{
            let data = {id: Date.now(),name: name, content: content, state: state}

            setTodo(data).then(() => {
                dataToSave.push(data);
                let chril = card.querySelector('.todolist').cloneNode(true)
                chril.innerHTML = "<span class='pb-10'>" + data.name + " - " + data.content + "-" + data.state +`  <a class='button rounded' href="/task/${data.id}" >Voir</a>` + "</span> <hr class='pt-1 pb-1'>";
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
                    chril.innerHTML = "<span class='pb-10'>" + data.name + " - " + data.content + " - " + data.state + `  <a class='button rounded' href="/task/${data.id}" >Voir</a>` + "</span> <hr class='pt-1 pb-1'>";
                    card.appendChild(chril);
                })
            }
    )
    }else{
        getTodos().then(result=>{
            result.map(data=>{
                let chril = card.querySelector('.todolist').cloneNode(true)
                chril.innerHTML = "<span class='pb-10'>" + data.name + " - " + data.content + "-" + data.state + `  <a class='button rounded' href="/task/${data.id}" >Voir</a>`+ "</span> <hr class='pt-1 pb-1'>";
                card.appendChild(chril);
            })
        })
    }

    page.appendChild(card);
    return card;
};
