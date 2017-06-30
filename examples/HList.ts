import { _0, _1, _2, Succ, Nat, IsZero, Prev, Lt } from 'typelevel-ts'

class HNil {
  static value = new HNil()
  IsHNil: 'true'
  Length: _0
  length: 0 = 0
  private constructor() {}
  get<P>(i: 0, proof: P): any {
    throw new Error()
  }
}

class HCons<H, T extends HList> {
  IsHNil: 'false'
  Length: Succ<T['Length']>
  length: number = 1 + this.tail.length
  constructor(public readonly head: H, public readonly tail: T) {}
  get<P extends Lt<_2, this['Length']>>(i: 2, proof: P): HTypeAt<this, _2>
  get<P extends Lt<_1, this['Length']>>(i: 1, proof: P): HTypeAt<this, _1>
  get<P extends Lt<_0, this['Length']>>(i: 0, proof: P): HTypeAt<this, _0>
  get(i: number, proof: string): any {
    if (i === 0) {
      return this.head
    }
    return this.tail.get((i - 1) as any, null as any)
  }
}

type HList = HNil | HCons<any, any>

type HTypeAt<H extends HList, I extends Nat> = {
  true: H['head']
  false: HTypeAt<H['tail'], Prev<I>>
}[IsZero<I>]

//
// usage
//

const hnil = HNil.value
const hcons = <H, T extends HList>(head: H, tail: T) => new HCons(head, tail)

// hlist :: HCons<number, HCons<string, HNil>>
const hlist = hcons(1, hcons('a', hnil))

// theString :: string
const theString = hlist.tail.head
// const impossible = hlist.tail.tail.head // error

// theNumber: number
const theNumber = hlist.get(0, 'true')
// againTheString: string
const againTheString = hlist.get(1, 'true')

// const impossible = hlist.get(2, 'true') // error

console.log(hlist.get(0, 'true')) // 1
console.log(hlist.get(1, 'true')) // 'a'
// console.log(hlist.get(2, 'true')) // 'a'
