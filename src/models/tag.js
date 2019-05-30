const tag = (sequelize, DataTypes) => {
    const Tag = sequelize.define('tag', {
        Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
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
        Tag.belongsTo(models.User, {
            //todo: other options
        })
    }
    return Tag;
}

export default tag;