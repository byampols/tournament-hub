async function deleteFormHandler(event) {
    event.preventDefault();
    
    const download_id = event.target.id;

    console.log(download_id);
    const response = await fetch(`/api/downloads/${download_id}`, {
        method: 'DELETE'
    });

    response.ok ? document.location.reload() : alert(response.statusText);
}

const allDeleteButtons = document.querySelectorAll('.delete-download-btn');
allDeleteButtons.forEach(button => {
    button.addEventListener('click', deleteFormHandler);
});

