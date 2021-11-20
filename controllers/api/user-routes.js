const router = require('express').Router();
const { User, Tournament, Comment, Game, Download } = require('../../models');
const withAuth = require('../../utils/auth');
const passport = require('passport');

//get api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    }).then(dbUserData => res.json(dbUserData)).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get /api.users/id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password'],
            include: [
                {
                    model: Tournament,
                    attributes: ['id', 'title', 'tournament_description', 'tournament_rules', 'start_date', 'end_date', 'prize_pool', 'signup_link','created_at'],
                    include: [
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
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Tournament,
                        attributes: ['title']
                    }
                }
            ]
        },
        where: {
            id: req.params.id
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//post /api/users
router.post('/', (req, res) => {
    // expects {username: 'XXX', email: 'YYY@gmail.com', password: 'password1234', is_tournament_admin: true}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        is_tournament_admin: req.body.is_tournament_admin,
        is_site_admin: req.body.is_site_admin
    }).then(dbUserData => {
        req.login(dbUserData, function(err) {
            if (err) { return next(err); }
            res.status(200).json({status: 'ok'});
          });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res, next) => {
    // expects {email: 'YYY@gmail.com', password: 'password1234'}
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }

        if (!user) {
            return res.json({status: 'error', message: info.message});
        }

        req.login(user, function(err) {
            if (err) { return next(err); }
            res.status(200).json({status: 'ok'});
        });
    })(req, res, next);
});

router.post('/logout', withAuth, (req, res, next) => {
    req.logout();
    req.session.destroy(err => {
        if (err) return next(err);
        return res.send({authenticated: req.isAuthenticated()})
    });
});

//put /api/users/id
router.put('/:id', withAuth, (req, res) => {
    // expects {username: 'XXX', email: 'YYY@gmail.com', password: 'password1234', isTournamentAdmin: true}
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Update Admin Status
router.put(`/${process.env.SV_ADMIN}/:id`, (req, res) => {
    User.update({
        is_tournament_admin: req.body.is_tournament_admin,
        is_site_admin: req.body.is_site_admin
    }, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//delete /api/users/id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;