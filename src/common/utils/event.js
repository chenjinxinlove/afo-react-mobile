import { isServer } from './'

export let supportsPassive = false

if (!isServer) {
  try {
    const opts = {}
    Object.defineProperty(opts, 'passive', {
      get () {
        /* istanbul ignore next */
        supportsPassive = true
      }
    })
    window.addEventListener('test-passive', null, opts)
  } catch (e) {
    window.alertconsole.log(e)
  }
}

export function on (target, event, handler, passive = false) {
  // if (!isServer) {
    // tslint:disable
    target.addEventListener(
      event,
      handler,
      supportsPassive ? { capture: false, passive } : false
    )
  // }    
}

export function off (target, event, handler) {
  // if (!isServer) {
    target.removeEventListener(event, handler)
  // }
}
