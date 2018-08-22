import classnames from 'classnames';
import * as React from 'react';
import * as Eventon from '../../common/utils/event';
import * as Raf from '../../common/utils/raf';
import './style/tab.styl';
export interface TabItemProps {
  style?: React.CSSProperties;
  children?: any;
  title?: string;
  disabled?: boolean;
}

export class Item extends React.Component<TabItemProps, any> {
  static state = {
    disabled: false
  }
  render() {
    const {style } = this.props;
    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}

export interface TabProps {
  lineWidth?: number;
  swipeable?: boolean;
  active?: number | boolean;
  type?: string;
  duration?: number;
  swipeThreshold?: number;
  className?: string;
  style?: React.CSSProperties;
  onDisabled?: (index: number, title: string) => void;
  onClick?: (index: number, title: string) => void;
  onChange?: (index: number, title: string) => void;
}

class Tab extends React.Component<TabProps, any> {
  wrapRef: any;
  navRef: any;
  contentRef: any;
  titleRef: any;
  tabsRef: any;
  direction: any;
  deltaX: any;
  deltaY: any;
  offsetX: any;
  offsetY: any;
  startX: any;
  startY: any;
  scrollEl: any;
  constructor (props: TabProps) {
    super(props);
    this.wrapRef = React.createRef();
    this.navRef = React.createRef();
    this.contentRef = React.createRef();
    this.titleRef = React.createRef();
    this.tabsRef = React.createRef();
    this.state = {
      curActive: null,
      position: 'content-top',
      lineStyle: {},
      tabsData: [],
      content: '',
      resize: false,
      swipeable: false
    }
  }
  static defaultProps = {
    active: 0,
    type: 'line',
    duration: 0.2,
    swipeThreshold: 4
  }
  public static Item = Item;
  componentWillMount() {
    const tabsData = this.getTabs();
    this.setState({
      tabsData
    })
  }

  componentDidMount() {
    // 初始化
    this.correctActive(this.props.active)
    this.setLine()

    setTimeout(() => {
      this.handlers(true)
      this.scrollIntoView(true)
    })
  }
  componentDidUpdate() {
    setTimeout(() => {
      this.handlers(true)
      this.scrollIntoView(true)
    })
  }
  componentWillUnmount() {
    this.handlers(false)
  }
  // 纠正active
  correctActive (active: any) {
    active = +active
    const exist = this.state.tabsData.some((tab: any) => tab.index === active)
    const defaultActive =  0
    this.serCurActive(exist ? active : defaultActive)
  }
  getTabs = () => {
    return React.Children.map(this.props.children, (c: any) => {
      return {
        ...(c.props as TabItemProps),
      };
    });
  }
  onClick = (index: number) => {
    const {title, disabled} = this.state.tabsData[index];
    if (disabled) {
      this.props.onDisabled ? this.props.onDisabled(index, title) : '';
    } else {
      this.serCurActive(index, title);
      this.props.onClick? this.props.onClick(index, title) : '';
    }
  }
  serCurActive = (active: number, title?: string) => {
    const {curActive, tabsData} = this.state;
    if (active !== curActive) {
      if (curActive !== null) {
        this.props.onChange ? this.props.onChange(active, title || '') : '';
      }
      this.setState({
        curActive: active,
        content: tabsData[active].children
      })
      setTimeout(() => {
        this.curActive()
      })
    }
  }
  curActive = () => {
    this.scrollIntoView(true)
    this.setLine()
  }

