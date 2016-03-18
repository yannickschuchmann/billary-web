import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import FlatButton from 'material-ui/lib/flat-button';
import ArrowForward from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import {
  moment,
  secondsToCounterString,
  minutesToCounterString
} from '../../businessLogic/calendarHelper';
import Timer from 'material-ui/lib/svg-icons/image/timer';

class ProjectWrap extends Component {
  static propTypes = {
    children: PropTypes.node,
    duration: PropTypes.number,
    project: PropTypes.object,
    open: PropTypes.bool,
    index: PropTypes.number,
    ui: PropTypes.object,
    updateUI: PropTypes.func
  }

  render() {
    const item = this.props.project;
    const children = this.props.open ? (
      <div className="project-wrap-children">
        {this.props.children}
      </div>
    ) : "";

    const names = item.projectNames.map((name, i) => {
      return (
        <span className="name-item" key={i}>
          {name}
          {i != item.projectNames.length - 1 ? <ArrowForward/> : ""}
        </span>
      )
    });

    return (
      <div className="project-wrap">
        <FlatButton
          onClick={this.props.onToggle}
          fullWidth={true}
          className={"project-wrap-item"}
          style={{
            width: "100%",
            textAlign: "left"
          }}>
          <div className="index">{this.props.index}</div>
          <div className="name">{names}</div>
          <div className="duration"><Timer />{minutesToCounterString(this.props.duration)}</div>
        </FlatButton>
        {children}
      </div>
    )
  }
}

export default ui({
  state: {
  }
})(ProjectWrap);
