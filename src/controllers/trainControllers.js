import mongoose from 'mongoose';
import { TrainSchema } from '../models/trainModel';

const Train = mongoose.model('Train', TrainSchema);

export const getTrains = (req, res) => {
    const newTrain = new Train(req.body);
    console.log(req.body);
    console.log(newTrain);
    // save req.body to db
}
