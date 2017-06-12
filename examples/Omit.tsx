import { Omit } from 'typelevel-ts'
import * as React from 'react'

function fill<P extends D, D>(C: React.ComponentClass<P>, values: D): React.ComponentClass<Omit<P, keyof D>> {
  return class extends React.Component<Omit<P, keyof D>, void> {
    render() {
      const props = Object.assign({}, this.props, values)
      return <C {...props} />
    }
  }
}

class Foo extends React.Component<{ a: string; b: number }, void> {
  render() {
    return <div>{this.props.a} {this.props.b}</div>
  }
}

// Bar :: React.ComponentClass<{ a: string }>
const Bar = fill(Foo, { b: 1 })

import * as ReactDOM from 'react-dom'

ReactDOM.render(<Bar a="baz" />, document.getElementById('app'))
