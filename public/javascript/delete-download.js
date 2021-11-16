async function deleteFormHandler(event) {
    event.preventDefault();
    
    const download_id = event.target.id;

    console.log(download_id);
    const response = await fetch(`/api/downloads/${download_id}`, {
        method: 'DELETE'
    });

    response.ok ? document.location.reload() : alert(response.statusText);
}

const allButtons = document.querySelectorAll('.delete-download-btn');
allButtons.forEach(button => {
    button.addEventListener('click', deleteFormHandler);
});

