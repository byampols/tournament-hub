async function editFormHandler(event) {
    event.preventDefault();

    const download_id = event.target.id;

    const download_type = document.querySelector(`input[name="download-type"][id="${download_id}"]`).value;
    const download_link = document.querySelector(`input[name="download-link"][id="${download_id}"]`).value;

    const response = await fetch(`/api/downloads/${download_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            download_type,
            download_link
        }),
        headers: {'Content-Type': 'application/json'}
    });


    response.ok ? document.location.reload() : alert(response.statusText);
}

const allEditButtons = document.querySelectorAll('.edit-download-btn');
allEditButtons.forEach(button => {
    button.addEventListener('click', editFormHandler);
});