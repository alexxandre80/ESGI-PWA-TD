import {fetchTodos, fetchTodo,deleteTodo} from "../api/task.js";
import {setTodos, getTodos, unsetTodo} from "../idb.js";

export default function Page(page, id) {
    page.innerHTML = '';
    const constructor = document.createElement('div');
    constructor.innerHTML = `
    <div class="card">
Nom de la tache : 
<div class="text-gray-900 font-bold text-xl mb-2 name">Nom de la tâche</div>
Description de la tache : 
<p class="text-gray-700 text-base content">Description de la tâche</p>
Etat de la tache : 
<p class="text-gray-700 text-base state">Etat de la tâche</p>
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
                        card.querySelector('.state').innerHTML = result.state;
                        console.log(id);
                        location.replace("/")

                })
    }else{
        getTodos().then(result=>{
            result.map(data=>{
                if(data.id === id){
                    card.querySelector('.name').innerHTML = data.name;
                    card.querySelector('.content').innerHTML = data.content;
                    card.querySelector('.state').innerHTML = data.state;
                }
            })
        })
    }

    //alert(id);
    
    //


    page.appendChild(card);
    return card;
};
