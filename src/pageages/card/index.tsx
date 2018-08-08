import * as React from 'react';
import './style/card.styl';

export interface CardProps {
  title?: string;
  desc?: string;
  className?: string;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

export default class Card extends React.Component< CardProps, any > {
  static defaultProps = {
    title: '',
    desc: ''
  }
  render() {
    const {
      title,
      desc,
      children,
      className,
      headerContent,
      footerContent,
      ...resProps
    } = this.props;
    return (
      <div className="afo-card">
        <div className="afo-card-header afo-card--cell" >
          {
            headerContent ?  headerContent : <div className="afo-card--title"><span>{title}</span><div className="afo-card--label">{desc}</div></div>
          }
        </div>   
        <div className="afo-card-content afo-card--cell">
          {children}
        </div>
        {
          footerContent ? <div className="afp-card-footer afo-card--cell afo-hairline--top" /> : ''
        }
      </div>  
    )
  }  
}
