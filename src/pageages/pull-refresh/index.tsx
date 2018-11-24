import classnames from 'classnames';
import * as React from 'react';
import { scrollUtils, withDefaultProps } from '../utils';
import './style/pull-refresh.styl';

interface StylePullProps {
  transition: string,
  transform: string
}

const defaultProps = {
  pullingText: '下拉即可刷新...',
  loosingText: '释放即可刷新...',
  loadingText: '加载中...',
  value: true,
  animationDuration: 300,
  headHeight: 50
}

type DefaultProps = Readonly<typeof defaultProps>;

type PullRefreshProps = {
  pullingNode?: React.ReactNode;
  normalNode?: React.ReactNode;
  loosingNode?: React.ReactNode;
  loadingNode?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  onChange?: (value: boolean) => void;
  onRrefresh?: () => void;
} & DefaultProps;

const PullRefreshState = {
  status: 'normal',
  height: 0,
  duration: 0
};

type State = Readonly<typeof PullRefreshState>;

const PullRefresh = withDefaultProps(
  defaultProps,
  class extends React.Component<PullRefreshProps, State> {
    readonly state: State = PullRefreshState;
    wrapRef: any;
    direction: any;
    deltaX: any;
    deltaY: any;
    offsetX: any;
    offsetY: any;
    startX: any;
    startY: any;
    scrollEl: any;
    startValue: any;
    ceiling: any;
    duration: any;
    componentWillMount() {
      this.scrollEl = scrollUtils.getScrollEventTarget(document)
    }
    untouchable () {
      return this.state.status === 'loading' || this.props.disabled
    }
    touchStart (event: any) {
      this.direction = ''
      this.deltaX = 0
      this.deltaY = 0
      this.offsetX = 0
      this.offsetY = 0
      this.startX = event.touches[0].clientX
      this.startY = event.touches[0].clientY
    }

    touchMove (event: any) {
      const touch = event.touches[0]
      this.deltaX = touch.clientX - this.startX
      this.deltaY = touch.clientY - this.startY
      this.offsetX = Math.abs(this.deltaX)
      this.offsetY = Math.abs(this.deltaY)
      this.direction = this.offsetX > this.offsetY ? 'horizontal' : this.offsetX < this.offsetY ? 'vertical' : ''
    }
    onTouchStart (event: any) {
      if (this.untouchable()) {
        return
      }
      if (this.getCeiling) {
        this.setState({
          duration: 0
        })
        this.touchStart(event)
      }
    }

    onTouchMove (event: any) {
      if (this.untouchable) {
        return
      }
      this.touchMove(event)

      if (!this.ceiling && this.getCeiling()) {
        this.setState({
          duration: 0
        })
        this.startY = event.touches[0].clientY
        this.deltaY = 0
      }
      if (this.ceiling && this.deltaY >= 0) {
        if (this.direction === 'vertical') {
          this.getStatus(this.ease(this.deltaY))
          event.preventDefault()
        }
      }
    }

    onTouchEnd () {
      if (this.untouchable) {
        return
      }
      if (this.ceiling && this.deltaY) {
        this.duration = this.props.animationDuration
        if (this.state.status === 'loosing') {
          this.getStatus(this.props.headHeight, true)
          this.props.onChange && this.props.onChange(true)
          this.props.onRrefresh && this.props.onRrefresh()
        } else {
          this.getStatus(0)
        }
      }
    }
    getCeiling () {
      this.ceiling = scrollUtils.getScrollTop(this.scrollEl) === 0
      return this.ceiling
    }
    ease (height: number) {
      const { headHeight } = this.props
      return height < headHeight
        ? height
        : height < headHeight * 2
          ? Math.round(headHeight + (height - headHeight) / 2)
          : Math.round(headHeight * 1.5 + (height - headHeight * 2) / 4)
    }

    getStatus (height: number, isLoading?: boolean) {
      this.setState({
        height
      })
      const status = isLoading
        ? 'loading' : height === 0
          ? 'normal' : height < this.props.headHeight
            ? 'pulling' : 'loosing'

      if (status !== this.state.status) {
        this.setState({
          status
        })
      }
    }

    render() {
      const {
        pullingNode,
        normalNode,
        loosingNode,
        loadingNode,
        className,
        style,
        children,
        pullingText,
        loosingText,
        loadingText
      } = this.props;
      const {
        status,
        height,
        duration
      } = this.state;

      const stylePull: StylePullProps  = {
          transition: `${duration}ms`,
          transform: `translate3d(0, ${height}px, 0)`
      }
      const PullCls = classnames('afo-pull-refres', className)
      return (
        <div className={PullCls} style={style}>
          <div
            style={stylePull}
            className="afo-pull-refresh__track"
            onTouchStart={(e) => this.onTouchStart(e)}
            onTouchMove={(e) => this.onTouchMove(e)}
            onTouchEnd={() => this.onTouchEnd()}
            onTouchCancel={() => this.onTouchEnd()}
          >
            <div className="afo-pull-refresh__head">
              {
                status === 'normal' && normalNode ? normalNode : ''
              }
              {
                status === 'pulling' ? pullingNode ? pullingNode : <span className="afo-pull-refresh__text">{pullingText}</span> : ''
              }
              {
                status === 'loosing' ? loosingNode ? pullingNode : <span className="afo-pull-refresh__text">{loosingText}</span> : ''
              }
              {
                status === 'loading' ? loadingNode ? loadingNode : <span className="afo-pull-refresh__loading"><Loading  /><span>{loadingText}</span></span>: ''
              }
            </div>
            {
              children
            }
          </div>
        </div>
      )
    }
  }
)

export default PullRefresh;
