import mongoose from 'mongoose';
import EventMessage from "../models/eventMessage.js";


export const getEvents = async (req, res) => {
    try {
        const eventMessages = await EventMessage.find();
                
        res.status(200).json(eventMessages);
    } 
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createEvent = async (req, res) => {
    const { title, description, category, venue, date, hostedBy, city, hostUid, attendees } = req.body;

    const newEvent = new EventMessage({ title, description, category, venue, date, hostedBy, city, hostUid, attendees })

    try {
        await newEvent.save();

        res.status(201).json(newEvent);
    } 
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateEvent = async (req, res) => {

    const { id } = req.params;

    const { title, category, description, city, venue, date } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedEvent = { title, category, description, city, venue, date, _id: id };

    await EventMessage.findByIdAndUpdate(id, updatedEvent, { new: true });

    res.json(updatedEvent);
}

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await EventMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}


export const addAttendee = async (req, res) => {

    const { id } = req.params;

    console.log(req.body);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = await EventMessage.findByIdAndUpdate(id, { $addToSet:{attendees: req.body}, }, { new: true });
    
    res.json(updatedPost);
}