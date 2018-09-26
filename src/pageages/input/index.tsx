import classnames from 'classnames';
import * as React from 'react';
import { withDefaultProps } from '../utils';
import './style/input.styl';

const defaultProps = {
  type: 'text',
  value: '',
  disabled: false,
  readonly: false,
  maxlength: 60,
  placehololder: '',
  autofocus: false,
  autocomplete: '',
  clearable: false,
  passShow: false
}

type DefaultProps = Readonly<typeof defaultProps>;

type InputInnerProps = {
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
} & DefaultProps;

const InputState = {
  isFocus: false,
  inputValue: '',
  open: false
};

type State = Readonly<typeof InputState>;


const Input = withDefaultProps(
  defaultProps,
  class extends React.Component<InputInnerProps, State> {
    readonly state: State = InputState;
    private inputRef: React.RefObject<any> = React.createRef();
    getDerivedStateFromProps() {
      this.setState({
        open: this.props.passShow,
        inputValue: this.props.value
      })
    }

    private changeHander = (e: React.ChangeEvent<HTMLInputElement>):void => {
      this.setState({
        inputValue: e.target.value
      })
      this.props.onChange ? this.props.onChange(e.target.value) : undefined;
    }
    private handleFoucus = (e: React.FocusEvent<HTMLInputElement>):void => {
      this.props.onFocus ? this.props.onFocus(e): undefined;
      this.setState({
        isFocus: true
      })
    }
    private handleBlur = (e: React.FocusEvent<HTMLInputElement>):void => {
      this.props.onBlur ? this.props.onBlur(e): undefined;
      this.setState({
        isFocus: true
      })
    }
    private handleClear = ():void => {
      this.setState({
        inputValue: ''
      })
      this.inputRef.current.focus();
    }
    private handlePwdEye = ():void => {
      this.setState({
        open: !this.state.open
      })
    }
    public render() {
      const {
        type,
        disabled,
        readonly,
        autocomplete,
        autofocus,
        clearable,
        passShow,
        className,
        style,
        prepend,
        append,
        ...restProps
      } = this.props;
      const {
        isFocus,
        inputValue,
        open
      } = this.state;
      const inputCls = classnames('afo-input', className, {
        'afo-input--active': isFocus
      })
      const inputType:string = type === 'password' && passShow ? 'text': type;
      const showClear:boolean = clearable && inputValue && !readonly && !disabled ? true: false;
      const showPwdEye:boolean = type === 'password' && passShow && !disabled ? true: false;
      return (
        <div className={inputCls} style={style}>
          {
            prepend ? <div className="afo-input__prepend">{prepend}</div> : ''
          }
          <input
            className="afo-input__field"
            ref={this.inputRef}
            value={inputValue}
            {...restProps}
            type={inputType}
            disabled={disabled}
            readOnly={readonly}

            autoComplete={autocomplete}
            autoFocus={autofocus}
            onFocus={(e) => this.handleFoucus(e)}
            onBlur={(e) => this.handleBlur(e)}
            onChange={(e) => this.changeHander(e)}
          />
          {
            append || showClear || showPwdEye?
            <div className="afo-input__append">
              {
                showClear ? <div className="afo-input__clear"  onClick={() => this.handleClear()}>
                  <i className="afo-wrong" />
                </div> : ''
              }
              {
                showPwdEye ?
                <div className="afo-input__eye"  onClick={() => this.handlePwdEye()}>
                  <i className={open ? 'afo-inupt__eye--visible' : 'afo-inupt__eye--invisible'} />
                </div> : ''
              }
              {append}
            </div> :''
          }
        </div>
      )
    }
  }
)

export default Input;
