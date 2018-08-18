import * as React from 'react';
import Rate from '../index';

class RateDeom extends React.Component<any> {
  onChange = (index: number) => {
    window.console.log(index)
  }
  render() {
    return (
      <div>
        <p>默认显示</p>
        <Rate value={2} onChange={this.onChange}/>
        <div style={{height: "50px"}} />
        <p>自定义显示</p>
        <Rate
          value={3}
          size={25}
          count={6}
          color="#2ba"
          void-color="#ceefe8"
        />
    <div style={{ height: "50px" }} />
        <p>禁操作</p>
        <Rate disabled={true} value={3} />
      </div>
    );
  }
}

export default RateDeom;