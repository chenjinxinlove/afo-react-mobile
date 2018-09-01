import classnames from 'classnames'
import * as React from 'react';
import * as Raf from '../../common/utils/raf';


interface StringArray {
  [index: number]: string;
}
export interface CollapseProps {
  accordion?: boolean;
  value: string | number | StringArray;
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
  accordion: boolean;
  expanded: string | number | StringArray;
  value: any;
  style?: React.CSSProperties;
  children?: any;
}

export class CollapseItem extends React.Component<CollapseItemProps, any> {
  wrapperRef: any;
  contentRef: any;
  constructor (props: CollapseItemProps) {
    super(props)
    this.state = {
      show: null,
      inited: null
    }
    this.wrapperRef = React.createRef()
    this.contentRef = React.createRef()
  }
  componentWillMount () {
    this.setState({
      show: this.props.expanded,
      inited: this.props.expanded
    })
  }
  componentDidMount (){
    if (this.props.expanded) {
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
      wrapper.style.height = this.props.expanded ? 0 : contentHeight
      Raf.raf(() => {
        wrapper.style.height = this.props.expanded ? contentHeight : 0
      })
    })
  }
  onClick () {
    const name = this.props.accordion && this.props.name === this.props.value ? '' : this.props.name
    const expanded = !this.props.expanded
    this.props.switch(name, expanded)
  }

  onTransitionEnd () {
    if (!this.props.expanded) {
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
      expanded,
      children,
      title
    } = this.props;
    const {
      inited,
      show
    } = this.state;
    return (
      <div className={classnames('afo-collapse-item', {
        'afo-collapse-item--expanded': expanded,
        'afo-hairline--top': index
      })}>
        <div className="afo-cell afo-cell--clickable afo-hairlines afo-collapse-item__title" onClick={this.onClick}>
          <div className="afo-cell__title">
              <span>{title}</span>
          </div>
          <i className="afo-icon afo-icon-arrow afo-cell__right-icon" />
        </div>
        {
          inited || show  ?
          <div ref={this.wrapperRef} className='afo-collapse-item__wrapper' onTransitionEnd={this.onTransitionEnd}>
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
  switch (name: any, expanded: any) {
    if (!this.props.accordion) {
      const value = this.props.value
      name = expanded
        ? value.concat(name)
        : value.filter(activeName => activeName !== name)
        this.setState({
          value
        })
    }
    this.props.onChange ? this.props.onChange(name) : ''
    this.setState({
      name
    })
  }
  render () {
    const {items} = this.state;
    return (
      <div className="afo-collapse afo-hairline--top-bottom">
        {
          items.map((item, index) => {
            return (

            )
          })
        }
      </div>
    )
  }
}
