import classnames from 'classnames'
import * as React from 'react'

export interface StepsProps {
  icon?: string;
  title?: string;
  active?: number;
  iconClass?: string;
  description?: string;
  direction?: string;
  activeColor?: string;
  className?: string;
}

class Steps extends React.Component<StepsProps, any> {
  defaultProps = {
    direction: 'horizontal',
    activeColor: '#06bf04'
  }
  render () {
    const {
      icon,
      title,
      active,
      iconClass,
      description,
      direction,
      activeColor,
      className
    } = this.props;
    const stepsCls = classnames('afo-steps', className, {
      [`afo-steps--${direction}`]: true
    })
    const itemsCls = classnames('afo-steps__items', {
      'afo-steps__items--alone': !title && !description
    })
    return (
      <div className={stepsCls} >
        {
          title || description ?
            <div className="afo-steps__status">
              <div className="afo-steps__icon"></div>
              
              <div className="afo-steps__message">
                  <div className="afo-steps__title" />{title}</div>
                  <div className="'afo-steps__desc afo-ellipsis" />{description}</div>
              </div>
             </div> : ''
        }
      <div className="itemsCls">
        {
          children
        }
      </div>
    </div >
    )
  }
}

export default Steps