import * as React from 'react';
import Steps from '../index'
interface StepsState  {
  active: number;
}
class StepsDeom extends React.Component<any, StepsState> {
  public state: StepsState = {
    active: 1
  }
  onClick = () => {
    this.setState({
      active : ++this.state.active % 4
    })
  }
  render() {
    return (
      <div>
        <p>基本用法</p>
        <Steps active={this.state.active}>
          <Steps.Item>买家下单</Steps.Item>
          <Steps.Item>商家接单</Steps.Item>
          <Steps.Item>买家提货</Steps.Item>
          <Steps.Item>交易完成</Steps.Item>
        </Steps>
        <div style={{height: '50px'}} />
        <div onClick={this.onClick}>下一步</div>
        <p>竖着</p>
        <div style={{height: '50px'}} />
        <Steps direction="vertical" active={this.state.active} active-color="#f60">
          <Steps.Item>
            <h3>买家下单</h3>
            <p>2016-07-12 12:40</p>
          </Steps.Item>
          <Steps.Item>
            <h3>商家接单</h3>
            <p>2016-07-11 10:00</p>
          </Steps.Item>
          <Steps.Item>
            <h3>买家提货</h3>
            <p>2016-07-10 09:30</p>
          </Steps.Item>
        </Steps>

      </div>
    );
  }
}

export default StepsDeom;
