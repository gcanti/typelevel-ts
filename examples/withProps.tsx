import { ObjectOmit } from 'typelevel-ts'
import * as React from 'react'

function withProps<D, P extends D>(C: React.ComponentType<P>, values: D): React.SFC<ObjectOmit<P, keyof D>> {
  return (props: any) => <C {...props} {...values} />
}

class Foo extends React.Component<{ bar: string; baz: number }, void> {}
const FilledFoo = withProps(Foo, { baz: 1 })
const x = <FilledFoo bar="bar" /> // ok
