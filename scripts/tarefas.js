function logOutUser(){

    localStorage.clear()
    window.location.href = './index.html'

}

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

fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfiguration).then(
    response => {
        console.log(response)
    }
)

