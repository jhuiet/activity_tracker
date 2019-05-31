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
        Tag.belongsTo(models.User, {
            //todo: other options
        })
    }
    return Tag;
}

export default tag;