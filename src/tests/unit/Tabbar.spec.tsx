import * as Enzyme from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import DemoTabBar from '../../pageages/tabbar/demo';
import TabBar from '../../pageages/tabbar/index'

describe('TabBar', () => {
  // 测试是否能正确的显示内容
  it ('should render correct contents', () => {
    const wrapper = Enzyme.shallow(
      <TabBar>
        <TabBar.Item icon="mall">
          国务
        </TabBar.Item>
        <TabBar.Item icon="credit-card" dot={true}>
          订单
        </TabBar.Item>
      </TabBar>
    )
    expect(wrapper.find('.afo-tabbar').children()).toHaveLength(2)
  })
  // 测试卷快照
  it ('test snapshots', () => {
    const component = renderer.create(
      <DemoTabBar />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})