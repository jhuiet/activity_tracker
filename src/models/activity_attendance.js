const activity_attendance = (sequelize, DataTypes) => {
    const Activity_Attendance = sequelize.define('activity_attendance', {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
            // type: DataTypes.UUID,
            // defaultValue: DataTypes.UUIDV1,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        activityId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rsvp: {
            type: DataTypes.STRING,
            defaultValue: 'Not Attending'
        },
        attendance: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    });

    // Activity_Attendance.associate = models => {
    //     Activity_Attendance.belongsTo(models.)
    // }
    return Activity_Attendance;
}

export default activity_attendance;