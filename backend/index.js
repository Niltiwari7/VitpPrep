import express from 'express';
import dotenv from 'dotenv';
import UserRouter from './routes/user.route.js';
import connectDB from './config/dbconfig.js';
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/users',UserRouter);
const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('Hello world');
})
app.listen(port, ()=>{
    console.log('Server is running on port', port);
})