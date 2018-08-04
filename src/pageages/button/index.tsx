import classnames from 'classnames';
import React, { MouseEventHandler } from 'react';

export interface ButtonProps {
  effect?: 'button' | 'submit';
  type?: 'primary' | 'danger' | 'default';
  size?: 'small' | 'normal' | ' large';
  disabled?: boolean;
  loading?: boolean;
  inline?: boolean;
  plain?: boolean;
  icon?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str: any) {
  return typeof str === 'string';
}
function insertSpace(child: any) {
  if (isString(child.type) && isTwoCNChar(child.props.children)) {
    return React.cloneElement(
      child,
      {},
      child.props.children.split('').join(' '),
    );
  }
  if (isString(child)) {
    if (isTwoCNChar(child)) {
      child = child.split('').join(' ');
    }
    return <span>{child}</span>;
  }
  return child;
}
class Button extends React.Component<ButtonProps, any> {
  private static defaultProps = {
    effect: 'button',
    type: 'default',
    size: 'normal',
    disabled: false,
    inline: false,
    plain: false,
    laoding: false,
    icon: ''
  };
  private render () {
    const {
      children,
      className,
      effect,
      type,
      size,
      disabled,
      loading,
      inline,
      plain,
      icon,
      onClick,
      ...restProps
    } = this.props
  }
  const kids = React.Children.map(children, insertSpace);
  const prefixCls = 'afo';
  const wrapCls = classnames(prefixCls, className, {
    ['afp-button'],
    [`${prefixCls}-button--${ plain ? type + 'plain' : type }`],
    [`${prefixCls}-button--${this.size}`],
    [`${prefixCls}-button-disabled`]: disabled,
    [`${prefixCls}-button-inline`]: inline,
  });
  return (
    <button
      onClick={disabled || loading ? undefined : onClick}
      type={effect}
      disabled={disabled}
      className={wrapCls}
    >
      { kids }
    </button>
  )
}