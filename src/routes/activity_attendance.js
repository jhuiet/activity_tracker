import { Router } from 'express';
const status = require('http-status');
const router = Router();
const rsvp = {
  yes: 'yes',
  no: 'no',
  maybe: 'maybe',
};

router.post('/:activityId/users/:userId', async (req, res, next) => {
  return validateAttendancePost(req).then(() => {
    req.context.models.Activity_Attendance.create({
      userId: req.params.userId,
      activityId: req.params.activityId,
      rsvp: req.body.rsvp,
    })
      .then(model => {
        if (!model)
          Promise.reject(
            'Error creating activity Attendance association in database'
          );
        return res.status(status.CREATED).json(model);
      })
      .catch(err => {
        return res.status(status.BAD_REQUEST).json(err)
      });
  });
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
        id: req.params.attendanceId,
      },
    }
  );
  return res.status(status.OK).json(activityAttendance);
});

function validateAttendancePost(req) {
  if (!req.body.rsvp || !rsvp[req.body.rsvp])
    return Promise.reject('Invalid Rsvp value entered');
  return req.context.Activity.findByPk(req.params.activityId)
    .then(model => {
      if (!model) return Promise.reject('Activity not found in database');
      return Promise.resolve();
    })
    .then(() => {
      req.context.User.findByPk(req.params.userId).then(model => {
        if (!model) return Promise.reject('User not found in database');
        return Promise.resolve();
      });
    });
}

export default router;
