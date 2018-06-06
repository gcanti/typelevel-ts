//
// helpers
//

export type Increment = { 0: '1'; 1: '2'; 2: '3'; 3: '4'; 4: '5'; 5: '6'; 6: '7'; 7: '8'; 8: '9'; 9: '10'; 10: never }

export type StringToNumber = { 0: 0; 1: 1; 2: 2; 3: 3; 4: 4; 5: 5; 6: 6; 7: 7; 8: 8; 9: 9; 10: 10 }

//
// booleans
//

export type Bool = 'T' | 'F'

export type If<B extends Bool, Then, Else> = {
  T: Then
  F: Else
}[B]

export type Not<B extends Bool> = If<B, 'F', 'T'>

export type And<B1 extends Bool, B2 extends Bool> = If<B1, B2, 'F'>

export type Or<B1 extends Bool, B2 extends Bool> = If<B1, 'T', B2>

export type BoolEq<B1 extends Bool, B2 extends Bool> = If<B1, B2, Not<B2>>

//
// Option
//

export type Option<A> = None | Some<A>

export interface None {
  isNone: 'T'
  _A: never
}

export interface Some<A> {
  isNone: 'F'
  _A: A
}

export type IsNone<O extends Option<any>> = O['isNone']

export type IsSome<O extends Option<any>> = Not<IsNone<O>>

export type OptionUnsafeGet<O extends Option<any>> = O['_A']

export type OptionGetOrElse<O extends Option<any>, A> = If<IsNone<O>, A, OptionUnsafeGet<O>>

//
// naturals
//

export interface Zero {
  isZero: 'T'
  prev: never
}

export interface Succ<N extends Nat> {
  isZero: 'F'
  prev: N
}

export type Nat = Zero | Succ<any>

export type One = Succ<Zero>
export type Two = Succ<One>
export type Three = Succ<Two>
export type Four = Succ<Three>
export type Five = Succ<Four>
export type Six = Succ<Five>
export type Seven = Succ<Six>
export type Eight = Succ<Seven>
export type Nine = Succ<Eight>
export type Ten = Succ<Nine>

export type IsZero<N extends Nat> = N['isZero']

export type Prev<N extends Nat> = N['prev']

export type NatEq<N1 extends Nat, N2 extends Nat> = {
  T: IsZero<N2>
  F: If<IsZero<N2>, 'F', NatEq<Prev<N1>, Prev<N2>>>
}[IsZero<N1>]

export type Add<N1 extends Nat, N2 extends Nat> = {
  T: N2
  F: Succ<Add<Prev<N1>, N2>>
}[IsZero<N1>]

export type Sub<N1 extends Nat, N2 extends Nat> = {
  T: If<IsZero<N2>, Some<Zero>, None>
  F: If<IsZero<N2>, Some<N1>, Sub<Prev<N1>, Prev<N2>>>
}[IsZero<N1>]

export type UnsafeSub<N1 extends Nat, N2 extends Nat> = OptionGetOrElse<Sub<N1, N2>, Zero>

export type Mult<N1 extends Nat, N2 extends Nat> = {
  T: Zero
  F: If<IsZero<Prev<N1>>, N2, Add<N2, Mult<Prev<N1>, N2>>>
}[IsZero<N1>]

export type Lte<N1 extends Nat, N2 extends Nat> = {
  T: 'T'
  F: If<IsZero<N2>, 'F', Lte<Prev<N1>, Prev<N2>>>
}[IsZero<N1>]

export type Lt<N1 extends Nat, N2 extends Nat> = And<Lte<N1, N2>, Not<NatEq<N1, N2>>>

export type Gte<N1 extends Nat, N2 extends Nat> = Not<Lt<N1, N2>>

export type Gt<N1 extends Nat, N2 extends Nat> = Not<Lte<N1, N2>>

export type Mod<N1 extends Nat, N2 extends Nat, R = Zero> = {
  T: R
  F: Mod<N1, N2, UnsafeSub<N1, N2>>
}[IsZero<N1>]

export type Min<N1 extends Nat, N2 extends Nat> = If<Lte<N1, N2>, N1, N2>

export type Max<N1 extends Nat, N2 extends Nat> = If<Lte<N1, N2>, N2, N1>

export type NatToString<N extends Nat, I extends keyof Increment = '0'> = {
  T: I
  F: NatToString<Prev<N>, Increment[I]>
}[IsZero<N>]

export type NatToNumber<N extends Nat> = StringToNumber[NatToString<N>]

//
// strings
//

export type StringToNat = {
  0: Zero
  1: One
  2: Two
  3: Three
  4: Four
  5: Five
  6: Six
  7: Seven
  8: Eight
  9: Nine
  10: Ten
}

