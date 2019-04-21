const { unlink } = require('fs');

const Article = require('../models/article.model');
const User = require('../models/user.model');

class ArticleService {
    static async createArticle(title, description, id = '5c9f4d21ebe6a46ac222cde9') {
        const user = await User.findById(id);

        if (!user) throw new Error('User not found.');

        if (!title && !description) throw new Error('Title or description are required.');

        const newArticle = await new Article({
            title,
            description,
            authorId: user.id,
            author: `${user.firstName} ${user.surname}`,
        });

        if (!newArticle) throw new Error('Incorrect data for article.');

        await newArticle.save();

        return newArticle.toClient();
    }

    static async setArticleFile(file, attribute, id, userId = '5c9f4d21ebe6a46ac222cde9') {
        const article = {};
        const checkedArticle = await ArticleService.checkUserArticle(id, userId);
        if (file && file.filename) {
            if (attribute === 'file') {
                if (checkedArticle.file) {
                    await unlink(`client/public/files/${checkedArticle.file}`, (err) => { if (err) throw err; });
                }
            } else if (attribute === 'image') {
                if (checkedArticle.image) {
                    await unlink(`client/public/files/${checkedArticle.image}`, (err) => { if (err) throw err; });
                }
            }

            if (attribute === 'file') article.file = file.filename;
            if (attribute === 'image') article.image = file.filename;

            article.title = checkedArticle.title;
            article.description = checkedArticle.description;

            const updatedArticle = await Article.findByIdAndUpdate(id, article, { new: true });

            if (!updatedArticle) throw new Error('That article not updated.');

            return updatedArticle.toClient();
        }

        throw new Error('File is required.');
    }

    static async setArticleLike(id) {
        const article = await Article.findByIdAndUpdate(id, { $inc: { likes: 1 } });

        if (!article) throw new Error('Article not updated with likes.');

        return article;
    }

    static async getArticlesByUserId(id) {
        const articles = await Article.find({ authorId: id });

        if (!articles) throw new Error('Articles not found.');

        if (articles.length === 0) return articles;

        return articles.map(article => article.toClient());
    }

    static async getArticleById(id) {
        const article = await Article.findById(id);

        if (!article) throw new Error('Article with this id not found.');

        return article.toClient();
    }

    static async getAllArticles() {
        const articles = await Article.find({});

        if (!articles) throw new Error('Articles not found.');

        return articles.map(article => article.toClient());
    }

    static async updateArticleById(title, description, id, userId = '5c9f4d21ebe6a46ac222cde9') {
        if (!title) throw new Error('Title is required.');
        const checkedArticle = await ArticleService.checkUserArticle(id, userId);

        checkedArticle.title = title;
        checkedArticle.description = description;

        const updatedArticle = await Article.findByIdAndUpdate(id, checkedArticle, { new: true });

        if (!updatedArticle) throw new Error('That article not updated.');

        return updatedArticle.toClient();
    }

    static async deleteArticleById(userId, id) {
        await ArticleService.checkUserArticle(id, userId);
        const deletedArticle = await Article.findByIdAndDelete(id);

        if (!deletedArticle) throw new Error('Article not deleted.');

        if (deletedArticle.file) {
            await unlink(`client/public/files/${deletedArticle.file}`, (err) => { if (err) throw err; });
        }

        if (deletedArticle.image) {
            await unlink(`client/public/files/${deletedArticle.image}`, (err) => { if (err) throw err; });
        }

        return deletedArticle;
    }

    static async checkUserArticle(articleId, userId) {
        const article = await Article.findById(articleId);

        if (!article) throw new Error('Article with this id not found.');

        if (article.authorId !== userId) throw new Error('It\'s not that user\'s article');

        return article;
    }
}

module.exports = ArticleService;
