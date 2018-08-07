import * as React from 'react';
import Button from '../../button/index';
import Navbar from '../index';


class NavbarDemo extends React.Component<any, any> {
  handleBack () {
    alert('click')
  }
  render () {
    return (
      <div>
        <Navbar 
          title="我是fixed标题" 
          fixed={true} 
          leftContent={<Button icon="back" onClick={this.handleBack}>返回</Button>}
          rightContent={<Button icon="more" />} />
      </div>
    )
  }
}

export default NavbarDemo;