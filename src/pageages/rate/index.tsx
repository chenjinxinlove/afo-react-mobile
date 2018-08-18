import * as React from 'react';

export interface RateProps {
  className?: string;
  style?: React.CSSProperties;
  onChange?: (index: number) => void;
  size?: number;
  disabled?: boolean;
  color?: string;
  voidColor?: string;
  disabledColor?: string;
  count?: number;
  value?: number;
}

class Rate extends React.Component<RateProps, any> {
  constructor(props: RateProps) {
    super(props);
    this.state = {
      list: []
    };
  }
  static defaultProps = {
    size: 20,
    disabled: false,
    color: '#ffd21e',
    voidColor: '#c7c7c7',
    disabledColor: '#bdbdbd',
    count: 5,
    value: 0,
    onChange() { }
  }

  componentWillMount () {
    const count: number = this.props.count || 5;
    const value: number = this.props.value || 0;
    this.setState({
      list: Array.from({ length: count }, (v, index) => index < value),
      value
    })
  }
  onSelect = (index: number) => {
    const count: number = this.props.count || 5;
    if (!this.props.disabled) {
      this.setState({
        value: index + 1,
        list: Array.from({ length: count }, (v, i) => i < index + 1),
      })
      this.props.onChange ? this.props.onChange(index + 1) : ''
    }
  }
  render () {
    const {
      list
    } = this.state;
    const {
      disabled,
      disabledColor,
      color,
      voidColor
    } = this.props;
    return (
      <div className='afo-rate'>
        {
          list.map((isFull: boolean, index: number) => {
            return (
              <svg
                key={index}
                fill={disabled ? disabledColor : isFull ? color : voidColor}
                viewBox="0 0 32 32"
                style={{}}
                className="afo-rate-item"
                onClick={() => this.onSelect(index)}
              >
                <path d={isFull ? 'M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z' : 'M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798zM16 23.547l-6.983 3.671 1.334-7.776-5.65-5.507 7.808-1.134 3.492-7.075 3.492 7.075 7.807 1.134-5.65 5.507 1.334 7.776-6.983-3.671z'} />
              </svg>
            )
          })
        }
      </div>
    )
  }
 }

export default Rate
