import express from 'express';
import dotenv from 'dotenv';
import UserRouter from './routes/user.route.js';
import TopicRouter from './routes/topic.route.js';
import SubTopicRouter from './routes/subtopic.route.js';
import connectDB from './config/dbconfig.js';
import cookieParser from 'cookie-parser';
dotenv.config();
connectDB();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/users',UserRouter);
app.use('/topics',TopicRouter);
app.use('/subtopics',SubTopicRouter);
const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('Hello world');
})
app.listen(port, ()=>{
    console.log('Server is running on port', port);
})