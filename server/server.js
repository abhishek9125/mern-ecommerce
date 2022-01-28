const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');
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
readdirSync('./routes').map((route) => app.use('/api', require(`./routes/${route}`)));

// Port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is Running on Port ${port}`);
})