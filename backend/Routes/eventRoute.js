const router = require('express').Router()
const Event = require('../models/Event')
const verify = require('../verifyToken')

const eventValidation = require('../Validation/eventValidation')

router.get('/',verify,(req,res)=>{
    console.log("Hello")
    res.send(req.user.name)
})

router.get('/all',verify,(req,res)=>{
    Event.find()
    .sort('-date')
    .populate('user',['name'])
    .then(events=> res.json(events))
    .catch(err => res.status(400).json({error:"Error in get api all events"}))
})

router.get('/events',verify,(req,res)=>{
    Event.find({typeofsport:req.query.sport})
    .sort('-date')
    .populate('user',['name'])
    .then(events => res.json(events))
    .catch(err => res.status(400).json({error:"Error in get request for a particular sport"}))
})

router.get('/event/:id',verify,(req,res)=>{
    Event.findById(req.params.id)
    .populate('user',['name'])
    .then(event => res.json(event))
    .catch(err => res.status(400).json({error:"Error in get request for particular id"}))
})

router.get('/user/:user_id',verify,(req,res) => {
    Event.find({user:req.params.user_id})
    .sort('-date')
    .populate('user',['name'])
    .then(events => res.json(events))
    .catch(err => res.status(400).json({error:"Error in get request for a particular user events"}))
})

router.post('/create',verify,(req,res)=>{
    const {errors, isValid} = eventValidation(req.body)
    const eventId = req.query.eventId
    if(!isValid){
        return res.status(400).send(errors)
    }
    const eventFields = {}
    eventFields.user = req.user._id
    if(req.body.nameofevent) eventFields.nameofevent = req.body.nameofevent;
    if(req.body.typeofsport) eventFields.typeofsport = req.body.typeofsport;
    if(req.body.numberofplayers) eventFields.numberofplayers = req.body.numberofplayers;
    if(req.body.address) eventFields.address = req.body.address;
    if(req.body.description) eventFields.description = req.body.description;
    if(req.body.date) eventFields.date = req.body.date;
    if(req.body.time) eventFields.time = req.body.time;
    let tempArray = []
    const newPlayer = {
        id: req.user._id,
        name: req.user.name
    }
    tempArray.push(newPlayer)

    eventFields.listofplayers = tempArray

    Event.findById(eventId)
    .then(event => {
        if(event){
            if(req.body.nameofevent) event.nameofevent = req.body.nameofevent;
            if(req.body.typeofsport) event.typeofsport = req.body.typeofsport;
            if(req.body.numberofplayers) event.numberofplayers = req.body.numberofplayers;
            if(req.body.address) event.address = req.body.address;
            if(req.body.description) event.description = req.body.description;
            if(req.body.date) event.date = req.body.date;
            if(req.body.time) event.time = req.body.time;

            return event.save().then(event => res.json(event));;
        } else{
            new Event(eventFields).save().then(event => res.json(event))
        }
    })
})

router.put('/:id/join',verify,(req,res)=>{
    Event.findById(req.params.id)
    .populate('user',['name'])
    .then(event => {
        if(!event){
            return res.status(400).json({error:"This event is not found"})
        }
        let count = 0;
        for(let i of event.listofplayers){
            if(i["id"]===req.user._id){
                return res.status(400).json({error:"You have already joined the event"})
            }
            count++;
        }
        if(count >= event.numberofplayers){
            return res.status(400).json({error:"This event is full."})
        }
        const newPlayer = {
            id: req.user._id,
            name: req.user.name
        }

        event.listofplayers.push(newPlayer)
        return event.save()
    })
    .then(result => {
        res.status(200).json({
            msg:"Success on joining the event",
            event:result,
            join:"You are going to this event."
        })
    })
    .catch(err => res.status(500).json({error:"Error in the put request"}))
})

router.delete('/:id', verify, (req,res) => {
    Event.findById(req.params.id)
    .then(event => {
        if(event.user.toString() != req.user._id){
            return res.status(401).json({notauthorized:"User not authorized"})
        }
        event.remove().then(()=>res.json({success:true}))
    })
    .catch(err => res.status(500).json({error:"Error in delete event api"}))
})

router.post('/comment/:id',verify, (req,res) => {
    if(!req.body.text) return res.status(400).json({error:"No text available"})
    let comment = {}
    let commentList = []
    comment.user = req.user._id
    comment.text = req.body.text
    comment.name = req.user.name
    Event.findById(req.params.id)
    .then(event => {
        commentList = event.comments
        commentList.push(comment)
        event.comments = commentList
        return event.save()
    })
    .then(result => {
        res.status(200).json({
            msg:"Comment Added",
            event: result
        })
    })
    .catch(err => res.status(400).json({error:"Error in adding the comment"}))
})

module.exports = router