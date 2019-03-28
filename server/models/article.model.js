const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {
        required: true,
        minlength: 1,
        type: String,
        trim: true,
    },
    file: {
        required: true,
        type: String,
        minlength: 3,
    },
    authorId: {
        required: true,
        minlength: 1,
        trim: true,
        type: String,
    },
    author: {
        required: true,
        minlength: 2,
        trim: true,
        type: String,
    },
}, { timestamps: { createdAt: true, updatedAt: true } });

ArticleSchema.methods.toClient = function () {
    const obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;

    return obj;
};

const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;
