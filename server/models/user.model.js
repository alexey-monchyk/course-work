const mongoose = require('mongoose');
const { genSalt, hash } = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String,
        minlength: 2,
        trim: true,
    },
    surname: {
        required: true,
        type: String,
        minlength: 2,
        trim: true,
    },
    age: {
        required: true,
        type: Number,
        minlength: 1,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        minlength: 5,
        trim: true,
        unique: true,
    },
    password: {
        required: true,
        type: String,
        minlength: 6,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    favouritesArticles: {
        type: Array,
    },
});

UserSchema.methods.hashPassword = async function () {
    const user = this;
    const salt = await genSalt(10);

    return await hash(user.password, salt);
};

UserSchema.methods.toClient = function () {
    const obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;

    return obj;
};

UserSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await user.hashPassword();
        next();
    }

    next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
