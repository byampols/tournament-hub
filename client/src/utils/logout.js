async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {'Content-Type': 'application/json'}
    });

    response.ok ? document.location.replace('/'): alert(response.statusText);
}

module.exports = logout;