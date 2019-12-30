import {
  AnyTuple,
  Equals,
  Exact,
  Overwrite,
  Diff,
  RowLacks,
  DeepReadonly,
  KeysOfType,
  TaggedUnionMember,
  RequiredKeys,
  OptionalKeys
} from '../../src'

//
// Equals
//

type Equals1 = Equals<string, string> // $ExpectType "T"
type Equals2 = Equals<string, number> // $ExpectType "F"
type Equals3 = Equals<'a' | 'b', 'a' | 'b'> // $ExpectType "T"
type Equals4 = Equals<'a' | 'b', 'a' | 'c'> // $ExpectType "F"
type Equals5 = Equals<Array<string>, Array<string>> // $ExpectType "T"
type Equals6 = Equals<Array<string>, Array<number>> // $ExpectType "F"
type Equals7 = Equals<any[], [number][]> // $ExpectType "F"
type Equals8 = Equals<any[], unknown[]> // $ExpectType "F"
type Equals9 = Equals<Map<number, any>, Map<any, number>> // $ExpectType "F"
type Equals10 = Equals<{ a: string } & { b: number }, { a: string; b: number }> // $ExpectType "T"

//
// Omit
//

type Omit1 = Omit<{ a: string; b: number }, 'a'> // $ExpectType Pick<{ a: string; b: number; }, "b">
type Omit2 = Omit<{ a: string; b: number }, 'a' | 'b'> // $ExpectType Pick<{ a: string; b: number; }, never>
type Omit3 = Omit<{ a: string; b: number }, 'a' | 'c'> // $ExpectType Pick<{ a: string; b: number; }, "b">

//
// Overwrite
//

type Overwrite1 = Overwrite<{ a: string; b: number }, { b: boolean }> // $ExpectType Compact<Pick<{ a: string; b: number; }, "a"> & { b: boolean; }>
type Overwrite2 = Overwrite<{ a?: string; b: number }, { b: boolean }> // $ExpectType Compact<Pick<{ a?: string | undefined; b: number; }, "a"> & { b: boolean; }>
type Overwrite3 = Overwrite<{ a: string }, { b: boolean }> // $ExpectType Compact<Pick<{ a: string; }, "a"> & { b: boolean; }>
type Overwrite4 = Overwrite<{ a: string; b: number }, { b?: boolean }> // $ExpectType Compact<Pick<{ a: string; b: number; }, "a"> & { b?: boolean | undefined; }>

//
// Diff
//

type Diff1 = Diff<{ a: string; b: number }, 'b'> // $ExpectType Compact<{ a: string; } & { b?: number | undefined; }>

//
// RowLacks
//

declare function rowlacks1(x: RowLacks<{ a: string; b: number }, 'a'>): void
// $ExpectError
rowlacks1({ a: 'foo', b: 1 })
declare function rowlacks2(x: RowLacks<{ a: string; b: number }, 'c'>): void
rowlacks2({ a: 'foo', b: 1 })

//
// Exact
//

declare function exactf1<T extends Exact<{ a: string }, T>>(a: T): void
declare const exact1: { a: string }
declare const exact2: { a: string; b: number }
declare const exact3: { a: string; b: any }
exactf1(exact1)
// $ExpectError
exactf1(exact2)
// $ExpectError
exactf1(exact3)

//
// KeysOfType
//
type KeysOfType1 = KeysOfType<{ a: string; b: never }, never> // $ExpectType "b"
type KeysOfType2 = KeysOfType<{ a: string; b: string }, string> // $ExpectType "a" | "b"
type KeysOfType3 = KeysOfType<{ a: string; b: string | boolean }, string> // $ExpectType "a"
type KeysOfType4 = KeysOfType<{ a: string; b?: string }, string> // $ExpectType "a"

//
// AnyTuple
//

declare function anytuplef1<T extends AnyTuple>(x: T): T
declare const anytuple1: [number]
declare const anytuple2: [number, string]
declare const anytuple3: [number, string, boolean]
declare const anytuple4: Array<number>
anytuplef1(anytuple1)
anytuplef1(anytuple2)
anytuplef1(anytuple3)
// $ExpectError
anytuplef1(anytuple4)

//
// DeepReadonly
//

interface Foo {
  bar: {
    baz: string
    quux: Array<{ barbaz: number }>
  }
}

type ReadonlyFoo = DeepReadonly<Foo>
type DeepReadonly1 = ReadonlyFoo['bar'] // $ExpectType DeepReadonlyObject<{ baz: string; quux: { barbaz: number; }[]; }>
type DeepReadonly2 = ReadonlyFoo['bar']['quux'] // $ExpectType DeepReadonlyArray<{ barbaz: number; }>
type DeepReadonly3 = ReadonlyFoo['bar']['quux'][number] // $ExpectType DeepReadonlyObject<{ barbaz: number; }>
declare const readonly1: ReadonlyFoo
// $ExpectError
readonly1.bar.quux[1].barbaz = 1

//
// TaggedUnionMember
//

type TaggedUnionMemberA = { tag: 'A'; a: string }
type TaggedUnionMemberB = { tag: 'B'; b: number }
type TaggedUnionMemberC = TaggedUnionMemberA | TaggedUnionMemberB
type TaggedUnionMember1 = TaggedUnionMember<TaggedUnionMemberC, 'tag', 'A'> // $ExpectType TaggedUnionMemberA

//
// RequiredKeys
//

type BarForRequired = {
  a: number
  b: Date
  x?: string
  y?: Date
}

type BarRequiredKeys = RequiredKeys<BarForRequired> // $ExpectType "a" | "b"
// $ExpectType "a" | "b"
type RequiredKeysIndexSignature = RequiredKeys<{
  [x: string]: any
  a: number
  b: Date
  x?: string
  y?: Date
}>
type RequiredKeysEmpty = RequiredKeys<{}> // $ExpectType never

//
// OptionalKeys
//

type BarForOptional = {
  a: number
  b: Date
  x?: string
  y?: Date
}

type BarOptionalKeys = OptionalKeys<BarForOptional> // $ExpectType "x" | "y"
// $ExpectType "x" | "y"
type OptionalKeysIndexSignature = OptionalKeys<{
  [x: string]: any
  a: number
  b: Date
  x?: string
  y?: Date
}>
type OptionalKeysEmpty = OptionalKeys<{}> // $ExpectType never
