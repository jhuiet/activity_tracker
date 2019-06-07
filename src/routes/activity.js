import { Router } from 'express';
import validator from 'validator';
const status = require('http-status');
const router = Router();

router.post('/', async (req, res) => {
  return validateActivityPost(req)
    .then(() => {
      const activityDescription = req.body.description || ''; //create an activity based on the body
      return req.context.models.Activity.create({
        name: req.body.name,
        location: req.body.location,
        description: activityDescription,
        dateTime: req.body.dateTime,
        creatorId: req.body.creatorId,
      }); //todo: create a association instance for activity_attendance with the userId of the creator
    })
    .then(activity => {
      if (!activity) Promise.reject('Error creating activity in database'); //error if activity was not created successfuly. todo: return another error like 409 with res.stats...??
      return res.status(status.CREATED).json(activity);
    })
    .catch(err => res.status(status.BAD_REQUEST).json(err));
});

router.get('/', async (req, res) => {
  const activities = await req.context.models.Activity.findAll();
  return res.status(status.OK).json(activities);
});

router.get('/:activityId', async (req, res) => {
  return req.context.models.Activity.findByPk(req.params.activityId).then(
    activity => {
      if (!activity)
        return res
          .status(status.BAD_REQUEST)
          .json('Invalid Activity Id in path');
      return res.status(status.OK).json(activity);
    }
  );
});

router.put('/:activityId', async (req, res) => {
  return validateActivityPut(req)
    .then(() => {
      const activityDescription = req.body.description || '';
      return req.context.models.Activity.findByPk(req.params.activityId).then(
        activity => {
          activity.name = req.body.name;
          activity.description = activityDescription;
          activity.dateTime = req.body.dateTime;
          activity.creatorId = req.body.creatorId;
          activity.givesPoints = req.body.givesPoints;
          activity.cancelled = req.body.cancelled;
          return activity.save().catch(err => {
            Promise.reject('Could not save activity to the database');
          });
        }
      );
    })
    .then(updatedActivity => {
      return res.status(status.OK).json(updatedActivity);
    })
    .catch(validationError => {
      return res.status(status.BAD_REQUEST).json(validationError);
    });
});

router.delete('/:activityId', async (req, res) => {
  const activity = req.context.models.Activity.destroy({
    where: {
      id: req.params.activityId,
    },
  })
    .then(rows => {
      if (!rows) {
        return Promise.reject('Activity Id not found in database');
      }
      return res.status(status.OK).json(activity);
    })
    .catch(err => {
      return res.status(status.BAD_REQUEST).json(err);
    });
});


function validateActivityPut(req) {
  // if( req.body.description ) { //todo: errer check description??

  if (!req.body.name) //|| req.body.name.match(/^[\w\-\,\s]+$/) === null)
    return Promise.reject('Invalid activity name');
  if (!req.body.location) //|| !validator.isLength(req.body.location, 6))
    return Promise.reject('Invalid activity location');
  if (req.body.cancelled == null || typeof req.body.cancelled !== 'boolean')
    return Promise.reject('Invalid activity cancelled property');
  if (
    !req.body.dateTime ||
    !Date.parse(req.body.dateTime) ||
    validator.isBefore(req.body.dateTime.toString(), new Date().toString())
  )
    return Promise.reject('Invalid activity date');
  if (req.body.givesPoints == null || typeof req.body.givesPoints !== 'boolean')
    return Promise.reject('Invalid activity givesPoints');
  return req.context.models.User.findByPk(req.body.creatorId)
    .then(model => {
      if (!model) return Promise.reject('Invalid creator Id');
      return Promise.resolve();
    })
    .then(() => {
      return req.context.models.Activity.findByPk(req.params.activityId).then(
        activity => {
          if (!activity) return Promise.reject('Invalid Activity Id in path');
          return Promise.resolve();
        }
      );
    });
}



function validateActivityPost(req) {
  // console.dir(req.body.creator);
  // if( req.body.description ) { //todo: errer check description??
  if (!req.body.name) // || req.body.name.match(/^[\w\-\s]+$/) === null)
    return Promise.reject('Invalid activity name');
  if (!req.body.location) // || !validator.isLength(req.body.location, 6))
    return Promise.reject('Invalid activity location');
  if (
    !req.body.dateTime ||
    !Date.parse(req.body.dateTime) ||
    validator.isBefore(req.body.dateTime.toString(), new Date().toString())
  )
    return Promise.reject('Invalid activity date');
  return req.context.models.User.findByPk(req.body.creatorId).then(model => {
    if (!model) return Promise.reject('Invalid creator Id');
    return Promise.resolve();
  });
}

