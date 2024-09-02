const express = require('express');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middleware/errorhandler');
const postRoutes = require('./routes/posts.routes')
require('dotenv').config();


const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const path = require('path');

// Serve static files from the 'assets/uploads' directory
app.use('/assets/uploads', express.static(path.join(__dirname, 'assets/uploads')));

app.use('/users', userRoutes);
app.use('/posts',postRoutes)

app.use(errorHandler);

const PORT = 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));