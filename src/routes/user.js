import { Router } from 'express';
import validator from 'validator';
import Sequelize from 'sequelize';
import { authentication, Authenticator } from '../authentication/passwords';
const status = require('http-status');
const router = Router();
const Op = Sequelize.Op;
const userRoles = {
  inactive: 'inactive',
  user: 'user',
  admin: 'admin'
};

router.post('/', async (req, res) => {
  return validateUserPost(req)
    .then(() => {
      let hashedPassword = Authenticator.hashPass(req.body.password);
      return req.context.models.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
      });
    })
    .then(user => {
      if (!user) Promise.reject('Error creating user in database');
      return res.status(status.CREATED).json(user);
    })
    .catch(validationError =>{
      res.status(status.BAD_REQUEST).json(validationError)
    });
});

router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.status(status.OK).json(users);
});

router.get('/:userId', async (req, res) => {
  return req.context.models.User.findByPk(req.params.userId).then( user => {
    if(!user) return res.status(status.BAD_REQUEST).json('Invalid user id');
    return res.status(status.CREATED).json(user);
  });
});

//todo: finish once done with workfromhomedays and activity_attendance
router.get('/points', async (req, res) => {
  const users = await req.context.models.User.findAll().then(users => {
    const pointsArray = new Array(users.length);
  });
  return res.status(status.OK).json(users);
});

router.put('/:userId', async (req, res, next) => {
  return validateUserPut(req)
      //todo: add regex .matches instead of alphanumeric and anything else with spaces
    .then(() => {
      return req.context.models.User.findByPk(req.params.userId).then(user => {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        if (req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;
        user.role = req.body.role;
        return user.save().catch(err => {
          Promise.reject(`could not update the database at this time: ${err}`);
        });
      });
    })
    .then(updatedUser => {
      return res.status(status.OK).json(updatedUser);
    })
    .catch(validationError => {
      return res.status(status.BAD_REQUEST).json(validationError)
    }
    );
});

router.delete('/:userId', async (req, res, next) => {
  const user = await req.context.models.User.destroy({
    where: {
      id: req.params.userId
    }
  })
    .then(rows => {
      if (!rows) {
        return Promise.reject('User Id not found in database');
      }
      return res.status(status.OK).json(user);
    })
    .catch(err => {
      return res.status(status.BAD_REQUEST).json(err);
    });
});

function validateUserPost(req) {
  const passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  if (!req.body.password || !passRegex.test(req.body.password) ) return Promise.reject('Password must be at least 8 characters, and contain a number, uppercase, and lowercase value');
  if (!req.body.email || !validator.isEmail(req.body.email))
    return Promise.reject('Invalid email entered');
  if (!req.body.firstName || !validator.isAlpha(req.body.firstName))
    return Promise.reject('Invalid first name entered');
  if (!req.body.lastName || !validator.isAlpha(req.body.lastName))
    return Promise.reject('Invalid last name entered');
  return req.context.models.User.findOne({
    where: { email: req.body.email }
  }).then(model => {
    if (model) return Promise.reject('This email is already in use');
    Promise.resolve();
  });
}


function validateUserPut(req) {
  if (!req.body.password) return Promise.reject('Invalid password entered');
  if (!req.body.email || !validator.isEmail(req.body.email))
    return Promise.reject('Invalid email entered');
  if (!req.body.firstName || !validator.isAlpha(req.body.firstName))
    return Promise.reject('Invalid first name entered');
  if (!req.body.lastName || !validator.isAlpha(req.body.lastName))
    return Promise.reject('Invalid last name entered');
  if (!req.body.role || !userRoles[req.body.role])
    return Promise.reject('Invalid role entered');
  if (req.body.phoneNumber) {
    if (!validator.isMobilePhone(req.body.phoneNumber))
      return Promise.reject('Invalid phone number');
  }
  return req.context.models.User.findByPk(req.params.userId).then(model => {
    if (!model) return Promise.reject('User not found in database');
    Promise.resolve();
  }).then(() => {
    return req.context.models.User.findOne({
    where: {
      id: {
        [Op.ne]: req.params.userId
      },
      email: req.body.email
    }
    }).then(model => {
        if (model) return Promise.reject('This email is already in use');
        Promise.resolve();
      });
    });
}
// router.get('/:userId/points', async (req, res) => {
//   const user = await req.context.models.User.findByPk(req.params.userId);
//   res.status(status.OK).json(user);
// });

export default router;


