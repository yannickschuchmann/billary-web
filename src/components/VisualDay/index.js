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
    selectedDay: PropTypes.object
  };

  componentDidMount() {
    this.lastScrollPosition = -1;
    this.tick = window.requestAnimationFrame(this.renderScrollbar.bind(window, this));
    this.onResizeEvent = window.addEventListener('resize', () => {this.scrollContainerChanged = true});
  };

  componentWillUnmount() {
    window.cancelAnimationFrame(this.tick);
    window.removeEventListener(this.onResizeEvent);
  };

  renderScrollbar(comp, timestamp) {
    const el = comp.refs.scrollContainer;
    if (!comp.scrollContainerChanged && comp.lastScrollPosition == el.scrollLeft) {
      comp.tick = window.requestAnimationFrame(comp.renderScrollbar.bind(window, comp));
      return false;
    } else {
      const elWidth = el.getBoundingClientRect().width;
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

  render() {
    const el = this.refs.scrollContainer;
    if (el) {
      this.scrollContainerChanged = true;
    }

    let grid = [];
    for(let i = 0; i < 24; i++) {
      grid.push(
        <div className="grid-line" style={{width: hourScale + "px"}}>
          <div className="label">{moment().hour(i).minute(0).second(0).format("H:mm")}</div>
        </div>
      );
    }
    grid.push(
      <div className="grid-line last">
        <div className="label">{moment().hour(24).minute(0).second(0).format("H:mm")}</div>
      </div>
    )

    return (
      <div className="visual-day-wrap">
        <div className="visual-day-scrollbar">
          <div className="visual-day-thumb" ref="thumb"><DragHandle style={{
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
    style: {
      width: (24 * hourScale) + "px",
      padding: `0 ${spacingAround}px`
    }
  }
})(VisualDay);
