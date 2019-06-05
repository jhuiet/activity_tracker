import { Router } from 'express';
import validator from 'validator';
import { promises } from 'fs';
const status = require('http-status');
const router = Router();

router.post('/', async (req, res) => {
  return validateUserPost( req )
  .then( validated => {
    if( validated ) return Promise.reject( validated );
    return req.context.models.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    })
  }).then( user => {
    if( !user ) Promise.reject( 'Error creating user in database' );
    return res.status(status.CREATED).json(user);
  }).catch( validationError => res.status(status.BAD_REQUEST).json(validationError) );
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

//todo: finish once done with workfromhomedays and activity_attendance
router.get('/points', async (req, res) => {
  const users = await req.context.models.User.findAll().then( users => {
    const pointsArray = new Array(users.length);
    
  })
  return res.status(status.OK).json(users);
});

router.put('/:userId', async (req, res, next) => {
    return validateUserPut(req)
      .then(validated => {
        if( validated ) return promises.reject(validated);
          const user = req.context.models.User.findByPk(req.params.userId);
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          user.email = req.body.email;
          user.password = req.body.password;
          if( req.body.phoneNumber ) user.phoneNumbur = req.body.phoneNumber;
          user.role = req.body.role;
          const updatedUser = user.save().catch(err => {throw new Error(`could not update the database at this time: ${err}`)} ); //todo - dan: is this appropriate: do we need await?
          return updatedUser;
      }).then( user => {
        return res.status(status.OK).json(user);
      }
      ).catch( validationError => res.status(status.BAD_REQUEST).json(validationError))
});

router.delete('/:userId', async (req, res, next) => {
  const user = await req.context.models.User.destroy({
    where: {
      id: req.params.userId
    }
  }).then( rows => {
    if( !rows ) {
      return Promise.reject( 'User Id not found in database' ) };
    return res.status(status.OK).json(user);
  }).catch(err => { return res.status(status.BAD_REQUEST).json(err)} );
});

function validateUserPost( req ) {
  return Promise.resolve(syncValidateUserPost(req));
}

function syncValidateUserPost( req ) {
  if( !req.body.password ) return "Invalid password entered";
  if( !req.body.email || !validator.isEmail(req.body.email) ) return "Invalid email entered";
  if( !req.body.firstName || !validator.isAlpha(req.body.firstName) ) return "Invalid first name entered";
  if( !req.body.lastName || !validator.isAlpha(req.body.lastName) ) return "Invalid last name entered";
  return req.context.models.User.findOne({ where: { email: req.body.email } })
    .then(model => {
      if(model) return "This email is already in use";
      return "";
    });
}

function validateUserPut( req ){
  return Promise.resolve(syncValidateUserPut(req));
}

function syncValidateUserPut( req ) {
  if( !req.body.password ) return "Invalid password entered";
  if( !req.body.email || !validator.isEmail(req.body.email) ) return "Invalid email entered";
  if( !req.body.firstName || !validator.isAlpha(req.body.firstName) ) return "Invalid first name entered";
  if( !req.body.lastName || !validator.isAlpha(req.body.lastName) ) return "Invalid last name entered";
  if( req.body.phoneNumber ) {
    if ( !validator.isMobilePhone(req.body.phoneNumber) ) return "Invalid phone number"
  }
  return req.context.models.User.findByPk(req.params.userId)
    .then(model => {
      if(!model) return "User not found in database"
      return "";
    });
}
// router.get('/:userId/points', async (req, res) => {
//   const user = await req.context.models.User.findByPk(req.params.userId);
//   res.status(status.OK).json(user);
// });

export default router;



//todo: API