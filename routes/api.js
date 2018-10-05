const express = require ("express");
const router = express.Router();
const Driver = require("../models/driver");

// get a list of drivers from the db
router.get('/drivers', function(req, res, next){
    /* Driver.find({}).then(function(drivers){
        res.send(drivers);
    }); */
    Driver.aggregate()
        .near({
            near: {
                type: "point",
                coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
            },
            distanceField: "dist.calculated",
            maxDistance: 100000, 
            spherical: true
        }).then(function(drivers){ 
            res.send(drivers); 
        })
        .catch(next);
});

// add a new driver to the db
router.post("/drivers", function(req, res, next){
    Driver.create(req.body).then(function(driver){
        res.send(driver);
    })
    .catch(next);
});

// update a driver in the db
router.put("/drivers/:id", function(req, res, next){
    Driver.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Driver.findOne({_id: req.params.id}).then(function(driver){
            res.send(driver);
        });
    }).catch(next);
});

// delete a driver from the db
router.delete("/drivers/:id", function(req, res, next){
    Driver.findByIdAndRemove({_id: req.params.id}).then(function(driver){
        res.send(driver);
    }).catch(next);
});

module.exports = router; 

