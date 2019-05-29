const request_day = (sequelize, DataTypes) =>{
    const Request_Day = sequelize.define('request_day', {
        Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        requestStatus: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'pending',
        },
        DateApproved: {
            type: DataTypes.DATE
        },
    });

    Request_Day.associate = models => {
        Request_Day.belongsTo( models.User, {

        });
    }

    return Request_Day;
}

export default request_day;
