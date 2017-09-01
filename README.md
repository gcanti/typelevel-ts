# Compatibility

- `0.2.0+` for TypeScript `2.5.2+`
- `0.1.3` for TypeScript `2.4.1+`

# Credits

Adapted from

- https://github.com/Microsoft/TypeScript/issues/14833
- https://github.com/Microsoft/TypeScript/issues/16392
- https://github.com/Microsoft/TypeScript/issues/12215

## Related projects

- [typical - playground for type-level primitives in TypeScript](https://github.com/tycho01/typical) by @tycho01

# Examples

## Naturals

**Example**. Type-safe vectors

```ts
import { One, Two, Three, Nat, Add } from 'typelevel-ts'

function create<A>(as: [A, A, A]): Vector<Three, A>
function create<A>(as: [A, A]): Vector<Two, A>
function create<A>(as: [A]): Vector<One, A>
function create<N extends Nat, A>(as: Array<A>): Vector<N, A> {
  return new Vector<N, A>(as)
}

class Vector<N extends Nat, A> {
  static create = create
  readonly _N: N
  readonly _A: A
  constructor(public value: Array<A>) {}
  append<N2 extends Nat>(vector: Vector<N2, A>): Vector<Add<N, N2>, A> {
    return new Vector<Add<N, N2>, A>(this.value.concat(vector.value))
  }
  zip<B>(vector: Vector<N, B>): Vector<N, [A, B]> {
    return new Vector<N, [A, B]>(this.value.map((a, i) => [a, vector.value[i]] as [A, B]))
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `Vector(${JSON.stringify(this.value)})`
  }
}

// v1 :: Vector<One, number>
const v1 = Vector.create([1])
// v2 :: Vector<Two, number>
const v2 = Vector.create([2, 3])
// v3 :: Vector<Three, number>
const v3 = v1.append(v2)

// v3.zip(v2) // error

console.log(v2.zip(v1.append(v1))) // Vector([[2,1],[3,1]])
```

## `ObjectDiff`

**Example**. A `withDefaults` function (React)

```ts
import * as React from 'react'
import { ObjectDiff } from 'typelevel-ts'

function withDefaults<D, A extends D>(C: React.ComponentType<A>, defaults: D): React.SFC<ObjectDiff<A, D>> {
  return props => <C {...defaults} {...props} />
}

class Foo extends React.Component<{ bar: string; baz: number }> {}
const DefaultedFoo = withDefaults(Foo, { baz: 1 })
const x = <DefaultedFoo bar="bar" /> // ok
```

## `ObjectOmit`

**Example**. A `withProps` function (React)

```ts
import { ObjectOmit } from 'typelevel-ts'
import * as React from 'react'

function withProps<D, P extends D>(C: React.ComponentType<P>, values: D): React.SFC<ObjectOmit<P, keyof D>> {
  return props => <C {...props} {...values} />
}

class Foo extends React.Component<{ bar: string; baz: number }> {}
const FilledFoo = withProps(Foo, { baz: 1 })
const x = <FilledFoo bar="bar" /> // ok
```

