const activity_attendance = (sequelize, DataTypes) => {
    const Activity_Attendance = sequelize.define('activity_attendance', {
        attendanceId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        user_userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        activity_activityId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        attendingStatus: {
            type: DataTypes.STRING,
            defaultValue: 'Not Attending'
        }
    });

    // Activity_Attendance.associate = models => {
    //     Activity_Attendance.belongsTo(models.)
    // }
    return Activity_Attendance;
}

export default activity_attendance;