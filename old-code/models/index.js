const User = require('./User');
const Tournament = require('./Tournament');
const Comment = require('./Comment');
const Game = require('./Game');
const Download = require('./Download');

User.hasMany(Tournament, {
    foreignKey: 'user_id'
});

Tournament.belongsTo(User, {
    foreignKey: 'user_id'
});

Game.hasMany(Tournament, {
    foreignKey: 'game_id'
});

Tournament.belongsTo(Game, {
    foreignKey: 'game_id'
});

Download.belongsTo(Tournament, {
    foreignKey: 'tournament_id'
});

Tournament.hasMany(Download, {
    foreignKey: 'tournament_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Tournament, {
    foreignKey: 'tournament_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Tournament.hasMany(Comment, {
    foreignKey: 'tournament_id'
});


module.exports = { User, Tournament, Comment, Game, Download };