async function newGameHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="new-game-title"]').value;

    console.log(title);

    if (!title) {
        return;
    }

    const response = await fetch(`/api/games`, {
        method: 'POST',
        body: JSON.stringify({
            title
        }),
        headers: {'Content-Type': 'application/json'}
    });

    response.ok ? document.location.replace('/dashboard') : alert(response.statusText);
}

async function editGameHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="updated-game-title"]').value;
    const game_id = document.querySelector('select[name="game-game"]').value;

    console.log(title, game_id);

    if (!title || !game_id) {
        return;
    }

    const response = await fetch(`/api/games/${game_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        headers: {'Content-Type': 'application/json'}
    });

    response.ok ? document.location.replace('/dashboard') : alert(response.statusText);
}

async function deleteGameHandler(event) {
    event.preventDefault();

    const game_id = document.querySelector('select[name="game-game"]').value;

    console.log(game_id);

    if (!game_id) {
        return;
    }

    const response = await fetch(`/api/games/${game_id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });

    response.ok ? document.location.replace('/dashboard') : alert(response.statusText);
}

document.querySelector('.add-game-btn').addEventListener('click', newGameHandler);
document.querySelector('.edit-game-btn').addEventListener('click', editGameHandler);
document.querySelector('.delete-game-btn').addEventListener('click', deleteGameHandler);

