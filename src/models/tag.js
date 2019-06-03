const tag = (sequelize, DataTypes) => {
    const Tag = sequelize.define('tag', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            // type: DataTypes.UUID,
            // defaultValue: DataTypes.UUIDV1,
            // primaryKey: true,
        },
        // userId: {
        //     type: DataTypes.INTEGER,
        // },
        tag: {
            type: String,
            allowNull: false
        }
    });

    Tag.associate = models => {
        Tag.belongsToMany(models.User, {
            through: {
                model: models.User_Tag
            },
            foreignKey: 'tagId', 
        });

        Tag.belongsToMany(models.Activity, {
            through: {
                model: models.Activity_Tag
            },
            foreignKey: 'tagId', 
        });
    }
    return Tag;
}

export default tag;