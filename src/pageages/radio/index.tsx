import classnames from 'classnames';
import * as React from 'react';
import Icon from '../../pageages/icon/index';
import './style/radio.styl'

export interface RadioItemProps {
  style?: React.CSSProperties;
  children?: any;
  name?: string | number;
  disabled?: boolean;
  labelDisabled?: boolean;
  labelPosition?: 'left' | 'right';
}

export class Item extends React.Component<RadioItemProps, any> {
  defaultProps = {
    name: null,
    disabled: false,
    labelDisabled: false,
    labelPosition: 'left'
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

interface RadioProps {
  value: any;
  disabled?: boolean;
  onChange?: (name: any) => void
}

class Radio extends React.Component <RadioProps, any> {
  defaultProps = {
    value: null,
    disabled: false
  }
  static state = {
    RadiosData: [],
    currentValue: ''
  }
  public static Item = Item;
  componentWillMount() {
    const RadiosData = this.getRadios();
    this.setState({
      RadiosData,
      currentValue: this.props.value
    })
  }
  getRadios = () => {
    return React.Children.map(this.props.children, (c: any) => {
      return {
        ...(c.props as RadioItemProps),
      };
    });
  }
  onChange = (name:any) => {
    this.setState({
      currentValue: name
    })
    this.props.onChange ? this.props.onChange(name) : ''
  }
  render () {
    const {
      disabled
    } = this.props;
    return (
      <div className="afo-radio-group">
        {
          this.state.RadiosData.map((item:any, index:number) => {
            return (
              <RadisItemRender
                key={index}
                name={item.name}
                currentValue={this.state.currentValue}
                disabled={item.disabled}
                labelDisabled={item.labelDisabled}
                labelPosition={item.labelPosition}
                disabledParent={disabled || false}
                className={item.className}
                onChange={this.onChange}
              >
              {
                item.children
              }
              </RadisItemRender>
            )

          })
        }
      </div>
    )
  }
}

interface RadisItemRenderProps {
  style?: React.CSSProperties;
  children?: any;
  name: string | number;
  currentValue: string | number;
  disabled: boolean;
  disabledParent: boolean;
  labelDisabled: boolean;
  labelPosition: 'left' | 'right';
  className: string;
  onChange: (name:any) => void;
}

class RadisItemRender extends React.Component<RadisItemRenderProps, any> {
  onClick = () => {
    const isDisabled = this.props.disabledParent || this.props.disabled
    if (!isDisabled ) {
      this.props.onChange(this.props.name)
    }
  }
  onClickLable = () => {
    const isDisabled = this.props.disabledParent || this.props.disabled
    if (!isDisabled && !this.props.labelDisabled) {
      this.props.onChange(this.props.name)
    }
  }
  render () {
    const {
      labelPosition,
      disabledParent,
      disabled,
      className,
      children,
      name,
      currentValue
    } = this.props;
    const isDisabled = disabledParent || disabled
    const radioCLs = classnames(className, {
      'afo-radio': true,
      'afo-radio--disabled': isDisabled
    })
    const labelCls = classnames({
      'afo-radio__label': true,
      [`afo-radio__label--${labelPosition}`]: true
    })

    return (
      <div className={radioCLs} onClick={this.onClick}>
        <span className="afo-radio__input">
          <input type="radio" value={currentValue} className="afo-radio__control" disabled={isDisabled} />
          <Icon size="18px" type={currentValue === name ? 'right' : 'round-border'} />
        </span>
        <span className={labelCls} onClick={this.onClickLable}>
          {
            children
          }
        </span>
      </div>
    )
  }
}

export default Radio;
