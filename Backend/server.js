import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './database/db.js';
import userRoutes from './routes/user.routes.js'
dotenv.config();
const app = express();
const port = process.env.PORT || 3200;

app.use(express.json());
app.use("/api/v1/user",userRoutes);

app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port : ${port} `)
});
