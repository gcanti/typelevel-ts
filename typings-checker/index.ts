import * as t from '../src'

const x1: t.Not<'true'> = 'false'
const x2: t.Not<'false'> = 'true'

const x3: t.And<'true', 'true'> = 'true'
const x4: t.And<'true', 'false'> = 'false'
const x5: t.And<'false', 'true'> = 'false'
const x6: t.And<'false', 'false'> = 'false'

const x8: t.Or<'true', 'true'> = 'true'
const x9: t.Or<'true', 'false'> = 'true'
const x10: t.Or<'false', 'true'> = 'true'
const x11: t.Or<'false', 'false'> = 'false'

const x12: t.Eq<'true', 'true'> = 'true'
const x13: t.Eq<'true', 'false'> = 'false'

const x16: t.If<'true', 'a', 'b'> = 'a'
const x17: t.If<'false', 'a', 'b'> = 'b'

const x18: t.IsNone<t.TNone> = 'true'
const x19: t.IsNone<t.TSome<'b'>> = 'false'
const x20: t.IsSome<t.TNone> = 'false'
const x21: t.IsSome<t.TSome<'b'>> = 'true'

const x22: t.TOptionGetOrElse<t.TNone, 'a'> = 'a'
const x23: t.TOptionGetOrElse<t.TSome<'b'>, 'a'> = 'b'

const x24: t.IsZero<t._0> = 'true'
const x25: t.IsZero<t._1> = 'false'

const x26: t.NatEq<t._0, t._0> = 'true'
const x27: t.NatEq<t._0, t._1> = 'false'

const x28: t.NatEq<t.Add<t._0, t._1>, t._1> = 'true'
const x29: t.NatEq<t.Add<t._5, t._5>, t._10> = 'true'

const x30: t.NatEq<t.Mult<t._0, t._5>, t._0> = 'true'
const x31: t.NatEq<t.Mult<t._1, t._5>, t._5> = 'true'
const x32: t.NatEq<t.Mult<t._2, t._5>, t._10> = 'true'

const x33: t.NatEq<t.UnsafeSub<t._5, t._2>, t._3> = 'true'
const x34: t.NatEq<t.UnsafeSub<t._5, t._2>, t._2> = 'false'

type option_3 = t.Sub<t._5, t._2>
const x35: t.And<t.IsSome<option_3>, t.NatEq<t.TOptionUnsafeGet<option_3>, t._3>> = 'true'

const x37: t.Lte<t._0, t._0> = 'true'
const x38: t.Lte<t._0, t._1> = 'true'
const x39: t.Lt<t._0, t._0> = 'false'
const x40: t.Lt<t._0, t._1> = 'true'
const x41: t.Gt<t._2, t._1> = 'true'
const x42: t.Gt<t._1, t._1> = 'false'
const x43: t.Gte<t._1, t._1> = 'true'

const x44: t.NatEq<t.Mod<t._5, t._3>, t._2> = 'true'

const min1: t.NatEq<t.Min<t._2, t._1>, t._1> = 'true'
const min2: t.NatEq<t.Max<t._2, t._1>, t._2> = 'true'

const sc1: t.StringContains<'a', 'b'> = 'false'
const sc2: t.StringContains<'a' | 'b', 'b'> = 'true'

const oo1: t.ObjectOmit<{ a: string; b: number }, 'b'> = { a: 'a' }
const oo2: t.ObjectOmit<{ a?: string; b: number }, 'b'> = { a: 'a' }
const oo3: t.ObjectOmit<{ a?: string; b: number }, 'b'> = {}

const od1: t.ObjectDiff<{ a: string; b: number }, { b: number }> = { a: 'a' }
const od2: t.ObjectDiff<{ a: string; b: number }, { b: number }> = { a: 'a', b: 1 }

const oov1: t.ObjectOverwrite<{ a: number }, { a: string }>['a'] = 'a'
const oov2: t.ObjectOverwrite<{ a: string }, { a: number }>['a'] = 1

const se1: t.StringEq<'a', 'b'> = 'false'
const se2: t.StringEq<'a', 'a'> = 'true'
const se3: t.StringEq<'', ''> = 'true'

const ohk1: t.ObjectHasKey<{ a: number }, 'a'> = 'true'
const ohk2: t.ObjectHasKey<{ a: number }, 'b'> = 'false'
