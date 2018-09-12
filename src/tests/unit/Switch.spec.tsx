import * as React from 'react';
import * as renderer from 'react-test-renderer';
import DemoSwitch from '../../pageages/switch/demo';

describe('Button', () => {
  // 测试快照
  it('test snapshots', () => {
    const component = renderer.create(
      <DemoSwitch />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
