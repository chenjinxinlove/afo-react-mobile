import * as React from 'react';
import TabBar from '../index';

class TarBarDeom extends React.Component<any> {
  render() {
    return (
      <div>
        <TabBar
          barTintColor="white"
        >
          <TabBar.Item imgIcon={{ normal: 'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
        active: 'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png'}}>
            首页
          </TabBar.Item>
          <TabBar.Item icon="mall">
            国务
          </TabBar.Item>
          <TabBar.Item icon="credit-card" dot={true}>
            订单
          </TabBar.Item>
          <TabBar.Item icon="person" info="12">
            个人中心
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default TarBarDeom;
