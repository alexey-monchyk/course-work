const validator = require('../utils/validator');

module.exports = (req, res, next) => {
    const validatorMethods = validator[req.path];
    if (validatorMethods) {
        const validatorMethod = validatorMethods[req.method];
        if (validatorMethod) {
            const errors = validatorMethod(req);
            if (errors) {
                return res.status(403).json(errors);
            }
        }
    }

    return next();
};
