import { Router } from 'express';
const status = require('http-status');
const router = Router();

router.post('/', async (req, res) => {
  const user = await req.context.models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    // points: req.body.points,
    // phoneNumbur: req.body.phoneNumber
  });
  return res.status(status.CREATED).json(user);
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



// router.get('/:userId/points', async (req, res) => {
//   const user = await req.context.models.User.findByPk(req.params.userId);
//   res.status(status.OK).json(user);
// });

export default router;



//todo: API