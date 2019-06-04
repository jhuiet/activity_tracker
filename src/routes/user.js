import { Router } from 'express';
import validator from 'validator';
const status = require('http-status');
const router = Router();

router.post('/', (req, res) => {
  return validateUserPost(req)
  .then(validated => {
    if(validated) return Promise.reject(validated);
    return req.context.models.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    })
  }).then(user => {
    return res.status(status.CREATED).json(user);
  }).catch(validError => res.status(status.BAD_REQUEST).json(validError));
//todo: validate password
});


router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.status(status.OK).json(users);
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);
  return res.status(status.OK).json(user);
});

router.put('/:userId', async (req, res, next) => {

  const user = await req.context.models.User.findByPk(req.params.userId);
  if (!user) {
    throw new Error('user not found in database');
  }

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.phoneNumbur = req.body.phoneNumber;
  user.role = req.body.role;

  const updatedUser = await user.save();
  // await user.save().catch();
  res.status(status.OK).json(updatedUser);
});

router.delete('/:userId', async (req, res, next) => {
  const user = await req.context.models.User.destroy({
    where: {
      id: req.params.userId
    }
  }).catch(next);
    // return res.status(status.));
  return res.status(status.OK).json(user);
});

function validateUserPost( req ){
  return Promise.resolve(syncValidateUserPost(req));
}

function syncValidateUserPost( req ) {
  if( !req.body.password ) return "Invalid password entered";
  if( !req.body.email || !validator.isEmail(req.body.email) ) return "invalid email entered";
  if( !req.body.firstName || !validator.isAlpha(req.body.firstName) ) return "invalid first name entered";
  if( !req.body.lastName || !validator.isAlpha(req.body.lastName) ) return "invalid last name entered";
  return req.context.models.User.findOne({ where: { email: req.body.email } })
    .then(model => {
      if(model) return "This email is already in use";
      return "";
    });
}

// router.get('/:userId/points', async (req, res) => {
//   const user = await req.context.models.User.findByPk(req.params.userId);
//   res.status(status.OK).json(user);
// });

export default router;



//todo: API