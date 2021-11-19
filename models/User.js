const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        //define an id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        is_site_admin: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        is_tournament_admin: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { //length must be at least 4
                len: [4]
            }
        }
    },
    {
        //TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async afterCreate(newUserData) {
                if (newUserData.id === 1) {
                    newUserData.is_site_admin = true;
                    newUserData.is_tournament_admin = true;
                }
                return newUserData
            },
            async beforeUpdate(updatedUserData) {
                if (updatedUserData.changed('password')) {
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                }
                return updatedUserData;
            }
        },
        //pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        //don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        //don't pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored: true,
        //make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;