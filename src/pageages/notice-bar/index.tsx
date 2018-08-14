import classnames from 'classnames';
import * as React from 'react';
import { MouseEventHandler } from 'react';
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
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default class NoticeBar extends React.Component<NoticeBarProps, any> {
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
  constructor(props: NoticeBarProps) {
    super(props);
    this.state = {
      showNoticeBar: true,
      animationClass: ''
    };
  }
  onClickIcon = () => {
    const { mode, onClick } = this.props;
    if (onClick) {
      onClick();
    }
    if (mode === 'closable') {
      this.setState({
        showNoticeBar: false,
      });
    }
  }
  render () {
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
      ...resProps
    } = this.props;
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
      <div className={noticeBarCls} style={{color, background}} onClick={onClick}>
        {
          leftIcon ? <div className="afo-notice-left-icon"><img src={leftIcon} /></div> : ''
        }
        <div className="afo-notice-bar__wrap" ref='wrap'>
          <div className={noticeContentCls} ref='content' style={{
            paddingLeft: firstRound ? 0 : wrapWidth + 'px',
            animationDelay: (firstRound ? delay : 0) + 's',
            animationDuration: duration + 's'}}>
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