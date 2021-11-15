const router = require('express').Router();
const { User, Tournament, Comment, Game, Download } = require('../../models');
const withAuth = require('../../utils/auth');

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
        is_tournament_admin: req.body.is_tournament_admin,
        password: req.body.password
    }).then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.is_tournament_admin = dbUserData.is_tournament_admin;
            req.session.loggedIn = true;
    
            res.json(dbUserData);
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    // expects {email: 'YYY@gmail.com', password: 'password1234'}
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
    
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//put /api/users/id
router.put('/:id', withAuth, (req, res) => {
    // expects {username: 'XXX', email: 'YYY@gmail.com', password: 'password1234'}
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

//delete /api/users/id
router.delete('/:id', withAuth, (req, res) => {
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