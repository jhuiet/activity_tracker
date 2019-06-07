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
            foreignKey: 'creatorId'         //when I defined this in both it set it to delete and update cascade. when I removed it here it only
        });                                 //had update cascade (on delete no action). when I removed it from the activity table It no longer
    };                                      //used creatorId as the FK and instead made a column named userId.
    return User;                            //do we want this:? if user is deleted then the activities they created will be deleted. if not remove here or set onDelete: SET NULL
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