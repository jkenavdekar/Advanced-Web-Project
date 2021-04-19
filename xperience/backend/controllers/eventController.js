import asyncHandler from 'express-async-handler'

import eventModel from "../models/eventModel.js" ;


//getEvents function to get all users
export const getEvents = asyncHandler(async(req, res) => {
    const events = await eventModel.find();
    res.status(200).json(events);
})


//getEventsById function to retrieve user by id
export const getEventById  = asyncHandler(async(req, res) => {
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