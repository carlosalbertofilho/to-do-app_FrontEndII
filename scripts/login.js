

//Reference
let inputEmailRef = document.getElementById('inputEmail')
let inputPasswordRef = document.getElementById('inputPassword')
let loginButtonRef = document.querySelector('#loginButton')
let userSuccessRef = document.getElementById('userSuccess')
let errorEmailRef = document.getElementById('errorEmail')
let errorPasswordRef = document.getElementById('errorPassword')
let errorConfig = []


//Error

function errorUserEmail(){
    if (inputEmailRef.value == ""){
        errorEmailRef.innerText = 'campo email deve ser preenchido'
        errorConfig.push('Email')
    }else {
    }
}
function errorUserPassword(){
    if (inputPasswordRef.value == ""){
        errorPasswordRef.innerText = 'campo senha deve ser preenchido'
        errorConfig.push('Password')
    }else {
    }
}

loginButtonRef.addEventListener('click', event => {

    event.preventDefault()

    errorUserEmail()
            
    errorUserPassword()
   

    let credentials = {

        email:inputEmailRef.value ,
        password:inputPasswordRef.value 

    }

    

    let requestHeaders = {

        'Content-Type': 'application/json'

    }

   

    let requestConfiguration = {

        method: 'POST',
        body: JSON.stringify(credentials),
        headers: requestHeaders

    }

  
    function errorMaster(){
        if (errorConfig.length == []){
        fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', requestConfiguration).then(

        response => {
            console.log(response)
            if (response.ok){
            response.json().then(

                data => {

                    localStorage.setItem('token', data.jwt)
                    window.location.href = './tarefas.html'
                    
                    
                }
                
                )
            }else if(response.status > 300 || response.status < 200){
                
                
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Your user or your password have been incorrect',
                    showConfirmButton: false,
                    timer: 2500
                  })

            }else{

            }
            
        }
        
        )
    }else {
        errorConfig = []
    }
    
}
    errorMaster()
})