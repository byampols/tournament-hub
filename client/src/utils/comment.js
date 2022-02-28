async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    const tournament_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                tournament_id,
                comment_text
            }),
            headers: {'Content-Type': 'application/json'}
        });

        response.ok ? (
            document.location.reload(),
            document.querySelector('textarea[name="comment-body"]').value = ""
            ) : alert(response.statusText);
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);