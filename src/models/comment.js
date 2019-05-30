const comment = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        // activityId: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        // },
        comment: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
    });

    Comment.associate = models => {
        Comment.belongsTo(models.User, {
            //todo: properties?
        });
        Comment.belongsTo(models.Activity, {
             //todo: properties?
        });
    };

    return Comment;
}

export default comment;