import classnames from 'classnames';
import * as React from 'react';
import { withDefaultProps } from '../utils';

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

type DefaultProps = Partial<typeof defaultProps>;

type InputInnerProps = {
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  children?: React.ReactChild;
} & DefaultProps;

const InputState = {
  isFocus: false,
  inputValue: ''
};

type State = Readonly<typeof InputState>;


const Input = withDefaultProps(
  defaultProps,
  class InputInner extends React.Component<InputInnerProps, State> {
    readonly state: State = InputState;
    private inputRef: React.RefObject<any> = React.createRef();
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
    public render() {
      const {
        type,
        value,
        disabled,
        readonly,
        maxlength,
        placehololder,
        autocomplete,
        autofocus,
        clearable,
        passShow,
        className,
        style,
        children,
        prepend,
        ...restProps
      } = this.props;
      const {
        isFocus,
        inputValue
      } = this.state;
      const inputCls = classnames('afo-input', className, {
        'afo-input--active': isFocus
      })
      return (
        <div className={inputCls}>
          {
            prepend ? <div className="afo-input__prepend">{prepend}</div> : ''
          }
          <input
            className="afo-input__field"
            ref={this.inputRef}
            value={inputValue}
            {...restProps}
            type={type}
            disabled={disabled}
            readOnly={readonly}
            autoComplete={autocomplete}
            autoFocus={autofocus}
            onFocus={(e) => this.handleFoucus(e)}
            onBlur={(e) => this.handleBlur(e)}
            onChange={(e) => this.changeHander(e)}
          />
        </div>
      )
    }
  }
)
