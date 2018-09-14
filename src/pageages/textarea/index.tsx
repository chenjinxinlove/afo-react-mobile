import classnames from 'classnames';
import * as React from 'react';
import './style/textarea.styl';

interface IndicatorObject {
  negative: boolean,
  remain: boolean
}

interface TextareaProps {
  value?: string;
  cols?: number;
  rows?: number;
  readonly?: boolean;
  wrap?: string;
  required?: boolean;
  placeholder?: string;
  dirname?: string;
  form?: string;
  name?: string;
  autofocus?: boolean;
  disabled?: boolean;
  maxlength?: number;
  indicator?: boolean | IndicatorObject;
  onFocus?: (e:any) => void;
  onBlur?: (e:any) => void;
  onChange?: (e:any) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: any;
}

class Textarea extends React.Component<TextareaProps, any> {
  static defaultProps = {
    value: '',
    placeholder: 'please type here...',
    disabled: false,
    maxlength: 60,
    indicator: true
  }
  static state = {
    textareaValue: '',
    expanded: false,
    isFocus: false
  }
  componentWillMount () {
    this.setState({
      textareaValue: this.props.value
    })
  }
  handleFoucus = (e:any) => {
    this.props.onFocus ? this.props.onFocus(e) : ''
    this.setState({
      expanded: true,
      isFocus: true
    })
  }
  handleBlur = (e:any) => {
    this.props.onBlur ? this.props.onBlur(e) : ''
    if (this.state.textareaValue.length === 0) {
      this.setState({
        expanded: false
      })
    }
    this.setState({
      isFocus: false
    })
  }
  input = (e:any) => {
    this.setState({
      textareaValue: e.target.value
    })
    this.props.onChange ? this.props.onChange(e.target.value) : ''
    if (!this.state.isFocus && this.state.expanded) {
      this.setState({
        expanded: false
      })
    }
  }
  render () {
    const {
      placeholder,
      disabled,
      maxlength,
      indicator,
      className,
      style,
      ...restProps
    } = this.props;
    const {
      textareaValue,
      expanded,
      isFocus
    } = this.state;
    const wrapCls = classnames('afo-textarea-wrapper', className, {
      'afo-textarea__expanded': expanded, 'afo-textarea--active': isFocus
    })
    let i = this.props.indicator || {};
    if (typeof indicator === 'boolean') {
      i = {}
    };
    const indicatorConf:IndicatorObject = Object.assign({}, {
      negative: true,
      remain: true
    }, i);
    const remainDom:boolean = indicatorConf.remain;
    const count = (textareaValue || '').length;
    let diff = (maxlength || 60) - count;
    if (!indicatorConf.negative && diff < 0) {
      diff = 0;
    }
    const remain = diff;
    return (
      <div className={wrapCls} style={style}>
        <textarea
          className="afo-textarea"
          value={textareaValue}
          placeholder={placeholder}
          maxLength={maxlength}
          {...restProps}
          onInput={(e) => this.input(e)}
          disabled={disabled}
          onFocus={(e) => this.handleFoucus(e)}
          onBlur={(e) => this.handleBlur(e)}
        />
        {
          expanded || indicator ? <span className="afo-textarea__indicator">{remainDom ? remain : count}</span> :''
        }

      </div>
    )
  }
}

export default Textarea;
