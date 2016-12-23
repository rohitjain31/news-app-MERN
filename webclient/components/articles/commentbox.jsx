import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export class CommentBox extends Component {
  constructor(props) {
    super(props);
  }

  handleClose = () => {
    const data = this.refs.commentText.getValue();
    if(this.props.isUpdateRequest) {
      this.props.updateCommentBox(data, this.props.article);
    }
    else {
      this.props.handleCommentBox(data, this.props.article);
    }
  };

  render() {
    const actions = [
      <FlatButton
        label="save"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    return (
      <div>
        <Dialog
          title="Add Comment"
          actions={actions}
          modal={false}
          onRequestClose={this.props.onRequestClose}
          open={this.props.openDiag}
        >
        <TextField
          floatingLabelText="comments"
          ref='commentText'
          fullWidth={true}
          multiLine={true}
          rows={3}
        />
        </Dialog>
      </div>
    );
  }
}

CommentBox.propTypes = {
  // onRequestClose: React.PropTypes.func,
  // openDiag: React.PropTypes.bool,
  // isUpdateRequest: React.PropTypes.bool,
  // updateCommentBox: React.PropTypes.func,
  // handleCommentBox: React.PropTypes.func,
  // article: React.PropTypes.array
};
