const { hashPassword, createToken, checkPassword } = require('../utils/auth-utils');
const { findUserByEmail, createNewUser } = require('../utils/db-utils');
const HttpError = require('../models/http-error');

exports.registerNewUser = async(req, res, next) => {
    let existingUser,hashedPassword, createdUser, token;
    try {
        const { userName, userEmail, userPassword } = req.body;

        existingUser = await findUserByEmail(userEmail);
        if(existingUser) throw new HttpError('User exists already', 409);
        hashedPassword = await hashPassword(userPassword);
        createdUser = await createNewUser(userName, userEmail, hashedPassword);
        token = createToken(createdUser.id);
        res.status(201).json({
            message: "User created successfully",
            token: token,
            user: {
                id: createdUser.id,
                userName: userName
            }
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at auth-controllers.js->registerNewUser: ", err);
        return next(new HttpError('Could not create user', 400));
    }
}

exports.loginUser = async(req, res, next) => {
    const { userEmail, userPassword } = req.body;
    let existingUser, isValidPassword, token;
    try {
        existingUser = await findUserByEmail(userEmail);
        if (!existingUser) throw new HttpError('Invalid credentials: Email', 403);
        isValidPassword = await checkPassword(userPassword, existingUser.userPassword);
        if (!isValidPassword) throw new HttpError('Invalid credentials: Password', 403);
        token = createToken(existingUser.id);
        res.status(200).json({
            message: "User logged in successfully",
            token: token,
            user: {
                _id: existingUser.id,
                userName: existingUser.userName
            }
        });
    } catch (err) {
        if (err.code) return next(err);
        console.log("Unexpected error at auth-controllers.js->loginUser: ", err);
        return next(new HttpError('Logging in failed, please try again.', 400));
    }
}