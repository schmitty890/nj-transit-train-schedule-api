import { 
    addNewContact, 
    getContacts, 
    getContactWithID, 
    updateContact,
    deleteContact 
} from '../controllers/crmController';
import { login, register, loginRequired } from '../controllers/userControllers';
import { addTrains, getTrains, deleteTrains, addTrainDetails } from '../controllers/trainControllers';

const routes = (app) => {
    app.route('/contact')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, loginRequired, getContacts)
    
    // POST endpoint
    .post(loginRequired, addNewContact);

    app.route('/contact/:contactId')
    // get specific contact
    .get(loginRequired, getContactWithID)
    
    // put request
    .put(loginRequired, updateContact)

    // delete request
    .delete(loginRequired, deleteContact);

    // registration route
    app.route('/auth/register')
        .post(register);

    // login route
    app.route('/auth/login')
        .post(login);

    // train route
    app.route('/api/train')
        .get(getTrains)
        .post(addTrains)
        .delete(deleteTrains);

    // train route
    app.route('/api/train-details')
        .post(addTrainDetails);
}

export default routes;
