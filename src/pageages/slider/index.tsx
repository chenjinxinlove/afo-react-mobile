import classnames from 'classnames'
import * as React from 'react'
import './style/slider.styl'
export interface SliderProps {
  disabled?: boolean;
  max?: number;
  min?: number;
  step?: number;
  value?: number;
  barHeight?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: any;
  onChange?: (index: number) => void;
}

class Slider extends React.Component<SliderProps, any> {
  wrapRef: any;
  direction: any;
  deltaX: any;
  deltaY: any;
  offsetX: any;
  offsetY: any;
  startX: any;
  startY: any;
  scrollEl: any;
  startValue: any;
  defaultDefault = {
    max: 100,
    min: 0,
    step: 1,
    value: 0,
    barHeight: '2px'
  }
  constructor (props: SliderProps) {
    super(props);
    this.wrapRef = React.createRef()
    this.state = {
      value: 0
    }
  }
  componentWillMount() {
    this.setState({
      value: this.props.value
    })
  }
  format = (value: number) => {
    const {
      max,
      min,
      step
    } = this.props;
    return (Math.round(Math.max(min || 0, Math.min(value, max || 100 )) / (step || 1)) * (step || 1))
  }
  touchStart (event: any) {
    this.direction = '';
    this.deltaX = 0;
    this.deltaY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  }
  touchMove (event: any) {
    const touch = event.touches[0];
    this.deltaX = touch.clientX - this.startX;
    this.deltaY = touch.clientY - this.startY;
    this.offsetX = Math.abs(this.deltaX);
    this.offsetY = Math.abs(this.deltaY);
    this.direction = this.offsetX > this.offsetY ? 'horizontal' : this.offsetX < this.offsetY ? 'vertical' : '';
  }
  onTouchStart = (event: any) => {
    if (this.props.disabled || false) {
      return
    }
    this.touchStart(event)
    this.startValue = this.format(this.state.value)
  }
  onTouchMove = (event: any) => {
    // event.preventDefault()
    if (this.props.disabled || false) {
      return
    }

    this.touchMove(event)
    const rect = this.wrapRef.current.getBoundingClientRect()
    const diff = this.deltaX / rect.width * 100
    this.updateValue(this.startValue + diff, false)
  }
  onTouchEnd = () => {
    if (this.props.disabled || false) {
      return
    }
    this.updateValue(this.state.value, true)
  }
  onClick = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    if (this.props.disabled || false) {
      return
    }
    const rect = this.wrapRef.current.getBoundingClientRect()
    const value = (event.clientX - rect.left) / rect.width * 100
    this.updateValue(value, true)
  }
  updateValue = (value: number, end: boolean) => {
    value = this.format(value)
    this.setState({
      value
    })

    if (end) {
      this.props.onChange ? this.props.onChange(value) : ''
    }
  }
  render () {
    const {
      disabled,
      barHeight,
      className,
      style
    } = this.props;
    const sliderCls = classnames('afo-slider', className, {
      'afo-slider--disabled': disabled
    });
    const barStyle = {
      width: this.format(this.state.value) + '%',
      height: barHeight || '2px'
    }
    return (
      <div onClick={this.onClick} className={sliderCls} style={style} ref={this.wrapRef}>
        <div className="afo-slider__bar" style={barStyle}>
          <span
            className="afo-slider__button"
            onTouchStart={this.onTouchStart}
            onTouchMove={this.onTouchMove}
            onTouchEnd={this.onTouchEnd}
            onTouchCancel={this.onTouchEnd}
           />
        </div>
      </div>
    )
  }
}
export default Slider;
