import * as React from 'react';
import Tab from '../index';

class TabDeom extends React.Component<any> {
  onChange = (index: number) => {
    window.console.log(index)
  }
  onClickDisabled = (index: number) => {
    window.console.log(index)
  }
  onClick = (index: number) => {
    window.console.log(index)
  }
  render() {
    return (
      <div>
      <p>默认显示</p>
        <Tab active={0}>
          <Tab.Item title='选项1' >
            内容1
          </Tab.Item >
          <Tab.Item title='选项2'>
            内容2
          </Tab.Item >
          <Tab.Item title='选项3'>
            内容3
          </Tab.Item >
          <Tab.Item title='选项4'>
            内容4
          </Tab.Item >
        </Tab>
        <div style={{height: "50px"}} />
        <p>显示card类型</p>
        <Tab active={0} type="card" onClick={this.onClick} onChange={this.onChange} >
          <Tab.Item title='选项1'>
            内容1
          </Tab.Item >
          <Tab.Item title='选项2'>
            内容2
          </Tab.Item >
          <Tab.Item title='选项3'>
            内容3
          </Tab.Item >
          <Tab.Item title='选项4'>
            内容4
          </Tab.Item >
        </Tab>
        <p>禁用类型</p>
        <Tab active={0} onDisabled={this.onClickDisabled}>
          <Tab.Item title='选项1' >
            内容1
          </Tab.Item >
          <Tab.Item title='选项2' disabled={true} >
            内容2
          </Tab.Item >
          <Tab.Item title='选项3'>
            内容3
          </Tab.Item >
          <Tab.Item title='选项4'>
            内容4
          </Tab.Item >
        </Tab>
        <div style={{height: "50px"}} />
        <p>横向滑动</p>
        <Tab active={0}>
          <Tab.Item title='选项1' >
            内容1
          </Tab.Item >
          <Tab.Item title='选项2'>
            内容2
          </Tab.Item >
          <Tab.Item title='选项3'>
            内容3
          </Tab.Item >
          <Tab.Item title='选项4'>
            内容4
          </Tab.Item >
          <Tab.Item title='选项5' >
            内容5
          </Tab.Item >
          <Tab.Item title='选项6'>
            内容6
          </Tab.Item >
          <Tab.Item title='选项7'>
            内容7
          </Tab.Item >
          <Tab.Item title='选项8'>
            内容8
          </Tab.Item >
        </Tab>
        {/* <div style={{height: "50px"}} />
        <p>滑动切换</p>
        <Tab active={0} swipeable={true}>
          <Tab.Item title='选项1' >
            内容1
          </Tab.Item >
          <Tab.Item title='选项2'>
            内容2
          </Tab.Item >
          <Tab.Item title='选项3'>
            内容3
          </Tab.Item >
          <Tab.Item title='选项4'>
            内容4
          </Tab.Item >
        </Tab> */}
      </div>   
    );
  }
}

export default TabDeom;