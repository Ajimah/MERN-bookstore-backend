import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';
//import {Book} from './models/bookmodels.js'
import booksRouter from './routes/booksRouter.js';



dotenv.config()

const app = express();

app.use(express.json());

//allow all origins with default of cors(*)


app.use(cors());


//allow custom origins
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'PUT', 'POST','DELETE',],
//     allowedHeaders:[ 'Content-Type' ],
// })
// );

const port = process.env.PORT || 5000;



app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to mern stack')
});


app.use('/books', booksRouter);

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    app.listen (port, () =>{
        console.log(`listening on port: ${port}`);
    });
    console.log('app connected to database');
})
.catch((err) =>{
    console.log(err)
});