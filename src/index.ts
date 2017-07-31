//
// Bool - type level booleans
//

export type Bool = 'true' | 'false'

export type Not<B extends Bool> = {
  true: 'false'
  false: 'true'
}[B]

export type And<B1 extends Bool, B2 extends Bool> = {
  false: 'false'
  true: {
    false: 'false'
    true: 'true'
  }[B2]
}[B1]

export type Or<B1 extends Bool, B2 extends Bool> = Not<And<Not<B1>, Not<B2>>>

export type Eq<B1 extends Bool, B2 extends Bool> = {
  true: {
    true: 'true'
    false: 'false'
  }
  false: {
    true: 'false'
    false: 'true'
  }
}[B1][B2]

export type If<B extends Bool, Then, Else> = {
  true: Then
  false: Else
}[B]

//
// TOption - type level options
//

export type TOption<A> = TNone | TSome<A>

export interface TNone {
  isNone: 'true'
  _A: any
}

export interface TSome<A> {
  isNone: 'false'
  _A: A
}

export type IsNone<O extends TOption<any>> = O['isNone']

export type IsSome<O extends TOption<any>> = Not<IsNone<O>>

export type TOptionUnsafeGet<O extends TOption<any>> = O['_A']

export type TOptionGetOrElse<O extends TOption<any>, A> = If<IsNone<O>, A, TOptionUnsafeGet<O>>

//
// Nat - type level naturals
//

export interface Nat {
  prev?: any
  isZero: Bool
}

export interface Positive {
  prev: Positive | _0
  isZero: 'false'
}

export type _0 = { isZero: 'true' }
export type _1 = Succ<_0>
export type _2 = Succ<_1>
export type _3 = Succ<_2>
export type _4 = Succ<_3>
export type _5 = Succ<_4>
export type _6 = Succ<_5>
export type _7 = Succ<_6>
export type _8 = Succ<_7>
export type _9 = Succ<_8>
export type _10 = Succ<_9>

export type IsZero<N extends Nat> = N['isZero']

export type Succ<N extends Nat> = { prev: N; isZero: 'false' }

export type Prev<N extends Positive> = N['prev']

export type NatEq<N1 extends Nat, N2 extends Nat> = {
  true: IsZero<N2>
  false: {
    true: 'false'
    false: NatEq<Prev<N1>, Prev<N2>>
  }[IsZero<N2>]
}[IsZero<N1>]

export type Add<N1 extends Nat, N2 extends Nat> = {
  true: N2
  false: Succ<Add<Prev<N1>, N2>>
}[IsZero<N1>]

export type Sub<N1 extends Nat, N2 extends Nat> = {
  true: {
    true: TSome<_0>
    false: TNone
  }[IsZero<N2>]
  false: {
    true: TSome<N1>
    false: Sub<Prev<N1>, Prev<N2>>
  }[IsZero<N2>]
}[IsZero<N1>]

export type UnsafeSub<N1 extends Nat, N2 extends Nat> = {
  true: N1
  false: UnsafeSub<Prev<N1>, Prev<N2>>
}[IsZero<N2>]

export type Mult<N1 extends Nat, N2 extends Nat> = {
  true: _0
  false: {
    true: N2
    false: Add<N2, Mult<Prev<N1>, N2>>
  }[IsZero<Prev<N1>>]
}[IsZero<N1>]

export type Lte<N1 extends Nat, N2 extends Nat> = IsSome<Sub<N2, N1>>
export type Lt<N1 extends Nat, N2 extends Nat> = And<Lte<N1, N2>, Not<NatEq<N1, N2>>>
export type Gte<N1 extends Nat, N2 extends Nat> = Not<Lt<N1, N2>>
export type Gt<N1 extends Nat, N2 extends Nat> = Not<Lte<N1, N2>>

export type Mod<N1 extends Nat, N2 extends Nat, R = _0> = {
  true: R
  false: Mod<N1, N2, UnsafeSub<N1, N2>>
}[IsZero<N1>]

export type Min<N1 extends Nat, N2 extends Nat> = If<Lte<N1, N2>, N1, N2>

export type Max<N1 extends Nat, N2 extends Nat> = If<Lte<N1, N2>, N2, N1>

/**
 * max number = 10
 * examples:
 * t.NumberToNat[0] == _0
 * t.NumberToNat[1] == _1
 * t.NumberToNat[10] == _10
 */
export type NumberToNat = TupleToObject<[_0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10]>

export type NumberToString = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

/** max Nat = _10 */
export type NatToNumber<N extends Nat> = If<
  NatEq<N, _0>,
  0,
  If<
    NatEq<N, _1>,
    1,
    If<
      NatEq<N, _2>,
      2,
      If<
        NatEq<N, _3>,
        3,
        If<
          NatEq<N, _4>,
          4,
          If<NatEq<N, _5>, 5, If<NatEq<N, _6>, 6, If<NatEq<N, _7>, 7, If<NatEq<N, _8>, 8, If<NatEq<N, _9>, 9, 10>>>>>
        >
      >
    >
  >