  setLine = () => {
    setTimeout(() => {
      if (!this.tabsRef || this.props.type !== 'line') {
        return
      }

      const tab = this.tabsRef
      const width = this.props.lineWidth || tab.current.offsetWidth
      const offsetLeft = Math.floor(tab.current.offsetLeft / (this.state.tabsData.length -1 ) * this.state.curActive)
      const left = offsetLeft + (tab.current.offsetWidth - width) / 2
      this.setState({
        lineStyle: {
          width: `${width}px`,
          transform: `translateX(${left}px)`,
          transitionDuration: `${this.props.duration}s`
        }
      })
    })
  }
  // 绑定事件处理
  handlers = (bindBool: boolean) => {
    const {on , off} = Eventon;
    const { resize, swipeable } = this.state;
    const propsSwipeable = this.props.swipeable && bindBool;

    // 监听window跳转事件
    if (resize !== bindBool) {
      this.setState({
        resize: bindBool
      })
      const action = bindBool ? on : off
      action(window, 'resize', () => this.setLine(), true)
    }

    // 监听滑touch事件
    if (swipeable !== propsSwipeable) {
      this.setState({
        swipeable: propsSwipeable
      })
      const content = this.contentRef.current;
      const action = propsSwipeable ? on : off;
      action(content, 'touchstart', (e:any) => this.touchStart(e))
      action(content, 'touchmove', (e:any) => this.touchMove(e))
      action(content, 'touchend', () => this.onTouchEnd())
      action(content, 'touchcancel', () => this.onTouchEnd())
    }
  }
  touchStart (event: any) {
    this.direction = '';
    this.deltaX = 0;
    this.deltaY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  }
  touchMove (event: any) {
    const touch = event.touches[0];
    this.deltaX = touch.clientX - this.startX;
    this.deltaY = touch.clientY - this.startY;
    this.offsetX = Math.abs(this.deltaX);
    this.offsetY = Math.abs(this.deltaY);
    this.direction = this.offsetX > this.offsetY ? 'horizontal' : this.offsetX < this.offsetY ? 'vertical' : '';
  }
  onTouchEnd () {
    const { direction, deltaX, offsetX } = this;
    const { curActive, tabsData } = this.state;
    const minSwipeDistance = 50;
    if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
      if (deltaX > 0 && curActive !== 0) {
        this.serCurActive(curActive - 1);
      } else if (deltaX < 0 && curActive !== tabsData.length - 1) {
        this.serCurActive(curActive + 1);
      }
    }
  }
  // scroll active tab into view
  scrollIntoView = (immediate: any) => {
    // tslint:disable
    // debugger;
    const scrollable = this.state.tabsData.length > (this.props.swipeThreshold || 4)
    if (!scrollable || !this.tabsRef) {
      return
    }
    const tab = this.tabsRef;
    const nav = this.navRef.current;
    const { scrollLeft, offsetWidth: navWidth } = nav;
    const offsetLeft = Math.floor(tab.current.offsetLeft / (this.state.tabsData.length -1 ) * this.state.curActive);
    const {offsetWidth: tabWidth } = tab.current;
    this.scrollTo(nav, scrollLeft, offsetLeft - (navWidth - tabWidth) / 2, immediate)
  }
  // animate the scrollLeft of nav
  scrollTo (el: any, from: any, to: any, immediate: any) {
    if (immediate) {
      el.scrollLeft += to - from
      return
    }
    let count = 0
    const frames = Math.round(this.state.duration * 1000 / 16)
    const animate = () => {
      el.scrollLeft += (to - from) / frames
      /* istanbul ignore next */
      if (++count < frames) {
        Raf.raf(animate)
      }
    }
    animate()
  }
  render () {
    const {
      type,
      swipeThreshold,
      className,
      style,
    } = this.props;
    const {
      position, curActive, lineStyle, tabsData, content
    } = this.state;
    const tabsCls = classnames('afo-tabs', className, {
      [`afo-tabs--${type}`]: true
    })
    const scrollable = tabsData.length > (swipeThreshold || 4)
    const wrapCls = classnames({
      'afo-hairline--top-bottom': type === 'line',
      'afo-tabs__wrap': true,
      'afo-tabs__wrap--scrollable': scrollable,
      'afo-tabs__wrap--position': position
    })
    const navCls = classnames('afo-tabs__nav', {
      [`afo-tabs__nav--${type}`]: true
    })
    return (
      <div className={tabsCls} style={style}>
        <div ref={this.wrapRef} className={wrapCls}>
          <div ref={this.navRef} className={navCls}>
            {
              type === 'line' ? <div className="afo-tabs__line" style={lineStyle} /> : ''
            }
            {
              tabsData.map((tab: any, index: number) => {
                return (
                  <div
                    key={index}
                    ref={this.tabsRef}
                    className = {classnames('afo-tab', {
                      'afo-tab--active': index === curActive,
                      'afo-tab--disabled': tab.disabled
                    })}
                    onClick={() => this.onClick(index)}
                  >
                    <span className="afo-ellipsis" ref={this.titleRef}>{tab.title}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="afo-tabs__content" ref={this.contentRef}>
          {
            content
          }
        </div>
      </div>
    )

  }
}
export default Tab;