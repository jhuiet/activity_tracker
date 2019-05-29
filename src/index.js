import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import models, {
    sequelize
} from './models';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(async (req, res, next) => {
    req.context = {
        models,
    };
    next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);




var whitelist = ['http://example1.com', 'http://example2.com'];

// var corsOptions = {
//     origin: 'http://example origin',
//     optionsSuccessStatus: 200
// }
var corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) { //|| !origin add this to allow rest tools and server to server requests!
            callback(null, true);
        } else {
            callback(new Error('Not Allowed: CORS'));
        }
    }
}




app.get('/products/:id', cors(corsOptions), function (req, res, next) {
    res.json({
        msg: 'This is CORS-enabled for only example.com.'
    })
});
//todo: look into implementing migration instead of synch.

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Example app listening on port ${process.env.PORT}!`);
    });
});