>

//
// strings
//

export type StringOmit<L1 extends string, L2 extends string> = ({ [P in L1]: P } &
  { [P in L2]: never } & { [key: string]: never })[L1]

export type StringEq<L1 extends string, L2 extends string> = And<StringContains<L1, L2>, StringContains<L2, L1>>

export type StringIntersection<L1 extends string, L2 extends string> = StringOmit<L1, StringOmit<L1, L2>>

export type StringContains<S extends string, L extends string> = ({ [K in S]: 'true' } & {
  [key: string]: 'false'
})[L]

//
// objects
//

export type ObjectHasKey<O, L extends string> = StringContains<keyof O, L>

export type ObjectOverwrite<O1, O2> = Pick<O1, StringOmit<keyof O1, keyof O2>> & O2

export type ObjectOmit<O, K extends string> = Pick<O, StringOmit<keyof O, K>>

export type ObjectDiff<O1 extends O2, O2> = ObjectOmit<O1, keyof O2> & Partial<O2>

export type ObjectClean<T> = Pick<T, keyof T>

export type PickExact<O, K extends keyof O> = Pick<O, K> & { [K1 in StringOmit<keyof O, K>]?: never }

//
// THList - type level hlist
//

export type THNil = {
  IsHNil: 'true'
}

export type THCons<H, T extends THList> = {
  IsHNil: 'false'
  head: H
  tail: T
}

export type THList = THNil | THCons<any, any>

export type THListIsTHNil<L extends THList> = L['IsHNil']

export type THListHead<L extends THCons<any, any>> = L['head']

export type THListTail<L extends THCons<any, any>> = L['tail']

export type THListLength<L extends THList> = {
  true: _0
  false: Succ<THListLength<THListTail<L>>>
}[THListIsTHNil<L>]

export type THListTypeAt<L extends THList, I extends Nat> = {
  true: THListHead<L>
  false: THListTypeAt<THListTail<L>, Prev<I>>
}[IsZero<I>]

export type THListGet<L extends THList, I extends Nat> = {
  true: TNone
  false: {
    true: TSome<THListHead<L>>
    false: THListGet<THListTail<L>, Prev<I>>
  }[IsZero<I>]
}[THListIsTHNil<L>]

export type UnsafeTHListGet<L extends THList, I extends Nat> = {
  true: THListHead<L>
  false: UnsafeTHListGet<THListTail<L>, Prev<I>>
}[IsZero<I>]

export type THListReverse<L extends THList, Acc = THNil> = {
  true: Acc
  false: THListReverse<THListTail<L>, THCons<THListHead<L>, Acc>>
}[THListIsTHNil<L>]

/** max length = 6 */
export type THListToTuple<L extends THList> = {
  true: []
  false: {
    true: [THListHead<L>]
    false: {
      true: [THListHead<L>, THListHead<THListTail<L>>]
      false: {
        true: [THListHead<L>, THListHead<THListTail<L>>, THListHead<THListTail<THListTail<L>>>]
        false: {
          true: [
            THListHead<L>,
            THListHead<THListTail<L>>,
            THListHead<THListTail<THListTail<L>>>,
            THListHead<THListTail<THListTail<THListTail<L>>>>
          ]
          false: {
            true: [
              THListHead<L>,
              THListHead<THListTail<L>>,
              THListHead<THListTail<THListTail<L>>>,
              THListHead<THListTail<THListTail<THListTail<L>>>>,
              THListHead<THListTail<THListTail<THListTail<THListTail<L>>>>>
            ]
            false: {
              true: [
                THListHead<L>,
                THListHead<THListTail<L>>,
                THListHead<THListTail<THListTail<L>>>,
                THListHead<THListTail<THListTail<THListTail<L>>>>,
                THListHead<THListTail<THListTail<THListTail<THListTail<L>>>>>,
                THListHead<THListTail<THListTail<THListTail<THListTail<THListTail<L>>>>>>
              ]
              false: 'Error'
            }[IsZero<THListLength<THListTail<THListTail<THListTail<THListTail<THListTail<THListTail<L>>>>>>>>]
          }[IsZero<THListLength<THListTail<THListTail<THListTail<THListTail<THListTail<L>>>>>>>]
        }[IsZero<THListLength<THListTail<THListTail<THListTail<THListTail<L>>>>>>]
      }[IsZero<THListLength<THListTail<THListTail<THListTail<L>>>>>]
    }[IsZero<THListLength<THListTail<THListTail<L>>>>]
  }[IsZero<THListLength<THListTail<L>>>]
}[IsZero<THListLength<L>>]

//
// tuples
//

export type TupleToObject<T> = ObjectOmit<T, keyof Array<any>>

export type Increment = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export type TupleLength<T, I = 0> = {
  true: TupleLength<T, Increment[I]>
  false: I
}[ObjectHasKey<T, I>]

export type TupleToTHList<T, I = 0, L = THNil> = {
  true: TupleToTHList<T, Increment[I], THCons<T[I], L>>
  false: L
}[ObjectHasKey<T, I>]
