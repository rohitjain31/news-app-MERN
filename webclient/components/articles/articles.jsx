import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
// import {hashHistory} from 'react-router';
import moment from 'moment';

import { addArticle, deleteMyHeadline, updateHeadline } from '../../actions';
import { CommentBox } from './commentbox';
import './article.css';

export default class NewsArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCommentBox: false,
      isUpdateRequest: false,
      savedToDatabase: false,
      commentArticle: {},
      savedArticleId: null,
      openSnackBar: false,
      snackBarMessage: '',
      allArticles: this.props.allArticles.map(article => ({
        ...article,
        isSaved: false,
        notLoggedIn: false
      }))
    };
  }

  // Saving headlines to database
  handleSaveInfo = (article, comment) => {
    article.comments = comment;
    const data = addArticle(article);
    data.then((response) => {
      if(response.data) {
        const newArticles = this.state.allArticles.map((item) => {
          if (article.articleId === item.articleId) {
            return {
              ...item,
              isSaved: true
            };
          }
          return item;
        });
        this.setState({
          allArticles: newArticles
        }, () => {
          this.setState({
            savedToDatabase: true,
            openSnackBar: true,
            snackBarMessage: 'Headline saved to database'
          });
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // hiding snackbar
  handleRequestClose = () => {
    this.setState({
      openSnackBar: false,
      snackBarMessage: ''
    });
  };

  // handle comment box dialouge when user is logged in or not
  handleComment = (article) => {
    const userLoggedIn = window.localStorage.getItem('loggedIn');
    if(userLoggedIn === 'true') {
      const tempArticle = this.state.allArticles.map((item) => {
        if (article.articleId === item.articleId) {
          return {
            ...item,
            notLoggedIn: false
          };
        }
        return item;
      });
      this.setState({
        openCommentBox: true,
        commentArticle: article,
        allArticles: tempArticle
      });
    }
    else {
      const tempArticle = this.state.allArticles.map((item) => {
        if (article.articleId === item.articleId) {
          return {
            ...item,
            notLoggedIn: true
          };
        }
        return item;
      });
      this.setState({allArticles: tempArticle});
    }
  }

  // save headline to database when comment is added
  handleCommentbox = (data, article) => {
    this.setState({openCommentBox: false});
    this.handleSaveInfo(article, data);
  }

  // closing comment box dialouge
  closeCommentBox = () => {
    this.setState({openCommentBox: false});
  }

  // handling comment box of update of saved headlines in database
  handleUpdateInfo = (article) => {
    const userLoggedIn = window.localStorage.getItem('loggedIn');
    if(userLoggedIn === 'true') {
      const tempArticle = this.state.allArticles.map((item) => {
        if (article.articleId === item.articleId) {
          return {
            ...item,
            notLoggedIn: false
          };
        }
        return item;
      });
      this.setState({allArticles: tempArticle});
      this.setState({
        openCommentBox: true,
        commentArticle: article,
        isUpdateRequest: true
      });
    }
    else {
      const tempArticle = this.state.allArticles.map((item) => {
        if (article.articleId === item.articleId) {
          return {
            ...item,
            notLoggedIn: true
          };
        }
        return item;
      });
      this.setState({allArticles: tempArticle});
    }
  }

  // handling update of saved headlines in database
  updateCommentBox = (data, article) => {
    article.comments = data;
    this.setState({
      openCommentBox: false,
      isUpdateRequest: false
    });
    const temp = updateHeadline(article);
    temp.then((response) => {
      if(response) {
        const tempArticle = this.state.allArticles.map((item) => {
          if (article.articleId === item.articleId) {
            return {
              ...item,
              comments: article.comments
            };
          }
          return item;
        });
        this.setState({allArticles: tempArticle});
        this.setState({
          openSnackBar: true,
          snackBarMessage: 'Updated successfully'
        });
      }
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  }

  // handling delete headlines of saved headlines in database
  handleDeleteInfo = (article) => {
    const userLoggedIn = window.localStorage.getItem('loggedIn');
    if(userLoggedIn === 'true') {
      const articleId = article.articleId;
      const data = deleteMyHeadline(articleId);
      data.then((response) => {
        if(response.data === 'removed successfully...') {
            const tempArr = this.state.allArticles.filter((item) => item.articleId !== articleId);
            this.setState({
              allArticles: tempArr,
              openSnackBar: true,
              snackBarMessage: 'Headline is deleted successfully!!'
            });
          // hashHistory.push('/myheadline');
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else {
      const tempArticle = this.state.allArticles.map((item) => {
        if (article.articleId === item.articleId) {
          return {
            ...item,
            notLoggedIn: true
          };
        }
        return item;
      });
      this.setState({allArticles: tempArticle});
    }
  }

  render() {
    return (
      <div>
        {this.state.allArticles.map((article) => {
          return (
            <div
              key={article.articleId}
              className='newsContainer'
            >
              <img
                src={article.urlToImage}
                alt={article.title}
                className='newsPhoto'
              />
              <div className='newsInfoContainer'>
                <a href={article.url} className='newsLink'>
                  <h3 className='newsTitle'>
                    {article.title}
                  </h3>
                </a>
                <div className='newsPublished'>
                  <span>
                    {moment(article.publishedAt, 'YYYY-MM-DD').format('MMM Do YYYY')}
                  </span>
                </div>
                <div className='newsDescription'>
                  {article.description}
                </div>
                <div className="spacer" />
                <div className='comments'>
                  {article.comments}
                </div>
                <div className='saveNews'>
                  {this.props.myHeadlineSection
                   ? <div className='headLineSection'>
                      <RaisedButton
                        label='Update'
                        primary={true}
                        className='updateSection'
                        onTouchTap={() => {
                          this.handleUpdateInfo(article);
                        }}
                      />
                      <RaisedButton
                        label='Delete'
                        primary={true}
                        className='deleteSection'
                        onTouchTap={() => {
                          this.handleDeleteInfo(article);
                        }}
                      />
                      <div className='loginMessage'>
                         {article.notLoggedIn ? 'LOGIN BEFORE ANY OPERATION' : ''}
                      </div>
                  </div>
                   : <div className='headLineSection'>
                       <RaisedButton
                         label={article.isSaved ? 'saved' : 'comment & save'}
                         className='saveSection'
                         primary={true}
                         disabled={article.isSaved}
                         onTouchTap={() => {
                           this.handleComment(article, '');
                         }}
                       />
                     <div className='loginMessage'>
                        {article.notLoggedIn ? 'LOGIN BEFORE ANY OPERATION' : ''}
                      </div>
                    </div>
                   }
                </div>
              </div>
              <Divider />
            </div>
          );
        })}
        <Snackbar
          open={this.state.openSnackBar}
          message={this.state.snackBarMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      <CommentBox
        openDiag={this.state.openCommentBox}
        article={this.state.commentArticle}
        handleCommentBox={this.handleCommentbox}
        onRequestClose={this.closeCommentBox}
        isUpdateRequest={this.state.isUpdateRequest}
        updateCommentBox={this.updateCommentBox}
      />
      </div>
    );
  }
}

NewsArticles.propTypes = {
  // allArticles: React.PropTypes.array
  // myHeadlineSection: React.PropTypes.boo
};
