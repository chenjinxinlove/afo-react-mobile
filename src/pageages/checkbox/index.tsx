import classnames from "classnames";
import * as React from 'react';
import { withDefaultProps } from '../utils';

const defaultProps = {
  labelDisabled: false,
  shape: 'round',
  disabled: false
}

type DefaultProps = Readonly<typeof defaultProps>;

type CheckoutProps = {
  name: string;
  value: string | number;
  disabled?: boolean;
  labelPosition?: string;
  className?: string,
  style?: React.CSSProperties;
  children?: React.ReactNode
} & DefaultProps;

const Checkout = withDefaultProps(
  defaultProps,
  class extends React.Component<CheckoutProps, any> {
    public render () {
      return (
        <div className="afo-checkout">
          <div className={checkCls} onClick={(e) => this.toggle(e)>
            <i name="success" :checked="checked"/>
          </div>
          {
            children ?
            <span className={labelCls} onClick={() => this.toggle('label')}>
            {
              children
            }
          </span> : ''
          }

        </div>
      )
    }
  }
)

