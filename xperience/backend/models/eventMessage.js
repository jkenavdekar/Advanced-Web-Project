import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
    id: String,
    title: String,
    description: String,
    category: String,
    attendees: [String],
    venue: String,
    date: String,
    time: String,
    city: String,
    hostedBy: String,
    hostUid: String,
    hostPhotoURL: String,
    isCancelled: Boolean,
    comments: [{displayName: String, description: String, date: String}],
    count: {type: Number, default: 0},
})

var EventMessage = mongoose.model('EventMessage', eventSchema);

export default EventMessage;