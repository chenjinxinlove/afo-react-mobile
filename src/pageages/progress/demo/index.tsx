import * as React from 'react';
import Progress from '../index';

class ProgressDeom extends React.Component<any> {
  render() {
    return (
      <div>
        <p>基础用法</p>
        <Progress percentage={50} />
        <div style={{height: "50px"}} />
        <p>置灰</p>
        <Progress percentage={50} inactive={true} />
        <div style={{height: "50px"}} />
        <p>样式定制</p>
        <Progress percentage={75} pivot-text="紫色" pivot-color="#7232dd" color="linear-gradient(to right, #be99ff, #7232dd)" />
      </div>
    );
  }
}

export default ProgressDeom
