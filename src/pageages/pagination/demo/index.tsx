import * as React from 'react';
import Pagination from '../index';

class PaginationDeom extends React.Component<any> {
  onChange = (index: number) => {
    window.console.log(index)
  }
  render() {
    return (
      <div>
        <p>基础用法</p>
        <Pagination value={1} total={214} pageSize={5} onChange={this.onChange}/>
        <div style={{height: "50px"}} />
        <p>简单模式</p>
        <Pagination value={1} count={12} mode="simple"/>
        <div style={{height: "50px"}} />
        <p>显示省略号</p>
        <Pagination value={1} total={125} show-page={5} ellipses={true}/>
      </div>   
    );
  }
}

export default PaginationDeom;