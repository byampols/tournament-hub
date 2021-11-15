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
        const tournaments = dbTournamentData.map(post => post.get({plain: true}));
        res.render('dashboard', {tournaments, loggedIn: true});
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
        res.render('edit-post', {tournament, loggedIn: true});
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;