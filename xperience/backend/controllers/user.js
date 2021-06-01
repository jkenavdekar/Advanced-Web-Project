import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import UserModal from '../models/userMessage.js';

const secret = 'test';


export const signin = async (req, res) => {

    const { email, password } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: oldUser, token });
    } 
    
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};


export const signup = async (req, res) => {

    const { displayName, email, password, photoURL } = req.body;
  
    try {
        const oldUser = await UserModal.findOne({ email });
    
        if (oldUser) return res.status(400).json({ message: "User already exists" });
    
        const hashedPassword = await bcrypt.hash(password, 12);
    
        const result = await UserModal.create({ email:email , password: hashedPassword, displayName: displayName, photoURL: photoURL });
    
        const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
    
        res.status(201).json({ result, token });
    } 
    
    catch (error) {

      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
};


export const addPhoto = async (req, res) => {

    const { id } = req.params;
    
    try {
        const {photoURL} = req.body; 

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

        const updatedUser = await UserModal.findByIdAndUpdate(id, { photoURL: photoURL }, { new: true });

        res.json(updatedUser);

    }
    catch(error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
}


export const updatePassword = async (req, res) => {

    const { id } = req.params;
    
    try {

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

        const hashedPassword = await bcrypt.hash(Object.keys(req.body)[0], 12);

        const updatedUser = await UserModal.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });

        res.json(updatedUser);

    }

    catch(error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
}