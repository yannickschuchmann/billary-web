import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import {FlatButton} from 'material-ui/lib';
import Folder from 'material-ui/lib/svg-icons/file/folder';
import FolderOpen from 'material-ui/lib/svg-icons/file/folder-open';
import IconButton from 'material-ui/lib/icon-button';
import Play from 'material-ui/lib/svg-icons/av/play-arrow';


class ProjectItem extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
    onUnfold: PropTypes.func,
    isSelected: PropTypes.bool,
    item: PropTypes.object.isRequired,
    children: PropTypes.node,
    ui: PropTypes.object,
    updateUI: PropTypes.func
  };

  handleClick(fn, e) {
    e.stopPropagation();
    fn();
  };

  render() {
    const item = this.props.item;

    return (
      <li className="project-listing-item">
        <div className="actions">
          <FlatButton
            className="item-button"
            icon={item.unfolded ? <FolderOpen /> : <Folder />}
            label={item.name}
            onClick={(e) => this.handleClick(() => {
              this.props.onUnfold();
            }, e)}
          />
          <IconButton
            className="action-button"
            onClick={(e) => this.handleClick(this.props.onSelect, e)}>
            <Play />
          </IconButton>
        </div>
        <ul>
          {item.unfolded ? this.props.children : ""}
        </ul>
      </li>
    );
  };
}


export default ui({state: {}})(ProjectItem);
