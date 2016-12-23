import React from 'react';
import { getAllArticles } from '../../actions/index';

import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

export default class SearchArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceId: ''
    };
  }

  // setting source id state based on the searched news name
  handleUpdateSearch = (searchText, dataSource) => {
    dataSource.filter((data) => {
      if(data.name === searchText) {
          this.setState({sourceId: data.id});
          return;
      }
    });
  }

  // handle searching of all articles based on give news source id
  handleSearch = () => {
    let newsSource = this.state.sourceId;
    // let newsSource = 'abc-news-au';
    const data = getAllArticles(newsSource);
    data.then((response) => {
           this.props.articles(response);
         });
  }

  render() {
    const style = {
      searchContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20
      },
      button: {
        margin: 30
      }
    };

    const allSource = this.props.news.map(function(news) {
      return {
        id: news.id,
        name: news.name
      };
    });

    const allSourceConfig = {
      text: 'name',
      value: 'id'
    };

    return (
      <div style={style.searchContainer}>
        <AutoComplete
          floatingLabelText="search with news source"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={allSource}
          dataSourceConfig={allSourceConfig}
          openOnFocus={true}
          onUpdateInput={this.handleUpdateSearch}
        />
        <RaisedButton
          label="Search"
          primary={true}
          style={style.button}
          onTouchTap={this.handleSearch}
        />
      </div>
    );
  }
}

SearchArticle.propTypes = {
  // articles: React.PropTypes.array,
  // news: React.PropTypes.array
};
