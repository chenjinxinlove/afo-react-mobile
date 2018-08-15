import classnames from 'classnames';
import * as React from 'react';
import { MouseEventHandler } from 'react';
// import * as ReactDOM from 'react-dom';
import Icon from '../icon/index';
import './style/noticeBar.styl';

export interface NoticeBarProps {
  mode?: string;
  leftIcon?: string;
  color?: string;
  background?: string;
  fps?: number;
  delay?: number;
  scrollable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default class NoticeBar extends React.Component<NoticeBarProps, any> {
  wrapRef: any;
  contentRef: any;  
  constructor(props: NoticeBarProps) {
    super(props);
    this.wrapRef = React.createRef();
    this.contentRef = React.createRef();
    this.state = {
      wrapWidth: 0,
      firstRound: true,
      duration: 0,
      offsetWidth: 0,
      showNoticeBar: true,
      animationClass: ''
    };
  }
  static defaultProps = {
    mode: '',
    leftIcon: '',
    color: '#f60',
    background: '#fff7cc',
    fps: 50,
    delay: 1,
    scrollable: true,
    onClick() {}
  };
  onAnimationEnd = () => {
    this.setState({
      firstRound: false
    })
    setTimeout(() => {
      this.setState({
        duration: (this.state.offsetWidth + this.state.wrapWidth) / 50,
        animationClass: 'afo-notice-bar__play--infinite'
      })
    })
  }
  onClickIcon = () => {
    const { mode } = this.props;
    if (mode === 'closeable') {
      this.setState({
        showNoticeBar: false,
      });
    }
  }
  componentDidMount () {
    const wrapRef: any = this.wrapRef;
    const contentRef: any = this.contentRef;
    // const {fps} = this.props;
    if (!wrapRef || !contentRef) {
      return
    }
    const wrapWidth = wrapRef.offsetwidth;
    const offsetWidth = contentRef.offsetwidth;
    const duration = offsetWidth / 50;
    if (this.props.scrollable && offsetWidth > wrapWidth) {
      this.setState({
        wrapWidth,
        offsetWidth,
        duration,
        animationClass:'afo-notice-bar__play'
      })
    }
  }
  render () {
    const extraProps: any = {};
    const {
      children,
      className,
      mode,
      leftIcon,
      color,
      background,
      fps,
      delay,
      scrollable,
      onClick,
      style,
      ...resProps
    } = this.props;
    extraProps.onClick = onClick;
    const {
      firstRound,
      wrapWidth,
      duration,
      animationClass,
      showNoticeBar
    } = this.state;
    const prefixCls: string = 'afo-notice-bar';
    const noticeBarCls = classnames(prefixCls, className, {
      [`${prefixCls}--withicon`]: mode,
    });
    const noticeContentCls = classnames({
      'afo-notice-bar__content': true,
      [animationClass]: true
    })
    const iconName = mode === 'closeable' ? 'close' : mode === 'link' ? 'arrow' : '';
    return showNoticeBar ?  (
      <div className={noticeBarCls} style={{color, background, ...style}} {...resProps} {...extraProps}>
        {
          leftIcon ? <div className="afo-notice-left-icon"><img src={leftIcon} /></div> : ''
        }
        <div className="afo-notice-bar__wrap" ref={el => (this.wrapRef = el)}>
          <div className={noticeContentCls} ref={el => (this.contentRef = el)} style={{
            paddingLeft: firstRound ? 0 : wrapWidth + 'px',
            animationDelay: (firstRound ? delay : 0) + 's',
            animationDuration: duration + 's'}}
            onAnimationEnd={this.onAnimationEnd}
            >
              {children}
          </div>
        </div>
        {
          iconName ? <Icon className="afo-notice-right-icon" type={iconName} size="14px" onClick={this.onClickIcon} /> : ''
        }
      </div>
    ) : ''
  }
}