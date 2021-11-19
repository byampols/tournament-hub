const withAuth = (req, res, next) => {
    Boolean(!req.user.id) ? res.redirect('/login') : next();
};

module.exports = withAuth;