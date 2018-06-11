import { Omit } from 'typelevel-ts'
import * as React from 'react'

function withProps<D extends object, P extends D>(C: React.ComponentType<P>, values: D): React.SFC<Omit<P, keyof D>> {
  return props => <C {...props} {...values} />
}

class Foo extends React.Component<{ bar: string; baz: number }> {}
const FilledFoo = withProps(Foo, { baz: 1 })
const x = <FilledFoo bar="bar" /> // ok
