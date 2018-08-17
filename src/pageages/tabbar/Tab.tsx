import classnames from 'classnames';
import * as React from 'react';
import {isDef} from '../../common/utils/index'
import Icon from '../../pageages/icon/index'
import { ImgIconTypes } from './index'

export interface TabProps {
  index?: number;
  dot?: boolean;
  icon?: string ;
  info?: string | number;
  title?: string;
  size?: string;
  active?: number;
  onPress?: (index: any) => void;
  imgIcon?: ImgIconTypes;
}
class Tab extends React.PureComponent<TabProps, any> {
  static defaultProps: TabProps = {
    size: '21px',
    dot: false
  }
  renderIcon = () => {
    const {
      icon,
      size,
      index,
      active,
      imgIcon
    } = this.props;
    if (imgIcon) {
      return <img src={active === index ? imgIcon.active : imgIcon.normal} alt=""/>
    } else {
      return(icon ? <Icon type={icon} size={size}/> : '')
    }
    
  }
  onClick = (index: any) => {
    const onClick = this.props.onPress;
    if (onClick) {
      onClick(index);
    }
  }
  render() {
    const {
      children,
      dot,
      info,
      index,
      active
    } = this.props;
    const iconCls = classnames('afo-tabbar-item__icon', {
      'icon--dot': dot
    })
    const itemCls = classnames('afo-tabbar-item', {
      'afo-tabbar-item--active': active === index
    })
    return (
      <div className={itemCls} onClick={() => this.onClick(index)}>
        <div className={iconCls}>
          {this.renderIcon()}
          {isDef(info) ? <div className="icon__info">{info}</div> : ''}
        </div>
        {children}
      </div>
    );
  }
}

export default Tab;