import * as React from 'react';
import * as renderer from 'react-test-renderer';
import DemoTextarea from '../../pageages/textarea/demo';

describe('Button', () => {
  // 测试快照
  it('test snapshots', () => {
    const component = renderer.create(
      <DemoTextarea />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
