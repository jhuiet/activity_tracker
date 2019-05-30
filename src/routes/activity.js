import { Router } from 'express';
const status = require('http-status');
const router = Router();

router.get('/', async (req, res) => {
    const activities = await req.context.models.Activity.findAll();
    return res.status(status.OK).json(activities);
});

router.get('/:activityId', async (req, res) => {
    const activity = await req.context.models.Activity.findByPk(req.params.activityId);
    return res.status(status.OK).json(activity);
});

router.post('/', async (req, res) => {
    const activity = await req.context.models.Activity.create({
        Id: req.body.activityId,
        activityName: req.body.activityName,
        activityLocation: req.body.activityLocation,
        activityDescription: req.body.activityDescription,
        activityDateTime: req.body.activityDateTime,
        recurring: req.body.recurring,
        activityCreator: req.body.activityCreator,
        givesPoints: req.body.givesPoints
    });
    return res.status(status.CREATED).json(activity);
});

router.put('/:activityId', async (req, res) => {
    const activity = await req.context.models.Activity.update({
        Id: req.body.activityId,
        activityName: req.body.activityName,
        activityLocation: req.body.activityLocation,
        activityDescription: req.body.activityDescription,
        activityDateTime: req.body.activityDateTime,
        recurring: req.body.recurring,
        activityCreator: req.body.activityCreator,
        givesPoints: req.body.givesPoints   
    }, {
        where: {
            id: req.params.activityId,
        }
    });
    return res.status(status.OK).json(activity);
});

router.delete('/:activityId', async (req, res) => {
    const activity = await req.context.models.Activity.destroy({
        where: {
            id: req.params.activityId
        }
    });
    return res.status(status.OK).json(activity);
});


export default router;