import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TrainSchema = new Schema({
    departure: {
        type: String
    },
    destination: {
        type: String
    },
    track: {
        type: String
    },
    line: {
        type: String
    },
    trainNumber: {
        type: Number
    },
    status: {
       type: Date,
       default: Date.now 
    }
});
