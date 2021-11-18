async function updateFormHandler(event) {
    event.preventDefault();

    const user_id = document.querySelector('select[name="user"]').value;
    const is_site_admin = document.querySelector('input[name="is-site-admin"]').checked;
    const is_tournament_admin = document.querySelector('input[name="is-tournament-admin"]').checked;

    const response = await fetch(`/api/users/asdkdfjidjfekamsd934krjfe9asj39kj213msdsd22a9/${user_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            is_site_admin,
            is_tournament_admin
        }),
        headers: {'Content-Type': 'application/json'}
    });

    response.ok ? document.location.replace('/dashboard') : alert(response.statusText);
}

document.querySelector('.user-status-form').addEventListener('submit', updateFormHandler);