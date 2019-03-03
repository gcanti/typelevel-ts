export type Compact<A> = { [K in keyof A]: A[K] }

/**
 * Returns the string literal 'T' if `A` and `B` are equal types, 'F' otherwise
 *
 * @example
 * import { Equals } from 'typelevel-ts'
 *
 * export type Result1 = Equals<string, string> // "T"
 * export type Result2 = Equals<string, number> // "F"
 */
export type Equals<A, B> = (<C>() => C extends Compact<A> ? 'T' : 'F') extends (<C>() => C extends Compact<B>
  ? 'T'
  : 'F')
  ? 'T'
  : 'F'

/**
 * Extracts a super-type of `A` identified by its keys `K`
 *
 * @example
 * import { Omit } from 'typelevel-ts'
 *
 * export type Result = Omit<{ a: string; b: number }, 'a'> // { b: number }
 */
export type Omit<A extends object, K extends string | number | symbol> = Pick<A, Exclude<keyof A, K>>

/**
 * @example
 * import { Overwrite } from 'typelevel-ts'
 *
 * export type Result = Overwrite<{ a: string; b: number }, { b: boolean }> // { a: string; b: boolean }
 */
export type Overwrite<A extends object, B extends object> = Compact<{ [K in Exclude<keyof A, keyof B>]: A[K] } & B>

/**
 * @example
 * import { Diff } from 'typelevel-ts'
 *
 * export type Result = Diff<{ a: string; b: number }, 'b'> // { a: string; b?: number }
 */
export type Diff<A extends object, OK extends keyof A> = Compact<
  { [K in Exclude<keyof A, OK>]: A[K] } & { [K in OK]?: A[K] }
>

/**
 * Picks only the keys of a certain type
 *
 * @example
 * import { KeysOfType } from 'typelevel-ts'
 *
 * export type Result = KeysOfType<{a: string, b: string | boolean, c: boolean, d: string}, string> // "a" | "d"
 */
export type KeysOfType<A extends object, B> = { [K in keyof A]-?: A[K] extends B ? K : never }[keyof A]

/**
 * Encodes the constraint that a given object `A` does not contain specific keys `K`
 *
 * @example
 * import { RowLacks } from 'typelevel-ts'
 *
 * export declare function f(x: RowLacks<{ a: string; b: number }, 'a' | 'b'>): void
 * // $ExpectError
 * // f({ a: 'a', b: 1 })
 * declare function g(x: RowLacks<{ a: string; b: number }, 'c'>): void
 * g({ a: 'a', b: 1 }) // ok
 */
export type RowLacks<A extends object, K extends string | number | symbol> = A & Record<Extract<keyof A, K>, never>

/**
 * @example
 * import { Exact } from 'typelevel-ts'
 *
 * declare function f<T extends Exact<{ a: string }, T>>(a: T): void
 * f({ a: 'a' })
 * // $ExpectError
 * // f({ a: 'a', b: 1 })
 */
export type Exact<A extends object, B extends A> = A & Record<Exclude<keyof B, keyof A>, never>

/**
 * @example
 * import { AnyTuple } from 'typelevel-ts'
 *
 * declare function f<T extends AnyTuple>(x: T): T
 * declare const x: [number]
 * declare const y: [number, string]
 * declare const z: [number, string, boolean]
 * f(x)
 * f(y)
 * f(z)
 * // $ExpectError
 * // f([1, 2, 3])
 */
export type AnyTuple = Array<any> & { '0': any }

/**
 * @internal
 */
export interface DeepReadonlyArray<A> extends ReadonlyArray<DeepReadonly<A>> {}

/**
 * @internal
 */
export type DeepReadonlyObject<A> = { readonly [K in keyof A]: DeepReadonly<A[K]> }

/**
 * @example
 * import { DeepReadonly } from 'typelevel-ts'
 *
 * interface Foo {
 *   bar: {
 *     baz: string
 *     quux: Array<{ barbaz: number }>
 *   }
 * }
 *
 * type ReadonlyFoo = DeepReadonly<Foo>
 * export declare const x: ReadonlyFoo
 * // $ExpectError
 * // x.bar.quux[1].barbaz = 1
 */
export type DeepReadonly<A> = A extends Array<infer B> ? DeepReadonlyArray<B> : DeepReadonlyObject<A>

/**
 * Extracts the type of a member of a tagged union
 *
 * @example
 * import { TaggedUnionMember } from 'typelevel-ts'
 *
 * type A = { tag: 'A'; a: string }
 * type B = { tag: 'B'; b: number }
 * type C = A | B
 * export type Result = TaggedUnionMember<C, 'tag', 'A'> // A
 */
export type TaggedUnionMember<A extends object, Tag extends keyof A, Value extends A[Tag]> = Extract<
  A,
  Record<Tag, Value>
>

/**
 * Extracts required keys as a literal type union
 *
 * @example
 * import { RequiredKeys } from 'typelevel-ts'
 *
 * type A = { a: string; b: number; x?: string; y?: number }
 * export type Result = RequiredKeys<A> // "a" | "b"
 */
export type RequiredKeys<T> = { [K in keyof T]: {} extends Pick<T, K> ? never : K } extends { [_ in keyof T]: infer U }
  ? {} extends U
    ? never
    : U
  : never

/**
 * Extracts optional keys as a literal type union
 *
 * @example
 * import { OptionalKeys } from 'typelevel-ts'
 *
 * type A = { a: string; b: number; x?: string; y?: number }
 * export type Result = OptionalKeys<A> // "x" | "y"
 */
export type OptionalKeys<T> = { [K in keyof T]: T extends Record<K, T[K]> ? never : K } extends {
  [_ in keyof T]: infer U
}
  ? {} extends U
    ? never
    : U
  : never