// Activity Attendance:
const rsvp = {
  yes: 'yes',
  no: 'no',
  maybe: 'maybe',
};

router.post('/:activityId/users/:userId', (req, res) => {
  return validateAttendancePost(req)
    .then(() => {
      req.context.models.Activity_Attendance.create({
        userId: req.params.userId,
        activityId: req.params.activityId,
        rsvp: req.body.rsvp,
      }).then(model => {
        if (!model)
          throw new Error(
            'Error creating activity Attendance association in database'
          );
        return res.status(status.CREATED).json(model);
      });
    })
    .catch(err => {
      return res.status(status.BAD_REQUEST).json(err);
    });
});

router.put('/:activityId/users/:userId', (req, res) => {
  return validateAttendancePut(req)
    .then(() => {
      return req.context.models.Activity_Attendance.findOne({
        where: {
          userId: req.params.userId,
          activityId: req.params.activityId,
        },
      })
        .then(model => {
          if (!model) return Promise.reject('That user has not signed up for that activity yet');
          return model;
        })
        .then(model => {
          (model.attendance = req.body.attendance),
            (model.rsvp = req.body.attendance);
          return model.save().catch(err => {
            Promise.reject(
              'Could not save activity attendance to the database'
            );
          });
        });
    })
    .then(updatedModel => {
      return res.status(status.OK).json(updatedModel);
    })
    .catch(validationError => {
      return res.status(status.BAD_REQUEST).json(validationError);
    });
});

router.get('/:activityId/users', (req, res) => {
  return req.context.models.Activity_Attendance.findAll({
    where: {
      activityId: req.params.activityId,
    },
  }).then(attendees => {
    if (!attendees)
      return res
        .status(status.BAD_REQUEST)
        .json(
          `No activity signups exist for activityId ${req.params.activityId}`
        );
    return res.status(status.OK).json(attendees);
  });
});

router.get('/:activityId/users/:userId', (req, res) => {
  return req.context.models.Activity_Attendance.findOne({
    where: {
      userId: req.params.userId,
      activityId: req.params.activityId,
    },
  })
    .then(attendee => {
      if (!attendee)
        Promise.reject(
          `No user data found with activityId ${
            req.params.activityId
          } and userId ${req.params.userId}`
        );
      return res.status(status.OK).json(attendee);
    })
    .catch(err => {
      return res.status(status.BAD_REQUEST).json(err);
    });
});

function validateAttendancePost(req) {
  if (!req.body.rsvp || !rsvp[req.body.rsvp])
    return Promise.reject(
      'Invalid Rsvp value entered, please use: [yes, no, maybe]'
    );
  return req.context.models.Activity.findByPk(req.params.activityId)
    .then(model => {
      if (!model) return Promise.reject('Activity not found in database');
      return Promise.resolve();
    })
    .then(() => {
      return req.context.models.User.findByPk(req.params.userId).then(model => {
        if (!model) return Promise.reject('User not found in database');
        return Promise.resolve();
      });
    })
    .then(() => {
      return req.context.models.Activity_Attendance.findOne({
        where: {
          activityId: req.params.activityId,
          userId: req.params.userId,
        },
      }).then(attendee => {
        if (attendee)
          return Promise.reject(
            'That user has already signed up for that activity'
          );
        return Promise.resolve();
      });
    });
}

function validateAttendancePut(req) {
  if (!req.body.rsvp || !rsvp[req.body.rsvp])
    return Promise.reject(
      'Invalid Rsvp value entered, please use: [yes, no, maybe]'
    );
  if (req.body.attendance == null || typeof req.body.attendance !== 'boolean')
    return Promise.reject('Invalid Attendance value entered');
  return req.context.models.Activity.findByPk(req.params.activityId)
    .then(model => {
      if (!model) return Promise.reject('Activity not found in database');
      return Promise.resolve();
    })
    .then(() => {
      return req.context.models.User.findByPk(req.params.userId).then(model => {
        if (!model) return Promise.reject('User not found in database');
        return Promise.resolve();
      });
    });
  // .then(() => {
  //   return req.context.models.Activity_Attendance.findOne({
  //     where: {
  //       activityId: req.params.activityId,
  //       userId: req.params.userId,
  //     },
  //   }).then(attendee => {
  //     if (!attendee)
  //       return Promise.reject(
  //         'That user has not signed up for that activity yet'
  //       );
  //     return Promise.resolve();
  //   });
  // });
}
export default router;
