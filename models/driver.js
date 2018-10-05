//create schema and model for mongoDB
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create geolocation Schema
const GeoSchema = new Schema ({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

//create driver schema and model
const DriverSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    gender: {
        type: String
    },
    destination: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    //add geo location
    geometry: GeoSchema
});

//create a model
const Driver = mongoose.model("drivers", DriverSchema);

//export the module 
module.exports = Driver;