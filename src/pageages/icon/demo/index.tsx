import * as React from 'react';
import Icon from '../index';

const list = [
  'eye-invisible', 'eye-visible', 'square-right',
  'select', 'pulldown', 'pullup',
  'more', 'back', 'arrow',
  'close', 'warn',
  'question','right','wrong','info','remove','add',
  'share', 'no-wifi','smile','sad','email','game',
  'wifi','hot','notification','delete','vip','mute',
  'danger','volume','bad','mobile-phone','aim','navigation',
  'safe-pay','tag','lock','unlock','edit','scan','qr-code',
  'calendar','time','red-packet','star','setting','home',
  'credit-card','mall','microphone','search','good',
  'alert','picture','message','phone','location',
  'like','camera','person','round-border','important',
  'ok','square-border'
];

const IconDemo = () => {
  return (
    <div>
      {
        list.map(item => (
          <div key={item}>
            <Icon type={item} />
            <span>{item}</span>
          </div>
        ))
      }
    </div>
  );
};

export default IconDemo;