import classnames from 'classnames';
import * as React from 'react';
import { CSSProperties } from 'react';
import './style/badge.styl';


export interface BadgeProps {
  size?: 'large' | 'small';
  overflowCount?: number;
  corner?: boolean;
  dot?: boolean;
  text?: any;
  className?: string;
  hot?: boolean;
  style?: CSSProperties;
}

export default class Badge extends React.Component< BadgeProps, any > {
  static defaultProps = {
    size: 'small',
    overflowCount: 99,
    dot: false,
    corner: false
  }
  render () {
    // tslint:disable:prefer-const
    let {
      className,
      children,
      text,
      size,
      overflowCount,
      dot,
      corner,
      hot,
      ...restProps
    } = this.props;
    overflowCount = overflowCount as number;
    text = 
      typeof text === 'number' && text > overflowCount
        ? `${overflowCount}+`
        : text;

    if (dot) {
      text = ''
    }
    const prefixCls: string = 'afo-badge'    
    const scrollNumberCls = classnames({
      [`${prefixCls}-dot`]: dot,
      [`${prefixCls}-dot-large`]: dot && size === 'large',
      [`${prefixCls}-text`]: !dot && !corner,
      [`${prefixCls}-corner`]: corner,
      [`${prefixCls}-corner-large`]: corner && size === 'large',
    });
    const badgeCls = classnames(prefixCls, className, {
      [`${prefixCls}-not-a-wrapper`]: !children,
      [`${prefixCls}-corner-wrapper`]: corner,
      [`${prefixCls}-hot`]: !!hot,
      [`${prefixCls}-corner-wrapper-large`]: corner && size === 'large'
    });

    return (
      <span className={badgeCls}>
        {children}
        {
          (text || dot) && (
            <sup className={scrollNumberCls} {...restProps}>{text}</sup>
          )
        }
      </span>
    )
  }
}