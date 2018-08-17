import * as React from 'react';
export interface TabProps {
  dot?: boolean;
  title?: string;
}
class Tab extends React.PureComponent<TabProps, any> {
  render() {
    const {
      title,
    } = this.props;
    return (
      <div className={`afo-tabbar-item`}>
        {title}
      </div>
    );
  }
}

export default Tab;
