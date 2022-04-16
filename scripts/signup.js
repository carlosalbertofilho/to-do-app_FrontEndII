/* hint esversion: 6 */
function selectId(id) {
    return document.getElementById(id);
}

//Reference
let userNameRef = selectId('userName')
let userLastNameRef = selectId('userLastName')
let userEmailRef = selectId('userEmail')
let userPasswordRef = selectId('userPassword')
let userRePasswordRef = selectId('userRePassword')
let signupButtonRef = selectId('signupButton')
let userSuccessRef = selectId('userSuccess')

//Reference Error
let errorNameRef = selectId('errorName')
let errorLastNameRef = selectId('errorLastName')
let errorEmailRef = selectId('errorEmail')
let errorPasswordRef = selectId('errorPassword')
let errorRePasswordRef = selectId('errorRePassword')
let errorConfig = []

//Error

function errorUserName(){
    if (userNameRef.value == ""){
        errorNameRef.innerText = 'campo nome deve ser preenchido'
        errorConfig.push('Name')
    }else {
    }
}

function errorUserLastName(){
    if (userLastNameRef.value == ""){
        errorLastNameRef.innerText = 'campo sobrenome deve ser preenchido'
        errorConfig.push('LastName')
    }else {
    }
}

function errorUserEmail(){
    if (userEmailRef.value == ""){
        errorEmailRef.innerText = 'campo email deve ser preenchido'
        errorConfig.push('Email')
    }else {
    }
}

function errorUserPassword(){
    if (userPasswordRef.value == ""){
        errorPasswordRef.innerText = 'campo senha deve ser preenchido'
        errorConfig.push('Password')
    }else {
    }
}

function errorUserRePassword(){
    if (userRePasswordRef.value == ""){
        errorRePasswordRef.innerText = 'campo repetir senha deve ser preenchido'
        errorConfig.push('RePassword')
    }else {
    }
}

function errorUserRePasswordDifferent(){
    if (userPasswordRef.value !== userRePasswordRef.value){
        errorRePasswordRef.innerText = 'campo repetir senha não confere com a senha'
        errorConfig.push('DifPassword')
    }else {
    }
}

console.log(errorConfig)

//Events
signupButtonRef.addEventListener('click', event => {
    
    event.preventDefault()
    
            errorUserName()
        
            errorUserLastName()
            
            errorUserEmail()
            
            errorUserPassword()
            
            errorUserRePassword()
            
            errorUserRePasswordDifferent()
            
            let header = {
                'Content-Type': 'application/json'
            }
            
            let objectBody = {
                "firstName": userNameRef.value,
                "lastName": userLastNameRef.value,
                "email": userEmailRef.value,
                "password": userPasswordRef.value
            } 
            
            let requestManager = {
                
                method: 'POST',
                body: JSON.stringify(objectBody),
                headers: header 
                
            }

            
            
            function errorMaster(){
                if (errorConfig.length == []){
                    console.log(errorConfig)
                    fetch('https://ctd-todo-api.herokuapp.com/v1/users', requestManager ).then(
                        
                        response => {
                            if (response.status >= 200 && response.status < 300){
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Your user has been saved',
                                    showConfirmButton: false,
                                    timer: 1500
                                  })

                            }else{

                                userSuccessRef.innerText = 'Não foi possível cadastrar o usuário tente novamente'

                            }
                            response.json().then(
                                data => {
                                    
                                }
                                          
                            )
                        }
                    )
                }else {
                   errorConfig = []
                }
            }
            errorMaster()
            
            
            
        }) 
        

// }
