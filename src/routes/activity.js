import { Router } from 'express';
import validator from 'validator';
const status = require('http-status');
const router = Router();


router.post('/', async (req, res) => {
    return validateActivityPost( req )
        .then( () => {
            const activityDescription = req.body.description || "";         //create an activity based on the body
            return req.context.models.Activity.create({
                name: req.body.name,
                location: req.body.location,
                description: activityDescription,
                dateTime: req.body.dateTime,
                creator: req.body.creator,
            })
        }).then( activity => {
            if( !activity ) Promise.reject( 'Error creating user in database' );    //error if activity was not created successfuly
            return res.status(status.CREATED).json(activity);
        }).catch( err =>  res.status(status.BAD_REQUEST).json(err))
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
    return validateActivityPut( req )
        .then( errMessage => {
            if( errMessage ) Promise.reject( errMessage );
            const activityDescription = req.body.description || "";
        })
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


// function validateActivityPut( req ) {
//     return Promise.resolve(syncvalidateActivityPut( req ));
// }

function validateActivityPut( req ) {
    if( !req.body.name || !validator.isAlphanumeric( req.body.name )) return Promise.reject("Invalid activity name");
    if( !req.body.location || !validator.isLength(req.body.location, 6) ) return Promise.reject("Invalid activity location");
    // if( req.body.description ) { //todo: errer check description??
    if( !req.body.dateTime || validator.isBefore(req.body.dateTime.toString(), new Date().toString()) ) return Promise.reject("Invalid activity date");
    if( !req.body.givesPoints || !validator.isBoolean(req.body.givesPoints) ) return Promise.reject("Invalid activity givesPoints");
    return( req.context.models.User.findByPk( req.body.creator )
    .then(model => {
        if(!model) return Promise.reject("Invalid creator Id");
        return Promise.resolve();
    })
 );
    }

// function validateActivityPost( req ) {
//     return Promise.resolve(syncvalidateActivityPost( req ));
// }

function validateActivityPost( req ) {
    if( !req.body.name || !validator.isAlphanumeric( req.body.name )) return Promise.reject("Invalid activity name");
    if( !req.body.location || !validator.isLength(req.body.location, 6) ) return Promise.reject("Invalid activity location");
    // if( req.body.description ) { //todo: errer check description??
    if( !req.body.dateTime || validator.isBefore(req.body.dateTime.toString(), new Date().toString())  ) return Promise.reject("Invalid activity date");

    return( req.context.models.User.findByPk( req.body.creator )
        .then(model => {
            if(!model) return Promise.reject("Invalid creator Id");
            return Promise.resolve();
        })
     );
};

export default router;