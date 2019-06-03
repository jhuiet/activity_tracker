const activity_tag = (sequelize, DataTypes) => {
    const Activity_Tag = sequelize.define('activity_tag', {
        activityId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tagId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Activity_Tag;
}

export default activity_tag;