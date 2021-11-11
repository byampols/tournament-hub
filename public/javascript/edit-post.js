async function editFormHandler(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('textarea[name="post-text"]').value;

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: {'Content-Type': 'application/json'}
    });

    response.ok ? document.location.reload() : alert(response.statusText);
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);