import { _1, _2, _3, Nat, Add } from 'typelevel-ts'

function create<A>(as: [A, A, A]): Vector<_3, A>
function create<A>(as: [A, A]): Vector<_2, A>
function create<A>(as: [A]): Vector<_1, A>
function create<N extends Nat, A>(as: Array<A>): Vector<N, A> {
  return new Vector<N, A>(as)
}

class Vector<N extends Nat, A> {
  static create = create
  readonly _N: N
  readonly _A: A
  constructor(public value: Array<A>) {}
  append<N2 extends Nat>(vector: Vector<N2, A>): Vector<Add<N, N2>, A> {
    return new Vector<Add<N, N2>, A>(this.value.concat(vector.value))
  }
  zip<B>(vector: Vector<N, B>): Vector<N, [A, B]> {
    return new Vector<N, [A, B]>(this.value.map((a, i) => [a, vector.value[i]] as [A, B]))
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `Vector(${JSON.stringify(this.value)})`
  }
}

// v1 :: Vector<_1, number>
const v1 = Vector.create([1])
// v2 :: Vector<_2, number>
const v2 = Vector.create([2, 3])
// v3 :: Vector<_3, number>
const v3 = v1.append(v2)

// v3.zip(v2) // error

console.log(v2.zip(v1.append(v1))) // Vector([[2,1],[3,1]])
