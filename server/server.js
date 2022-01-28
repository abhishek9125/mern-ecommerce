const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// App Initialisation
const app = express();

// Database Setup
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log("Database Error : ", error));

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ kmit: '2mb' }));
app.use(cors());

// Routes
app.get('/api', (req, res) => {
    res.json({
        data : 'Hey you hit Node API'
    })
})

// Port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is Running on Port ${port}`);
})