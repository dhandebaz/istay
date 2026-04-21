
/**
 * Client
**/

import * as runtime from '.././runtime/library.d.ts';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Host
 * 
 */
export type Host = $Result.DefaultSelection<Prisma.$HostPayload>
/**
 * Model AuthRecord
 * 
 */
export type AuthRecord = $Result.DefaultSelection<Prisma.$AuthRecordPayload>
/**
 * Model Property
 * 
 */
export type Property = $Result.DefaultSelection<Prisma.$PropertyPayload>
/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>
/**
 * Model CalendarBlock
 * 
 */
export type CalendarBlock = $Result.DefaultSelection<Prisma.$CalendarBlockPayload>
/**
 * Model LedgerEntry
 * 
 */
export type LedgerEntry = $Result.DefaultSelection<Prisma.$LedgerEntryPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model GuestVerification
 * 
 */
export type GuestVerification = $Result.DefaultSelection<Prisma.$GuestVerificationPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model GuestProfile
 * 
 */
export type GuestProfile = $Result.DefaultSelection<Prisma.$GuestProfilePayload>
/**
 * Model HostKnowledge
 * 
 */
export type HostKnowledge = $Result.DefaultSelection<Prisma.$HostKnowledgePayload>
/**
 * Model Waitlist
 * 
 */
export type Waitlist = $Result.DefaultSelection<Prisma.$WaitlistPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Hosts
 * const hosts = await prisma.host.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Hosts
   * const hosts = await prisma.host.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.host`: Exposes CRUD operations for the **Host** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Hosts
    * const hosts = await prisma.host.findMany()
    * ```
    */
  get host(): Prisma.HostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authRecord`: Exposes CRUD operations for the **AuthRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthRecords
    * const authRecords = await prisma.authRecord.findMany()
    * ```
    */
  get authRecord(): Prisma.AuthRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.property`: Exposes CRUD operations for the **Property** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Properties
    * const properties = await prisma.property.findMany()
    * ```
    */
  get property(): Prisma.PropertyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.calendarBlock`: Exposes CRUD operations for the **CalendarBlock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CalendarBlocks
    * const calendarBlocks = await prisma.calendarBlock.findMany()
    * ```
    */
  get calendarBlock(): Prisma.CalendarBlockDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ledgerEntry`: Exposes CRUD operations for the **LedgerEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LedgerEntries
    * const ledgerEntries = await prisma.ledgerEntry.findMany()
    * ```
    */
  get ledgerEntry(): Prisma.LedgerEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guestVerification`: Exposes CRUD operations for the **GuestVerification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GuestVerifications
    * const guestVerifications = await prisma.guestVerification.findMany()
    * ```
    */
  get guestVerification(): Prisma.GuestVerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guestProfile`: Exposes CRUD operations for the **GuestProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GuestProfiles
    * const guestProfiles = await prisma.guestProfile.findMany()
    * ```
    */
  get guestProfile(): Prisma.GuestProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hostKnowledge`: Exposes CRUD operations for the **HostKnowledge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HostKnowledges
    * const hostKnowledges = await prisma.hostKnowledge.findMany()
    * ```
    */
  get hostKnowledge(): Prisma.HostKnowledgeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.waitlist`: Exposes CRUD operations for the **Waitlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Waitlists
    * const waitlists = await prisma.waitlist.findMany()
    * ```
    */
  get waitlist(): Prisma.WaitlistDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.4.1
   * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Host: 'Host',
    AuthRecord: 'AuthRecord',
    Property: 'Property',
    Booking: 'Booking',
    CalendarBlock: 'CalendarBlock',
    LedgerEntry: 'LedgerEntry',
    Notification: 'Notification',
    GuestVerification: 'GuestVerification',
    Review: 'Review',
    GuestProfile: 'GuestProfile',
    HostKnowledge: 'HostKnowledge',
    Waitlist: 'Waitlist'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "host" | "authRecord" | "property" | "booking" | "calendarBlock" | "ledgerEntry" | "notification" | "guestVerification" | "review" | "guestProfile" | "hostKnowledge" | "waitlist"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Host: {
        payload: Prisma.$HostPayload<ExtArgs>
        fields: Prisma.HostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostPayload>
          }
          findFirst: {
            args: Prisma.HostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostPayload>
          }
          findMany: {
            args: Prisma.HostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostPayload>[]
          }
          create: {
            args: Prisma.HostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostPayload>
          }
          createMany: {
            args: Prisma.HostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostPayload>[]
          }
          delete: {
            args: Prisma.HostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostPayload>
          }
          update: {
            args: Prisma.HostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostPayload>
          }
          deleteMany: {
            args: Prisma.HostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostPayload>[]
          }
          upsert: {
            args: Prisma.HostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostPayload>
          }
          aggregate: {
            args: Prisma.HostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHost>
          }
          groupBy: {
            args: Prisma.HostGroupByArgs<ExtArgs>
            result: $Utils.Optional<HostGroupByOutputType>[]
          }
          count: {
            args: Prisma.HostCountArgs<ExtArgs>
            result: $Utils.Optional<HostCountAggregateOutputType> | number
          }
        }
      }
      AuthRecord: {
        payload: Prisma.$AuthRecordPayload<ExtArgs>
        fields: Prisma.AuthRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthRecordPayload>
          }
          findFirst: {
            args: Prisma.AuthRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthRecordPayload>
          }
          findMany: {
            args: Prisma.AuthRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthRecordPayload>[]
          }
          create: {
            args: Prisma.AuthRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthRecordPayload>
          }
          createMany: {
            args: Prisma.AuthRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthRecordPayload>[]
          }
          delete: {
            args: Prisma.AuthRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthRecordPayload>
          }
          update: {
            args: Prisma.AuthRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthRecordPayload>
          }
          deleteMany: {
            args: Prisma.AuthRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthRecordPayload>[]
          }
          upsert: {
            args: Prisma.AuthRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthRecordPayload>
          }
          aggregate: {
            args: Prisma.AuthRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthRecord>
          }
          groupBy: {
            args: Prisma.AuthRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthRecordCountArgs<ExtArgs>
            result: $Utils.Optional<AuthRecordCountAggregateOutputType> | number
          }
        }
      }
      Property: {
        payload: Prisma.$PropertyPayload<ExtArgs>
        fields: Prisma.PropertyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findFirst: {
            args: Prisma.PropertyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findMany: {
            args: Prisma.PropertyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          create: {
            args: Prisma.PropertyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          createMany: {
            args: Prisma.PropertyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          delete: {
            args: Prisma.PropertyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          update: {
            args: Prisma.PropertyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          deleteMany: {
            args: Prisma.PropertyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PropertyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          upsert: {
            args: Prisma.PropertyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          aggregate: {
            args: Prisma.PropertyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProperty>
          }
          groupBy: {
            args: Prisma.PropertyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
      CalendarBlock: {
        payload: Prisma.$CalendarBlockPayload<ExtArgs>
        fields: Prisma.CalendarBlockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CalendarBlockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarBlockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CalendarBlockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarBlockPayload>
          }
          findFirst: {
            args: Prisma.CalendarBlockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarBlockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CalendarBlockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarBlockPayload>
          }
          findMany: {
            args: Prisma.CalendarBlockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarBlockPayload>[]
          }
          create: {
            args: Prisma.CalendarBlockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarBlockPayload>
          }
          createMany: {
            args: Prisma.CalendarBlockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CalendarBlockCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarBlockPayload>[]
          }
          delete: {
            args: Prisma.CalendarBlockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarBlockPayload>
          }
          update: {
            args: Prisma.CalendarBlockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarBlockPayload>
          }
          deleteMany: {
            args: Prisma.CalendarBlockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CalendarBlockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CalendarBlockUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarBlockPayload>[]
          }
          upsert: {
            args: Prisma.CalendarBlockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarBlockPayload>
          }
          aggregate: {
            args: Prisma.CalendarBlockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCalendarBlock>
          }
          groupBy: {
            args: Prisma.CalendarBlockGroupByArgs<ExtArgs>
            result: $Utils.Optional<CalendarBlockGroupByOutputType>[]
          }
          count: {
            args: Prisma.CalendarBlockCountArgs<ExtArgs>
            result: $Utils.Optional<CalendarBlockCountAggregateOutputType> | number
          }
        }
      }
      LedgerEntry: {
        payload: Prisma.$LedgerEntryPayload<ExtArgs>
        fields: Prisma.LedgerEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LedgerEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LedgerEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          findFirst: {
            args: Prisma.LedgerEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LedgerEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          findMany: {
            args: Prisma.LedgerEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>[]
          }
          create: {
            args: Prisma.LedgerEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          createMany: {
            args: Prisma.LedgerEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LedgerEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>[]
          }
          delete: {
            args: Prisma.LedgerEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          update: {
            args: Prisma.LedgerEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          deleteMany: {
            args: Prisma.LedgerEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LedgerEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LedgerEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>[]
          }
          upsert: {
            args: Prisma.LedgerEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          aggregate: {
            args: Prisma.LedgerEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLedgerEntry>
          }
          groupBy: {
            args: Prisma.LedgerEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<LedgerEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.LedgerEntryCountArgs<ExtArgs>
            result: $Utils.Optional<LedgerEntryCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      GuestVerification: {
        payload: Prisma.$GuestVerificationPayload<ExtArgs>
        fields: Prisma.GuestVerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuestVerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestVerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuestVerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestVerificationPayload>
          }
          findFirst: {
            args: Prisma.GuestVerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestVerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuestVerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestVerificationPayload>
          }
          findMany: {
            args: Prisma.GuestVerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestVerificationPayload>[]
          }
          create: {
            args: Prisma.GuestVerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestVerificationPayload>
          }
          createMany: {
            args: Prisma.GuestVerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GuestVerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestVerificationPayload>[]
          }
          delete: {
            args: Prisma.GuestVerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestVerificationPayload>
          }
          update: {
            args: Prisma.GuestVerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestVerificationPayload>
          }
          deleteMany: {
            args: Prisma.GuestVerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuestVerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GuestVerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestVerificationPayload>[]
          }
          upsert: {
            args: Prisma.GuestVerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestVerificationPayload>
          }
          aggregate: {
            args: Prisma.GuestVerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuestVerification>
          }
          groupBy: {
            args: Prisma.GuestVerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuestVerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuestVerificationCountArgs<ExtArgs>
            result: $Utils.Optional<GuestVerificationCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      GuestProfile: {
        payload: Prisma.$GuestProfilePayload<ExtArgs>
        fields: Prisma.GuestProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuestProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuestProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestProfilePayload>
          }
          findFirst: {
            args: Prisma.GuestProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuestProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestProfilePayload>
          }
          findMany: {
            args: Prisma.GuestProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestProfilePayload>[]
          }
          create: {
            args: Prisma.GuestProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestProfilePayload>
          }
          createMany: {
            args: Prisma.GuestProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GuestProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestProfilePayload>[]
          }
          delete: {
            args: Prisma.GuestProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestProfilePayload>
          }
          update: {
            args: Prisma.GuestProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestProfilePayload>
          }
          deleteMany: {
            args: Prisma.GuestProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuestProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GuestProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestProfilePayload>[]
          }
          upsert: {
            args: Prisma.GuestProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestProfilePayload>
          }
          aggregate: {
            args: Prisma.GuestProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuestProfile>
          }
          groupBy: {
            args: Prisma.GuestProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuestProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuestProfileCountArgs<ExtArgs>
            result: $Utils.Optional<GuestProfileCountAggregateOutputType> | number
          }
        }
      }
      HostKnowledge: {
        payload: Prisma.$HostKnowledgePayload<ExtArgs>
        fields: Prisma.HostKnowledgeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HostKnowledgeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostKnowledgePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HostKnowledgeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostKnowledgePayload>
          }
          findFirst: {
            args: Prisma.HostKnowledgeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostKnowledgePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HostKnowledgeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostKnowledgePayload>
          }
          findMany: {
            args: Prisma.HostKnowledgeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostKnowledgePayload>[]
          }
          create: {
            args: Prisma.HostKnowledgeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostKnowledgePayload>
          }
          createMany: {
            args: Prisma.HostKnowledgeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HostKnowledgeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostKnowledgePayload>[]
          }
          delete: {
            args: Prisma.HostKnowledgeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostKnowledgePayload>
          }
          update: {
            args: Prisma.HostKnowledgeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostKnowledgePayload>
          }
          deleteMany: {
            args: Prisma.HostKnowledgeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HostKnowledgeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HostKnowledgeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostKnowledgePayload>[]
          }
          upsert: {
            args: Prisma.HostKnowledgeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HostKnowledgePayload>
          }
          aggregate: {
            args: Prisma.HostKnowledgeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHostKnowledge>
          }
          groupBy: {
            args: Prisma.HostKnowledgeGroupByArgs<ExtArgs>
            result: $Utils.Optional<HostKnowledgeGroupByOutputType>[]
          }
          count: {
            args: Prisma.HostKnowledgeCountArgs<ExtArgs>
            result: $Utils.Optional<HostKnowledgeCountAggregateOutputType> | number
          }
        }
      }
      Waitlist: {
        payload: Prisma.$WaitlistPayload<ExtArgs>
        fields: Prisma.WaitlistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WaitlistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaitlistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WaitlistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaitlistPayload>
          }
          findFirst: {
            args: Prisma.WaitlistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaitlistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WaitlistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaitlistPayload>
          }
          findMany: {
            args: Prisma.WaitlistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaitlistPayload>[]
          }
          create: {
            args: Prisma.WaitlistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaitlistPayload>
          }
          createMany: {
            args: Prisma.WaitlistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WaitlistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaitlistPayload>[]
          }
          delete: {
            args: Prisma.WaitlistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaitlistPayload>
          }
          update: {
            args: Prisma.WaitlistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaitlistPayload>
          }
          deleteMany: {
            args: Prisma.WaitlistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WaitlistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WaitlistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaitlistPayload>[]
          }
          upsert: {
            args: Prisma.WaitlistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WaitlistPayload>
          }
          aggregate: {
            args: Prisma.WaitlistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWaitlist>
          }
          groupBy: {
            args: Prisma.WaitlistGroupByArgs<ExtArgs>
            result: $Utils.Optional<WaitlistGroupByOutputType>[]
          }
          count: {
            args: Prisma.WaitlistCountArgs<ExtArgs>
            result: $Utils.Optional<WaitlistCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    host?: HostOmit
    authRecord?: AuthRecordOmit
    property?: PropertyOmit
    booking?: BookingOmit
    calendarBlock?: CalendarBlockOmit
    ledgerEntry?: LedgerEntryOmit
    notification?: NotificationOmit
    guestVerification?: GuestVerificationOmit
    review?: ReviewOmit
    guestProfile?: GuestProfileOmit
    hostKnowledge?: HostKnowledgeOmit
    waitlist?: WaitlistOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type HostCountOutputType
   */

  export type HostCountOutputType = {
    properties: number
    bookings: number
    ledgerEntries: number
    notifications: number
    knowledge: number
  }

  export type HostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properties?: boolean | HostCountOutputTypeCountPropertiesArgs
    bookings?: boolean | HostCountOutputTypeCountBookingsArgs
    ledgerEntries?: boolean | HostCountOutputTypeCountLedgerEntriesArgs
    notifications?: boolean | HostCountOutputTypeCountNotificationsArgs
    knowledge?: boolean | HostCountOutputTypeCountKnowledgeArgs
  }

  // Custom InputTypes
  /**
   * HostCountOutputType without action
   */
  export type HostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HostCountOutputType
     */
    select?: HostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HostCountOutputType without action
   */
  export type HostCountOutputTypeCountPropertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput
  }

  /**
   * HostCountOutputType without action
   */
  export type HostCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * HostCountOutputType without action
   */
  export type HostCountOutputTypeCountLedgerEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LedgerEntryWhereInput
  }

  /**
   * HostCountOutputType without action
   */
  export type HostCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * HostCountOutputType without action
   */
  export type HostCountOutputTypeCountKnowledgeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HostKnowledgeWhereInput
  }


  /**
   * Count Type PropertyCountOutputType
   */

  export type PropertyCountOutputType = {
    bookings: number
    blocks: number
    reviews: number
    knowledge: number
  }

  export type PropertyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | PropertyCountOutputTypeCountBookingsArgs
    blocks?: boolean | PropertyCountOutputTypeCountBlocksArgs
    reviews?: boolean | PropertyCountOutputTypeCountReviewsArgs
    knowledge?: boolean | PropertyCountOutputTypeCountKnowledgeArgs
  }

  // Custom InputTypes
  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyCountOutputType
     */
    select?: PropertyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountBlocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CalendarBlockWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountKnowledgeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HostKnowledgeWhereInput
  }


  /**
   * Count Type BookingCountOutputType
   */

  export type BookingCountOutputType = {
    ledgerEntries: number
  }

  export type BookingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ledgerEntries?: boolean | BookingCountOutputTypeCountLedgerEntriesArgs
  }

  // Custom InputTypes
  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingCountOutputType
     */
    select?: BookingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeCountLedgerEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LedgerEntryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Host
   */

  export type AggregateHost = {
    _count: HostCountAggregateOutputType | null
    _min: HostMinAggregateOutputType | null
    _max: HostMaxAggregateOutputType | null
  }

  export type HostMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    phone: string | null
    plan: string | null
    setupFeePaid: boolean | null
    gatewayVendorId: string | null
    cashfreeVendorId: string | null
    apiKey: string | null
    legacyApiKey: string | null
    legacyApiKeyExpires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HostMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    phone: string | null
    plan: string | null
    setupFeePaid: boolean | null
    gatewayVendorId: string | null
    cashfreeVendorId: string | null
    apiKey: string | null
    legacyApiKey: string | null
    legacyApiKeyExpires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HostCountAggregateOutputType = {
    id: number
    email: number
    name: number
    phone: number
    plan: number
    setupFeePaid: number
    gatewayVendorId: number
    cashfreeVendorId: number
    apiKey: number
    legacyApiKey: number
    legacyApiKeyExpires: number
    settings: number
    webhooks: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HostMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    phone?: true
    plan?: true
    setupFeePaid?: true
    gatewayVendorId?: true
    cashfreeVendorId?: true
    apiKey?: true
    legacyApiKey?: true
    legacyApiKeyExpires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HostMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    phone?: true
    plan?: true
    setupFeePaid?: true
    gatewayVendorId?: true
    cashfreeVendorId?: true
    apiKey?: true
    legacyApiKey?: true
    legacyApiKeyExpires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HostCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    phone?: true
    plan?: true
    setupFeePaid?: true
    gatewayVendorId?: true
    cashfreeVendorId?: true
    apiKey?: true
    legacyApiKey?: true
    legacyApiKeyExpires?: true
    settings?: true
    webhooks?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Host to aggregate.
     */
    where?: HostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hosts to fetch.
     */
    orderBy?: HostOrderByWithRelationInput | HostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Hosts
    **/
    _count?: true | HostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HostMaxAggregateInputType
  }

  export type GetHostAggregateType<T extends HostAggregateArgs> = {
        [P in keyof T & keyof AggregateHost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHost[P]>
      : GetScalarType<T[P], AggregateHost[P]>
  }




  export type HostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HostWhereInput
    orderBy?: HostOrderByWithAggregationInput | HostOrderByWithAggregationInput[]
    by: HostScalarFieldEnum[] | HostScalarFieldEnum
    having?: HostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HostCountAggregateInputType | true
    _min?: HostMinAggregateInputType
    _max?: HostMaxAggregateInputType
  }

  export type HostGroupByOutputType = {
    id: string
    email: string
    name: string
    phone: string
    plan: string
    setupFeePaid: boolean
    gatewayVendorId: string | null
    cashfreeVendorId: string | null
    apiKey: string | null
    legacyApiKey: string | null
    legacyApiKeyExpires: Date | null
    settings: JsonValue | null
    webhooks: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: HostCountAggregateOutputType | null
    _min: HostMinAggregateOutputType | null
    _max: HostMaxAggregateOutputType | null
  }

  type GetHostGroupByPayload<T extends HostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HostGroupByOutputType[P]>
            : GetScalarType<T[P], HostGroupByOutputType[P]>
        }
      >
    >


  export type HostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    phone?: boolean
    plan?: boolean
    setupFeePaid?: boolean
    gatewayVendorId?: boolean
    cashfreeVendorId?: boolean
    apiKey?: boolean
    legacyApiKey?: boolean
    legacyApiKeyExpires?: boolean
    settings?: boolean
    webhooks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    auth?: boolean | Host$authArgs<ExtArgs>
    properties?: boolean | Host$propertiesArgs<ExtArgs>
    bookings?: boolean | Host$bookingsArgs<ExtArgs>
    ledgerEntries?: boolean | Host$ledgerEntriesArgs<ExtArgs>
    notifications?: boolean | Host$notificationsArgs<ExtArgs>
    knowledge?: boolean | Host$knowledgeArgs<ExtArgs>
    _count?: boolean | HostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["host"]>

  export type HostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    phone?: boolean
    plan?: boolean
    setupFeePaid?: boolean
    gatewayVendorId?: boolean
    cashfreeVendorId?: boolean
    apiKey?: boolean
    legacyApiKey?: boolean
    legacyApiKeyExpires?: boolean
    settings?: boolean
    webhooks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["host"]>

  export type HostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    phone?: boolean
    plan?: boolean
    setupFeePaid?: boolean
    gatewayVendorId?: boolean
    cashfreeVendorId?: boolean
    apiKey?: boolean
    legacyApiKey?: boolean
    legacyApiKeyExpires?: boolean
    settings?: boolean
    webhooks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["host"]>

  export type HostSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    phone?: boolean
    plan?: boolean
    setupFeePaid?: boolean
    gatewayVendorId?: boolean
    cashfreeVendorId?: boolean
    apiKey?: boolean
    legacyApiKey?: boolean
    legacyApiKeyExpires?: boolean
    settings?: boolean
    webhooks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "phone" | "plan" | "setupFeePaid" | "gatewayVendorId" | "cashfreeVendorId" | "apiKey" | "legacyApiKey" | "legacyApiKeyExpires" | "settings" | "webhooks" | "createdAt" | "updatedAt", ExtArgs["result"]["host"]>
  export type HostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auth?: boolean | Host$authArgs<ExtArgs>
    properties?: boolean | Host$propertiesArgs<ExtArgs>
    bookings?: boolean | Host$bookingsArgs<ExtArgs>
    ledgerEntries?: boolean | Host$ledgerEntriesArgs<ExtArgs>
    notifications?: boolean | Host$notificationsArgs<ExtArgs>
    knowledge?: boolean | Host$knowledgeArgs<ExtArgs>
    _count?: boolean | HostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type HostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type HostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $HostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Host"
    objects: {
      auth: Prisma.$AuthRecordPayload<ExtArgs> | null
      properties: Prisma.$PropertyPayload<ExtArgs>[]
      bookings: Prisma.$BookingPayload<ExtArgs>[]
      ledgerEntries: Prisma.$LedgerEntryPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      knowledge: Prisma.$HostKnowledgePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      phone: string
      plan: string
      setupFeePaid: boolean
      gatewayVendorId: string | null
      cashfreeVendorId: string | null
      apiKey: string | null
      legacyApiKey: string | null
      legacyApiKeyExpires: Date | null
      settings: Prisma.JsonValue | null
      webhooks: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["host"]>
    composites: {}
  }

  type HostGetPayload<S extends boolean | null | undefined | HostDefaultArgs> = $Result.GetResult<Prisma.$HostPayload, S>

  type HostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HostCountAggregateInputType | true
    }

  export interface HostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Host'], meta: { name: 'Host' } }
    /**
     * Find zero or one Host that matches the filter.
     * @param {HostFindUniqueArgs} args - Arguments to find a Host
     * @example
     * // Get one Host
     * const host = await prisma.host.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HostFindUniqueArgs>(args: SelectSubset<T, HostFindUniqueArgs<ExtArgs>>): Prisma__HostClient<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Host that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HostFindUniqueOrThrowArgs} args - Arguments to find a Host
     * @example
     * // Get one Host
     * const host = await prisma.host.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HostFindUniqueOrThrowArgs>(args: SelectSubset<T, HostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HostClient<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Host that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HostFindFirstArgs} args - Arguments to find a Host
     * @example
     * // Get one Host
     * const host = await prisma.host.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HostFindFirstArgs>(args?: SelectSubset<T, HostFindFirstArgs<ExtArgs>>): Prisma__HostClient<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Host that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HostFindFirstOrThrowArgs} args - Arguments to find a Host
     * @example
     * // Get one Host
     * const host = await prisma.host.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HostFindFirstOrThrowArgs>(args?: SelectSubset<T, HostFindFirstOrThrowArgs<ExtArgs>>): Prisma__HostClient<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Hosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Hosts
     * const hosts = await prisma.host.findMany()
     * 
     * // Get first 10 Hosts
     * const hosts = await prisma.host.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hostWithIdOnly = await prisma.host.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HostFindManyArgs>(args?: SelectSubset<T, HostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Host.
     * @param {HostCreateArgs} args - Arguments to create a Host.
     * @example
     * // Create one Host
     * const Host = await prisma.host.create({
     *   data: {
     *     // ... data to create a Host
     *   }
     * })
     * 
     */
    create<T extends HostCreateArgs>(args: SelectSubset<T, HostCreateArgs<ExtArgs>>): Prisma__HostClient<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Hosts.
     * @param {HostCreateManyArgs} args - Arguments to create many Hosts.
     * @example
     * // Create many Hosts
     * const host = await prisma.host.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HostCreateManyArgs>(args?: SelectSubset<T, HostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Hosts and returns the data saved in the database.
     * @param {HostCreateManyAndReturnArgs} args - Arguments to create many Hosts.
     * @example
     * // Create many Hosts
     * const host = await prisma.host.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Hosts and only return the `id`
     * const hostWithIdOnly = await prisma.host.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HostCreateManyAndReturnArgs>(args?: SelectSubset<T, HostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Host.
     * @param {HostDeleteArgs} args - Arguments to delete one Host.
     * @example
     * // Delete one Host
     * const Host = await prisma.host.delete({
     *   where: {
     *     // ... filter to delete one Host
     *   }
     * })
     * 
     */
    delete<T extends HostDeleteArgs>(args: SelectSubset<T, HostDeleteArgs<ExtArgs>>): Prisma__HostClient<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Host.
     * @param {HostUpdateArgs} args - Arguments to update one Host.
     * @example
     * // Update one Host
     * const host = await prisma.host.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HostUpdateArgs>(args: SelectSubset<T, HostUpdateArgs<ExtArgs>>): Prisma__HostClient<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Hosts.
     * @param {HostDeleteManyArgs} args - Arguments to filter Hosts to delete.
     * @example
     * // Delete a few Hosts
     * const { count } = await prisma.host.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HostDeleteManyArgs>(args?: SelectSubset<T, HostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Hosts
     * const host = await prisma.host.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HostUpdateManyArgs>(args: SelectSubset<T, HostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hosts and returns the data updated in the database.
     * @param {HostUpdateManyAndReturnArgs} args - Arguments to update many Hosts.
     * @example
     * // Update many Hosts
     * const host = await prisma.host.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Hosts and only return the `id`
     * const hostWithIdOnly = await prisma.host.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HostUpdateManyAndReturnArgs>(args: SelectSubset<T, HostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Host.
     * @param {HostUpsertArgs} args - Arguments to update or create a Host.
     * @example
     * // Update or create a Host
     * const host = await prisma.host.upsert({
     *   create: {
     *     // ... data to create a Host
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Host we want to update
     *   }
     * })
     */
    upsert<T extends HostUpsertArgs>(args: SelectSubset<T, HostUpsertArgs<ExtArgs>>): Prisma__HostClient<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Hosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HostCountArgs} args - Arguments to filter Hosts to count.
     * @example
     * // Count the number of Hosts
     * const count = await prisma.host.count({
     *   where: {
     *     // ... the filter for the Hosts we want to count
     *   }
     * })
    **/
    count<T extends HostCountArgs>(
      args?: Subset<T, HostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Host.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HostAggregateArgs>(args: Subset<T, HostAggregateArgs>): Prisma.PrismaPromise<GetHostAggregateType<T>>

    /**
     * Group by Host.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HostGroupByArgs['orderBy'] }
        : { orderBy?: HostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Host model
   */
  readonly fields: HostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Host.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auth<T extends Host$authArgs<ExtArgs> = {}>(args?: Subset<T, Host$authArgs<ExtArgs>>): Prisma__AuthRecordClient<$Result.GetResult<Prisma.$AuthRecordPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    properties<T extends Host$propertiesArgs<ExtArgs> = {}>(args?: Subset<T, Host$propertiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    bookings<T extends Host$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Host$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    ledgerEntries<T extends Host$ledgerEntriesArgs<ExtArgs> = {}>(args?: Subset<T, Host$ledgerEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    notifications<T extends Host$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Host$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    knowledge<T extends Host$knowledgeArgs<ExtArgs> = {}>(args?: Subset<T, Host$knowledgeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HostKnowledgePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Host model
   */ 
  interface HostFieldRefs {
    readonly id: FieldRef<"Host", 'String'>
    readonly email: FieldRef<"Host", 'String'>
    readonly name: FieldRef<"Host", 'String'>
    readonly phone: FieldRef<"Host", 'String'>
    readonly plan: FieldRef<"Host", 'String'>
    readonly setupFeePaid: FieldRef<"Host", 'Boolean'>
    readonly gatewayVendorId: FieldRef<"Host", 'String'>
    readonly cashfreeVendorId: FieldRef<"Host", 'String'>
    readonly apiKey: FieldRef<"Host", 'String'>
    readonly legacyApiKey: FieldRef<"Host", 'String'>
    readonly legacyApiKeyExpires: FieldRef<"Host", 'DateTime'>
    readonly settings: FieldRef<"Host", 'Json'>
    readonly webhooks: FieldRef<"Host", 'Json'>
    readonly createdAt: FieldRef<"Host", 'DateTime'>
    readonly updatedAt: FieldRef<"Host", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Host findUnique
   */
  export type HostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Host
     */
    select?: HostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Host
     */
    omit?: HostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostInclude<ExtArgs> | null
    /**
     * Filter, which Host to fetch.
     */
    where: HostWhereUniqueInput
  }

  /**
   * Host findUniqueOrThrow
   */
  export type HostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Host
     */
    select?: HostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Host
     */
    omit?: HostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostInclude<ExtArgs> | null
    /**
     * Filter, which Host to fetch.
     */
    where: HostWhereUniqueInput
  }

  /**
   * Host findFirst
   */
  export type HostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Host
     */
    select?: HostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Host
     */
    omit?: HostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostInclude<ExtArgs> | null
    /**
     * Filter, which Host to fetch.
     */
    where?: HostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hosts to fetch.
     */
    orderBy?: HostOrderByWithRelationInput | HostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hosts.
     */
    cursor?: HostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hosts.
     */
    distinct?: HostScalarFieldEnum | HostScalarFieldEnum[]
  }

  /**
   * Host findFirstOrThrow
   */
  export type HostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Host
     */
    select?: HostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Host
     */
    omit?: HostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostInclude<ExtArgs> | null
    /**
     * Filter, which Host to fetch.
     */
    where?: HostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hosts to fetch.
     */
    orderBy?: HostOrderByWithRelationInput | HostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hosts.
     */
    cursor?: HostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hosts.
     */
    distinct?: HostScalarFieldEnum | HostScalarFieldEnum[]
  }

  /**
   * Host findMany
   */
  export type HostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Host
     */
    select?: HostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Host
     */
    omit?: HostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostInclude<ExtArgs> | null
    /**
     * Filter, which Hosts to fetch.
     */
    where?: HostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hosts to fetch.
     */
    orderBy?: HostOrderByWithRelationInput | HostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Hosts.
     */
    cursor?: HostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hosts.
     */
    skip?: number
    distinct?: HostScalarFieldEnum | HostScalarFieldEnum[]
  }

  /**
   * Host create
   */
  export type HostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Host
     */
    select?: HostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Host
     */
    omit?: HostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostInclude<ExtArgs> | null
    /**
     * The data needed to create a Host.
     */
    data: XOR<HostCreateInput, HostUncheckedCreateInput>
  }

  /**
   * Host createMany
   */
  export type HostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Hosts.
     */
    data: HostCreateManyInput | HostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Host createManyAndReturn
   */
  export type HostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Host
     */
    select?: HostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Host
     */
    omit?: HostOmit<ExtArgs> | null
    /**
     * The data used to create many Hosts.
     */
    data: HostCreateManyInput | HostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Host update
   */
  export type HostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Host
     */
    select?: HostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Host
     */
    omit?: HostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostInclude<ExtArgs> | null
    /**
     * The data needed to update a Host.
     */
    data: XOR<HostUpdateInput, HostUncheckedUpdateInput>
    /**
     * Choose, which Host to update.
     */
    where: HostWhereUniqueInput
  }

  /**
   * Host updateMany
   */
  export type HostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Hosts.
     */
    data: XOR<HostUpdateManyMutationInput, HostUncheckedUpdateManyInput>
    /**
     * Filter which Hosts to update
     */
    where?: HostWhereInput
    /**
     * Limit how many Hosts to update.
     */
    limit?: number
  }

  /**
   * Host updateManyAndReturn
   */
  export type HostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Host
     */
    select?: HostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Host
     */
    omit?: HostOmit<ExtArgs> | null
    /**
     * The data used to update Hosts.
     */
    data: XOR<HostUpdateManyMutationInput, HostUncheckedUpdateManyInput>
    /**
     * Filter which Hosts to update
     */
    where?: HostWhereInput
    /**
     * Limit how many Hosts to update.
     */
    limit?: number
  }

  /**
   * Host upsert
   */
  export type HostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Host
     */
    select?: HostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Host
     */
    omit?: HostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostInclude<ExtArgs> | null
    /**
     * The filter to search for the Host to update in case it exists.
     */
    where: HostWhereUniqueInput
    /**
     * In case the Host found by the `where` argument doesn't exist, create a new Host with this data.
     */
    create: XOR<HostCreateInput, HostUncheckedCreateInput>
    /**
     * In case the Host was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HostUpdateInput, HostUncheckedUpdateInput>
  }

  /**
   * Host delete
   */
  export type HostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Host
     */
    select?: HostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Host
     */
    omit?: HostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostInclude<ExtArgs> | null
    /**
     * Filter which Host to delete.
     */
    where: HostWhereUniqueInput
  }

  /**
   * Host deleteMany
   */
  export type HostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hosts to delete
     */
    where?: HostWhereInput
    /**
     * Limit how many Hosts to delete.
     */
    limit?: number
  }

  /**
   * Host.auth
   */
  export type Host$authArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthRecord
     */
    select?: AuthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthRecord
     */
    omit?: AuthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthRecordInclude<ExtArgs> | null
    where?: AuthRecordWhereInput
  }

  /**
   * Host.properties
   */
  export type Host$propertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    where?: PropertyWhereInput
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    cursor?: PropertyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Host.bookings
   */
  export type Host$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Host.ledgerEntries
   */
  export type Host$ledgerEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    where?: LedgerEntryWhereInput
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    cursor?: LedgerEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LedgerEntryScalarFieldEnum | LedgerEntryScalarFieldEnum[]
  }

  /**
   * Host.notifications
   */
  export type Host$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Host.knowledge
   */
  export type Host$knowledgeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HostKnowledge
     */
    select?: HostKnowledgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HostKnowledge
     */
    omit?: HostKnowledgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostKnowledgeInclude<ExtArgs> | null
    where?: HostKnowledgeWhereInput
    orderBy?: HostKnowledgeOrderByWithRelationInput | HostKnowledgeOrderByWithRelationInput[]
    cursor?: HostKnowledgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HostKnowledgeScalarFieldEnum | HostKnowledgeScalarFieldEnum[]
  }

  /**
   * Host without action
   */
  export type HostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Host
     */
    select?: HostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Host
     */
    omit?: HostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostInclude<ExtArgs> | null
  }


  /**
   * Model AuthRecord
   */

  export type AggregateAuthRecord = {
    _count: AuthRecordCountAggregateOutputType | null
    _min: AuthRecordMinAggregateOutputType | null
    _max: AuthRecordMaxAggregateOutputType | null
  }

  export type AuthRecordMinAggregateOutputType = {
    hostId: string | null
    email: string | null
    passwordHash: string | null
    salt: string | null
    role: string | null
    emailVerified: boolean | null
    verifyToken: string | null
    resetToken: string | null
    resetTokenExpires: Date | null
  }

  export type AuthRecordMaxAggregateOutputType = {
    hostId: string | null
    email: string | null
    passwordHash: string | null
    salt: string | null
    role: string | null
    emailVerified: boolean | null
    verifyToken: string | null
    resetToken: string | null
    resetTokenExpires: Date | null
  }

  export type AuthRecordCountAggregateOutputType = {
    hostId: number
    email: number
    passwordHash: number
    salt: number
    role: number
    emailVerified: number
    verifyToken: number
    resetToken: number
    resetTokenExpires: number
    _all: number
  }


  export type AuthRecordMinAggregateInputType = {
    hostId?: true
    email?: true
    passwordHash?: true
    salt?: true
    role?: true
    emailVerified?: true
    verifyToken?: true
    resetToken?: true
    resetTokenExpires?: true
  }

  export type AuthRecordMaxAggregateInputType = {
    hostId?: true
    email?: true
    passwordHash?: true
    salt?: true
    role?: true
    emailVerified?: true
    verifyToken?: true
    resetToken?: true
    resetTokenExpires?: true
  }

  export type AuthRecordCountAggregateInputType = {
    hostId?: true
    email?: true
    passwordHash?: true
    salt?: true
    role?: true
    emailVerified?: true
    verifyToken?: true
    resetToken?: true
    resetTokenExpires?: true
    _all?: true
  }

  export type AuthRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthRecord to aggregate.
     */
    where?: AuthRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthRecords to fetch.
     */
    orderBy?: AuthRecordOrderByWithRelationInput | AuthRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthRecords
    **/
    _count?: true | AuthRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthRecordMaxAggregateInputType
  }

  export type GetAuthRecordAggregateType<T extends AuthRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthRecord[P]>
      : GetScalarType<T[P], AggregateAuthRecord[P]>
  }




  export type AuthRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthRecordWhereInput
    orderBy?: AuthRecordOrderByWithAggregationInput | AuthRecordOrderByWithAggregationInput[]
    by: AuthRecordScalarFieldEnum[] | AuthRecordScalarFieldEnum
    having?: AuthRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthRecordCountAggregateInputType | true
    _min?: AuthRecordMinAggregateInputType
    _max?: AuthRecordMaxAggregateInputType
  }

  export type AuthRecordGroupByOutputType = {
    hostId: string
    email: string
    passwordHash: string
    salt: string
    role: string
    emailVerified: boolean
    verifyToken: string | null
    resetToken: string | null
    resetTokenExpires: Date | null
    _count: AuthRecordCountAggregateOutputType | null
    _min: AuthRecordMinAggregateOutputType | null
    _max: AuthRecordMaxAggregateOutputType | null
  }

  type GetAuthRecordGroupByPayload<T extends AuthRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthRecordGroupByOutputType[P]>
            : GetScalarType<T[P], AuthRecordGroupByOutputType[P]>
        }
      >
    >


  export type AuthRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    hostId?: boolean
    email?: boolean
    passwordHash?: boolean
    salt?: boolean
    role?: boolean
    emailVerified?: boolean
    verifyToken?: boolean
    resetToken?: boolean
    resetTokenExpires?: boolean
    host?: boolean | HostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authRecord"]>

  export type AuthRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    hostId?: boolean
    email?: boolean
    passwordHash?: boolean
    salt?: boolean
    role?: boolean
    emailVerified?: boolean
    verifyToken?: boolean
    resetToken?: boolean
    resetTokenExpires?: boolean
    host?: boolean | HostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authRecord"]>

  export type AuthRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    hostId?: boolean
    email?: boolean
    passwordHash?: boolean
    salt?: boolean
    role?: boolean
    emailVerified?: boolean
    verifyToken?: boolean
    resetToken?: boolean
    resetTokenExpires?: boolean
    host?: boolean | HostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authRecord"]>

  export type AuthRecordSelectScalar = {
    hostId?: boolean
    email?: boolean
    passwordHash?: boolean
    salt?: boolean
    role?: boolean
    emailVerified?: boolean
    verifyToken?: boolean
    resetToken?: boolean
    resetTokenExpires?: boolean
  }

  export type AuthRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"hostId" | "email" | "passwordHash" | "salt" | "role" | "emailVerified" | "verifyToken" | "resetToken" | "resetTokenExpires", ExtArgs["result"]["authRecord"]>
  export type AuthRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | HostDefaultArgs<ExtArgs>
  }
  export type AuthRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | HostDefaultArgs<ExtArgs>
  }
  export type AuthRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | HostDefaultArgs<ExtArgs>
  }

  export type $AuthRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthRecord"
    objects: {
      host: Prisma.$HostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      hostId: string
      email: string
      passwordHash: string
      salt: string
      role: string
      emailVerified: boolean
      verifyToken: string | null
      resetToken: string | null
      resetTokenExpires: Date | null
    }, ExtArgs["result"]["authRecord"]>
    composites: {}
  }

  type AuthRecordGetPayload<S extends boolean | null | undefined | AuthRecordDefaultArgs> = $Result.GetResult<Prisma.$AuthRecordPayload, S>

  type AuthRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthRecordCountAggregateInputType | true
    }

  export interface AuthRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthRecord'], meta: { name: 'AuthRecord' } }
    /**
     * Find zero or one AuthRecord that matches the filter.
     * @param {AuthRecordFindUniqueArgs} args - Arguments to find a AuthRecord
     * @example
     * // Get one AuthRecord
     * const authRecord = await prisma.authRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthRecordFindUniqueArgs>(args: SelectSubset<T, AuthRecordFindUniqueArgs<ExtArgs>>): Prisma__AuthRecordClient<$Result.GetResult<Prisma.$AuthRecordPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one AuthRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthRecordFindUniqueOrThrowArgs} args - Arguments to find a AuthRecord
     * @example
     * // Get one AuthRecord
     * const authRecord = await prisma.authRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthRecordClient<$Result.GetResult<Prisma.$AuthRecordPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first AuthRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthRecordFindFirstArgs} args - Arguments to find a AuthRecord
     * @example
     * // Get one AuthRecord
     * const authRecord = await prisma.authRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthRecordFindFirstArgs>(args?: SelectSubset<T, AuthRecordFindFirstArgs<ExtArgs>>): Prisma__AuthRecordClient<$Result.GetResult<Prisma.$AuthRecordPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first AuthRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthRecordFindFirstOrThrowArgs} args - Arguments to find a AuthRecord
     * @example
     * // Get one AuthRecord
     * const authRecord = await prisma.authRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthRecordClient<$Result.GetResult<Prisma.$AuthRecordPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more AuthRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthRecords
     * const authRecords = await prisma.authRecord.findMany()
     * 
     * // Get first 10 AuthRecords
     * const authRecords = await prisma.authRecord.findMany({ take: 10 })
     * 
     * // Only select the `hostId`
     * const authRecordWithHostIdOnly = await prisma.authRecord.findMany({ select: { hostId: true } })
     * 
     */
    findMany<T extends AuthRecordFindManyArgs>(args?: SelectSubset<T, AuthRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthRecordPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a AuthRecord.
     * @param {AuthRecordCreateArgs} args - Arguments to create a AuthRecord.
     * @example
     * // Create one AuthRecord
     * const AuthRecord = await prisma.authRecord.create({
     *   data: {
     *     // ... data to create a AuthRecord
     *   }
     * })
     * 
     */
    create<T extends AuthRecordCreateArgs>(args: SelectSubset<T, AuthRecordCreateArgs<ExtArgs>>): Prisma__AuthRecordClient<$Result.GetResult<Prisma.$AuthRecordPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many AuthRecords.
     * @param {AuthRecordCreateManyArgs} args - Arguments to create many AuthRecords.
     * @example
     * // Create many AuthRecords
     * const authRecord = await prisma.authRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthRecordCreateManyArgs>(args?: SelectSubset<T, AuthRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuthRecords and returns the data saved in the database.
     * @param {AuthRecordCreateManyAndReturnArgs} args - Arguments to create many AuthRecords.
     * @example
     * // Create many AuthRecords
     * const authRecord = await prisma.authRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuthRecords and only return the `hostId`
     * const authRecordWithHostIdOnly = await prisma.authRecord.createManyAndReturn({
     *   select: { hostId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthRecordPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a AuthRecord.
     * @param {AuthRecordDeleteArgs} args - Arguments to delete one AuthRecord.
     * @example
     * // Delete one AuthRecord
     * const AuthRecord = await prisma.authRecord.delete({
     *   where: {
     *     // ... filter to delete one AuthRecord
     *   }
     * })
     * 
     */
    delete<T extends AuthRecordDeleteArgs>(args: SelectSubset<T, AuthRecordDeleteArgs<ExtArgs>>): Prisma__AuthRecordClient<$Result.GetResult<Prisma.$AuthRecordPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one AuthRecord.
     * @param {AuthRecordUpdateArgs} args - Arguments to update one AuthRecord.
     * @example
     * // Update one AuthRecord
     * const authRecord = await prisma.authRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthRecordUpdateArgs>(args: SelectSubset<T, AuthRecordUpdateArgs<ExtArgs>>): Prisma__AuthRecordClient<$Result.GetResult<Prisma.$AuthRecordPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more AuthRecords.
     * @param {AuthRecordDeleteManyArgs} args - Arguments to filter AuthRecords to delete.
     * @example
     * // Delete a few AuthRecords
     * const { count } = await prisma.authRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthRecordDeleteManyArgs>(args?: SelectSubset<T, AuthRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthRecords
     * const authRecord = await prisma.authRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthRecordUpdateManyArgs>(args: SelectSubset<T, AuthRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthRecords and returns the data updated in the database.
     * @param {AuthRecordUpdateManyAndReturnArgs} args - Arguments to update many AuthRecords.
     * @example
     * // Update many AuthRecords
     * const authRecord = await prisma.authRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuthRecords and only return the `hostId`
     * const authRecordWithHostIdOnly = await prisma.authRecord.updateManyAndReturn({
     *   select: { hostId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuthRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthRecordPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one AuthRecord.
     * @param {AuthRecordUpsertArgs} args - Arguments to update or create a AuthRecord.
     * @example
     * // Update or create a AuthRecord
     * const authRecord = await prisma.authRecord.upsert({
     *   create: {
     *     // ... data to create a AuthRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthRecord we want to update
     *   }
     * })
     */
    upsert<T extends AuthRecordUpsertArgs>(args: SelectSubset<T, AuthRecordUpsertArgs<ExtArgs>>): Prisma__AuthRecordClient<$Result.GetResult<Prisma.$AuthRecordPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of AuthRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthRecordCountArgs} args - Arguments to filter AuthRecords to count.
     * @example
     * // Count the number of AuthRecords
     * const count = await prisma.authRecord.count({
     *   where: {
     *     // ... the filter for the AuthRecords we want to count
     *   }
     * })
    **/
    count<T extends AuthRecordCountArgs>(
      args?: Subset<T, AuthRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthRecordAggregateArgs>(args: Subset<T, AuthRecordAggregateArgs>): Prisma.PrismaPromise<GetAuthRecordAggregateType<T>>

    /**
     * Group by AuthRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthRecordGroupByArgs['orderBy'] }
        : { orderBy?: AuthRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthRecord model
   */
  readonly fields: AuthRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    host<T extends HostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HostDefaultArgs<ExtArgs>>): Prisma__HostClient<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuthRecord model
   */ 
  interface AuthRecordFieldRefs {
    readonly hostId: FieldRef<"AuthRecord", 'String'>
    readonly email: FieldRef<"AuthRecord", 'String'>
    readonly passwordHash: FieldRef<"AuthRecord", 'String'>
    readonly salt: FieldRef<"AuthRecord", 'String'>
    readonly role: FieldRef<"AuthRecord", 'String'>
    readonly emailVerified: FieldRef<"AuthRecord", 'Boolean'>
    readonly verifyToken: FieldRef<"AuthRecord", 'String'>
    readonly resetToken: FieldRef<"AuthRecord", 'String'>
    readonly resetTokenExpires: FieldRef<"AuthRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthRecord findUnique
   */
  export type AuthRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthRecord
     */
    select?: AuthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthRecord
     */
    omit?: AuthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthRecordInclude<ExtArgs> | null
    /**
     * Filter, which AuthRecord to fetch.
     */
    where: AuthRecordWhereUniqueInput
  }

  /**
   * AuthRecord findUniqueOrThrow
   */
  export type AuthRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthRecord
     */
    select?: AuthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthRecord
     */
    omit?: AuthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthRecordInclude<ExtArgs> | null
    /**
     * Filter, which AuthRecord to fetch.
     */
    where: AuthRecordWhereUniqueInput
  }

  /**
   * AuthRecord findFirst
   */
  export type AuthRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthRecord
     */
    select?: AuthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthRecord
     */
    omit?: AuthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthRecordInclude<ExtArgs> | null
    /**
     * Filter, which AuthRecord to fetch.
     */
    where?: AuthRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthRecords to fetch.
     */
    orderBy?: AuthRecordOrderByWithRelationInput | AuthRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthRecords.
     */
    cursor?: AuthRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthRecords.
     */
    distinct?: AuthRecordScalarFieldEnum | AuthRecordScalarFieldEnum[]
  }

  /**
   * AuthRecord findFirstOrThrow
   */
  export type AuthRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthRecord
     */
    select?: AuthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthRecord
     */
    omit?: AuthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthRecordInclude<ExtArgs> | null
    /**
     * Filter, which AuthRecord to fetch.
     */
    where?: AuthRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthRecords to fetch.
     */
    orderBy?: AuthRecordOrderByWithRelationInput | AuthRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthRecords.
     */
    cursor?: AuthRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthRecords.
     */
    distinct?: AuthRecordScalarFieldEnum | AuthRecordScalarFieldEnum[]
  }

  /**
   * AuthRecord findMany
   */
  export type AuthRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthRecord
     */
    select?: AuthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthRecord
     */
    omit?: AuthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthRecordInclude<ExtArgs> | null
    /**
     * Filter, which AuthRecords to fetch.
     */
    where?: AuthRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthRecords to fetch.
     */
    orderBy?: AuthRecordOrderByWithRelationInput | AuthRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthRecords.
     */
    cursor?: AuthRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthRecords.
     */
    skip?: number
    distinct?: AuthRecordScalarFieldEnum | AuthRecordScalarFieldEnum[]
  }

  /**
   * AuthRecord create
   */
  export type AuthRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthRecord
     */
    select?: AuthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthRecord
     */
    omit?: AuthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a AuthRecord.
     */
    data: XOR<AuthRecordCreateInput, AuthRecordUncheckedCreateInput>
  }

  /**
   * AuthRecord createMany
   */
  export type AuthRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthRecords.
     */
    data: AuthRecordCreateManyInput | AuthRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthRecord createManyAndReturn
   */
  export type AuthRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthRecord
     */
    select?: AuthRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthRecord
     */
    omit?: AuthRecordOmit<ExtArgs> | null
    /**
     * The data used to create many AuthRecords.
     */
    data: AuthRecordCreateManyInput | AuthRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthRecord update
   */
  export type AuthRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthRecord
     */
    select?: AuthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthRecord
     */
    omit?: AuthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a AuthRecord.
     */
    data: XOR<AuthRecordUpdateInput, AuthRecordUncheckedUpdateInput>
    /**
     * Choose, which AuthRecord to update.
     */
    where: AuthRecordWhereUniqueInput
  }

  /**
   * AuthRecord updateMany
   */
  export type AuthRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthRecords.
     */
    data: XOR<AuthRecordUpdateManyMutationInput, AuthRecordUncheckedUpdateManyInput>
    /**
     * Filter which AuthRecords to update
     */
    where?: AuthRecordWhereInput
    /**
     * Limit how many AuthRecords to update.
     */
    limit?: number
  }

  /**
   * AuthRecord updateManyAndReturn
   */
  export type AuthRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthRecord
     */
    select?: AuthRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthRecord
     */
    omit?: AuthRecordOmit<ExtArgs> | null
    /**
     * The data used to update AuthRecords.
     */
    data: XOR<AuthRecordUpdateManyMutationInput, AuthRecordUncheckedUpdateManyInput>
    /**
     * Filter which AuthRecords to update
     */
    where?: AuthRecordWhereInput
    /**
     * Limit how many AuthRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthRecord upsert
   */
  export type AuthRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthRecord
     */
    select?: AuthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthRecord
     */
    omit?: AuthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the AuthRecord to update in case it exists.
     */
    where: AuthRecordWhereUniqueInput
    /**
     * In case the AuthRecord found by the `where` argument doesn't exist, create a new AuthRecord with this data.
     */
    create: XOR<AuthRecordCreateInput, AuthRecordUncheckedCreateInput>
    /**
     * In case the AuthRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthRecordUpdateInput, AuthRecordUncheckedUpdateInput>
  }

  /**
   * AuthRecord delete
   */
  export type AuthRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthRecord
     */
    select?: AuthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthRecord
     */
    omit?: AuthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthRecordInclude<ExtArgs> | null
    /**
     * Filter which AuthRecord to delete.
     */
    where: AuthRecordWhereUniqueInput
  }

  /**
   * AuthRecord deleteMany
   */
  export type AuthRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthRecords to delete
     */
    where?: AuthRecordWhereInput
    /**
     * Limit how many AuthRecords to delete.
     */
    limit?: number
  }

  /**
   * AuthRecord without action
   */
  export type AuthRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthRecord
     */
    select?: AuthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthRecord
     */
    omit?: AuthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthRecordInclude<ExtArgs> | null
  }


  /**
   * Model Property
   */

  export type AggregateProperty = {
    _count: PropertyCountAggregateOutputType | null
    _avg: PropertyAvgAggregateOutputType | null
    _sum: PropertySumAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  export type PropertyAvgAggregateOutputType = {
    basePrice: number | null
  }

  export type PropertySumAggregateOutputType = {
    basePrice: number | null
  }

  export type PropertyMinAggregateOutputType = {
    id: string | null
    hostId: string | null
    name: string | null
    description: string | null
    imageUrl: string | null
    airbnbUrl: string | null
    basePrice: number | null
    status: string | null
    address: string | null
    icalUrl: string | null
    caretakerToken: string | null
    caretakerPhone: string | null
    caretakerName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PropertyMaxAggregateOutputType = {
    id: string | null
    hostId: string | null
    name: string | null
    description: string | null
    imageUrl: string | null
    airbnbUrl: string | null
    basePrice: number | null
    status: string | null
    address: string | null
    icalUrl: string | null
    caretakerToken: string | null
    caretakerPhone: string | null
    caretakerName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PropertyCountAggregateOutputType = {
    id: number
    hostId: number
    name: number
    description: number
    imageUrl: number
    airbnbUrl: number
    basePrice: number
    status: number
    address: number
    amenities: number
    icalUrl: number
    caretakerToken: number
    caretakerPhone: number
    caretakerName: number
    pricingSettings: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PropertyAvgAggregateInputType = {
    basePrice?: true
  }

  export type PropertySumAggregateInputType = {
    basePrice?: true
  }

  export type PropertyMinAggregateInputType = {
    id?: true
    hostId?: true
    name?: true
    description?: true
    imageUrl?: true
    airbnbUrl?: true
    basePrice?: true
    status?: true
    address?: true
    icalUrl?: true
    caretakerToken?: true
    caretakerPhone?: true
    caretakerName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PropertyMaxAggregateInputType = {
    id?: true
    hostId?: true
    name?: true
    description?: true
    imageUrl?: true
    airbnbUrl?: true
    basePrice?: true
    status?: true
    address?: true
    icalUrl?: true
    caretakerToken?: true
    caretakerPhone?: true
    caretakerName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PropertyCountAggregateInputType = {
    id?: true
    hostId?: true
    name?: true
    description?: true
    imageUrl?: true
    airbnbUrl?: true
    basePrice?: true
    status?: true
    address?: true
    amenities?: true
    icalUrl?: true
    caretakerToken?: true
    caretakerPhone?: true
    caretakerName?: true
    pricingSettings?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PropertyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Property to aggregate.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Properties
    **/
    _count?: true | PropertyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyMaxAggregateInputType
  }

  export type GetPropertyAggregateType<T extends PropertyAggregateArgs> = {
        [P in keyof T & keyof AggregateProperty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProperty[P]>
      : GetScalarType<T[P], AggregateProperty[P]>
  }




  export type PropertyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput
    orderBy?: PropertyOrderByWithAggregationInput | PropertyOrderByWithAggregationInput[]
    by: PropertyScalarFieldEnum[] | PropertyScalarFieldEnum
    having?: PropertyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyCountAggregateInputType | true
    _avg?: PropertyAvgAggregateInputType
    _sum?: PropertySumAggregateInputType
    _min?: PropertyMinAggregateInputType
    _max?: PropertyMaxAggregateInputType
  }

  export type PropertyGroupByOutputType = {
    id: string
    hostId: string
    name: string
    description: string
    imageUrl: string
    airbnbUrl: string | null
    basePrice: number
    status: string
    address: string | null
    amenities: string[]
    icalUrl: string | null
    caretakerToken: string | null
    caretakerPhone: string | null
    caretakerName: string | null
    pricingSettings: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: PropertyCountAggregateOutputType | null
    _avg: PropertyAvgAggregateOutputType | null
    _sum: PropertySumAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  type GetPropertyGroupByPayload<T extends PropertyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyGroupByOutputType[P]>
        }
      >
    >


  export type PropertySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hostId?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    airbnbUrl?: boolean
    basePrice?: boolean
    status?: boolean
    address?: boolean
    amenities?: boolean
    icalUrl?: boolean
    caretakerToken?: boolean
    caretakerPhone?: boolean
    caretakerName?: boolean
    pricingSettings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    host?: boolean | HostDefaultArgs<ExtArgs>
    bookings?: boolean | Property$bookingsArgs<ExtArgs>
    blocks?: boolean | Property$blocksArgs<ExtArgs>
    reviews?: boolean | Property$reviewsArgs<ExtArgs>
    knowledge?: boolean | Property$knowledgeArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property"]>

  export type PropertySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hostId?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    airbnbUrl?: boolean
    basePrice?: boolean
    status?: boolean
    address?: boolean
    amenities?: boolean
    icalUrl?: boolean
    caretakerToken?: boolean
    caretakerPhone?: boolean
    caretakerName?: boolean
    pricingSettings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    host?: boolean | HostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property"]>

  export type PropertySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hostId?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    airbnbUrl?: boolean
    basePrice?: boolean
    status?: boolean
    address?: boolean
    amenities?: boolean
    icalUrl?: boolean
    caretakerToken?: boolean
    caretakerPhone?: boolean
    caretakerName?: boolean
    pricingSettings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    host?: boolean | HostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property"]>

  export type PropertySelectScalar = {
    id?: boolean
    hostId?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    airbnbUrl?: boolean
    basePrice?: boolean
    status?: boolean
    address?: boolean
    amenities?: boolean
    icalUrl?: boolean
    caretakerToken?: boolean
    caretakerPhone?: boolean
    caretakerName?: boolean
    pricingSettings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PropertyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hostId" | "name" | "description" | "imageUrl" | "airbnbUrl" | "basePrice" | "status" | "address" | "amenities" | "icalUrl" | "caretakerToken" | "caretakerPhone" | "caretakerName" | "pricingSettings" | "createdAt" | "updatedAt", ExtArgs["result"]["property"]>
  export type PropertyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | HostDefaultArgs<ExtArgs>
    bookings?: boolean | Property$bookingsArgs<ExtArgs>
    blocks?: boolean | Property$blocksArgs<ExtArgs>
    reviews?: boolean | Property$reviewsArgs<ExtArgs>
    knowledge?: boolean | Property$knowledgeArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PropertyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | HostDefaultArgs<ExtArgs>
  }
  export type PropertyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | HostDefaultArgs<ExtArgs>
  }

  export type $PropertyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Property"
    objects: {
      host: Prisma.$HostPayload<ExtArgs>
      bookings: Prisma.$BookingPayload<ExtArgs>[]
      blocks: Prisma.$CalendarBlockPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      knowledge: Prisma.$HostKnowledgePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      hostId: string
      name: string
      description: string
      imageUrl: string
      airbnbUrl: string | null
      basePrice: number
      status: string
      address: string | null
      amenities: string[]
      icalUrl: string | null
      caretakerToken: string | null
      caretakerPhone: string | null
      caretakerName: string | null
      pricingSettings: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["property"]>
    composites: {}
  }

  type PropertyGetPayload<S extends boolean | null | undefined | PropertyDefaultArgs> = $Result.GetResult<Prisma.$PropertyPayload, S>

  type PropertyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PropertyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropertyCountAggregateInputType | true
    }

  export interface PropertyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Property'], meta: { name: 'Property' } }
    /**
     * Find zero or one Property that matches the filter.
     * @param {PropertyFindUniqueArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyFindUniqueArgs>(args: SelectSubset<T, PropertyFindUniqueArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Property that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PropertyFindUniqueOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Property that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyFindFirstArgs>(args?: SelectSubset<T, PropertyFindFirstArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Property that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Properties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Properties
     * const properties = await prisma.property.findMany()
     * 
     * // Get first 10 Properties
     * const properties = await prisma.property.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyWithIdOnly = await prisma.property.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyFindManyArgs>(args?: SelectSubset<T, PropertyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Property.
     * @param {PropertyCreateArgs} args - Arguments to create a Property.
     * @example
     * // Create one Property
     * const Property = await prisma.property.create({
     *   data: {
     *     // ... data to create a Property
     *   }
     * })
     * 
     */
    create<T extends PropertyCreateArgs>(args: SelectSubset<T, PropertyCreateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Properties.
     * @param {PropertyCreateManyArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyCreateManyArgs>(args?: SelectSubset<T, PropertyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Properties and returns the data saved in the database.
     * @param {PropertyCreateManyAndReturnArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Properties and only return the `id`
     * const propertyWithIdOnly = await prisma.property.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Property.
     * @param {PropertyDeleteArgs} args - Arguments to delete one Property.
     * @example
     * // Delete one Property
     * const Property = await prisma.property.delete({
     *   where: {
     *     // ... filter to delete one Property
     *   }
     * })
     * 
     */
    delete<T extends PropertyDeleteArgs>(args: SelectSubset<T, PropertyDeleteArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Property.
     * @param {PropertyUpdateArgs} args - Arguments to update one Property.
     * @example
     * // Update one Property
     * const property = await prisma.property.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyUpdateArgs>(args: SelectSubset<T, PropertyUpdateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Properties.
     * @param {PropertyDeleteManyArgs} args - Arguments to filter Properties to delete.
     * @example
     * // Delete a few Properties
     * const { count } = await prisma.property.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyDeleteManyArgs>(args?: SelectSubset<T, PropertyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Properties
     * const property = await prisma.property.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyUpdateManyArgs>(args: SelectSubset<T, PropertyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Properties and returns the data updated in the database.
     * @param {PropertyUpdateManyAndReturnArgs} args - Arguments to update many Properties.
     * @example
     * // Update many Properties
     * const property = await prisma.property.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Properties and only return the `id`
     * const propertyWithIdOnly = await prisma.property.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PropertyUpdateManyAndReturnArgs>(args: SelectSubset<T, PropertyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Property.
     * @param {PropertyUpsertArgs} args - Arguments to update or create a Property.
     * @example
     * // Update or create a Property
     * const property = await prisma.property.upsert({
     *   create: {
     *     // ... data to create a Property
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Property we want to update
     *   }
     * })
     */
    upsert<T extends PropertyUpsertArgs>(args: SelectSubset<T, PropertyUpsertArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyCountArgs} args - Arguments to filter Properties to count.
     * @example
     * // Count the number of Properties
     * const count = await prisma.property.count({
     *   where: {
     *     // ... the filter for the Properties we want to count
     *   }
     * })
    **/
    count<T extends PropertyCountArgs>(
      args?: Subset<T, PropertyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PropertyAggregateArgs>(args: Subset<T, PropertyAggregateArgs>): Prisma.PrismaPromise<GetPropertyAggregateType<T>>

    /**
     * Group by Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PropertyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyGroupByArgs['orderBy'] }
        : { orderBy?: PropertyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PropertyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Property model
   */
  readonly fields: PropertyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Property.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    host<T extends HostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HostDefaultArgs<ExtArgs>>): Prisma__HostClient<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    bookings<T extends Property$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Property$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    blocks<T extends Property$blocksArgs<ExtArgs> = {}>(args?: Subset<T, Property$blocksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarBlockPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    reviews<T extends Property$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Property$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    knowledge<T extends Property$knowledgeArgs<ExtArgs> = {}>(args?: Subset<T, Property$knowledgeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HostKnowledgePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Property model
   */ 
  interface PropertyFieldRefs {
    readonly id: FieldRef<"Property", 'String'>
    readonly hostId: FieldRef<"Property", 'String'>
    readonly name: FieldRef<"Property", 'String'>
    readonly description: FieldRef<"Property", 'String'>
    readonly imageUrl: FieldRef<"Property", 'String'>
    readonly airbnbUrl: FieldRef<"Property", 'String'>
    readonly basePrice: FieldRef<"Property", 'Float'>
    readonly status: FieldRef<"Property", 'String'>
    readonly address: FieldRef<"Property", 'String'>
    readonly amenities: FieldRef<"Property", 'String[]'>
    readonly icalUrl: FieldRef<"Property", 'String'>
    readonly caretakerToken: FieldRef<"Property", 'String'>
    readonly caretakerPhone: FieldRef<"Property", 'String'>
    readonly caretakerName: FieldRef<"Property", 'String'>
    readonly pricingSettings: FieldRef<"Property", 'Json'>
    readonly createdAt: FieldRef<"Property", 'DateTime'>
    readonly updatedAt: FieldRef<"Property", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Property findUnique
   */
  export type PropertyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findUniqueOrThrow
   */
  export type PropertyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findFirst
   */
  export type PropertyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findFirstOrThrow
   */
  export type PropertyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findMany
   */
  export type PropertyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Properties to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property create
   */
  export type PropertyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to create a Property.
     */
    data: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
  }

  /**
   * Property createMany
   */
  export type PropertyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Property createManyAndReturn
   */
  export type PropertyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Property update
   */
  export type PropertyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to update a Property.
     */
    data: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
    /**
     * Choose, which Property to update.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property updateMany
   */
  export type PropertyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Properties.
     */
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyInput>
    /**
     * Filter which Properties to update
     */
    where?: PropertyWhereInput
    /**
     * Limit how many Properties to update.
     */
    limit?: number
  }

  /**
   * Property updateManyAndReturn
   */
  export type PropertyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * The data used to update Properties.
     */
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyInput>
    /**
     * Filter which Properties to update
     */
    where?: PropertyWhereInput
    /**
     * Limit how many Properties to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Property upsert
   */
  export type PropertyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The filter to search for the Property to update in case it exists.
     */
    where: PropertyWhereUniqueInput
    /**
     * In case the Property found by the `where` argument doesn't exist, create a new Property with this data.
     */
    create: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
    /**
     * In case the Property was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
  }

  /**
   * Property delete
   */
  export type PropertyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter which Property to delete.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property deleteMany
   */
  export type PropertyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Properties to delete
     */
    where?: PropertyWhereInput
    /**
     * Limit how many Properties to delete.
     */
    limit?: number
  }

  /**
   * Property.bookings
   */
  export type Property$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Property.blocks
   */
  export type Property$blocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarBlock
     */
    select?: CalendarBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarBlock
     */
    omit?: CalendarBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarBlockInclude<ExtArgs> | null
    where?: CalendarBlockWhereInput
    orderBy?: CalendarBlockOrderByWithRelationInput | CalendarBlockOrderByWithRelationInput[]
    cursor?: CalendarBlockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CalendarBlockScalarFieldEnum | CalendarBlockScalarFieldEnum[]
  }

  /**
   * Property.reviews
   */
  export type Property$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Property.knowledge
   */
  export type Property$knowledgeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HostKnowledge
     */
    select?: HostKnowledgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HostKnowledge
     */
    omit?: HostKnowledgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostKnowledgeInclude<ExtArgs> | null
    where?: HostKnowledgeWhereInput
    orderBy?: HostKnowledgeOrderByWithRelationInput | HostKnowledgeOrderByWithRelationInput[]
    cursor?: HostKnowledgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HostKnowledgeScalarFieldEnum | HostKnowledgeScalarFieldEnum[]
  }

  /**
   * Property without action
   */
  export type PropertyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
  }


  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingAvgAggregateOutputType = {
    nights: number | null
    amount: number | null
  }

  export type BookingSumAggregateOutputType = {
    nights: number | null
    amount: number | null
  }

  export type BookingMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    hostId: string | null
    guestName: string | null
    guestEmail: string | null
    guestPhone: string | null
    guestIdRef: string | null
    checkIn: Date | null
    checkOut: Date | null
    nights: number | null
    amount: number | null
    status: string | null
    gatewayOrderId: string | null
    paymentSessionId: string | null
    idVerified: boolean | null
    caretakerPhone: string | null
    caretakerName: string | null
    cleanProofUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    hostId: string | null
    guestName: string | null
    guestEmail: string | null
    guestPhone: string | null
    guestIdRef: string | null
    checkIn: Date | null
    checkOut: Date | null
    nights: number | null
    amount: number | null
    status: string | null
    gatewayOrderId: string | null
    paymentSessionId: string | null
    idVerified: boolean | null
    caretakerPhone: string | null
    caretakerName: string | null
    cleanProofUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    propertyId: number
    hostId: number
    guestName: number
    guestEmail: number
    guestPhone: number
    guestIdRef: number
    checkIn: number
    checkOut: number
    nights: number
    amount: number
    status: number
    gatewayOrderId: number
    paymentSessionId: number
    idVerified: number
    caretakerPhone: number
    caretakerName: number
    checkoutChecklist: number
    cleanProofUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookingAvgAggregateInputType = {
    nights?: true
    amount?: true
  }

  export type BookingSumAggregateInputType = {
    nights?: true
    amount?: true
  }

  export type BookingMinAggregateInputType = {
    id?: true
    propertyId?: true
    hostId?: true
    guestName?: true
    guestEmail?: true
    guestPhone?: true
    guestIdRef?: true
    checkIn?: true
    checkOut?: true
    nights?: true
    amount?: true
    status?: true
    gatewayOrderId?: true
    paymentSessionId?: true
    idVerified?: true
    caretakerPhone?: true
    caretakerName?: true
    cleanProofUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    propertyId?: true
    hostId?: true
    guestName?: true
    guestEmail?: true
    guestPhone?: true
    guestIdRef?: true
    checkIn?: true
    checkOut?: true
    nights?: true
    amount?: true
    status?: true
    gatewayOrderId?: true
    paymentSessionId?: true
    idVerified?: true
    caretakerPhone?: true
    caretakerName?: true
    cleanProofUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    propertyId?: true
    hostId?: true
    guestName?: true
    guestEmail?: true
    guestPhone?: true
    guestIdRef?: true
    checkIn?: true
    checkOut?: true
    nights?: true
    amount?: true
    status?: true
    gatewayOrderId?: true
    paymentSessionId?: true
    idVerified?: true
    caretakerPhone?: true
    caretakerName?: true
    checkoutChecklist?: true
    cleanProofUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _avg?: BookingAvgAggregateInputType
    _sum?: BookingSumAggregateInputType
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: string
    propertyId: string
    hostId: string
    guestName: string
    guestEmail: string
    guestPhone: string | null
    guestIdRef: string | null
    checkIn: Date
    checkOut: Date
    nights: number
    amount: number
    status: string
    gatewayOrderId: string | null
    paymentSessionId: string | null
    idVerified: boolean
    caretakerPhone: string | null
    caretakerName: string | null
    checkoutChecklist: JsonValue | null
    cleanProofUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    hostId?: boolean
    guestName?: boolean
    guestEmail?: boolean
    guestPhone?: boolean
    guestIdRef?: boolean
    checkIn?: boolean
    checkOut?: boolean
    nights?: boolean
    amount?: boolean
    status?: boolean
    gatewayOrderId?: boolean
    paymentSessionId?: boolean
    idVerified?: boolean
    caretakerPhone?: boolean
    caretakerName?: boolean
    checkoutChecklist?: boolean
    cleanProofUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    host?: boolean | HostDefaultArgs<ExtArgs>
    ledgerEntries?: boolean | Booking$ledgerEntriesArgs<ExtArgs>
    verification?: boolean | Booking$verificationArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    hostId?: boolean
    guestName?: boolean
    guestEmail?: boolean
    guestPhone?: boolean
    guestIdRef?: boolean
    checkIn?: boolean
    checkOut?: boolean
    nights?: boolean
    amount?: boolean
    status?: boolean
    gatewayOrderId?: boolean
    paymentSessionId?: boolean
    idVerified?: boolean
    caretakerPhone?: boolean
    caretakerName?: boolean
    checkoutChecklist?: boolean
    cleanProofUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    host?: boolean | HostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    hostId?: boolean
    guestName?: boolean
    guestEmail?: boolean
    guestPhone?: boolean
    guestIdRef?: boolean
    checkIn?: boolean
    checkOut?: boolean
    nights?: boolean
    amount?: boolean
    status?: boolean
    gatewayOrderId?: boolean
    paymentSessionId?: boolean
    idVerified?: boolean
    caretakerPhone?: boolean
    caretakerName?: boolean
    checkoutChecklist?: boolean
    cleanProofUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    host?: boolean | HostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    propertyId?: boolean
    hostId?: boolean
    guestName?: boolean
    guestEmail?: boolean
    guestPhone?: boolean
    guestIdRef?: boolean
    checkIn?: boolean
    checkOut?: boolean
    nights?: boolean
    amount?: boolean
    status?: boolean
    gatewayOrderId?: boolean
    paymentSessionId?: boolean
    idVerified?: boolean
    caretakerPhone?: boolean
    caretakerName?: boolean
    checkoutChecklist?: boolean
    cleanProofUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "propertyId" | "hostId" | "guestName" | "guestEmail" | "guestPhone" | "guestIdRef" | "checkIn" | "checkOut" | "nights" | "amount" | "status" | "gatewayOrderId" | "paymentSessionId" | "idVerified" | "caretakerPhone" | "caretakerName" | "checkoutChecklist" | "cleanProofUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["booking"]>
  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    host?: boolean | HostDefaultArgs<ExtArgs>
    ledgerEntries?: boolean | Booking$ledgerEntriesArgs<ExtArgs>
    verification?: boolean | Booking$verificationArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    host?: boolean | HostDefaultArgs<ExtArgs>
  }
  export type BookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    host?: boolean | HostDefaultArgs<ExtArgs>
  }

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
      host: Prisma.$HostPayload<ExtArgs>
      ledgerEntries: Prisma.$LedgerEntryPayload<ExtArgs>[]
      verification: Prisma.$GuestVerificationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      hostId: string
      guestName: string
      guestEmail: string
      guestPhone: string | null
      guestIdRef: string | null
      checkIn: Date
      checkOut: Date
      nights: number
      amount: number
      status: string
      gatewayOrderId: string | null
      paymentSessionId: string | null
      idVerified: boolean
      caretakerPhone: string | null
      caretakerName: string | null
      checkoutChecklist: Prisma.JsonValue | null
      cleanProofUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings and returns the data updated in the database.
     * @param {BookingUpdateManyAndReturnArgs} args - Arguments to update many Bookings.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookingUpdateManyAndReturnArgs>(args: SelectSubset<T, BookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    host<T extends HostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HostDefaultArgs<ExtArgs>>): Prisma__HostClient<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    ledgerEntries<T extends Booking$ledgerEntriesArgs<ExtArgs> = {}>(args?: Subset<T, Booking$ledgerEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    verification<T extends Booking$verificationArgs<ExtArgs> = {}>(args?: Subset<T, Booking$verificationArgs<ExtArgs>>): Prisma__GuestVerificationClient<$Result.GetResult<Prisma.$GuestVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Booking model
   */ 
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'String'>
    readonly propertyId: FieldRef<"Booking", 'String'>
    readonly hostId: FieldRef<"Booking", 'String'>
    readonly guestName: FieldRef<"Booking", 'String'>
    readonly guestEmail: FieldRef<"Booking", 'String'>
    readonly guestPhone: FieldRef<"Booking", 'String'>
    readonly guestIdRef: FieldRef<"Booking", 'String'>
    readonly checkIn: FieldRef<"Booking", 'DateTime'>
    readonly checkOut: FieldRef<"Booking", 'DateTime'>
    readonly nights: FieldRef<"Booking", 'Int'>
    readonly amount: FieldRef<"Booking", 'Float'>
    readonly status: FieldRef<"Booking", 'String'>
    readonly gatewayOrderId: FieldRef<"Booking", 'String'>
    readonly paymentSessionId: FieldRef<"Booking", 'String'>
    readonly idVerified: FieldRef<"Booking", 'Boolean'>
    readonly caretakerPhone: FieldRef<"Booking", 'String'>
    readonly caretakerName: FieldRef<"Booking", 'String'>
    readonly checkoutChecklist: FieldRef<"Booking", 'Json'>
    readonly cleanProofUrl: FieldRef<"Booking", 'String'>
    readonly createdAt: FieldRef<"Booking", 'DateTime'>
    readonly updatedAt: FieldRef<"Booking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking createManyAndReturn
   */
  export type BookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Booking updateManyAndReturn
   */
  export type BookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to delete.
     */
    limit?: number
  }

  /**
   * Booking.ledgerEntries
   */
  export type Booking$ledgerEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    where?: LedgerEntryWhereInput
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    cursor?: LedgerEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LedgerEntryScalarFieldEnum | LedgerEntryScalarFieldEnum[]
  }

  /**
   * Booking.verification
   */
  export type Booking$verificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestVerification
     */
    select?: GuestVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestVerification
     */
    omit?: GuestVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestVerificationInclude<ExtArgs> | null
    where?: GuestVerificationWhereInput
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
  }


  /**
   * Model CalendarBlock
   */

  export type AggregateCalendarBlock = {
    _count: CalendarBlockCountAggregateOutputType | null
    _min: CalendarBlockMinAggregateOutputType | null
    _max: CalendarBlockMaxAggregateOutputType | null
  }

  export type CalendarBlockMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    date: Date | null
    reason: string | null
    bookingId: string | null
  }

  export type CalendarBlockMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    date: Date | null
    reason: string | null
    bookingId: string | null
  }

  export type CalendarBlockCountAggregateOutputType = {
    id: number
    propertyId: number
    date: number
    reason: number
    bookingId: number
    _all: number
  }


  export type CalendarBlockMinAggregateInputType = {
    id?: true
    propertyId?: true
    date?: true
    reason?: true
    bookingId?: true
  }

  export type CalendarBlockMaxAggregateInputType = {
    id?: true
    propertyId?: true
    date?: true
    reason?: true
    bookingId?: true
  }

  export type CalendarBlockCountAggregateInputType = {
    id?: true
    propertyId?: true
    date?: true
    reason?: true
    bookingId?: true
    _all?: true
  }

  export type CalendarBlockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CalendarBlock to aggregate.
     */
    where?: CalendarBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CalendarBlocks to fetch.
     */
    orderBy?: CalendarBlockOrderByWithRelationInput | CalendarBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CalendarBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CalendarBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CalendarBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CalendarBlocks
    **/
    _count?: true | CalendarBlockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CalendarBlockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CalendarBlockMaxAggregateInputType
  }

  export type GetCalendarBlockAggregateType<T extends CalendarBlockAggregateArgs> = {
        [P in keyof T & keyof AggregateCalendarBlock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCalendarBlock[P]>
      : GetScalarType<T[P], AggregateCalendarBlock[P]>
  }




  export type CalendarBlockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CalendarBlockWhereInput
    orderBy?: CalendarBlockOrderByWithAggregationInput | CalendarBlockOrderByWithAggregationInput[]
    by: CalendarBlockScalarFieldEnum[] | CalendarBlockScalarFieldEnum
    having?: CalendarBlockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CalendarBlockCountAggregateInputType | true
    _min?: CalendarBlockMinAggregateInputType
    _max?: CalendarBlockMaxAggregateInputType
  }

  export type CalendarBlockGroupByOutputType = {
    id: string
    propertyId: string
    date: Date
    reason: string
    bookingId: string | null
    _count: CalendarBlockCountAggregateOutputType | null
    _min: CalendarBlockMinAggregateOutputType | null
    _max: CalendarBlockMaxAggregateOutputType | null
  }

  type GetCalendarBlockGroupByPayload<T extends CalendarBlockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CalendarBlockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CalendarBlockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CalendarBlockGroupByOutputType[P]>
            : GetScalarType<T[P], CalendarBlockGroupByOutputType[P]>
        }
      >
    >


  export type CalendarBlockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    date?: boolean
    reason?: boolean
    bookingId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calendarBlock"]>

  export type CalendarBlockSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    date?: boolean
    reason?: boolean
    bookingId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calendarBlock"]>

  export type CalendarBlockSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    date?: boolean
    reason?: boolean
    bookingId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calendarBlock"]>

  export type CalendarBlockSelectScalar = {
    id?: boolean
    propertyId?: boolean
    date?: boolean
    reason?: boolean
    bookingId?: boolean
  }

  export type CalendarBlockOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "propertyId" | "date" | "reason" | "bookingId", ExtArgs["result"]["calendarBlock"]>
  export type CalendarBlockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type CalendarBlockIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type CalendarBlockIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $CalendarBlockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CalendarBlock"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      date: Date
      reason: string
      bookingId: string | null
    }, ExtArgs["result"]["calendarBlock"]>
    composites: {}
  }

  type CalendarBlockGetPayload<S extends boolean | null | undefined | CalendarBlockDefaultArgs> = $Result.GetResult<Prisma.$CalendarBlockPayload, S>

  type CalendarBlockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CalendarBlockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CalendarBlockCountAggregateInputType | true
    }

  export interface CalendarBlockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CalendarBlock'], meta: { name: 'CalendarBlock' } }
    /**
     * Find zero or one CalendarBlock that matches the filter.
     * @param {CalendarBlockFindUniqueArgs} args - Arguments to find a CalendarBlock
     * @example
     * // Get one CalendarBlock
     * const calendarBlock = await prisma.calendarBlock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CalendarBlockFindUniqueArgs>(args: SelectSubset<T, CalendarBlockFindUniqueArgs<ExtArgs>>): Prisma__CalendarBlockClient<$Result.GetResult<Prisma.$CalendarBlockPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one CalendarBlock that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CalendarBlockFindUniqueOrThrowArgs} args - Arguments to find a CalendarBlock
     * @example
     * // Get one CalendarBlock
     * const calendarBlock = await prisma.calendarBlock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CalendarBlockFindUniqueOrThrowArgs>(args: SelectSubset<T, CalendarBlockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CalendarBlockClient<$Result.GetResult<Prisma.$CalendarBlockPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first CalendarBlock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarBlockFindFirstArgs} args - Arguments to find a CalendarBlock
     * @example
     * // Get one CalendarBlock
     * const calendarBlock = await prisma.calendarBlock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CalendarBlockFindFirstArgs>(args?: SelectSubset<T, CalendarBlockFindFirstArgs<ExtArgs>>): Prisma__CalendarBlockClient<$Result.GetResult<Prisma.$CalendarBlockPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first CalendarBlock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarBlockFindFirstOrThrowArgs} args - Arguments to find a CalendarBlock
     * @example
     * // Get one CalendarBlock
     * const calendarBlock = await prisma.calendarBlock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CalendarBlockFindFirstOrThrowArgs>(args?: SelectSubset<T, CalendarBlockFindFirstOrThrowArgs<ExtArgs>>): Prisma__CalendarBlockClient<$Result.GetResult<Prisma.$CalendarBlockPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more CalendarBlocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarBlockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CalendarBlocks
     * const calendarBlocks = await prisma.calendarBlock.findMany()
     * 
     * // Get first 10 CalendarBlocks
     * const calendarBlocks = await prisma.calendarBlock.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const calendarBlockWithIdOnly = await prisma.calendarBlock.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CalendarBlockFindManyArgs>(args?: SelectSubset<T, CalendarBlockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarBlockPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a CalendarBlock.
     * @param {CalendarBlockCreateArgs} args - Arguments to create a CalendarBlock.
     * @example
     * // Create one CalendarBlock
     * const CalendarBlock = await prisma.calendarBlock.create({
     *   data: {
     *     // ... data to create a CalendarBlock
     *   }
     * })
     * 
     */
    create<T extends CalendarBlockCreateArgs>(args: SelectSubset<T, CalendarBlockCreateArgs<ExtArgs>>): Prisma__CalendarBlockClient<$Result.GetResult<Prisma.$CalendarBlockPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many CalendarBlocks.
     * @param {CalendarBlockCreateManyArgs} args - Arguments to create many CalendarBlocks.
     * @example
     * // Create many CalendarBlocks
     * const calendarBlock = await prisma.calendarBlock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CalendarBlockCreateManyArgs>(args?: SelectSubset<T, CalendarBlockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CalendarBlocks and returns the data saved in the database.
     * @param {CalendarBlockCreateManyAndReturnArgs} args - Arguments to create many CalendarBlocks.
     * @example
     * // Create many CalendarBlocks
     * const calendarBlock = await prisma.calendarBlock.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CalendarBlocks and only return the `id`
     * const calendarBlockWithIdOnly = await prisma.calendarBlock.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CalendarBlockCreateManyAndReturnArgs>(args?: SelectSubset<T, CalendarBlockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarBlockPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a CalendarBlock.
     * @param {CalendarBlockDeleteArgs} args - Arguments to delete one CalendarBlock.
     * @example
     * // Delete one CalendarBlock
     * const CalendarBlock = await prisma.calendarBlock.delete({
     *   where: {
     *     // ... filter to delete one CalendarBlock
     *   }
     * })
     * 
     */
    delete<T extends CalendarBlockDeleteArgs>(args: SelectSubset<T, CalendarBlockDeleteArgs<ExtArgs>>): Prisma__CalendarBlockClient<$Result.GetResult<Prisma.$CalendarBlockPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one CalendarBlock.
     * @param {CalendarBlockUpdateArgs} args - Arguments to update one CalendarBlock.
     * @example
     * // Update one CalendarBlock
     * const calendarBlock = await prisma.calendarBlock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CalendarBlockUpdateArgs>(args: SelectSubset<T, CalendarBlockUpdateArgs<ExtArgs>>): Prisma__CalendarBlockClient<$Result.GetResult<Prisma.$CalendarBlockPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more CalendarBlocks.
     * @param {CalendarBlockDeleteManyArgs} args - Arguments to filter CalendarBlocks to delete.
     * @example
     * // Delete a few CalendarBlocks
     * const { count } = await prisma.calendarBlock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CalendarBlockDeleteManyArgs>(args?: SelectSubset<T, CalendarBlockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CalendarBlocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarBlockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CalendarBlocks
     * const calendarBlock = await prisma.calendarBlock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CalendarBlockUpdateManyArgs>(args: SelectSubset<T, CalendarBlockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CalendarBlocks and returns the data updated in the database.
     * @param {CalendarBlockUpdateManyAndReturnArgs} args - Arguments to update many CalendarBlocks.
     * @example
     * // Update many CalendarBlocks
     * const calendarBlock = await prisma.calendarBlock.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CalendarBlocks and only return the `id`
     * const calendarBlockWithIdOnly = await prisma.calendarBlock.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CalendarBlockUpdateManyAndReturnArgs>(args: SelectSubset<T, CalendarBlockUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarBlockPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one CalendarBlock.
     * @param {CalendarBlockUpsertArgs} args - Arguments to update or create a CalendarBlock.
     * @example
     * // Update or create a CalendarBlock
     * const calendarBlock = await prisma.calendarBlock.upsert({
     *   create: {
     *     // ... data to create a CalendarBlock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CalendarBlock we want to update
     *   }
     * })
     */
    upsert<T extends CalendarBlockUpsertArgs>(args: SelectSubset<T, CalendarBlockUpsertArgs<ExtArgs>>): Prisma__CalendarBlockClient<$Result.GetResult<Prisma.$CalendarBlockPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of CalendarBlocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarBlockCountArgs} args - Arguments to filter CalendarBlocks to count.
     * @example
     * // Count the number of CalendarBlocks
     * const count = await prisma.calendarBlock.count({
     *   where: {
     *     // ... the filter for the CalendarBlocks we want to count
     *   }
     * })
    **/
    count<T extends CalendarBlockCountArgs>(
      args?: Subset<T, CalendarBlockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CalendarBlockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CalendarBlock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarBlockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CalendarBlockAggregateArgs>(args: Subset<T, CalendarBlockAggregateArgs>): Prisma.PrismaPromise<GetCalendarBlockAggregateType<T>>

    /**
     * Group by CalendarBlock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarBlockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CalendarBlockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CalendarBlockGroupByArgs['orderBy'] }
        : { orderBy?: CalendarBlockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CalendarBlockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCalendarBlockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CalendarBlock model
   */
  readonly fields: CalendarBlockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CalendarBlock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CalendarBlockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CalendarBlock model
   */ 
  interface CalendarBlockFieldRefs {
    readonly id: FieldRef<"CalendarBlock", 'String'>
    readonly propertyId: FieldRef<"CalendarBlock", 'String'>
    readonly date: FieldRef<"CalendarBlock", 'DateTime'>
    readonly reason: FieldRef<"CalendarBlock", 'String'>
    readonly bookingId: FieldRef<"CalendarBlock", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CalendarBlock findUnique
   */
  export type CalendarBlockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarBlock
     */
    select?: CalendarBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarBlock
     */
    omit?: CalendarBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarBlockInclude<ExtArgs> | null
    /**
     * Filter, which CalendarBlock to fetch.
     */
    where: CalendarBlockWhereUniqueInput
  }

  /**
   * CalendarBlock findUniqueOrThrow
   */
  export type CalendarBlockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarBlock
     */
    select?: CalendarBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarBlock
     */
    omit?: CalendarBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarBlockInclude<ExtArgs> | null
    /**
     * Filter, which CalendarBlock to fetch.
     */
    where: CalendarBlockWhereUniqueInput
  }

  /**
   * CalendarBlock findFirst
   */
  export type CalendarBlockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarBlock
     */
    select?: CalendarBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarBlock
     */
    omit?: CalendarBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarBlockInclude<ExtArgs> | null
    /**
     * Filter, which CalendarBlock to fetch.
     */
    where?: CalendarBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CalendarBlocks to fetch.
     */
    orderBy?: CalendarBlockOrderByWithRelationInput | CalendarBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CalendarBlocks.
     */
    cursor?: CalendarBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CalendarBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CalendarBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CalendarBlocks.
     */
    distinct?: CalendarBlockScalarFieldEnum | CalendarBlockScalarFieldEnum[]
  }

  /**
   * CalendarBlock findFirstOrThrow
   */
  export type CalendarBlockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarBlock
     */
    select?: CalendarBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarBlock
     */
    omit?: CalendarBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarBlockInclude<ExtArgs> | null
    /**
     * Filter, which CalendarBlock to fetch.
     */
    where?: CalendarBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CalendarBlocks to fetch.
     */
    orderBy?: CalendarBlockOrderByWithRelationInput | CalendarBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CalendarBlocks.
     */
    cursor?: CalendarBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CalendarBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CalendarBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CalendarBlocks.
     */
    distinct?: CalendarBlockScalarFieldEnum | CalendarBlockScalarFieldEnum[]
  }

  /**
   * CalendarBlock findMany
   */
  export type CalendarBlockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarBlock
     */
    select?: CalendarBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarBlock
     */
    omit?: CalendarBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarBlockInclude<ExtArgs> | null
    /**
     * Filter, which CalendarBlocks to fetch.
     */
    where?: CalendarBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CalendarBlocks to fetch.
     */
    orderBy?: CalendarBlockOrderByWithRelationInput | CalendarBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CalendarBlocks.
     */
    cursor?: CalendarBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CalendarBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CalendarBlocks.
     */
    skip?: number
    distinct?: CalendarBlockScalarFieldEnum | CalendarBlockScalarFieldEnum[]
  }

  /**
   * CalendarBlock create
   */
  export type CalendarBlockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarBlock
     */
    select?: CalendarBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarBlock
     */
    omit?: CalendarBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarBlockInclude<ExtArgs> | null
    /**
     * The data needed to create a CalendarBlock.
     */
    data: XOR<CalendarBlockCreateInput, CalendarBlockUncheckedCreateInput>
  }

  /**
   * CalendarBlock createMany
   */
  export type CalendarBlockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CalendarBlocks.
     */
    data: CalendarBlockCreateManyInput | CalendarBlockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CalendarBlock createManyAndReturn
   */
  export type CalendarBlockCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarBlock
     */
    select?: CalendarBlockSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarBlock
     */
    omit?: CalendarBlockOmit<ExtArgs> | null
    /**
     * The data used to create many CalendarBlocks.
     */
    data: CalendarBlockCreateManyInput | CalendarBlockCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarBlockIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CalendarBlock update
   */
  export type CalendarBlockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarBlock
     */
    select?: CalendarBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarBlock
     */
    omit?: CalendarBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarBlockInclude<ExtArgs> | null
    /**
     * The data needed to update a CalendarBlock.
     */
    data: XOR<CalendarBlockUpdateInput, CalendarBlockUncheckedUpdateInput>
    /**
     * Choose, which CalendarBlock to update.
     */
    where: CalendarBlockWhereUniqueInput
  }

  /**
   * CalendarBlock updateMany
   */
  export type CalendarBlockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CalendarBlocks.
     */
    data: XOR<CalendarBlockUpdateManyMutationInput, CalendarBlockUncheckedUpdateManyInput>
    /**
     * Filter which CalendarBlocks to update
     */
    where?: CalendarBlockWhereInput
    /**
     * Limit how many CalendarBlocks to update.
     */
    limit?: number
  }

  /**
   * CalendarBlock updateManyAndReturn
   */
  export type CalendarBlockUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarBlock
     */
    select?: CalendarBlockSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarBlock
     */
    omit?: CalendarBlockOmit<ExtArgs> | null
    /**
     * The data used to update CalendarBlocks.
     */
    data: XOR<CalendarBlockUpdateManyMutationInput, CalendarBlockUncheckedUpdateManyInput>
    /**
     * Filter which CalendarBlocks to update
     */
    where?: CalendarBlockWhereInput
    /**
     * Limit how many CalendarBlocks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarBlockIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CalendarBlock upsert
   */
  export type CalendarBlockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarBlock
     */
    select?: CalendarBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarBlock
     */
    omit?: CalendarBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarBlockInclude<ExtArgs> | null
    /**
     * The filter to search for the CalendarBlock to update in case it exists.
     */
    where: CalendarBlockWhereUniqueInput
    /**
     * In case the CalendarBlock found by the `where` argument doesn't exist, create a new CalendarBlock with this data.
     */
    create: XOR<CalendarBlockCreateInput, CalendarBlockUncheckedCreateInput>
    /**
     * In case the CalendarBlock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CalendarBlockUpdateInput, CalendarBlockUncheckedUpdateInput>
  }

  /**
   * CalendarBlock delete
   */
  export type CalendarBlockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarBlock
     */
    select?: CalendarBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarBlock
     */
    omit?: CalendarBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarBlockInclude<ExtArgs> | null
    /**
     * Filter which CalendarBlock to delete.
     */
    where: CalendarBlockWhereUniqueInput
  }

  /**
   * CalendarBlock deleteMany
   */
  export type CalendarBlockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CalendarBlocks to delete
     */
    where?: CalendarBlockWhereInput
    /**
     * Limit how many CalendarBlocks to delete.
     */
    limit?: number
  }

  /**
   * CalendarBlock without action
   */
  export type CalendarBlockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarBlock
     */
    select?: CalendarBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarBlock
     */
    omit?: CalendarBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarBlockInclude<ExtArgs> | null
  }


  /**
   * Model LedgerEntry
   */

  export type AggregateLedgerEntry = {
    _count: LedgerEntryCountAggregateOutputType | null
    _avg: LedgerEntryAvgAggregateOutputType | null
    _sum: LedgerEntrySumAggregateOutputType | null
    _min: LedgerEntryMinAggregateOutputType | null
    _max: LedgerEntryMaxAggregateOutputType | null
  }

  export type LedgerEntryAvgAggregateOutputType = {
    grossAmount: number | null
    hostAmount: number | null
    istayAmount: number | null
  }

  export type LedgerEntrySumAggregateOutputType = {
    grossAmount: number | null
    hostAmount: number | null
    istayAmount: number | null
  }

  export type LedgerEntryMinAggregateOutputType = {
    id: string | null
    bookingId: string | null
    hostId: string | null
    propertyId: string | null
    gatewayOrderId: string | null
    grossAmount: number | null
    hostAmount: number | null
    istayAmount: number | null
    status: string | null
    settledAt: Date | null
    createdAt: Date | null
  }

  export type LedgerEntryMaxAggregateOutputType = {
    id: string | null
    bookingId: string | null
    hostId: string | null
    propertyId: string | null
    gatewayOrderId: string | null
    grossAmount: number | null
    hostAmount: number | null
    istayAmount: number | null
    status: string | null
    settledAt: Date | null
    createdAt: Date | null
  }

  export type LedgerEntryCountAggregateOutputType = {
    id: number
    bookingId: number
    hostId: number
    propertyId: number
    gatewayOrderId: number
    grossAmount: number
    hostAmount: number
    istayAmount: number
    status: number
    settledAt: number
    createdAt: number
    _all: number
  }


  export type LedgerEntryAvgAggregateInputType = {
    grossAmount?: true
    hostAmount?: true
    istayAmount?: true
  }

  export type LedgerEntrySumAggregateInputType = {
    grossAmount?: true
    hostAmount?: true
    istayAmount?: true
  }

  export type LedgerEntryMinAggregateInputType = {
    id?: true
    bookingId?: true
    hostId?: true
    propertyId?: true
    gatewayOrderId?: true
    grossAmount?: true
    hostAmount?: true
    istayAmount?: true
    status?: true
    settledAt?: true
    createdAt?: true
  }

  export type LedgerEntryMaxAggregateInputType = {
    id?: true
    bookingId?: true
    hostId?: true
    propertyId?: true
    gatewayOrderId?: true
    grossAmount?: true
    hostAmount?: true
    istayAmount?: true
    status?: true
    settledAt?: true
    createdAt?: true
  }

  export type LedgerEntryCountAggregateInputType = {
    id?: true
    bookingId?: true
    hostId?: true
    propertyId?: true
    gatewayOrderId?: true
    grossAmount?: true
    hostAmount?: true
    istayAmount?: true
    status?: true
    settledAt?: true
    createdAt?: true
    _all?: true
  }

  export type LedgerEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LedgerEntry to aggregate.
     */
    where?: LedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerEntries to fetch.
     */
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LedgerEntries
    **/
    _count?: true | LedgerEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LedgerEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LedgerEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LedgerEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LedgerEntryMaxAggregateInputType
  }

  export type GetLedgerEntryAggregateType<T extends LedgerEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateLedgerEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLedgerEntry[P]>
      : GetScalarType<T[P], AggregateLedgerEntry[P]>
  }




  export type LedgerEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LedgerEntryWhereInput
    orderBy?: LedgerEntryOrderByWithAggregationInput | LedgerEntryOrderByWithAggregationInput[]
    by: LedgerEntryScalarFieldEnum[] | LedgerEntryScalarFieldEnum
    having?: LedgerEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LedgerEntryCountAggregateInputType | true
    _avg?: LedgerEntryAvgAggregateInputType
    _sum?: LedgerEntrySumAggregateInputType
    _min?: LedgerEntryMinAggregateInputType
    _max?: LedgerEntryMaxAggregateInputType
  }

  export type LedgerEntryGroupByOutputType = {
    id: string
    bookingId: string
    hostId: string
    propertyId: string
    gatewayOrderId: string
    grossAmount: number
    hostAmount: number
    istayAmount: number
    status: string
    settledAt: Date | null
    createdAt: Date
    _count: LedgerEntryCountAggregateOutputType | null
    _avg: LedgerEntryAvgAggregateOutputType | null
    _sum: LedgerEntrySumAggregateOutputType | null
    _min: LedgerEntryMinAggregateOutputType | null
    _max: LedgerEntryMaxAggregateOutputType | null
  }

  type GetLedgerEntryGroupByPayload<T extends LedgerEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LedgerEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LedgerEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LedgerEntryGroupByOutputType[P]>
            : GetScalarType<T[P], LedgerEntryGroupByOutputType[P]>
        }
      >
    >


  export type LedgerEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    hostId?: boolean
    propertyId?: boolean
    gatewayOrderId?: boolean
    grossAmount?: boolean
    hostAmount?: boolean
    istayAmount?: boolean
    status?: boolean
    settledAt?: boolean
    createdAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    host?: boolean | HostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ledgerEntry"]>

  export type LedgerEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    hostId?: boolean
    propertyId?: boolean
    gatewayOrderId?: boolean
    grossAmount?: boolean
    hostAmount?: boolean
    istayAmount?: boolean
    status?: boolean
    settledAt?: boolean
    createdAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    host?: boolean | HostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ledgerEntry"]>

  export type LedgerEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    hostId?: boolean
    propertyId?: boolean
    gatewayOrderId?: boolean
    grossAmount?: boolean
    hostAmount?: boolean
    istayAmount?: boolean
    status?: boolean
    settledAt?: boolean
    createdAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    host?: boolean | HostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ledgerEntry"]>

  export type LedgerEntrySelectScalar = {
    id?: boolean
    bookingId?: boolean
    hostId?: boolean
    propertyId?: boolean
    gatewayOrderId?: boolean
    grossAmount?: boolean
    hostAmount?: boolean
    istayAmount?: boolean
    status?: boolean
    settledAt?: boolean
    createdAt?: boolean
  }

  export type LedgerEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bookingId" | "hostId" | "propertyId" | "gatewayOrderId" | "grossAmount" | "hostAmount" | "istayAmount" | "status" | "settledAt" | "createdAt", ExtArgs["result"]["ledgerEntry"]>
  export type LedgerEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    host?: boolean | HostDefaultArgs<ExtArgs>
  }
  export type LedgerEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    host?: boolean | HostDefaultArgs<ExtArgs>
  }
  export type LedgerEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    host?: boolean | HostDefaultArgs<ExtArgs>
  }

  export type $LedgerEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LedgerEntry"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs>
      host: Prisma.$HostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookingId: string
      hostId: string
      propertyId: string
      gatewayOrderId: string
      grossAmount: number
      hostAmount: number
      istayAmount: number
      status: string
      settledAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["ledgerEntry"]>
    composites: {}
  }

  type LedgerEntryGetPayload<S extends boolean | null | undefined | LedgerEntryDefaultArgs> = $Result.GetResult<Prisma.$LedgerEntryPayload, S>

  type LedgerEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LedgerEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LedgerEntryCountAggregateInputType | true
    }

  export interface LedgerEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LedgerEntry'], meta: { name: 'LedgerEntry' } }
    /**
     * Find zero or one LedgerEntry that matches the filter.
     * @param {LedgerEntryFindUniqueArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LedgerEntryFindUniqueArgs>(args: SelectSubset<T, LedgerEntryFindUniqueArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one LedgerEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LedgerEntryFindUniqueOrThrowArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LedgerEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, LedgerEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first LedgerEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryFindFirstArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LedgerEntryFindFirstArgs>(args?: SelectSubset<T, LedgerEntryFindFirstArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first LedgerEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryFindFirstOrThrowArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LedgerEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, LedgerEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more LedgerEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LedgerEntries
     * const ledgerEntries = await prisma.ledgerEntry.findMany()
     * 
     * // Get first 10 LedgerEntries
     * const ledgerEntries = await prisma.ledgerEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ledgerEntryWithIdOnly = await prisma.ledgerEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LedgerEntryFindManyArgs>(args?: SelectSubset<T, LedgerEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a LedgerEntry.
     * @param {LedgerEntryCreateArgs} args - Arguments to create a LedgerEntry.
     * @example
     * // Create one LedgerEntry
     * const LedgerEntry = await prisma.ledgerEntry.create({
     *   data: {
     *     // ... data to create a LedgerEntry
     *   }
     * })
     * 
     */
    create<T extends LedgerEntryCreateArgs>(args: SelectSubset<T, LedgerEntryCreateArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many LedgerEntries.
     * @param {LedgerEntryCreateManyArgs} args - Arguments to create many LedgerEntries.
     * @example
     * // Create many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LedgerEntryCreateManyArgs>(args?: SelectSubset<T, LedgerEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LedgerEntries and returns the data saved in the database.
     * @param {LedgerEntryCreateManyAndReturnArgs} args - Arguments to create many LedgerEntries.
     * @example
     * // Create many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LedgerEntries and only return the `id`
     * const ledgerEntryWithIdOnly = await prisma.ledgerEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LedgerEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, LedgerEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a LedgerEntry.
     * @param {LedgerEntryDeleteArgs} args - Arguments to delete one LedgerEntry.
     * @example
     * // Delete one LedgerEntry
     * const LedgerEntry = await prisma.ledgerEntry.delete({
     *   where: {
     *     // ... filter to delete one LedgerEntry
     *   }
     * })
     * 
     */
    delete<T extends LedgerEntryDeleteArgs>(args: SelectSubset<T, LedgerEntryDeleteArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one LedgerEntry.
     * @param {LedgerEntryUpdateArgs} args - Arguments to update one LedgerEntry.
     * @example
     * // Update one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LedgerEntryUpdateArgs>(args: SelectSubset<T, LedgerEntryUpdateArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more LedgerEntries.
     * @param {LedgerEntryDeleteManyArgs} args - Arguments to filter LedgerEntries to delete.
     * @example
     * // Delete a few LedgerEntries
     * const { count } = await prisma.ledgerEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LedgerEntryDeleteManyArgs>(args?: SelectSubset<T, LedgerEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LedgerEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LedgerEntryUpdateManyArgs>(args: SelectSubset<T, LedgerEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LedgerEntries and returns the data updated in the database.
     * @param {LedgerEntryUpdateManyAndReturnArgs} args - Arguments to update many LedgerEntries.
     * @example
     * // Update many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LedgerEntries and only return the `id`
     * const ledgerEntryWithIdOnly = await prisma.ledgerEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LedgerEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, LedgerEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one LedgerEntry.
     * @param {LedgerEntryUpsertArgs} args - Arguments to update or create a LedgerEntry.
     * @example
     * // Update or create a LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.upsert({
     *   create: {
     *     // ... data to create a LedgerEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LedgerEntry we want to update
     *   }
     * })
     */
    upsert<T extends LedgerEntryUpsertArgs>(args: SelectSubset<T, LedgerEntryUpsertArgs<ExtArgs>>): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of LedgerEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryCountArgs} args - Arguments to filter LedgerEntries to count.
     * @example
     * // Count the number of LedgerEntries
     * const count = await prisma.ledgerEntry.count({
     *   where: {
     *     // ... the filter for the LedgerEntries we want to count
     *   }
     * })
    **/
    count<T extends LedgerEntryCountArgs>(
      args?: Subset<T, LedgerEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LedgerEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LedgerEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LedgerEntryAggregateArgs>(args: Subset<T, LedgerEntryAggregateArgs>): Prisma.PrismaPromise<GetLedgerEntryAggregateType<T>>

    /**
     * Group by LedgerEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LedgerEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LedgerEntryGroupByArgs['orderBy'] }
        : { orderBy?: LedgerEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LedgerEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLedgerEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LedgerEntry model
   */
  readonly fields: LedgerEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LedgerEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LedgerEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    host<T extends HostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HostDefaultArgs<ExtArgs>>): Prisma__HostClient<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LedgerEntry model
   */ 
  interface LedgerEntryFieldRefs {
    readonly id: FieldRef<"LedgerEntry", 'String'>
    readonly bookingId: FieldRef<"LedgerEntry", 'String'>
    readonly hostId: FieldRef<"LedgerEntry", 'String'>
    readonly propertyId: FieldRef<"LedgerEntry", 'String'>
    readonly gatewayOrderId: FieldRef<"LedgerEntry", 'String'>
    readonly grossAmount: FieldRef<"LedgerEntry", 'Float'>
    readonly hostAmount: FieldRef<"LedgerEntry", 'Float'>
    readonly istayAmount: FieldRef<"LedgerEntry", 'Float'>
    readonly status: FieldRef<"LedgerEntry", 'String'>
    readonly settledAt: FieldRef<"LedgerEntry", 'DateTime'>
    readonly createdAt: FieldRef<"LedgerEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LedgerEntry findUnique
   */
  export type LedgerEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * Filter, which LedgerEntry to fetch.
     */
    where: LedgerEntryWhereUniqueInput
  }

  /**
   * LedgerEntry findUniqueOrThrow
   */
  export type LedgerEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * Filter, which LedgerEntry to fetch.
     */
    where: LedgerEntryWhereUniqueInput
  }

  /**
   * LedgerEntry findFirst
   */
  export type LedgerEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * Filter, which LedgerEntry to fetch.
     */
    where?: LedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerEntries to fetch.
     */
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LedgerEntries.
     */
    cursor?: LedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LedgerEntries.
     */
    distinct?: LedgerEntryScalarFieldEnum | LedgerEntryScalarFieldEnum[]
  }

  /**
   * LedgerEntry findFirstOrThrow
   */
  export type LedgerEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * Filter, which LedgerEntry to fetch.
     */
    where?: LedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerEntries to fetch.
     */
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LedgerEntries.
     */
    cursor?: LedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LedgerEntries.
     */
    distinct?: LedgerEntryScalarFieldEnum | LedgerEntryScalarFieldEnum[]
  }

  /**
   * LedgerEntry findMany
   */
  export type LedgerEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * Filter, which LedgerEntries to fetch.
     */
    where?: LedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerEntries to fetch.
     */
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LedgerEntries.
     */
    cursor?: LedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerEntries.
     */
    skip?: number
    distinct?: LedgerEntryScalarFieldEnum | LedgerEntryScalarFieldEnum[]
  }

  /**
   * LedgerEntry create
   */
  export type LedgerEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a LedgerEntry.
     */
    data: XOR<LedgerEntryCreateInput, LedgerEntryUncheckedCreateInput>
  }

  /**
   * LedgerEntry createMany
   */
  export type LedgerEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LedgerEntries.
     */
    data: LedgerEntryCreateManyInput | LedgerEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LedgerEntry createManyAndReturn
   */
  export type LedgerEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * The data used to create many LedgerEntries.
     */
    data: LedgerEntryCreateManyInput | LedgerEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LedgerEntry update
   */
  export type LedgerEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a LedgerEntry.
     */
    data: XOR<LedgerEntryUpdateInput, LedgerEntryUncheckedUpdateInput>
    /**
     * Choose, which LedgerEntry to update.
     */
    where: LedgerEntryWhereUniqueInput
  }

  /**
   * LedgerEntry updateMany
   */
  export type LedgerEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LedgerEntries.
     */
    data: XOR<LedgerEntryUpdateManyMutationInput, LedgerEntryUncheckedUpdateManyInput>
    /**
     * Filter which LedgerEntries to update
     */
    where?: LedgerEntryWhereInput
    /**
     * Limit how many LedgerEntries to update.
     */
    limit?: number
  }

  /**
   * LedgerEntry updateManyAndReturn
   */
  export type LedgerEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * The data used to update LedgerEntries.
     */
    data: XOR<LedgerEntryUpdateManyMutationInput, LedgerEntryUncheckedUpdateManyInput>
    /**
     * Filter which LedgerEntries to update
     */
    where?: LedgerEntryWhereInput
    /**
     * Limit how many LedgerEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LedgerEntry upsert
   */
  export type LedgerEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the LedgerEntry to update in case it exists.
     */
    where: LedgerEntryWhereUniqueInput
    /**
     * In case the LedgerEntry found by the `where` argument doesn't exist, create a new LedgerEntry with this data.
     */
    create: XOR<LedgerEntryCreateInput, LedgerEntryUncheckedCreateInput>
    /**
     * In case the LedgerEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LedgerEntryUpdateInput, LedgerEntryUncheckedUpdateInput>
  }

  /**
   * LedgerEntry delete
   */
  export type LedgerEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
    /**
     * Filter which LedgerEntry to delete.
     */
    where: LedgerEntryWhereUniqueInput
  }

  /**
   * LedgerEntry deleteMany
   */
  export type LedgerEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LedgerEntries to delete
     */
    where?: LedgerEntryWhereInput
    /**
     * Limit how many LedgerEntries to delete.
     */
    limit?: number
  }

  /**
   * LedgerEntry without action
   */
  export type LedgerEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerEntry
     */
    omit?: LedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerEntryInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    hostId: string | null
    type: string | null
    title: string | null
    message: string | null
    propertyName: string | null
    read: boolean | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    hostId: string | null
    type: string | null
    title: string | null
    message: string | null
    propertyName: string | null
    read: boolean | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    hostId: number
    type: number
    title: number
    message: number
    propertyName: number
    meta: number
    read: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    hostId?: true
    type?: true
    title?: true
    message?: true
    propertyName?: true
    read?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    hostId?: true
    type?: true
    title?: true
    message?: true
    propertyName?: true
    read?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    hostId?: true
    type?: true
    title?: true
    message?: true
    propertyName?: true
    meta?: true
    read?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    hostId: string
    type: string
    title: string
    message: string
    propertyName: string
    meta: JsonValue | null
    read: boolean
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hostId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    propertyName?: boolean
    meta?: boolean
    read?: boolean
    createdAt?: boolean
    host?: boolean | HostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hostId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    propertyName?: boolean
    meta?: boolean
    read?: boolean
    createdAt?: boolean
    host?: boolean | HostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hostId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    propertyName?: boolean
    meta?: boolean
    read?: boolean
    createdAt?: boolean
    host?: boolean | HostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    hostId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    propertyName?: boolean
    meta?: boolean
    read?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hostId" | "type" | "title" | "message" | "propertyName" | "meta" | "read" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | HostDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | HostDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | HostDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      host: Prisma.$HostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      hostId: string
      type: string
      title: string
      message: string
      propertyName: string
      meta: Prisma.JsonValue | null
      read: boolean
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    host<T extends HostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HostDefaultArgs<ExtArgs>>): Prisma__HostClient<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly hostId: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly propertyName: FieldRef<"Notification", 'String'>
    readonly meta: FieldRef<"Notification", 'Json'>
    readonly read: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model GuestVerification
   */

  export type AggregateGuestVerification = {
    _count: GuestVerificationCountAggregateOutputType | null
    _avg: GuestVerificationAvgAggregateOutputType | null
    _sum: GuestVerificationSumAggregateOutputType | null
    _min: GuestVerificationMinAggregateOutputType | null
    _max: GuestVerificationMaxAggregateOutputType | null
  }

  export type GuestVerificationAvgAggregateOutputType = {
    matchScore: number | null
  }

  export type GuestVerificationSumAggregateOutputType = {
    matchScore: number | null
  }

  export type GuestVerificationMinAggregateOutputType = {
    bookingId: string | null
    guestName: string | null
    idType: string | null
    idObjectKey: string | null
    status: string | null
    matchScore: number | null
    createdAt: Date | null
    verifiedAt: Date | null
  }

  export type GuestVerificationMaxAggregateOutputType = {
    bookingId: string | null
    guestName: string | null
    idType: string | null
    idObjectKey: string | null
    status: string | null
    matchScore: number | null
    createdAt: Date | null
    verifiedAt: Date | null
  }

  export type GuestVerificationCountAggregateOutputType = {
    bookingId: number
    guestName: number
    idType: number
    idObjectKey: number
    status: number
    extractedData: number
    matchScore: number
    flags: number
    createdAt: number
    verifiedAt: number
    _all: number
  }


  export type GuestVerificationAvgAggregateInputType = {
    matchScore?: true
  }

  export type GuestVerificationSumAggregateInputType = {
    matchScore?: true
  }

  export type GuestVerificationMinAggregateInputType = {
    bookingId?: true
    guestName?: true
    idType?: true
    idObjectKey?: true
    status?: true
    matchScore?: true
    createdAt?: true
    verifiedAt?: true
  }

  export type GuestVerificationMaxAggregateInputType = {
    bookingId?: true
    guestName?: true
    idType?: true
    idObjectKey?: true
    status?: true
    matchScore?: true
    createdAt?: true
    verifiedAt?: true
  }

  export type GuestVerificationCountAggregateInputType = {
    bookingId?: true
    guestName?: true
    idType?: true
    idObjectKey?: true
    status?: true
    extractedData?: true
    matchScore?: true
    flags?: true
    createdAt?: true
    verifiedAt?: true
    _all?: true
  }

  export type GuestVerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuestVerification to aggregate.
     */
    where?: GuestVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuestVerifications to fetch.
     */
    orderBy?: GuestVerificationOrderByWithRelationInput | GuestVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuestVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuestVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuestVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GuestVerifications
    **/
    _count?: true | GuestVerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GuestVerificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GuestVerificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuestVerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuestVerificationMaxAggregateInputType
  }

  export type GetGuestVerificationAggregateType<T extends GuestVerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateGuestVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuestVerification[P]>
      : GetScalarType<T[P], AggregateGuestVerification[P]>
  }




  export type GuestVerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuestVerificationWhereInput
    orderBy?: GuestVerificationOrderByWithAggregationInput | GuestVerificationOrderByWithAggregationInput[]
    by: GuestVerificationScalarFieldEnum[] | GuestVerificationScalarFieldEnum
    having?: GuestVerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuestVerificationCountAggregateInputType | true
    _avg?: GuestVerificationAvgAggregateInputType
    _sum?: GuestVerificationSumAggregateInputType
    _min?: GuestVerificationMinAggregateInputType
    _max?: GuestVerificationMaxAggregateInputType
  }

  export type GuestVerificationGroupByOutputType = {
    bookingId: string
    guestName: string
    idType: string
    idObjectKey: string | null
    status: string
    extractedData: JsonValue | null
    matchScore: number | null
    flags: string[]
    createdAt: Date
    verifiedAt: Date | null
    _count: GuestVerificationCountAggregateOutputType | null
    _avg: GuestVerificationAvgAggregateOutputType | null
    _sum: GuestVerificationSumAggregateOutputType | null
    _min: GuestVerificationMinAggregateOutputType | null
    _max: GuestVerificationMaxAggregateOutputType | null
  }

  type GetGuestVerificationGroupByPayload<T extends GuestVerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuestVerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuestVerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuestVerificationGroupByOutputType[P]>
            : GetScalarType<T[P], GuestVerificationGroupByOutputType[P]>
        }
      >
    >


  export type GuestVerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    bookingId?: boolean
    guestName?: boolean
    idType?: boolean
    idObjectKey?: boolean
    status?: boolean
    extractedData?: boolean
    matchScore?: boolean
    flags?: boolean
    createdAt?: boolean
    verifiedAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guestVerification"]>

  export type GuestVerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    bookingId?: boolean
    guestName?: boolean
    idType?: boolean
    idObjectKey?: boolean
    status?: boolean
    extractedData?: boolean
    matchScore?: boolean
    flags?: boolean
    createdAt?: boolean
    verifiedAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guestVerification"]>

  export type GuestVerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    bookingId?: boolean
    guestName?: boolean
    idType?: boolean
    idObjectKey?: boolean
    status?: boolean
    extractedData?: boolean
    matchScore?: boolean
    flags?: boolean
    createdAt?: boolean
    verifiedAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guestVerification"]>

  export type GuestVerificationSelectScalar = {
    bookingId?: boolean
    guestName?: boolean
    idType?: boolean
    idObjectKey?: boolean
    status?: boolean
    extractedData?: boolean
    matchScore?: boolean
    flags?: boolean
    createdAt?: boolean
    verifiedAt?: boolean
  }

  export type GuestVerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"bookingId" | "guestName" | "idType" | "idObjectKey" | "status" | "extractedData" | "matchScore" | "flags" | "createdAt" | "verifiedAt", ExtArgs["result"]["guestVerification"]>
  export type GuestVerificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type GuestVerificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type GuestVerificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }

  export type $GuestVerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GuestVerification"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      bookingId: string
      guestName: string
      idType: string
      idObjectKey: string | null
      status: string
      extractedData: Prisma.JsonValue | null
      matchScore: number | null
      flags: string[]
      createdAt: Date
      verifiedAt: Date | null
    }, ExtArgs["result"]["guestVerification"]>
    composites: {}
  }

  type GuestVerificationGetPayload<S extends boolean | null | undefined | GuestVerificationDefaultArgs> = $Result.GetResult<Prisma.$GuestVerificationPayload, S>

  type GuestVerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GuestVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GuestVerificationCountAggregateInputType | true
    }

  export interface GuestVerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GuestVerification'], meta: { name: 'GuestVerification' } }
    /**
     * Find zero or one GuestVerification that matches the filter.
     * @param {GuestVerificationFindUniqueArgs} args - Arguments to find a GuestVerification
     * @example
     * // Get one GuestVerification
     * const guestVerification = await prisma.guestVerification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuestVerificationFindUniqueArgs>(args: SelectSubset<T, GuestVerificationFindUniqueArgs<ExtArgs>>): Prisma__GuestVerificationClient<$Result.GetResult<Prisma.$GuestVerificationPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one GuestVerification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GuestVerificationFindUniqueOrThrowArgs} args - Arguments to find a GuestVerification
     * @example
     * // Get one GuestVerification
     * const guestVerification = await prisma.guestVerification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuestVerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, GuestVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuestVerificationClient<$Result.GetResult<Prisma.$GuestVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first GuestVerification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestVerificationFindFirstArgs} args - Arguments to find a GuestVerification
     * @example
     * // Get one GuestVerification
     * const guestVerification = await prisma.guestVerification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuestVerificationFindFirstArgs>(args?: SelectSubset<T, GuestVerificationFindFirstArgs<ExtArgs>>): Prisma__GuestVerificationClient<$Result.GetResult<Prisma.$GuestVerificationPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first GuestVerification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestVerificationFindFirstOrThrowArgs} args - Arguments to find a GuestVerification
     * @example
     * // Get one GuestVerification
     * const guestVerification = await prisma.guestVerification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuestVerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, GuestVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuestVerificationClient<$Result.GetResult<Prisma.$GuestVerificationPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more GuestVerifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestVerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GuestVerifications
     * const guestVerifications = await prisma.guestVerification.findMany()
     * 
     * // Get first 10 GuestVerifications
     * const guestVerifications = await prisma.guestVerification.findMany({ take: 10 })
     * 
     * // Only select the `bookingId`
     * const guestVerificationWithBookingIdOnly = await prisma.guestVerification.findMany({ select: { bookingId: true } })
     * 
     */
    findMany<T extends GuestVerificationFindManyArgs>(args?: SelectSubset<T, GuestVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestVerificationPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a GuestVerification.
     * @param {GuestVerificationCreateArgs} args - Arguments to create a GuestVerification.
     * @example
     * // Create one GuestVerification
     * const GuestVerification = await prisma.guestVerification.create({
     *   data: {
     *     // ... data to create a GuestVerification
     *   }
     * })
     * 
     */
    create<T extends GuestVerificationCreateArgs>(args: SelectSubset<T, GuestVerificationCreateArgs<ExtArgs>>): Prisma__GuestVerificationClient<$Result.GetResult<Prisma.$GuestVerificationPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many GuestVerifications.
     * @param {GuestVerificationCreateManyArgs} args - Arguments to create many GuestVerifications.
     * @example
     * // Create many GuestVerifications
     * const guestVerification = await prisma.guestVerification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuestVerificationCreateManyArgs>(args?: SelectSubset<T, GuestVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GuestVerifications and returns the data saved in the database.
     * @param {GuestVerificationCreateManyAndReturnArgs} args - Arguments to create many GuestVerifications.
     * @example
     * // Create many GuestVerifications
     * const guestVerification = await prisma.guestVerification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GuestVerifications and only return the `bookingId`
     * const guestVerificationWithBookingIdOnly = await prisma.guestVerification.createManyAndReturn({
     *   select: { bookingId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GuestVerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, GuestVerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestVerificationPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a GuestVerification.
     * @param {GuestVerificationDeleteArgs} args - Arguments to delete one GuestVerification.
     * @example
     * // Delete one GuestVerification
     * const GuestVerification = await prisma.guestVerification.delete({
     *   where: {
     *     // ... filter to delete one GuestVerification
     *   }
     * })
     * 
     */
    delete<T extends GuestVerificationDeleteArgs>(args: SelectSubset<T, GuestVerificationDeleteArgs<ExtArgs>>): Prisma__GuestVerificationClient<$Result.GetResult<Prisma.$GuestVerificationPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one GuestVerification.
     * @param {GuestVerificationUpdateArgs} args - Arguments to update one GuestVerification.
     * @example
     * // Update one GuestVerification
     * const guestVerification = await prisma.guestVerification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuestVerificationUpdateArgs>(args: SelectSubset<T, GuestVerificationUpdateArgs<ExtArgs>>): Prisma__GuestVerificationClient<$Result.GetResult<Prisma.$GuestVerificationPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more GuestVerifications.
     * @param {GuestVerificationDeleteManyArgs} args - Arguments to filter GuestVerifications to delete.
     * @example
     * // Delete a few GuestVerifications
     * const { count } = await prisma.guestVerification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuestVerificationDeleteManyArgs>(args?: SelectSubset<T, GuestVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuestVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestVerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GuestVerifications
     * const guestVerification = await prisma.guestVerification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuestVerificationUpdateManyArgs>(args: SelectSubset<T, GuestVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuestVerifications and returns the data updated in the database.
     * @param {GuestVerificationUpdateManyAndReturnArgs} args - Arguments to update many GuestVerifications.
     * @example
     * // Update many GuestVerifications
     * const guestVerification = await prisma.guestVerification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GuestVerifications and only return the `bookingId`
     * const guestVerificationWithBookingIdOnly = await prisma.guestVerification.updateManyAndReturn({
     *   select: { bookingId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GuestVerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, GuestVerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestVerificationPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one GuestVerification.
     * @param {GuestVerificationUpsertArgs} args - Arguments to update or create a GuestVerification.
     * @example
     * // Update or create a GuestVerification
     * const guestVerification = await prisma.guestVerification.upsert({
     *   create: {
     *     // ... data to create a GuestVerification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GuestVerification we want to update
     *   }
     * })
     */
    upsert<T extends GuestVerificationUpsertArgs>(args: SelectSubset<T, GuestVerificationUpsertArgs<ExtArgs>>): Prisma__GuestVerificationClient<$Result.GetResult<Prisma.$GuestVerificationPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of GuestVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestVerificationCountArgs} args - Arguments to filter GuestVerifications to count.
     * @example
     * // Count the number of GuestVerifications
     * const count = await prisma.guestVerification.count({
     *   where: {
     *     // ... the filter for the GuestVerifications we want to count
     *   }
     * })
    **/
    count<T extends GuestVerificationCountArgs>(
      args?: Subset<T, GuestVerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuestVerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GuestVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestVerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuestVerificationAggregateArgs>(args: Subset<T, GuestVerificationAggregateArgs>): Prisma.PrismaPromise<GetGuestVerificationAggregateType<T>>

    /**
     * Group by GuestVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestVerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GuestVerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuestVerificationGroupByArgs['orderBy'] }
        : { orderBy?: GuestVerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GuestVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuestVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GuestVerification model
   */
  readonly fields: GuestVerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GuestVerification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuestVerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GuestVerification model
   */ 
  interface GuestVerificationFieldRefs {
    readonly bookingId: FieldRef<"GuestVerification", 'String'>
    readonly guestName: FieldRef<"GuestVerification", 'String'>
    readonly idType: FieldRef<"GuestVerification", 'String'>
    readonly idObjectKey: FieldRef<"GuestVerification", 'String'>
    readonly status: FieldRef<"GuestVerification", 'String'>
    readonly extractedData: FieldRef<"GuestVerification", 'Json'>
    readonly matchScore: FieldRef<"GuestVerification", 'Int'>
    readonly flags: FieldRef<"GuestVerification", 'String[]'>
    readonly createdAt: FieldRef<"GuestVerification", 'DateTime'>
    readonly verifiedAt: FieldRef<"GuestVerification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GuestVerification findUnique
   */
  export type GuestVerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestVerification
     */
    select?: GuestVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestVerification
     */
    omit?: GuestVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestVerificationInclude<ExtArgs> | null
    /**
     * Filter, which GuestVerification to fetch.
     */
    where: GuestVerificationWhereUniqueInput
  }

  /**
   * GuestVerification findUniqueOrThrow
   */
  export type GuestVerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestVerification
     */
    select?: GuestVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestVerification
     */
    omit?: GuestVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestVerificationInclude<ExtArgs> | null
    /**
     * Filter, which GuestVerification to fetch.
     */
    where: GuestVerificationWhereUniqueInput
  }

  /**
   * GuestVerification findFirst
   */
  export type GuestVerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestVerification
     */
    select?: GuestVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestVerification
     */
    omit?: GuestVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestVerificationInclude<ExtArgs> | null
    /**
     * Filter, which GuestVerification to fetch.
     */
    where?: GuestVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuestVerifications to fetch.
     */
    orderBy?: GuestVerificationOrderByWithRelationInput | GuestVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuestVerifications.
     */
    cursor?: GuestVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuestVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuestVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuestVerifications.
     */
    distinct?: GuestVerificationScalarFieldEnum | GuestVerificationScalarFieldEnum[]
  }

  /**
   * GuestVerification findFirstOrThrow
   */
  export type GuestVerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestVerification
     */
    select?: GuestVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestVerification
     */
    omit?: GuestVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestVerificationInclude<ExtArgs> | null
    /**
     * Filter, which GuestVerification to fetch.
     */
    where?: GuestVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuestVerifications to fetch.
     */
    orderBy?: GuestVerificationOrderByWithRelationInput | GuestVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuestVerifications.
     */
    cursor?: GuestVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuestVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuestVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuestVerifications.
     */
    distinct?: GuestVerificationScalarFieldEnum | GuestVerificationScalarFieldEnum[]
  }

  /**
   * GuestVerification findMany
   */
  export type GuestVerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestVerification
     */
    select?: GuestVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestVerification
     */
    omit?: GuestVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestVerificationInclude<ExtArgs> | null
    /**
     * Filter, which GuestVerifications to fetch.
     */
    where?: GuestVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuestVerifications to fetch.
     */
    orderBy?: GuestVerificationOrderByWithRelationInput | GuestVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GuestVerifications.
     */
    cursor?: GuestVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuestVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuestVerifications.
     */
    skip?: number
    distinct?: GuestVerificationScalarFieldEnum | GuestVerificationScalarFieldEnum[]
  }

  /**
   * GuestVerification create
   */
  export type GuestVerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestVerification
     */
    select?: GuestVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestVerification
     */
    omit?: GuestVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestVerificationInclude<ExtArgs> | null
    /**
     * The data needed to create a GuestVerification.
     */
    data: XOR<GuestVerificationCreateInput, GuestVerificationUncheckedCreateInput>
  }

  /**
   * GuestVerification createMany
   */
  export type GuestVerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GuestVerifications.
     */
    data: GuestVerificationCreateManyInput | GuestVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GuestVerification createManyAndReturn
   */
  export type GuestVerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestVerification
     */
    select?: GuestVerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GuestVerification
     */
    omit?: GuestVerificationOmit<ExtArgs> | null
    /**
     * The data used to create many GuestVerifications.
     */
    data: GuestVerificationCreateManyInput | GuestVerificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestVerificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GuestVerification update
   */
  export type GuestVerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestVerification
     */
    select?: GuestVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestVerification
     */
    omit?: GuestVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestVerificationInclude<ExtArgs> | null
    /**
     * The data needed to update a GuestVerification.
     */
    data: XOR<GuestVerificationUpdateInput, GuestVerificationUncheckedUpdateInput>
    /**
     * Choose, which GuestVerification to update.
     */
    where: GuestVerificationWhereUniqueInput
  }

  /**
   * GuestVerification updateMany
   */
  export type GuestVerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GuestVerifications.
     */
    data: XOR<GuestVerificationUpdateManyMutationInput, GuestVerificationUncheckedUpdateManyInput>
    /**
     * Filter which GuestVerifications to update
     */
    where?: GuestVerificationWhereInput
    /**
     * Limit how many GuestVerifications to update.
     */
    limit?: number
  }

  /**
   * GuestVerification updateManyAndReturn
   */
  export type GuestVerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestVerification
     */
    select?: GuestVerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GuestVerification
     */
    omit?: GuestVerificationOmit<ExtArgs> | null
    /**
     * The data used to update GuestVerifications.
     */
    data: XOR<GuestVerificationUpdateManyMutationInput, GuestVerificationUncheckedUpdateManyInput>
    /**
     * Filter which GuestVerifications to update
     */
    where?: GuestVerificationWhereInput
    /**
     * Limit how many GuestVerifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestVerificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GuestVerification upsert
   */
  export type GuestVerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestVerification
     */
    select?: GuestVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestVerification
     */
    omit?: GuestVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestVerificationInclude<ExtArgs> | null
    /**
     * The filter to search for the GuestVerification to update in case it exists.
     */
    where: GuestVerificationWhereUniqueInput
    /**
     * In case the GuestVerification found by the `where` argument doesn't exist, create a new GuestVerification with this data.
     */
    create: XOR<GuestVerificationCreateInput, GuestVerificationUncheckedCreateInput>
    /**
     * In case the GuestVerification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuestVerificationUpdateInput, GuestVerificationUncheckedUpdateInput>
  }

  /**
   * GuestVerification delete
   */
  export type GuestVerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestVerification
     */
    select?: GuestVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestVerification
     */
    omit?: GuestVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestVerificationInclude<ExtArgs> | null
    /**
     * Filter which GuestVerification to delete.
     */
    where: GuestVerificationWhereUniqueInput
  }

  /**
   * GuestVerification deleteMany
   */
  export type GuestVerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuestVerifications to delete
     */
    where?: GuestVerificationWhereInput
    /**
     * Limit how many GuestVerifications to delete.
     */
    limit?: number
  }

  /**
   * GuestVerification without action
   */
  export type GuestVerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestVerification
     */
    select?: GuestVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestVerification
     */
    omit?: GuestVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuestVerificationInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    bookingId: string | null
    guestName: string | null
    rating: number | null
    comment: string | null
    source: string | null
    sourceLabel: string | null
    createdAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    bookingId: string | null
    guestName: string | null
    rating: number | null
    comment: string | null
    source: string | null
    sourceLabel: string | null
    createdAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    propertyId: number
    bookingId: number
    guestName: number
    rating: number
    comment: number
    source: number
    sourceLabel: number
    createdAt: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    propertyId?: true
    bookingId?: true
    guestName?: true
    rating?: true
    comment?: true
    source?: true
    sourceLabel?: true
    createdAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    propertyId?: true
    bookingId?: true
    guestName?: true
    rating?: true
    comment?: true
    source?: true
    sourceLabel?: true
    createdAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    propertyId?: true
    bookingId?: true
    guestName?: true
    rating?: true
    comment?: true
    source?: true
    sourceLabel?: true
    createdAt?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    propertyId: string
    bookingId: string | null
    guestName: string
    rating: number
    comment: string
    source: string
    sourceLabel: string
    createdAt: Date
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    guestName?: boolean
    rating?: boolean
    comment?: boolean
    source?: boolean
    sourceLabel?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    guestName?: boolean
    rating?: boolean
    comment?: boolean
    source?: boolean
    sourceLabel?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    guestName?: boolean
    rating?: boolean
    comment?: boolean
    source?: boolean
    sourceLabel?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    propertyId?: boolean
    bookingId?: boolean
    guestName?: boolean
    rating?: boolean
    comment?: boolean
    source?: boolean
    sourceLabel?: boolean
    createdAt?: boolean
  }

  export type ReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "propertyId" | "bookingId" | "guestName" | "rating" | "comment" | "source" | "sourceLabel" | "createdAt", ExtArgs["result"]["review"]>
  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      bookingId: string | null
      guestName: string
      rating: number
      comment: string
      source: string
      sourceLabel: string
      createdAt: Date
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews and returns the data updated in the database.
     * @param {ReviewUpdateManyAndReturnArgs} args - Arguments to update many Reviews.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, ReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */ 
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly propertyId: FieldRef<"Review", 'String'>
    readonly bookingId: FieldRef<"Review", 'String'>
    readonly guestName: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly source: FieldRef<"Review", 'String'>
    readonly sourceLabel: FieldRef<"Review", 'String'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
  }

  /**
   * Review updateManyAndReturn
   */
  export type ReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model GuestProfile
   */

  export type AggregateGuestProfile = {
    _count: GuestProfileCountAggregateOutputType | null
    _min: GuestProfileMinAggregateOutputType | null
    _max: GuestProfileMaxAggregateOutputType | null
  }

  export type GuestProfileMinAggregateOutputType = {
    phone: string | null
    summary: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GuestProfileMaxAggregateOutputType = {
    phone: string | null
    summary: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GuestProfileCountAggregateOutputType = {
    phone: number
    names: number
    emails: number
    preferences: number
    summary: number
    stayHistory: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GuestProfileMinAggregateInputType = {
    phone?: true
    summary?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GuestProfileMaxAggregateInputType = {
    phone?: true
    summary?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GuestProfileCountAggregateInputType = {
    phone?: true
    names?: true
    emails?: true
    preferences?: true
    summary?: true
    stayHistory?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GuestProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuestProfile to aggregate.
     */
    where?: GuestProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuestProfiles to fetch.
     */
    orderBy?: GuestProfileOrderByWithRelationInput | GuestProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuestProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuestProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuestProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GuestProfiles
    **/
    _count?: true | GuestProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuestProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuestProfileMaxAggregateInputType
  }

  export type GetGuestProfileAggregateType<T extends GuestProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateGuestProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuestProfile[P]>
      : GetScalarType<T[P], AggregateGuestProfile[P]>
  }




  export type GuestProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuestProfileWhereInput
    orderBy?: GuestProfileOrderByWithAggregationInput | GuestProfileOrderByWithAggregationInput[]
    by: GuestProfileScalarFieldEnum[] | GuestProfileScalarFieldEnum
    having?: GuestProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuestProfileCountAggregateInputType | true
    _min?: GuestProfileMinAggregateInputType
    _max?: GuestProfileMaxAggregateInputType
  }

  export type GuestProfileGroupByOutputType = {
    phone: string
    names: string[]
    emails: string[]
    preferences: string[]
    summary: string | null
    stayHistory: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: GuestProfileCountAggregateOutputType | null
    _min: GuestProfileMinAggregateOutputType | null
    _max: GuestProfileMaxAggregateOutputType | null
  }

  type GetGuestProfileGroupByPayload<T extends GuestProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuestProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuestProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuestProfileGroupByOutputType[P]>
            : GetScalarType<T[P], GuestProfileGroupByOutputType[P]>
        }
      >
    >


  export type GuestProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    phone?: boolean
    names?: boolean
    emails?: boolean
    preferences?: boolean
    summary?: boolean
    stayHistory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["guestProfile"]>

  export type GuestProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    phone?: boolean
    names?: boolean
    emails?: boolean
    preferences?: boolean
    summary?: boolean
    stayHistory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["guestProfile"]>

  export type GuestProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    phone?: boolean
    names?: boolean
    emails?: boolean
    preferences?: boolean
    summary?: boolean
    stayHistory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["guestProfile"]>

  export type GuestProfileSelectScalar = {
    phone?: boolean
    names?: boolean
    emails?: boolean
    preferences?: boolean
    summary?: boolean
    stayHistory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GuestProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"phone" | "names" | "emails" | "preferences" | "summary" | "stayHistory" | "createdAt" | "updatedAt", ExtArgs["result"]["guestProfile"]>

  export type $GuestProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GuestProfile"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      phone: string
      names: string[]
      emails: string[]
      preferences: string[]
      summary: string | null
      stayHistory: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["guestProfile"]>
    composites: {}
  }

  type GuestProfileGetPayload<S extends boolean | null | undefined | GuestProfileDefaultArgs> = $Result.GetResult<Prisma.$GuestProfilePayload, S>

  type GuestProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GuestProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GuestProfileCountAggregateInputType | true
    }

  export interface GuestProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GuestProfile'], meta: { name: 'GuestProfile' } }
    /**
     * Find zero or one GuestProfile that matches the filter.
     * @param {GuestProfileFindUniqueArgs} args - Arguments to find a GuestProfile
     * @example
     * // Get one GuestProfile
     * const guestProfile = await prisma.guestProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuestProfileFindUniqueArgs>(args: SelectSubset<T, GuestProfileFindUniqueArgs<ExtArgs>>): Prisma__GuestProfileClient<$Result.GetResult<Prisma.$GuestProfilePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one GuestProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GuestProfileFindUniqueOrThrowArgs} args - Arguments to find a GuestProfile
     * @example
     * // Get one GuestProfile
     * const guestProfile = await prisma.guestProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuestProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, GuestProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuestProfileClient<$Result.GetResult<Prisma.$GuestProfilePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first GuestProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestProfileFindFirstArgs} args - Arguments to find a GuestProfile
     * @example
     * // Get one GuestProfile
     * const guestProfile = await prisma.guestProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuestProfileFindFirstArgs>(args?: SelectSubset<T, GuestProfileFindFirstArgs<ExtArgs>>): Prisma__GuestProfileClient<$Result.GetResult<Prisma.$GuestProfilePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first GuestProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestProfileFindFirstOrThrowArgs} args - Arguments to find a GuestProfile
     * @example
     * // Get one GuestProfile
     * const guestProfile = await prisma.guestProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuestProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, GuestProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuestProfileClient<$Result.GetResult<Prisma.$GuestProfilePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more GuestProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GuestProfiles
     * const guestProfiles = await prisma.guestProfile.findMany()
     * 
     * // Get first 10 GuestProfiles
     * const guestProfiles = await prisma.guestProfile.findMany({ take: 10 })
     * 
     * // Only select the `phone`
     * const guestProfileWithPhoneOnly = await prisma.guestProfile.findMany({ select: { phone: true } })
     * 
     */
    findMany<T extends GuestProfileFindManyArgs>(args?: SelectSubset<T, GuestProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestProfilePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a GuestProfile.
     * @param {GuestProfileCreateArgs} args - Arguments to create a GuestProfile.
     * @example
     * // Create one GuestProfile
     * const GuestProfile = await prisma.guestProfile.create({
     *   data: {
     *     // ... data to create a GuestProfile
     *   }
     * })
     * 
     */
    create<T extends GuestProfileCreateArgs>(args: SelectSubset<T, GuestProfileCreateArgs<ExtArgs>>): Prisma__GuestProfileClient<$Result.GetResult<Prisma.$GuestProfilePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many GuestProfiles.
     * @param {GuestProfileCreateManyArgs} args - Arguments to create many GuestProfiles.
     * @example
     * // Create many GuestProfiles
     * const guestProfile = await prisma.guestProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuestProfileCreateManyArgs>(args?: SelectSubset<T, GuestProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GuestProfiles and returns the data saved in the database.
     * @param {GuestProfileCreateManyAndReturnArgs} args - Arguments to create many GuestProfiles.
     * @example
     * // Create many GuestProfiles
     * const guestProfile = await prisma.guestProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GuestProfiles and only return the `phone`
     * const guestProfileWithPhoneOnly = await prisma.guestProfile.createManyAndReturn({
     *   select: { phone: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GuestProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, GuestProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestProfilePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a GuestProfile.
     * @param {GuestProfileDeleteArgs} args - Arguments to delete one GuestProfile.
     * @example
     * // Delete one GuestProfile
     * const GuestProfile = await prisma.guestProfile.delete({
     *   where: {
     *     // ... filter to delete one GuestProfile
     *   }
     * })
     * 
     */
    delete<T extends GuestProfileDeleteArgs>(args: SelectSubset<T, GuestProfileDeleteArgs<ExtArgs>>): Prisma__GuestProfileClient<$Result.GetResult<Prisma.$GuestProfilePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one GuestProfile.
     * @param {GuestProfileUpdateArgs} args - Arguments to update one GuestProfile.
     * @example
     * // Update one GuestProfile
     * const guestProfile = await prisma.guestProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuestProfileUpdateArgs>(args: SelectSubset<T, GuestProfileUpdateArgs<ExtArgs>>): Prisma__GuestProfileClient<$Result.GetResult<Prisma.$GuestProfilePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more GuestProfiles.
     * @param {GuestProfileDeleteManyArgs} args - Arguments to filter GuestProfiles to delete.
     * @example
     * // Delete a few GuestProfiles
     * const { count } = await prisma.guestProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuestProfileDeleteManyArgs>(args?: SelectSubset<T, GuestProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuestProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GuestProfiles
     * const guestProfile = await prisma.guestProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuestProfileUpdateManyArgs>(args: SelectSubset<T, GuestProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuestProfiles and returns the data updated in the database.
     * @param {GuestProfileUpdateManyAndReturnArgs} args - Arguments to update many GuestProfiles.
     * @example
     * // Update many GuestProfiles
     * const guestProfile = await prisma.guestProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GuestProfiles and only return the `phone`
     * const guestProfileWithPhoneOnly = await prisma.guestProfile.updateManyAndReturn({
     *   select: { phone: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GuestProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, GuestProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestProfilePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one GuestProfile.
     * @param {GuestProfileUpsertArgs} args - Arguments to update or create a GuestProfile.
     * @example
     * // Update or create a GuestProfile
     * const guestProfile = await prisma.guestProfile.upsert({
     *   create: {
     *     // ... data to create a GuestProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GuestProfile we want to update
     *   }
     * })
     */
    upsert<T extends GuestProfileUpsertArgs>(args: SelectSubset<T, GuestProfileUpsertArgs<ExtArgs>>): Prisma__GuestProfileClient<$Result.GetResult<Prisma.$GuestProfilePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of GuestProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestProfileCountArgs} args - Arguments to filter GuestProfiles to count.
     * @example
     * // Count the number of GuestProfiles
     * const count = await prisma.guestProfile.count({
     *   where: {
     *     // ... the filter for the GuestProfiles we want to count
     *   }
     * })
    **/
    count<T extends GuestProfileCountArgs>(
      args?: Subset<T, GuestProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuestProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GuestProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuestProfileAggregateArgs>(args: Subset<T, GuestProfileAggregateArgs>): Prisma.PrismaPromise<GetGuestProfileAggregateType<T>>

    /**
     * Group by GuestProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GuestProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuestProfileGroupByArgs['orderBy'] }
        : { orderBy?: GuestProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GuestProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuestProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GuestProfile model
   */
  readonly fields: GuestProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GuestProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuestProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GuestProfile model
   */ 
  interface GuestProfileFieldRefs {
    readonly phone: FieldRef<"GuestProfile", 'String'>
    readonly names: FieldRef<"GuestProfile", 'String[]'>
    readonly emails: FieldRef<"GuestProfile", 'String[]'>
    readonly preferences: FieldRef<"GuestProfile", 'String[]'>
    readonly summary: FieldRef<"GuestProfile", 'String'>
    readonly stayHistory: FieldRef<"GuestProfile", 'Json'>
    readonly createdAt: FieldRef<"GuestProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"GuestProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GuestProfile findUnique
   */
  export type GuestProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestProfile
     */
    select?: GuestProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestProfile
     */
    omit?: GuestProfileOmit<ExtArgs> | null
    /**
     * Filter, which GuestProfile to fetch.
     */
    where: GuestProfileWhereUniqueInput
  }

  /**
   * GuestProfile findUniqueOrThrow
   */
  export type GuestProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestProfile
     */
    select?: GuestProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestProfile
     */
    omit?: GuestProfileOmit<ExtArgs> | null
    /**
     * Filter, which GuestProfile to fetch.
     */
    where: GuestProfileWhereUniqueInput
  }

  /**
   * GuestProfile findFirst
   */
  export type GuestProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestProfile
     */
    select?: GuestProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestProfile
     */
    omit?: GuestProfileOmit<ExtArgs> | null
    /**
     * Filter, which GuestProfile to fetch.
     */
    where?: GuestProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuestProfiles to fetch.
     */
    orderBy?: GuestProfileOrderByWithRelationInput | GuestProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuestProfiles.
     */
    cursor?: GuestProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuestProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuestProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuestProfiles.
     */
    distinct?: GuestProfileScalarFieldEnum | GuestProfileScalarFieldEnum[]
  }

  /**
   * GuestProfile findFirstOrThrow
   */
  export type GuestProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestProfile
     */
    select?: GuestProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestProfile
     */
    omit?: GuestProfileOmit<ExtArgs> | null
    /**
     * Filter, which GuestProfile to fetch.
     */
    where?: GuestProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuestProfiles to fetch.
     */
    orderBy?: GuestProfileOrderByWithRelationInput | GuestProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuestProfiles.
     */
    cursor?: GuestProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuestProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuestProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuestProfiles.
     */
    distinct?: GuestProfileScalarFieldEnum | GuestProfileScalarFieldEnum[]
  }

  /**
   * GuestProfile findMany
   */
  export type GuestProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestProfile
     */
    select?: GuestProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestProfile
     */
    omit?: GuestProfileOmit<ExtArgs> | null
    /**
     * Filter, which GuestProfiles to fetch.
     */
    where?: GuestProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuestProfiles to fetch.
     */
    orderBy?: GuestProfileOrderByWithRelationInput | GuestProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GuestProfiles.
     */
    cursor?: GuestProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuestProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuestProfiles.
     */
    skip?: number
    distinct?: GuestProfileScalarFieldEnum | GuestProfileScalarFieldEnum[]
  }

  /**
   * GuestProfile create
   */
  export type GuestProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestProfile
     */
    select?: GuestProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestProfile
     */
    omit?: GuestProfileOmit<ExtArgs> | null
    /**
     * The data needed to create a GuestProfile.
     */
    data: XOR<GuestProfileCreateInput, GuestProfileUncheckedCreateInput>
  }

  /**
   * GuestProfile createMany
   */
  export type GuestProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GuestProfiles.
     */
    data: GuestProfileCreateManyInput | GuestProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GuestProfile createManyAndReturn
   */
  export type GuestProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestProfile
     */
    select?: GuestProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GuestProfile
     */
    omit?: GuestProfileOmit<ExtArgs> | null
    /**
     * The data used to create many GuestProfiles.
     */
    data: GuestProfileCreateManyInput | GuestProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GuestProfile update
   */
  export type GuestProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestProfile
     */
    select?: GuestProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestProfile
     */
    omit?: GuestProfileOmit<ExtArgs> | null
    /**
     * The data needed to update a GuestProfile.
     */
    data: XOR<GuestProfileUpdateInput, GuestProfileUncheckedUpdateInput>
    /**
     * Choose, which GuestProfile to update.
     */
    where: GuestProfileWhereUniqueInput
  }

  /**
   * GuestProfile updateMany
   */
  export type GuestProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GuestProfiles.
     */
    data: XOR<GuestProfileUpdateManyMutationInput, GuestProfileUncheckedUpdateManyInput>
    /**
     * Filter which GuestProfiles to update
     */
    where?: GuestProfileWhereInput
    /**
     * Limit how many GuestProfiles to update.
     */
    limit?: number
  }

  /**
   * GuestProfile updateManyAndReturn
   */
  export type GuestProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestProfile
     */
    select?: GuestProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GuestProfile
     */
    omit?: GuestProfileOmit<ExtArgs> | null
    /**
     * The data used to update GuestProfiles.
     */
    data: XOR<GuestProfileUpdateManyMutationInput, GuestProfileUncheckedUpdateManyInput>
    /**
     * Filter which GuestProfiles to update
     */
    where?: GuestProfileWhereInput
    /**
     * Limit how many GuestProfiles to update.
     */
    limit?: number
  }

  /**
   * GuestProfile upsert
   */
  export type GuestProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestProfile
     */
    select?: GuestProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestProfile
     */
    omit?: GuestProfileOmit<ExtArgs> | null
    /**
     * The filter to search for the GuestProfile to update in case it exists.
     */
    where: GuestProfileWhereUniqueInput
    /**
     * In case the GuestProfile found by the `where` argument doesn't exist, create a new GuestProfile with this data.
     */
    create: XOR<GuestProfileCreateInput, GuestProfileUncheckedCreateInput>
    /**
     * In case the GuestProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuestProfileUpdateInput, GuestProfileUncheckedUpdateInput>
  }

  /**
   * GuestProfile delete
   */
  export type GuestProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestProfile
     */
    select?: GuestProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestProfile
     */
    omit?: GuestProfileOmit<ExtArgs> | null
    /**
     * Filter which GuestProfile to delete.
     */
    where: GuestProfileWhereUniqueInput
  }

  /**
   * GuestProfile deleteMany
   */
  export type GuestProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuestProfiles to delete
     */
    where?: GuestProfileWhereInput
    /**
     * Limit how many GuestProfiles to delete.
     */
    limit?: number
  }

  /**
   * GuestProfile without action
   */
  export type GuestProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuestProfile
     */
    select?: GuestProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuestProfile
     */
    omit?: GuestProfileOmit<ExtArgs> | null
  }


  /**
   * Model HostKnowledge
   */

  export type AggregateHostKnowledge = {
    _count: HostKnowledgeCountAggregateOutputType | null
    _min: HostKnowledgeMinAggregateOutputType | null
    _max: HostKnowledgeMaxAggregateOutputType | null
  }

  export type HostKnowledgeMinAggregateOutputType = {
    id: string | null
    hostId: string | null
    propertyId: string | null
    content: string | null
    updatedAt: Date | null
  }

  export type HostKnowledgeMaxAggregateOutputType = {
    id: string | null
    hostId: string | null
    propertyId: string | null
    content: string | null
    updatedAt: Date | null
  }

  export type HostKnowledgeCountAggregateOutputType = {
    id: number
    hostId: number
    propertyId: number
    content: number
    updatedAt: number
    _all: number
  }


  export type HostKnowledgeMinAggregateInputType = {
    id?: true
    hostId?: true
    propertyId?: true
    content?: true
    updatedAt?: true
  }

  export type HostKnowledgeMaxAggregateInputType = {
    id?: true
    hostId?: true
    propertyId?: true
    content?: true
    updatedAt?: true
  }

  export type HostKnowledgeCountAggregateInputType = {
    id?: true
    hostId?: true
    propertyId?: true
    content?: true
    updatedAt?: true
    _all?: true
  }

  export type HostKnowledgeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HostKnowledge to aggregate.
     */
    where?: HostKnowledgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HostKnowledges to fetch.
     */
    orderBy?: HostKnowledgeOrderByWithRelationInput | HostKnowledgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HostKnowledgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HostKnowledges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HostKnowledges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HostKnowledges
    **/
    _count?: true | HostKnowledgeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HostKnowledgeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HostKnowledgeMaxAggregateInputType
  }

  export type GetHostKnowledgeAggregateType<T extends HostKnowledgeAggregateArgs> = {
        [P in keyof T & keyof AggregateHostKnowledge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHostKnowledge[P]>
      : GetScalarType<T[P], AggregateHostKnowledge[P]>
  }




  export type HostKnowledgeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HostKnowledgeWhereInput
    orderBy?: HostKnowledgeOrderByWithAggregationInput | HostKnowledgeOrderByWithAggregationInput[]
    by: HostKnowledgeScalarFieldEnum[] | HostKnowledgeScalarFieldEnum
    having?: HostKnowledgeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HostKnowledgeCountAggregateInputType | true
    _min?: HostKnowledgeMinAggregateInputType
    _max?: HostKnowledgeMaxAggregateInputType
  }

  export type HostKnowledgeGroupByOutputType = {
    id: string
    hostId: string
    propertyId: string
    content: string
    updatedAt: Date
    _count: HostKnowledgeCountAggregateOutputType | null
    _min: HostKnowledgeMinAggregateOutputType | null
    _max: HostKnowledgeMaxAggregateOutputType | null
  }

  type GetHostKnowledgeGroupByPayload<T extends HostKnowledgeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HostKnowledgeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HostKnowledgeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HostKnowledgeGroupByOutputType[P]>
            : GetScalarType<T[P], HostKnowledgeGroupByOutputType[P]>
        }
      >
    >


  export type HostKnowledgeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hostId?: boolean
    propertyId?: boolean
    content?: boolean
    updatedAt?: boolean
    host?: boolean | HostDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hostKnowledge"]>

  export type HostKnowledgeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hostId?: boolean
    propertyId?: boolean
    content?: boolean
    updatedAt?: boolean
    host?: boolean | HostDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hostKnowledge"]>

  export type HostKnowledgeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hostId?: boolean
    propertyId?: boolean
    content?: boolean
    updatedAt?: boolean
    host?: boolean | HostDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hostKnowledge"]>

  export type HostKnowledgeSelectScalar = {
    id?: boolean
    hostId?: boolean
    propertyId?: boolean
    content?: boolean
    updatedAt?: boolean
  }

  export type HostKnowledgeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hostId" | "propertyId" | "content" | "updatedAt", ExtArgs["result"]["hostKnowledge"]>
  export type HostKnowledgeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | HostDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type HostKnowledgeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | HostDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type HostKnowledgeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    host?: boolean | HostDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $HostKnowledgePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HostKnowledge"
    objects: {
      host: Prisma.$HostPayload<ExtArgs>
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      hostId: string
      propertyId: string
      content: string
      updatedAt: Date
    }, ExtArgs["result"]["hostKnowledge"]>
    composites: {}
  }

  type HostKnowledgeGetPayload<S extends boolean | null | undefined | HostKnowledgeDefaultArgs> = $Result.GetResult<Prisma.$HostKnowledgePayload, S>

  type HostKnowledgeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HostKnowledgeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HostKnowledgeCountAggregateInputType | true
    }

  export interface HostKnowledgeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HostKnowledge'], meta: { name: 'HostKnowledge' } }
    /**
     * Find zero or one HostKnowledge that matches the filter.
     * @param {HostKnowledgeFindUniqueArgs} args - Arguments to find a HostKnowledge
     * @example
     * // Get one HostKnowledge
     * const hostKnowledge = await prisma.hostKnowledge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HostKnowledgeFindUniqueArgs>(args: SelectSubset<T, HostKnowledgeFindUniqueArgs<ExtArgs>>): Prisma__HostKnowledgeClient<$Result.GetResult<Prisma.$HostKnowledgePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one HostKnowledge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HostKnowledgeFindUniqueOrThrowArgs} args - Arguments to find a HostKnowledge
     * @example
     * // Get one HostKnowledge
     * const hostKnowledge = await prisma.hostKnowledge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HostKnowledgeFindUniqueOrThrowArgs>(args: SelectSubset<T, HostKnowledgeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HostKnowledgeClient<$Result.GetResult<Prisma.$HostKnowledgePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first HostKnowledge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HostKnowledgeFindFirstArgs} args - Arguments to find a HostKnowledge
     * @example
     * // Get one HostKnowledge
     * const hostKnowledge = await prisma.hostKnowledge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HostKnowledgeFindFirstArgs>(args?: SelectSubset<T, HostKnowledgeFindFirstArgs<ExtArgs>>): Prisma__HostKnowledgeClient<$Result.GetResult<Prisma.$HostKnowledgePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first HostKnowledge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HostKnowledgeFindFirstOrThrowArgs} args - Arguments to find a HostKnowledge
     * @example
     * // Get one HostKnowledge
     * const hostKnowledge = await prisma.hostKnowledge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HostKnowledgeFindFirstOrThrowArgs>(args?: SelectSubset<T, HostKnowledgeFindFirstOrThrowArgs<ExtArgs>>): Prisma__HostKnowledgeClient<$Result.GetResult<Prisma.$HostKnowledgePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more HostKnowledges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HostKnowledgeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HostKnowledges
     * const hostKnowledges = await prisma.hostKnowledge.findMany()
     * 
     * // Get first 10 HostKnowledges
     * const hostKnowledges = await prisma.hostKnowledge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hostKnowledgeWithIdOnly = await prisma.hostKnowledge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HostKnowledgeFindManyArgs>(args?: SelectSubset<T, HostKnowledgeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HostKnowledgePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a HostKnowledge.
     * @param {HostKnowledgeCreateArgs} args - Arguments to create a HostKnowledge.
     * @example
     * // Create one HostKnowledge
     * const HostKnowledge = await prisma.hostKnowledge.create({
     *   data: {
     *     // ... data to create a HostKnowledge
     *   }
     * })
     * 
     */
    create<T extends HostKnowledgeCreateArgs>(args: SelectSubset<T, HostKnowledgeCreateArgs<ExtArgs>>): Prisma__HostKnowledgeClient<$Result.GetResult<Prisma.$HostKnowledgePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many HostKnowledges.
     * @param {HostKnowledgeCreateManyArgs} args - Arguments to create many HostKnowledges.
     * @example
     * // Create many HostKnowledges
     * const hostKnowledge = await prisma.hostKnowledge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HostKnowledgeCreateManyArgs>(args?: SelectSubset<T, HostKnowledgeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HostKnowledges and returns the data saved in the database.
     * @param {HostKnowledgeCreateManyAndReturnArgs} args - Arguments to create many HostKnowledges.
     * @example
     * // Create many HostKnowledges
     * const hostKnowledge = await prisma.hostKnowledge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HostKnowledges and only return the `id`
     * const hostKnowledgeWithIdOnly = await prisma.hostKnowledge.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HostKnowledgeCreateManyAndReturnArgs>(args?: SelectSubset<T, HostKnowledgeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HostKnowledgePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a HostKnowledge.
     * @param {HostKnowledgeDeleteArgs} args - Arguments to delete one HostKnowledge.
     * @example
     * // Delete one HostKnowledge
     * const HostKnowledge = await prisma.hostKnowledge.delete({
     *   where: {
     *     // ... filter to delete one HostKnowledge
     *   }
     * })
     * 
     */
    delete<T extends HostKnowledgeDeleteArgs>(args: SelectSubset<T, HostKnowledgeDeleteArgs<ExtArgs>>): Prisma__HostKnowledgeClient<$Result.GetResult<Prisma.$HostKnowledgePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one HostKnowledge.
     * @param {HostKnowledgeUpdateArgs} args - Arguments to update one HostKnowledge.
     * @example
     * // Update one HostKnowledge
     * const hostKnowledge = await prisma.hostKnowledge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HostKnowledgeUpdateArgs>(args: SelectSubset<T, HostKnowledgeUpdateArgs<ExtArgs>>): Prisma__HostKnowledgeClient<$Result.GetResult<Prisma.$HostKnowledgePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more HostKnowledges.
     * @param {HostKnowledgeDeleteManyArgs} args - Arguments to filter HostKnowledges to delete.
     * @example
     * // Delete a few HostKnowledges
     * const { count } = await prisma.hostKnowledge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HostKnowledgeDeleteManyArgs>(args?: SelectSubset<T, HostKnowledgeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HostKnowledges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HostKnowledgeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HostKnowledges
     * const hostKnowledge = await prisma.hostKnowledge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HostKnowledgeUpdateManyArgs>(args: SelectSubset<T, HostKnowledgeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HostKnowledges and returns the data updated in the database.
     * @param {HostKnowledgeUpdateManyAndReturnArgs} args - Arguments to update many HostKnowledges.
     * @example
     * // Update many HostKnowledges
     * const hostKnowledge = await prisma.hostKnowledge.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HostKnowledges and only return the `id`
     * const hostKnowledgeWithIdOnly = await prisma.hostKnowledge.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HostKnowledgeUpdateManyAndReturnArgs>(args: SelectSubset<T, HostKnowledgeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HostKnowledgePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one HostKnowledge.
     * @param {HostKnowledgeUpsertArgs} args - Arguments to update or create a HostKnowledge.
     * @example
     * // Update or create a HostKnowledge
     * const hostKnowledge = await prisma.hostKnowledge.upsert({
     *   create: {
     *     // ... data to create a HostKnowledge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HostKnowledge we want to update
     *   }
     * })
     */
    upsert<T extends HostKnowledgeUpsertArgs>(args: SelectSubset<T, HostKnowledgeUpsertArgs<ExtArgs>>): Prisma__HostKnowledgeClient<$Result.GetResult<Prisma.$HostKnowledgePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of HostKnowledges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HostKnowledgeCountArgs} args - Arguments to filter HostKnowledges to count.
     * @example
     * // Count the number of HostKnowledges
     * const count = await prisma.hostKnowledge.count({
     *   where: {
     *     // ... the filter for the HostKnowledges we want to count
     *   }
     * })
    **/
    count<T extends HostKnowledgeCountArgs>(
      args?: Subset<T, HostKnowledgeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HostKnowledgeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HostKnowledge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HostKnowledgeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HostKnowledgeAggregateArgs>(args: Subset<T, HostKnowledgeAggregateArgs>): Prisma.PrismaPromise<GetHostKnowledgeAggregateType<T>>

    /**
     * Group by HostKnowledge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HostKnowledgeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HostKnowledgeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HostKnowledgeGroupByArgs['orderBy'] }
        : { orderBy?: HostKnowledgeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HostKnowledgeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHostKnowledgeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HostKnowledge model
   */
  readonly fields: HostKnowledgeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HostKnowledge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HostKnowledgeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    host<T extends HostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HostDefaultArgs<ExtArgs>>): Prisma__HostClient<$Result.GetResult<Prisma.$HostPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HostKnowledge model
   */ 
  interface HostKnowledgeFieldRefs {
    readonly id: FieldRef<"HostKnowledge", 'String'>
    readonly hostId: FieldRef<"HostKnowledge", 'String'>
    readonly propertyId: FieldRef<"HostKnowledge", 'String'>
    readonly content: FieldRef<"HostKnowledge", 'String'>
    readonly updatedAt: FieldRef<"HostKnowledge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HostKnowledge findUnique
   */
  export type HostKnowledgeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HostKnowledge
     */
    select?: HostKnowledgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HostKnowledge
     */
    omit?: HostKnowledgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostKnowledgeInclude<ExtArgs> | null
    /**
     * Filter, which HostKnowledge to fetch.
     */
    where: HostKnowledgeWhereUniqueInput
  }

  /**
   * HostKnowledge findUniqueOrThrow
   */
  export type HostKnowledgeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HostKnowledge
     */
    select?: HostKnowledgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HostKnowledge
     */
    omit?: HostKnowledgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostKnowledgeInclude<ExtArgs> | null
    /**
     * Filter, which HostKnowledge to fetch.
     */
    where: HostKnowledgeWhereUniqueInput
  }

  /**
   * HostKnowledge findFirst
   */
  export type HostKnowledgeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HostKnowledge
     */
    select?: HostKnowledgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HostKnowledge
     */
    omit?: HostKnowledgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostKnowledgeInclude<ExtArgs> | null
    /**
     * Filter, which HostKnowledge to fetch.
     */
    where?: HostKnowledgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HostKnowledges to fetch.
     */
    orderBy?: HostKnowledgeOrderByWithRelationInput | HostKnowledgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HostKnowledges.
     */
    cursor?: HostKnowledgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HostKnowledges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HostKnowledges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HostKnowledges.
     */
    distinct?: HostKnowledgeScalarFieldEnum | HostKnowledgeScalarFieldEnum[]
  }

  /**
   * HostKnowledge findFirstOrThrow
   */
  export type HostKnowledgeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HostKnowledge
     */
    select?: HostKnowledgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HostKnowledge
     */
    omit?: HostKnowledgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostKnowledgeInclude<ExtArgs> | null
    /**
     * Filter, which HostKnowledge to fetch.
     */
    where?: HostKnowledgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HostKnowledges to fetch.
     */
    orderBy?: HostKnowledgeOrderByWithRelationInput | HostKnowledgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HostKnowledges.
     */
    cursor?: HostKnowledgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HostKnowledges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HostKnowledges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HostKnowledges.
     */
    distinct?: HostKnowledgeScalarFieldEnum | HostKnowledgeScalarFieldEnum[]
  }

  /**
   * HostKnowledge findMany
   */
  export type HostKnowledgeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HostKnowledge
     */
    select?: HostKnowledgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HostKnowledge
     */
    omit?: HostKnowledgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostKnowledgeInclude<ExtArgs> | null
    /**
     * Filter, which HostKnowledges to fetch.
     */
    where?: HostKnowledgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HostKnowledges to fetch.
     */
    orderBy?: HostKnowledgeOrderByWithRelationInput | HostKnowledgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HostKnowledges.
     */
    cursor?: HostKnowledgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HostKnowledges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HostKnowledges.
     */
    skip?: number
    distinct?: HostKnowledgeScalarFieldEnum | HostKnowledgeScalarFieldEnum[]
  }

  /**
   * HostKnowledge create
   */
  export type HostKnowledgeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HostKnowledge
     */
    select?: HostKnowledgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HostKnowledge
     */
    omit?: HostKnowledgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostKnowledgeInclude<ExtArgs> | null
    /**
     * The data needed to create a HostKnowledge.
     */
    data: XOR<HostKnowledgeCreateInput, HostKnowledgeUncheckedCreateInput>
  }

  /**
   * HostKnowledge createMany
   */
  export type HostKnowledgeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HostKnowledges.
     */
    data: HostKnowledgeCreateManyInput | HostKnowledgeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HostKnowledge createManyAndReturn
   */
  export type HostKnowledgeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HostKnowledge
     */
    select?: HostKnowledgeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HostKnowledge
     */
    omit?: HostKnowledgeOmit<ExtArgs> | null
    /**
     * The data used to create many HostKnowledges.
     */
    data: HostKnowledgeCreateManyInput | HostKnowledgeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostKnowledgeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HostKnowledge update
   */
  export type HostKnowledgeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HostKnowledge
     */
    select?: HostKnowledgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HostKnowledge
     */
    omit?: HostKnowledgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostKnowledgeInclude<ExtArgs> | null
    /**
     * The data needed to update a HostKnowledge.
     */
    data: XOR<HostKnowledgeUpdateInput, HostKnowledgeUncheckedUpdateInput>
    /**
     * Choose, which HostKnowledge to update.
     */
    where: HostKnowledgeWhereUniqueInput
  }

  /**
   * HostKnowledge updateMany
   */
  export type HostKnowledgeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HostKnowledges.
     */
    data: XOR<HostKnowledgeUpdateManyMutationInput, HostKnowledgeUncheckedUpdateManyInput>
    /**
     * Filter which HostKnowledges to update
     */
    where?: HostKnowledgeWhereInput
    /**
     * Limit how many HostKnowledges to update.
     */
    limit?: number
  }

  /**
   * HostKnowledge updateManyAndReturn
   */
  export type HostKnowledgeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HostKnowledge
     */
    select?: HostKnowledgeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HostKnowledge
     */
    omit?: HostKnowledgeOmit<ExtArgs> | null
    /**
     * The data used to update HostKnowledges.
     */
    data: XOR<HostKnowledgeUpdateManyMutationInput, HostKnowledgeUncheckedUpdateManyInput>
    /**
     * Filter which HostKnowledges to update
     */
    where?: HostKnowledgeWhereInput
    /**
     * Limit how many HostKnowledges to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostKnowledgeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HostKnowledge upsert
   */
  export type HostKnowledgeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HostKnowledge
     */
    select?: HostKnowledgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HostKnowledge
     */
    omit?: HostKnowledgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostKnowledgeInclude<ExtArgs> | null
    /**
     * The filter to search for the HostKnowledge to update in case it exists.
     */
    where: HostKnowledgeWhereUniqueInput
    /**
     * In case the HostKnowledge found by the `where` argument doesn't exist, create a new HostKnowledge with this data.
     */
    create: XOR<HostKnowledgeCreateInput, HostKnowledgeUncheckedCreateInput>
    /**
     * In case the HostKnowledge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HostKnowledgeUpdateInput, HostKnowledgeUncheckedUpdateInput>
  }

  /**
   * HostKnowledge delete
   */
  export type HostKnowledgeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HostKnowledge
     */
    select?: HostKnowledgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HostKnowledge
     */
    omit?: HostKnowledgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostKnowledgeInclude<ExtArgs> | null
    /**
     * Filter which HostKnowledge to delete.
     */
    where: HostKnowledgeWhereUniqueInput
  }

  /**
   * HostKnowledge deleteMany
   */
  export type HostKnowledgeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HostKnowledges to delete
     */
    where?: HostKnowledgeWhereInput
    /**
     * Limit how many HostKnowledges to delete.
     */
    limit?: number
  }

  /**
   * HostKnowledge without action
   */
  export type HostKnowledgeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HostKnowledge
     */
    select?: HostKnowledgeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HostKnowledge
     */
    omit?: HostKnowledgeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HostKnowledgeInclude<ExtArgs> | null
  }


  /**
   * Model Waitlist
   */

  export type AggregateWaitlist = {
    _count: WaitlistCountAggregateOutputType | null
    _min: WaitlistMinAggregateOutputType | null
    _max: WaitlistMaxAggregateOutputType | null
  }

  export type WaitlistMinAggregateOutputType = {
    id: string | null
    email: string | null
    phone: string | null
    interest: string | null
    createdAt: Date | null
  }

  export type WaitlistMaxAggregateOutputType = {
    id: string | null
    email: string | null
    phone: string | null
    interest: string | null
    createdAt: Date | null
  }

  export type WaitlistCountAggregateOutputType = {
    id: number
    email: number
    phone: number
    interest: number
    createdAt: number
    _all: number
  }


  export type WaitlistMinAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    interest?: true
    createdAt?: true
  }

  export type WaitlistMaxAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    interest?: true
    createdAt?: true
  }

  export type WaitlistCountAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    interest?: true
    createdAt?: true
    _all?: true
  }

  export type WaitlistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Waitlist to aggregate.
     */
    where?: WaitlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Waitlists to fetch.
     */
    orderBy?: WaitlistOrderByWithRelationInput | WaitlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WaitlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Waitlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Waitlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Waitlists
    **/
    _count?: true | WaitlistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WaitlistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WaitlistMaxAggregateInputType
  }

  export type GetWaitlistAggregateType<T extends WaitlistAggregateArgs> = {
        [P in keyof T & keyof AggregateWaitlist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWaitlist[P]>
      : GetScalarType<T[P], AggregateWaitlist[P]>
  }




  export type WaitlistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WaitlistWhereInput
    orderBy?: WaitlistOrderByWithAggregationInput | WaitlistOrderByWithAggregationInput[]
    by: WaitlistScalarFieldEnum[] | WaitlistScalarFieldEnum
    having?: WaitlistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WaitlistCountAggregateInputType | true
    _min?: WaitlistMinAggregateInputType
    _max?: WaitlistMaxAggregateInputType
  }

  export type WaitlistGroupByOutputType = {
    id: string
    email: string
    phone: string
    interest: string | null
    createdAt: Date
    _count: WaitlistCountAggregateOutputType | null
    _min: WaitlistMinAggregateOutputType | null
    _max: WaitlistMaxAggregateOutputType | null
  }

  type GetWaitlistGroupByPayload<T extends WaitlistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WaitlistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WaitlistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WaitlistGroupByOutputType[P]>
            : GetScalarType<T[P], WaitlistGroupByOutputType[P]>
        }
      >
    >


  export type WaitlistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    interest?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["waitlist"]>

  export type WaitlistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    interest?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["waitlist"]>

  export type WaitlistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    interest?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["waitlist"]>

  export type WaitlistSelectScalar = {
    id?: boolean
    email?: boolean
    phone?: boolean
    interest?: boolean
    createdAt?: boolean
  }

  export type WaitlistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "phone" | "interest" | "createdAt", ExtArgs["result"]["waitlist"]>

  export type $WaitlistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Waitlist"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      phone: string
      interest: string | null
      createdAt: Date
    }, ExtArgs["result"]["waitlist"]>
    composites: {}
  }

  type WaitlistGetPayload<S extends boolean | null | undefined | WaitlistDefaultArgs> = $Result.GetResult<Prisma.$WaitlistPayload, S>

  type WaitlistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WaitlistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WaitlistCountAggregateInputType | true
    }

  export interface WaitlistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Waitlist'], meta: { name: 'Waitlist' } }
    /**
     * Find zero or one Waitlist that matches the filter.
     * @param {WaitlistFindUniqueArgs} args - Arguments to find a Waitlist
     * @example
     * // Get one Waitlist
     * const waitlist = await prisma.waitlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WaitlistFindUniqueArgs>(args: SelectSubset<T, WaitlistFindUniqueArgs<ExtArgs>>): Prisma__WaitlistClient<$Result.GetResult<Prisma.$WaitlistPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Waitlist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WaitlistFindUniqueOrThrowArgs} args - Arguments to find a Waitlist
     * @example
     * // Get one Waitlist
     * const waitlist = await prisma.waitlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WaitlistFindUniqueOrThrowArgs>(args: SelectSubset<T, WaitlistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WaitlistClient<$Result.GetResult<Prisma.$WaitlistPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Waitlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaitlistFindFirstArgs} args - Arguments to find a Waitlist
     * @example
     * // Get one Waitlist
     * const waitlist = await prisma.waitlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WaitlistFindFirstArgs>(args?: SelectSubset<T, WaitlistFindFirstArgs<ExtArgs>>): Prisma__WaitlistClient<$Result.GetResult<Prisma.$WaitlistPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Waitlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaitlistFindFirstOrThrowArgs} args - Arguments to find a Waitlist
     * @example
     * // Get one Waitlist
     * const waitlist = await prisma.waitlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WaitlistFindFirstOrThrowArgs>(args?: SelectSubset<T, WaitlistFindFirstOrThrowArgs<ExtArgs>>): Prisma__WaitlistClient<$Result.GetResult<Prisma.$WaitlistPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Waitlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaitlistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Waitlists
     * const waitlists = await prisma.waitlist.findMany()
     * 
     * // Get first 10 Waitlists
     * const waitlists = await prisma.waitlist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const waitlistWithIdOnly = await prisma.waitlist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WaitlistFindManyArgs>(args?: SelectSubset<T, WaitlistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaitlistPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Waitlist.
     * @param {WaitlistCreateArgs} args - Arguments to create a Waitlist.
     * @example
     * // Create one Waitlist
     * const Waitlist = await prisma.waitlist.create({
     *   data: {
     *     // ... data to create a Waitlist
     *   }
     * })
     * 
     */
    create<T extends WaitlistCreateArgs>(args: SelectSubset<T, WaitlistCreateArgs<ExtArgs>>): Prisma__WaitlistClient<$Result.GetResult<Prisma.$WaitlistPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Waitlists.
     * @param {WaitlistCreateManyArgs} args - Arguments to create many Waitlists.
     * @example
     * // Create many Waitlists
     * const waitlist = await prisma.waitlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WaitlistCreateManyArgs>(args?: SelectSubset<T, WaitlistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Waitlists and returns the data saved in the database.
     * @param {WaitlistCreateManyAndReturnArgs} args - Arguments to create many Waitlists.
     * @example
     * // Create many Waitlists
     * const waitlist = await prisma.waitlist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Waitlists and only return the `id`
     * const waitlistWithIdOnly = await prisma.waitlist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WaitlistCreateManyAndReturnArgs>(args?: SelectSubset<T, WaitlistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaitlistPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Waitlist.
     * @param {WaitlistDeleteArgs} args - Arguments to delete one Waitlist.
     * @example
     * // Delete one Waitlist
     * const Waitlist = await prisma.waitlist.delete({
     *   where: {
     *     // ... filter to delete one Waitlist
     *   }
     * })
     * 
     */
    delete<T extends WaitlistDeleteArgs>(args: SelectSubset<T, WaitlistDeleteArgs<ExtArgs>>): Prisma__WaitlistClient<$Result.GetResult<Prisma.$WaitlistPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Waitlist.
     * @param {WaitlistUpdateArgs} args - Arguments to update one Waitlist.
     * @example
     * // Update one Waitlist
     * const waitlist = await prisma.waitlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WaitlistUpdateArgs>(args: SelectSubset<T, WaitlistUpdateArgs<ExtArgs>>): Prisma__WaitlistClient<$Result.GetResult<Prisma.$WaitlistPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Waitlists.
     * @param {WaitlistDeleteManyArgs} args - Arguments to filter Waitlists to delete.
     * @example
     * // Delete a few Waitlists
     * const { count } = await prisma.waitlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WaitlistDeleteManyArgs>(args?: SelectSubset<T, WaitlistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Waitlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaitlistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Waitlists
     * const waitlist = await prisma.waitlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WaitlistUpdateManyArgs>(args: SelectSubset<T, WaitlistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Waitlists and returns the data updated in the database.
     * @param {WaitlistUpdateManyAndReturnArgs} args - Arguments to update many Waitlists.
     * @example
     * // Update many Waitlists
     * const waitlist = await prisma.waitlist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Waitlists and only return the `id`
     * const waitlistWithIdOnly = await prisma.waitlist.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WaitlistUpdateManyAndReturnArgs>(args: SelectSubset<T, WaitlistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WaitlistPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Waitlist.
     * @param {WaitlistUpsertArgs} args - Arguments to update or create a Waitlist.
     * @example
     * // Update or create a Waitlist
     * const waitlist = await prisma.waitlist.upsert({
     *   create: {
     *     // ... data to create a Waitlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Waitlist we want to update
     *   }
     * })
     */
    upsert<T extends WaitlistUpsertArgs>(args: SelectSubset<T, WaitlistUpsertArgs<ExtArgs>>): Prisma__WaitlistClient<$Result.GetResult<Prisma.$WaitlistPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Waitlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaitlistCountArgs} args - Arguments to filter Waitlists to count.
     * @example
     * // Count the number of Waitlists
     * const count = await prisma.waitlist.count({
     *   where: {
     *     // ... the filter for the Waitlists we want to count
     *   }
     * })
    **/
    count<T extends WaitlistCountArgs>(
      args?: Subset<T, WaitlistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WaitlistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Waitlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaitlistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WaitlistAggregateArgs>(args: Subset<T, WaitlistAggregateArgs>): Prisma.PrismaPromise<GetWaitlistAggregateType<T>>

    /**
     * Group by Waitlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WaitlistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WaitlistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WaitlistGroupByArgs['orderBy'] }
        : { orderBy?: WaitlistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WaitlistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWaitlistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Waitlist model
   */
  readonly fields: WaitlistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Waitlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WaitlistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Waitlist model
   */ 
  interface WaitlistFieldRefs {
    readonly id: FieldRef<"Waitlist", 'String'>
    readonly email: FieldRef<"Waitlist", 'String'>
    readonly phone: FieldRef<"Waitlist", 'String'>
    readonly interest: FieldRef<"Waitlist", 'String'>
    readonly createdAt: FieldRef<"Waitlist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Waitlist findUnique
   */
  export type WaitlistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Waitlist
     */
    select?: WaitlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Waitlist
     */
    omit?: WaitlistOmit<ExtArgs> | null
    /**
     * Filter, which Waitlist to fetch.
     */
    where: WaitlistWhereUniqueInput
  }

  /**
   * Waitlist findUniqueOrThrow
   */
  export type WaitlistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Waitlist
     */
    select?: WaitlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Waitlist
     */
    omit?: WaitlistOmit<ExtArgs> | null
    /**
     * Filter, which Waitlist to fetch.
     */
    where: WaitlistWhereUniqueInput
  }

  /**
   * Waitlist findFirst
   */
  export type WaitlistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Waitlist
     */
    select?: WaitlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Waitlist
     */
    omit?: WaitlistOmit<ExtArgs> | null
    /**
     * Filter, which Waitlist to fetch.
     */
    where?: WaitlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Waitlists to fetch.
     */
    orderBy?: WaitlistOrderByWithRelationInput | WaitlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Waitlists.
     */
    cursor?: WaitlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Waitlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Waitlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Waitlists.
     */
    distinct?: WaitlistScalarFieldEnum | WaitlistScalarFieldEnum[]
  }

  /**
   * Waitlist findFirstOrThrow
   */
  export type WaitlistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Waitlist
     */
    select?: WaitlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Waitlist
     */
    omit?: WaitlistOmit<ExtArgs> | null
    /**
     * Filter, which Waitlist to fetch.
     */
    where?: WaitlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Waitlists to fetch.
     */
    orderBy?: WaitlistOrderByWithRelationInput | WaitlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Waitlists.
     */
    cursor?: WaitlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Waitlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Waitlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Waitlists.
     */
    distinct?: WaitlistScalarFieldEnum | WaitlistScalarFieldEnum[]
  }

  /**
   * Waitlist findMany
   */
  export type WaitlistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Waitlist
     */
    select?: WaitlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Waitlist
     */
    omit?: WaitlistOmit<ExtArgs> | null
    /**
     * Filter, which Waitlists to fetch.
     */
    where?: WaitlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Waitlists to fetch.
     */
    orderBy?: WaitlistOrderByWithRelationInput | WaitlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Waitlists.
     */
    cursor?: WaitlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Waitlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Waitlists.
     */
    skip?: number
    distinct?: WaitlistScalarFieldEnum | WaitlistScalarFieldEnum[]
  }

  /**
   * Waitlist create
   */
  export type WaitlistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Waitlist
     */
    select?: WaitlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Waitlist
     */
    omit?: WaitlistOmit<ExtArgs> | null
    /**
     * The data needed to create a Waitlist.
     */
    data: XOR<WaitlistCreateInput, WaitlistUncheckedCreateInput>
  }

  /**
   * Waitlist createMany
   */
  export type WaitlistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Waitlists.
     */
    data: WaitlistCreateManyInput | WaitlistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Waitlist createManyAndReturn
   */
  export type WaitlistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Waitlist
     */
    select?: WaitlistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Waitlist
     */
    omit?: WaitlistOmit<ExtArgs> | null
    /**
     * The data used to create many Waitlists.
     */
    data: WaitlistCreateManyInput | WaitlistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Waitlist update
   */
  export type WaitlistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Waitlist
     */
    select?: WaitlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Waitlist
     */
    omit?: WaitlistOmit<ExtArgs> | null
    /**
     * The data needed to update a Waitlist.
     */
    data: XOR<WaitlistUpdateInput, WaitlistUncheckedUpdateInput>
    /**
     * Choose, which Waitlist to update.
     */
    where: WaitlistWhereUniqueInput
  }

  /**
   * Waitlist updateMany
   */
  export type WaitlistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Waitlists.
     */
    data: XOR<WaitlistUpdateManyMutationInput, WaitlistUncheckedUpdateManyInput>
    /**
     * Filter which Waitlists to update
     */
    where?: WaitlistWhereInput
    /**
     * Limit how many Waitlists to update.
     */
    limit?: number
  }

  /**
   * Waitlist updateManyAndReturn
   */
  export type WaitlistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Waitlist
     */
    select?: WaitlistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Waitlist
     */
    omit?: WaitlistOmit<ExtArgs> | null
    /**
     * The data used to update Waitlists.
     */
    data: XOR<WaitlistUpdateManyMutationInput, WaitlistUncheckedUpdateManyInput>
    /**
     * Filter which Waitlists to update
     */
    where?: WaitlistWhereInput
    /**
     * Limit how many Waitlists to update.
     */
    limit?: number
  }

  /**
   * Waitlist upsert
   */
  export type WaitlistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Waitlist
     */
    select?: WaitlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Waitlist
     */
    omit?: WaitlistOmit<ExtArgs> | null
    /**
     * The filter to search for the Waitlist to update in case it exists.
     */
    where: WaitlistWhereUniqueInput
    /**
     * In case the Waitlist found by the `where` argument doesn't exist, create a new Waitlist with this data.
     */
    create: XOR<WaitlistCreateInput, WaitlistUncheckedCreateInput>
    /**
     * In case the Waitlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WaitlistUpdateInput, WaitlistUncheckedUpdateInput>
  }

  /**
   * Waitlist delete
   */
  export type WaitlistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Waitlist
     */
    select?: WaitlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Waitlist
     */
    omit?: WaitlistOmit<ExtArgs> | null
    /**
     * Filter which Waitlist to delete.
     */
    where: WaitlistWhereUniqueInput
  }

  /**
   * Waitlist deleteMany
   */
  export type WaitlistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Waitlists to delete
     */
    where?: WaitlistWhereInput
    /**
     * Limit how many Waitlists to delete.
     */
    limit?: number
  }

  /**
   * Waitlist without action
   */
  export type WaitlistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Waitlist
     */
    select?: WaitlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Waitlist
     */
    omit?: WaitlistOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const HostScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    phone: 'phone',
    plan: 'plan',
    setupFeePaid: 'setupFeePaid',
    gatewayVendorId: 'gatewayVendorId',
    cashfreeVendorId: 'cashfreeVendorId',
    apiKey: 'apiKey',
    legacyApiKey: 'legacyApiKey',
    legacyApiKeyExpires: 'legacyApiKeyExpires',
    settings: 'settings',
    webhooks: 'webhooks',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HostScalarFieldEnum = (typeof HostScalarFieldEnum)[keyof typeof HostScalarFieldEnum]


  export const AuthRecordScalarFieldEnum: {
    hostId: 'hostId',
    email: 'email',
    passwordHash: 'passwordHash',
    salt: 'salt',
    role: 'role',
    emailVerified: 'emailVerified',
    verifyToken: 'verifyToken',
    resetToken: 'resetToken',
    resetTokenExpires: 'resetTokenExpires'
  };

  export type AuthRecordScalarFieldEnum = (typeof AuthRecordScalarFieldEnum)[keyof typeof AuthRecordScalarFieldEnum]


  export const PropertyScalarFieldEnum: {
    id: 'id',
    hostId: 'hostId',
    name: 'name',
    description: 'description',
    imageUrl: 'imageUrl',
    airbnbUrl: 'airbnbUrl',
    basePrice: 'basePrice',
    status: 'status',
    address: 'address',
    amenities: 'amenities',
    icalUrl: 'icalUrl',
    caretakerToken: 'caretakerToken',
    caretakerPhone: 'caretakerPhone',
    caretakerName: 'caretakerName',
    pricingSettings: 'pricingSettings',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PropertyScalarFieldEnum = (typeof PropertyScalarFieldEnum)[keyof typeof PropertyScalarFieldEnum]


  export const BookingScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    hostId: 'hostId',
    guestName: 'guestName',
    guestEmail: 'guestEmail',
    guestPhone: 'guestPhone',
    guestIdRef: 'guestIdRef',
    checkIn: 'checkIn',
    checkOut: 'checkOut',
    nights: 'nights',
    amount: 'amount',
    status: 'status',
    gatewayOrderId: 'gatewayOrderId',
    paymentSessionId: 'paymentSessionId',
    idVerified: 'idVerified',
    caretakerPhone: 'caretakerPhone',
    caretakerName: 'caretakerName',
    checkoutChecklist: 'checkoutChecklist',
    cleanProofUrl: 'cleanProofUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const CalendarBlockScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    date: 'date',
    reason: 'reason',
    bookingId: 'bookingId'
  };

  export type CalendarBlockScalarFieldEnum = (typeof CalendarBlockScalarFieldEnum)[keyof typeof CalendarBlockScalarFieldEnum]


  export const LedgerEntryScalarFieldEnum: {
    id: 'id',
    bookingId: 'bookingId',
    hostId: 'hostId',
    propertyId: 'propertyId',
    gatewayOrderId: 'gatewayOrderId',
    grossAmount: 'grossAmount',
    hostAmount: 'hostAmount',
    istayAmount: 'istayAmount',
    status: 'status',
    settledAt: 'settledAt',
    createdAt: 'createdAt'
  };

  export type LedgerEntryScalarFieldEnum = (typeof LedgerEntryScalarFieldEnum)[keyof typeof LedgerEntryScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    hostId: 'hostId',
    type: 'type',
    title: 'title',
    message: 'message',
    propertyName: 'propertyName',
    meta: 'meta',
    read: 'read',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const GuestVerificationScalarFieldEnum: {
    bookingId: 'bookingId',
    guestName: 'guestName',
    idType: 'idType',
    idObjectKey: 'idObjectKey',
    status: 'status',
    extractedData: 'extractedData',
    matchScore: 'matchScore',
    flags: 'flags',
    createdAt: 'createdAt',
    verifiedAt: 'verifiedAt'
  };

  export type GuestVerificationScalarFieldEnum = (typeof GuestVerificationScalarFieldEnum)[keyof typeof GuestVerificationScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    bookingId: 'bookingId',
    guestName: 'guestName',
    rating: 'rating',
    comment: 'comment',
    source: 'source',
    sourceLabel: 'sourceLabel',
    createdAt: 'createdAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const GuestProfileScalarFieldEnum: {
    phone: 'phone',
    names: 'names',
    emails: 'emails',
    preferences: 'preferences',
    summary: 'summary',
    stayHistory: 'stayHistory',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GuestProfileScalarFieldEnum = (typeof GuestProfileScalarFieldEnum)[keyof typeof GuestProfileScalarFieldEnum]


  export const HostKnowledgeScalarFieldEnum: {
    id: 'id',
    hostId: 'hostId',
    propertyId: 'propertyId',
    content: 'content',
    updatedAt: 'updatedAt'
  };

  export type HostKnowledgeScalarFieldEnum = (typeof HostKnowledgeScalarFieldEnum)[keyof typeof HostKnowledgeScalarFieldEnum]


  export const WaitlistScalarFieldEnum: {
    id: 'id',
    email: 'email',
    phone: 'phone',
    interest: 'interest',
    createdAt: 'createdAt'
  };

  export type WaitlistScalarFieldEnum = (typeof WaitlistScalarFieldEnum)[keyof typeof WaitlistScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type HostWhereInput = {
    AND?: HostWhereInput | HostWhereInput[]
    OR?: HostWhereInput[]
    NOT?: HostWhereInput | HostWhereInput[]
    id?: StringFilter<"Host"> | string
    email?: StringFilter<"Host"> | string
    name?: StringFilter<"Host"> | string
    phone?: StringFilter<"Host"> | string
    plan?: StringFilter<"Host"> | string
    setupFeePaid?: BoolFilter<"Host"> | boolean
    gatewayVendorId?: StringNullableFilter<"Host"> | string | null
    cashfreeVendorId?: StringNullableFilter<"Host"> | string | null
    apiKey?: StringNullableFilter<"Host"> | string | null
    legacyApiKey?: StringNullableFilter<"Host"> | string | null
    legacyApiKeyExpires?: DateTimeNullableFilter<"Host"> | Date | string | null
    settings?: JsonNullableFilter<"Host">
    webhooks?: JsonNullableFilter<"Host">
    createdAt?: DateTimeFilter<"Host"> | Date | string
    updatedAt?: DateTimeFilter<"Host"> | Date | string
    auth?: XOR<AuthRecordNullableScalarRelationFilter, AuthRecordWhereInput> | null
    properties?: PropertyListRelationFilter
    bookings?: BookingListRelationFilter
    ledgerEntries?: LedgerEntryListRelationFilter
    notifications?: NotificationListRelationFilter
    knowledge?: HostKnowledgeListRelationFilter
  }

  export type HostOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    plan?: SortOrder
    setupFeePaid?: SortOrder
    gatewayVendorId?: SortOrderInput | SortOrder
    cashfreeVendorId?: SortOrderInput | SortOrder
    apiKey?: SortOrderInput | SortOrder
    legacyApiKey?: SortOrderInput | SortOrder
    legacyApiKeyExpires?: SortOrderInput | SortOrder
    settings?: SortOrderInput | SortOrder
    webhooks?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    auth?: AuthRecordOrderByWithRelationInput
    properties?: PropertyOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
    ledgerEntries?: LedgerEntryOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    knowledge?: HostKnowledgeOrderByRelationAggregateInput
  }

  export type HostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: HostWhereInput | HostWhereInput[]
    OR?: HostWhereInput[]
    NOT?: HostWhereInput | HostWhereInput[]
    name?: StringFilter<"Host"> | string
    phone?: StringFilter<"Host"> | string
    plan?: StringFilter<"Host"> | string
    setupFeePaid?: BoolFilter<"Host"> | boolean
    gatewayVendorId?: StringNullableFilter<"Host"> | string | null
    cashfreeVendorId?: StringNullableFilter<"Host"> | string | null
    apiKey?: StringNullableFilter<"Host"> | string | null
    legacyApiKey?: StringNullableFilter<"Host"> | string | null
    legacyApiKeyExpires?: DateTimeNullableFilter<"Host"> | Date | string | null
    settings?: JsonNullableFilter<"Host">
    webhooks?: JsonNullableFilter<"Host">
    createdAt?: DateTimeFilter<"Host"> | Date | string
    updatedAt?: DateTimeFilter<"Host"> | Date | string
    auth?: XOR<AuthRecordNullableScalarRelationFilter, AuthRecordWhereInput> | null
    properties?: PropertyListRelationFilter
    bookings?: BookingListRelationFilter
    ledgerEntries?: LedgerEntryListRelationFilter
    notifications?: NotificationListRelationFilter
    knowledge?: HostKnowledgeListRelationFilter
  }, "id" | "email">

  export type HostOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    plan?: SortOrder
    setupFeePaid?: SortOrder
    gatewayVendorId?: SortOrderInput | SortOrder
    cashfreeVendorId?: SortOrderInput | SortOrder
    apiKey?: SortOrderInput | SortOrder
    legacyApiKey?: SortOrderInput | SortOrder
    legacyApiKeyExpires?: SortOrderInput | SortOrder
    settings?: SortOrderInput | SortOrder
    webhooks?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HostCountOrderByAggregateInput
    _max?: HostMaxOrderByAggregateInput
    _min?: HostMinOrderByAggregateInput
  }

  export type HostScalarWhereWithAggregatesInput = {
    AND?: HostScalarWhereWithAggregatesInput | HostScalarWhereWithAggregatesInput[]
    OR?: HostScalarWhereWithAggregatesInput[]
    NOT?: HostScalarWhereWithAggregatesInput | HostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Host"> | string
    email?: StringWithAggregatesFilter<"Host"> | string
    name?: StringWithAggregatesFilter<"Host"> | string
    phone?: StringWithAggregatesFilter<"Host"> | string
    plan?: StringWithAggregatesFilter<"Host"> | string
    setupFeePaid?: BoolWithAggregatesFilter<"Host"> | boolean
    gatewayVendorId?: StringNullableWithAggregatesFilter<"Host"> | string | null
    cashfreeVendorId?: StringNullableWithAggregatesFilter<"Host"> | string | null
    apiKey?: StringNullableWithAggregatesFilter<"Host"> | string | null
    legacyApiKey?: StringNullableWithAggregatesFilter<"Host"> | string | null
    legacyApiKeyExpires?: DateTimeNullableWithAggregatesFilter<"Host"> | Date | string | null
    settings?: JsonNullableWithAggregatesFilter<"Host">
    webhooks?: JsonNullableWithAggregatesFilter<"Host">
    createdAt?: DateTimeWithAggregatesFilter<"Host"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Host"> | Date | string
  }

  export type AuthRecordWhereInput = {
    AND?: AuthRecordWhereInput | AuthRecordWhereInput[]
    OR?: AuthRecordWhereInput[]
    NOT?: AuthRecordWhereInput | AuthRecordWhereInput[]
    hostId?: StringFilter<"AuthRecord"> | string
    email?: StringFilter<"AuthRecord"> | string
    passwordHash?: StringFilter<"AuthRecord"> | string
    salt?: StringFilter<"AuthRecord"> | string
    role?: StringFilter<"AuthRecord"> | string
    emailVerified?: BoolFilter<"AuthRecord"> | boolean
    verifyToken?: StringNullableFilter<"AuthRecord"> | string | null
    resetToken?: StringNullableFilter<"AuthRecord"> | string | null
    resetTokenExpires?: DateTimeNullableFilter<"AuthRecord"> | Date | string | null
    host?: XOR<HostScalarRelationFilter, HostWhereInput>
  }

  export type AuthRecordOrderByWithRelationInput = {
    hostId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    salt?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    verifyToken?: SortOrderInput | SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpires?: SortOrderInput | SortOrder
    host?: HostOrderByWithRelationInput
  }

  export type AuthRecordWhereUniqueInput = Prisma.AtLeast<{
    hostId?: string
    email?: string
    AND?: AuthRecordWhereInput | AuthRecordWhereInput[]
    OR?: AuthRecordWhereInput[]
    NOT?: AuthRecordWhereInput | AuthRecordWhereInput[]
    passwordHash?: StringFilter<"AuthRecord"> | string
    salt?: StringFilter<"AuthRecord"> | string
    role?: StringFilter<"AuthRecord"> | string
    emailVerified?: BoolFilter<"AuthRecord"> | boolean
    verifyToken?: StringNullableFilter<"AuthRecord"> | string | null
    resetToken?: StringNullableFilter<"AuthRecord"> | string | null
    resetTokenExpires?: DateTimeNullableFilter<"AuthRecord"> | Date | string | null
    host?: XOR<HostScalarRelationFilter, HostWhereInput>
  }, "hostId" | "email">

  export type AuthRecordOrderByWithAggregationInput = {
    hostId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    salt?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    verifyToken?: SortOrderInput | SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpires?: SortOrderInput | SortOrder
    _count?: AuthRecordCountOrderByAggregateInput
    _max?: AuthRecordMaxOrderByAggregateInput
    _min?: AuthRecordMinOrderByAggregateInput
  }

  export type AuthRecordScalarWhereWithAggregatesInput = {
    AND?: AuthRecordScalarWhereWithAggregatesInput | AuthRecordScalarWhereWithAggregatesInput[]
    OR?: AuthRecordScalarWhereWithAggregatesInput[]
    NOT?: AuthRecordScalarWhereWithAggregatesInput | AuthRecordScalarWhereWithAggregatesInput[]
    hostId?: StringWithAggregatesFilter<"AuthRecord"> | string
    email?: StringWithAggregatesFilter<"AuthRecord"> | string
    passwordHash?: StringWithAggregatesFilter<"AuthRecord"> | string
    salt?: StringWithAggregatesFilter<"AuthRecord"> | string
    role?: StringWithAggregatesFilter<"AuthRecord"> | string
    emailVerified?: BoolWithAggregatesFilter<"AuthRecord"> | boolean
    verifyToken?: StringNullableWithAggregatesFilter<"AuthRecord"> | string | null
    resetToken?: StringNullableWithAggregatesFilter<"AuthRecord"> | string | null
    resetTokenExpires?: DateTimeNullableWithAggregatesFilter<"AuthRecord"> | Date | string | null
  }

  export type PropertyWhereInput = {
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    id?: StringFilter<"Property"> | string
    hostId?: StringFilter<"Property"> | string
    name?: StringFilter<"Property"> | string
    description?: StringFilter<"Property"> | string
    imageUrl?: StringFilter<"Property"> | string
    airbnbUrl?: StringNullableFilter<"Property"> | string | null
    basePrice?: FloatFilter<"Property"> | number
    status?: StringFilter<"Property"> | string
    address?: StringNullableFilter<"Property"> | string | null
    amenities?: StringNullableListFilter<"Property">
    icalUrl?: StringNullableFilter<"Property"> | string | null
    caretakerToken?: StringNullableFilter<"Property"> | string | null
    caretakerPhone?: StringNullableFilter<"Property"> | string | null
    caretakerName?: StringNullableFilter<"Property"> | string | null
    pricingSettings?: JsonNullableFilter<"Property">
    createdAt?: DateTimeFilter<"Property"> | Date | string
    updatedAt?: DateTimeFilter<"Property"> | Date | string
    host?: XOR<HostScalarRelationFilter, HostWhereInput>
    bookings?: BookingListRelationFilter
    blocks?: CalendarBlockListRelationFilter
    reviews?: ReviewListRelationFilter
    knowledge?: HostKnowledgeListRelationFilter
  }

  export type PropertyOrderByWithRelationInput = {
    id?: SortOrder
    hostId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    airbnbUrl?: SortOrderInput | SortOrder
    basePrice?: SortOrder
    status?: SortOrder
    address?: SortOrderInput | SortOrder
    amenities?: SortOrder
    icalUrl?: SortOrderInput | SortOrder
    caretakerToken?: SortOrderInput | SortOrder
    caretakerPhone?: SortOrderInput | SortOrder
    caretakerName?: SortOrderInput | SortOrder
    pricingSettings?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    host?: HostOrderByWithRelationInput
    bookings?: BookingOrderByRelationAggregateInput
    blocks?: CalendarBlockOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    knowledge?: HostKnowledgeOrderByRelationAggregateInput
  }

  export type PropertyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    caretakerToken?: string
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    hostId?: StringFilter<"Property"> | string
    name?: StringFilter<"Property"> | string
    description?: StringFilter<"Property"> | string
    imageUrl?: StringFilter<"Property"> | string
    airbnbUrl?: StringNullableFilter<"Property"> | string | null
    basePrice?: FloatFilter<"Property"> | number
    status?: StringFilter<"Property"> | string
    address?: StringNullableFilter<"Property"> | string | null
    amenities?: StringNullableListFilter<"Property">
    icalUrl?: StringNullableFilter<"Property"> | string | null
    caretakerPhone?: StringNullableFilter<"Property"> | string | null
    caretakerName?: StringNullableFilter<"Property"> | string | null
    pricingSettings?: JsonNullableFilter<"Property">
    createdAt?: DateTimeFilter<"Property"> | Date | string
    updatedAt?: DateTimeFilter<"Property"> | Date | string
    host?: XOR<HostScalarRelationFilter, HostWhereInput>
    bookings?: BookingListRelationFilter
    blocks?: CalendarBlockListRelationFilter
    reviews?: ReviewListRelationFilter
    knowledge?: HostKnowledgeListRelationFilter
  }, "id" | "caretakerToken">

  export type PropertyOrderByWithAggregationInput = {
    id?: SortOrder
    hostId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    airbnbUrl?: SortOrderInput | SortOrder
    basePrice?: SortOrder
    status?: SortOrder
    address?: SortOrderInput | SortOrder
    amenities?: SortOrder
    icalUrl?: SortOrderInput | SortOrder
    caretakerToken?: SortOrderInput | SortOrder
    caretakerPhone?: SortOrderInput | SortOrder
    caretakerName?: SortOrderInput | SortOrder
    pricingSettings?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PropertyCountOrderByAggregateInput
    _avg?: PropertyAvgOrderByAggregateInput
    _max?: PropertyMaxOrderByAggregateInput
    _min?: PropertyMinOrderByAggregateInput
    _sum?: PropertySumOrderByAggregateInput
  }

  export type PropertyScalarWhereWithAggregatesInput = {
    AND?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    OR?: PropertyScalarWhereWithAggregatesInput[]
    NOT?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Property"> | string
    hostId?: StringWithAggregatesFilter<"Property"> | string
    name?: StringWithAggregatesFilter<"Property"> | string
    description?: StringWithAggregatesFilter<"Property"> | string
    imageUrl?: StringWithAggregatesFilter<"Property"> | string
    airbnbUrl?: StringNullableWithAggregatesFilter<"Property"> | string | null
    basePrice?: FloatWithAggregatesFilter<"Property"> | number
    status?: StringWithAggregatesFilter<"Property"> | string
    address?: StringNullableWithAggregatesFilter<"Property"> | string | null
    amenities?: StringNullableListFilter<"Property">
    icalUrl?: StringNullableWithAggregatesFilter<"Property"> | string | null
    caretakerToken?: StringNullableWithAggregatesFilter<"Property"> | string | null
    caretakerPhone?: StringNullableWithAggregatesFilter<"Property"> | string | null
    caretakerName?: StringNullableWithAggregatesFilter<"Property"> | string | null
    pricingSettings?: JsonNullableWithAggregatesFilter<"Property">
    createdAt?: DateTimeWithAggregatesFilter<"Property"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Property"> | Date | string
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: StringFilter<"Booking"> | string
    propertyId?: StringFilter<"Booking"> | string
    hostId?: StringFilter<"Booking"> | string
    guestName?: StringFilter<"Booking"> | string
    guestEmail?: StringFilter<"Booking"> | string
    guestPhone?: StringNullableFilter<"Booking"> | string | null
    guestIdRef?: StringNullableFilter<"Booking"> | string | null
    checkIn?: DateTimeFilter<"Booking"> | Date | string
    checkOut?: DateTimeFilter<"Booking"> | Date | string
    nights?: IntFilter<"Booking"> | number
    amount?: FloatFilter<"Booking"> | number
    status?: StringFilter<"Booking"> | string
    gatewayOrderId?: StringNullableFilter<"Booking"> | string | null
    paymentSessionId?: StringNullableFilter<"Booking"> | string | null
    idVerified?: BoolFilter<"Booking"> | boolean
    caretakerPhone?: StringNullableFilter<"Booking"> | string | null
    caretakerName?: StringNullableFilter<"Booking"> | string | null
    checkoutChecklist?: JsonNullableFilter<"Booking">
    cleanProofUrl?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    host?: XOR<HostScalarRelationFilter, HostWhereInput>
    ledgerEntries?: LedgerEntryListRelationFilter
    verification?: XOR<GuestVerificationNullableScalarRelationFilter, GuestVerificationWhereInput> | null
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    hostId?: SortOrder
    guestName?: SortOrder
    guestEmail?: SortOrder
    guestPhone?: SortOrderInput | SortOrder
    guestIdRef?: SortOrderInput | SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    nights?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    gatewayOrderId?: SortOrderInput | SortOrder
    paymentSessionId?: SortOrderInput | SortOrder
    idVerified?: SortOrder
    caretakerPhone?: SortOrderInput | SortOrder
    caretakerName?: SortOrderInput | SortOrder
    checkoutChecklist?: SortOrderInput | SortOrder
    cleanProofUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
    host?: HostOrderByWithRelationInput
    ledgerEntries?: LedgerEntryOrderByRelationAggregateInput
    verification?: GuestVerificationOrderByWithRelationInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    propertyId?: StringFilter<"Booking"> | string
    hostId?: StringFilter<"Booking"> | string
    guestName?: StringFilter<"Booking"> | string
    guestEmail?: StringFilter<"Booking"> | string
    guestPhone?: StringNullableFilter<"Booking"> | string | null
    guestIdRef?: StringNullableFilter<"Booking"> | string | null
    checkIn?: DateTimeFilter<"Booking"> | Date | string
    checkOut?: DateTimeFilter<"Booking"> | Date | string
    nights?: IntFilter<"Booking"> | number
    amount?: FloatFilter<"Booking"> | number
    status?: StringFilter<"Booking"> | string
    gatewayOrderId?: StringNullableFilter<"Booking"> | string | null
    paymentSessionId?: StringNullableFilter<"Booking"> | string | null
    idVerified?: BoolFilter<"Booking"> | boolean
    caretakerPhone?: StringNullableFilter<"Booking"> | string | null
    caretakerName?: StringNullableFilter<"Booking"> | string | null
    checkoutChecklist?: JsonNullableFilter<"Booking">
    cleanProofUrl?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    host?: XOR<HostScalarRelationFilter, HostWhereInput>
    ledgerEntries?: LedgerEntryListRelationFilter
    verification?: XOR<GuestVerificationNullableScalarRelationFilter, GuestVerificationWhereInput> | null
  }, "id">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    hostId?: SortOrder
    guestName?: SortOrder
    guestEmail?: SortOrder
    guestPhone?: SortOrderInput | SortOrder
    guestIdRef?: SortOrderInput | SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    nights?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    gatewayOrderId?: SortOrderInput | SortOrder
    paymentSessionId?: SortOrderInput | SortOrder
    idVerified?: SortOrder
    caretakerPhone?: SortOrderInput | SortOrder
    caretakerName?: SortOrderInput | SortOrder
    checkoutChecklist?: SortOrderInput | SortOrder
    cleanProofUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _avg?: BookingAvgOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
    _sum?: BookingSumOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Booking"> | string
    propertyId?: StringWithAggregatesFilter<"Booking"> | string
    hostId?: StringWithAggregatesFilter<"Booking"> | string
    guestName?: StringWithAggregatesFilter<"Booking"> | string
    guestEmail?: StringWithAggregatesFilter<"Booking"> | string
    guestPhone?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    guestIdRef?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    checkIn?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    checkOut?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    nights?: IntWithAggregatesFilter<"Booking"> | number
    amount?: FloatWithAggregatesFilter<"Booking"> | number
    status?: StringWithAggregatesFilter<"Booking"> | string
    gatewayOrderId?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    paymentSessionId?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    idVerified?: BoolWithAggregatesFilter<"Booking"> | boolean
    caretakerPhone?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    caretakerName?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    checkoutChecklist?: JsonNullableWithAggregatesFilter<"Booking">
    cleanProofUrl?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
  }

  export type CalendarBlockWhereInput = {
    AND?: CalendarBlockWhereInput | CalendarBlockWhereInput[]
    OR?: CalendarBlockWhereInput[]
    NOT?: CalendarBlockWhereInput | CalendarBlockWhereInput[]
    id?: StringFilter<"CalendarBlock"> | string
    propertyId?: StringFilter<"CalendarBlock"> | string
    date?: DateTimeFilter<"CalendarBlock"> | Date | string
    reason?: StringFilter<"CalendarBlock"> | string
    bookingId?: StringNullableFilter<"CalendarBlock"> | string | null
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
  }

  export type CalendarBlockOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    date?: SortOrder
    reason?: SortOrder
    bookingId?: SortOrderInput | SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type CalendarBlockWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CalendarBlockWhereInput | CalendarBlockWhereInput[]
    OR?: CalendarBlockWhereInput[]
    NOT?: CalendarBlockWhereInput | CalendarBlockWhereInput[]
    propertyId?: StringFilter<"CalendarBlock"> | string
    date?: DateTimeFilter<"CalendarBlock"> | Date | string
    reason?: StringFilter<"CalendarBlock"> | string
    bookingId?: StringNullableFilter<"CalendarBlock"> | string | null
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
  }, "id">

  export type CalendarBlockOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    date?: SortOrder
    reason?: SortOrder
    bookingId?: SortOrderInput | SortOrder
    _count?: CalendarBlockCountOrderByAggregateInput
    _max?: CalendarBlockMaxOrderByAggregateInput
    _min?: CalendarBlockMinOrderByAggregateInput
  }

  export type CalendarBlockScalarWhereWithAggregatesInput = {
    AND?: CalendarBlockScalarWhereWithAggregatesInput | CalendarBlockScalarWhereWithAggregatesInput[]
    OR?: CalendarBlockScalarWhereWithAggregatesInput[]
    NOT?: CalendarBlockScalarWhereWithAggregatesInput | CalendarBlockScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CalendarBlock"> | string
    propertyId?: StringWithAggregatesFilter<"CalendarBlock"> | string
    date?: DateTimeWithAggregatesFilter<"CalendarBlock"> | Date | string
    reason?: StringWithAggregatesFilter<"CalendarBlock"> | string
    bookingId?: StringNullableWithAggregatesFilter<"CalendarBlock"> | string | null
  }

  export type LedgerEntryWhereInput = {
    AND?: LedgerEntryWhereInput | LedgerEntryWhereInput[]
    OR?: LedgerEntryWhereInput[]
    NOT?: LedgerEntryWhereInput | LedgerEntryWhereInput[]
    id?: StringFilter<"LedgerEntry"> | string
    bookingId?: StringFilter<"LedgerEntry"> | string
    hostId?: StringFilter<"LedgerEntry"> | string
    propertyId?: StringFilter<"LedgerEntry"> | string
    gatewayOrderId?: StringFilter<"LedgerEntry"> | string
    grossAmount?: FloatFilter<"LedgerEntry"> | number
    hostAmount?: FloatFilter<"LedgerEntry"> | number
    istayAmount?: FloatFilter<"LedgerEntry"> | number
    status?: StringFilter<"LedgerEntry"> | string
    settledAt?: DateTimeNullableFilter<"LedgerEntry"> | Date | string | null
    createdAt?: DateTimeFilter<"LedgerEntry"> | Date | string
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
    host?: XOR<HostScalarRelationFilter, HostWhereInput>
  }

  export type LedgerEntryOrderByWithRelationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    hostId?: SortOrder
    propertyId?: SortOrder
    gatewayOrderId?: SortOrder
    grossAmount?: SortOrder
    hostAmount?: SortOrder
    istayAmount?: SortOrder
    status?: SortOrder
    settledAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    booking?: BookingOrderByWithRelationInput
    host?: HostOrderByWithRelationInput
  }

  export type LedgerEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LedgerEntryWhereInput | LedgerEntryWhereInput[]
    OR?: LedgerEntryWhereInput[]
    NOT?: LedgerEntryWhereInput | LedgerEntryWhereInput[]
    bookingId?: StringFilter<"LedgerEntry"> | string
    hostId?: StringFilter<"LedgerEntry"> | string
    propertyId?: StringFilter<"LedgerEntry"> | string
    gatewayOrderId?: StringFilter<"LedgerEntry"> | string
    grossAmount?: FloatFilter<"LedgerEntry"> | number
    hostAmount?: FloatFilter<"LedgerEntry"> | number
    istayAmount?: FloatFilter<"LedgerEntry"> | number
    status?: StringFilter<"LedgerEntry"> | string
    settledAt?: DateTimeNullableFilter<"LedgerEntry"> | Date | string | null
    createdAt?: DateTimeFilter<"LedgerEntry"> | Date | string
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
    host?: XOR<HostScalarRelationFilter, HostWhereInput>
  }, "id">

  export type LedgerEntryOrderByWithAggregationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    hostId?: SortOrder
    propertyId?: SortOrder
    gatewayOrderId?: SortOrder
    grossAmount?: SortOrder
    hostAmount?: SortOrder
    istayAmount?: SortOrder
    status?: SortOrder
    settledAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LedgerEntryCountOrderByAggregateInput
    _avg?: LedgerEntryAvgOrderByAggregateInput
    _max?: LedgerEntryMaxOrderByAggregateInput
    _min?: LedgerEntryMinOrderByAggregateInput
    _sum?: LedgerEntrySumOrderByAggregateInput
  }

  export type LedgerEntryScalarWhereWithAggregatesInput = {
    AND?: LedgerEntryScalarWhereWithAggregatesInput | LedgerEntryScalarWhereWithAggregatesInput[]
    OR?: LedgerEntryScalarWhereWithAggregatesInput[]
    NOT?: LedgerEntryScalarWhereWithAggregatesInput | LedgerEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LedgerEntry"> | string
    bookingId?: StringWithAggregatesFilter<"LedgerEntry"> | string
    hostId?: StringWithAggregatesFilter<"LedgerEntry"> | string
    propertyId?: StringWithAggregatesFilter<"LedgerEntry"> | string
    gatewayOrderId?: StringWithAggregatesFilter<"LedgerEntry"> | string
    grossAmount?: FloatWithAggregatesFilter<"LedgerEntry"> | number
    hostAmount?: FloatWithAggregatesFilter<"LedgerEntry"> | number
    istayAmount?: FloatWithAggregatesFilter<"LedgerEntry"> | number
    status?: StringWithAggregatesFilter<"LedgerEntry"> | string
    settledAt?: DateTimeNullableWithAggregatesFilter<"LedgerEntry"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LedgerEntry"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    hostId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    propertyName?: StringFilter<"Notification"> | string
    meta?: JsonNullableFilter<"Notification">
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    host?: XOR<HostScalarRelationFilter, HostWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    hostId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    propertyName?: SortOrder
    meta?: SortOrderInput | SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    host?: HostOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    hostId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    propertyName?: StringFilter<"Notification"> | string
    meta?: JsonNullableFilter<"Notification">
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    host?: XOR<HostScalarRelationFilter, HostWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    hostId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    propertyName?: SortOrder
    meta?: SortOrderInput | SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    hostId?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    propertyName?: StringWithAggregatesFilter<"Notification"> | string
    meta?: JsonNullableWithAggregatesFilter<"Notification">
    read?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type GuestVerificationWhereInput = {
    AND?: GuestVerificationWhereInput | GuestVerificationWhereInput[]
    OR?: GuestVerificationWhereInput[]
    NOT?: GuestVerificationWhereInput | GuestVerificationWhereInput[]
    bookingId?: StringFilter<"GuestVerification"> | string
    guestName?: StringFilter<"GuestVerification"> | string
    idType?: StringFilter<"GuestVerification"> | string
    idObjectKey?: StringNullableFilter<"GuestVerification"> | string | null
    status?: StringFilter<"GuestVerification"> | string
    extractedData?: JsonNullableFilter<"GuestVerification">
    matchScore?: IntNullableFilter<"GuestVerification"> | number | null
    flags?: StringNullableListFilter<"GuestVerification">
    createdAt?: DateTimeFilter<"GuestVerification"> | Date | string
    verifiedAt?: DateTimeNullableFilter<"GuestVerification"> | Date | string | null
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
  }

  export type GuestVerificationOrderByWithRelationInput = {
    bookingId?: SortOrder
    guestName?: SortOrder
    idType?: SortOrder
    idObjectKey?: SortOrderInput | SortOrder
    status?: SortOrder
    extractedData?: SortOrderInput | SortOrder
    matchScore?: SortOrderInput | SortOrder
    flags?: SortOrder
    createdAt?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    booking?: BookingOrderByWithRelationInput
  }

  export type GuestVerificationWhereUniqueInput = Prisma.AtLeast<{
    bookingId?: string
    AND?: GuestVerificationWhereInput | GuestVerificationWhereInput[]
    OR?: GuestVerificationWhereInput[]
    NOT?: GuestVerificationWhereInput | GuestVerificationWhereInput[]
    guestName?: StringFilter<"GuestVerification"> | string
    idType?: StringFilter<"GuestVerification"> | string
    idObjectKey?: StringNullableFilter<"GuestVerification"> | string | null
    status?: StringFilter<"GuestVerification"> | string
    extractedData?: JsonNullableFilter<"GuestVerification">
    matchScore?: IntNullableFilter<"GuestVerification"> | number | null
    flags?: StringNullableListFilter<"GuestVerification">
    createdAt?: DateTimeFilter<"GuestVerification"> | Date | string
    verifiedAt?: DateTimeNullableFilter<"GuestVerification"> | Date | string | null
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
  }, "bookingId">

  export type GuestVerificationOrderByWithAggregationInput = {
    bookingId?: SortOrder
    guestName?: SortOrder
    idType?: SortOrder
    idObjectKey?: SortOrderInput | SortOrder
    status?: SortOrder
    extractedData?: SortOrderInput | SortOrder
    matchScore?: SortOrderInput | SortOrder
    flags?: SortOrder
    createdAt?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    _count?: GuestVerificationCountOrderByAggregateInput
    _avg?: GuestVerificationAvgOrderByAggregateInput
    _max?: GuestVerificationMaxOrderByAggregateInput
    _min?: GuestVerificationMinOrderByAggregateInput
    _sum?: GuestVerificationSumOrderByAggregateInput
  }

  export type GuestVerificationScalarWhereWithAggregatesInput = {
    AND?: GuestVerificationScalarWhereWithAggregatesInput | GuestVerificationScalarWhereWithAggregatesInput[]
    OR?: GuestVerificationScalarWhereWithAggregatesInput[]
    NOT?: GuestVerificationScalarWhereWithAggregatesInput | GuestVerificationScalarWhereWithAggregatesInput[]
    bookingId?: StringWithAggregatesFilter<"GuestVerification"> | string
    guestName?: StringWithAggregatesFilter<"GuestVerification"> | string
    idType?: StringWithAggregatesFilter<"GuestVerification"> | string
    idObjectKey?: StringNullableWithAggregatesFilter<"GuestVerification"> | string | null
    status?: StringWithAggregatesFilter<"GuestVerification"> | string
    extractedData?: JsonNullableWithAggregatesFilter<"GuestVerification">
    matchScore?: IntNullableWithAggregatesFilter<"GuestVerification"> | number | null
    flags?: StringNullableListFilter<"GuestVerification">
    createdAt?: DateTimeWithAggregatesFilter<"GuestVerification"> | Date | string
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"GuestVerification"> | Date | string | null
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    propertyId?: StringFilter<"Review"> | string
    bookingId?: StringNullableFilter<"Review"> | string | null
    guestName?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    source?: StringFilter<"Review"> | string
    sourceLabel?: StringFilter<"Review"> | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrderInput | SortOrder
    guestName?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    source?: SortOrder
    sourceLabel?: SortOrder
    createdAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    propertyId?: StringFilter<"Review"> | string
    bookingId?: StringNullableFilter<"Review"> | string | null
    guestName?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    source?: StringFilter<"Review"> | string
    sourceLabel?: StringFilter<"Review"> | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
  }, "id">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrderInput | SortOrder
    guestName?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    source?: SortOrder
    sourceLabel?: SortOrder
    createdAt?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    propertyId?: StringWithAggregatesFilter<"Review"> | string
    bookingId?: StringNullableWithAggregatesFilter<"Review"> | string | null
    guestName?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    comment?: StringWithAggregatesFilter<"Review"> | string
    source?: StringWithAggregatesFilter<"Review"> | string
    sourceLabel?: StringWithAggregatesFilter<"Review"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type GuestProfileWhereInput = {
    AND?: GuestProfileWhereInput | GuestProfileWhereInput[]
    OR?: GuestProfileWhereInput[]
    NOT?: GuestProfileWhereInput | GuestProfileWhereInput[]
    phone?: StringFilter<"GuestProfile"> | string
    names?: StringNullableListFilter<"GuestProfile">
    emails?: StringNullableListFilter<"GuestProfile">
    preferences?: StringNullableListFilter<"GuestProfile">
    summary?: StringNullableFilter<"GuestProfile"> | string | null
    stayHistory?: JsonNullableFilter<"GuestProfile">
    createdAt?: DateTimeFilter<"GuestProfile"> | Date | string
    updatedAt?: DateTimeFilter<"GuestProfile"> | Date | string
  }

  export type GuestProfileOrderByWithRelationInput = {
    phone?: SortOrder
    names?: SortOrder
    emails?: SortOrder
    preferences?: SortOrder
    summary?: SortOrderInput | SortOrder
    stayHistory?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuestProfileWhereUniqueInput = Prisma.AtLeast<{
    phone?: string
    AND?: GuestProfileWhereInput | GuestProfileWhereInput[]
    OR?: GuestProfileWhereInput[]
    NOT?: GuestProfileWhereInput | GuestProfileWhereInput[]
    names?: StringNullableListFilter<"GuestProfile">
    emails?: StringNullableListFilter<"GuestProfile">
    preferences?: StringNullableListFilter<"GuestProfile">
    summary?: StringNullableFilter<"GuestProfile"> | string | null
    stayHistory?: JsonNullableFilter<"GuestProfile">
    createdAt?: DateTimeFilter<"GuestProfile"> | Date | string
    updatedAt?: DateTimeFilter<"GuestProfile"> | Date | string
  }, "phone">

  export type GuestProfileOrderByWithAggregationInput = {
    phone?: SortOrder
    names?: SortOrder
    emails?: SortOrder
    preferences?: SortOrder
    summary?: SortOrderInput | SortOrder
    stayHistory?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GuestProfileCountOrderByAggregateInput
    _max?: GuestProfileMaxOrderByAggregateInput
    _min?: GuestProfileMinOrderByAggregateInput
  }

  export type GuestProfileScalarWhereWithAggregatesInput = {
    AND?: GuestProfileScalarWhereWithAggregatesInput | GuestProfileScalarWhereWithAggregatesInput[]
    OR?: GuestProfileScalarWhereWithAggregatesInput[]
    NOT?: GuestProfileScalarWhereWithAggregatesInput | GuestProfileScalarWhereWithAggregatesInput[]
    phone?: StringWithAggregatesFilter<"GuestProfile"> | string
    names?: StringNullableListFilter<"GuestProfile">
    emails?: StringNullableListFilter<"GuestProfile">
    preferences?: StringNullableListFilter<"GuestProfile">
    summary?: StringNullableWithAggregatesFilter<"GuestProfile"> | string | null
    stayHistory?: JsonNullableWithAggregatesFilter<"GuestProfile">
    createdAt?: DateTimeWithAggregatesFilter<"GuestProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GuestProfile"> | Date | string
  }

  export type HostKnowledgeWhereInput = {
    AND?: HostKnowledgeWhereInput | HostKnowledgeWhereInput[]
    OR?: HostKnowledgeWhereInput[]
    NOT?: HostKnowledgeWhereInput | HostKnowledgeWhereInput[]
    id?: StringFilter<"HostKnowledge"> | string
    hostId?: StringFilter<"HostKnowledge"> | string
    propertyId?: StringFilter<"HostKnowledge"> | string
    content?: StringFilter<"HostKnowledge"> | string
    updatedAt?: DateTimeFilter<"HostKnowledge"> | Date | string
    host?: XOR<HostScalarRelationFilter, HostWhereInput>
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
  }

  export type HostKnowledgeOrderByWithRelationInput = {
    id?: SortOrder
    hostId?: SortOrder
    propertyId?: SortOrder
    content?: SortOrder
    updatedAt?: SortOrder
    host?: HostOrderByWithRelationInput
    property?: PropertyOrderByWithRelationInput
  }

  export type HostKnowledgeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HostKnowledgeWhereInput | HostKnowledgeWhereInput[]
    OR?: HostKnowledgeWhereInput[]
    NOT?: HostKnowledgeWhereInput | HostKnowledgeWhereInput[]
    hostId?: StringFilter<"HostKnowledge"> | string
    propertyId?: StringFilter<"HostKnowledge"> | string
    content?: StringFilter<"HostKnowledge"> | string
    updatedAt?: DateTimeFilter<"HostKnowledge"> | Date | string
    host?: XOR<HostScalarRelationFilter, HostWhereInput>
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
  }, "id">

  export type HostKnowledgeOrderByWithAggregationInput = {
    id?: SortOrder
    hostId?: SortOrder
    propertyId?: SortOrder
    content?: SortOrder
    updatedAt?: SortOrder
    _count?: HostKnowledgeCountOrderByAggregateInput
    _max?: HostKnowledgeMaxOrderByAggregateInput
    _min?: HostKnowledgeMinOrderByAggregateInput
  }

  export type HostKnowledgeScalarWhereWithAggregatesInput = {
    AND?: HostKnowledgeScalarWhereWithAggregatesInput | HostKnowledgeScalarWhereWithAggregatesInput[]
    OR?: HostKnowledgeScalarWhereWithAggregatesInput[]
    NOT?: HostKnowledgeScalarWhereWithAggregatesInput | HostKnowledgeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HostKnowledge"> | string
    hostId?: StringWithAggregatesFilter<"HostKnowledge"> | string
    propertyId?: StringWithAggregatesFilter<"HostKnowledge"> | string
    content?: StringWithAggregatesFilter<"HostKnowledge"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"HostKnowledge"> | Date | string
  }

  export type WaitlistWhereInput = {
    AND?: WaitlistWhereInput | WaitlistWhereInput[]
    OR?: WaitlistWhereInput[]
    NOT?: WaitlistWhereInput | WaitlistWhereInput[]
    id?: StringFilter<"Waitlist"> | string
    email?: StringFilter<"Waitlist"> | string
    phone?: StringFilter<"Waitlist"> | string
    interest?: StringNullableFilter<"Waitlist"> | string | null
    createdAt?: DateTimeFilter<"Waitlist"> | Date | string
  }

  export type WaitlistOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    interest?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type WaitlistWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WaitlistWhereInput | WaitlistWhereInput[]
    OR?: WaitlistWhereInput[]
    NOT?: WaitlistWhereInput | WaitlistWhereInput[]
    email?: StringFilter<"Waitlist"> | string
    phone?: StringFilter<"Waitlist"> | string
    interest?: StringNullableFilter<"Waitlist"> | string | null
    createdAt?: DateTimeFilter<"Waitlist"> | Date | string
  }, "id">

  export type WaitlistOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    interest?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: WaitlistCountOrderByAggregateInput
    _max?: WaitlistMaxOrderByAggregateInput
    _min?: WaitlistMinOrderByAggregateInput
  }

  export type WaitlistScalarWhereWithAggregatesInput = {
    AND?: WaitlistScalarWhereWithAggregatesInput | WaitlistScalarWhereWithAggregatesInput[]
    OR?: WaitlistScalarWhereWithAggregatesInput[]
    NOT?: WaitlistScalarWhereWithAggregatesInput | WaitlistScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Waitlist"> | string
    email?: StringWithAggregatesFilter<"Waitlist"> | string
    phone?: StringWithAggregatesFilter<"Waitlist"> | string
    interest?: StringNullableWithAggregatesFilter<"Waitlist"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Waitlist"> | Date | string
  }

  export type HostCreateInput = {
    id?: string
    email: string
    name: string
    phone: string
    plan?: string
    setupFeePaid?: boolean
    gatewayVendorId?: string | null
    cashfreeVendorId?: string | null
    apiKey?: string | null
    legacyApiKey?: string | null
    legacyApiKeyExpires?: Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    auth?: AuthRecordCreateNestedOneWithoutHostInput
    properties?: PropertyCreateNestedManyWithoutHostInput
    bookings?: BookingCreateNestedManyWithoutHostInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutHostInput
    notifications?: NotificationCreateNestedManyWithoutHostInput
    knowledge?: HostKnowledgeCreateNestedManyWithoutHostInput
  }

  export type HostUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    phone: string
    plan?: string
    setupFeePaid?: boolean
    gatewayVendorId?: string | null
    cashfreeVendorId?: string | null
    apiKey?: string | null
    legacyApiKey?: string | null
    legacyApiKeyExpires?: Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    auth?: AuthRecordUncheckedCreateNestedOneWithoutHostInput
    properties?: PropertyUncheckedCreateNestedManyWithoutHostInput
    bookings?: BookingUncheckedCreateNestedManyWithoutHostInput
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutHostInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutHostInput
    knowledge?: HostKnowledgeUncheckedCreateNestedManyWithoutHostInput
  }

  export type HostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    setupFeePaid?: BoolFieldUpdateOperationsInput | boolean
    gatewayVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    cashfreeVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKeyExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auth?: AuthRecordUpdateOneWithoutHostNestedInput
    properties?: PropertyUpdateManyWithoutHostNestedInput
    bookings?: BookingUpdateManyWithoutHostNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutHostNestedInput
    notifications?: NotificationUpdateManyWithoutHostNestedInput
    knowledge?: HostKnowledgeUpdateManyWithoutHostNestedInput
  }

  export type HostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    setupFeePaid?: BoolFieldUpdateOperationsInput | boolean
    gatewayVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    cashfreeVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKeyExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auth?: AuthRecordUncheckedUpdateOneWithoutHostNestedInput
    properties?: PropertyUncheckedUpdateManyWithoutHostNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutHostNestedInput
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutHostNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutHostNestedInput
    knowledge?: HostKnowledgeUncheckedUpdateManyWithoutHostNestedInput
  }

  export type HostCreateManyInput = {
    id?: string
    email: string
    name: string
    phone: string
    plan?: string
    setupFeePaid?: boolean
    gatewayVendorId?: string | null
    cashfreeVendorId?: string | null
    apiKey?: string | null
    legacyApiKey?: string | null
    legacyApiKeyExpires?: Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    setupFeePaid?: BoolFieldUpdateOperationsInput | boolean
    gatewayVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    cashfreeVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKeyExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    setupFeePaid?: BoolFieldUpdateOperationsInput | boolean
    gatewayVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    cashfreeVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKeyExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthRecordCreateInput = {
    email: string
    passwordHash: string
    salt: string
    role?: string
    emailVerified?: boolean
    verifyToken?: string | null
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    host: HostCreateNestedOneWithoutAuthInput
  }

  export type AuthRecordUncheckedCreateInput = {
    hostId: string
    email: string
    passwordHash: string
    salt: string
    role?: string
    emailVerified?: boolean
    verifyToken?: string | null
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
  }

  export type AuthRecordUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    salt?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    host?: HostUpdateOneRequiredWithoutAuthNestedInput
  }

  export type AuthRecordUncheckedUpdateInput = {
    hostId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    salt?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuthRecordCreateManyInput = {
    hostId: string
    email: string
    passwordHash: string
    salt: string
    role?: string
    emailVerified?: boolean
    verifyToken?: string | null
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
  }

  export type AuthRecordUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    salt?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuthRecordUncheckedUpdateManyInput = {
    hostId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    salt?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PropertyCreateInput = {
    id?: string
    name: string
    description: string
    imageUrl: string
    airbnbUrl?: string | null
    basePrice: number
    status?: string
    address?: string | null
    amenities?: PropertyCreateamenitiesInput | string[]
    icalUrl?: string | null
    caretakerToken?: string | null
    caretakerPhone?: string | null
    caretakerName?: string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    host: HostCreateNestedOneWithoutPropertiesInput
    bookings?: BookingCreateNestedManyWithoutPropertyInput
    blocks?: CalendarBlockCreateNestedManyWithoutPropertyInput
    reviews?: ReviewCreateNestedManyWithoutPropertyInput
    knowledge?: HostKnowledgeCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateInput = {
    id?: string
    hostId: string
    name: string
    description: string
    imageUrl: string
    airbnbUrl?: string | null
    basePrice: number
    status?: string
    address?: string | null
    amenities?: PropertyCreateamenitiesInput | string[]
    icalUrl?: string | null
    caretakerToken?: string | null
    caretakerPhone?: string | null
    caretakerName?: string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutPropertyInput
    blocks?: CalendarBlockUncheckedCreateNestedManyWithoutPropertyInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutPropertyInput
    knowledge?: HostKnowledgeUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    airbnbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: PropertyUpdateamenitiesInput | string[]
    icalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerToken?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: HostUpdateOneRequiredWithoutPropertiesNestedInput
    bookings?: BookingUpdateManyWithoutPropertyNestedInput
    blocks?: CalendarBlockUpdateManyWithoutPropertyNestedInput
    reviews?: ReviewUpdateManyWithoutPropertyNestedInput
    knowledge?: HostKnowledgeUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    airbnbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: PropertyUpdateamenitiesInput | string[]
    icalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerToken?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutPropertyNestedInput
    blocks?: CalendarBlockUncheckedUpdateManyWithoutPropertyNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutPropertyNestedInput
    knowledge?: HostKnowledgeUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateManyInput = {
    id?: string
    hostId: string
    name: string
    description: string
    imageUrl: string
    airbnbUrl?: string | null
    basePrice: number
    status?: string
    address?: string | null
    amenities?: PropertyCreateamenitiesInput | string[]
    icalUrl?: string | null
    caretakerToken?: string | null
    caretakerPhone?: string | null
    caretakerName?: string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PropertyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    airbnbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: PropertyUpdateamenitiesInput | string[]
    icalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerToken?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    airbnbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: PropertyUpdateamenitiesInput | string[]
    icalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerToken?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateInput = {
    id?: string
    guestName: string
    guestEmail: string
    guestPhone?: string | null
    guestIdRef?: string | null
    checkIn: Date | string
    checkOut: Date | string
    nights: number
    amount: number
    status?: string
    gatewayOrderId?: string | null
    paymentSessionId?: string | null
    idVerified?: boolean
    caretakerPhone?: string | null
    caretakerName?: string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutBookingsInput
    host: HostCreateNestedOneWithoutBookingsInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutBookingInput
    verification?: GuestVerificationCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateInput = {
    id?: string
    propertyId: string
    hostId: string
    guestName: string
    guestEmail: string
    guestPhone?: string | null
    guestIdRef?: string | null
    checkIn: Date | string
    checkOut: Date | string
    nights: number
    amount: number
    status?: string
    gatewayOrderId?: string | null
    paymentSessionId?: string | null
    idVerified?: boolean
    caretakerPhone?: string | null
    caretakerName?: string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutBookingInput
    verification?: GuestVerificationUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestIdRef?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    idVerified?: BoolFieldUpdateOperationsInput | boolean
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutBookingsNestedInput
    host?: HostUpdateOneRequiredWithoutBookingsNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutBookingNestedInput
    verification?: GuestVerificationUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestIdRef?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    idVerified?: BoolFieldUpdateOperationsInput | boolean
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutBookingNestedInput
    verification?: GuestVerificationUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingCreateManyInput = {
    id?: string
    propertyId: string
    hostId: string
    guestName: string
    guestEmail: string
    guestPhone?: string | null
    guestIdRef?: string | null
    checkIn: Date | string
    checkOut: Date | string
    nights: number
    amount: number
    status?: string
    gatewayOrderId?: string | null
    paymentSessionId?: string | null
    idVerified?: boolean
    caretakerPhone?: string | null
    caretakerName?: string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestIdRef?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    idVerified?: BoolFieldUpdateOperationsInput | boolean
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestIdRef?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    idVerified?: BoolFieldUpdateOperationsInput | boolean
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalendarBlockCreateInput = {
    id?: string
    date: Date | string
    reason: string
    bookingId?: string | null
    property: PropertyCreateNestedOneWithoutBlocksInput
  }

  export type CalendarBlockUncheckedCreateInput = {
    id?: string
    propertyId: string
    date: Date | string
    reason: string
    bookingId?: string | null
  }

  export type CalendarBlockUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    property?: PropertyUpdateOneRequiredWithoutBlocksNestedInput
  }

  export type CalendarBlockUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CalendarBlockCreateManyInput = {
    id?: string
    propertyId: string
    date: Date | string
    reason: string
    bookingId?: string | null
  }

  export type CalendarBlockUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CalendarBlockUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LedgerEntryCreateInput = {
    id?: string
    propertyId: string
    gatewayOrderId: string
    grossAmount: number
    hostAmount: number
    istayAmount: number
    status?: string
    settledAt?: Date | string | null
    createdAt?: Date | string
    booking: BookingCreateNestedOneWithoutLedgerEntriesInput
    host: HostCreateNestedOneWithoutLedgerEntriesInput
  }

  export type LedgerEntryUncheckedCreateInput = {
    id?: string
    bookingId: string
    hostId: string
    propertyId: string
    gatewayOrderId: string
    grossAmount: number
    hostAmount: number
    istayAmount: number
    status?: string
    settledAt?: Date | string | null
    createdAt?: Date | string
  }

  export type LedgerEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: StringFieldUpdateOperationsInput | string
    grossAmount?: FloatFieldUpdateOperationsInput | number
    hostAmount?: FloatFieldUpdateOperationsInput | number
    istayAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutLedgerEntriesNestedInput
    host?: HostUpdateOneRequiredWithoutLedgerEntriesNestedInput
  }

  export type LedgerEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: StringFieldUpdateOperationsInput | string
    grossAmount?: FloatFieldUpdateOperationsInput | number
    hostAmount?: FloatFieldUpdateOperationsInput | number
    istayAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryCreateManyInput = {
    id?: string
    bookingId: string
    hostId: string
    propertyId: string
    gatewayOrderId: string
    grossAmount: number
    hostAmount: number
    istayAmount: number
    status?: string
    settledAt?: Date | string | null
    createdAt?: Date | string
  }

  export type LedgerEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: StringFieldUpdateOperationsInput | string
    grossAmount?: FloatFieldUpdateOperationsInput | number
    hostAmount?: FloatFieldUpdateOperationsInput | number
    istayAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: StringFieldUpdateOperationsInput | string
    grossAmount?: FloatFieldUpdateOperationsInput | number
    hostAmount?: FloatFieldUpdateOperationsInput | number
    istayAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    type: string
    title: string
    message: string
    propertyName: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    read?: boolean
    createdAt?: Date | string
    host: HostCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    hostId: string
    type: string
    title: string
    message: string
    propertyName: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    propertyName?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: HostUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    propertyName?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    hostId: string
    type: string
    title: string
    message: string
    propertyName: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    propertyName?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    propertyName?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestVerificationCreateInput = {
    guestName: string
    idType: string
    idObjectKey?: string | null
    status?: string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    matchScore?: number | null
    flags?: GuestVerificationCreateflagsInput | string[]
    createdAt?: Date | string
    verifiedAt?: Date | string | null
    booking: BookingCreateNestedOneWithoutVerificationInput
  }

  export type GuestVerificationUncheckedCreateInput = {
    bookingId: string
    guestName: string
    idType: string
    idObjectKey?: string | null
    status?: string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    matchScore?: number | null
    flags?: GuestVerificationCreateflagsInput | string[]
    createdAt?: Date | string
    verifiedAt?: Date | string | null
  }

  export type GuestVerificationUpdateInput = {
    guestName?: StringFieldUpdateOperationsInput | string
    idType?: StringFieldUpdateOperationsInput | string
    idObjectKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    flags?: GuestVerificationUpdateflagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    booking?: BookingUpdateOneRequiredWithoutVerificationNestedInput
  }

  export type GuestVerificationUncheckedUpdateInput = {
    bookingId?: StringFieldUpdateOperationsInput | string
    guestName?: StringFieldUpdateOperationsInput | string
    idType?: StringFieldUpdateOperationsInput | string
    idObjectKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    flags?: GuestVerificationUpdateflagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GuestVerificationCreateManyInput = {
    bookingId: string
    guestName: string
    idType: string
    idObjectKey?: string | null
    status?: string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    matchScore?: number | null
    flags?: GuestVerificationCreateflagsInput | string[]
    createdAt?: Date | string
    verifiedAt?: Date | string | null
  }

  export type GuestVerificationUpdateManyMutationInput = {
    guestName?: StringFieldUpdateOperationsInput | string
    idType?: StringFieldUpdateOperationsInput | string
    idObjectKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    flags?: GuestVerificationUpdateflagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GuestVerificationUncheckedUpdateManyInput = {
    bookingId?: StringFieldUpdateOperationsInput | string
    guestName?: StringFieldUpdateOperationsInput | string
    idType?: StringFieldUpdateOperationsInput | string
    idObjectKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    flags?: GuestVerificationUpdateflagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReviewCreateInput = {
    id?: string
    bookingId?: string | null
    guestName: string
    rating: number
    comment: string
    source?: string
    sourceLabel: string
    createdAt?: Date | string
    property: PropertyCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    propertyId: string
    bookingId?: string | null
    guestName: string
    rating: number
    comment: string
    source?: string
    sourceLabel: string
    createdAt?: Date | string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    guestName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceLabel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    guestName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceLabel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    propertyId: string
    bookingId?: string | null
    guestName: string
    rating: number
    comment: string
    source?: string
    sourceLabel: string
    createdAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    guestName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceLabel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    guestName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceLabel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestProfileCreateInput = {
    phone: string
    names?: GuestProfileCreatenamesInput | string[]
    emails?: GuestProfileCreateemailsInput | string[]
    preferences?: GuestProfileCreatepreferencesInput | string[]
    summary?: string | null
    stayHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GuestProfileUncheckedCreateInput = {
    phone: string
    names?: GuestProfileCreatenamesInput | string[]
    emails?: GuestProfileCreateemailsInput | string[]
    preferences?: GuestProfileCreatepreferencesInput | string[]
    summary?: string | null
    stayHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GuestProfileUpdateInput = {
    phone?: StringFieldUpdateOperationsInput | string
    names?: GuestProfileUpdatenamesInput | string[]
    emails?: GuestProfileUpdateemailsInput | string[]
    preferences?: GuestProfileUpdatepreferencesInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    stayHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestProfileUncheckedUpdateInput = {
    phone?: StringFieldUpdateOperationsInput | string
    names?: GuestProfileUpdatenamesInput | string[]
    emails?: GuestProfileUpdateemailsInput | string[]
    preferences?: GuestProfileUpdatepreferencesInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    stayHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestProfileCreateManyInput = {
    phone: string
    names?: GuestProfileCreatenamesInput | string[]
    emails?: GuestProfileCreateemailsInput | string[]
    preferences?: GuestProfileCreatepreferencesInput | string[]
    summary?: string | null
    stayHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GuestProfileUpdateManyMutationInput = {
    phone?: StringFieldUpdateOperationsInput | string
    names?: GuestProfileUpdatenamesInput | string[]
    emails?: GuestProfileUpdateemailsInput | string[]
    preferences?: GuestProfileUpdatepreferencesInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    stayHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestProfileUncheckedUpdateManyInput = {
    phone?: StringFieldUpdateOperationsInput | string
    names?: GuestProfileUpdatenamesInput | string[]
    emails?: GuestProfileUpdateemailsInput | string[]
    preferences?: GuestProfileUpdatepreferencesInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    stayHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HostKnowledgeCreateInput = {
    id?: string
    content: string
    updatedAt?: Date | string
    host: HostCreateNestedOneWithoutKnowledgeInput
    property: PropertyCreateNestedOneWithoutKnowledgeInput
  }

  export type HostKnowledgeUncheckedCreateInput = {
    id?: string
    hostId: string
    propertyId: string
    content: string
    updatedAt?: Date | string
  }

  export type HostKnowledgeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: HostUpdateOneRequiredWithoutKnowledgeNestedInput
    property?: PropertyUpdateOneRequiredWithoutKnowledgeNestedInput
  }

  export type HostKnowledgeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HostKnowledgeCreateManyInput = {
    id?: string
    hostId: string
    propertyId: string
    content: string
    updatedAt?: Date | string
  }

  export type HostKnowledgeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HostKnowledgeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaitlistCreateInput = {
    id?: string
    email: string
    phone: string
    interest?: string | null
    createdAt?: Date | string
  }

  export type WaitlistUncheckedCreateInput = {
    id?: string
    email: string
    phone: string
    interest?: string | null
    createdAt?: Date | string
  }

  export type WaitlistUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    interest?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaitlistUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    interest?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaitlistCreateManyInput = {
    id?: string
    email: string
    phone: string
    interest?: string | null
    createdAt?: Date | string
  }

  export type WaitlistUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    interest?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WaitlistUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    interest?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AuthRecordNullableScalarRelationFilter = {
    is?: AuthRecordWhereInput | null
    isNot?: AuthRecordWhereInput | null
  }

  export type PropertyListRelationFilter = {
    every?: PropertyWhereInput
    some?: PropertyWhereInput
    none?: PropertyWhereInput
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type LedgerEntryListRelationFilter = {
    every?: LedgerEntryWhereInput
    some?: LedgerEntryWhereInput
    none?: LedgerEntryWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type HostKnowledgeListRelationFilter = {
    every?: HostKnowledgeWhereInput
    some?: HostKnowledgeWhereInput
    none?: HostKnowledgeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PropertyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LedgerEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HostKnowledgeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HostCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    plan?: SortOrder
    setupFeePaid?: SortOrder
    gatewayVendorId?: SortOrder
    cashfreeVendorId?: SortOrder
    apiKey?: SortOrder
    legacyApiKey?: SortOrder
    legacyApiKeyExpires?: SortOrder
    settings?: SortOrder
    webhooks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HostMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    plan?: SortOrder
    setupFeePaid?: SortOrder
    gatewayVendorId?: SortOrder
    cashfreeVendorId?: SortOrder
    apiKey?: SortOrder
    legacyApiKey?: SortOrder
    legacyApiKeyExpires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HostMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    plan?: SortOrder
    setupFeePaid?: SortOrder
    gatewayVendorId?: SortOrder
    cashfreeVendorId?: SortOrder
    apiKey?: SortOrder
    legacyApiKey?: SortOrder
    legacyApiKeyExpires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type HostScalarRelationFilter = {
    is?: HostWhereInput
    isNot?: HostWhereInput
  }

  export type AuthRecordCountOrderByAggregateInput = {
    hostId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    salt?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    verifyToken?: SortOrder
    resetToken?: SortOrder
    resetTokenExpires?: SortOrder
  }

  export type AuthRecordMaxOrderByAggregateInput = {
    hostId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    salt?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    verifyToken?: SortOrder
    resetToken?: SortOrder
    resetTokenExpires?: SortOrder
  }

  export type AuthRecordMinOrderByAggregateInput = {
    hostId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    salt?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    verifyToken?: SortOrder
    resetToken?: SortOrder
    resetTokenExpires?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type CalendarBlockListRelationFilter = {
    every?: CalendarBlockWhereInput
    some?: CalendarBlockWhereInput
    none?: CalendarBlockWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type CalendarBlockOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyCountOrderByAggregateInput = {
    id?: SortOrder
    hostId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    airbnbUrl?: SortOrder
    basePrice?: SortOrder
    status?: SortOrder
    address?: SortOrder
    amenities?: SortOrder
    icalUrl?: SortOrder
    caretakerToken?: SortOrder
    caretakerPhone?: SortOrder
    caretakerName?: SortOrder
    pricingSettings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertyAvgOrderByAggregateInput = {
    basePrice?: SortOrder
  }

  export type PropertyMaxOrderByAggregateInput = {
    id?: SortOrder
    hostId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    airbnbUrl?: SortOrder
    basePrice?: SortOrder
    status?: SortOrder
    address?: SortOrder
    icalUrl?: SortOrder
    caretakerToken?: SortOrder
    caretakerPhone?: SortOrder
    caretakerName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertyMinOrderByAggregateInput = {
    id?: SortOrder
    hostId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    airbnbUrl?: SortOrder
    basePrice?: SortOrder
    status?: SortOrder
    address?: SortOrder
    icalUrl?: SortOrder
    caretakerToken?: SortOrder
    caretakerPhone?: SortOrder
    caretakerName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertySumOrderByAggregateInput = {
    basePrice?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PropertyScalarRelationFilter = {
    is?: PropertyWhereInput
    isNot?: PropertyWhereInput
  }

  export type GuestVerificationNullableScalarRelationFilter = {
    is?: GuestVerificationWhereInput | null
    isNot?: GuestVerificationWhereInput | null
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    hostId?: SortOrder
    guestName?: SortOrder
    guestEmail?: SortOrder
    guestPhone?: SortOrder
    guestIdRef?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    nights?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    gatewayOrderId?: SortOrder
    paymentSessionId?: SortOrder
    idVerified?: SortOrder
    caretakerPhone?: SortOrder
    caretakerName?: SortOrder
    checkoutChecklist?: SortOrder
    cleanProofUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingAvgOrderByAggregateInput = {
    nights?: SortOrder
    amount?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    hostId?: SortOrder
    guestName?: SortOrder
    guestEmail?: SortOrder
    guestPhone?: SortOrder
    guestIdRef?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    nights?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    gatewayOrderId?: SortOrder
    paymentSessionId?: SortOrder
    idVerified?: SortOrder
    caretakerPhone?: SortOrder
    caretakerName?: SortOrder
    cleanProofUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    hostId?: SortOrder
    guestName?: SortOrder
    guestEmail?: SortOrder
    guestPhone?: SortOrder
    guestIdRef?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    nights?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    gatewayOrderId?: SortOrder
    paymentSessionId?: SortOrder
    idVerified?: SortOrder
    caretakerPhone?: SortOrder
    caretakerName?: SortOrder
    cleanProofUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingSumOrderByAggregateInput = {
    nights?: SortOrder
    amount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type CalendarBlockCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    date?: SortOrder
    reason?: SortOrder
    bookingId?: SortOrder
  }

  export type CalendarBlockMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    date?: SortOrder
    reason?: SortOrder
    bookingId?: SortOrder
  }

  export type CalendarBlockMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    date?: SortOrder
    reason?: SortOrder
    bookingId?: SortOrder
  }

  export type BookingScalarRelationFilter = {
    is?: BookingWhereInput
    isNot?: BookingWhereInput
  }

  export type LedgerEntryCountOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    hostId?: SortOrder
    propertyId?: SortOrder
    gatewayOrderId?: SortOrder
    grossAmount?: SortOrder
    hostAmount?: SortOrder
    istayAmount?: SortOrder
    status?: SortOrder
    settledAt?: SortOrder
    createdAt?: SortOrder
  }

  export type LedgerEntryAvgOrderByAggregateInput = {
    grossAmount?: SortOrder
    hostAmount?: SortOrder
    istayAmount?: SortOrder
  }

  export type LedgerEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    hostId?: SortOrder
    propertyId?: SortOrder
    gatewayOrderId?: SortOrder
    grossAmount?: SortOrder
    hostAmount?: SortOrder
    istayAmount?: SortOrder
    status?: SortOrder
    settledAt?: SortOrder
    createdAt?: SortOrder
  }

  export type LedgerEntryMinOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    hostId?: SortOrder
    propertyId?: SortOrder
    gatewayOrderId?: SortOrder
    grossAmount?: SortOrder
    hostAmount?: SortOrder
    istayAmount?: SortOrder
    status?: SortOrder
    settledAt?: SortOrder
    createdAt?: SortOrder
  }

  export type LedgerEntrySumOrderByAggregateInput = {
    grossAmount?: SortOrder
    hostAmount?: SortOrder
    istayAmount?: SortOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    hostId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    propertyName?: SortOrder
    meta?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    hostId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    propertyName?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    hostId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    propertyName?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type GuestVerificationCountOrderByAggregateInput = {
    bookingId?: SortOrder
    guestName?: SortOrder
    idType?: SortOrder
    idObjectKey?: SortOrder
    status?: SortOrder
    extractedData?: SortOrder
    matchScore?: SortOrder
    flags?: SortOrder
    createdAt?: SortOrder
    verifiedAt?: SortOrder
  }

  export type GuestVerificationAvgOrderByAggregateInput = {
    matchScore?: SortOrder
  }

  export type GuestVerificationMaxOrderByAggregateInput = {
    bookingId?: SortOrder
    guestName?: SortOrder
    idType?: SortOrder
    idObjectKey?: SortOrder
    status?: SortOrder
    matchScore?: SortOrder
    createdAt?: SortOrder
    verifiedAt?: SortOrder
  }

  export type GuestVerificationMinOrderByAggregateInput = {
    bookingId?: SortOrder
    guestName?: SortOrder
    idType?: SortOrder
    idObjectKey?: SortOrder
    status?: SortOrder
    matchScore?: SortOrder
    createdAt?: SortOrder
    verifiedAt?: SortOrder
  }

  export type GuestVerificationSumOrderByAggregateInput = {
    matchScore?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    guestName?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    source?: SortOrder
    sourceLabel?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    guestName?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    source?: SortOrder
    sourceLabel?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    bookingId?: SortOrder
    guestName?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    source?: SortOrder
    sourceLabel?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type GuestProfileCountOrderByAggregateInput = {
    phone?: SortOrder
    names?: SortOrder
    emails?: SortOrder
    preferences?: SortOrder
    summary?: SortOrder
    stayHistory?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuestProfileMaxOrderByAggregateInput = {
    phone?: SortOrder
    summary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuestProfileMinOrderByAggregateInput = {
    phone?: SortOrder
    summary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HostKnowledgeCountOrderByAggregateInput = {
    id?: SortOrder
    hostId?: SortOrder
    propertyId?: SortOrder
    content?: SortOrder
    updatedAt?: SortOrder
  }

  export type HostKnowledgeMaxOrderByAggregateInput = {
    id?: SortOrder
    hostId?: SortOrder
    propertyId?: SortOrder
    content?: SortOrder
    updatedAt?: SortOrder
  }

  export type HostKnowledgeMinOrderByAggregateInput = {
    id?: SortOrder
    hostId?: SortOrder
    propertyId?: SortOrder
    content?: SortOrder
    updatedAt?: SortOrder
  }

  export type WaitlistCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    interest?: SortOrder
    createdAt?: SortOrder
  }

  export type WaitlistMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    interest?: SortOrder
    createdAt?: SortOrder
  }

  export type WaitlistMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    interest?: SortOrder
    createdAt?: SortOrder
  }

  export type AuthRecordCreateNestedOneWithoutHostInput = {
    create?: XOR<AuthRecordCreateWithoutHostInput, AuthRecordUncheckedCreateWithoutHostInput>
    connectOrCreate?: AuthRecordCreateOrConnectWithoutHostInput
    connect?: AuthRecordWhereUniqueInput
  }

  export type PropertyCreateNestedManyWithoutHostInput = {
    create?: XOR<PropertyCreateWithoutHostInput, PropertyUncheckedCreateWithoutHostInput> | PropertyCreateWithoutHostInput[] | PropertyUncheckedCreateWithoutHostInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutHostInput | PropertyCreateOrConnectWithoutHostInput[]
    createMany?: PropertyCreateManyHostInputEnvelope
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutHostInput = {
    create?: XOR<BookingCreateWithoutHostInput, BookingUncheckedCreateWithoutHostInput> | BookingCreateWithoutHostInput[] | BookingUncheckedCreateWithoutHostInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutHostInput | BookingCreateOrConnectWithoutHostInput[]
    createMany?: BookingCreateManyHostInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type LedgerEntryCreateNestedManyWithoutHostInput = {
    create?: XOR<LedgerEntryCreateWithoutHostInput, LedgerEntryUncheckedCreateWithoutHostInput> | LedgerEntryCreateWithoutHostInput[] | LedgerEntryUncheckedCreateWithoutHostInput[]
    connectOrCreate?: LedgerEntryCreateOrConnectWithoutHostInput | LedgerEntryCreateOrConnectWithoutHostInput[]
    createMany?: LedgerEntryCreateManyHostInputEnvelope
    connect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutHostInput = {
    create?: XOR<NotificationCreateWithoutHostInput, NotificationUncheckedCreateWithoutHostInput> | NotificationCreateWithoutHostInput[] | NotificationUncheckedCreateWithoutHostInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutHostInput | NotificationCreateOrConnectWithoutHostInput[]
    createMany?: NotificationCreateManyHostInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type HostKnowledgeCreateNestedManyWithoutHostInput = {
    create?: XOR<HostKnowledgeCreateWithoutHostInput, HostKnowledgeUncheckedCreateWithoutHostInput> | HostKnowledgeCreateWithoutHostInput[] | HostKnowledgeUncheckedCreateWithoutHostInput[]
    connectOrCreate?: HostKnowledgeCreateOrConnectWithoutHostInput | HostKnowledgeCreateOrConnectWithoutHostInput[]
    createMany?: HostKnowledgeCreateManyHostInputEnvelope
    connect?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
  }

  export type AuthRecordUncheckedCreateNestedOneWithoutHostInput = {
    create?: XOR<AuthRecordCreateWithoutHostInput, AuthRecordUncheckedCreateWithoutHostInput>
    connectOrCreate?: AuthRecordCreateOrConnectWithoutHostInput
    connect?: AuthRecordWhereUniqueInput
  }

  export type PropertyUncheckedCreateNestedManyWithoutHostInput = {
    create?: XOR<PropertyCreateWithoutHostInput, PropertyUncheckedCreateWithoutHostInput> | PropertyCreateWithoutHostInput[] | PropertyUncheckedCreateWithoutHostInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutHostInput | PropertyCreateOrConnectWithoutHostInput[]
    createMany?: PropertyCreateManyHostInputEnvelope
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutHostInput = {
    create?: XOR<BookingCreateWithoutHostInput, BookingUncheckedCreateWithoutHostInput> | BookingCreateWithoutHostInput[] | BookingUncheckedCreateWithoutHostInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutHostInput | BookingCreateOrConnectWithoutHostInput[]
    createMany?: BookingCreateManyHostInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type LedgerEntryUncheckedCreateNestedManyWithoutHostInput = {
    create?: XOR<LedgerEntryCreateWithoutHostInput, LedgerEntryUncheckedCreateWithoutHostInput> | LedgerEntryCreateWithoutHostInput[] | LedgerEntryUncheckedCreateWithoutHostInput[]
    connectOrCreate?: LedgerEntryCreateOrConnectWithoutHostInput | LedgerEntryCreateOrConnectWithoutHostInput[]
    createMany?: LedgerEntryCreateManyHostInputEnvelope
    connect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutHostInput = {
    create?: XOR<NotificationCreateWithoutHostInput, NotificationUncheckedCreateWithoutHostInput> | NotificationCreateWithoutHostInput[] | NotificationUncheckedCreateWithoutHostInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutHostInput | NotificationCreateOrConnectWithoutHostInput[]
    createMany?: NotificationCreateManyHostInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type HostKnowledgeUncheckedCreateNestedManyWithoutHostInput = {
    create?: XOR<HostKnowledgeCreateWithoutHostInput, HostKnowledgeUncheckedCreateWithoutHostInput> | HostKnowledgeCreateWithoutHostInput[] | HostKnowledgeUncheckedCreateWithoutHostInput[]
    connectOrCreate?: HostKnowledgeCreateOrConnectWithoutHostInput | HostKnowledgeCreateOrConnectWithoutHostInput[]
    createMany?: HostKnowledgeCreateManyHostInputEnvelope
    connect?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AuthRecordUpdateOneWithoutHostNestedInput = {
    create?: XOR<AuthRecordCreateWithoutHostInput, AuthRecordUncheckedCreateWithoutHostInput>
    connectOrCreate?: AuthRecordCreateOrConnectWithoutHostInput
    upsert?: AuthRecordUpsertWithoutHostInput
    disconnect?: AuthRecordWhereInput | boolean
    delete?: AuthRecordWhereInput | boolean
    connect?: AuthRecordWhereUniqueInput
    update?: XOR<XOR<AuthRecordUpdateToOneWithWhereWithoutHostInput, AuthRecordUpdateWithoutHostInput>, AuthRecordUncheckedUpdateWithoutHostInput>
  }

  export type PropertyUpdateManyWithoutHostNestedInput = {
    create?: XOR<PropertyCreateWithoutHostInput, PropertyUncheckedCreateWithoutHostInput> | PropertyCreateWithoutHostInput[] | PropertyUncheckedCreateWithoutHostInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutHostInput | PropertyCreateOrConnectWithoutHostInput[]
    upsert?: PropertyUpsertWithWhereUniqueWithoutHostInput | PropertyUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: PropertyCreateManyHostInputEnvelope
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    update?: PropertyUpdateWithWhereUniqueWithoutHostInput | PropertyUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: PropertyUpdateManyWithWhereWithoutHostInput | PropertyUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutHostNestedInput = {
    create?: XOR<BookingCreateWithoutHostInput, BookingUncheckedCreateWithoutHostInput> | BookingCreateWithoutHostInput[] | BookingUncheckedCreateWithoutHostInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutHostInput | BookingCreateOrConnectWithoutHostInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutHostInput | BookingUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: BookingCreateManyHostInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutHostInput | BookingUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutHostInput | BookingUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type LedgerEntryUpdateManyWithoutHostNestedInput = {
    create?: XOR<LedgerEntryCreateWithoutHostInput, LedgerEntryUncheckedCreateWithoutHostInput> | LedgerEntryCreateWithoutHostInput[] | LedgerEntryUncheckedCreateWithoutHostInput[]
    connectOrCreate?: LedgerEntryCreateOrConnectWithoutHostInput | LedgerEntryCreateOrConnectWithoutHostInput[]
    upsert?: LedgerEntryUpsertWithWhereUniqueWithoutHostInput | LedgerEntryUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: LedgerEntryCreateManyHostInputEnvelope
    set?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    disconnect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    delete?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    connect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    update?: LedgerEntryUpdateWithWhereUniqueWithoutHostInput | LedgerEntryUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: LedgerEntryUpdateManyWithWhereWithoutHostInput | LedgerEntryUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: LedgerEntryScalarWhereInput | LedgerEntryScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutHostNestedInput = {
    create?: XOR<NotificationCreateWithoutHostInput, NotificationUncheckedCreateWithoutHostInput> | NotificationCreateWithoutHostInput[] | NotificationUncheckedCreateWithoutHostInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutHostInput | NotificationCreateOrConnectWithoutHostInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutHostInput | NotificationUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: NotificationCreateManyHostInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutHostInput | NotificationUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutHostInput | NotificationUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type HostKnowledgeUpdateManyWithoutHostNestedInput = {
    create?: XOR<HostKnowledgeCreateWithoutHostInput, HostKnowledgeUncheckedCreateWithoutHostInput> | HostKnowledgeCreateWithoutHostInput[] | HostKnowledgeUncheckedCreateWithoutHostInput[]
    connectOrCreate?: HostKnowledgeCreateOrConnectWithoutHostInput | HostKnowledgeCreateOrConnectWithoutHostInput[]
    upsert?: HostKnowledgeUpsertWithWhereUniqueWithoutHostInput | HostKnowledgeUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: HostKnowledgeCreateManyHostInputEnvelope
    set?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
    disconnect?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
    delete?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
    connect?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
    update?: HostKnowledgeUpdateWithWhereUniqueWithoutHostInput | HostKnowledgeUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: HostKnowledgeUpdateManyWithWhereWithoutHostInput | HostKnowledgeUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: HostKnowledgeScalarWhereInput | HostKnowledgeScalarWhereInput[]
  }

  export type AuthRecordUncheckedUpdateOneWithoutHostNestedInput = {
    create?: XOR<AuthRecordCreateWithoutHostInput, AuthRecordUncheckedCreateWithoutHostInput>
    connectOrCreate?: AuthRecordCreateOrConnectWithoutHostInput
    upsert?: AuthRecordUpsertWithoutHostInput
    disconnect?: AuthRecordWhereInput | boolean
    delete?: AuthRecordWhereInput | boolean
    connect?: AuthRecordWhereUniqueInput
    update?: XOR<XOR<AuthRecordUpdateToOneWithWhereWithoutHostInput, AuthRecordUpdateWithoutHostInput>, AuthRecordUncheckedUpdateWithoutHostInput>
  }

  export type PropertyUncheckedUpdateManyWithoutHostNestedInput = {
    create?: XOR<PropertyCreateWithoutHostInput, PropertyUncheckedCreateWithoutHostInput> | PropertyCreateWithoutHostInput[] | PropertyUncheckedCreateWithoutHostInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutHostInput | PropertyCreateOrConnectWithoutHostInput[]
    upsert?: PropertyUpsertWithWhereUniqueWithoutHostInput | PropertyUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: PropertyCreateManyHostInputEnvelope
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    update?: PropertyUpdateWithWhereUniqueWithoutHostInput | PropertyUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: PropertyUpdateManyWithWhereWithoutHostInput | PropertyUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutHostNestedInput = {
    create?: XOR<BookingCreateWithoutHostInput, BookingUncheckedCreateWithoutHostInput> | BookingCreateWithoutHostInput[] | BookingUncheckedCreateWithoutHostInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutHostInput | BookingCreateOrConnectWithoutHostInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutHostInput | BookingUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: BookingCreateManyHostInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutHostInput | BookingUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutHostInput | BookingUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type LedgerEntryUncheckedUpdateManyWithoutHostNestedInput = {
    create?: XOR<LedgerEntryCreateWithoutHostInput, LedgerEntryUncheckedCreateWithoutHostInput> | LedgerEntryCreateWithoutHostInput[] | LedgerEntryUncheckedCreateWithoutHostInput[]
    connectOrCreate?: LedgerEntryCreateOrConnectWithoutHostInput | LedgerEntryCreateOrConnectWithoutHostInput[]
    upsert?: LedgerEntryUpsertWithWhereUniqueWithoutHostInput | LedgerEntryUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: LedgerEntryCreateManyHostInputEnvelope
    set?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    disconnect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    delete?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    connect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    update?: LedgerEntryUpdateWithWhereUniqueWithoutHostInput | LedgerEntryUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: LedgerEntryUpdateManyWithWhereWithoutHostInput | LedgerEntryUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: LedgerEntryScalarWhereInput | LedgerEntryScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutHostNestedInput = {
    create?: XOR<NotificationCreateWithoutHostInput, NotificationUncheckedCreateWithoutHostInput> | NotificationCreateWithoutHostInput[] | NotificationUncheckedCreateWithoutHostInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutHostInput | NotificationCreateOrConnectWithoutHostInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutHostInput | NotificationUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: NotificationCreateManyHostInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutHostInput | NotificationUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutHostInput | NotificationUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type HostKnowledgeUncheckedUpdateManyWithoutHostNestedInput = {
    create?: XOR<HostKnowledgeCreateWithoutHostInput, HostKnowledgeUncheckedCreateWithoutHostInput> | HostKnowledgeCreateWithoutHostInput[] | HostKnowledgeUncheckedCreateWithoutHostInput[]
    connectOrCreate?: HostKnowledgeCreateOrConnectWithoutHostInput | HostKnowledgeCreateOrConnectWithoutHostInput[]
    upsert?: HostKnowledgeUpsertWithWhereUniqueWithoutHostInput | HostKnowledgeUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: HostKnowledgeCreateManyHostInputEnvelope
    set?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
    disconnect?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
    delete?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
    connect?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
    update?: HostKnowledgeUpdateWithWhereUniqueWithoutHostInput | HostKnowledgeUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: HostKnowledgeUpdateManyWithWhereWithoutHostInput | HostKnowledgeUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: HostKnowledgeScalarWhereInput | HostKnowledgeScalarWhereInput[]
  }

  export type HostCreateNestedOneWithoutAuthInput = {
    create?: XOR<HostCreateWithoutAuthInput, HostUncheckedCreateWithoutAuthInput>
    connectOrCreate?: HostCreateOrConnectWithoutAuthInput
    connect?: HostWhereUniqueInput
  }

  export type HostUpdateOneRequiredWithoutAuthNestedInput = {
    create?: XOR<HostCreateWithoutAuthInput, HostUncheckedCreateWithoutAuthInput>
    connectOrCreate?: HostCreateOrConnectWithoutAuthInput
    upsert?: HostUpsertWithoutAuthInput
    connect?: HostWhereUniqueInput
    update?: XOR<XOR<HostUpdateToOneWithWhereWithoutAuthInput, HostUpdateWithoutAuthInput>, HostUncheckedUpdateWithoutAuthInput>
  }

  export type PropertyCreateamenitiesInput = {
    set: string[]
  }

  export type HostCreateNestedOneWithoutPropertiesInput = {
    create?: XOR<HostCreateWithoutPropertiesInput, HostUncheckedCreateWithoutPropertiesInput>
    connectOrCreate?: HostCreateOrConnectWithoutPropertiesInput
    connect?: HostWhereUniqueInput
  }

  export type BookingCreateNestedManyWithoutPropertyInput = {
    create?: XOR<BookingCreateWithoutPropertyInput, BookingUncheckedCreateWithoutPropertyInput> | BookingCreateWithoutPropertyInput[] | BookingUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutPropertyInput | BookingCreateOrConnectWithoutPropertyInput[]
    createMany?: BookingCreateManyPropertyInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type CalendarBlockCreateNestedManyWithoutPropertyInput = {
    create?: XOR<CalendarBlockCreateWithoutPropertyInput, CalendarBlockUncheckedCreateWithoutPropertyInput> | CalendarBlockCreateWithoutPropertyInput[] | CalendarBlockUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: CalendarBlockCreateOrConnectWithoutPropertyInput | CalendarBlockCreateOrConnectWithoutPropertyInput[]
    createMany?: CalendarBlockCreateManyPropertyInputEnvelope
    connect?: CalendarBlockWhereUniqueInput | CalendarBlockWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutPropertyInput = {
    create?: XOR<ReviewCreateWithoutPropertyInput, ReviewUncheckedCreateWithoutPropertyInput> | ReviewCreateWithoutPropertyInput[] | ReviewUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutPropertyInput | ReviewCreateOrConnectWithoutPropertyInput[]
    createMany?: ReviewCreateManyPropertyInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type HostKnowledgeCreateNestedManyWithoutPropertyInput = {
    create?: XOR<HostKnowledgeCreateWithoutPropertyInput, HostKnowledgeUncheckedCreateWithoutPropertyInput> | HostKnowledgeCreateWithoutPropertyInput[] | HostKnowledgeUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: HostKnowledgeCreateOrConnectWithoutPropertyInput | HostKnowledgeCreateOrConnectWithoutPropertyInput[]
    createMany?: HostKnowledgeCreateManyPropertyInputEnvelope
    connect?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<BookingCreateWithoutPropertyInput, BookingUncheckedCreateWithoutPropertyInput> | BookingCreateWithoutPropertyInput[] | BookingUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutPropertyInput | BookingCreateOrConnectWithoutPropertyInput[]
    createMany?: BookingCreateManyPropertyInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type CalendarBlockUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<CalendarBlockCreateWithoutPropertyInput, CalendarBlockUncheckedCreateWithoutPropertyInput> | CalendarBlockCreateWithoutPropertyInput[] | CalendarBlockUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: CalendarBlockCreateOrConnectWithoutPropertyInput | CalendarBlockCreateOrConnectWithoutPropertyInput[]
    createMany?: CalendarBlockCreateManyPropertyInputEnvelope
    connect?: CalendarBlockWhereUniqueInput | CalendarBlockWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<ReviewCreateWithoutPropertyInput, ReviewUncheckedCreateWithoutPropertyInput> | ReviewCreateWithoutPropertyInput[] | ReviewUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutPropertyInput | ReviewCreateOrConnectWithoutPropertyInput[]
    createMany?: ReviewCreateManyPropertyInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type HostKnowledgeUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<HostKnowledgeCreateWithoutPropertyInput, HostKnowledgeUncheckedCreateWithoutPropertyInput> | HostKnowledgeCreateWithoutPropertyInput[] | HostKnowledgeUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: HostKnowledgeCreateOrConnectWithoutPropertyInput | HostKnowledgeCreateOrConnectWithoutPropertyInput[]
    createMany?: HostKnowledgeCreateManyPropertyInputEnvelope
    connect?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PropertyUpdateamenitiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type HostUpdateOneRequiredWithoutPropertiesNestedInput = {
    create?: XOR<HostCreateWithoutPropertiesInput, HostUncheckedCreateWithoutPropertiesInput>
    connectOrCreate?: HostCreateOrConnectWithoutPropertiesInput
    upsert?: HostUpsertWithoutPropertiesInput
    connect?: HostWhereUniqueInput
    update?: XOR<XOR<HostUpdateToOneWithWhereWithoutPropertiesInput, HostUpdateWithoutPropertiesInput>, HostUncheckedUpdateWithoutPropertiesInput>
  }

  export type BookingUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<BookingCreateWithoutPropertyInput, BookingUncheckedCreateWithoutPropertyInput> | BookingCreateWithoutPropertyInput[] | BookingUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutPropertyInput | BookingCreateOrConnectWithoutPropertyInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutPropertyInput | BookingUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: BookingCreateManyPropertyInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutPropertyInput | BookingUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutPropertyInput | BookingUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type CalendarBlockUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<CalendarBlockCreateWithoutPropertyInput, CalendarBlockUncheckedCreateWithoutPropertyInput> | CalendarBlockCreateWithoutPropertyInput[] | CalendarBlockUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: CalendarBlockCreateOrConnectWithoutPropertyInput | CalendarBlockCreateOrConnectWithoutPropertyInput[]
    upsert?: CalendarBlockUpsertWithWhereUniqueWithoutPropertyInput | CalendarBlockUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: CalendarBlockCreateManyPropertyInputEnvelope
    set?: CalendarBlockWhereUniqueInput | CalendarBlockWhereUniqueInput[]
    disconnect?: CalendarBlockWhereUniqueInput | CalendarBlockWhereUniqueInput[]
    delete?: CalendarBlockWhereUniqueInput | CalendarBlockWhereUniqueInput[]
    connect?: CalendarBlockWhereUniqueInput | CalendarBlockWhereUniqueInput[]
    update?: CalendarBlockUpdateWithWhereUniqueWithoutPropertyInput | CalendarBlockUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: CalendarBlockUpdateManyWithWhereWithoutPropertyInput | CalendarBlockUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: CalendarBlockScalarWhereInput | CalendarBlockScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<ReviewCreateWithoutPropertyInput, ReviewUncheckedCreateWithoutPropertyInput> | ReviewCreateWithoutPropertyInput[] | ReviewUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutPropertyInput | ReviewCreateOrConnectWithoutPropertyInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutPropertyInput | ReviewUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: ReviewCreateManyPropertyInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutPropertyInput | ReviewUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutPropertyInput | ReviewUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type HostKnowledgeUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<HostKnowledgeCreateWithoutPropertyInput, HostKnowledgeUncheckedCreateWithoutPropertyInput> | HostKnowledgeCreateWithoutPropertyInput[] | HostKnowledgeUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: HostKnowledgeCreateOrConnectWithoutPropertyInput | HostKnowledgeCreateOrConnectWithoutPropertyInput[]
    upsert?: HostKnowledgeUpsertWithWhereUniqueWithoutPropertyInput | HostKnowledgeUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: HostKnowledgeCreateManyPropertyInputEnvelope
    set?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
    disconnect?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
    delete?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
    connect?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
    update?: HostKnowledgeUpdateWithWhereUniqueWithoutPropertyInput | HostKnowledgeUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: HostKnowledgeUpdateManyWithWhereWithoutPropertyInput | HostKnowledgeUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: HostKnowledgeScalarWhereInput | HostKnowledgeScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<BookingCreateWithoutPropertyInput, BookingUncheckedCreateWithoutPropertyInput> | BookingCreateWithoutPropertyInput[] | BookingUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutPropertyInput | BookingCreateOrConnectWithoutPropertyInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutPropertyInput | BookingUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: BookingCreateManyPropertyInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutPropertyInput | BookingUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutPropertyInput | BookingUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type CalendarBlockUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<CalendarBlockCreateWithoutPropertyInput, CalendarBlockUncheckedCreateWithoutPropertyInput> | CalendarBlockCreateWithoutPropertyInput[] | CalendarBlockUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: CalendarBlockCreateOrConnectWithoutPropertyInput | CalendarBlockCreateOrConnectWithoutPropertyInput[]
    upsert?: CalendarBlockUpsertWithWhereUniqueWithoutPropertyInput | CalendarBlockUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: CalendarBlockCreateManyPropertyInputEnvelope
    set?: CalendarBlockWhereUniqueInput | CalendarBlockWhereUniqueInput[]
    disconnect?: CalendarBlockWhereUniqueInput | CalendarBlockWhereUniqueInput[]
    delete?: CalendarBlockWhereUniqueInput | CalendarBlockWhereUniqueInput[]
    connect?: CalendarBlockWhereUniqueInput | CalendarBlockWhereUniqueInput[]
    update?: CalendarBlockUpdateWithWhereUniqueWithoutPropertyInput | CalendarBlockUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: CalendarBlockUpdateManyWithWhereWithoutPropertyInput | CalendarBlockUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: CalendarBlockScalarWhereInput | CalendarBlockScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<ReviewCreateWithoutPropertyInput, ReviewUncheckedCreateWithoutPropertyInput> | ReviewCreateWithoutPropertyInput[] | ReviewUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutPropertyInput | ReviewCreateOrConnectWithoutPropertyInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutPropertyInput | ReviewUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: ReviewCreateManyPropertyInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutPropertyInput | ReviewUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutPropertyInput | ReviewUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type HostKnowledgeUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<HostKnowledgeCreateWithoutPropertyInput, HostKnowledgeUncheckedCreateWithoutPropertyInput> | HostKnowledgeCreateWithoutPropertyInput[] | HostKnowledgeUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: HostKnowledgeCreateOrConnectWithoutPropertyInput | HostKnowledgeCreateOrConnectWithoutPropertyInput[]
    upsert?: HostKnowledgeUpsertWithWhereUniqueWithoutPropertyInput | HostKnowledgeUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: HostKnowledgeCreateManyPropertyInputEnvelope
    set?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
    disconnect?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
    delete?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
    connect?: HostKnowledgeWhereUniqueInput | HostKnowledgeWhereUniqueInput[]
    update?: HostKnowledgeUpdateWithWhereUniqueWithoutPropertyInput | HostKnowledgeUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: HostKnowledgeUpdateManyWithWhereWithoutPropertyInput | HostKnowledgeUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: HostKnowledgeScalarWhereInput | HostKnowledgeScalarWhereInput[]
  }

  export type PropertyCreateNestedOneWithoutBookingsInput = {
    create?: XOR<PropertyCreateWithoutBookingsInput, PropertyUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutBookingsInput
    connect?: PropertyWhereUniqueInput
  }

  export type HostCreateNestedOneWithoutBookingsInput = {
    create?: XOR<HostCreateWithoutBookingsInput, HostUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: HostCreateOrConnectWithoutBookingsInput
    connect?: HostWhereUniqueInput
  }

  export type LedgerEntryCreateNestedManyWithoutBookingInput = {
    create?: XOR<LedgerEntryCreateWithoutBookingInput, LedgerEntryUncheckedCreateWithoutBookingInput> | LedgerEntryCreateWithoutBookingInput[] | LedgerEntryUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: LedgerEntryCreateOrConnectWithoutBookingInput | LedgerEntryCreateOrConnectWithoutBookingInput[]
    createMany?: LedgerEntryCreateManyBookingInputEnvelope
    connect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
  }

  export type GuestVerificationCreateNestedOneWithoutBookingInput = {
    create?: XOR<GuestVerificationCreateWithoutBookingInput, GuestVerificationUncheckedCreateWithoutBookingInput>
    connectOrCreate?: GuestVerificationCreateOrConnectWithoutBookingInput
    connect?: GuestVerificationWhereUniqueInput
  }

  export type LedgerEntryUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<LedgerEntryCreateWithoutBookingInput, LedgerEntryUncheckedCreateWithoutBookingInput> | LedgerEntryCreateWithoutBookingInput[] | LedgerEntryUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: LedgerEntryCreateOrConnectWithoutBookingInput | LedgerEntryCreateOrConnectWithoutBookingInput[]
    createMany?: LedgerEntryCreateManyBookingInputEnvelope
    connect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
  }

  export type GuestVerificationUncheckedCreateNestedOneWithoutBookingInput = {
    create?: XOR<GuestVerificationCreateWithoutBookingInput, GuestVerificationUncheckedCreateWithoutBookingInput>
    connectOrCreate?: GuestVerificationCreateOrConnectWithoutBookingInput
    connect?: GuestVerificationWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PropertyUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<PropertyCreateWithoutBookingsInput, PropertyUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutBookingsInput
    upsert?: PropertyUpsertWithoutBookingsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutBookingsInput, PropertyUpdateWithoutBookingsInput>, PropertyUncheckedUpdateWithoutBookingsInput>
  }

  export type HostUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<HostCreateWithoutBookingsInput, HostUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: HostCreateOrConnectWithoutBookingsInput
    upsert?: HostUpsertWithoutBookingsInput
    connect?: HostWhereUniqueInput
    update?: XOR<XOR<HostUpdateToOneWithWhereWithoutBookingsInput, HostUpdateWithoutBookingsInput>, HostUncheckedUpdateWithoutBookingsInput>
  }

  export type LedgerEntryUpdateManyWithoutBookingNestedInput = {
    create?: XOR<LedgerEntryCreateWithoutBookingInput, LedgerEntryUncheckedCreateWithoutBookingInput> | LedgerEntryCreateWithoutBookingInput[] | LedgerEntryUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: LedgerEntryCreateOrConnectWithoutBookingInput | LedgerEntryCreateOrConnectWithoutBookingInput[]
    upsert?: LedgerEntryUpsertWithWhereUniqueWithoutBookingInput | LedgerEntryUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: LedgerEntryCreateManyBookingInputEnvelope
    set?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    disconnect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    delete?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    connect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    update?: LedgerEntryUpdateWithWhereUniqueWithoutBookingInput | LedgerEntryUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: LedgerEntryUpdateManyWithWhereWithoutBookingInput | LedgerEntryUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: LedgerEntryScalarWhereInput | LedgerEntryScalarWhereInput[]
  }

  export type GuestVerificationUpdateOneWithoutBookingNestedInput = {
    create?: XOR<GuestVerificationCreateWithoutBookingInput, GuestVerificationUncheckedCreateWithoutBookingInput>
    connectOrCreate?: GuestVerificationCreateOrConnectWithoutBookingInput
    upsert?: GuestVerificationUpsertWithoutBookingInput
    disconnect?: GuestVerificationWhereInput | boolean
    delete?: GuestVerificationWhereInput | boolean
    connect?: GuestVerificationWhereUniqueInput
    update?: XOR<XOR<GuestVerificationUpdateToOneWithWhereWithoutBookingInput, GuestVerificationUpdateWithoutBookingInput>, GuestVerificationUncheckedUpdateWithoutBookingInput>
  }

  export type LedgerEntryUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<LedgerEntryCreateWithoutBookingInput, LedgerEntryUncheckedCreateWithoutBookingInput> | LedgerEntryCreateWithoutBookingInput[] | LedgerEntryUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: LedgerEntryCreateOrConnectWithoutBookingInput | LedgerEntryCreateOrConnectWithoutBookingInput[]
    upsert?: LedgerEntryUpsertWithWhereUniqueWithoutBookingInput | LedgerEntryUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: LedgerEntryCreateManyBookingInputEnvelope
    set?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    disconnect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    delete?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    connect?: LedgerEntryWhereUniqueInput | LedgerEntryWhereUniqueInput[]
    update?: LedgerEntryUpdateWithWhereUniqueWithoutBookingInput | LedgerEntryUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: LedgerEntryUpdateManyWithWhereWithoutBookingInput | LedgerEntryUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: LedgerEntryScalarWhereInput | LedgerEntryScalarWhereInput[]
  }

  export type GuestVerificationUncheckedUpdateOneWithoutBookingNestedInput = {
    create?: XOR<GuestVerificationCreateWithoutBookingInput, GuestVerificationUncheckedCreateWithoutBookingInput>
    connectOrCreate?: GuestVerificationCreateOrConnectWithoutBookingInput
    upsert?: GuestVerificationUpsertWithoutBookingInput
    disconnect?: GuestVerificationWhereInput | boolean
    delete?: GuestVerificationWhereInput | boolean
    connect?: GuestVerificationWhereUniqueInput
    update?: XOR<XOR<GuestVerificationUpdateToOneWithWhereWithoutBookingInput, GuestVerificationUpdateWithoutBookingInput>, GuestVerificationUncheckedUpdateWithoutBookingInput>
  }

  export type PropertyCreateNestedOneWithoutBlocksInput = {
    create?: XOR<PropertyCreateWithoutBlocksInput, PropertyUncheckedCreateWithoutBlocksInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutBlocksInput
    connect?: PropertyWhereUniqueInput
  }

  export type PropertyUpdateOneRequiredWithoutBlocksNestedInput = {
    create?: XOR<PropertyCreateWithoutBlocksInput, PropertyUncheckedCreateWithoutBlocksInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutBlocksInput
    upsert?: PropertyUpsertWithoutBlocksInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutBlocksInput, PropertyUpdateWithoutBlocksInput>, PropertyUncheckedUpdateWithoutBlocksInput>
  }

  export type BookingCreateNestedOneWithoutLedgerEntriesInput = {
    create?: XOR<BookingCreateWithoutLedgerEntriesInput, BookingUncheckedCreateWithoutLedgerEntriesInput>
    connectOrCreate?: BookingCreateOrConnectWithoutLedgerEntriesInput
    connect?: BookingWhereUniqueInput
  }

  export type HostCreateNestedOneWithoutLedgerEntriesInput = {
    create?: XOR<HostCreateWithoutLedgerEntriesInput, HostUncheckedCreateWithoutLedgerEntriesInput>
    connectOrCreate?: HostCreateOrConnectWithoutLedgerEntriesInput
    connect?: HostWhereUniqueInput
  }

  export type BookingUpdateOneRequiredWithoutLedgerEntriesNestedInput = {
    create?: XOR<BookingCreateWithoutLedgerEntriesInput, BookingUncheckedCreateWithoutLedgerEntriesInput>
    connectOrCreate?: BookingCreateOrConnectWithoutLedgerEntriesInput
    upsert?: BookingUpsertWithoutLedgerEntriesInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutLedgerEntriesInput, BookingUpdateWithoutLedgerEntriesInput>, BookingUncheckedUpdateWithoutLedgerEntriesInput>
  }

  export type HostUpdateOneRequiredWithoutLedgerEntriesNestedInput = {
    create?: XOR<HostCreateWithoutLedgerEntriesInput, HostUncheckedCreateWithoutLedgerEntriesInput>
    connectOrCreate?: HostCreateOrConnectWithoutLedgerEntriesInput
    upsert?: HostUpsertWithoutLedgerEntriesInput
    connect?: HostWhereUniqueInput
    update?: XOR<XOR<HostUpdateToOneWithWhereWithoutLedgerEntriesInput, HostUpdateWithoutLedgerEntriesInput>, HostUncheckedUpdateWithoutLedgerEntriesInput>
  }

  export type HostCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<HostCreateWithoutNotificationsInput, HostUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: HostCreateOrConnectWithoutNotificationsInput
    connect?: HostWhereUniqueInput
  }

  export type HostUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<HostCreateWithoutNotificationsInput, HostUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: HostCreateOrConnectWithoutNotificationsInput
    upsert?: HostUpsertWithoutNotificationsInput
    connect?: HostWhereUniqueInput
    update?: XOR<XOR<HostUpdateToOneWithWhereWithoutNotificationsInput, HostUpdateWithoutNotificationsInput>, HostUncheckedUpdateWithoutNotificationsInput>
  }

  export type GuestVerificationCreateflagsInput = {
    set: string[]
  }

  export type BookingCreateNestedOneWithoutVerificationInput = {
    create?: XOR<BookingCreateWithoutVerificationInput, BookingUncheckedCreateWithoutVerificationInput>
    connectOrCreate?: BookingCreateOrConnectWithoutVerificationInput
    connect?: BookingWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GuestVerificationUpdateflagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BookingUpdateOneRequiredWithoutVerificationNestedInput = {
    create?: XOR<BookingCreateWithoutVerificationInput, BookingUncheckedCreateWithoutVerificationInput>
    connectOrCreate?: BookingCreateOrConnectWithoutVerificationInput
    upsert?: BookingUpsertWithoutVerificationInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutVerificationInput, BookingUpdateWithoutVerificationInput>, BookingUncheckedUpdateWithoutVerificationInput>
  }

  export type PropertyCreateNestedOneWithoutReviewsInput = {
    create?: XOR<PropertyCreateWithoutReviewsInput, PropertyUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutReviewsInput
    connect?: PropertyWhereUniqueInput
  }

  export type PropertyUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<PropertyCreateWithoutReviewsInput, PropertyUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutReviewsInput
    upsert?: PropertyUpsertWithoutReviewsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutReviewsInput, PropertyUpdateWithoutReviewsInput>, PropertyUncheckedUpdateWithoutReviewsInput>
  }

  export type GuestProfileCreatenamesInput = {
    set: string[]
  }

  export type GuestProfileCreateemailsInput = {
    set: string[]
  }

  export type GuestProfileCreatepreferencesInput = {
    set: string[]
  }

  export type GuestProfileUpdatenamesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type GuestProfileUpdateemailsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type GuestProfileUpdatepreferencesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type HostCreateNestedOneWithoutKnowledgeInput = {
    create?: XOR<HostCreateWithoutKnowledgeInput, HostUncheckedCreateWithoutKnowledgeInput>
    connectOrCreate?: HostCreateOrConnectWithoutKnowledgeInput
    connect?: HostWhereUniqueInput
  }

  export type PropertyCreateNestedOneWithoutKnowledgeInput = {
    create?: XOR<PropertyCreateWithoutKnowledgeInput, PropertyUncheckedCreateWithoutKnowledgeInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutKnowledgeInput
    connect?: PropertyWhereUniqueInput
  }

  export type HostUpdateOneRequiredWithoutKnowledgeNestedInput = {
    create?: XOR<HostCreateWithoutKnowledgeInput, HostUncheckedCreateWithoutKnowledgeInput>
    connectOrCreate?: HostCreateOrConnectWithoutKnowledgeInput
    upsert?: HostUpsertWithoutKnowledgeInput
    connect?: HostWhereUniqueInput
    update?: XOR<XOR<HostUpdateToOneWithWhereWithoutKnowledgeInput, HostUpdateWithoutKnowledgeInput>, HostUncheckedUpdateWithoutKnowledgeInput>
  }

  export type PropertyUpdateOneRequiredWithoutKnowledgeNestedInput = {
    create?: XOR<PropertyCreateWithoutKnowledgeInput, PropertyUncheckedCreateWithoutKnowledgeInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutKnowledgeInput
    upsert?: PropertyUpsertWithoutKnowledgeInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutKnowledgeInput, PropertyUpdateWithoutKnowledgeInput>, PropertyUncheckedUpdateWithoutKnowledgeInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type AuthRecordCreateWithoutHostInput = {
    email: string
    passwordHash: string
    salt: string
    role?: string
    emailVerified?: boolean
    verifyToken?: string | null
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
  }

  export type AuthRecordUncheckedCreateWithoutHostInput = {
    email: string
    passwordHash: string
    salt: string
    role?: string
    emailVerified?: boolean
    verifyToken?: string | null
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
  }

  export type AuthRecordCreateOrConnectWithoutHostInput = {
    where: AuthRecordWhereUniqueInput
    create: XOR<AuthRecordCreateWithoutHostInput, AuthRecordUncheckedCreateWithoutHostInput>
  }

  export type PropertyCreateWithoutHostInput = {
    id?: string
    name: string
    description: string
    imageUrl: string
    airbnbUrl?: string | null
    basePrice: number
    status?: string
    address?: string | null
    amenities?: PropertyCreateamenitiesInput | string[]
    icalUrl?: string | null
    caretakerToken?: string | null
    caretakerPhone?: string | null
    caretakerName?: string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutPropertyInput
    blocks?: CalendarBlockCreateNestedManyWithoutPropertyInput
    reviews?: ReviewCreateNestedManyWithoutPropertyInput
    knowledge?: HostKnowledgeCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutHostInput = {
    id?: string
    name: string
    description: string
    imageUrl: string
    airbnbUrl?: string | null
    basePrice: number
    status?: string
    address?: string | null
    amenities?: PropertyCreateamenitiesInput | string[]
    icalUrl?: string | null
    caretakerToken?: string | null
    caretakerPhone?: string | null
    caretakerName?: string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutPropertyInput
    blocks?: CalendarBlockUncheckedCreateNestedManyWithoutPropertyInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutPropertyInput
    knowledge?: HostKnowledgeUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutHostInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutHostInput, PropertyUncheckedCreateWithoutHostInput>
  }

  export type PropertyCreateManyHostInputEnvelope = {
    data: PropertyCreateManyHostInput | PropertyCreateManyHostInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutHostInput = {
    id?: string
    guestName: string
    guestEmail: string
    guestPhone?: string | null
    guestIdRef?: string | null
    checkIn: Date | string
    checkOut: Date | string
    nights: number
    amount: number
    status?: string
    gatewayOrderId?: string | null
    paymentSessionId?: string | null
    idVerified?: boolean
    caretakerPhone?: string | null
    caretakerName?: string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutBookingsInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutBookingInput
    verification?: GuestVerificationCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutHostInput = {
    id?: string
    propertyId: string
    guestName: string
    guestEmail: string
    guestPhone?: string | null
    guestIdRef?: string | null
    checkIn: Date | string
    checkOut: Date | string
    nights: number
    amount: number
    status?: string
    gatewayOrderId?: string | null
    paymentSessionId?: string | null
    idVerified?: boolean
    caretakerPhone?: string | null
    caretakerName?: string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutBookingInput
    verification?: GuestVerificationUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutHostInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutHostInput, BookingUncheckedCreateWithoutHostInput>
  }

  export type BookingCreateManyHostInputEnvelope = {
    data: BookingCreateManyHostInput | BookingCreateManyHostInput[]
    skipDuplicates?: boolean
  }

  export type LedgerEntryCreateWithoutHostInput = {
    id?: string
    propertyId: string
    gatewayOrderId: string
    grossAmount: number
    hostAmount: number
    istayAmount: number
    status?: string
    settledAt?: Date | string | null
    createdAt?: Date | string
    booking: BookingCreateNestedOneWithoutLedgerEntriesInput
  }

  export type LedgerEntryUncheckedCreateWithoutHostInput = {
    id?: string
    bookingId: string
    propertyId: string
    gatewayOrderId: string
    grossAmount: number
    hostAmount: number
    istayAmount: number
    status?: string
    settledAt?: Date | string | null
    createdAt?: Date | string
  }

  export type LedgerEntryCreateOrConnectWithoutHostInput = {
    where: LedgerEntryWhereUniqueInput
    create: XOR<LedgerEntryCreateWithoutHostInput, LedgerEntryUncheckedCreateWithoutHostInput>
  }

  export type LedgerEntryCreateManyHostInputEnvelope = {
    data: LedgerEntryCreateManyHostInput | LedgerEntryCreateManyHostInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutHostInput = {
    id?: string
    type: string
    title: string
    message: string
    propertyName: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutHostInput = {
    id?: string
    type: string
    title: string
    message: string
    propertyName: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutHostInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutHostInput, NotificationUncheckedCreateWithoutHostInput>
  }

  export type NotificationCreateManyHostInputEnvelope = {
    data: NotificationCreateManyHostInput | NotificationCreateManyHostInput[]
    skipDuplicates?: boolean
  }

  export type HostKnowledgeCreateWithoutHostInput = {
    id?: string
    content: string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutKnowledgeInput
  }

  export type HostKnowledgeUncheckedCreateWithoutHostInput = {
    id?: string
    propertyId: string
    content: string
    updatedAt?: Date | string
  }

  export type HostKnowledgeCreateOrConnectWithoutHostInput = {
    where: HostKnowledgeWhereUniqueInput
    create: XOR<HostKnowledgeCreateWithoutHostInput, HostKnowledgeUncheckedCreateWithoutHostInput>
  }

  export type HostKnowledgeCreateManyHostInputEnvelope = {
    data: HostKnowledgeCreateManyHostInput | HostKnowledgeCreateManyHostInput[]
    skipDuplicates?: boolean
  }

  export type AuthRecordUpsertWithoutHostInput = {
    update: XOR<AuthRecordUpdateWithoutHostInput, AuthRecordUncheckedUpdateWithoutHostInput>
    create: XOR<AuthRecordCreateWithoutHostInput, AuthRecordUncheckedCreateWithoutHostInput>
    where?: AuthRecordWhereInput
  }

  export type AuthRecordUpdateToOneWithWhereWithoutHostInput = {
    where?: AuthRecordWhereInput
    data: XOR<AuthRecordUpdateWithoutHostInput, AuthRecordUncheckedUpdateWithoutHostInput>
  }

  export type AuthRecordUpdateWithoutHostInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    salt?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuthRecordUncheckedUpdateWithoutHostInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    salt?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PropertyUpsertWithWhereUniqueWithoutHostInput = {
    where: PropertyWhereUniqueInput
    update: XOR<PropertyUpdateWithoutHostInput, PropertyUncheckedUpdateWithoutHostInput>
    create: XOR<PropertyCreateWithoutHostInput, PropertyUncheckedCreateWithoutHostInput>
  }

  export type PropertyUpdateWithWhereUniqueWithoutHostInput = {
    where: PropertyWhereUniqueInput
    data: XOR<PropertyUpdateWithoutHostInput, PropertyUncheckedUpdateWithoutHostInput>
  }

  export type PropertyUpdateManyWithWhereWithoutHostInput = {
    where: PropertyScalarWhereInput
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyWithoutHostInput>
  }

  export type PropertyScalarWhereInput = {
    AND?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
    OR?: PropertyScalarWhereInput[]
    NOT?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
    id?: StringFilter<"Property"> | string
    hostId?: StringFilter<"Property"> | string
    name?: StringFilter<"Property"> | string
    description?: StringFilter<"Property"> | string
    imageUrl?: StringFilter<"Property"> | string
    airbnbUrl?: StringNullableFilter<"Property"> | string | null
    basePrice?: FloatFilter<"Property"> | number
    status?: StringFilter<"Property"> | string
    address?: StringNullableFilter<"Property"> | string | null
    amenities?: StringNullableListFilter<"Property">
    icalUrl?: StringNullableFilter<"Property"> | string | null
    caretakerToken?: StringNullableFilter<"Property"> | string | null
    caretakerPhone?: StringNullableFilter<"Property"> | string | null
    caretakerName?: StringNullableFilter<"Property"> | string | null
    pricingSettings?: JsonNullableFilter<"Property">
    createdAt?: DateTimeFilter<"Property"> | Date | string
    updatedAt?: DateTimeFilter<"Property"> | Date | string
  }

  export type BookingUpsertWithWhereUniqueWithoutHostInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutHostInput, BookingUncheckedUpdateWithoutHostInput>
    create: XOR<BookingCreateWithoutHostInput, BookingUncheckedCreateWithoutHostInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutHostInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutHostInput, BookingUncheckedUpdateWithoutHostInput>
  }

  export type BookingUpdateManyWithWhereWithoutHostInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutHostInput>
  }

  export type BookingScalarWhereInput = {
    AND?: BookingScalarWhereInput | BookingScalarWhereInput[]
    OR?: BookingScalarWhereInput[]
    NOT?: BookingScalarWhereInput | BookingScalarWhereInput[]
    id?: StringFilter<"Booking"> | string
    propertyId?: StringFilter<"Booking"> | string
    hostId?: StringFilter<"Booking"> | string
    guestName?: StringFilter<"Booking"> | string
    guestEmail?: StringFilter<"Booking"> | string
    guestPhone?: StringNullableFilter<"Booking"> | string | null
    guestIdRef?: StringNullableFilter<"Booking"> | string | null
    checkIn?: DateTimeFilter<"Booking"> | Date | string
    checkOut?: DateTimeFilter<"Booking"> | Date | string
    nights?: IntFilter<"Booking"> | number
    amount?: FloatFilter<"Booking"> | number
    status?: StringFilter<"Booking"> | string
    gatewayOrderId?: StringNullableFilter<"Booking"> | string | null
    paymentSessionId?: StringNullableFilter<"Booking"> | string | null
    idVerified?: BoolFilter<"Booking"> | boolean
    caretakerPhone?: StringNullableFilter<"Booking"> | string | null
    caretakerName?: StringNullableFilter<"Booking"> | string | null
    checkoutChecklist?: JsonNullableFilter<"Booking">
    cleanProofUrl?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
  }

  export type LedgerEntryUpsertWithWhereUniqueWithoutHostInput = {
    where: LedgerEntryWhereUniqueInput
    update: XOR<LedgerEntryUpdateWithoutHostInput, LedgerEntryUncheckedUpdateWithoutHostInput>
    create: XOR<LedgerEntryCreateWithoutHostInput, LedgerEntryUncheckedCreateWithoutHostInput>
  }

  export type LedgerEntryUpdateWithWhereUniqueWithoutHostInput = {
    where: LedgerEntryWhereUniqueInput
    data: XOR<LedgerEntryUpdateWithoutHostInput, LedgerEntryUncheckedUpdateWithoutHostInput>
  }

  export type LedgerEntryUpdateManyWithWhereWithoutHostInput = {
    where: LedgerEntryScalarWhereInput
    data: XOR<LedgerEntryUpdateManyMutationInput, LedgerEntryUncheckedUpdateManyWithoutHostInput>
  }

  export type LedgerEntryScalarWhereInput = {
    AND?: LedgerEntryScalarWhereInput | LedgerEntryScalarWhereInput[]
    OR?: LedgerEntryScalarWhereInput[]
    NOT?: LedgerEntryScalarWhereInput | LedgerEntryScalarWhereInput[]
    id?: StringFilter<"LedgerEntry"> | string
    bookingId?: StringFilter<"LedgerEntry"> | string
    hostId?: StringFilter<"LedgerEntry"> | string
    propertyId?: StringFilter<"LedgerEntry"> | string
    gatewayOrderId?: StringFilter<"LedgerEntry"> | string
    grossAmount?: FloatFilter<"LedgerEntry"> | number
    hostAmount?: FloatFilter<"LedgerEntry"> | number
    istayAmount?: FloatFilter<"LedgerEntry"> | number
    status?: StringFilter<"LedgerEntry"> | string
    settledAt?: DateTimeNullableFilter<"LedgerEntry"> | Date | string | null
    createdAt?: DateTimeFilter<"LedgerEntry"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutHostInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutHostInput, NotificationUncheckedUpdateWithoutHostInput>
    create: XOR<NotificationCreateWithoutHostInput, NotificationUncheckedCreateWithoutHostInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutHostInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutHostInput, NotificationUncheckedUpdateWithoutHostInput>
  }

  export type NotificationUpdateManyWithWhereWithoutHostInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutHostInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    hostId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    propertyName?: StringFilter<"Notification"> | string
    meta?: JsonNullableFilter<"Notification">
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type HostKnowledgeUpsertWithWhereUniqueWithoutHostInput = {
    where: HostKnowledgeWhereUniqueInput
    update: XOR<HostKnowledgeUpdateWithoutHostInput, HostKnowledgeUncheckedUpdateWithoutHostInput>
    create: XOR<HostKnowledgeCreateWithoutHostInput, HostKnowledgeUncheckedCreateWithoutHostInput>
  }

  export type HostKnowledgeUpdateWithWhereUniqueWithoutHostInput = {
    where: HostKnowledgeWhereUniqueInput
    data: XOR<HostKnowledgeUpdateWithoutHostInput, HostKnowledgeUncheckedUpdateWithoutHostInput>
  }

  export type HostKnowledgeUpdateManyWithWhereWithoutHostInput = {
    where: HostKnowledgeScalarWhereInput
    data: XOR<HostKnowledgeUpdateManyMutationInput, HostKnowledgeUncheckedUpdateManyWithoutHostInput>
  }

  export type HostKnowledgeScalarWhereInput = {
    AND?: HostKnowledgeScalarWhereInput | HostKnowledgeScalarWhereInput[]
    OR?: HostKnowledgeScalarWhereInput[]
    NOT?: HostKnowledgeScalarWhereInput | HostKnowledgeScalarWhereInput[]
    id?: StringFilter<"HostKnowledge"> | string
    hostId?: StringFilter<"HostKnowledge"> | string
    propertyId?: StringFilter<"HostKnowledge"> | string
    content?: StringFilter<"HostKnowledge"> | string
    updatedAt?: DateTimeFilter<"HostKnowledge"> | Date | string
  }

  export type HostCreateWithoutAuthInput = {
    id?: string
    email: string
    name: string
    phone: string
    plan?: string
    setupFeePaid?: boolean
    gatewayVendorId?: string | null
    cashfreeVendorId?: string | null
    apiKey?: string | null
    legacyApiKey?: string | null
    legacyApiKeyExpires?: Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    properties?: PropertyCreateNestedManyWithoutHostInput
    bookings?: BookingCreateNestedManyWithoutHostInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutHostInput
    notifications?: NotificationCreateNestedManyWithoutHostInput
    knowledge?: HostKnowledgeCreateNestedManyWithoutHostInput
  }

  export type HostUncheckedCreateWithoutAuthInput = {
    id?: string
    email: string
    name: string
    phone: string
    plan?: string
    setupFeePaid?: boolean
    gatewayVendorId?: string | null
    cashfreeVendorId?: string | null
    apiKey?: string | null
    legacyApiKey?: string | null
    legacyApiKeyExpires?: Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    properties?: PropertyUncheckedCreateNestedManyWithoutHostInput
    bookings?: BookingUncheckedCreateNestedManyWithoutHostInput
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutHostInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutHostInput
    knowledge?: HostKnowledgeUncheckedCreateNestedManyWithoutHostInput
  }

  export type HostCreateOrConnectWithoutAuthInput = {
    where: HostWhereUniqueInput
    create: XOR<HostCreateWithoutAuthInput, HostUncheckedCreateWithoutAuthInput>
  }

  export type HostUpsertWithoutAuthInput = {
    update: XOR<HostUpdateWithoutAuthInput, HostUncheckedUpdateWithoutAuthInput>
    create: XOR<HostCreateWithoutAuthInput, HostUncheckedCreateWithoutAuthInput>
    where?: HostWhereInput
  }

  export type HostUpdateToOneWithWhereWithoutAuthInput = {
    where?: HostWhereInput
    data: XOR<HostUpdateWithoutAuthInput, HostUncheckedUpdateWithoutAuthInput>
  }

  export type HostUpdateWithoutAuthInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    setupFeePaid?: BoolFieldUpdateOperationsInput | boolean
    gatewayVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    cashfreeVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKeyExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    properties?: PropertyUpdateManyWithoutHostNestedInput
    bookings?: BookingUpdateManyWithoutHostNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutHostNestedInput
    notifications?: NotificationUpdateManyWithoutHostNestedInput
    knowledge?: HostKnowledgeUpdateManyWithoutHostNestedInput
  }

  export type HostUncheckedUpdateWithoutAuthInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    setupFeePaid?: BoolFieldUpdateOperationsInput | boolean
    gatewayVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    cashfreeVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKeyExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    properties?: PropertyUncheckedUpdateManyWithoutHostNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutHostNestedInput
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutHostNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutHostNestedInput
    knowledge?: HostKnowledgeUncheckedUpdateManyWithoutHostNestedInput
  }

  export type HostCreateWithoutPropertiesInput = {
    id?: string
    email: string
    name: string
    phone: string
    plan?: string
    setupFeePaid?: boolean
    gatewayVendorId?: string | null
    cashfreeVendorId?: string | null
    apiKey?: string | null
    legacyApiKey?: string | null
    legacyApiKeyExpires?: Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    auth?: AuthRecordCreateNestedOneWithoutHostInput
    bookings?: BookingCreateNestedManyWithoutHostInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutHostInput
    notifications?: NotificationCreateNestedManyWithoutHostInput
    knowledge?: HostKnowledgeCreateNestedManyWithoutHostInput
  }

  export type HostUncheckedCreateWithoutPropertiesInput = {
    id?: string
    email: string
    name: string
    phone: string
    plan?: string
    setupFeePaid?: boolean
    gatewayVendorId?: string | null
    cashfreeVendorId?: string | null
    apiKey?: string | null
    legacyApiKey?: string | null
    legacyApiKeyExpires?: Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    auth?: AuthRecordUncheckedCreateNestedOneWithoutHostInput
    bookings?: BookingUncheckedCreateNestedManyWithoutHostInput
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutHostInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutHostInput
    knowledge?: HostKnowledgeUncheckedCreateNestedManyWithoutHostInput
  }

  export type HostCreateOrConnectWithoutPropertiesInput = {
    where: HostWhereUniqueInput
    create: XOR<HostCreateWithoutPropertiesInput, HostUncheckedCreateWithoutPropertiesInput>
  }

  export type BookingCreateWithoutPropertyInput = {
    id?: string
    guestName: string
    guestEmail: string
    guestPhone?: string | null
    guestIdRef?: string | null
    checkIn: Date | string
    checkOut: Date | string
    nights: number
    amount: number
    status?: string
    gatewayOrderId?: string | null
    paymentSessionId?: string | null
    idVerified?: boolean
    caretakerPhone?: string | null
    caretakerName?: string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    host: HostCreateNestedOneWithoutBookingsInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutBookingInput
    verification?: GuestVerificationCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutPropertyInput = {
    id?: string
    hostId: string
    guestName: string
    guestEmail: string
    guestPhone?: string | null
    guestIdRef?: string | null
    checkIn: Date | string
    checkOut: Date | string
    nights: number
    amount: number
    status?: string
    gatewayOrderId?: string | null
    paymentSessionId?: string | null
    idVerified?: boolean
    caretakerPhone?: string | null
    caretakerName?: string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutBookingInput
    verification?: GuestVerificationUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutPropertyInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutPropertyInput, BookingUncheckedCreateWithoutPropertyInput>
  }

  export type BookingCreateManyPropertyInputEnvelope = {
    data: BookingCreateManyPropertyInput | BookingCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type CalendarBlockCreateWithoutPropertyInput = {
    id?: string
    date: Date | string
    reason: string
    bookingId?: string | null
  }

  export type CalendarBlockUncheckedCreateWithoutPropertyInput = {
    id?: string
    date: Date | string
    reason: string
    bookingId?: string | null
  }

  export type CalendarBlockCreateOrConnectWithoutPropertyInput = {
    where: CalendarBlockWhereUniqueInput
    create: XOR<CalendarBlockCreateWithoutPropertyInput, CalendarBlockUncheckedCreateWithoutPropertyInput>
  }

  export type CalendarBlockCreateManyPropertyInputEnvelope = {
    data: CalendarBlockCreateManyPropertyInput | CalendarBlockCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutPropertyInput = {
    id?: string
    bookingId?: string | null
    guestName: string
    rating: number
    comment: string
    source?: string
    sourceLabel: string
    createdAt?: Date | string
  }

  export type ReviewUncheckedCreateWithoutPropertyInput = {
    id?: string
    bookingId?: string | null
    guestName: string
    rating: number
    comment: string
    source?: string
    sourceLabel: string
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutPropertyInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutPropertyInput, ReviewUncheckedCreateWithoutPropertyInput>
  }

  export type ReviewCreateManyPropertyInputEnvelope = {
    data: ReviewCreateManyPropertyInput | ReviewCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type HostKnowledgeCreateWithoutPropertyInput = {
    id?: string
    content: string
    updatedAt?: Date | string
    host: HostCreateNestedOneWithoutKnowledgeInput
  }

  export type HostKnowledgeUncheckedCreateWithoutPropertyInput = {
    id?: string
    hostId: string
    content: string
    updatedAt?: Date | string
  }

  export type HostKnowledgeCreateOrConnectWithoutPropertyInput = {
    where: HostKnowledgeWhereUniqueInput
    create: XOR<HostKnowledgeCreateWithoutPropertyInput, HostKnowledgeUncheckedCreateWithoutPropertyInput>
  }

  export type HostKnowledgeCreateManyPropertyInputEnvelope = {
    data: HostKnowledgeCreateManyPropertyInput | HostKnowledgeCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type HostUpsertWithoutPropertiesInput = {
    update: XOR<HostUpdateWithoutPropertiesInput, HostUncheckedUpdateWithoutPropertiesInput>
    create: XOR<HostCreateWithoutPropertiesInput, HostUncheckedCreateWithoutPropertiesInput>
    where?: HostWhereInput
  }

  export type HostUpdateToOneWithWhereWithoutPropertiesInput = {
    where?: HostWhereInput
    data: XOR<HostUpdateWithoutPropertiesInput, HostUncheckedUpdateWithoutPropertiesInput>
  }

  export type HostUpdateWithoutPropertiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    setupFeePaid?: BoolFieldUpdateOperationsInput | boolean
    gatewayVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    cashfreeVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKeyExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auth?: AuthRecordUpdateOneWithoutHostNestedInput
    bookings?: BookingUpdateManyWithoutHostNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutHostNestedInput
    notifications?: NotificationUpdateManyWithoutHostNestedInput
    knowledge?: HostKnowledgeUpdateManyWithoutHostNestedInput
  }

  export type HostUncheckedUpdateWithoutPropertiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    setupFeePaid?: BoolFieldUpdateOperationsInput | boolean
    gatewayVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    cashfreeVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKeyExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auth?: AuthRecordUncheckedUpdateOneWithoutHostNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutHostNestedInput
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutHostNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutHostNestedInput
    knowledge?: HostKnowledgeUncheckedUpdateManyWithoutHostNestedInput
  }

  export type BookingUpsertWithWhereUniqueWithoutPropertyInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutPropertyInput, BookingUncheckedUpdateWithoutPropertyInput>
    create: XOR<BookingCreateWithoutPropertyInput, BookingUncheckedCreateWithoutPropertyInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutPropertyInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutPropertyInput, BookingUncheckedUpdateWithoutPropertyInput>
  }

  export type BookingUpdateManyWithWhereWithoutPropertyInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutPropertyInput>
  }

  export type CalendarBlockUpsertWithWhereUniqueWithoutPropertyInput = {
    where: CalendarBlockWhereUniqueInput
    update: XOR<CalendarBlockUpdateWithoutPropertyInput, CalendarBlockUncheckedUpdateWithoutPropertyInput>
    create: XOR<CalendarBlockCreateWithoutPropertyInput, CalendarBlockUncheckedCreateWithoutPropertyInput>
  }

  export type CalendarBlockUpdateWithWhereUniqueWithoutPropertyInput = {
    where: CalendarBlockWhereUniqueInput
    data: XOR<CalendarBlockUpdateWithoutPropertyInput, CalendarBlockUncheckedUpdateWithoutPropertyInput>
  }

  export type CalendarBlockUpdateManyWithWhereWithoutPropertyInput = {
    where: CalendarBlockScalarWhereInput
    data: XOR<CalendarBlockUpdateManyMutationInput, CalendarBlockUncheckedUpdateManyWithoutPropertyInput>
  }

  export type CalendarBlockScalarWhereInput = {
    AND?: CalendarBlockScalarWhereInput | CalendarBlockScalarWhereInput[]
    OR?: CalendarBlockScalarWhereInput[]
    NOT?: CalendarBlockScalarWhereInput | CalendarBlockScalarWhereInput[]
    id?: StringFilter<"CalendarBlock"> | string
    propertyId?: StringFilter<"CalendarBlock"> | string
    date?: DateTimeFilter<"CalendarBlock"> | Date | string
    reason?: StringFilter<"CalendarBlock"> | string
    bookingId?: StringNullableFilter<"CalendarBlock"> | string | null
  }

  export type ReviewUpsertWithWhereUniqueWithoutPropertyInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutPropertyInput, ReviewUncheckedUpdateWithoutPropertyInput>
    create: XOR<ReviewCreateWithoutPropertyInput, ReviewUncheckedCreateWithoutPropertyInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutPropertyInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutPropertyInput, ReviewUncheckedUpdateWithoutPropertyInput>
  }

  export type ReviewUpdateManyWithWhereWithoutPropertyInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutPropertyInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    propertyId?: StringFilter<"Review"> | string
    bookingId?: StringNullableFilter<"Review"> | string | null
    guestName?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    source?: StringFilter<"Review"> | string
    sourceLabel?: StringFilter<"Review"> | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
  }

  export type HostKnowledgeUpsertWithWhereUniqueWithoutPropertyInput = {
    where: HostKnowledgeWhereUniqueInput
    update: XOR<HostKnowledgeUpdateWithoutPropertyInput, HostKnowledgeUncheckedUpdateWithoutPropertyInput>
    create: XOR<HostKnowledgeCreateWithoutPropertyInput, HostKnowledgeUncheckedCreateWithoutPropertyInput>
  }

  export type HostKnowledgeUpdateWithWhereUniqueWithoutPropertyInput = {
    where: HostKnowledgeWhereUniqueInput
    data: XOR<HostKnowledgeUpdateWithoutPropertyInput, HostKnowledgeUncheckedUpdateWithoutPropertyInput>
  }

  export type HostKnowledgeUpdateManyWithWhereWithoutPropertyInput = {
    where: HostKnowledgeScalarWhereInput
    data: XOR<HostKnowledgeUpdateManyMutationInput, HostKnowledgeUncheckedUpdateManyWithoutPropertyInput>
  }

  export type PropertyCreateWithoutBookingsInput = {
    id?: string
    name: string
    description: string
    imageUrl: string
    airbnbUrl?: string | null
    basePrice: number
    status?: string
    address?: string | null
    amenities?: PropertyCreateamenitiesInput | string[]
    icalUrl?: string | null
    caretakerToken?: string | null
    caretakerPhone?: string | null
    caretakerName?: string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    host: HostCreateNestedOneWithoutPropertiesInput
    blocks?: CalendarBlockCreateNestedManyWithoutPropertyInput
    reviews?: ReviewCreateNestedManyWithoutPropertyInput
    knowledge?: HostKnowledgeCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutBookingsInput = {
    id?: string
    hostId: string
    name: string
    description: string
    imageUrl: string
    airbnbUrl?: string | null
    basePrice: number
    status?: string
    address?: string | null
    amenities?: PropertyCreateamenitiesInput | string[]
    icalUrl?: string | null
    caretakerToken?: string | null
    caretakerPhone?: string | null
    caretakerName?: string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    blocks?: CalendarBlockUncheckedCreateNestedManyWithoutPropertyInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutPropertyInput
    knowledge?: HostKnowledgeUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutBookingsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutBookingsInput, PropertyUncheckedCreateWithoutBookingsInput>
  }

  export type HostCreateWithoutBookingsInput = {
    id?: string
    email: string
    name: string
    phone: string
    plan?: string
    setupFeePaid?: boolean
    gatewayVendorId?: string | null
    cashfreeVendorId?: string | null
    apiKey?: string | null
    legacyApiKey?: string | null
    legacyApiKeyExpires?: Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    auth?: AuthRecordCreateNestedOneWithoutHostInput
    properties?: PropertyCreateNestedManyWithoutHostInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutHostInput
    notifications?: NotificationCreateNestedManyWithoutHostInput
    knowledge?: HostKnowledgeCreateNestedManyWithoutHostInput
  }

  export type HostUncheckedCreateWithoutBookingsInput = {
    id?: string
    email: string
    name: string
    phone: string
    plan?: string
    setupFeePaid?: boolean
    gatewayVendorId?: string | null
    cashfreeVendorId?: string | null
    apiKey?: string | null
    legacyApiKey?: string | null
    legacyApiKeyExpires?: Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    auth?: AuthRecordUncheckedCreateNestedOneWithoutHostInput
    properties?: PropertyUncheckedCreateNestedManyWithoutHostInput
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutHostInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutHostInput
    knowledge?: HostKnowledgeUncheckedCreateNestedManyWithoutHostInput
  }

  export type HostCreateOrConnectWithoutBookingsInput = {
    where: HostWhereUniqueInput
    create: XOR<HostCreateWithoutBookingsInput, HostUncheckedCreateWithoutBookingsInput>
  }

  export type LedgerEntryCreateWithoutBookingInput = {
    id?: string
    propertyId: string
    gatewayOrderId: string
    grossAmount: number
    hostAmount: number
    istayAmount: number
    status?: string
    settledAt?: Date | string | null
    createdAt?: Date | string
    host: HostCreateNestedOneWithoutLedgerEntriesInput
  }

  export type LedgerEntryUncheckedCreateWithoutBookingInput = {
    id?: string
    hostId: string
    propertyId: string
    gatewayOrderId: string
    grossAmount: number
    hostAmount: number
    istayAmount: number
    status?: string
    settledAt?: Date | string | null
    createdAt?: Date | string
  }

  export type LedgerEntryCreateOrConnectWithoutBookingInput = {
    where: LedgerEntryWhereUniqueInput
    create: XOR<LedgerEntryCreateWithoutBookingInput, LedgerEntryUncheckedCreateWithoutBookingInput>
  }

  export type LedgerEntryCreateManyBookingInputEnvelope = {
    data: LedgerEntryCreateManyBookingInput | LedgerEntryCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type GuestVerificationCreateWithoutBookingInput = {
    guestName: string
    idType: string
    idObjectKey?: string | null
    status?: string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    matchScore?: number | null
    flags?: GuestVerificationCreateflagsInput | string[]
    createdAt?: Date | string
    verifiedAt?: Date | string | null
  }

  export type GuestVerificationUncheckedCreateWithoutBookingInput = {
    guestName: string
    idType: string
    idObjectKey?: string | null
    status?: string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    matchScore?: number | null
    flags?: GuestVerificationCreateflagsInput | string[]
    createdAt?: Date | string
    verifiedAt?: Date | string | null
  }

  export type GuestVerificationCreateOrConnectWithoutBookingInput = {
    where: GuestVerificationWhereUniqueInput
    create: XOR<GuestVerificationCreateWithoutBookingInput, GuestVerificationUncheckedCreateWithoutBookingInput>
  }

  export type PropertyUpsertWithoutBookingsInput = {
    update: XOR<PropertyUpdateWithoutBookingsInput, PropertyUncheckedUpdateWithoutBookingsInput>
    create: XOR<PropertyCreateWithoutBookingsInput, PropertyUncheckedCreateWithoutBookingsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutBookingsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutBookingsInput, PropertyUncheckedUpdateWithoutBookingsInput>
  }

  export type PropertyUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    airbnbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: PropertyUpdateamenitiesInput | string[]
    icalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerToken?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: HostUpdateOneRequiredWithoutPropertiesNestedInput
    blocks?: CalendarBlockUpdateManyWithoutPropertyNestedInput
    reviews?: ReviewUpdateManyWithoutPropertyNestedInput
    knowledge?: HostKnowledgeUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    airbnbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: PropertyUpdateamenitiesInput | string[]
    icalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerToken?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blocks?: CalendarBlockUncheckedUpdateManyWithoutPropertyNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutPropertyNestedInput
    knowledge?: HostKnowledgeUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type HostUpsertWithoutBookingsInput = {
    update: XOR<HostUpdateWithoutBookingsInput, HostUncheckedUpdateWithoutBookingsInput>
    create: XOR<HostCreateWithoutBookingsInput, HostUncheckedCreateWithoutBookingsInput>
    where?: HostWhereInput
  }

  export type HostUpdateToOneWithWhereWithoutBookingsInput = {
    where?: HostWhereInput
    data: XOR<HostUpdateWithoutBookingsInput, HostUncheckedUpdateWithoutBookingsInput>
  }

  export type HostUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    setupFeePaid?: BoolFieldUpdateOperationsInput | boolean
    gatewayVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    cashfreeVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKeyExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auth?: AuthRecordUpdateOneWithoutHostNestedInput
    properties?: PropertyUpdateManyWithoutHostNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutHostNestedInput
    notifications?: NotificationUpdateManyWithoutHostNestedInput
    knowledge?: HostKnowledgeUpdateManyWithoutHostNestedInput
  }

  export type HostUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    setupFeePaid?: BoolFieldUpdateOperationsInput | boolean
    gatewayVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    cashfreeVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKeyExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auth?: AuthRecordUncheckedUpdateOneWithoutHostNestedInput
    properties?: PropertyUncheckedUpdateManyWithoutHostNestedInput
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutHostNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutHostNestedInput
    knowledge?: HostKnowledgeUncheckedUpdateManyWithoutHostNestedInput
  }

  export type LedgerEntryUpsertWithWhereUniqueWithoutBookingInput = {
    where: LedgerEntryWhereUniqueInput
    update: XOR<LedgerEntryUpdateWithoutBookingInput, LedgerEntryUncheckedUpdateWithoutBookingInput>
    create: XOR<LedgerEntryCreateWithoutBookingInput, LedgerEntryUncheckedCreateWithoutBookingInput>
  }

  export type LedgerEntryUpdateWithWhereUniqueWithoutBookingInput = {
    where: LedgerEntryWhereUniqueInput
    data: XOR<LedgerEntryUpdateWithoutBookingInput, LedgerEntryUncheckedUpdateWithoutBookingInput>
  }

  export type LedgerEntryUpdateManyWithWhereWithoutBookingInput = {
    where: LedgerEntryScalarWhereInput
    data: XOR<LedgerEntryUpdateManyMutationInput, LedgerEntryUncheckedUpdateManyWithoutBookingInput>
  }

  export type GuestVerificationUpsertWithoutBookingInput = {
    update: XOR<GuestVerificationUpdateWithoutBookingInput, GuestVerificationUncheckedUpdateWithoutBookingInput>
    create: XOR<GuestVerificationCreateWithoutBookingInput, GuestVerificationUncheckedCreateWithoutBookingInput>
    where?: GuestVerificationWhereInput
  }

  export type GuestVerificationUpdateToOneWithWhereWithoutBookingInput = {
    where?: GuestVerificationWhereInput
    data: XOR<GuestVerificationUpdateWithoutBookingInput, GuestVerificationUncheckedUpdateWithoutBookingInput>
  }

  export type GuestVerificationUpdateWithoutBookingInput = {
    guestName?: StringFieldUpdateOperationsInput | string
    idType?: StringFieldUpdateOperationsInput | string
    idObjectKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    flags?: GuestVerificationUpdateflagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GuestVerificationUncheckedUpdateWithoutBookingInput = {
    guestName?: StringFieldUpdateOperationsInput | string
    idType?: StringFieldUpdateOperationsInput | string
    idObjectKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    extractedData?: NullableJsonNullValueInput | InputJsonValue
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    flags?: GuestVerificationUpdateflagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PropertyCreateWithoutBlocksInput = {
    id?: string
    name: string
    description: string
    imageUrl: string
    airbnbUrl?: string | null
    basePrice: number
    status?: string
    address?: string | null
    amenities?: PropertyCreateamenitiesInput | string[]
    icalUrl?: string | null
    caretakerToken?: string | null
    caretakerPhone?: string | null
    caretakerName?: string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    host: HostCreateNestedOneWithoutPropertiesInput
    bookings?: BookingCreateNestedManyWithoutPropertyInput
    reviews?: ReviewCreateNestedManyWithoutPropertyInput
    knowledge?: HostKnowledgeCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutBlocksInput = {
    id?: string
    hostId: string
    name: string
    description: string
    imageUrl: string
    airbnbUrl?: string | null
    basePrice: number
    status?: string
    address?: string | null
    amenities?: PropertyCreateamenitiesInput | string[]
    icalUrl?: string | null
    caretakerToken?: string | null
    caretakerPhone?: string | null
    caretakerName?: string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutPropertyInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutPropertyInput
    knowledge?: HostKnowledgeUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutBlocksInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutBlocksInput, PropertyUncheckedCreateWithoutBlocksInput>
  }

  export type PropertyUpsertWithoutBlocksInput = {
    update: XOR<PropertyUpdateWithoutBlocksInput, PropertyUncheckedUpdateWithoutBlocksInput>
    create: XOR<PropertyCreateWithoutBlocksInput, PropertyUncheckedCreateWithoutBlocksInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutBlocksInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutBlocksInput, PropertyUncheckedUpdateWithoutBlocksInput>
  }

  export type PropertyUpdateWithoutBlocksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    airbnbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: PropertyUpdateamenitiesInput | string[]
    icalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerToken?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: HostUpdateOneRequiredWithoutPropertiesNestedInput
    bookings?: BookingUpdateManyWithoutPropertyNestedInput
    reviews?: ReviewUpdateManyWithoutPropertyNestedInput
    knowledge?: HostKnowledgeUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutBlocksInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    airbnbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: PropertyUpdateamenitiesInput | string[]
    icalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerToken?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutPropertyNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutPropertyNestedInput
    knowledge?: HostKnowledgeUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type BookingCreateWithoutLedgerEntriesInput = {
    id?: string
    guestName: string
    guestEmail: string
    guestPhone?: string | null
    guestIdRef?: string | null
    checkIn: Date | string
    checkOut: Date | string
    nights: number
    amount: number
    status?: string
    gatewayOrderId?: string | null
    paymentSessionId?: string | null
    idVerified?: boolean
    caretakerPhone?: string | null
    caretakerName?: string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutBookingsInput
    host: HostCreateNestedOneWithoutBookingsInput
    verification?: GuestVerificationCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutLedgerEntriesInput = {
    id?: string
    propertyId: string
    hostId: string
    guestName: string
    guestEmail: string
    guestPhone?: string | null
    guestIdRef?: string | null
    checkIn: Date | string
    checkOut: Date | string
    nights: number
    amount: number
    status?: string
    gatewayOrderId?: string | null
    paymentSessionId?: string | null
    idVerified?: boolean
    caretakerPhone?: string | null
    caretakerName?: string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    verification?: GuestVerificationUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutLedgerEntriesInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutLedgerEntriesInput, BookingUncheckedCreateWithoutLedgerEntriesInput>
  }

  export type HostCreateWithoutLedgerEntriesInput = {
    id?: string
    email: string
    name: string
    phone: string
    plan?: string
    setupFeePaid?: boolean
    gatewayVendorId?: string | null
    cashfreeVendorId?: string | null
    apiKey?: string | null
    legacyApiKey?: string | null
    legacyApiKeyExpires?: Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    auth?: AuthRecordCreateNestedOneWithoutHostInput
    properties?: PropertyCreateNestedManyWithoutHostInput
    bookings?: BookingCreateNestedManyWithoutHostInput
    notifications?: NotificationCreateNestedManyWithoutHostInput
    knowledge?: HostKnowledgeCreateNestedManyWithoutHostInput
  }

  export type HostUncheckedCreateWithoutLedgerEntriesInput = {
    id?: string
    email: string
    name: string
    phone: string
    plan?: string
    setupFeePaid?: boolean
    gatewayVendorId?: string | null
    cashfreeVendorId?: string | null
    apiKey?: string | null
    legacyApiKey?: string | null
    legacyApiKeyExpires?: Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    auth?: AuthRecordUncheckedCreateNestedOneWithoutHostInput
    properties?: PropertyUncheckedCreateNestedManyWithoutHostInput
    bookings?: BookingUncheckedCreateNestedManyWithoutHostInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutHostInput
    knowledge?: HostKnowledgeUncheckedCreateNestedManyWithoutHostInput
  }

  export type HostCreateOrConnectWithoutLedgerEntriesInput = {
    where: HostWhereUniqueInput
    create: XOR<HostCreateWithoutLedgerEntriesInput, HostUncheckedCreateWithoutLedgerEntriesInput>
  }

  export type BookingUpsertWithoutLedgerEntriesInput = {
    update: XOR<BookingUpdateWithoutLedgerEntriesInput, BookingUncheckedUpdateWithoutLedgerEntriesInput>
    create: XOR<BookingCreateWithoutLedgerEntriesInput, BookingUncheckedCreateWithoutLedgerEntriesInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutLedgerEntriesInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutLedgerEntriesInput, BookingUncheckedUpdateWithoutLedgerEntriesInput>
  }

  export type BookingUpdateWithoutLedgerEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestIdRef?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    idVerified?: BoolFieldUpdateOperationsInput | boolean
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutBookingsNestedInput
    host?: HostUpdateOneRequiredWithoutBookingsNestedInput
    verification?: GuestVerificationUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutLedgerEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestIdRef?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    idVerified?: BoolFieldUpdateOperationsInput | boolean
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verification?: GuestVerificationUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type HostUpsertWithoutLedgerEntriesInput = {
    update: XOR<HostUpdateWithoutLedgerEntriesInput, HostUncheckedUpdateWithoutLedgerEntriesInput>
    create: XOR<HostCreateWithoutLedgerEntriesInput, HostUncheckedCreateWithoutLedgerEntriesInput>
    where?: HostWhereInput
  }

  export type HostUpdateToOneWithWhereWithoutLedgerEntriesInput = {
    where?: HostWhereInput
    data: XOR<HostUpdateWithoutLedgerEntriesInput, HostUncheckedUpdateWithoutLedgerEntriesInput>
  }

  export type HostUpdateWithoutLedgerEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    setupFeePaid?: BoolFieldUpdateOperationsInput | boolean
    gatewayVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    cashfreeVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKeyExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auth?: AuthRecordUpdateOneWithoutHostNestedInput
    properties?: PropertyUpdateManyWithoutHostNestedInput
    bookings?: BookingUpdateManyWithoutHostNestedInput
    notifications?: NotificationUpdateManyWithoutHostNestedInput
    knowledge?: HostKnowledgeUpdateManyWithoutHostNestedInput
  }

  export type HostUncheckedUpdateWithoutLedgerEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    setupFeePaid?: BoolFieldUpdateOperationsInput | boolean
    gatewayVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    cashfreeVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKeyExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auth?: AuthRecordUncheckedUpdateOneWithoutHostNestedInput
    properties?: PropertyUncheckedUpdateManyWithoutHostNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutHostNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutHostNestedInput
    knowledge?: HostKnowledgeUncheckedUpdateManyWithoutHostNestedInput
  }

  export type HostCreateWithoutNotificationsInput = {
    id?: string
    email: string
    name: string
    phone: string
    plan?: string
    setupFeePaid?: boolean
    gatewayVendorId?: string | null
    cashfreeVendorId?: string | null
    apiKey?: string | null
    legacyApiKey?: string | null
    legacyApiKeyExpires?: Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    auth?: AuthRecordCreateNestedOneWithoutHostInput
    properties?: PropertyCreateNestedManyWithoutHostInput
    bookings?: BookingCreateNestedManyWithoutHostInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutHostInput
    knowledge?: HostKnowledgeCreateNestedManyWithoutHostInput
  }

  export type HostUncheckedCreateWithoutNotificationsInput = {
    id?: string
    email: string
    name: string
    phone: string
    plan?: string
    setupFeePaid?: boolean
    gatewayVendorId?: string | null
    cashfreeVendorId?: string | null
    apiKey?: string | null
    legacyApiKey?: string | null
    legacyApiKeyExpires?: Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    auth?: AuthRecordUncheckedCreateNestedOneWithoutHostInput
    properties?: PropertyUncheckedCreateNestedManyWithoutHostInput
    bookings?: BookingUncheckedCreateNestedManyWithoutHostInput
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutHostInput
    knowledge?: HostKnowledgeUncheckedCreateNestedManyWithoutHostInput
  }

  export type HostCreateOrConnectWithoutNotificationsInput = {
    where: HostWhereUniqueInput
    create: XOR<HostCreateWithoutNotificationsInput, HostUncheckedCreateWithoutNotificationsInput>
  }

  export type HostUpsertWithoutNotificationsInput = {
    update: XOR<HostUpdateWithoutNotificationsInput, HostUncheckedUpdateWithoutNotificationsInput>
    create: XOR<HostCreateWithoutNotificationsInput, HostUncheckedCreateWithoutNotificationsInput>
    where?: HostWhereInput
  }

  export type HostUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: HostWhereInput
    data: XOR<HostUpdateWithoutNotificationsInput, HostUncheckedUpdateWithoutNotificationsInput>
  }

  export type HostUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    setupFeePaid?: BoolFieldUpdateOperationsInput | boolean
    gatewayVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    cashfreeVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKeyExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auth?: AuthRecordUpdateOneWithoutHostNestedInput
    properties?: PropertyUpdateManyWithoutHostNestedInput
    bookings?: BookingUpdateManyWithoutHostNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutHostNestedInput
    knowledge?: HostKnowledgeUpdateManyWithoutHostNestedInput
  }

  export type HostUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    setupFeePaid?: BoolFieldUpdateOperationsInput | boolean
    gatewayVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    cashfreeVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKeyExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auth?: AuthRecordUncheckedUpdateOneWithoutHostNestedInput
    properties?: PropertyUncheckedUpdateManyWithoutHostNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutHostNestedInput
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutHostNestedInput
    knowledge?: HostKnowledgeUncheckedUpdateManyWithoutHostNestedInput
  }

  export type BookingCreateWithoutVerificationInput = {
    id?: string
    guestName: string
    guestEmail: string
    guestPhone?: string | null
    guestIdRef?: string | null
    checkIn: Date | string
    checkOut: Date | string
    nights: number
    amount: number
    status?: string
    gatewayOrderId?: string | null
    paymentSessionId?: string | null
    idVerified?: boolean
    caretakerPhone?: string | null
    caretakerName?: string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutBookingsInput
    host: HostCreateNestedOneWithoutBookingsInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutVerificationInput = {
    id?: string
    propertyId: string
    hostId: string
    guestName: string
    guestEmail: string
    guestPhone?: string | null
    guestIdRef?: string | null
    checkIn: Date | string
    checkOut: Date | string
    nights: number
    amount: number
    status?: string
    gatewayOrderId?: string | null
    paymentSessionId?: string | null
    idVerified?: boolean
    caretakerPhone?: string | null
    caretakerName?: string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutVerificationInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutVerificationInput, BookingUncheckedCreateWithoutVerificationInput>
  }

  export type BookingUpsertWithoutVerificationInput = {
    update: XOR<BookingUpdateWithoutVerificationInput, BookingUncheckedUpdateWithoutVerificationInput>
    create: XOR<BookingCreateWithoutVerificationInput, BookingUncheckedCreateWithoutVerificationInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutVerificationInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutVerificationInput, BookingUncheckedUpdateWithoutVerificationInput>
  }

  export type BookingUpdateWithoutVerificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestIdRef?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    idVerified?: BoolFieldUpdateOperationsInput | boolean
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutBookingsNestedInput
    host?: HostUpdateOneRequiredWithoutBookingsNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutVerificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestIdRef?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    idVerified?: BoolFieldUpdateOperationsInput | boolean
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type PropertyCreateWithoutReviewsInput = {
    id?: string
    name: string
    description: string
    imageUrl: string
    airbnbUrl?: string | null
    basePrice: number
    status?: string
    address?: string | null
    amenities?: PropertyCreateamenitiesInput | string[]
    icalUrl?: string | null
    caretakerToken?: string | null
    caretakerPhone?: string | null
    caretakerName?: string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    host: HostCreateNestedOneWithoutPropertiesInput
    bookings?: BookingCreateNestedManyWithoutPropertyInput
    blocks?: CalendarBlockCreateNestedManyWithoutPropertyInput
    knowledge?: HostKnowledgeCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutReviewsInput = {
    id?: string
    hostId: string
    name: string
    description: string
    imageUrl: string
    airbnbUrl?: string | null
    basePrice: number
    status?: string
    address?: string | null
    amenities?: PropertyCreateamenitiesInput | string[]
    icalUrl?: string | null
    caretakerToken?: string | null
    caretakerPhone?: string | null
    caretakerName?: string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutPropertyInput
    blocks?: CalendarBlockUncheckedCreateNestedManyWithoutPropertyInput
    knowledge?: HostKnowledgeUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutReviewsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutReviewsInput, PropertyUncheckedCreateWithoutReviewsInput>
  }

  export type PropertyUpsertWithoutReviewsInput = {
    update: XOR<PropertyUpdateWithoutReviewsInput, PropertyUncheckedUpdateWithoutReviewsInput>
    create: XOR<PropertyCreateWithoutReviewsInput, PropertyUncheckedCreateWithoutReviewsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutReviewsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutReviewsInput, PropertyUncheckedUpdateWithoutReviewsInput>
  }

  export type PropertyUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    airbnbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: PropertyUpdateamenitiesInput | string[]
    icalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerToken?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: HostUpdateOneRequiredWithoutPropertiesNestedInput
    bookings?: BookingUpdateManyWithoutPropertyNestedInput
    blocks?: CalendarBlockUpdateManyWithoutPropertyNestedInput
    knowledge?: HostKnowledgeUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    airbnbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: PropertyUpdateamenitiesInput | string[]
    icalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerToken?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutPropertyNestedInput
    blocks?: CalendarBlockUncheckedUpdateManyWithoutPropertyNestedInput
    knowledge?: HostKnowledgeUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type HostCreateWithoutKnowledgeInput = {
    id?: string
    email: string
    name: string
    phone: string
    plan?: string
    setupFeePaid?: boolean
    gatewayVendorId?: string | null
    cashfreeVendorId?: string | null
    apiKey?: string | null
    legacyApiKey?: string | null
    legacyApiKeyExpires?: Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    auth?: AuthRecordCreateNestedOneWithoutHostInput
    properties?: PropertyCreateNestedManyWithoutHostInput
    bookings?: BookingCreateNestedManyWithoutHostInput
    ledgerEntries?: LedgerEntryCreateNestedManyWithoutHostInput
    notifications?: NotificationCreateNestedManyWithoutHostInput
  }

  export type HostUncheckedCreateWithoutKnowledgeInput = {
    id?: string
    email: string
    name: string
    phone: string
    plan?: string
    setupFeePaid?: boolean
    gatewayVendorId?: string | null
    cashfreeVendorId?: string | null
    apiKey?: string | null
    legacyApiKey?: string | null
    legacyApiKeyExpires?: Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    auth?: AuthRecordUncheckedCreateNestedOneWithoutHostInput
    properties?: PropertyUncheckedCreateNestedManyWithoutHostInput
    bookings?: BookingUncheckedCreateNestedManyWithoutHostInput
    ledgerEntries?: LedgerEntryUncheckedCreateNestedManyWithoutHostInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutHostInput
  }

  export type HostCreateOrConnectWithoutKnowledgeInput = {
    where: HostWhereUniqueInput
    create: XOR<HostCreateWithoutKnowledgeInput, HostUncheckedCreateWithoutKnowledgeInput>
  }

  export type PropertyCreateWithoutKnowledgeInput = {
    id?: string
    name: string
    description: string
    imageUrl: string
    airbnbUrl?: string | null
    basePrice: number
    status?: string
    address?: string | null
    amenities?: PropertyCreateamenitiesInput | string[]
    icalUrl?: string | null
    caretakerToken?: string | null
    caretakerPhone?: string | null
    caretakerName?: string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    host: HostCreateNestedOneWithoutPropertiesInput
    bookings?: BookingCreateNestedManyWithoutPropertyInput
    blocks?: CalendarBlockCreateNestedManyWithoutPropertyInput
    reviews?: ReviewCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutKnowledgeInput = {
    id?: string
    hostId: string
    name: string
    description: string
    imageUrl: string
    airbnbUrl?: string | null
    basePrice: number
    status?: string
    address?: string | null
    amenities?: PropertyCreateamenitiesInput | string[]
    icalUrl?: string | null
    caretakerToken?: string | null
    caretakerPhone?: string | null
    caretakerName?: string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutPropertyInput
    blocks?: CalendarBlockUncheckedCreateNestedManyWithoutPropertyInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutKnowledgeInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutKnowledgeInput, PropertyUncheckedCreateWithoutKnowledgeInput>
  }

  export type HostUpsertWithoutKnowledgeInput = {
    update: XOR<HostUpdateWithoutKnowledgeInput, HostUncheckedUpdateWithoutKnowledgeInput>
    create: XOR<HostCreateWithoutKnowledgeInput, HostUncheckedCreateWithoutKnowledgeInput>
    where?: HostWhereInput
  }

  export type HostUpdateToOneWithWhereWithoutKnowledgeInput = {
    where?: HostWhereInput
    data: XOR<HostUpdateWithoutKnowledgeInput, HostUncheckedUpdateWithoutKnowledgeInput>
  }

  export type HostUpdateWithoutKnowledgeInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    setupFeePaid?: BoolFieldUpdateOperationsInput | boolean
    gatewayVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    cashfreeVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKeyExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auth?: AuthRecordUpdateOneWithoutHostNestedInput
    properties?: PropertyUpdateManyWithoutHostNestedInput
    bookings?: BookingUpdateManyWithoutHostNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutHostNestedInput
    notifications?: NotificationUpdateManyWithoutHostNestedInput
  }

  export type HostUncheckedUpdateWithoutKnowledgeInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    setupFeePaid?: BoolFieldUpdateOperationsInput | boolean
    gatewayVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    cashfreeVendorId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    legacyApiKeyExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    webhooks?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auth?: AuthRecordUncheckedUpdateOneWithoutHostNestedInput
    properties?: PropertyUncheckedUpdateManyWithoutHostNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutHostNestedInput
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutHostNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutHostNestedInput
  }

  export type PropertyUpsertWithoutKnowledgeInput = {
    update: XOR<PropertyUpdateWithoutKnowledgeInput, PropertyUncheckedUpdateWithoutKnowledgeInput>
    create: XOR<PropertyCreateWithoutKnowledgeInput, PropertyUncheckedCreateWithoutKnowledgeInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutKnowledgeInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutKnowledgeInput, PropertyUncheckedUpdateWithoutKnowledgeInput>
  }

  export type PropertyUpdateWithoutKnowledgeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    airbnbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: PropertyUpdateamenitiesInput | string[]
    icalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerToken?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: HostUpdateOneRequiredWithoutPropertiesNestedInput
    bookings?: BookingUpdateManyWithoutPropertyNestedInput
    blocks?: CalendarBlockUpdateManyWithoutPropertyNestedInput
    reviews?: ReviewUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutKnowledgeInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    airbnbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: PropertyUpdateamenitiesInput | string[]
    icalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerToken?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutPropertyNestedInput
    blocks?: CalendarBlockUncheckedUpdateManyWithoutPropertyNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateManyHostInput = {
    id?: string
    name: string
    description: string
    imageUrl: string
    airbnbUrl?: string | null
    basePrice: number
    status?: string
    address?: string | null
    amenities?: PropertyCreateamenitiesInput | string[]
    icalUrl?: string | null
    caretakerToken?: string | null
    caretakerPhone?: string | null
    caretakerName?: string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateManyHostInput = {
    id?: string
    propertyId: string
    guestName: string
    guestEmail: string
    guestPhone?: string | null
    guestIdRef?: string | null
    checkIn: Date | string
    checkOut: Date | string
    nights: number
    amount: number
    status?: string
    gatewayOrderId?: string | null
    paymentSessionId?: string | null
    idVerified?: boolean
    caretakerPhone?: string | null
    caretakerName?: string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LedgerEntryCreateManyHostInput = {
    id?: string
    bookingId: string
    propertyId: string
    gatewayOrderId: string
    grossAmount: number
    hostAmount: number
    istayAmount: number
    status?: string
    settledAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NotificationCreateManyHostInput = {
    id?: string
    type: string
    title: string
    message: string
    propertyName: string
    meta?: NullableJsonNullValueInput | InputJsonValue
    read?: boolean
    createdAt?: Date | string
  }

  export type HostKnowledgeCreateManyHostInput = {
    id?: string
    propertyId: string
    content: string
    updatedAt?: Date | string
  }

  export type PropertyUpdateWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    airbnbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: PropertyUpdateamenitiesInput | string[]
    icalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerToken?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutPropertyNestedInput
    blocks?: CalendarBlockUpdateManyWithoutPropertyNestedInput
    reviews?: ReviewUpdateManyWithoutPropertyNestedInput
    knowledge?: HostKnowledgeUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    airbnbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: PropertyUpdateamenitiesInput | string[]
    icalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerToken?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutPropertyNestedInput
    blocks?: CalendarBlockUncheckedUpdateManyWithoutPropertyNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutPropertyNestedInput
    knowledge?: HostKnowledgeUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateManyWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    airbnbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    basePrice?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    amenities?: PropertyUpdateamenitiesInput | string[]
    icalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerToken?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    pricingSettings?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUpdateWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestIdRef?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    idVerified?: BoolFieldUpdateOperationsInput | boolean
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutBookingsNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutBookingNestedInput
    verification?: GuestVerificationUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestIdRef?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    idVerified?: BoolFieldUpdateOperationsInput | boolean
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutBookingNestedInput
    verification?: GuestVerificationUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestIdRef?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    idVerified?: BoolFieldUpdateOperationsInput | boolean
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryUpdateWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: StringFieldUpdateOperationsInput | string
    grossAmount?: FloatFieldUpdateOperationsInput | number
    hostAmount?: FloatFieldUpdateOperationsInput | number
    istayAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutLedgerEntriesNestedInput
  }

  export type LedgerEntryUncheckedUpdateWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: StringFieldUpdateOperationsInput | string
    grossAmount?: FloatFieldUpdateOperationsInput | number
    hostAmount?: FloatFieldUpdateOperationsInput | number
    istayAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryUncheckedUpdateManyWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: StringFieldUpdateOperationsInput | string
    grossAmount?: FloatFieldUpdateOperationsInput | number
    hostAmount?: FloatFieldUpdateOperationsInput | number
    istayAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    propertyName?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    propertyName?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    propertyName?: StringFieldUpdateOperationsInput | string
    meta?: NullableJsonNullValueInput | InputJsonValue
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HostKnowledgeUpdateWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutKnowledgeNestedInput
  }

  export type HostKnowledgeUncheckedUpdateWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HostKnowledgeUncheckedUpdateManyWithoutHostInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyPropertyInput = {
    id?: string
    hostId: string
    guestName: string
    guestEmail: string
    guestPhone?: string | null
    guestIdRef?: string | null
    checkIn: Date | string
    checkOut: Date | string
    nights: number
    amount: number
    status?: string
    gatewayOrderId?: string | null
    paymentSessionId?: string | null
    idVerified?: boolean
    caretakerPhone?: string | null
    caretakerName?: string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CalendarBlockCreateManyPropertyInput = {
    id?: string
    date: Date | string
    reason: string
    bookingId?: string | null
  }

  export type ReviewCreateManyPropertyInput = {
    id?: string
    bookingId?: string | null
    guestName: string
    rating: number
    comment: string
    source?: string
    sourceLabel: string
    createdAt?: Date | string
  }

  export type HostKnowledgeCreateManyPropertyInput = {
    id?: string
    hostId: string
    content: string
    updatedAt?: Date | string
  }

  export type BookingUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestIdRef?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    idVerified?: BoolFieldUpdateOperationsInput | boolean
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: HostUpdateOneRequiredWithoutBookingsNestedInput
    ledgerEntries?: LedgerEntryUpdateManyWithoutBookingNestedInput
    verification?: GuestVerificationUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestIdRef?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    idVerified?: BoolFieldUpdateOperationsInput | boolean
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ledgerEntries?: LedgerEntryUncheckedUpdateManyWithoutBookingNestedInput
    verification?: GuestVerificationUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestEmail?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestIdRef?: NullableStringFieldUpdateOperationsInput | string | null
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    idVerified?: BoolFieldUpdateOperationsInput | boolean
    caretakerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    caretakerName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutChecklist?: NullableJsonNullValueInput | InputJsonValue
    cleanProofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalendarBlockUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CalendarBlockUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CalendarBlockUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    guestName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceLabel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    guestName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceLabel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: NullableStringFieldUpdateOperationsInput | string | null
    guestName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceLabel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HostKnowledgeUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: HostUpdateOneRequiredWithoutKnowledgeNestedInput
  }

  export type HostKnowledgeUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HostKnowledgeUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryCreateManyBookingInput = {
    id?: string
    hostId: string
    propertyId: string
    gatewayOrderId: string
    grossAmount: number
    hostAmount: number
    istayAmount: number
    status?: string
    settledAt?: Date | string | null
    createdAt?: Date | string
  }

  export type LedgerEntryUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: StringFieldUpdateOperationsInput | string
    grossAmount?: FloatFieldUpdateOperationsInput | number
    hostAmount?: FloatFieldUpdateOperationsInput | number
    istayAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    host?: HostUpdateOneRequiredWithoutLedgerEntriesNestedInput
  }

  export type LedgerEntryUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: StringFieldUpdateOperationsInput | string
    grossAmount?: FloatFieldUpdateOperationsInput | number
    hostAmount?: FloatFieldUpdateOperationsInput | number
    istayAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryUncheckedUpdateManyWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    gatewayOrderId?: StringFieldUpdateOperationsInput | string
    grossAmount?: FloatFieldUpdateOperationsInput | number
    hostAmount?: FloatFieldUpdateOperationsInput | number
    istayAmount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}