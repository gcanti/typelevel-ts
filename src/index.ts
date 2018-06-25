/**
 * Returns the string literal 'T' if `A` and `B` are equal types, 'F' otherwise
 */
export type Equals<A, B> = [A] extends [B] ? ([B] extends [A] ? 'T' : 'F') : 'F'

/**
 * Extracts a super-type of `A` identified by its keys `K`
 */
export type Omit<A extends object, K extends string | number | symbol> = Pick<A, Exclude<keyof A, K>>

export type Overwrite<A extends object, B extends object> = Pick<A, Exclude<keyof A, keyof B>> & B

export type Diff<A extends object, K extends keyof A> = Omit<A, K> & Partial<Pick<A, K>>

/**
 * Picks only the keys of a certain type
 */
export type KeysOfType<A extends object, B> = { [K in keyof A]: A[K] extends B ? K : never }[keyof A]

/**
 * Encodes the constraint that a given object `A`
 * does not contain specific keys `K`
 */
export type RowLacks<A extends object, K extends string | number | symbol> = A & Record<Extract<keyof A, K>, never>

export type Exact<A extends object, B extends A> = A & Record<Exclude<keyof B, keyof A>, undefined>

export type AnyTuple = Array<any> & { '0': any }

export interface DeepReadonlyArray<A> extends ReadonlyArray<DeepReadonly<A>> {}

export type DeepReadonlyObject<A> = { readonly [K in keyof A]: DeepReadonly<A[K]> }

export type DeepReadonly<A> = A extends Array<infer B> ? DeepReadonlyArray<B> : DeepReadonlyObject<A>
