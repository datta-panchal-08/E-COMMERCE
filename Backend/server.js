import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import { connectDB } from './database/db.js';
import userRoutes from './routes/user.routes.js'
dotenv.config();
const app = express();
const port = process.env.PORT || 3200;

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/v1/user",userRoutes);
connectDB();

app.listen(port,()=>{
    console.log(`Server is running on port : ${port} `)
});
