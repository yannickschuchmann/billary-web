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
        stopped_at: this.props.entry.stopped_at ?
          moment(this.props.entry.stopped_at).seconds(0).format() :
          null,
        isNew: false
      });
    } else {
      entry.isNew = true;
    }
    this.props.updateUI({entry});
  };

  changeOnlyDate(date, _time) {
    const time = moment(_time);
    return moment(new Date(date)).set({
      hour: time.hour(),
      minute: time.minute(),
      second: time.second()
    }).toDate().toString();
  };

  handleChangeStartedAtDate(err, _date) {
    this.handleChangeStartedAt(this.changeOnlyDate(_date, this.props.ui.entry.started_at));
  };

  handleChangeStoppedAtDate(err, _date) {
    this.handleChangeStoppedAt(this.changeOnlyDate(_date, this.props.ui.entry.stopped_at));
  };

  handleChangeStartedAtTime(err, time) {
    this.handleChangeStartedAt(moment(new Date(time)).set({second: 0}).toDate().toString());
  };

  handleChangeStoppedAtTime(err, time) {
    this.handleChangeStoppedAt(moment(new Date(time)).set({second: 0}).toDate().toString());
  };

  handleChangeStartedAt(date) {
    this.props.updateUI({
      entry: objectAssign({}, this.props.ui.entry, {
        started_at: date
      }),
      errors: objectAssign({}, this.props.ui.errors, {
        date: this.validateDate(date, this.props.ui.entry.stopped_at)
      })
    });
  };


  handleChangeStoppedAt(date) {
    this.props.updateUI({
      entry: objectAssign({}, this.props.ui.entry, {
        stopped_at: date
      }),
      errors: objectAssign({}, this.props.ui.errors, {
        date: this.validateDate(this.props.ui.entry.started_at, date)
      })
    });
  };

  submit(e) {
    e.preventDefault();

    const startedAt = this.props.ui.entry.started_at;
    const stoppedAt = this.props.ui.entry.stopped_at;
    let entry = objectAssign({}, this.props.ui.entry, {
      started_at: startedAt ? moment.utc(new Date(startedAt)).toISOString() : null,
      stopped_at: stoppedAt ? moment.utc(new Date(stoppedAt)).toISOString() : null
    });
    const errors = this.validate(entry);

    this.props.updateUI({errors});

    if (errors.date == "" && errors.project == "") {
      entry = _.omit(entry, [
        "duration",
        "duration_overhang",
        "started_at_overhang",
        "stopped_at_overhang",
        "projectNames"
      ]);
      this.props.onSubmit(entry);
    }

    return false;
  };

  validate(entry) {
    return objectAssign({}, this.props.ui.errors, {
      project: !entry.project_id ? "Project must be set" : "",
      date: this.validateDate(entry.started_at, entry.stopped_at)
    });
  };

  validateDate(started_at, stopped_at) {
    if (!started_at || !stopped_at) return "Both dates must be set";

    const diff = moment(new Date(stopped_at)).diff(moment(new Date(started_at)), 'minutes');
    return diff <= 0 ? "From date must be before Till date" : "";
  };

  onProjectChange(e, index, value) {
    const entry = objectAssign({}, this.props.ui.entry, {
      project_id: value
    });

    this.props.updateUI({
      entry,
      errors: this.validate(entry)
    });
  };

  render() {
    const entry = this.props.ui.entry || {};
    const startedAt = entry.started_at ? new Date(entry.started_at) : null;
    const stoppedAt = entry.stopped_at ? new Date(entry.stopped_at) : null;
    const diff = (entry.started_at &&
                  entry.stopped_at &&
                  this.props.ui.errors.date == "") ?
      moment(stoppedAt).diff(moment(startedAt), 'minutes') :
      0;

    const isRunning = !stoppedAt && !entry.isNew;
    const duration = isRunning ? "running" : minutesToCounterString(diff);

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
            errorText={this.props.ui.errors.project}
            value={entry.project_id}
            onChange={this.onProjectChange.bind(this)}
            floatingLabelText="Choose Project"
            errorStyle={{
              top: "100%",
              bottom: "auto",
              position: "absolute"
            }}
            >
            {projectOptions}
          </SelectField>

          <div className="duration">
            {duration}
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
                errorText={this.props.ui.errors.date}
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
                disabled={isRunning}
                value={stoppedAt}
                onChange={this.handleChangeStoppedAtDate.bind(this)}
                />
              <TimePicker
                format="24hr"
                hintText="Stopped at"
                errorText={this.props.ui.errors.date}
                disabled={isRunning}
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
    errors: {
      date: "",
      project: ""
    },
    entry: {}
  }
})(TimeEntryForm);
