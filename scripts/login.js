/* jshint esversion: 8 */
//Reference
const inputsReference = document.querySelectorAll('input');
const spanReference = document.querySelectorAll('span');
const loginButtonRef = document.querySelector('#loginButton');

// Check if can be submit form
const canBeSubmit = () => {
    let submit = false;
    inputsReference.forEach(input => {
        submit = input.validity.valid;
    });
    if (submit)
        loginButtonRef.disabled = false;
};

// Check validity rules
const validityLogin = () => {
    inputsReference.forEach((input, index) => {
        input.addEventListener('keyup', event => {
            if (!input.validity.valid) {
                spanReference[index].className = "error";
                spanReference[index].removeAttribute("hidden");
            } else {
                spanReference[index].setAttribute("hidden", "hidden");
            }
            if (index == 1) canBeSubmit();
        });
    });
};

const userOk = () => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Seja bem-vindo!',
        showConfirmButton: false,
        timer: 5500
    });
};

const userError = msg => {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Ops..!',
        text: msg,
        showConfirmButton: false,
        timer: 3500
    });
};

// Send Login
async function sendLogin(object) {
    const credentials = {
        "email": object[0].value,
        "password": object[1].value
    };

    const requestHeaders = {
        'Content-Type': 'application/json'
    };

    const requestConfiguration = {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: requestHeaders
    };
    return fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', requestConfiguration)
        .then(T => T.ok ? T.json() : Promise.reject(new Error(T.status)));

}
validityLogin();
loginButtonRef.addEventListener('click', event => {
    event.preventDefault();
    sendLogin(inputsReference)
        .then(data => {
            setTimeout(() => userOk(), 3000);
            localStorage.setItem('token', data.jwt);
            window.location.href = './tarefas.html';
        })
        .catch(() => userError('Algo de errado não está certo!'));
});