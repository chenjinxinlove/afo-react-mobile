import * as React from 'react';
import TabBar from '../index';

class TarBarDeom extends React.Component<any> {
  render() {
    return (
      <div>
        <TabBar
          barTintColor="white"
        >
          <TabBar.Item>
            首页
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default TarBarDeom;
