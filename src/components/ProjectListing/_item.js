import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import {FlatButton} from 'material-ui/lib';
import Arrow from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-right';
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
    onSelectAndStart: PropTypes.func,
    onUnfold: PropTypes.func,
    onEdit: PropTypes.func,
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
          <IconButton
            className=""
            style={{
              transform: `rotateZ(${item.unfolded ? "90deg" : "0deg"})`,
              transition: "transform .1s ease-out"
            }}
            onClick={(e) => this.handleClick(() => {
              this.props.updateUI("isCreating", false);
              this.props.onUnfold();
            }, e)}>
            <Arrow />
          </IconButton>
          <FlatButton
            className="item-button"
            label={item.name}
            onClick={(e) => this.handleClick(this.props.onSelect, e)}
          />
          <IconButton
            className="action-button"
            onClick={(e) => this.handleClick(this.props.onSelectAndStart, e)}>
            <Play />
          </IconButton>
          <IconMenu
            className="action-button"
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            useLayerForClickAway={true}
          >
            <MenuItem
              primaryText="Edit"
              onClick={(e) => this.handleClick(this.props.onEdit, e)} />
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
