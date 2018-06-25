import { AnyTuple, Equals, Exact, Omit, Overwrite, Diff, RowLacks, DeepReadonly, KeysOfType } from '../src'

//
// Equals
//

type Equals1 = Equals<string, string> // $ExpectType "T"
type Equals2 = Equals<string, number> // $ExpectType "F"
type Equals3 = Equals<'a' | 'b', 'a' | 'b'> // $ExpectType "T"
type Equals4 = Equals<'a' | 'b', 'a' | 'c'> // $ExpectType "F"
type Equals5 = Equals<Array<string>, Array<string>> // $ExpectType "T"
type Equals6 = Equals<Array<string>, Array<number>> // $ExpectType "F"

//
// Omit
//

type Omit1 = Equals<Omit<{ a: string; b: number }, 'a'>, { b: number }> // $ExpectType "T"
type Omit2 = Equals<Omit<{ a: string; b: number }, 'a' | 'b'>, {}> // $ExpectType "T"
type Omit3 = Equals<Omit<{ a: string; b: number }, 'a' | 'c'>, { b: number }> // $ExpectType "T"

//
// Overwrite
//

type Overwrite1 = Equals<Overwrite<{ a: string; b: number }, { b: boolean }>, { a: string; b: boolean }> // $ExpectType "T"
type Overwrite2 = Equals<Overwrite<{ a: string }, { b: boolean }>, { a: string; b: boolean }> // $ExpectType "T"

//
// Diff
//

type Diff1 = Equals<Diff<{ a: string; b: number }, 'b'>, { a: string; b?: number }> // $ExpectType "T"

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
exactf1(exact1)
// $ExpectError
exactf1(exact2)

//
// KeysOfType
//
type KeysOfType1 = Equals<KeysOfType<{a: string, b: never}, never>, "b"> // $ExpectType "T"
type KeysOfType2 = Equals<KeysOfType<{a: string, b: string}, string>, "a" | "b"> // $ExpectType "T"
type KeysOfType3 = Equals<KeysOfType<{a: string, b: string | boolean}, string>, "a"> // $ExpectType "T"

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
