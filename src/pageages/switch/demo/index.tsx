import * as React from 'react';
import Switch from '../index';


class SwitchDeom extends React.Component<any, any> {
  render() {
    return (
      <div>
        <p>基础用法</p>
        <Switch checked={true} />
        <p>禁用状态</p>
        <Switch checked={true} disabled={true} />
      </div>
    );
  }
}

export default SwitchDeom
