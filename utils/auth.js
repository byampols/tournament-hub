const withAuth = (req, res, next) => {
    Boolean(!req.isAuthenticated()) ? res.redirect('/login') : next();
};

module.exports = withAuth;