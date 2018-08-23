import classnames from 'classnames';
import * as React from 'react';
import './style/pagination.styl';

export interface PaginationProps{
  value: number,
  prevText?: string;
  nextText?: string;
  count?: number;
  ellipses?: boolean;
  mode?:'multi'| 'simple';
  pageSize?:number;
  showPage?:number;
  total?:number;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (index: number) => void;
}

class Pagination extends React.Component<PaginationProps, any> {
  static defaultProps = {
    mode: 'multi',
    pageSize: 10,
    showPage: 5,
    total: 0
  }
  static state = {
    value: 0,
    computedPageCount: 0
  }
  componentWillMount () {
    const {count, total, pageSize, value} = this.props; 
    const c = count || Math.ceil((total || 0) / (pageSize || 5))
    this.setState({
      computedPageCount: Math.max(1, c),
      value
    })
  }
  selectPage (page: number) {
    page = Math.max(1, page)
    page = Math.min(this.state.computedPageCount, page)
    if (this.state.value !== page) {
      this.setState({
        value: page
      })
      this.props.onChange ? this.props.onChange(page) : ''
    }
  }
  pages () {
    const {value, computedPageCount} = this.state;
    const {
      ellipses, 
      pageSize,
      showPage,
    } = this.props;
    const pages = []
    const pageCount = computedPageCount

    let startPage = 1
    let endPage = pageCount
    const isMaxSized = showPage !== undefined && showPage < pageCount
    if (isMaxSized) {
      startPage = Math.max(value - Math.floor((pageSize || 10) / 2), 1)
      endPage = startPage + (showPage || 5) - 1
    }
    if (endPage > pageCount) {
      endPage = pageCount
      startPage = endPage - (showPage || 5) + 1
    }
    for (let num = startPage; num <= endPage; num++) {
      const page = this.makePage(num, num, num === value)
      pages.push(page)
    }
    if (isMaxSized && (showPage || 5) > 0 && ellipses) {
      if (startPage > 1) {
        const previousPageSet = this.makePage(startPage - 1, '...', false)
        pages.unshift(previousPageSet)
      }
      if (endPage < pageCount) {
        const nextPageSet = this.makePage(endPage + 1, '...', false)
        pages.push(nextPageSet)
      }
    }
    return pages
  }
  makePage (num:number, text: any, active: any) {
    return { num, text, active }
  }
  render () {
    const {
      prevText,
      nextText,
      mode,
      style, 
      className
    } = this.props;
    const {value, computedPageCount} = this.state;
    const isMultiMode = mode === 'multi';
    const paginationCls = classnames('afo-pagination', className, {
      'afo-pagination--simple': !isMultiMode
    })
    const prevCls = classnames({
      'afo-hairline': true,
      'afo-pagination__item': true,
      'afo-pagination__item--disabled': value === 1,
      'afo-pagination__prev': true
    })
    const nextCls = classnames({
      'afo-hairline': true,
      'afo-pagination__item': true,
      'afo-pagination__item--disabled': value === computedPageCount,
      'afo-pagination__next': true
    })
    const pageDesc = value + '/' + computedPageCount;
    const pages = this.pages();
    return (
      <ul className={paginationCls} style={style}>
        <li className={prevCls} onClick={() => this.selectPage(value - 1)}>
          {prevText || '上一页'}
        </li>
        {
          isMultiMode ? pages.map((page: {num: number, text: any, active: any}): any => {
            return (
              <li
                key={page.num}
                className={classnames({
                  "afo-hairline": true,
                  "afo-pagination__item": true,
                  "afo-pagination__page": true,
                  'afo-pagination__item--active': page.active
                })}
                onClick={() => this.selectPage(page.num)}
              >
                {page.text}
              </li>
            )
          }) : ''
        }
        {
          !isMultiMode?<li className="afo-pagination__page-desc">{ pageDesc }</li>:''
        }
        <li className={nextCls} onClick={() =>  this.selectPage(value + 1)}>
          {nextText || '下一页'}
        </li>
      </ul>
    )
  }
}

export default Pagination;