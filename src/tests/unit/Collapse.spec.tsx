import * as React from 'react';
import * as renderer from 'react-test-renderer';
import DemoTag from '../../pageages/collapse/demo';

describe('Button', () => {
  // 测试快照
  it('test snapshots', () => {
    const component = renderer.create(
      <DemoTag />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
