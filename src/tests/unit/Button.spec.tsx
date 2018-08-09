import { shallow } from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Button from '../../pageages/button/';
import DemoButton from '../../pageages/button/demo';


describe('Button', () => {
  // 测试是否能正确的显示内容
  it('should render correct contents', () => {
    const wrapper = shallow(<Button icon="test" />);
    expect(wrapper.find('i').hasClass('afo-icon-test')).toBe(true)
  })
  // 测试props
  it('props', () => {
    const wrapper = shallow(<Button
      effect= "submit"
      type="primary"
      size="large"
      disabled={true}
      inline={true}
      plain={true} />)
    expect(wrapper.prop('type')).toBe('submit');
    expect(wrapper.prop('disabled')).toBe(true);
    expect(wrapper.hasClass('afo-button--primaryplain')).toEqual(true);
  })
  // 测试事件可以被处理
  it('events-called', () => {
    const clickHandler = jest.fn()
    const wrapper = shallow(<Button onClick={clickHandler}/>)
    wrapper.simulate('click')
    expect(clickHandler).toBeCalled()
  })
  // 测试事件disabled不被响应
  it('events-no-disabled-called', () => {
    const clickHandler = jest.fn()
    const wrapper = shallow(<Button onClick={clickHandler} disabled={true} />)
    wrapper.simulate('click')
    expect(clickHandler).not.toBeCalled()
  })
   // 测试事件disabled不被响应
   it('events-no-loading-called', () => {
    const clickHandler = jest.fn()
    const wrapper = shallow(<Button onClick={clickHandler} loading={true} />)
    wrapper.simulate('click')
    expect(clickHandler).not.toBeCalled()
  })
  // 测试快照
  it('test snapshots', () => {
    const component = renderer.create(
      <DemoButton />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})