import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
    id: String,
    title: String,
    description: String,
    category: String,
    attendees: [String],
    venue: String,
    date: String,
    city: String,
    hostedBy: String,
    hostUid: String,
    hostPhotoURL: String,
    isCancelled: Boolean,
    comments: [{displayName: String, description: String, date: String}],
})

var EventMessage = mongoose.model('EventMessage', eventSchema);

export default EventMessage;