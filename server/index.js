const express = require('express');
const connection = require('./config/db')
const nodeRoutes = require('./routes/nodeRoutes');
const cors = require('cors')
require('dotenv').config(); 
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors())

// Database connection
connection ()

// Routes
app.use('/api/nodes', nodeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
