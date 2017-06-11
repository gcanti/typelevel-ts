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

const x14: t.NotEq<'true', 'true'> = 'false'
const x15: t.NotEq<'true', 'false'> = 'true'

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

// 1000
const x36: t.IsZero<t.Mult<t._10, t.Mult<t._10, t._10>>> = 'false'

const x37: t.Lte<t._0, t._0> = 'true'
const x38: t.Lte<t._0, t._1> = 'true'
const x39: t.Lt<t._0, t._0> = 'false'
const x40: t.Lt<t._0, t._1> = 'true'
const x41: t.Gt<t._2, t._1> = 'true'
const x42: t.Gt<t._1, t._1> = 'false'
const x43: t.Gte<t._1, t._1> = 'true'

const x44: t.NatEq<t.Mod<t._5, t._3>, t._2> = 'true'

const x45: t.NatEq<t.Min<t._2, t._1>, t._1> = 'true'
const x46: t.NatEq<t.Max<t._2, t._1>, t._2> = 'true'

const c1: t.ContainsLiteral<'a', 'b'> = 'false'
const c2: t.ContainsLiteral<'a' | 'b', 'b'> = 'true'

const om1: t.Omit<{ a: string; b: number }, 'b'> = { a: 'a' }

const d1: t.Diff<{ a: string; b: number }, { b: number }> = { a: 'a' }
const d2: t.Diff<{ a: string; b: number }, { b: number }> = { a: 'a', b: 1 }

const o1: t.MergeFields<{ a: number }, { a: string }>['a'] = 'a'
const f1: t.AddFields<{ a: number }, { a: string }>['a'] = 1

const s1: t.StringEq<'a', 'b'> = 'false'
const s2: t.StringEq<'a', 'a'> = 'true'

const k1: t.HasKey<{ a: number }, 'a'> = 'true'
const k2: t.HasKey<{ a: number }, 'b'> = 'false'
