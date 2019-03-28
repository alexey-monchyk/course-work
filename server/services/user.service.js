const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');
const Article = require('../models/article.model');
const JWTService = require('./jwt.service');
const MailService = require('./mail.service');

class UserService {
    static async createUser(user) {
        const newUser = await new User(user);

        if (!newUser) throw new Error('Incorrect user\'s data.');

        UserService.checkConfirmedPassword(user.password, user.confirmedPassword);

        try {
            await newUser.save();
        } catch (e) {
            throw new Error('User with this email already exists.');
        }

        await MailService.sendConfirmation(newUser.email, newUser.id);

        return JWTService.generateJWT(newUser.id);
    }

    static async updateUser(userData, id) {
        const user = userData;

        if (userData.password) delete user.password;

        if (userData.email) delete user.email;

        const updatedUser = await User.findByIdAndUpdate(id, user);

        if (!updatedUser) throw new Error('User not updated.');

        if (updatedUser.firstName !== userData.firstName
            || updatedUser.surname !== userData.surname) {
            await Article.updateMany({ authorId: id },
                { author: `${userData.firstName} ${userData.surnam}` });
        }


        return updatedUser;
    }

    static async getSelfData(id) {
        let user = await User.findById(id);

        if (!user) throw new Error('User with this id not found.');

        user = user.toClient();

        delete user.password;

        return user;
    }

    static async getUserById(id) {
        let user = await User.findById(id);

        if (!user) throw new Error('User with this id not found.');

        user = user.toClient();

        delete user.password;

        return user;
    }

    static async getAllUsers() {
        let users = await User.find({}, { password: false });

        if (!users) throw new Error('Users not found.');

        users = users.map(user => user.toClient());

        delete users.password;

        return users;
    }

    static async selfDelete(id) {
        const user = await User.findByIdAndRemove(id);

        if (!user) throw new Error('User not deleted.');

        user.toClient();

        delete user.password;

        return user;
    }

    static async loginUser(email, password) {
        let user = await User.findOne({ email });

        if (!user.emailVerified) throw new Error('Confirm your email.');

        user = user.toClient();

        if (!user) throw new Error('User with this email not found.');

        const isPasswordValid = await UserService.validatePassword(password, user.password);

        if (!isPasswordValid) throw new Error('Incorrect password.');

        const tokens = JWTService.generateJWT(user.id);

        delete user.password;

        return { user, tokens };
    }

    static async confirmEmail(token) {
        const verified = JWTService.verify(token);

        const user = await User.findByIdAndUpdate(verified.id, {
            emailVerified: true,
        }, { new: true });

        if (!user) throw new Error('User not updated.');

        return user.toClient();
    }

    static async isUserUnique(email) {
        const trimmedEmail = email ? email.trim() : '';

        const user = await User.findOne({ email: trimmedEmail });

        if (user) throw new Error('User with this email already exists.');
    }

    static async validateUser(user) {
        try {
            await UserService.isUserUnique(user.email);
        } catch (e) {
            throw e;
        }

        return {};
    }

    static async validatePassword(password, hashedPassword) {
        return await bcryptjs.compare(password, hashedPassword);
    }

    static checkConfirmedPassword(password, confirmedPassword) {
        if (password !== confirmedPassword) throw new Error('Incorrect password confirmation.');
    }

    static async refreshToken(token) {
        const verified = JWTService.verifyRefresh(token);
        const newJWT = JWTService.generateJWT(verified.id);

        return newJWT;
    }
}

module.exports = UserService;
