const router = require('express').Router();
const { Game } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Game.findAll().then(dbGameData => res.json(dbGameData)).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    Game.create({
        title: req.body.title
    }).then(dbGameData => res.json(dbGameData)).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Game.update({
        title: req.body.title
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbGameData => {
    if (!dbGameData) {
        res.status(404).json({message: 'No game found with this id'});
        return;
    }
    res.json(dbGameData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Game.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbGameData => {
    if (!dbGameData) {
        res.status(404).json({message: 'No comment found with this id'});
        return;
    }
    res.json(dbGameData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;