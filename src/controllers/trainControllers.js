import mongoose from 'mongoose';
import { TrainSchema } from '../models/trainModel';
// var cheerio = require("cheerio");
// var axios = require("axios");

const Train = mongoose.model('Train', TrainSchema);

export const getTrains = (req, res) => {
    const newTrain = new Train(req.body);
    // console.log(req.body);
    console.log(newTrain);
    // save req.body to db
    newTrain.save((err, train) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.json(train);
        }
    })
}
