const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secret = 'learningWebsockets';

exports.registerNewUser = async(req, res, next) => {
   
    // let user,token;
    // try {
    //     const { userName, userEmail, userPassword, userConfirmPassword, userProfilePic } = req.body;
    //     user = User({
    //         userName,
    //         userEmail,
    //         userPassword,
    //         userProfilePicURL: userProfilePic,
    //         userFriendIDs: [],
    //         userChannelIDs: [],
    //         lastSeen: new Date().toString()
    //     });
    //     await user.save();
    //     token = jwt.sign({
    //         userId: user._id,
    //         userEmail: user.userEmail
    //     },secret);
    //     res.status(201).json({
    //         message: "User created successfully",
    //         token: token,
    //         user: {
    //             id: user._id,
    //             userName: userName,
    //             userEmail: userEmail
    //         }
    //     });
    // } catch(err) {
    //     const error = new Error(
    //         'Could not create user');
    //     throw(error);
    // }
    res.status(201).json({
        message: "User created successfully",
        token: "random-token",
        user: {
            id: "2er2q",
            userName: "Random Name"
        }
    });
}

exports.loginUser = async(req, res, next) => {
    // const {userEmail, userPassword} = req.body;
    // let existingUser,token;
    // try {
    //     existingUser = await User.findOne({ userEmail: userEmail });
    //     if (!existingUser) {
    //         const error = new Error('Invalid credentials, could not log you in.');
    //         return next(error);
    //     }
    //     token = jwt.sign({
    //         userId: existingUser.id,
    //         userEmail: existingUser.userEmail
    //     }, secret);
    //     res.status(200).json({
    //         message: "User logged in successfully",
    //         token: token,
    //         user: {
    //             id: existingUser._id,
    //             userName: existingUser.userName,
    //             userEmail: userEmail
    //         }
    //     });
    // } catch (err) {
    //     console.log(err);
    //     const error = new Error(
    //         'Logging in failed, please try again later.',
    //         500
    //     );
    //     return next(error);
    // }
    res.status(200).json({
        message: "User logged in successfully",
        token: "token-3r2f",
        user: {
            id: user._id,
            userName: userName
        }
    });
}