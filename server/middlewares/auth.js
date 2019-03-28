const { NOT_ACCEPTABLE } = require('http-status-codes');
const JWTService = require('../services/jwt.service');
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(NOT_ACCEPTABLE).send('Need authorization token in header');
    }

    const token = req.headers.authorization.replace('Bearer ', '');

    let verified;
    try {
        verified = JWTService.verify(token);
    } catch (e) {
        return res.status(NOT_ACCEPTABLE).json({ message: 'Incorrect access token.' });
    }

    const user = await User.findById(verified.id);

    if (!user) return res.status(NOT_ACCEPTABLE).json({ message: 'User not found with this token.' });

    if (verified.id === user.id) {
        req.decodedId = verified.id;
        return next();
    }

    return res.status(NOT_ACCEPTABLE).json({ message: 'Session not found' });
};
