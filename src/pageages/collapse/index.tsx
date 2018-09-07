import classnames from 'classnames'
import * as React from 'react';
import {isDef} from '../../common/utils/index';
import * as Raf from '../../common/utils/raf';
import './style/collapse.styl'
export interface CollapseProps {
  accordion?: boolean;
  value: any;
  onChange?: (name: any) => void;
}

export interface ItemProps {
  name?: string |  number;
  title?: string;
  style?: React.CSSProperties;
  children?: any;
}
export class Item extends React.Component<ItemProps, any> {
  render() {
    const {style } = this.props;
    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}

export interface  CollapseItemProps {
  name?: string |  number;
  title?: string;
  switch: (name: any, expanded: any) => void;
  index: number;
  value: any;
  accordion: boolean;
  style?: React.CSSProperties;
  children?: any;
}

interface CollapseItemState  {
  show: boolean;
  inited: boolean;
  expanded: boolean;
}
export class CollapseItem extends React.Component<CollapseItemProps, CollapseItemState> {
  wrapperRef: any;
  contentRef: any;
  constructor (props: CollapseItemProps) {
    super(props)
    this.state = {
      show: false,
      inited: false,
      expanded: false
    }
    this.wrapperRef = React.createRef()
    this.contentRef = React.createRef()
  }
  componentWillMount () {
    const {value, name, index} = this.props;
    const currentName = isDef(name) ? name : index
    const expanded = this.props.accordion ? value === currentName : value.some((n:any) => n === currentName)
    this.setState({
      show: expanded,
      inited: expanded,
      expanded
    })
  }
  componentWillReceiveProps(nextProps: CollapseItemProps) {
    const {value, name, index} = nextProps;
    const currentName = isDef(name) ? name : index
    const expanded = nextProps.accordion ? value === currentName : value.some((n:any) => n === currentName)
    this.setState({
      show: expanded,
      inited: expanded,
      expanded
    })
  }
  componentDidMount (){
    if (this.state.expanded) {
      this.setState({
        show: true,
        inited: true
      })
    }

    setTimeout(() => {
      const content = this.contentRef.current
      const wrapper = this.wrapperRef.current
      if (!content || !wrapper) {
        return
      }
      const contentHeight = content.clientHeight + 'px'
      wrapper.style.height = this.state.expanded ? 0 : contentHeight
      Raf.raf(() => {
        wrapper.style.height = this.state.expanded ? contentHeight : 0
      })
    })
  }
  onClick () {
    const name = this.props.accordion && this.props.name === this.props.value ? '' : this.props.name
    const expanded = !this.state.expanded
    // window.console.log(name, expanded)
    this.props.switch(name, expanded)
  }

  onTransitionEnd () {
    if (!this.state.expanded) {
      this.setState({
        show:false
      })
    } else {
      this.wrapperRef.current.style.height = null
    }
  }
  render () {
    const {
      index,
      children,
      title
    } = this.props;
    const {
      inited,
      show,
      expanded
    } = this.state;
    return (
      <div className={classnames('afo-collapse-item', {
        'afo-collapse-item--expanded': expanded,
        'afo-hairline--top': index
      })}>
        <div className="afo-cell afo-cell--clickable afo-hairlines afo-collapse-item__title" onClick={() => this.onClick()}>
          <div className="afo-cell__title">
              <span>{title}</span>
          </div>
          <i className="afo-icon afo-icon-arrow afo-cell__right-icon" />
        </div>
        {
          inited || show  ?
          <div ref={this.wrapperRef} className='afo-collapse-item__wrapper' onTransitionEnd={() => this.onTransitionEnd()}>
          <div ref={this.contentRef} className='afo-collapse-item__content'>
            {
              children
            }
          </div>
        </div> : ''
        }

      </div>
    )
  }
}

class Collapse extends React.Component<CollapseProps, any> {
  contentRef: any;
  defaultProps = {
    accordion: false
  }
  constructor (props: CollapseProps) {
    super(props);
    this.contentRef = React.createRef();
    this.state = {
      items: []
    }
  }
  public static Item = Item;
  componentWillMount() {
    const items = this.getChildes();
    const value = this.props.value;
    this.setState({
      items,
      value
    })
  }
  getChildes = () => {
    return React.Children.map(this.props.children, (c: any) => {
      return {
        ...(c.props as CollapseItemProps),
      };
    });
  }
  switch = (name: any, expanded: any) => {
    let value = this.state.value || []
    if (!(this.props.accordion || false)) {
      name = expanded
        ? value = value.concat(name)
        : value = value.filter((activeName:any) => activeName !== name)
        this.setState({
          value
        })
    }
    window.console.log(name, value, expanded)
    this.props.onChange ? this.props.onChange(name) : ''
    this.setState({
      value:name
    })
  }
  render () {
    const {items} = this.state;
    return (
      <div className="afo-collapse afo-hairline--top-bottom">
        {
          items.map((item:any, index:number) => {
            return (
              <CollapseItem
                key={index}
                value={this.state.value}
                title={item.title}
                name={item.name}
                switch={this.switch}
                index={index}
                accordion={this.props.accordion || false}
              >{item.children}</CollapseItem>
            )
          })
        }
      </div>
    )
  }
}

export default Collapse;
