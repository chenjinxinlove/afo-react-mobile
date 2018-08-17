import classnames from 'classnames';
import * as React from 'react';
import './style/tabbar.styl';
import Tab from './Tab';

// export type TabIcon = React.ReactElement<any> | { uri: string };
export interface ImgIconTypes {
  normal: string;
  active: string;
}
export interface TabBarItemProps {
  size?: string;
  icon?: string;
  dot?: boolean;
  style?: React.CSSProperties;
  children?: any;
  info?: string | number;
  imgIcon?: ImgIconTypes;
}

export class Item extends React.Component<TabBarItemProps, any> {
  render() {
    const prefixCls = "afo-tarber-item"
    const {style } = this.props;
    return (
      <div className={prefixCls} style={style}>
        {this.props.children}
      </div>
    );
  }
}

export interface TabbarProps {
  className?: string;
  barTintColor?: string;
  fixed?: boolean;
  zIndex?: number;
  style?:React.CSSProperties;
  active? : number;
}

class TabBar extends React.Component<TabbarProps, any> {
  static defaultProps: TabbarProps = {
    barTintColor: 'white',
    fixed: true,
    zIndex: 1,
    active: 0
  };
  static state = {
    active: 0
  }
  componentWillMount () {
    this.setState({
      active: this.props.active
    })
  }
  public static Item = Item;

  getTabs = () => {
    return React.Children.map(this.props.children, (c: any) => {
      return {
        ...(c.props as TabBarItemProps),
      };
    });
  }
  onClick = (index: number) => {
    this.setState({
      active: index
    })
  }
  render () {
    const {
      barTintColor,
      fixed,
      zIndex,
      className,
      style
    } = this.props;
    const tabbarCls = classnames('afo-tabbar', className, {
      'afo-tabbar--fixed': fixed
    })
    const tabsData = this.getTabs();

    const content = tabsData.map((cProps, index) => {
      return (
        <Tab
          key={index}
          index={index}
          icon={cProps.icon}
          dot={cProps.dot}
          info={cProps.info}
          onPress={this.onClick}
          active={this.state.active}
          imgIcon={cProps.imgIcon}
        >{cProps.children}</Tab>
      );
    });
    return (
      <div className={tabbarCls} style={{zIndex, background:barTintColor, ...style}}>
        {
          content
        }
      </div>
    )
  }
}

export default TabBar;