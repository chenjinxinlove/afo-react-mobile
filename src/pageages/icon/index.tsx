import classnames from 'classnames';
import * as React from 'react';
import { MouseEventHandler } from 'react';

export interface IconProps{
  size?: string;
  color?: string;
  type?: string;
  className? : string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default class Icon extends React.Component<IconProps, any> {
  static defaultProps = {
    size: '32px'
  }
  render() {
    const { className, size, color, type, onClick, style, ...resProps} = this.props;
    const cls = classnames(
      className,
      'afo-icon',
      `afo-icon-${type}`,
    );
    return (
      <i className={cls} {...resProps} style={{...style, color, fontSize: size}} onClick={onClick} />
    )
  }
}
