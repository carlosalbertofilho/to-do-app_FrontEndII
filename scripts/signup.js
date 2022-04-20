/* jshint esversion: 8 */
// Reference
const inputsReference = document.querySelectorAll('input');
const spanReference = document.querySelectorAll('span');
const signupButtonRef = document.getElementById('signupButton');

// Check if can be submit form
const canBeSubmit = () => {
    let submit = false;
    inputsReference.forEach(input => {
        submit = input.validity.valid;
    });
    if (submit)
        signupButtonRef.disabled = false;
};


// Check validity rule form
const validityForm = () => {
    // input validation
    inputsReference.forEach((input, index) => {
        input.addEventListener('keyup', event => {
            if (!input.validity.valid) {
                spanReference[index].className = "error";
                spanReference[index].removeAttribute("hidden");
            } else {
                spanReference[index].setAttribute("hidden", "hidden");
            }
            if (index == 4 && input.value.length > 5 && input.value != inputsReference[3].value) {
                spanReference[index].innerText = "As senhas não coincidem";
            } else
                canBeSubmit();
        });
    });
};

const userOk = () => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuário cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 5500
    });
};

const userError = () => {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Ops..!',
        text: 'Não foi possível cadastrar o usuário tente novamente!',
        showConfirmButton: false,
        timer: 3500
    });
};


// Send Sign-up
async function sendSignUp(object) {
    const header = {
        'Content-Type': 'application/json'
    };
    const objectBody = {
        "firstName": object[0].value,
        "lastName": object[1].value,
        "email": object[2].value,
        "password": object[3].value
    };
    const requestManager = {
        method: 'POST',
        body: JSON.stringify(objectBody),
        headers: header
    };
    return fetch('https://ctd-todo-api.herokuapp.com/v1/users', requestManager)
        .then(T => T.ok ? T.json() : Promise.reject(new Error(T.status)));
}


validityForm();
signupButtonRef.addEventListener('click', event => {
    event.preventDefault();
    sendSignUp(inputsReference)
        .then(data => {
            userOk();
            localStorage.setItem('token', data.jwt);
            window.location.href = './tarefas.html';
        })
        .catch(() => userError());
});