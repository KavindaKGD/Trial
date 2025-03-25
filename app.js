const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

require('./config/db');

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.module.exports = app;