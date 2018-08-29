import * as React from 'react';
import Slider from '../index';

class SliderDeom extends React.Component<any> {
  onChange = (index: number) => {
    window.console.log(index)
  }
  render() {
    return (
      <div>
        <p>基本用法</p>
        <Slider value={50} onChange={this.onChange} />
        <div style={{height: '50px'}} />
        <p>指定选择范围</p>
        <Slider value={50} min={10} max={90} />
        <div style={{height: '50px'}} />
        <p>禁操作</p>
        <Slider value={50} disabled={true} />
        <p>指定步长</p>
        <div style={{height: '50px'}} />
        <Slider value={50} step={10} bar-height="4px" />
      </div>
    );
  }
}

export default SliderDeom;
