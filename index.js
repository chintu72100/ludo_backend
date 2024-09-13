const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
require('dotenv').config()

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://manasraj19:1234@todoweb.gbqsate.mongodb.net/?retryWrites=true&w=majority&appName=todoweb").then(()=>{
    console.log("connected to database");
})

app.use('/', require('./apis/user.route'));
app.use('/', require('./apis/game.route'));

app.listen(3000,()=>{
    console.log(`listening on port 3000`);
});