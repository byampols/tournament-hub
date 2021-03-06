async function editFormHandler(event) {
    event.preventDefault();
    const tournament_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const title = document.querySelector('input[name="title"]').value;
    const tournament_description = document.querySelector('textarea[name="tournament-description"]').value;
    const tournament_rules = document.querySelector('textarea[name="tournament-rules"]').value;
    const prize_pool = parseInt(document.querySelector('input[name="prize-pool"]').value.replace('$', ''));
    const start_date = document.querySelector('input[name="start-date"]').value;
    const end_date = document.querySelector('input[name="end-date"]').value;
    const signup_link = document.querySelector('input[name="signup-link"]').value;
    const game_id = document.querySelector('select[name="game"]').value;

    const response = await fetch(`/api/tournaments/${tournament_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            tournament_description,
            tournament_rules,
            prize_pool,
            start_date,
            end_date,
            signup_link,
            game_id
        }),
        headers: {'Content-Type': 'application/json'}
    });

    response.ok ? document.location.reload() : alert(response.statusText);
}

document.querySelector('.edit-tournament-form').addEventListener('submit', editFormHandler);