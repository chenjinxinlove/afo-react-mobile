import * as React from 'react';
import Badge from '../index';
import './demo.css';
class BadgeDemo extends React.Component<any> {
  render() {
    return (
      <ul>
          <li>
          <Badge dot={true}>
              <span style={{ width: '26px', height: '26px', background: '#ddd', display: 'inline-block' }} />
          </Badge>
          <span style={{ marginLeft: 12 }}>点徽章</span>
          </li>
          <li>
              <Badge text={'促'} corner={true}>
                <div className="corner-badge">使用corner属性</div>
              </Badge>
          </li>
          <li>
          <Badge text={0} style={{ marginLeft: 12 }}>文本 number 0</Badge>
          <Badge text={'new'} style={{ marginLeft: 12 }} />
          </li>
          <li>
            行销:
            <Badge text="减" hot={true} style={{ marginLeft: 12 }} />
            <Badge text="惠" hot={true} style={{ marginLeft: 12 }} />
            <Badge text="免" hot={true} style={{ marginLeft: 12 }} />
            <Badge text="反" hot={true} style={{ marginLeft: 12 }} />
            <Badge text="HOT" hot={true} style={{ marginLeft: 12 }} />
          </li>
          <li>
            定做
            <Badge text="券" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#f19736', borderRadius: 2 }} />
            <Badge text="NEW" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }} />
            <Badge text="自动缴费"
                style={{
                marginLeft: 12,
                padding: '0 3px',
                backgroundColor: '#fff',
                borderRadius: 2,
                color: '#f19736',
                border: '1px solid #f19736',
                }}
            />
          </li>
      </ul>
    )
  }
};

export default BadgeDemo;


