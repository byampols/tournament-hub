async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    let response = {}

    if (username && email && password) {
        await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json()).then(data => {
            response = data;
        }).catch(error => console.error('Error:', error));

        console.log(response)

       response.status === "ok" ? document.location.replace('/') : (
            document.getElementById('signup-err').textContent = response.message ? `${response.message}` : `Invalid Sign Up`
        ); 
    }
}

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    let response = {};

    if (email && password) {
        await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json()).then(data => {
            response = data;
        }).catch(error => console.error('Error:', error));

       response.status === "ok" ? document.location.replace('/') : (
            document.getElementById('login-err').textContent = `${response.message}`
        ); 
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);