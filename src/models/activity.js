const activity = (sequelize, DataTypes) => {
    const Activity = sequelize.define('activity', {
        Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        activityName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        activityLocation: {
            type: DataTypes.STRING(80),
            allowNull: false,
            defaultValue: 'Seven Hills Park Campus',
        },
        activityDescription: {
            type: DataTypes.STRING(250),
        },
        activityDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        activityCreator: {
            type: DataTypes.STRING(50),  //todoDan: fk or naw?
            allowNull: false,
        },
        givesPoints: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        }
    });

    Activity.associate = models => {
        Activity.belongsToMany(models.User, {
            through: {
                model: models.Activity_Attendance
            },
            foreignKey: 'activityId', //todo: was activity_activityId before in other model
        }); //onDelete: 'CASCADE'
        
    }
    return Activity;
}


export default activity;