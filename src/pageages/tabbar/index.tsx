import classnames from 'classnames';
import * as React from 'react';
import './style/tabbar.styl';
import Tab from './Tab';

export type TabIcon = React.ReactElement<any> | { uri: string };
export interface TabBarItemProps {
  size?: string;
  icon?: TabIcon;
  dot?: boolean;
  style?: React.CSSProperties;
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
}

class TabBar extends React.Component<TabbarProps, any> {
  static defaultProps: TabbarProps = {
    barTintColor: 'white',
    fixed: true,
    zIndex: 1
  };

  public static Item = Item;

  getTabs = () => {
    return React.Children.map(this.props.children, (c: any) => {
      return {
        ...(c.props as TabBarItemProps),
      };
    });
  }

  render () {
    const {
      barTintColor,
      fixed,
      zIndex,
      className,
      style,
      children
    } = this.props;
    const tabbarCls = classnames('afo-tabbar', className, {
      'afo-tabbar--fixed': fixed
    })
    const tabsData = this.getTabs();

    const content = tabsData.map((cProps, index) => {
      return (
        <Tab
          key={index}
          dot={cProps.dot}
        />
      );
    });
    return (
      <div className={tabbarCls} style={{zIndex, background:barTintColor}}>
        {
          content
        }
      </div>
    )
  }
}

export default TabBar;