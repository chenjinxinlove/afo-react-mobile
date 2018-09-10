import * as React from 'react';
import * as renderer from 'react-test-renderer';
import DemoRadio from '../../pageages/radio/demo';

describe('Button', () => {
  // 测试快照
  it('test snapshots', () => {
    const component = renderer.create(
      <DemoRadio />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
