import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/user.js';
import productRouter from './Routes/product.js';
import cartRouter from "./Routes/cart.js";
import contRouter from './Routes/cont.js';
import path from 'path';
import url from 'url';
import cors from 'cors';

const app = express();
app.use(cors());

// Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '../frontend'))); 

// API routes
app.use('/api/cont', contRouter);
app.use("/api/user", userRouter);
app.use('/api/product', productRouter);
app.use("/api/cart", cartRouter); // Cart routes


// Handle all other routes (for single-page apps or fallback to index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'i1.html')); // Serve index.html
});

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb+srv://thanucs23:thanu23@ese.vew8g.mongodb.net/?retryWrites=true&w=majority&appName=ESE"; // Use environment variable for MongoDB URI
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Set the server port (ensure you use an appropriate port for production or development)
const port = process.env.PORT || 1000; // Use environment variable for port
app.listen(port, () => console.log(`Server running on port ${port}`));

