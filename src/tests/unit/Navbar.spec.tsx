import {shallow} from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Button from '../../pageages/button/index';
import Navbar from '../../pageages/navbar/';
import DemoNavTag from '../../pageages/navbar/demo';

describe('Navbar', () => {
  // 测试是否能正确渲染
  it('props', () => {
    const wrapper = shallow(<Navbar />)
    expect(wrapper.hasClass('afo-navbar'))
  })
  // 测试props
  it('props', () => {
    const wrapper = shallow(<Navbar title="title" fixed={true} leftContent={<Button icon="back">返回</Button>} rightContent={<Button icon="more" />}/>)
    expect(wrapper.hasClass('is-fixed')).toEqual(true)
  })
  // 测试快照
  it('test snapshots', () => {
    const component = renderer.create(
      <DemoNavTag />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
