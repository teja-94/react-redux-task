const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo DataBase Connection Establised Succuessfully");
})

const excerciseRouter = require('./routes/exercise');
const userRouter = require('./routes/user');

app.use('/excercises', excerciseRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})





/* This is for ATLAS MONGO DB

/*var uri = "mongodb+srv://new_password_1804:new_password_1804@mern.aqrs2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        console.log("DB Conneted");
    })
    .catch(err => {
        console.log(err)
    });
*/


//For Local Mongo DB
/*var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("maii");
    dbo.createCollection("custemerss", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
}); */



//if (err) throw err;
// var dbo = db.db("myserver");
//dbo.createCollection("customers", function(err, res) {
//if (err) throw err;