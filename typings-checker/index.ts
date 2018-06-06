import * as t from '../src'

//
// booleans
//

const if1: t.If<'T', 'foo', 'bar'> = 'foo'
const if2: t.If<'F', 'foo', 'bar'> = 'bar'

const not1: t.Not<'T'> = 'F'
const not2: t.Not<'F'> = 'T'

const and1: t.And<'T', 'T'> = 'T'
const and2: t.And<'T', 'F'> = 'F'
const and3: t.And<'F', 'T'> = 'F'
const and4: t.And<'F', 'F'> = 'F'

const or1: t.Or<'T', 'T'> = 'T'
const or2: t.Or<'T', 'F'> = 'T'
const or3: t.Or<'F', 'T'> = 'T'
const or4: t.Or<'F', 'F'> = 'F'

const boolEq1: t.BoolEq<'T', 'T'> = 'T'
const boolEq2: t.BoolEq<'T', 'F'> = 'F'
const boolEq3: t.BoolEq<'F', 'F'> = 'T'
const boolEq4: t.BoolEq<'F', 'T'> = 'F'

//
// Option
//

const isNone1: t.IsNone<t.None> = 'T'
const isNone2: t.IsNone<t.Some<'foo'>> = 'F'
const isNone3: t.IsSome<t.None> = 'F'
const isNone4: t.IsSome<t.Some<'foo'>> = 'T'

const optionGetOrElse1: t.OptionGetOrElse<t.None, 'foo'> = 'foo'
const optionGetOrElse2: t.OptionGetOrElse<t.Some<'foo'>, 'bar'> = 'foo'

//
// naturals
//

const isZero1: t.IsZero<t.Zero> = 'T'
const isZero2: t.IsZero<t.One> = 'F'

const natEq1: t.NatEq<t.Zero, t.Zero> = 'T'
const natEq2: t.NatEq<t.Zero, t.One> = 'F'

const add1: t.NatEq<t.Add<t.Zero, t.One>, t.One> = 'T'
const add2: t.NatEq<t.Add<t.Five, t.Five>, t.Ten> = 'T'

const unafesub1: t.NatEq<t.UnsafeSub<t.Zero, t.One>, t.Zero> = 'T'
const unafesub2: t.NatEq<t.UnsafeSub<t.Five, t.Five>, t.Zero> = 'T'

const sub1: t.Sub<t.Five, t.Five> = {
  isNone: 'F',
  _A: {
    isZero: 'T',
    prev: null as never
  }
}

const mult1: t.NatEq<t.Mult<t.Zero, t.Five>, t.Zero> = 'T'
const mult2: t.NatEq<t.Mult<t.One, t.Five>, t.Five> = 'T'
const mult3: t.NatEq<t.Mult<t.Two, t.Five>, t.Ten> = 'T'

type option_3 = t.Sub<t.Five, t.Two>
const optionUnsafeGet1: t.And<t.IsSome<option_3>, t.NatEq<t.OptionUnsafeGet<option_3>, t.Three>> = 'T'

const lte1: t.Lte<t.Zero, t.Zero> = 'T'
const lte2: t.Lte<t.Zero, t.One> = 'T'
const lte3: t.Lte<t.One, t.Zero> = 'F'

const lt1: t.Lt<t.Zero, t.Zero> = 'F'
const lt2: t.Lt<t.Zero, t.One> = 'T'
const lt3: t.Gt<t.Two, t.One> = 'T'
const lt4: t.Gt<t.One, t.One> = 'F'
const lt5: t.Gte<t.One, t.One> = 'T'

const mod1: t.NatEq<t.Mod<t.Five, t.Three>, t.Two> = 'T'

const min1: t.NatEq<t.Min<t.Two, t.One>, t.One> = 'T'
const min2: t.NatEq<t.Max<t.Two, t.One>, t.Two> = 'T'

const stringContains1: t.StringContains<'a', 'b'> = 'F'
const stringContains2: t.StringContains<'a' | 'b', 'b'> = 'T'

