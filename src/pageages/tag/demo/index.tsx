import * as React from 'react';
import Tag from '../index';

export default class TagDemo extends React.Component<any, any> {
  render() {
    return (
      <div>
        <div className="show">
          <Tag>标签</Tag>
          <Tag type="primary">标签</Tag>
          <Tag type="danger">标签</Tag>
        </div>
        <div className="show">
          <Tag plain={true}>标签</Tag>
          <Tag type="primary" plain={true}>标签</Tag>
          <Tag type="danger" plain={true}>标签</Tag>
        </div>
        <div className="show">
          <Tag mark={true}>标签</Tag>
          <Tag type="primary" mark={true}>标签</Tag>
          <Tag type="danger" mark={true}>标签</Tag>
        </div>
      </div>
    )
  }
}