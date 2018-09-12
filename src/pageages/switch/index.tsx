import classnames from 'classnames';
import * as React from 'react';
import './style/switch.styl';

interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: any;
  onChange?: (index: number) => void;
}

class Switch extends React.Component<SwitchProps, any> {
  defaultProps = {
    checked: false,
    disabled: false
  }
  static state = {
    checkboxValue: false
  }
  componentWillMount () {
    this.setState({
      checkboxValue: this.props.checked
    })
  }
  checkboxChange = (e:any) => {
    this.setState({
      checkboxValue: e.target.value
    })
    this.props.onChange ? this.props.onChange(e.target.value) : ''
  }
  render () {
    const {
      disabled,
      children,
      className,
      style
    } = this.props;
    const {checkboxValue} = this.state;
    const switchCls = classnames(className, 'afo-switch')
    return (
      <div className={switchCls} style={style}>
        <input type="checkbox" className="afo-switch__input" value={checkboxValue} onChange={(e) => this.checkboxChange(e)} disabled={disabled} />
        <i className="afo-switch__ui" />
        <span className="afo-switch__label">
          {
            children
          }
        </span>
      </div>
    )
  }
}

export default Switch;
