import classnames from 'classnames';
import * as React from 'react';
import { MouseEventHandler } from 'react';
import './style/button.styl';

export interface ButtonProps {
  effect?: 'button' | 'submit';
  type?: 'primary' | 'danger' | 'default';
  size?: 'small' | 'normal' | 'large';
  disabled?: boolean;
  loading?: boolean;
  inline?: boolean;
  plain?: boolean;
  icon?: string;
  className?: string;
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
  constructor(props: ButtonProps) {
    super(props)
  }
  static defaultProps = {
    effect: 'button',
    type: 'default',
    size: 'normal',
    disabled: false,
    inline: false,
    plain: false,
    laoding: false,
    icon: ''
  };
  render () {
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
    } = this.props;
    const kids = React.Children.map(children, insertSpace);
    const prefixCls: string = 'afo';
    const wrapCls = classnames(prefixCls, className, {
      ['afo-button']: true,
      [`${prefixCls}-button--${ plain ? type + 'plain' : type }`]: true,
      [`${prefixCls}-button--${size}`]: true,
      [`${prefixCls}-button-disabled`]: disabled,
      [`${prefixCls}-button-inline`]: inline,
    });
    return (
        <button
          onClick={disabled || loading ? undefined : () => onClick}
          type={effect}
          {...restProps}
          disabled={disabled}
          className={wrapCls}
        >
          { kids }
        </button>
      )
    }
}
export default Button;