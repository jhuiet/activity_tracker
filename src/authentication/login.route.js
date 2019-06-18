import { Router } from 'express';
import { Authenticator } from './passwords';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import validator from 'validator';

// import * as fs from "fs";

const status = require('http-status');
const router = Router();
const RSA_PRIVATE_KEY = "thiskeysecretisveryEZSecure";//fs.readFileSync('./demos/private.key');

// router.post('/register', (req, res) => {
//   validateRegistration(req).then( () => {

//   }).catch( err => {
//     return res.status(status.BAD_REQUEST).json(err);
//   })
  
//   res.status(200).send({ access_token:  '' });
//   return res.status(status.BAD_REQUEST).json("email already in use");
// });

// function validateRegistration( req ) {
//   const passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
//   if( !validator.isEmail(req.body.email) ) return Promise.reject('Invalid email.');
//   if( req.context.models.user.findOne({
//     where: {
//       email: req.body.email,
//     }
//   })) return Promise.reject('Email already in use');
//   if( !passRegex.test(req.body.password) ) return Promise.reject('Password must be at least 8 characters, and contain a number, uppercase, and lowercase value');
//   return Promise.resolve();
// }

//ctrl-shift-g runs screen reader on edge

router.post('/login', async (req, res) => {
  return validateEmailAndPassword(req).then(user => {
    const  expiresIn  =  24  *  60  *  60; //24 hours
    const jwtBearerToken = jwt.sign({ id: user.Id}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expriesIn: expiresIn,
        subject: userId
    })
    return res.status(status.OK).send({ "user": user, "access_token": jwtBearerToken, "expires_in": expiresIn})
  })
  .catch(err => {
    return res.status(status.UNAUTHORIZED).json(err);
  });
});

function validateEmailAndPassword(req) {
  const user = req.context.models.User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return Promise.reject('Invalid email entered');
  if (!Authenticator.comparePass(Authenticator.hashPass(req.body.password), user.password)) {
    Promise.reject('Invalid password entered');
  }
  return Promise.resolve(user);
}
