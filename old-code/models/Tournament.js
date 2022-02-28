const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Tournament extends Model {};

Tournament.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tournament_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        tournament_rules: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        prize_pool: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        signup_link: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        game_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'game',
                key: 'id'
            }
        }
    }, {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'tournament'
    }
);

module.exports = Tournament;
