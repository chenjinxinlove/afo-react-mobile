import { shallow } from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Icon from '../../pageages/icon/';
import DemoIcon from '../../pageages/icon/demo';

describe('Button', () => {
  // 测试是否能正确的显示内容
  it('should render correct contents', () => {
    const wrapper = shallow(<Icon type = "select" />);
    expect(wrapper.find('i').hasClass('afo-icon-select')).toBe(true)
  })
  // 测试props
  it('props', () => {
    const wrapper = shallow(<Icon
        type = 'select'
        color = 'red'
        size = '24px'
    />)
    expect(wrapper.prop('style')).toEqual({"color": "red", "fontSize": "24px"})
  })
  // 测试快照
  it('test snapshots', () => {
    const component = renderer.create(
      <DemoIcon />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
 