import * as React from 'react';
import Card from '../index';

class CardDeom extends React.Component<any> {
  render() {
    return (
      <div>
        <Card title="标题" desc="描述信息">
          <div>内容</div>
        </Card>
      </div>
    );
  }
}

export default CardDeom;
