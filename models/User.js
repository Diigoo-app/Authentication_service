"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            date_of_birth: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            gender: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            interests: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,

            },
            full_name:{
                type: DataTypes.STRING,
                allowNull: false,



            }
        },
        {
            sequelize,
            modelName: "User",
            tableName: "user",
            underscored: true,
            paranoid: true,
            timestamps: true,
            updatedAt: "updated_at",
            deletedAt: "deleted_at",
        }
    );

    return User;
};
