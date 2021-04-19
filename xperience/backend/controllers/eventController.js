import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose';


import eventModel from "../models/eventModel.js" ;


//getAllEvents function to get all users
export const getAllEvents = asyncHandler(async(req, res) => {
    const events = await eventModel.find();
    res.status(200).json(events);
})


//create a new event
export const createEvent  = asyncHandler(async(req, res) => {
    const { title, date, description, category, city, venue, hostedby, attendees  } = req.body;
    const newCreateEvent = new PostMessage({ title, date, description, category, city, venue, hostedby, attendees })
    res.send(newCreateEvent)   
})


//delete a new event
export const deleteEvent  = asyncHandler(async(req, res) => {
    const {id} = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)){
         res.status(404).send(`No post with id: ${id}`);
    } 
    await eventModel.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
})

//delete a new event
export const eventSignUp  = asyncHandler(async(req, res) => {
    const {eventId} = req.body.eventId
    const {user} = req.body.userId
    if (!mongoose.Types.ObjectId.isValid(eventId)) return res.status(404).send(`No post with id: ${eventID}`);

    const event = await eventModel.findById(eventId);

    const updatedEvent = await eventModel.findByIdAndUpdate(event, { attendees: post.attendees + user }, { new: true });
})

//getEventsById function to retrieve user by id
export const getEventByUserId  = asyncHandler(async(req, res) => {
    const event = await eventModel.findById(req.params.id)
    
    //if event id match param id send user else throw error
    if(event){
        res.json(event)
    }else{
        res.status(404).json({message: "event not found"})
        res.status(404)
        throw new Error('event not found')
    }
})