import mongoose from 'mongoose'

const eventSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique:true
    },
    title:{
        type: String,
        required: true,

    },
    date: {
        type: Date,
        required: true,
        unique:true
    },
    category: {
        type: String,
        required: true,
        unique:true
    },
    descripton: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
    },
    hostedBy: {
        type: String,
    },
    attendees: [{
        type: String,
    }],
    

}, {
    timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

export default Event