import { shallow } from 'enzyme';
import * as React from 'react';
import Button from '../../pageages/button/';


describe('Button', () => {
  // 测试是否能正确的显示内容
  // it('should render correct contents', () => {
  //   const wrapper = enzyme.shallow(<Button icon="test" />);
  //   expect(wrapper.find('i').classes()).toContain('afo-test')
  // })
  // 测试props
  it('props', () => {
    const wrapper = shallow(<Button
        effect= "submit"
        type="primary"
        size="large"
        disabled={true}
        inline={true}
        plain={true} />)
    expect(wrapper.hasClass('afo-button--primaryplain')).toEqual(true);
  })
})