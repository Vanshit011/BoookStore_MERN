const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//define the User schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});


userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    } else {
        try {
            //hash password generation
            const salt = await bcrypt.genSalt(10);

            //hash password
            const hashedPassword = await bcrypt.hash(user.password, salt);

            //assign hashed password to password field
            user.password = hashedPassword;
            next();
        } catch (error) {
            return next(error)
        }
    }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        return error;
    }
}

//create user module
const User = mongoose.model('User', userSchema);
module.exports = User;