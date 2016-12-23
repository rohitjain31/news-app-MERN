import React, {Component} from 'react';

import AppNav from '../../components/appbar';
import NewsArticles from '../../components/articles';
import {fetchMyHeadlines} from '../../actions/index';
import './myheadline.css';

export default class MyHeadlines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myHeadlines: []
    };
  }

  // fetching all headlines of a particlualr source
  componentDidMount() {
    const headlines = fetchMyHeadlines();
    headlines.then((response) => {
      if(response.data) {
        this.setState({myHeadlines: response.data});
      }
    });
  }

  render() {
    return (
      <div>
        <AppNav />
        {this.state.myHeadlines.length > 0
        ? <NewsArticles
          allArticles={this.state.myHeadlines}
          myHeadlineSection={true}
         />
       : null
      }
      </div>
    );
  }
}
