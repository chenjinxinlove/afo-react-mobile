import * as React from 'react';
import  NoticeBar from '../index';

class NoticeBarDeom extends React.Component<any> {
  onClick = () => {
    window.console.log('onClickonClickonClick')
  } 
  render() {
    return (
      <div>
        <NoticeBar leftIcon="http://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png">
          最近做的项目是从0开始采用Vue作为数据驱动框架。所以有很多Vue实战上的经验体会，下面就专门拿几个常用的但难度不高的VUe功能说一下
        </NoticeBar>
        <NoticeBar scrollable={false}>
          最近做的项目是从0开始采用Vue作为数据驱动框架。所以有很多Vue实战上的经验体会，下面就专门拿几个常用的但难度不高的VUe功能说
        </NoticeBar>
        <NoticeBar mode="closeable">
          最近做的项目是从0开始采用Vue作为数据驱动框架。所以有很多Vue实战上的经验体会，下面就专门拿几个常用的但难度不高的VUe功能说
        </NoticeBar>
        <NoticeBar onClick={this.onClick} mode="link">
          最近做的项目是从0开始采用Vue作为数据驱动框架。所以有很多Vue实战上的经验体会，下面就专门拿几个常用的但难度不高的VUe功能说
        </NoticeBar>
      </div>
    );
  }
}

export default NoticeBarDeom;
