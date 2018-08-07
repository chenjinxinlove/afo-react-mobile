import classnames from 'classnames';
import * as React from 'react';
import './style/tag.styl';

export interface TagPropsType {
  type?: 'primary' | 'danger' | 'default';
  plain?: boolean;
  mark?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default class Tag extends React.Component<TagPropsType, any> {
  static defaultProps = {
    type: 'defalut',
    plain: false,
    mark: false,
    disabled: false,
  }
  
  render() {
    const {
      children,
      className,
      disabled,
      type,
      plain,
      mark,
      style,
    } = this.props;
    const prefixCls: string = 'afo-tag';
    const wrapCls = classnames(className, prefixCls, {
      [`${prefixCls}--${ plain ? type + 'plain' : type }`]: true,
      [`${prefixCls}--mark`]: mark,
      [`${prefixCls}-disabled`]: disabled,
    });
    return(
      <div
        className={wrapCls}
        style={style}
      >
        {children}
      </div>
    )
  }
}

