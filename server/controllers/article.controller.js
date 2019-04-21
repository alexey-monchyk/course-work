const {
    createArticle,
    getArticleById,
    getAllArticles,
    getArticlesByUserId,
    setArticleFile,
    updateArticleById,
    deleteArticleById,
    setArticleLike,
} = require('../services/article.service');

exports.postArticle = async (req, res) =>
    res.json(await createArticle(req.body.title, req.body.description));

exports.getArticlesByUserId = async (req, res) =>
    res.json(await getArticlesByUserId(req.params.userId));

exports.getSelfArticles = async (req, res) =>
    res.json(await getArticlesByUserId(req.decodedId));

exports.getArticleById = async (req, res) =>
    res.json(await getArticleById(req.params.id));

exports.getAllArticles = async (req, res) =>
    res.json(await getAllArticles());

exports.putArticleFile = async (req, res) =>
    res.json(await setArticleFile(req.file, 'file', req.params.id));

exports.putArticleImage = async (req, res) =>
    res.json(await setArticleFile(req.file, 'image', req.params.id));

exports.putArticleLike = async (req, res) =>
    res.json(await setArticleLike(req.params.id));

exports.putArticleById = async (req, res) =>
    res.json(await updateArticleById(req.body.title, req.body.description, req.params.id));

exports.deleteArticleById = async (req, res) =>
    res.json(await deleteArticleById(req.decodedId, req.params.id));
