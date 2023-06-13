const router = require('express').Router();
const { verifyTokenAndAdmin } = require('../middleware/verifytoken');
const NewsletterOrder = require('../models/Newsletter');

router.post('/', async (req,res)=>{
    const newNewsletterOrder = new NewsletterOrder(req.body);
    try{
        const savedNewsletterOrder = await newNewsletterOrder.save();
        res.status(200).json(savedNewsletterOrder);
    }
    catch(error){
        res.status(403)
        throw new Error("Newsletterbestellung nicht möglich")
    }
})
router.get('/find', verifyTokenAndAdmin, async (req,res)=>{
    try{
        const allNewsletterOrder = await NewsletterOrder.find();
        res.status(200).json(allNewsletterOrder);
    }
    catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
})
router.delete('/:id', verifyTokenAndAdmin, async (req,res)=>{
    try{
        await NewsletterOrder.findByIdAndDelete(req.params.id);
        res.status(200).json("Newsletter wurde gelöscht");
    }
    catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})
module.exports = router;