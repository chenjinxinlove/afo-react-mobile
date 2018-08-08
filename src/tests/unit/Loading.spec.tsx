import { shallow } from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Loading from '../../pageages/loading/';
import DemoLoading from '../../pageages/loading/demo';

describe('Button', () => {
  // 测试props
  it('props', () => {
    const wrapper = shallow(<Loading
      color = 'white'
      size = {40}
    />)
    expect(wrapper.find('.afo-loading-spinners').prop('style')).toEqual({"width": "40px", "height": "40px"})
  })
  // 测试快照
  it('test snapshots', () => {
    const component = renderer.create(
      <DemoLoading />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
 