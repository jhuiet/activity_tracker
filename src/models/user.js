const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            isEmail: true
        },
        phoneNumber: {
            type: DataTypes.STRING(13)
        },
        password: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "inactive" // or "user" or "admin"
        }
    });

    User.associate = models => {
        User.belongsToMany(models.Activity, {
            through: {
                model: models.Activity_Attendance
            },
            foreignKey: 'userId',
            otherKey: 'activityId',
            // constraints: false
        });
        User.belongsToMany(models.Tag, {
            through: {
                model: models.User_Tag
            },
            foreignKey: 'userId', 
        });
        User.hasMany(models.Comment, {
            //todo: properties?
        });
        User.hasMany(models.Request_Day, {
            //todo same
        });
        User.hasMany(models.Tag, {
            
        });
        User.hasMany(models.Home_Day, {

        });
        User.hasMany(models.Activity, {
            foreignKey: 'creatorId'
        });
    };
    return User;
};

export default user;

//example from sequelize website: http://docs.sequelizejs.com/manual/getting-started
// const Model = Sequelize.Model;
// class User extends Model {}
// User.init({
//   // attributes
//   firstName: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: Sequelize.STRING
//     // allowNull defaults to true
//   }
// }, {
//   sequelize,
//   modelName: 'user'
//   // options
// });

//also can be done using define:
// const User = sequelize.define('user', {
//     // attributes
//     firstName: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     lastName: {
//       type: Sequelize.STRING
//       // allowNull defaults to true
//     }
//   }, {
//     // options
//   });