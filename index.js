const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.port || 4000;

// set up express app
const app = express();

// connect to mongodb
//mongoose.connect("mongodb://localhost/carpoolwithus", {useNewUrlParser: true});
//change to mLab for glitch demanstration
mongoose.connect("mongodb://driver:driver1@ds131323.mlab.com:31323/carpoolwithus", {useNewUrlParser: true});
mongoose.Promise = global.Promise;

//set up static files
app.use(express.static("public"));

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(port, () => {
    console.log("now listening for requests on " + port);
});

