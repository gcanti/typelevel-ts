import * as React from 'react'
import { ObjectOmit } from 'typelevel-ts'

export default function withDefaults<A, D extends keyof A>(
  C: React.ComponentType<A>,
  defaults: Pick<A, D>
): React.SFC<ObjectOmit<A, D> & Partial<Pick<A, D>>> {
  return (props: any) => <C {...Object.assign({}, defaults, props)} />
}

class Foo extends React.Component<{ bar: string; baz: number }, void> {}
const DefaultedFoo = withDefaults(Foo, { baz: 1 })
const x = <DefaultedFoo bar="bar" /> // ok
