const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
    
    const { name, email, picture } = req.user;
    const user = await User.findOneAndUpdate({ email }, { name, picture }, { new: true });
    if(user) {
        res.json(user);
    } else {
        const newUser = await new User({ email, name, picture }).save();
        res.json(newUser);
    }

}