/* hint esversion: 6 */
//Referencias
let userNameRef = document.getElementById('userName')
let userLastNameRef = document.getElementById('userLastName')
let userEmailRef = document.getElementById('userEmail')
let userPasswordRef = document.getElementById('userPassword')
let signupButtonRef = document.getElementById('signupButton');

signupButtonRef.addEventListener('click', event => {

    event.preventDefault()
    
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
            

    fetch('https://ctd-todo-api.herokuapp.com/users', requestManager ).then(

    response => {
        response.json().then(
            data => {
                console.log(data)
            }
        )
    }     

    )

} )
