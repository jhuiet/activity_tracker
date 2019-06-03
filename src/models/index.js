import Sequelize from 'sequelize';

// const sequelize = new Sequelize(
//     process.env.DATABASE,
//     process.env.DATABASE_USERNAME,
//     process.env.DATABASE_PASSWORD,
//     {
//         dialect: 'postgres',
//     },
// );

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './testDb'
  });



const models = {
    Activity_Attendance: sequelize.import('./activity_attendance'),
    User_Tag: sequelize.import('./user_tag'),
    Activity_Tag: sequelize.import('./activity_tag'),
    User: sequelize.import('./user'),
    Activity: sequelize.import('./activity'),
    Comment: sequelize.import('./comment'),
    Request_Day: sequelize.import('./request_day'),
    Tag: sequelize.import('./tag'),
    Home_Day: sequelize.import('./home_day'),
};

//call the associate method of each model, building db relations.
Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export { sequelize };

export default models;