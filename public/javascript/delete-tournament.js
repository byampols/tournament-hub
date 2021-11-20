async function deleteFormHandler(event) {
    event.preventDefault();

    const tournament_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/tournaments/${tournament_id}`, {
        method: 'DELETE'
    });

    response.ok ? document.location.replace('/dashboard') : alert(response.statusText);
}

document.querySelector('.delete-tournament-btn').addEventListener('click', deleteFormHandler);