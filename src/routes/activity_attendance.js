import { Router } from 'express';
const status = require('http-status');
const router = Router();

router.post('/', async (req, res, next) => {
  await req.context.models.Activity_Attendance.create({
    // id: req.body.id, //auto incremented
    userId: req.body.userId,
    activityId: req.body.activityId,
    rsvp: req.body.activityId,
    attendance: req.body.attendance
  })
    .then(() => {
      return res.status(status.CREATED).json(req.body);
    })
    .catch(next);
});

router.get('/', async (req, res) => {
  const attendences = await req.context.models.Activity_Attendance.findAll();
  return res.status(status.OK).json(attendences);
});

router.get('/:attendanceId', async (req, res) => {
  const attendee = await req.context.models.Activity_Attendance.findByPk(
    req.params.attendanceId
  );
  return res.status(status.OK).json(attendee);
});

router.put('/:attendanceId', async (req, res) => {
  const activityAttendance = req.context.models.Activity_Attendance.findByPk(
    req.params.attendanceId
  );
  activityAttendance.rsvp = req.body.rsvp;
  activityAttendance.attendance = req.body.attendance;

  const updatedActivityAttendance = activityAttendance.save();
  return res.status(status.OK).json(updatedActivityAttendance);
});

router.delete('/:attendanceId', async (req, res) => {
  const activityAttendance = await req.context.models.Activity_Attendance.destroy(
    {
      where: {
        id: req.params.attendanceId
      }
    }
  );
  return res.status(status.OK).json(activityAttendance);
});

export default router;
