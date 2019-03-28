const {
    createArticle,
    getArticleById,
    getAllArticles,
    getArticlesByUserId,
    updateArticleById,
    deleteArticleById,
} = require('../services/article.service');

exports.postArticle = async (req, res) =>
    res.json(await createArticle(req.query.title, req.file, req.decodedId));

exports.getArticlesByUserId = async (req, res) =>
    res.json(await getArticlesByUserId(req.params.userId));

exports.getSelfArticles = async (req, res) =>
    res.json(await getArticlesByUserId(req.decodedId));

exports.getArticleById = async (req, res) =>
    res.json(await getArticleById(req.params.id));

exports.getAllArticles = async (req, res) =>
    res.json(await getAllArticles());

exports.putArticleById = async (req, res) =>
    res.json(await updateArticleById(req.query.title, req.decodedId, req.file, req.params.id));

exports.deleteArticleById = async (req, res) =>
    res.json(await deleteArticleById(req.decodedId, req.params.id));
