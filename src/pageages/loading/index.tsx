import classnames from 'classnames';
import * as React from 'react';
import './style//loading.styl';

export interface LoadingProps {
  size?: number;
  color?: 'black' | 'white';
  className?: string;
}

class Loading extends React.Component<LoadingProps, any> {
  static defaultProps = {
    size: 30,
    color: 'black'
  }
  render() {
    const {
      size,
      color,
      className
    } = this.props;
    const cls = classnames(
      className,
      'afo-loading',
      `afo-loading-${color}`

    )
    return (
      <div className={cls}>
        <span className="afo-loading-spinners" style={{width: `${size}px`, height: `${size}px`}}>
          {
            Array.from({length: 12}).map((item, index) => <i key={index} className="afo-loading-spinner" />)
          }
        </span>
      </div>
    )
  }
}

export default Loading;