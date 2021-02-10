const jwt = require('jsonwebtoken');
const  { secret }  = require('../config');
const HttpError = require('../models/http-error');

module.exports = async(req, res, next) => {
    const authorized = req.get('authorization');
    if(authorized){  
        const token = authorized.split(' ')[1];
        let decodedToken;
        try{
            decodedToken = jwt.verify(token, secret);
            if(!decodedToken){
                return next(new HttpError("Could not authenticate user",401));
            } else {
                req.userId = decodedToken.userId;
                next();
            }
        }catch(err){
            console.log('Error in decoding token at: isAuth.js.\nError is: ', err);
            return next(new HttpError("Could not authenticate user",401));
        }
    }
    else{
        return next(new HttpError("No auth token sent in headers",401));
    }
}