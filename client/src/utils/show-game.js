function setSelect() {
    let game = window.location.href.split('/')[window.location.href.split('/').length - 1];
    console.log(game);
    if (!Boolean(parseInt(game))) {
        game = "all";
    }
    document.querySelector('select[name="game"]').value = game;
}


function changePage(event) {
    const game_id = document.querySelector('select[name="game"]').value;

    game_id === "all" ? document.location.replace(`/`) : document.location.replace(`/games/${game_id}`);
    document.querySelector('select[name="game"]').value = game_id;
}

setSelect();
document.querySelector('select[name="game"]').addEventListener('change', changePage);