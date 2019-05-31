import { Router } from 'express';
const status = require('http-status');
const router = Router();


router.post('/', async (req, res) => {
    const activity = await req.context.models.Activity.create({
        // id: req.body.id,
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        dateTime: req.body.dateTime,
        recurring: req.body.recurring,
        creator: req.body.creator,
        givesPoints: req.body.givesPoints
    });
    return res.status(status.CREATED).json(activity);
});


router.get('/', async (req, res) => {
    const activities = await req.context.models.Activity.findAll();
    return res.status(status.OK).json(activities);
});

router.get('/:activityId', async (req, res) => {
    const activity = await req.context.models.Activity.findByPk(req.params.activityId);
    return res.status(status.OK).json(activity);
});


router.put('/:activityId', async (req, res) => {
    const activity = await req.context.models.Activity.findByPk(req.params.activityId);
    if (!activity) {
        throw new Error('activity not found in database');
    }
    activity.name = req.body.name;
    activity.description = req.body.description;
    activity.dateTime = req.body.dateTime;
    activity.recurring = req.body.recurring;
    activity.creator = req.body.creator;
    activity.givesPoints = req.body.givesPoints;
    const updatedActivity = await activity.save();
    return res.status(status.OK).json(updatedActivity);
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