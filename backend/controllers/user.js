const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secret = "socketDotIoIsShit";
exports.registerNewUser = async(req, res, next) => {
    // https://i.pinimg.com/280x280_RS/ca/30/f1/ca30f1448269ed6eb670fd41815457e0.jpg
    
    //image link is above one
    const { userName, userEmail, userPassword, userConfirmPassword, userProfilePic } = req.body;
    let user,token;
    try {
        user = User({
            userName,
            userEmail,
            userPassword,
            userProfilePicURL: userProfilePic,
            userFriendIDs: [],
            userChannelIDs: [],
            lastSeen: new Date().toString()
        });
        await user.save();
        token = jwt.sign({
            userId: user.id,
            userEmail: user.userEmail
        },secret);
        res.status(201).json({
            message: "User created successfully",
            token: token,
            user: {
                id: user.id,
                userName: userName,
                userEmail: userEmail
            }
        });
    } catch(err) {
        const error = new Error(
            'Could not create user');
        throw(error);
    }
}

exports.loginUser = async(req, res, next) => {
    const {userEmail, userPassword} = req.body;
    let existingUser,token;
    console.log(userEmail, userPassword);
    try {
        existingUser = await User.findOne({ userEmail: userEmail });
        console.log("existing", existingUser);
        if (!existingUser) {
            const error = new Error('Invalid credentials, could not log you in.');
            return next(error);
        }
        token = jwt.sign({
            userId: existingUser.id,
            userEmail: existingUser.userEmail
        }, secret);
        res.status(200).json({
            message: "User logged in successfully",
            token: token,
            user: {
                id: existingUser.id,
                userName: existingUser.userName,
                userEmail: userEmail
            }
        });
    } catch (err) {
        console.log(err);
        const error = new Error(
            'Logging in failed, please try again later.',
            500
        );
        return next(error);
    }
}

exports.getAllUsers = async(req, res, next) => {
    
}

exports.addNewFriend = async(req, res, next) => {
    
}

exports.getUserFriendsAndChannels = async(req, res, next) => {
    
}

exports.getAllUserNames = async(req, res, next) => {
    
}