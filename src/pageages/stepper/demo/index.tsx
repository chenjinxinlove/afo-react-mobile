import * as React from 'react';
import Stepper from '../index';

class StepperDeom extends React.Component<any> {
  render() {
    return (
      <div>
        <p>基础用法</p>
        <Stepper value={1} />
        <p>禁用状态</p>
        <Stepper value={2} disabled={true} />
        <p>高级用法</p>
        <Stepper
          value={3}
          integer={true}
          min={5}
          max={40}
          step={2}
          default-value={9}
        />
      </div>
    );
  }
}

export default StepperDeom
