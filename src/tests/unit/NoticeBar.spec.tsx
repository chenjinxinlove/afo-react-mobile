import * as Enzyme from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import NoticeBar from '../../pageages/notice-bar/';
import DemoNoticeBar from '../../pageages/notice-bar/demo';

describe('NoticeBar', () => {
  // 测试是否能正确的显示内容
  it ('should render correct contents', () => {
    const wrapper = Enzyme.shallow(<NoticeBar>test</NoticeBar>)
    expect(wrapper.find('.afo-notice-bar__content').text()).toBe('test')
  })
  // 测试不可以滚动
  it ('should not scroll', () => {
    const wrapper = Enzyme.mount(<NoticeBar scrollable={false}>test</NoticeBar>)
    expect(wrapper.find('.afo-notice-bar__content').html()).toBe('<div class="afo-notice-bar__content " style="padding-left: 0px;">test</div>')
  })
  // 测试props
  it ('should props', () => {
    const wrapper = Enzyme.mount(<NoticeBar mode="link" color="#fff" background="#ccc" fps={40} delay={10}>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测</NoticeBar>)
    expect(wrapper.find('.afo-notice-bar__content').prop('style')).toEqual({"animationDelay": "10s", "animationDuration": "0s", "paddingLeft": 0})
  })
  // 测试卷快照
  it ('test snapshots', () => {
    const component = renderer.create(
      <DemoNoticeBar />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})