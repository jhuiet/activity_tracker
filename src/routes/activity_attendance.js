import { Router } from 'express';
const status = require('http-status');
const router = Router();

router.get('/', async (req, res) => {
    const attendences = await req.context.models.Activity_Attendance.findAll();
    return res.status(status.OK).json(attendences);
});

router.get('/:attendanceId', async (req, res) => {
    const attendee = await req.context.models.Activity_Attendance.findByPk(req.params.attendanceId);
    return res.status(status.OK).json(attendee);
});

router.post('/', async (req, res, next) => {
    await req.context.models.Activity_Attendance.create({
        // id: req.body.id,
        userId: req.body.userId,
        activityId: req.body.activityId,
        rsvp: req.body.activityId,
        attendance: req.body.attendance
    }).then(() => {
        return res.status(status.CREATED).json(req.body);
    }).catch(next);
});

router.put('/:activityId', async (req, res, next) => {
    req.context.models.Activity_Attendance.update({
        rsvp: req.body.rsvp,
        attendance: req.body.attendance,
    }, {
        where: {
            id: req.params.activityId
        }
    }).then(() => {
        return res.status(status.OK).json(req.body);
    })
})
export default router;