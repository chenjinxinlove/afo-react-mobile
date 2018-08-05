import * as React from 'react';
import Button from '../index';
import './deom.css';

class ButtonDeom extends React.Component<any> {
  render() {
    return (
      <div className="ButtonDeom">
        <div>
          <div>
            <p>按钮用途</p>
            <div className="show">
              <Button>默认按钮</Button>
              <Button effect="submit">提交按钮</Button>
            </div>
          </div>
          <div>
            <p>按钮类型</p>
            <div className="show">
              <Button>默认按钮</Button>
              <Button type="primary">主要按钮</Button>
              <Button type="danger">危险按钮</Button>
            </div>
          </div>
          <div>
            <p>素按钮类型</p>
            <div className="show">
              <Button plain={true}>默认按钮</Button>
              <Button plain={true} type="primary">主要按钮</Button>
              <Button plain={true} type="danger">危险按钮</Button>
            </div>
          </div>
          <div>
            <p>按钮大小</p>
            <div className="show marginbottom">
              <Button>默认按钮</Button>
              <Button size="small">小号按钮</Button>
            </div>
            <Button size="large">大号按钮</Button>
          </div>
          <div>
            <p>禁用状态</p>
            <Button disabled={true}>禁用状态</Button>
          </div>
          <div>
            <p>行内按钮</p>
            <Button inline={true}>行内按钮</Button>
          </div>
          <div>
            <p>loading按钮</p>
            <Button loading={true}>loading按钮</Button>
          </div>
          <div>
            <p>Icon按钮</p>
            <Button icon="left">Icon按钮</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ButtonDeom;
