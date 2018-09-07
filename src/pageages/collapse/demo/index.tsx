import * as React from 'react';
import Collapse from '../index'
interface CollapseState  {
  active: [string];
}
class CollapseDeom extends React.Component<any, CollapseState> {
  public state: CollapseState = {
    active: ['1']
  }
  render() {
    return (
      <div>
        <p>基本用法</p>
        <Collapse value={this.state.active}>
          <Collapse.Item title="1" name="1">
            111111111
          </Collapse.Item>
        <Collapse.Item title="2" name="2">
          22222222
        </Collapse.Item>
        <Collapse.Item title="3" name="3">
          2222222222
        </Collapse.Item>
    </Collapse>

      </div>
    );
  }
}

export default CollapseDeom;
