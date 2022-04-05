let inputEmailRef = document.getElementById('inputEmail')
let inputPasswordRef = document.getElementById('inputPassword')
let loginButtonRef = document.querySelector('#loginButton')

loginButtonRef.addEventListener('click', event => {

    event.preventDefault()

   

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

  

    fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', requestConfiguration).then(

        response => {

            response.json().then(

                data => {

                    localStorage.setItem('token', data.jwt)
                    

                }

            )

        }

    )

})