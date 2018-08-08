import { shallow } from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Tag from '../../pageages/tag/';
import DemoTag from '../../pageages/tag/demo';

describe('Button', () => {
  // 测试props type
  it('props type', () => {
    const wrapper = shallow(<Tag
      type = 'primary'
      plain = {true}
    />)
    expect(wrapper.hasClass('afo-tag--primaryplain')).toBe(true)
    expect(wrapper.hasClass('afo-tag')).toBe(true)
  })
  // 测试props mark
  it('props mark', () => {
    const wrapper = shallow(<Tag
      mark = {true}
      className = 'test'
    />)
    expect(wrapper.hasClass('afo-tag--mark')).toBe(true)
    expect(wrapper.hasClass('test')).toBe(true)
  })
  // 测试快照
  it('test snapshots', () => {
    const component = renderer.create(
      <DemoTag />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
 