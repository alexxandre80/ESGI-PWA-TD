import {fetchTodos, fetchTodo} from "../api/task.js";
import {setTodos, getTodos, setTodo} from "../idb.js";

export default function Page(page, id) {
    page.innerHTML = '';
    const constructor = document.createElement('div');
    constructor.innerHTML = `
    <div class="card">
  <section class="text-gray-700 body-font border-t border-gray-200">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
   
   <div class="max-w-sm w-full lg:max-w-full lg:flex">
  </div>
  <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div class="mb-8">
      <p class="text-sm text-gray-600 flex items-center">
        Nom de la tache : 
      
      <div class="text-gray-900 font-bold text-xl mb-2 name">Nom de la tâche</div>
      </p>
      <p class="text-sm text-gray-600 flex items-center">
        Description de la tache : 
      <p class="text-gray-700 text-base content">Description de la tâche</p>
    </div>
   
  </div>
</div>
    
    </div>
    </div>
    </section>
    
    <section class="text-gray-700 body-font border-t border-gray-200">
  <div class="container px-5 py-24 mx-auto">
  <ul>

    </ul>
    </div>
    </section>

    </div>
  `;


    let dataToSave = [];

    const card = constructor
        .querySelector('.card')
        .cloneNode(true);

    if(!document.offline){
        fetchTodo(id).then(
            result => {
                        card.querySelector('.name').innerHTML = result.name;
                        card.querySelector('.content').innerHTML = result.content;
                })
    }else{
        getTodos().then(result=>{
            result.map(data=>{
                if(data.id === id){
                    card.querySelector('.name').innerHTML = data.name;
                    card.querySelector('.content').innerHTML = data.content;
                }
            })
        })
    }
    page.appendChild(card);
    return card;
};
