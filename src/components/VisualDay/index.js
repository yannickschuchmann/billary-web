import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import objectAssign from 'object-assign';
import {moment} from '../../businessLogic/calendarHelper';
import DragHandle from 'material-ui/lib/svg-icons/editor/drag-handle';

const hourScale = 100;
const spacingAround = 40; //px

class VisualDay extends Component {
  static propTypes = {
    children: PropTypes.node,
    selectedDay: PropTypes.object,
    dragging: PropTypes.bool,
    rel: PropTypes.object
  };

  static defaultProps = {
    dragging: false,
    rel: null
  };
  state = { dragging: this.props.dragging, rel: this.props.rel };

  constructor(props){
      super(props);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseUp = this.onMouseUp.bind(this);
    }

  componentDidMount() {
    this.lastScrollPosition = -1;
    this.tick = window.requestAnimationFrame(this.renderScrollbar.bind(window, this));
    this.onResizeEvent = window.addEventListener('resize', () => {this.scrollContainerChanged = true});
    setTimeout(this.setDefaultScroll.bind(this), 0);
  };

  componentWillUnmount() {
    window.cancelAnimationFrame(this.tick);
    window.removeEventListener(this.onResizeEvent);
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ui.dragging && !prevProps.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.props.ui.dragging && prevProps.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
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

export {hourScale, spacingAround}
export default ui({
  state: {
    dragging: false,
    style: {
      width: (24 * hourScale) + "px",
      padding: `0 ${spacingAround}px`
    }
  }
})(VisualDay);
