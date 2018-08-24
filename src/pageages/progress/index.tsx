import classnames from 'classnames'
import * as React from 'react'
import {isDef} from '../../common/utils/index'
import './style/progress.styl'

export interface ProgressProps {
  inactive?: boolean;
  pivotText?: string;
  pivotColor?: string;
  percentage: number;
  showPivot?:boolean;
  color?: string;
  textColor?: string;
}

class Progress extends React.Component<ProgressProps, any> {
  pivotRef: any;
  progressRef: any;
  static defaultProps = {
    showPivot: true,
    color: '#38f',
    textColor: '#fff'
  }
  constructor (props: ProgressProps) {
    super(props);
    this.pivotRef = React.createRef();
    this.progressRef = React.createRef();
    this.state = {
      pivotWidth: 0,
      progressWidth: 0
    }
  }
  componentDidMount () {
    this.getWidth()
  }
  getWidth = () => {
    const progressWidth = this.progressRef.current.offsetWidth;
    const pivotWidth = this.pivotRef ? this.pivotRef.current.offsetWidth : 0;
    this.setState({
      progressWidth, pivotWidth
    })
  }
  render () {
    const {
      inactive,
      pivotText,
      pivotColor,
      percentage,
      showPivot,
      color,
      textColor,
    } = this.props;
    const { pivotWidth, progressWidth } = this.state;
    const currentColor = inactive ? '#cacaca' : color;
    const text = isDef(pivotText) ? pivotText: percentage + '%';
    const portionCls = classnames('afo-progress__portion', {
      'afo-progress__portion--with-pivot': showPivot && text
    })
    const portionStyle = {
      width: (progressWidth - pivotWidth) * percentage / 100 + 'px',
      background: currentColor
    }
    const pivotStyle = {
      color: textColor,
      background: pivotColor || currentColor
    }
    return (
      <div className="afo-progress" ref={this.progressRef}>
        <span className={portionCls} style={portionStyle}>
        {
          showPivot && text ? <span  ref={this.pivotRef} style={pivotStyle} className="afo-progress__pivot">{ text }</span> : ''
        }
        </span>
      </div>
    )
  }
}

export default Progress
