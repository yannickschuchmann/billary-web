import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import objectAssign from 'object-assign';
import {moment} from '../../businessLogic/calendarHelper';
import DragHandle from 'material-ui/lib/svg-icons/editor/drag-handle';
import wheelEventPolyFill from '../../businessLogic/wheelHelper';

const hourScale = 100;
const spacingAround = 40; //px
const minuteInPx = hourScale / 60;

class VisualDay extends Component {
  static propTypes = {
    children: PropTypes.node,
    selectedDay: PropTypes.object,
    dragging: PropTypes.bool,
    rel: PropTypes.object,
    afterMinute: PropTypes.func
  };

  static defaultProps = {
    dragging: false,
    rel: null
  };
  state = { timeIndicatorX: null };

  constructor(props){
      super(props);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseUp = this.onMouseUp.bind(this);
      this.onWheel = this.onWheel.bind(this);
  }

  componentDidMount() {
    this.lastScrollPosition = -1;
    this.tick = window.requestAnimationFrame(this.renderScrollbar.bind(window, this));
    this.onResizeEvent = window.addEventListener('resize', () => {this.scrollContainerChanged = true});
    this.onWheelEvent = this.refs.scrollContainer.addEventListener('wheel', this.onWheel);
    setTimeout(this.setDefaultScroll.bind(this), 0);

    this.setupTimeIndicator(this.props.selectedDay);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ui.dragging && !prevProps.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.props.ui.dragging && prevProps.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  };

  componentWillReceiveProps(nextProps) {
    clearInterval(this.timeIndicatorInterval);
    this.setupTimeIndicator(nextProps.selectedDay);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.tick);
    window.removeEventListener('resize', this.onResizeEvent);
    this.refs.scrollContainer.removeEventListener('wheel', this.onWheel);
    clearInterval(this.timeIndicatorInterval);
  };

  setDefaultScroll() {
    const hour = 8;
    const scrollToHour = hour * hourScale;
    this.refs.scrollContainer.scrollLeft = scrollToHour;
  };

  renderScrollbar(comp, timestamp) {
    let elWidth;
    const el = comp.refs.scrollContainer;
    if (comp.props.ui.dragging && comp._dragX) {
      elWidth = el.getBoundingClientRect().width;
      const scrollDelta = comp._dragX - comp._dragStartX;
      const scrollDeltaInRelation = (scrollDelta / elWidth) * 2480;
      el.scrollLeft = comp._dragStartScroll + scrollDeltaInRelation;
    }

    if (comp.horiScrollDelta) {
      el.scrollLeft += comp.horiScrollDelta;
      comp.horiScrollDelta = null;
    }

    if (comp.props.ui.dragging &&
        !comp.scrollContainerChanged &&
        comp.lastScrollPosition == el.scrollLeft) {
      comp.tick = window.requestAnimationFrame(comp.renderScrollbar.bind(window, comp));
      return false;
    } else {
      elWidth = el.getBoundingClientRect().width;
      const contentWidth = comp.refs.container.getBoundingClientRect().width;
      const thumbWidth = (elWidth / contentWidth) * elWidth; // native width
      const scrollPercentage = el.scrollLeft / (contentWidth - elWidth);
      const thumbScroll = (elWidth - thumbWidth) * scrollPercentage;
      comp.lastScrollPosition = el.scrollLeft;
      comp.refs.thumb.style.width = `${thumbWidth}px`;
      comp.refs.thumb.style.transform = `translate3d(${thumbScroll}px,0,0)`;
      comp.tick = window.requestAnimationFrame(comp.renderScrollbar.bind(window, comp));

      comp.scrollContainerChanged = false;
    }
  };

  setupTimeIndicator(day) {
    if (moment(day).isSame(moment(), 'day')) {
      this.renderTimeIndicator(true);
      this.timeIndicatorInterval = setInterval(this.renderTimeIndicator.bind(this), 1000 * 60);
    } else {
      this.setState({timeIndicatorX: null});
    }
  };

  renderTimeIndicator(initial = false) {
    const el = this.refs.timeIndicator;
    const minutes = moment().diff(moment().startOf('day'), 'minute');
    const x = minutes * minuteInPx;
    this.setState({timeIndicatorX: x});
  };


  onWheel(e) {
    if (Math.abs(e.deltaY) < 2) return
    this.horiScrollDelta = e.deltaY;
  };

  onMouseDown(e) {
    if (e.button !== 0) return;
    this.props.updateUI("dragging", true);

    this._dragStartX = e.pageX;
    this._dragStartScroll = this.refs.scrollContainer.scrollLeft;
    e.stopPropagation();
    e.preventDefault();
  };

  onMouseUp(e) {
    this.props.updateUI("dragging", false);
    this._dragX = null;
    e.stopPropagation();
    e.preventDefault();
  };

  onMouseMove(e) {
    this._dragX = e.pageX;
  };

  render() {
    const el = this.refs.scrollContainer;
    if (el) {
      this.scrollContainerChanged = true;
    }
    let grid = [];
    for(let i = 0; i < 24; i++) {
      grid.push(
        <div className="grid-line" style={{width: hourScale + "px"}} key={i}>
          <div className="label">{moment().hour(i).minute(0).second(0).format("H:mm")}</div>
        </div>
      );
    }
    grid.push(
      <div className="grid-line last" key={24}>
        <div className="label">{moment().hour(24).minute(0).second(0).format("H:mm")}</div>
      </div>
    )

    const timeIndicator = this.state.timeIndicatorX ?
    (
      <div
        key={"time-indicator"}
        ref="timeIndicator"
        style={{
          transform: `translate3d(${this.state.timeIndicatorX}px, 0, 0)`
        }}
        className="grid-line time-indicator"></div>
    ) : "";

    grid.push(timeIndicator);

    return (
      <div className="visual-day-wrap">
        <div className="visual-day-scrollbar">
          <div className="visual-day-thumb"
            onMouseDown={this.onMouseDown.bind(this)}
            ref="thumb"><DragHandle style={{
              transform: "rotateZ(90deg)",
              height: 13,
              width: 13,
              opacity: 0.21,
              fill: "#fff"
            }}/></div>
        </div>
        <div className="visual-day-header" style={{
            padding: this.props.ui.style.padding
          }}>
          {moment(this.props.selectedDay).format("dddd, Do MMMM YYYY")}
        </div>
        <div className="visual-day-scroll-wrap">
          <div className="visual-day-scroll" ref="scrollContainer">
            <div className="visual-day" ref="container" style={this.props.ui.style}>
              <div className="grid" style={{
                  left: `${spacingAround}px`,
                  right: `${spacingAround}px`
                }}>{grid}</div>
              <div className="visual-day-rows">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export {hourScale, spacingAround, minuteInPx}
export default ui({
  state: {
    dragging: false,
    style: {
      width: (24 * hourScale) + "px",
      padding: `0 ${spacingAround}px`
    }
  }
})(VisualDay);
