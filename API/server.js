import express from 'express'
import mongoose from 'mongoose'
import userRouter from './Routes/user.js'
import productRouter from './Routes/product.js'

const app=express();

app.use(express.json())
app.get('/',(req,res)=>res.json({message:"home route"}))
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

mongoose.connect("mongodb+srv://thanu:pbiNGh69XIOPGUTR@fwd.kipps.mongodb.net/",{
    dbName:"fwd"}
).then(()=>console.log('MongoDB connected')).catch((err)=>console.log(err));

const port=1000;
app.listen(port,()=>console.log(`Server is running on port ${port}`))
