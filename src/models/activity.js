const activity = (sequelize, DataTypes) => {
    const Activity = sequelize.define('activity', {
        activityId: {
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
        },
        activityDescription: {
            type: DataTypes.STRING(250),
        },
        activityDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        activityCreator: {
            type: DataTypes.STRING(50)
        }
    });

    Activity.associate = models => {
        Activity.belongsToMany(models.User, { 
            // as: 'Employee',
            through: {
                model: models.Activity_Attendance
            },
            foreignKey: 'activity_activityId',
        }); //onDelete: 'CASCADE'
        
    }
    return Activity;
}


export default activity;