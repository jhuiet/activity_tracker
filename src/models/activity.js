const activity = (sequelize, DataTypes) => {
    const Activity = sequelize.define('activity', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING(80),
            allowNull: false,
            defaultValue: 'Seven Hills Park Campus',
        },
        description: {
            type: DataTypes.STRING(250),
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        creatorId: {
            type: DataTypes.INTEGER,  //todo: create a fk restraint with user
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
            foreignKey: 'activityId',
            otherKey: 'userId'
        });
        Activity.belongsToMany(models.Tag, {
            through: {
                model: models.Activity_Tag
            },
            foreignKey: 'activityId',
        });
        Activity.belongsTo(models.User);
        //onDelete: 'CASCADE'


    }
    return Activity;
}


export default activity;