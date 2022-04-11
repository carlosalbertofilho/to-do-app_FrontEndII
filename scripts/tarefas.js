//Reference
let newTaskRef = document.getElementById('newTask')
let submitTaskRef = document.querySelector('#submitTask')
let skeletonRef = document.getElementById('skeleton')



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

    let requestTaskConfig = {

        headers: {
    
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }

    function listTask(objectRef, dados){

        objectRef.innerHTML =  `<li class="tarefa">
        <div class="not-done"></div>
        <div class="descricao">
          <p class="nome">${dados.description}</p>
          <p class="timestamp">${dados.createdAt}</p>`


    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestTaskConfig).then(
        response => {
            
            skeletonRef.style.display = "none"   
            response.json().then(
                tasks => 
               listTask(skeletonRef, tasks)
            )
        }
    )

})
