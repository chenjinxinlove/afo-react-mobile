import * as React from 'react';
import Radio from '../index';

class RadioDeom extends React.Component<any> {
  render() {
    return (
      <div>
        <p>基础用法</p>
        <Radio value="1">
          <Radio.Item name="1">单选框 1</Radio.Item>
          <Radio.Item name="2">单选框 2</Radio.Item>
        </Radio>
        <p>禁用状态</p>
        <Radio value="1" disabled={true}>
          <Radio.Item name="1">单选框 1</Radio.Item>
          <Radio.Item name="2">单选框 2</Radio.Item>
        </Radio>
      </div>
    );
  }
}

export default RadioDeom
