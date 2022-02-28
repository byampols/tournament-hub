const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Download extends Model {};

Download.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        download_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        download_link: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        tournament_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tournament',
                key: 'id'
            }
        }
    }, {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'download'
    }
);

module.exports = Download;