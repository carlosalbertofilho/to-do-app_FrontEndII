//Reference
let newTaskRef = document.getElementById('newTask')
let submitTaskRef = document.querySelector('#submitTask')
let skeletonRef = document.getElementById('skeleton')
let tasksRef = document.getElementById('tasks')
let tasksFinishedRef = document.getElementById('tasksFinished')



function logOutUser(){

localStorage.clear()
window.location.href = './index.html'

}

if(localStorage.getItem('token') === 'undefined'){

    window.location.href = './index.html'

}else{
    
    

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


console.log(submitTaskRef)

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
                console.log(tasks)   
            )
        }
    )
    
})

    let requestTaskConfig = {

        headers: {
    
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }

    
    
    
    
    
    function updateTask(id){
        
    let header = {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
      }
    
      let objectBody = {
          
          "completed": true
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
    

    // function listTask(objectRef){
        
    //     objectRef = tasksRef
        
    // }
    
    // function listTaskFinished(objectRef){

    //     objectRef = tasksFinishedRef

    // }
    


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
                    
                            
                    
                            tasksFinishedRef.innerHTML +=  `<li class="tarefa">
                            <div class="not-done" onclick="updateTask(${task.id})"></div>
                            <div class="descricao">
                            <p class="nome">${task.description}</p>
                            <p class="timestamp">${dateFormated}</p>
                            </div>
                            </li>`
                        }else{
                                        
                    
                            tasksRef.innerHTML +=  `<li class="tarefa">
                            <div class="not-done" onclick="updateTask(${task.id})"></div>
                            <div class="descricao">
                            <p class="nome">${task.description}</p>
                            <p class="timestamp">${dateFormated}</p>
                            </div>
                            </li>`  
                        }
                        
                    });
                    
                    
                }
            )
            })
        }

        getTasks()

        