const objectOmit1: t.ObjectOmit<{ a: string; b: number }, 'b'> = { a: 'a' }
const objectOmit2: t.ObjectOmit<{ a?: string; b: number }, 'b'> = { a: 'a' }
const objectOmit3: t.ObjectOmit<{ a?: string; b: number }, 'b'> = {}

const objectDiff1: t.ObjectDiff<{ a: string; b: number }, { b: number }> = { a: 'a' }
const objectDiff2: t.ObjectDiff<{ a: string; b: number }, { b: number }> = { a: 'a', b: 1 }

const objectOverwrite1: t.ObjectOverwrite<{ a: number }, { a: string }>['a'] = 'a'
const objectOverwrite2: t.ObjectOverwrite<{ a: string }, { a: number }>['a'] = 1

const objectOptional1: t.ObjectOptional<{ a: boolean; b: number }, 'a'> = { b: 42 }
const objectOptional2: t.ObjectOptional<{ a: boolean; b: number }, 'b'> = { a: true }
const objectOptional3: t.ObjectOptional<{ a: boolean; b: number }, 'a' | 'b'> = {}

const stringEq1: t.StringEq<'a', 'b'> = 'F'
const stringEq2: t.StringEq<'a', 'a'> = 'T'
const stringEq3: t.StringEq<'', ''> = 'T'

const objectHasKey1: t.ObjectHasKey<{ a: number }, 'a'> = 'T'
const objectHasKey2: t.ObjectHasKey<{ a: number }, 'b'> = 'F'

type State = { a: string; b: boolean; c: number }

export type E1 = t.PickExact<State, 'c'> | t.PickExact<State, 'a' | 'b'>

const e1: E1 = { c: 1 }
// $ExpectError Property 'b' is missing in type '{ c: number; a: string; }
const e2: E1 = { c: 1, a: 'foo' }
const e3: E1 = { a: 'foo', b: true }
// $ExpectError Type 'number' is not assignable to type 'undefined'
const e4: E1 = { a: 'foo', b: true, c: 1 }

const tupleToObject1: t.TupleToObject<[number, string]> = { 0: 1, 1: 'foo' }

const tupleLengthAsString1: t.TupleLengthAsString<[number]> = '1'

const tupleLengthAsNumber1: t.TupleLengthAsNumber<[number]> = 1
const tupleLengthAsNumber2: t.TupleLengthAsNumber<[number, string]> = 2
const tupleLengthAsNumber3: t.TupleLengthAsNumber<[number, string, boolean]> = 3

type T2THList1 = t.TupleToHList<[number]>
type T2THList2 = t.TupleToHList<[number, string]>
type T2THList3 = t.TupleToHList<[number, string, boolean]>

const typeAt1: t.UnsafeTypeAt<T2THList3, t.One> = 'foo'
const typeAt2: t.UnsafeTypeAt<T2THList3, t.Two> = true

const tHListIntegerLength1: t.HListLengthAsNumber<T2THList3> = 3

type Tuple1 = t.HListToTuple<T2THList3>

const natToString0: t.NatToString<t.Zero> = '0'
const natToString1: t.NatToString<t.One> = '1'
const natToString2: t.NatToString<t.Two> = '2'
const natToString10: t.NatToString<t.Ten> = '10'

type HListConcat1 = t.HListToTuple<t.HListConcat<t.TupleToHList<[number, null]>, t.TupleToHList<[string]>>>
const hlistConcat1: HListConcat1 = [1, null, 'a']
// $ExpectError Type 'number' is not assignable to type 'string'
const hlistConcat2: HListConcat1 = [1, null, 1]

//
// Required
//
type R1 = {
  a: string
  b?: number
  c?: boolean | null | undefined
}
type RR1 = t.Required<R1>
// $ExpectError Property 'a' is missing in type '{}'
const r1: RR1 = {}
// $ExpectError Property 'b' is missing in type '{ a: string; }'
const r2: RR1 = { a: 'a' }
// $ExpectError Property 'c' is missing in type '{ a: string; b: number; }'
const r3: RR1 = { a: 'a', b: 1 }
const r4: RR1 = { a: 'a', b: 1, c: true }
