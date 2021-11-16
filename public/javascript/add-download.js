async function newFormHandler(event) {
    event.preventDefault();

    const download_type = document.querySelector('input[name="download-type"]').value;
    const download_link = document.querySelector('input[name="download-link"]').value;
    const tournament_id = document.querySelector('select[name="tournament"]').value;

    const response = await fetch(`/api/downloads`, {
        method: 'POST',
        body: JSON.stringify({
            download_type,
            download_link,
            tournament_id
        }),
        headers: {'Content-Type': 'application/json'}
    });

    response.ok ? document.location.replace('/dashboard') : alert(response.statusText);
}

document.querySelector('.new-download-form').addEventListener('submit', newFormHandler);