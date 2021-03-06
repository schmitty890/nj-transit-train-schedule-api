import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import User from './src/models/userModel';
import routes from './src/routes/crmRoutes';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3001;

// mongoose connection
mongoose.Promise = global.Promise;
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/nj-transit-train-schedule';
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT setup
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
       jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
           if (err) req.user = undefined;
           req.user = decode;
           next();
       }); 
    } else {
        req.user = undefined;
        next();
    }
});

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);