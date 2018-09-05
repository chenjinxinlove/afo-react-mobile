import classnames from 'classnames';
import * as React from 'react';
import Icon from '../../pageages/icon/index';
import './style/steps.styl';

export interface StepsProps {
  icon?: string;
  title?: string;
  active: number;
  iconClass?: string;
  description?: string;
  direction?: string;
  activeColor?: string;
  className?: string;
}

export interface StepItemProps {
  direction: string;
  activeColor: string;
  index: number;
  active: number;
  key: number;
}

class StepItem extends React.Component<StepItemProps, any> {
  render () {
    const {
      direction,
      activeColor,
      index,
      active,
      children
    } = this.props;
    let status = ''
    if (index < active) {
      status = 'finish'
    } else if (index === active) {
      status = 'process'
    }
    const itemCls = classnames('afo-step', {
      'afo-hairline': direction === 'vertical',
      [`afo-step--${direction}`]: true,
      [`afo-step--${status}`]: true
    })
    return (
      <div className={itemCls}>
        <div className="afo-step__title" style={status === 'process' ?  {color: activeColor } : {}}>
          {children}
        </div>
        <div className="afo-step__circle-container">
        {
          status !== 'process' ? <i className="afo-step__circle" /> : <Icon type="right" size="12px" style={{ color: activeColor }} />
        }
        </div>
        <div className="afo-step__line" />
      </div>
    )
  }
}

export interface ItemProps {
  style?: React.CSSProperties;
  children?: any;
}
export class Item extends React.Component<ItemProps, any> {
  render() {
    const {style } = this.props;
    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}
class Steps extends React.Component<StepsProps, any> {
  static defaultProps = {
    direction: 'horizontal',
    activeColor: '#06bf04'
  }
  public static Item = Item;
  static state = {
    active: '',
    items: []
  }
  componentWillMount() {
    const items = this.getChildes();
    this.setState({
      items,
    })
  }
  getChildes = () => {
    return React.Children.map(this.props.children, (c: any) => {
      return {
        ...(c.props as StepItemProps),
      };
    });
  }
  render () {
    const {
      title,
      description,
      direction,
      activeColor,
      className
    } = this.props;
    const active =  this.props.active;
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
              <div className="afo-steps__icon" />
              <div className="afo-steps__message">
                  <div className="afo-steps__title" >{title}</div>
                  <div className="'afo-steps__desc afo-ellipsis" >{description}</div>
              </div>
            </div> : ''
        }
        <div className={itemsCls}>
          {
            this.state.items.map((item: any, index: number) => {
              return (
                <StepItem
                  key={index}
                  direction = {direction || 'horizontal'}
                  activeColor = {activeColor || '#06bf04'}
                  index = {index}
                  active = {active}
                >
                  {
                    item.children
                  }
                </StepItem>
              )
            })
          }
        </div>
      </div >
    )
  }
}

export default Steps
