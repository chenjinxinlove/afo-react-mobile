import * as React from 'react';
import Input from '../index';

class InputDemo extends React.Component <any, any> {
  render() {
    return (
      <>
        <Input placeholder="asdsdfsdf" value="" type="password" passShow={true}/>
      </>

    )
  }
}

export default InputDemo;
