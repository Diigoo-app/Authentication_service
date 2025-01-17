"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Otp extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Otp.init(
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            otp: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            unique_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4, // Automatically generate a UUIDv4
            },
            exipres_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Otp",
            tableName: "otp",
            underscored: true,
            paranoid: true,
            timestamps: true,
            updatedAt: "updated_at",
            deletedAt: "deleted_at",
        }
    );

    return Otp;
};
