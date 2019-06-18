import Sequelize from 'sequelize';


/*
This file collects all the models, calls their association based methods, and creates a database
exports: models and database.
*/

//create the database in ./testDb
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './testDb'
});


//postgres database alternative
// const sequelize = new Sequelize(
//     process.env.DATABASE,
//     process.env.DATABASE_USERNAME,
//     process.env.DATABASE_PASSWORD,
//     {
//         dialect: 'postgres',
//     },
// );


const models = {
    User_Tag: sequelize.import('./user_tag'),
    Activity_Tag: sequelize.import('./activity_tag'),
    User: sequelize.import('./user'),
    Activity: sequelize.import('./activity'),
    Comment: sequelize.import('./comment'),
    Request_Day: sequelize.import('./request_day'),
    Tag: sequelize.import('./tag'),
    Home_Day: sequelize.import('./home_day'),
    Activity_Attendance: sequelize.import('./activity_attendance'),

};

//call the associate method of each model, building db relations.
Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

//database
export {
    sequelize
};

export default models;