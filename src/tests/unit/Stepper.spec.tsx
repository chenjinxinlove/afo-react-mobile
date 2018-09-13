import * as React from 'react';
import * as renderer from 'react-test-renderer';
import DemoStepper from '../../pageages/stepper/demo';

describe('Button', () => {
  // 测试快照
  it('test snapshots', () => {
    const component = renderer.create(
      <DemoStepper />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
