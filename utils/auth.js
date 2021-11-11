const withAuth = (req, res, next) => {
    Boolean(!req.session.user_id) ? res.redirect('/login') : next();
};

module.exports = withAuth;