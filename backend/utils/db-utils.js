const User = require('../models/user');
const HttpError = require('../models/http-error');

exports.createNewUser = async (userName, userEmail, userPassword) => {
    try{
        const user = new User({
            userName,
            userEmail,
            userPassword,
            userProfilePicURL: 'https://images.theconversation.com/files/304864/original/file-20191203-67028-qfiw3k.jpeg?ixlib=rb-1.1.0&rect=638%2C2%2C795%2C745&q=45&auto=format&w=496&fit=clip',
            userFriendIDs: [],
            userChannelIDs: [],
            lastSeen: "online"
        });
        await user.save();
        return user;
    } catch(err){
        console.log("Error in creating new user at db-utils.js->createNewUser: ", err);
        throw new HttpError('Could not create user, please try again!', 400);
    }
};

exports.findUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new HttpError('Could not find user for the provided id.',404);
    }
    return user;
};

exports.findUserByEmail = async (userEmail) => {
  const user = await User.findOne({ userEmail: userEmail });
  return user;
};