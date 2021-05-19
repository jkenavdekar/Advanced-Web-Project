import mongoose from 'mongoose';

const userSchema = mongoose.Schema({

    displayName: { type: String, required:  true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    photoURL: String,
    
});

export default mongoose.model("UserMessage", userSchema);