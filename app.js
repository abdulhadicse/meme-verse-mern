//import
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const mongoose = require('mongoose');
const userRouter = require('./Router/userRouter');
const memesRouter = require('./Router/memesApp');

//db connection
const DB_Url= process.env.MongoDB_Url;
mongoose.connect(DB_Url, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('were connected!');
});

//middleware
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('upload'));
app.use(fileUpload({
    createParentPath: true
}));

//Routes
app.use('/user', userRouter);
app.use('/api/memes', memesRouter);

app.get('/', async(req, res) => {
    res.send('Hello I am from Server');
})


//listen
const PORT = process.env.PORT ||4000;

app.listen(PORT, () => {
    console.log('Server is running');
})