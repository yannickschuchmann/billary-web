import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import objectAssign from 'object-assign';
import _ from 'lodash';
import {moment,minutesToCounterString} from '../../businessLogic/calendarHelper';
import {FlatButton} from 'material-ui/lib';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import TimePicker from 'material-ui/lib/time-picker/time-picker';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import TextFieldLabel from 'material-ui/lib/TextField/TextFieldLabel';
import Divider from 'material-ui/lib/divider';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

class TimeEntryForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    entry: PropTypes.object,
    projects: PropTypes.array.isRequired,
    ui: PropTypes.object,
    updateUI: PropTypes.func
  };

  componentWillMount() {
    let entry = {};
    if (this.props.entry) {
      entry = objectAssign({}, this.props.entry, {
        started_at: moment(this.props.entry.started_at).seconds(0).format(),
        stopped_at: moment(this.props.entry.stopped_at).seconds(0).format()
      });
    }
    this.props.updateUI({entry});
  };

  changeDate(date, _time) {
    const time = moment(_time);
    return moment(date).set({
      hour: time.hour(),
      minute: time.minute(),
      second: time.second()
    }).toDate().toString();
  };

  handleChangeStartedAtDate(err, _date) {
    this.handleChangeStartedAt(this.changeDate(_date, this.props.ui.entry.started_at));
  };

  handleChangeStoppedAtDate(err, _date) {
    this.handleChangeStoppedAt(this.changeDate(_date, this.props.ui.entry.stopped_at));
  };

  handleChangeStartedAtTime(err, time) {
    this.handleChangeStartedAt(time);
  };

  handleChangeStoppedAtTime(err, time) {
    this.handleChangeStoppedAt(time);
  };

  handleChangeStartedAt(date) {
    this.props.updateUI("entry", objectAssign({}, this.props.ui.entry, {
      started_at: date
    }));
  };

  handleChangeStoppedAt(date) {
    this.props.updateUI("entry", objectAssign({}, this.props.ui.entry, {
      stopped_at: date
    }));
  };

  submit(e) {
    e.preventDefault();
    let entry = objectAssign({}, this.props.ui.entry, {
      started_at: moment.utc(this.props.ui.entry.started_at).toISOString(),
      stopped_at: moment.utc(this.props.ui.entry.stopped_at).toISOString()
    });


    entry = _.omit(entry, ["duration", "projectNames"]);
    this.props.onSubmit(entry);
    return false;
  }

  onProjectChange(e, index, value) {
    this.props.updateUI("entry", objectAssign({}, this.props.ui.entry, {
      project_id: value
    }));
  };

  render() {
    const entry = this.props.ui.entry || {};
    const startedAt = entry.started_at ? new Date(entry.started_at) : null;
    const stoppedAt = entry.stopped_at ? new Date(entry.stopped_at) : null;
    const diff = moment(entry.stopped_at).diff(moment(entry.started_at), 'minutes');
    const dateError = diff <= 0 ? "From date must be before Till date" : "";

    const projectOptions = this.props.projects.map((project, i) => (
      <MenuItem
        key={i}
        value={project.id}
        label={project.name}
        primaryText={project.name} />
    ));

    return (
      <div className="time-entry-form">
        <form onSubmit={this.submit}>
          <SelectField
            fullWidth={true}
            value={entry.project_id}
            onChange={this.onProjectChange.bind(this)}
            floatingLabelText="Choose Project"
            >
            {projectOptions}
          </SelectField>

          <div className="duration">
            {minutesToCounterString(diff)}
          </div>
          <div className="dates">
            <div>
              From:
              <DatePicker
                mode="landscape"
                hintText="Day"
                autoOk={true}
                value={startedAt}
                onChange={this.handleChangeStartedAtDate.bind(this)}
                />
              <TimePicker
                format="24hr"
                hintText="Time"
                errorText={dateError}
                value={startedAt}
                onChange={this.handleChangeStartedAtTime.bind(this)}
                />
            </div>
            <div>
              Till:
              <DatePicker
                mode="landscape"
                hintText="Day"
                autoOk={true}
                value={stoppedAt}
                onChange={this.handleChangeStoppedAtDate.bind(this)}
                />
              <TimePicker
                format="24hr"
                hintText="Stopped at"
                errorText={dateError}
                value={stoppedAt}
                onChange={this.handleChangeStoppedAtTime.bind(this)}
                />
            </div>
          </div>

          <FlatButton
            label="Save"
            onClick={this.submit.bind(this)}
            primary={true}
          />
        </form>
      </div>
    );
  };
}


export default ui({
  state: {
    entry: {}
  }
})(TimeEntryForm);
