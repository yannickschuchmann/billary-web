import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import _ from 'lodash';
import objectAssign from 'object-assign';
import * as actions from '../actions';
import { Link, IndexLink } from 'react-router';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import { MenuItem, SelectField } from 'material-ui/lib';

class Assignments extends Component {
  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.getProjects();
    this.props.actions.getClients();
  };

  assignProject(projectIndex, e, index, value) {
    const { assignments, actions } = this.props;
    const project = objectAssign({}, assignments.projects[projectIndex], {
      client_id: value
    });
    actions.assignClientToProject(project).then(() => actions.getProjects({top_level: true}));
  };

  render() {
    const { clients, isFetching, isAssigning } = this.props.assignments;

    if (isFetching) return (<span></span>);

    const projects = this.props.tracking.tree;

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

    const rows = projects.map((item, i) => (
      <TableRow key={i} style={{
          height: 74
        }}>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn>{`${item.child_ids.length} child projects`}</TableRowColumn>
        <TableRowColumn>
          {isAssigning == item.id ? "loading" : (
            <SelectField
              value={item.client_id}
              onChange={this.assignProject.bind(this, i)}
              errorStyle={{
                top: "100%",
                bottom: "auto",
                position: "absolute"
              }}
              >
              {clientOptions}
            </SelectField>
          )}
        </TableRowColumn>
      </TableRow>
    ))

    return (
      <div id="assignments-container">
        <Table selectable={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn colSpan="2">Root project</TableHeaderColumn>
              <TableHeaderColumn>Client</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            preScanRows={false}
            displayRowCheckbox={false}>
            {rows}
          </TableBody>
        </Table>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    assignments: state.assignments,
    tracking: state.tracking.view
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ui({
  key: "assignments-container",
  state: {}
})(Assignments));
