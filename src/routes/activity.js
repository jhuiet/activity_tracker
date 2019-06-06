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
      });
    })
    .then(activity => {
      if (!activity) Promise.reject('Error creating user in database'); //error if activity was not created successfuly
      return res.status(status.CREATED).json(activity);
    })
    .catch(err => res.status(status.BAD_REQUEST).json(err));
});

router.get('/', async (req, res) => {
  const activities = await req.context.models.Activity.findAll();
  return res.status(status.OK).json(activities);
});

router.get('/:activityId', async (req, res) => {
  const activity = await req.context.models.Activity.findByPk(
    req.params.activityId
  );
  return res.status(status.OK).json(activity);
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
    .catch(validationError =>
      res.status(status.BAD_REQUEST).json(validationError)
    );
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

// function validateActivityPut( req ) {
//     return Promise.resolve(syncvalidateActivityPut( req ));
// }

function validateActivityPut(req) {
  // if( req.body.description ) { //todo: errer check description??

  if (!req.body.name || req.body.name.match(/^[\w\-\s]+$/) === null)
    return Promise.reject('Invalid activity name');
  if (!req.body.location || !validator.isLength(req.body.location, 6))
    return Promise.reject('Invalid activity location');
  if (req.body.cancelled == null || typeof req.body.cancelled !== "boolean")
    return Promise.reject('Invalid activity cancelled property');
  if (
    !req.body.dateTime || !Date.parse(req.body.dateTime) ||
    validator.isBefore(req.body.dateTime.toString(), new Date().toString())
  )
    return Promise.reject('Invalid activity date');
  if (req.body.givesPoints == null || typeof req.body.givesPoints !== "boolean")
    return Promise.reject('Invalid activity givesPoints');
  return req.context.models.User.findByPk(req.body.creatorId).then(model => {
    if (!model) return Promise.reject('Invalid creator Id');
    return Promise.resolve();
  }).then(() => {
      return req.context.models.Activity.findByPk(req.params.activityId).then(activity => {
          if(!activity) return Promise.reject('Invalid Activity Id in path');
          return Promise.resolve();
      })
  });
}

// function validateActivityPost( req ) {
//     return Promise.resolve(syncvalidateActivityPost( req ));
// }

function validateActivityPost(req) {
  // console.dir(req.body.creator);
  // if( req.body.description ) { //todo: errer check description??
  if (!req.body.name || req.body.name.match(/^[\w\-\s]+$/) === null)
    return Promise.reject('Invalid activity name');
  if (!req.body.location || !validator.isLength(req.body.location, 6))
    return Promise.reject('Invalid activity location');
  if (
    !req.body.dateTime || !Date.parse(req.body.dateTime) ||
    validator.isBefore(req.body.dateTime.toString(), new Date().toString())
  )
    return Promise.reject('Invalid activity date');
  return req.context.models.User.findByPk(req.body.creatorId).then(model => {
    if (!model) return Promise.reject('Invalid creator Id');
    return Promise.resolve();
  });
}

export default router;
