const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();


// Setting up the express server on port 5000
const app = express();
const port = process.env.PORT || 5000;


//cors is the middleware it is going to parse JSON - sending and receiving JSON
app.use(cors());
app.use(express.json());

//Connecting MongoDB
const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connect(uri, { useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


//starts to listen to the server
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});