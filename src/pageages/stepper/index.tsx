import classnames from 'classnames';
import * as React from 'react';
import './style/stepper.styl';

interface StepperProps {
  value: any;
  integer?:boolean;
  disabled?: boolean;
  disabledInput?: boolean;
  min?:number;
  max?:number;
  step?:number;
  defaultValue?: number;
  onOverlimit?: (type:string) => void;
  onBlur?:(event:any) => void;
  onInput?:(value:number) => void;
  typeClick?: (type:string) => void;
  onChange?: (value:number) => void;
}

class Stepper extends React.Component<StepperProps, any> {
  defaultProps = {
    integer: false,
    disabled: false,
    disabledInput: false,
    min: 1,
    max: Infinity,
    step: 1,
    defaultValue: 1
  }
  format = (value:any) => {
    value = String(value).replace(/[^0-9]\.-/g, '')
    return value === '' ? 0 : this.props.integer ? Math.floor(value) : +value
  }
  range = (value:any) => {
    return Math.max(Math.min((this.props.max||Infinity), this.format(value)), (this.props.min || 1))
  }
  onInput = (event:any) => {
    const {value} = event.target
    const formatted = this.format(value)
    if (+value !== formatted) {
      event.target.value = formatted
    }
    this.setState({
      currentValue: formatted
    })
    this.props.onChange ? this.props.onChange(formatted) : ''
  }
  onChange = (type:string) => {
    const {
      onOverlimit,
      step
    } = this.props;
    if (this[`${type}Disabled`]) {
      onOverlimit ? onOverlimit(type) : ''
      return
    }
    const diff = type === 'minus' ? - (step||1) : + (step||1);
    const value = Math.round((this.state.currentValue + diff) * 100) / 100;
    this.setState({
      currentValue: this.range(value)
    })
    this.props.onChange ? this.props.onChange(this.range(value)) : ''
    this.props.typeClick ? this.props.typeClick(type) : ''
  }
  onBlur = (event:any) => {
    this.setState({
      currentValue: this.range(this.state.currentValue)
    })
    this.props.onChange ? this.props.onChange(this.range(this.state.currentValue)) : ''
    this.props.onBlur ? this.props.onBlur(event): ''
  }
  componentWillMount () {
    const value = this.range(this.props.value || this.props.defaultValue)
    if (value !== +this.props.value) {
      this.props.onInput ? this.props.onInput(value): ''
    }
    this.setState({
      currentValue: value
    })
  }
  componentWillReceiveProps(nextProps: StepperProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        currentValue: nextProps.value
      })
    }
  }
  render () {
    const {
      disabled,
      min,
      max,
      disabledInput
    } = this.props;
    const {
      currentValue
    } = this.state;
    const minusDisabled = disabled || currentValue <= (min || 1);
    const plusDisabled = disabled || currentValue >= (max || Infinity);
    const minusCls = classnames('afo-stepper__minus', {
      'afo-stepper__minus--disabled': minusDisabled
    });
    const plusCls = classnames('afo-stepper__plus', {
      'afo-stepper__plus--disabled': plusDisabled
    })
    return (
      <div className="afo-stepper">
        <button
          className={minusCls}
          onClick={() => this.onChange('minus')}
        />
        <input
          type="number"
          className="afo-stepper__input"
          value={currentValue}
          disabled={disabled || disabledInput}
          onInput={(e) => this.onInput(e)}
          onBlur={(e) => this.onBlur(e)}
        />
        <button
          className={plusCls}
          onClick={() => this.onChange('plus')}
        />
      </div>
    )
  }
}

export default Stepper;
