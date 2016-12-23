import React from 'react';
import uuid from 'node-uuid';

import AppNav from '../../components/appbar';
import SearchArticle from '../../components/searchnews';
import NewsArticles from '../../components/articles';
// import CircularProgress from 'material-ui/CircularProgress';
import {getAllNewsSource} from '../../actions/index';

// This is a view layout, hence avoid putting any business logic
export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allSource: [],
			totalArticles: []
		};
	}

	// Fetch all source and setting a window level varaible to false if it is not already defined
	componentDidMount() {
		const sources = getAllNewsSource();

		sources.then((response) => {
			if(response.data) {
					this.setState({allSource: response.data.sources});
				}
		});
		if(window.localStorage.getItem('loggedIn') === null) {
			window.localStorage.setItem('loggedIn', false);
		}
	}

	// handling fetching of articles and setting it to a state
	handleArticles = (response) => {
		const tempSource = response.data.articles.map((article) => {
			const id = uuid.v4();
			article.articleId = id;
			return article;
		});
		this.setState({totalArticles: tempSource});
		// this.setState({totalArticles: response.data.articles});
	}

	render () {
		return (
			<div>
				<AppNav />
				<SearchArticle news={this.state.allSource} articles={this.handleArticles} />
				{this.state.totalArticles.length > 0
					? <NewsArticles allArticles={this.state.totalArticles} />
				: null
				}
			</div>
		);
	}
}
