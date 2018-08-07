import classnames from 'classnames';
import * as React from 'react';
import './style/navbar.styl';

export interface NavbarProps {
  fixed?: boolean;
  title?: string;
  className?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export default class Navbar extends React.Component< NavbarProps, any> {
  static defaultProps = {
    fixed: false,
    title: ''
  }
  render() {
    const {
      fixed,
      title,
      children,
      className,
      leftContent,
      rightContent,
      ...restProps
    } = this.props;
    return (
      <header {...restProps} className={classnames(className,{'afo-navbar': true, 'is-fixed': fixed})}>
        <div className="afo-navbar-button is-left">
          {leftContent}
        </div>
        <h1 className="afo-navbar-title">{title}</h1>
        <div className="afo-navbar-button is-right">
          {rightContent}
        </div>
      </header>
    )

  }
}