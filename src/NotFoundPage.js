import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)'
  }
});

class NotFoundPage extends Component {
  constructor() {
    super();
    this.state = { mouseOverEmoji: false }
  }

  renderEmoji() {
    if (this.state.mouseOverEmoji) {
      return (
        <Link to="/">
          <span role="img" aria-label="Thinking face"
              onMouseLeave={() => this.setState({ mouseOverEmoji: false })}>
            🤔
          </span>
        </Link>
      );
    } else {
      return (
        <span role="img" aria-label="Thinking face"
            onMouseEnter={() => this.setState({ mouseOverEmoji: true })}>
          🤔
        </span>
      );
    }
  }

  render() {
    return (
      <Fade in={true} timeout={500}>
        <div className={this.props.classes.root}>
          <Typography variant="display4">
            Page not found
          </Typography>
          <Typography variant="display4">
            { this.renderEmoji() }
          </Typography>
        </div>
      </Fade>
    );
  }
}

export default withStyles(styles)(NotFoundPage);