export type StringOmit<L1 extends string, L2 extends string> = ({ [P in L1]: P } &
  { [P in L2]: never } & { [key: string]: never })[L1]

export type StringEq<L1 extends string, L2 extends string> = And<StringContains<L1, L2>, StringContains<L2, L1>>

export type StringIntersection<L1 extends string, L2 extends string> = StringOmit<L1, StringOmit<L1, L2>>

export type StringContains<S extends string, L extends string> = ({ [K in S]: 'T' } & {
  [key: string]: 'F'
})[L]

//
// objects
//

export type ObjectHasKey<O, L extends string> = StringContains<keyof O, L>

export type ObjectOverwrite<O1, O2> = Pick<O1, StringOmit<keyof O1, keyof O2>> & O2

export type ObjectOmit<O, K extends string> = Pick<O, StringOmit<keyof O, K>>

export type ObjectDiff<O1 extends O2, O2> = ObjectOmit<O1, keyof O2> & Partial<O2>

export type ObjectClean<T> = Pick<T, keyof T>

export type ObjectOptional<O, K extends keyof O> = ObjectOmit<O, K> & Partial<Pick<O, K>>

export type PickExact<O, K extends keyof O> = Pick<O, K> & { [K1 in StringOmit<keyof O, K>]?: never }

export type Required<T> = { [P in Purify<keyof T>]: NonNullable<T[P]> }

export type Purify<T extends string> = { [P in T]: T }[T]

export type NonNullable<T> = T & {}

//
// hlists
//

export interface HNil {
  isHNil: 'T'
  head: never
  tail: never
}

export interface HCons<H, T extends HList> {
  isHNil: 'F'
  head: H
  tail: T
}

export type HList = HNil | HCons<any, any>

export type IsHNil<L extends HList> = L['isHNil']

export type Head<L extends HList> = L['head']

export type Tail<L extends HList> = L['tail']

export type TypeAt<L extends HList, I extends Nat> = {
  T: None
  F: If<IsZero<I>, Some<Head<L>>, TypeAt<Tail<L>, Prev<I>>>
}[IsHNil<L>]

export type UnsafeTypeAt<L extends HList, N extends Nat> = OptionGetOrElse<TypeAt<L, N>, never>

export type Reverse<L extends HList, Acc extends HList = HNil> = {
  T: Acc
  F: Reverse<Tail<L>, HCons<Head<L>, Acc>>
}[IsHNil<L>]

export type HListLengthAsNat<L extends HList> = {
  T: Zero
  F: Succ<HListLengthAsNat<Tail<L>>>
}[IsHNil<L>]

export type HListLengthAsString<L extends HList> = {
  T: '0'
  F: Increment[HListLengthAsString<Tail<L>>]
}[IsHNil<L>]

export type HListLengthAsNumber<L extends HList> = StringToNumber[HListLengthAsString<L>]

export type HListToTuple<L extends HList> = {
  0: never
  1: [Head<L>]
  2: [Head<L>, Head<Tail<L>>]
  3: [Head<L>, Head<Tail<L>>, Head<Tail<Tail<L>>>]
  4: [Head<L>, Head<Tail<L>>, Head<Tail<Tail<L>>>, Head<Tail<Tail<Tail<L>>>>]
  5: [Head<L>, Head<Tail<L>>, Head<Tail<Tail<L>>>, Head<Tail<Tail<Tail<L>>>>, Head<Tail<Tail<Tail<Tail<L>>>>>]
  6: [
    Head<L>,
    Head<Tail<L>>,
    Head<Tail<Tail<L>>>,
    Head<Tail<Tail<Tail<L>>>>,
    Head<Tail<Tail<Tail<Tail<L>>>>>,
    Head<Tail<Tail<Tail<Tail<Tail<L>>>>>>
  ]
}[HListLengthAsString<L>]

export type HListConcat<L1 extends HList, L2 extends HList> = {
  T: L2
  F: HCons<Head<L1>, HListConcat<Tail<L1>, L2>>
}[IsHNil<L1>]

//
// tuples
//

export type AnyTuple = Array<any> & { '0': any }

export type TupleToObject<T> = ObjectOmit<T, keyof Array<any>>

export type TupleLengthAsString<T extends AnyTuple, I extends keyof Increment = '0'> = {
  T: TupleLengthAsString<T, Increment[I]>
  F: I
}[ObjectHasKey<T, I>]

export type TupleLengthAsNumber<T extends AnyTuple> = StringToNumber[TupleLengthAsString<T>]

export type TupleToHList<T extends AnyTuple, I extends keyof Increment & keyof T = '0', L extends HList = HNil> = {
  T: TupleToHList<T, Increment[I], HCons<T[I], L>>
  F: Reverse<L>
}[ObjectHasKey<T, I>]
