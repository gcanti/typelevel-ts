import * as React from 'react'
import { ObjectDiff } from 'typelevel-ts'

function withDefaults<D, A extends D>(C: React.ComponentType<A>, defaults: D): React.SFC<ObjectDiff<A, D>> {
  return props => <C {...defaults} {...props} />
}

class Foo extends React.Component<{ bar: string; baz: number }> {}
const DefaultedFoo = withDefaults(Foo, { baz: 1 })
const x = <DefaultedFoo bar="bar" /> // ok
