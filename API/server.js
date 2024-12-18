import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/user.js';
import productRouter from './Routes/product.js';
import path from 'path';
import url from 'url';

// Create an instance of the Express application
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Middleware for parsing URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files (e.g., images, CSS, JS) from the 'public' folder
app.use(express.static('public'));

// Get the current directory path using import.meta.url
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Serve static files (HTML, CSS, JS) from the 'frontend' folder
app.use(express.static(path.join(__dirname, '../frontend'))); // Ensure the correct path to the 'frontend' folder

// API routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

// Handle all other routes (for single-page apps or fallback to index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'i1.html')); // Serve index.html
});

// MongoDB connection
const mongoURI = "mongodb+srv://thanucs23:thanu23@ese.vew8g.mongodb.net/?retryWrites=true&w=majority&appName=ESE";
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Set the server port (ensure you use an appropriate port for production or development)
const port = 1000; // Hardcoded port number for simplicity
app.listen(port, () => console.log(`Server running on port ${port}`));



