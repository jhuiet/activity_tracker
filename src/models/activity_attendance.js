const activity_attendance = (sequelize, DataTypes) => {
    const Activity_Attendance = sequelize.define('activity_attendance', {
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

    return Activity_Attendance;
}

export default activity_attendance;