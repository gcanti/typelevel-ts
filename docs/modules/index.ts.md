---
title: index.ts
nav_order: 1
parent: Modules
---

# index overview

Added in v0.3.0

---

<h2 class="text-delta">Table of contents</h2>

- [DeepReadonlyArray (interface)](#deepreadonlyarray-interface)
- [AnyTuple (type alias)](#anytuple-type-alias)
- [Compact (type alias)](#compact-type-alias)
- [DeepReadonly (type alias)](#deepreadonly-type-alias)
- [Diff (type alias)](#diff-type-alias)
- [Equals (type alias)](#equals-type-alias)
- [Exact (type alias)](#exact-type-alias)
- [KeysOfType (type alias)](#keysoftype-type-alias)
- [OptionalKeys (type alias)](#optionalkeys-type-alias)
- [Overwrite (type alias)](#overwrite-type-alias)
- [RequiredKeys (type alias)](#requiredkeys-type-alias)
- [RowLacks (type alias)](#rowlacks-type-alias)
- [TaggedUnionMember (type alias)](#taggedunionmember-type-alias)

---

# DeepReadonlyArray (interface)

**Signature**

```ts
export interface DeepReadonlyArray<A> extends ReadonlyArray<DeepReadonly<A>> {}
```

Added in v0.3.0

# AnyTuple (type alias)

**Signature**

```ts
export type AnyTuple = Array<any> & { '0': any }
```

**Example**

```ts
import { AnyTuple } from 'typelevel-ts'

function f<T extends AnyTuple>(x: T): T {
  return x
}
const x: [number] = [1]
const y: [number, string] = [1, 'a']
const z: [number, string, boolean] = [1, 'a', true]
f(x)
f(y)
f(z)
// $ExpectError
// f([1, 2, 3])
```

Added in v0.3.0

# Compact (type alias)

**Signature**

```ts
export type Compact<A> = { [K in keyof A]: A[K] }
```

Added in v0.3.0

# DeepReadonly (type alias)

**Signature**

```ts
export type DeepReadonly<A> = A extends Array<infer B> ? DeepReadonlyArray<B> : DeepReadonlyObject<A>
```

**Example**

```ts
import { DeepReadonly } from 'typelevel-ts'

interface Foo {
  bar: {
    baz: string
    quux: Array<{ barbaz: number }>
  }
}

type ReadonlyFoo = DeepReadonly<Foo>
export declare const x: ReadonlyFoo
// $ExpectError
// x.bar.quux[1].barbaz = 1
```

Added in v0.3.0

# Diff (type alias)

**Signature**

```ts
export type Diff<A extends object, OK extends keyof A> = Compact<
  { [K in Exclude<keyof A, OK>]: A[K] } & { [K in OK]?: A[K] }
>
```

**Example**

```ts
import { Diff } from 'typelevel-ts'

export type Result = Diff<{ a: string; b: number }, 'b'> // { a: string; b?: number }
```

Added in v0.3.0

# Equals (type alias)

Returns the string literal 'T' if `A` and `B` are equal types, 'F' otherwise

**Signature**

```ts
export type Equals<A, B> = (<C>() => C extends Compact<A> ? 'T' : 'F') extends <C>() => C extends Compact<B> ? 'T' : 'F'
  ? 'T'
  : 'F'
```

**Example**

```ts
import { Equals } from 'typelevel-ts'

export type Result1 = Equals<string, string> // "T"
export type Result2 = Equals<string, number> // "F"
```

Added in v0.3.0

# Exact (type alias)

**Signature**

```ts
export type Exact<A extends object, B extends A> = A & Record<Exclude<keyof B, keyof A>, never>
```

**Example**

```ts
import { Exact } from 'typelevel-ts'

function f<T extends Exact<{ a: string }, T>>(a: T): void {}
f({ a: 'a' })
// $ExpectError
// f({ a: 'a', b: 1 })
```

Added in v0.3.0

# KeysOfType (type alias)

Picks only the keys of a certain type

**Signature**

```ts
export type KeysOfType<A extends object, B> = { [K in keyof A]-?: A[K] extends B ? K : never }[keyof A]
```

**Example**

```ts
import { KeysOfType } from 'typelevel-ts'

export type Result = KeysOfType<{ a: string; b: string | boolean; c: boolean; d: string }, string> // "a" | "d"
```

Added in v0.3.0

# OptionalKeys (type alias)

Extracts optional keys as a literal type union

**Signature**

```ts
export type OptionalKeys<T> = { [K in keyof T]: T extends Record<K, T[K]> ? never : K } extends {
  [_ in keyof T]: infer U
}
  ? {} extends U
    ? never
    : U
  : never
```

**Example**

```ts
import { OptionalKeys } from 'typelevel-ts'

type A = { a: string; b: number; x?: string; y?: number }
export type Result = OptionalKeys<A> // "x" | "y"
```

Added in v0.3.0

# Overwrite (type alias)

**Signature**

```ts
export type Overwrite<A extends object, B extends object> = Compact<Omit<A, keyof B> & B>
```

**Example**

```ts
import { Overwrite } from 'typelevel-ts'

export type Result = Overwrite<{ a: string; b: number }, { b: boolean }> // { a: string; b: boolean }
```

Added in v0.3.0

# RequiredKeys (type alias)

Extracts required keys as a literal type union

**Signature**

```ts
export type RequiredKeys<T> = { [K in keyof T]: {} extends Pick<T, K> ? never : K } extends { [_ in keyof T]: infer U }
  ? {} extends U
    ? never
    : U
  : never
```

**Example**

```ts
import { RequiredKeys } from 'typelevel-ts'

type A = { a: string; b: number; x?: string; y?: number }
export type Result = RequiredKeys<A> // "a" | "b"
```

Added in v0.3.0

# RowLacks (type alias)

Encodes the constraint that a given object `A` does not contain specific keys `K`

**Signature**

```ts
export type RowLacks<A extends object, K extends string | number | symbol> = A & Record<Extract<keyof A, K>, never>
```

**Example**

```ts
import { RowLacks } from 'typelevel-ts'

// function f(x: RowLacks<{ a: string; b: number }, 'a' | 'b'>): void {}
// $ExpectError
// f({ a: 'a', b: 1 })
function g(x: RowLacks<{ a: string; b: number }, 'c'>): void {}
g({ a: 'a', b: 1 }) // ok
```

Added in v0.3.0

# TaggedUnionMember (type alias)

Extracts the type of a member of a tagged union

**Signature**

```ts
export type TaggedUnionMember<A extends object, Tag extends keyof A, Value extends A[Tag]> = Extract<
  A,
  Record<Tag, Value>
>
```

**Example**

```ts
import { TaggedUnionMember } from 'typelevel-ts'

type A = { tag: 'A'; a: string }
type B = { tag: 'B'; b: number }
type C = A | B
export type Result = TaggedUnionMember<C, 'tag', 'A'> // A
```

Added in v0.3.0
