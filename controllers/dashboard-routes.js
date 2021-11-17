const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Tournament, Comment, Game, Download } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Tournament.findAll({
        where: {
            user_id: req.session.user_id
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
            res.render('dashboard', {
                tournaments,
                games,
                loggedIn: req.session.loggedIn,
                isAdmin: req.session.is_tournament_admin
            })
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });  
});

router.get('/edit/:id', withAuth, (req, res) => {
    Tournament.findOne({
        where: {
            id: req.params.id
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
                attributes: ['id', 'title']
            }
        ]
    }).then(dbTournamentData => {
        if (!dbTournamentData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        Game.findAll({
            attributes:['id', 'title']
        }).then(dbGameData => {
            const tournament = dbTournamentData.get({plain: true});
            const games = dbGameData.map(game => game.get({plain: true}));
            res.render('edit-post', {
                tournament,
                games,
                loggedIn: req.session.loggedIn,
                isAdmin: req.session.is_tournament_admin
            })
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;