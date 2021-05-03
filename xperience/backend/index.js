import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import posts from './routes/posts.js';
import users from './routes/users.js';

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', posts);
app.use('/user', users);

const CONNECTION_URL = 'mongodb+srv://Jay:itsmydatabase@cluster0.ntoce.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//const databaseName = 'Xperience';
//const connection_d = `mongodb://127.0.0.1:27017/${databaseName}`;

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology:true})
.then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
.catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);