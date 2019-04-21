const {
    createUser,
    updateUser,
    loginUser,
    getUserById,
    getAllUsers,
    getSelfData,
    selfDelete,
    confirmEmail,
    refreshToken,
} = require('../services/user.service');

exports.postUserLogin = async (req, res) =>
    res.json(await loginUser(req.body.email, req.body.password));

exports.postUser = async (req, res) => res.json(await createUser(req.body));

exports.putUser = async (req, res) => res.json(await updateUser(req.body, req.decodedId));

exports.getUserById = async (req, res) => res.json(await getUserById(req.params.id));

exports.getUsers = async (req, res) => res.json(await getAllUsers());

exports.getSelfUser = async (req, res) => res.json(await getSelfData(req.decodedId));

exports.getConfirmEmail = async (req, res) => res.json(await confirmEmail(req.params.token));

exports.deleteSelfUser = async (req, res) => res.json(await selfDelete(req.decodedId));

exports.postRefreshToken = async (req, res) => res.josn(await refreshToken(req.body.refreshToken));
