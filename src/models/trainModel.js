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
        type: String
    },
    status: {
       type: String
    }
});
