//Reference
let newTaskRef = document.getElementById('newTask')
let submitTaskRef = document.querySelector('#submitTask')
let skeletonRef = document.getElementById('skeleton')
let tasksRef = document.getElementById('tasks')
let tasksFinishedRef = document.getElementById('tasksFinished')
let closeAppRef = document.getElementById('closeApp')
let imageUserRef = document.getElementById('imageUser')



//Finish the session
closeAppRef.addEventListener('click', function(event){

    event.preventDefault()
    window.location.href = './index.html'

})

//Button new task desabled
newTaskRef.addEventListener('keyup', function(event){

    event.preventDefault()
    if (newTaskRef.value === ''){

        submitTaskRef.disabled = true
        submitTaskRef.style.opacity = "0.3";
        
    }else{

        submitTaskRef.disabled = false
        submitTaskRef.style.opacity = "1";

    }
    

})

//Exit page without login 
function logOutUser(){

localStorage.clear()
window.location.href = './index.html'

}

if(localStorage.getItem('token') === 'undefined'){

    window.location.href = './index.html'

}

//If login entry with full name
else{
    
    

let requestConfiguration = {

    headers: {

        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
}

fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestConfiguration).then(
    response => {

        if(response.ok){

            response.json().then(
                
                data => {
                                        
                    console.log(data)
                    let userInfoRef = document.querySelector('.user-info p')
                    userInfoRef.innerText = `${data.firstName} ${data.lastName}`
                        
                }
            )
            
        }else{
            logOutUser()
            
        }

        console.log(response)
        
    }
)


}

//Register a new Task
submitTaskRef.addEventListener('click', event => {
    
    event.preventDefault()

    let header = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    let objectBody = {
        "description": newTaskRef.value,
        "completed": false
    } 
    
    let requestManager = {
        
        method: 'POST',
        body: JSON.stringify(objectBody),
        headers: header 
        
    }
    
    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestManager).then(
        response => {
    
            response.json().then(
                tasks => 
                console.log(tasks), 
                getTasks()  
            )
        }
    )
    
})







//Update Tasks
function updateTask(id, completed){
    
    let header = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    
    let objectBody = {
        
        "completed": completed
    } 
    
    let updateManager = {
        
        method: 'PUT',
        body: JSON.stringify(objectBody),
        headers: header 
        
    }
    
    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, updateManager).then(
        response => {
            
            
            response.json().then(
                tasks => 
                
                getTasks()   
                
                )
            }
            )          
            
        }

    let requestTaskConfig = {
        
        headers: {
        
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }


//Get the Tasks    
function getTasks(){
    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestTaskConfig).then(
        response => {
            
        skeletonRef.style.display = "none"   
        response.json().then(
            tasks => {

                tasksFinishedRef.innerHTML = ""
                tasksRef.innerHTML = ""

                    
                    tasks.forEach(task => {
                        
                        
                        const options = {day: '2-digit', month: '2-digit', year: 'numeric'}
                        const dateFormated = new Date(task.createdAt).toLocaleDateString('pt-BR', options)
                    
                        if(task.completed){
                    
                            
                    
                            tasksFinishedRef.innerHTML +=  `
                            <li class="tarefa" data-aos="fade-up">
                            <div class="not-done" onclick="updateTask(${task.id}, false)"><img src="./assets/return.png" alt="Tarefa terminada"></div>
                            <div class="descricao">
                            <p class="nome">${task.description}</p>
                            <p class="timestamp">Created in: ${dateFormated}</p>
                            <button class="deleteBtn" type="submit"onclick="confirmDelete(${task.id})">
                            <img src="./assets/trash.png" alt="Excluir tarefa">
                            </button>                           
                            </div>
                            </li>
                            `

                        }else{
                                        
                    
                            tasksRef.innerHTML +=  `
                            <li class="tarefa" data-aos="fade-up">
                            <div class="not-done" onclick="updateTask(${task.id},true)">
                            <img src="./assets/finished.png" alt="Tarefa terminada">
                            </div>
                            <div class="descricao">
                            <p class="nome">${task.description}</p>
                            <p class="timestamp">Created in: ${dateFormated}</p>
                            <button class="deleteBtn" type="submit"onclick="confirmDelete(${task.id})">
                            <img src="./assets/trash.png" alt="Excluir tarefa">
                            </button> 
                            </div>
                            </li>
                            `  
                        }
                        
                    });
                    
                    
                }
            )
            })
        }
        getTasks()

//Confirm Delete
function confirmDelete(deleteId){
 
    Swal.fire({
        title: 'Do you really want delete this task?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            deleteTask(deleteId)
          )
        }
      })
    }


//Delete Task
function deleteTask(id){
    
    let deleteConfiguration = {

        method: 'DELETE',
        headers: {
    
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }
    
    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, deleteConfiguration).then(
        response => {
            
            
            response.json().then(
                tasks => 
                
                getTasks()   
                
                )
            }
            )          
            
        }

//Reference image user

function getImage(data){

    imageUserRef.src = data.picture.thumbnail

}

//Random image
fetch('https://randomuser.me/api/')
    .then(response =>{
        return response.json()
            .then(data=> {
                getImage(data.results[0])
                console.log(data)
            })
    })