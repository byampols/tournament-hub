async function guestLoginFormHandler(event) {
    event.preventDefault();

    const email = 'guest@guest.com';
    const password = 'password';
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

       response.status === "ok" ? document.location.replace('/') : alert(response.message); 
    }
}

document.querySelector('#guest-login').addEventListener('click', guestLoginFormHandler);