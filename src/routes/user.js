import { Router } from 'express';
const status = require('http-status');
const router = Router();

router.post('/', async (req, res) => {
  const user = await req.context.models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    points: req.body.points,
    phoneNumbur: req.body.phoneNumber,
  });
  return res.status(status.CREATED).json(user);
});

router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.status(status.OK).json(users);
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
  );
  return res.status(status.OK).json(user);
});

router.delete('/:userId', async (req, res) => {
  const user = await req.context.models.User.destroy({
    where: {
      id: req.params.userId
    }
  });
  return res.status(status.OK).json(user);
});

router.put('/:userId', async (req, res, next) => {
  req.context.models.User.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumbur: req.body.phoneNumber,
    points: req.body.points
  }, {
    returning: true,
    where: {
      id: req.params.userId
    }
  }).then(function( result ) {
    res.status(status.OK).json(req.body)
  })
  .catch(next);
});





router.get('/:userId/points', async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);
  res.status(status.OK).json(user);
});

export default router;