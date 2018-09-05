import * as React from 'react';
import Steps from '../index'
class StepsDeom extends React.Component<any> {
  render() {
    return (
      <div>
        <p>基本用法</p>
        <Steps active={2}>
          <Steps.Item>买家下单</Steps.Item>
          <Steps.Item>商家接单</Steps.Item>
          <Steps.Item>买家提货</Steps.Item>
          <Steps.Item>交易完成</Steps.Item>
        </Steps>
        <div style={{height: '50px'}} />
        <p>竖着</p>
        
        <div style={{height: '50px'}} />
        
      </div>
    );
  }
}

export default StepsDeom;
