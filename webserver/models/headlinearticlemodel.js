const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const newsArticleSchema = new Schema({
    articleId: String,
    author: String,
    comments: String,
    description: String,
    publishedAt: String,
    title: String,
    url: String,
    urlToImage: String
});

const NewsArticle = mongoose.model('newsArticle', newsArticleSchema);

module.exports = NewsArticle;
