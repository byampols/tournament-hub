const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Tournament, Comment, Game, Download } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    Tournament.findAll({
        attributes: ['id', 'title', 'tournament_description', 'tournament_rules', 'start_date', 'end_date', 'prize_pool', 'signup_link','created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'tournament_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: Download,
                attributes: ['id', 'download_type', 'download_link', 'tournament_id']
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Game,
                attributes: ['title']
            }
        ]
    }).then(dbTournamentData => {
        Game.findAll({
            attributes:['id', 'title']
        }).then(dbGameData => {
            const tournaments = dbTournamentData.map(tournament => tournament.get({plain: true}));
            const games = dbGameData.map(game => game.get({plain: true}));
            res.render('homepage', {
                tournaments,
                games,
                loggedIn: req.isAuthenticated(),
                isTournamentAdmin: req.user?.is_tournament_admin,
                isSiteAdmin: req.user?.is_site_admin
            })
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get only one game
router.get('/games/:game_id', (req, res) => {
    console.log(req.session);
    Tournament.findAll({
        where: {
            game_id: req.params.game_id
        },
        attributes: ['id', 'title', 'tournament_description', 'tournament_rules', 'start_date', 'end_date', 'prize_pool', 'signup_link','created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'tournament_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: Download,
                attributes: ['id', 'download_type', 'download_link', 'tournament_id']
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Game,
                attributes: ['title']
            }
        ]
    }).then(dbTournamentData => {
        Game.findAll({
            attributes:['id', 'title']
        }).then(dbGameData => {
            const tournaments = dbTournamentData.map(tournament => tournament.get({plain: true}));
            const games = dbGameData.map(game => game.get({plain: true}));
            res.render('homepage', {
                tournaments,
                games,
                loggedIn: req.isAuthenticated(),
                isTournamentAdmin: req.user?.is_tournament_admin,
                isSiteAdmin: req.user?.is_site_admin
            })
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/tournament/:id', (req, res) => {
    Tournament.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'tournament_description', 'tournament_rules', 'start_date', 'end_date', 'prize_pool', 'signup_link','created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'tournament_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: Download,
                attributes: ['id', 'download_type', 'download_link', 'tournament_id']
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Game,
                attributes: ['title']
            }
        ]
    }).then(dbTournamentData => {
        if (!dbTournamentData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        const tournament = dbTournamentData.get({plain: true});
        res.render('single-post', {
            tournament,
            loggedIn: req.isAuthenticated(),
            isTournamentAdmin: req.user?.is_tournament_admin,
            isSiteAdmin: req.user?.is_site_admin
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;