const { unlink } = require('fs');

const Article = require('../models/article.model');
const User = require('../models/user.model');

class ArticleService {
    static async createArticle(title, file, id) {
        if (file && file.filename) {
            const user = await User.findById(id);

            if (!user) throw new Error('User not found.');

            if (!title) throw new Error('Title is required.');

            const newArticle = await new Article({
                title,
                file: file.filename,
                authorId: user.id,
                author: `${user.firstName} ${user.surname}`,
            });

            if (!newArticle) throw new Error('Incorrect data for article.');

            await newArticle.save();

            return newArticle.toClient();
        }

        throw new Error('File is required.');
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

    static async updateArticleById(title, userId, file, id) {
        const article = {};
        const checkedArticle = await ArticleService.checkUserArticle(id, userId);

        if (title) article.title = title;
        if (file && file.filename) {
            if (checkedArticle.file) {
                await unlink(`client/public/files/${checkedArticle.file}`, (err) => { if (err) throw err; });
            }

            article.file = file.filename;
        }

        const updatedArticle = await Article.findByIdAndUpdate(id, article, { new: true });

        if (!updatedArticle) throw new Error('That article not updated.');

        return updatedArticle;
    }

    static async deleteArticleById(userId, id) {
        await ArticleService.checkUserArticle(id, userId);
        const deletedArticle = await Article.findByIdAndDelete(id);

        if (!deletedArticle) throw new Error('Article not deleted.');

        if (deletedArticle.file) {
            await unlink(`client/public/files/${deletedArticle.file}`, (err) => { if (err) throw err; });
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
