const user_tag = (sequelize, DataTypes) => {
    const User_Tag = sequelize.define('user_tag', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tagId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return User_Tag;
}

export default user_tag;