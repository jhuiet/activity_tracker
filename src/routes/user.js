import { Router } from 'express';
const status = require('http-status');
const router = Router();

router.post('/', async (req, res) => {
  const user = await req.context.models.User.create({
    Id: req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    points: req.body.points
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

router.put('/:userId', async (req, res) => {

  //todo: req.body.points??
  const user = await req.context.models.User.update({
    points: req.body.points,
  }, {
    where: {
      id: req.params.userId
    }
  });
  res.status(status.OK).json(user);
})

//request body has poinst: #
router.put('/:userId', async (req, res) => {
  const user = await req.context.model.User.update({
    points: req.body.points }, {
      where: {
        id: req.params.userId
      }
  });
  res.status(status.OK).json(user);
  // req.context.model.User.update({
  //   points: req.body.points }, {  //or req.params.points
  //     where: {
  //       id: req.params.userId
  //     }
  // }).then(() => {
  //   return user;
  // })
});



router.get('/:userId/points', async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);
  res.status(status.OK).json(user);
});

export default router;