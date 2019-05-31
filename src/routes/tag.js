import { Router } from 'express';
const status = require('http-status');
const router = Router();


router.post('/', async (req, res) => {
    const tags = await req.context.models.Tag.bulkCreate(req.body, {returning: true});
    
    

    // const tag = await req.context.models.Tag.create({
    //     userId: req.body.userId,
    //     tag: req.body.tag
    // })
    return res.status(status.OK).json(tags);
});

router.get('/', async (req, res) => {
    const tags = await req.context.models.Tag.findAll();
    return res.status(status.OK).json(tags);
});




export default router;