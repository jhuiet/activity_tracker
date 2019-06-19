import { Router } from 'express';
import { Authenticator } from './passwords';

const jwt = require('jsonwebtoken');
const status = require('http-status');
const router = Router();
const RSA_PRIVATE_KEY = 'thiskeysecretisveryEZSecure'; //fs.readFileSync('./demos/private.key');

router.post('/login', async (req, res) => {
  return validateEmailAndPassword(req)
    .then(user => {
      console.dir('yoy');
      const expiresAfter = 24 * 60 * 60; //24 hours
      const jwtBearerToken = jwt.sign(
        { id: user.Id, role: user.role, expiresAfter: expiresAfter },
        RSA_PRIVATE_KEY,{ algorithm: 'RS256'} //todo: why does this cause error???
        // {
        //   algorithm: 'RS256',
        //   expiresIn: expiresAfter,
        //   subject: user.Id
        // }
      );
      console.dir(jwtBearerToken);
      res.cookie('SESSIONID', jwtBearerToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + expiresAfter),
      });
      return res.status(status.OK).json();
      // return res.status(status.OK).send({ "user": user, "access_token": jwtBearerToken, "expires_in": expiresIn })
    })
    .catch(err => {
      return res.status(status.UNAUTHORIZED).json(err);
    });
});

async function validateEmailAndPassword(req) {
  const user = await req.context.models.User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return Promise.reject('Invalid email entered');
  if (
    !Authenticator.comparePass(
      req.body.password,
      user.password
    )
  ) {
    Promise.reject('Invalid password entered');
  }
  // if (user.role === 'inactive')
    // return Promise.reject('User has not been activated yet');
  return Promise.resolve(user);
}

export default router;

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