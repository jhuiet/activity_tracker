const home_day = (sequelize, DataTypes) => {
    const Home_Day = sequelize.define('home_day', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date_requested: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pending", //taken/rejected/accepted/cancelled
        },

    });

    Home_Day.associate = models => {
        Home_Day.belongsTo(models.User);
    }
    return Home_Day;
}

export default home_day;