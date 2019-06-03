const user_tag = (sequelize, DataTypes) => {
    const User_Tag = sequelize.define('user_tag', {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
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