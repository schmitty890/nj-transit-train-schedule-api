import mongoose from 'mongoose';
import { TrainSchema, TrainDetailsSchema } from '../models/trainModel';
import cheerio from 'cheerio';
import axios from 'axios'

const Train = mongoose.model('Train', TrainSchema);
const TrainDetails = mongoose.model('TrainDetails', TrainDetailsSchema);

export const addTrains = (req, res) => {
    console.log('addTrains');
    console.log(req.body);
    // have a switch case go through different departure places
    // main train selector page https://m.njtransit.com/mo/mo_servlet.srv?hdnPageAction=DvTo
    // ie. hamilton is https://dv.njtransit.com/webdisplay/tid-mobile.aspx?sid=HL
    // ie. penn station is https://dv.njtransit.com/webdisplay/tid-mobile.aspx?sid=NY
    // once decided on the link, use cheerio to scrape that data. then save it to the db.
    let url = ''
    // url = 'hamilton'; // hardcoding this for now
    if (req.body.train === 'hamilton') {
        url = 'https://dv.njtransit.com/webdisplay/tid-mobile.aspx?sid=HL';
        console.log('we got hamilton url');
    } else if (req.body.train === 'nyp') {
        url = 'https://dv.njtransit.com/webdisplay/tid-mobile.aspx?sid=NY';
        console.log('we got nyp url');
    }

    // console.log(url);
    // get train page, loop over table rows and use cheerio to scrape this data from the table. put the data into an array of objects, and add to db.
    axios.get(url).then(function (response) {
        Train.remove({ }, (err, train) => {
            if (err) {
                res.send(err);
            }
            console.log({ message: 'Successfully deleted train'});
        })
        // console.log(response.data);
        var $ = cheerio.load(response.data);

        var result = { trains: [] };
        $("tbody").find("tr").each(function (i, element) {
            var newTrainObject = {
                departure: '',
                destination: '',
                track: '',
                line: '',
                trainNumber: '',
                status: ''
            }

            if (i % 2) { // if i is odd hack. was getting duplicate arrays here.
                var trainArray = $(element).text().trim().split("\n");
                trainArray.forEach(function (trainInfo, index) {
                    switch (index) {
                        case 0:
                            newTrainObject.departure = trainInfo;
                            break;
                        case 1:
                            // newTrainObject.destination = trainInfo;
                            break;
                        case 2:
                            newTrainObject.destination = trainInfo;
                            break;
                        case 3:
                            newTrainObject.track = trainInfo;
                            break;
                        case 4:
                            newTrainObject.line = trainInfo;
                            break;
                        case 5:
                            newTrainObject.trainNumber = trainInfo;
                            break;
                        case 6:
                            newTrainObject.status = trainInfo;
                            break;
                    }
                });
                const newTrain = new Train(newTrainObject);
                newTrain.save((err, train) => {
                    if (err) {
                        return res.status(400).send({
                            message: err
                        });
                    } else {
                        console.log({ message: 'Successfully added train'});
                    }
                })
            }
        });
        res.json({ message: 'Successfully added train'});
    });
}


export const addTrainDetails = (req, res) => {
    console.log('addTrains');
    console.log(req.body);
    // have a switch case go through different departure places
    // main train selector page https://m.njtransit.com/mo/mo_servlet.srv?hdnPageAction=DvTo
    // ie. hamilton is https://dv.njtransit.com/webdisplay/tid-mobile.aspx?sid=HL
    // ie. penn station is https://dv.njtransit.com/webdisplay/tid-mobile.aspx?sid=NY
    // once decided on the link, use cheerio to scrape that data. then save it to the db.
    let url = `https://dv.njtransit.com/webdisplay/train_stops.aspx?train=${req.body.train.trainNumber}`;


    console.log(url);
    // here loop over https://dv.njtransit.com/webdisplay/train_stops.aspx?train=${req.body.train.trainNumber} url and use cheerio to scrape the data and save it to the db, then we call the db to get the data to post it to the client.
    // get train page, loop over table rows and use cheerio to scrape this data from the table. put the data into an array of objects, and add to db.
    // axios.get(url).then(function (response) {
    //     Train.remove({ }, (err, train) => {
    //         if (err) {
    //             res.send(err);
    //         }
    //         console.log({ message: 'Successfully deleted train'});
    //     })
    //     // console.log(response.data);
    //     var $ = cheerio.load(response.data);

    //     var result = { trains: [] };
    //     $("tbody").find("tr").each(function (i, element) {
    //         var newTrainObject = {
    //             departure: '',
    //             destination: '',
    //             track: '',
    //             line: '',
    //             trainNumber: '',
    //             status: ''
    //         }

    //         if (i % 2) { // if i is odd hack. was getting duplicate arrays here.
    //             var trainArray = $(element).text().trim().split("\n");
    //             trainArray.forEach(function (trainInfo, index) {
    //                 switch (index) {
    //                     case 0:
    //                         newTrainObject.departure = trainInfo;
    //                         break;
    //                     case 1:
    //                         // newTrainObject.destination = trainInfo;
    //                         break;
    //                     case 2:
    //                         newTrainObject.destination = trainInfo;
    //                         break;
    //                     case 3:
    //                         newTrainObject.track = trainInfo;
    //                         break;
    //                     case 4:
    //                         newTrainObject.line = trainInfo;
    //                         break;
    //                     case 5:
    //                         newTrainObject.trainNumber = trainInfo;
    //                         break;
    //                     case 6:
    //                         newTrainObject.status = trainInfo;
    //                         break;
    //                 }
    //             });
    //             const newTrain = new Train(newTrainObject);
    //             newTrain.save((err, train) => {
    //                 if (err) {
    //                     return res.status(400).send({
    //                         message: err
    //                     });
    //                 } else {
    //                     console.log({ message: 'Successfully added train'});
    //                 }
    //             })
    //         }
    //     });
    //     res.json({ message: 'Successfully added train'});
    // });
}


export const getTrains = (req, res) => {
    Train.find({}, (err, train) => {
        if (err) {
            res.send(err);
        }
        res.json(train);
    }).sort({ $natural: 1 }).limit(20);
};


export const deleteTrains = (req, res) => {
    Train.remove({ }, (err, train) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted train'});
    })
}