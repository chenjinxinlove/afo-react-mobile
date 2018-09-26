import * as React from 'react'

export const isEmptyChildren = (children: React.ReactNode) => React.Children.count(children) === 0
export const isFunction = <T extends () => void>(value: any): value is T =>
  typeof value === 'function'
export const getComponentName = (component: React.ComponentType<any>) =>
  component.displayName || (component as any).name
export const getHocComponentName = (hocName: string, component: React.ComponentType<any>) =>
  `${hocName}(${getComponentName(component)})`

export const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
  defaultProps: DP,
  Cmp: React.ComponentType<P>
) => {
  // we are extracting props that need to be required
  type RequiredProps = Omit<P, keyof DP>
  // we are re-creating our props definition by creating and intersection type
  // between all original props mapped to be optional and required to be required
  type Props = Partial<DP> & RequiredProps

  // here we set our defaultProps
  Cmp.defaultProps = defaultProps

  // we override return type definition by turning type checker off
  // for original props  and setting the correct return type
  return (Cmp as React.ComponentType<any>) as React.ComponentType<Props>
}
