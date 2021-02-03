const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()


const app = express()
// app.use(express.json());

//import modules
const authRoutes = require('./routes/auth')

//middleware


app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cors({ origin: process.env.CLIENT_URL}));

app.use("/api", authRoutes) // using the midleware to send all api requests to the auth

const SERVER_PORT = process.env.PORT || 8000

app.listen(SERVER_PORT, () =>
  console.log(`Server is now running on port ${SERVER_PORT}`)
);
