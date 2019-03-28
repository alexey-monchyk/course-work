module.exports = {
    '/users': {
        POST: (req) => {
            req.check('email', 'Email is incorrect.').isEmail();
            req.check('password', 'Password is required.').notEmpty();
            req.check('confirmedPassword', 'Confirm password must be provided.').notEmpty();
            req.check('firstName', 'First name is required.').notEmpty();
            req.check('surname', 'Surname is required.').notEmpty();
            req.check('age', 'Age is required').isNumeric();

            return req.validationErrors();
        },

        PUT: (req) => {
            req.check('authorization', 'Access token is required').notEmpty();
            req.check('firstName', 'First name must be not empty.').optional().notEmpty();
            req.check('surname', 'Surname must be not empty.').optional().notEmpty();
            req.check('age', 'Age must be type of number.').optional().isNumeric();

            return req.validationErrors();
        },

        GET: (req) => {
            req.check('authorization', 'Access token is required').notEmpty();

            return req.validationErrors();
        },

        DELETE: (req) => {
            req.check('authorization', 'Access token is required').notEmpty();

            return req.validationErrors();
        },
    },

    '/users/all': {
        GET: (req) => {
            req.check('authorization', 'Access token is required').notEmpty();

            return req.validationErrors();
        },
    },

    '/users/:id': {
        GET: (req) => {
            req.check('id', 'Id is required for getting user.').notEmpty();

            return req.validationErrors();
        },
    },

    '/users/login': {
        POST: (req) => {
            req.check('email', 'Check your email field.').isEmail();
            req.check('password', 'Password is required.').notEmpty();

            return req.validationErrors();
        },
    },

    '/users/refresh-token': {
        POST: (req) => {
            req.check('refreshToken', 'Refresh-token is required.').notEmpty();

            return req.validationErrors();
        },
    },

    '/users/confirm-email/:token': {
        GET: (req) => {
            req.check('token', 'Token is required.').notEmpty();

            return req.validationErrors();
        },
    },

    '/users/self': {
        GET: (req) => {
            req.check('authorization', 'Access token is required').notEmpty();

            return req.validationErrors();
        },
    },

    '/articles': {
        POST: (req) => {
            req.check('authorization', 'Access token is required').notEmpty();
            req.check('title', 'Title is required.').notEmpty();

            return req.validationErrors();
        },
    },

    '/articles/by-user/:userId': {
        GET: (req) => {
            req.check('userId', 'User\'s id is required.').notEmpty();

            return req.validationErrors();
        },
    },

    '/articles/self': {
        GET: (req) => {
            req.check('authorization', 'Access token is required').notEmpty();

            return req.validationErrors();
        },
    },

    '/articles/:id': {
        GET: (req) => {
            req.check('id', 'Id is required.').notEmpty();

            return req.validationErrors();
        },

        PUT: (req) => {
            req.check('title', 'Title must be string.').optional().isString();

            return req.validationErrors();
        },

        DELETE: (req) => {
            req.check('authorization', 'Access token is required').notEmpty();
            req.check('id', 'Id is required.').notEmpty();

            return req.validationErrors();
        },
    },
};
