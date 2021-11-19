const express = require('express');
const path = require('path');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const passport = require('passport');
const hbs = exphbs.create({helpers});
require('./passport/passport');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SV_SECRET,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

//turn on routes
app.use(routes);

//turn on connection to db and server
sequelize.sync({force: true}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});