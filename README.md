# TypeScript compatibility

The stable version is tested against TypeScript 2.9.1+

# API

## Equals<A, B>

Returns the string literal 'T' if `A` and `B` are equal types, 'F' otherwise

```ts
Equals<string, string> // "T"
Equals<string, number> // "F"
```

## Omit<A extends object, K extends string | number | symbol>

Extracts a super-type of `A` identified by its keys `K`

```ts
Omit<{ a: string; b: number }, 'a'> // { b: number }
```

## Overwrite<A extends object, B extends object>

```ts
Overwrite<{ a: string; b: number }, { b: boolean }> // { a: string; b: boolean }
```

## Diff<A extends object, K extends keyof A>

```ts
Diff<{ a: string; b: number }, 'b'> // { a: string; b?: number }
```

## RowLacks<A extends object, K extends string | number | symbol>

Encodes the constraint that a given object `A` does not contain specific keys `K`

```ts
declare function f(x: RowLacks<{ a: string; b: number }, 'a'>): void
// $ExpectError
f({ a: 'foo', b: 1 })
```

## Exact<A extends object, B extends A>

```ts
declare function f<T extends Exact<{ a: string }, T>>(a: T): void
declare const x: { a: string }
declare const y: { a: string; b: number }
f(x)
// $ExpectError
f(y)
```

## KeysOfType<A extends object, B>

Picks only the keys of a certain type

```ts
KeysOfType<{a: string, b: string | boolean, c: boolean, d: string}, string> // "a" | "d"
```

## AnyTuple

```ts
declare function f<T extends AnyTuple>(x: T): T
declare const x: [number]
declare const y: [number, string]
declare const z: [number, string, boolean]
declare const t: Array<number>
f(x)
f(y)
f(z)
// $ExpectError
f(t)
```

## DeepReadonly<A>

```ts
interface Foo {
  bar: {
    baz: string
    quux: Array<{ barbaz: number }>
  }
}

type ReadonlyFoo = DeepReadonly<Foo>
declare const x: ReadonlyFoo
// $ExpectError
x.bar.quux[1].barbaz = 1
```
