import axios from 'axios';

// url to fetch data
const newsArticleUrl = 'https://newsapi.org/v1/articles';
const myApiKey = '136c0e971c4944429b9860239516629e';
const newsArticleSourceUrl = 'https://newsapi.org/v1/sources';

export function getAllNewsHeadlines() {
  // console.log('api called');
}

// fetching all the news source from News Api
export function getAllNewsSource() {
  let lang = 'en';
  const response = axios.get(`${newsArticleSourceUrl}/?language=${lang}`);
  return response;
}

// fetchhing all the articles of one news source
export function getAllArticles(newsSource) {
  const response = axios.get(`${newsArticleUrl}/?source=${newsSource}&apiKey=${myApiKey}`);
  return response;
}

// Save Headline in our database
export function addArticle(data) {
  const response = axios.post('/article', data);
  return response;
}

// fetch all the saved headline in our database
export function fetchMyHeadlines() {
  const response = axios.get('/article');
  return response;
}

// Delete a headline from database
export function deleteMyHeadline(articleId) {
  const response = axios.delete('/article/' + articleId);
  return response;
}

// update a headline in database
export function updateHeadline(article) {
  const response = axios.put('/article/' + article.articleId, article);
  return response;
}
