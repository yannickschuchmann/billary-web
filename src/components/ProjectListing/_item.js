import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import classNames from 'classnames';
import { MenuItem, SelectField, FlatButton, IconButton, IconMenu } from 'material-ui/lib';
import Arrow from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-right';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import Play from 'material-ui/lib/svg-icons/av/play-arrow';

import {
  moment,
  secondsToCounterString,
  minutesToCounterString
} from '../../businessLogic/calendarHelper';
import ButtonFormSwitch from '../ProjectForm/buttonFormSwitch';

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
    const {
      isAssigning,
      item,
      showAssignField,
      showDurations,
      clients
    } = this.props;

    let children = Array.apply(undefined,this.props.children);
    if (this.props.showNewButton) {
      children.push(
        <ButtonFormSwitch
          key="ButtonFormSwitch"
          showForm={this.props.ui.isCreating}
          onNew={this.props.onNew}
          onClick={() => this.props.updateUI("isCreating", true)}
          />);
    }

    const startButton = this.props.showStartButton ? (
      <IconButton
        className="action-button col-start"
        onClick={(e) => this.handleClick(this.props.onSelectAndStart, e)}>
        <Play />
      </IconButton>
    ) : "";

    let assignField = "";
    if (showAssignField) {
      const clientOptions = [(
        <MenuItem
          key={0}
          value={null}
          primaryText={"-"} />
      )].concat(clients.map((item, i) => (
        <MenuItem
          key={i + 1}
          value={item.id}
          primaryText={item.name} />
      )));

      assignField = isAssigning == item.id ? "loading" : (
        <SelectField
          disabled={this.props.disableAssignField}
          value={item.client_id}
          className="col-client"
          onChange={this.props.onAssign.bind(this, item.id)}
          errorStyle={{
            top: "100%",
            bottom: "auto",
            position: "absolute"
          }}
          >
          {clientOptions}
        </SelectField>
      );
    }

    const durations = showDurations ? [
      <div className="duration open col-open" key="duration-open">
        {minutesToCounterString(item.open_duration)}
      </div>,
      <div className="duration total col-total" key="duration-total">
        {minutesToCounterString(item.duration)}
      </div>
    ] : "";

    return (
      <li
        className={classNames("project-listing-item", this.props.className)}
        style={this.props.style}>
        <div className="actions">
          <IconButton
            className="col-unfold"
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
            className="item-button col-name"
            label={item.name}
            onClick={(e) => this.handleClick(this.props.onSelect, e)}
          />
          {durations}
          {assignField}
          {startButton}
          <IconMenu
            className="action-button col-actions"
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
