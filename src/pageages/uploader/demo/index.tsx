import * as React from 'react';
import Uploader from '../index';

class UploaderDeom extends React.Component<any> {
  render() {
    return (
      <div>
        <p>基础用法</p>
        <Uploader accept="image/gif, image/jpeg" maxSize={36000}>
          <span>上传</span>
        </Uploader>
      </div>
    );
  }
}

export default UploaderDeom
