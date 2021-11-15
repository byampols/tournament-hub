const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Tournament, Comment, Game, Download } = require('../../models');
const withAuth = require('../../utils/auth');

//get all users
router.get('/', (req, res) => {
    console.log('======================');
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
    }).then(dbTournamentData => res.json(dbTournamentData)).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get one
router.get('/:id', (req, res) => {
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
            res.status(404).json({message: 'No tournament found with this id'});
            return;
        }
        res.json(dbTournamentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//create tournament
router.post('/', (req, res) => {
    // expects {title: 'King of the Desert 4', tournament_description: 'text', tournament_rules: 'rules', start_date: '2021-11-18', end_date: '2021-12-12', prize_pool: 75000, signup_link: 'https://play.toornament.com/en_GB/tournaments/5040887316076912640/', user_id: 1, game_id: 1}
    Tournament.create({
        title: req.body.title,
        tournament_description: req.body.tournament_description,
        tournament_rules: req.body.tournament_rules,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        prize_pool: req.body.prize_pool,
        signup_link: req.body.signup_link,
        game_id: req.body.game_id,
        user_id: req.body.user_id //req.session
    }).then(dbTournamentData => res.json(dbTournamentData)).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//update tournament details
router.put('/:id', withAuth, (req, res) => {
    Tournament.update({
        title: req.body.title,
        tournament_description: req.body.tournament_description,
        tournament_rules: req.body.tournament_rules,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        prize_pool: req.body.prize_pool,
        signup_link: req.body.signup_link,
        game_id: req.body.game_id
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbTournamentData => {
    if (!dbTournamentData) {
        res.status(404).json({message: 'No tournament found with this id'});
        return;
    }
    res.json(dbTournamentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//delete tournament
router.delete('/:id', withAuth, (req, res) => {
    Tournament.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbTournamentData => {
    if (!dbTournamentData) {
        res.status(404).json({message: 'No tournament found with this id'});
        return;
    }
    res.json(dbTournamentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;