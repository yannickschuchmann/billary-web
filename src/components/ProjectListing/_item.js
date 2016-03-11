import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import {FlatButton} from 'material-ui/lib';
import Folder from 'material-ui/lib/svg-icons/file/folder';
import FolderOpen from 'material-ui/lib/svg-icons/file/folder-open';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import ButtonFormSwitch from '../ProjectForm/buttonFormSwitch';
import Play from 'material-ui/lib/svg-icons/av/play-arrow';


class ProjectItem extends Component {
  static propTypes = {
    onNew: PropTypes.func,
    onSelect: PropTypes.func,
    onUnfold: PropTypes.func,
    onDelete: PropTypes.func,
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

    let children = Array.apply(undefined,this.props.children);
    children.push(
      <ButtonFormSwitch
        key="ButtonFormSwitch"
        showForm={this.props.ui.isCreating}
        onNew={this.props.onNew}
        onClick={() => this.props.updateUI("isCreating", true)}
      />);
    return (
      <li className="project-listing-item">
        <div className="actions">
          <FlatButton
            className="item-button"
            icon={item.unfolded ? <FolderOpen /> : <Folder />}
            label={item.name}
            onClick={(e) => this.handleClick(() => {
              this.props.updateUI("isCreating", false);
              this.props.onUnfold();
            }, e)}
          />
          <IconButton
            className="action-button"
            onClick={(e) => this.handleClick(this.props.onSelect, e)}>
            <Play />
          </IconButton>
          <IconMenu
            className="action-button"
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            useLayerForClickAway={true}
          >
            <MenuItem primaryText="Edit" />
            <MenuItem
              primaryText="Delete"
              onClick={(e) => this.handleClick(this.props.onDelete, e)} />
          </IconMenu>
        </div>
        <ul>
          {item.unfolded ? children : ""}
        </ul>
      </li>
    );
  };
}


export default ui({state: {isCreating: false}})(ProjectItem);
