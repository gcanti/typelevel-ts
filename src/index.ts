/**
 * Returns the string literal 'T' if `A` and `B` are equal types, 'F' otherwise
 */
export type Equals<A, B> = [A] extends [B] ? ([B] extends [A] ? 'T' : 'F') : 'F'

/**
 * Extracts a super-type of `O` identified by its keys `K`
 */
export type Omit<O extends object, K extends PropertyKey> = Pick<O, Exclude<keyof O, K>>

export type Overwrite<A extends object, B extends object> = Pick<A, Exclude<keyof A, keyof B>> & B

export type Diff<A extends object, B extends object> = Omit<A, keyof B> & Partial<B>

/**
 * Encodes the constraint that a given object `O`
 * does not contain specific keys `K`
 */
export type RowLacks<O extends object, K extends PropertyKey> = O & Record<Extract<keyof O, K>, never>

export type Exact<A extends object, B extends A> = A & Record<Exclude<keyof B, keyof A>, undefined>

export type AnyTuple = Array<any> & { '0': any }

export interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

export type DeepReadonlyObject<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> }

export type DeepReadonly<T> = T extends Array<infer A> ? DeepReadonlyArray<A> : DeepReadonlyObject<T>
