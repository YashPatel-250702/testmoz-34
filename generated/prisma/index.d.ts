
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Mentor
 * 
 */
export type Mentor = $Result.DefaultSelection<Prisma.$MentorPayload>
/**
 * Model Test
 * 
 */
export type Test = $Result.DefaultSelection<Prisma.$TestPayload>
/**
 * Model TestQuestions
 * 
 */
export type TestQuestions = $Result.DefaultSelection<Prisma.$TestQuestionsPayload>
/**
 * Model TestResults
 * 
 */
export type TestResults = $Result.DefaultSelection<Prisma.$TestResultsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TestType: {
  COLLEGE: 'COLLEGE',
  PLACEMENT: 'PLACEMENT'
};

export type TestType = (typeof TestType)[keyof typeof TestType]


export const TestStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type TestStatus = (typeof TestStatus)[keyof typeof TestStatus]


export const TesResultStatus: {
  PASSED: 'PASSED',
  FAILED: 'FAILED'
};

export type TesResultStatus = (typeof TesResultStatus)[keyof typeof TesResultStatus]

}

export type TestType = $Enums.TestType

export const TestType: typeof $Enums.TestType

export type TestStatus = $Enums.TestStatus

export const TestStatus: typeof $Enums.TestStatus

export type TesResultStatus = $Enums.TesResultStatus

export const TesResultStatus: typeof $Enums.TesResultStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Mentors
 * const mentors = await prisma.mentor.findMany()
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
   * // Fetch zero or more Mentors
   * const mentors = await prisma.mentor.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.mentor`: Exposes CRUD operations for the **Mentor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mentors
    * const mentors = await prisma.mentor.findMany()
    * ```
    */
  get mentor(): Prisma.MentorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.test`: Exposes CRUD operations for the **Test** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tests
    * const tests = await prisma.test.findMany()
    * ```
    */
  get test(): Prisma.TestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testQuestions`: Exposes CRUD operations for the **TestQuestions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestQuestions
    * const testQuestions = await prisma.testQuestions.findMany()
    * ```
    */
  get testQuestions(): Prisma.TestQuestionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testResults`: Exposes CRUD operations for the **TestResults** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestResults
    * const testResults = await prisma.testResults.findMany()
    * ```
    */
  get testResults(): Prisma.TestResultsDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    Mentor: 'Mentor',
    Test: 'Test',
    TestQuestions: 'TestQuestions',
    TestResults: 'TestResults'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "mentor" | "test" | "testQuestions" | "testResults"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Mentor: {
        payload: Prisma.$MentorPayload<ExtArgs>
        fields: Prisma.MentorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MentorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MentorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorPayload>
          }
          findFirst: {
            args: Prisma.MentorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MentorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorPayload>
          }
          findMany: {
            args: Prisma.MentorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorPayload>[]
          }
          create: {
            args: Prisma.MentorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorPayload>
          }
          createMany: {
            args: Prisma.MentorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MentorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorPayload>[]
          }
          delete: {
            args: Prisma.MentorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorPayload>
          }
          update: {
            args: Prisma.MentorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorPayload>
          }
          deleteMany: {
            args: Prisma.MentorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MentorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MentorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorPayload>[]
          }
          upsert: {
            args: Prisma.MentorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MentorPayload>
          }
          aggregate: {
            args: Prisma.MentorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMentor>
          }
          groupBy: {
            args: Prisma.MentorGroupByArgs<ExtArgs>
            result: $Utils.Optional<MentorGroupByOutputType>[]
          }
          count: {
            args: Prisma.MentorCountArgs<ExtArgs>
            result: $Utils.Optional<MentorCountAggregateOutputType> | number
          }
        }
      }
      Test: {
        payload: Prisma.$TestPayload<ExtArgs>
        fields: Prisma.TestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          findFirst: {
            args: Prisma.TestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          findMany: {
            args: Prisma.TestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>[]
          }
          create: {
            args: Prisma.TestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          createMany: {
            args: Prisma.TestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>[]
          }
          delete: {
            args: Prisma.TestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          update: {
            args: Prisma.TestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          deleteMany: {
            args: Prisma.TestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>[]
          }
          upsert: {
            args: Prisma.TestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          aggregate: {
            args: Prisma.TestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTest>
          }
          groupBy: {
            args: Prisma.TestGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestCountArgs<ExtArgs>
            result: $Utils.Optional<TestCountAggregateOutputType> | number
          }
        }
      }
      TestQuestions: {
        payload: Prisma.$TestQuestionsPayload<ExtArgs>
        fields: Prisma.TestQuestionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestQuestionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestQuestionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestQuestionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestQuestionsPayload>
          }
          findFirst: {
            args: Prisma.TestQuestionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestQuestionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestQuestionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestQuestionsPayload>
          }
          findMany: {
            args: Prisma.TestQuestionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestQuestionsPayload>[]
          }
          create: {
            args: Prisma.TestQuestionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestQuestionsPayload>
          }
          createMany: {
            args: Prisma.TestQuestionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestQuestionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestQuestionsPayload>[]
          }
          delete: {
            args: Prisma.TestQuestionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestQuestionsPayload>
          }
          update: {
            args: Prisma.TestQuestionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestQuestionsPayload>
          }
          deleteMany: {
            args: Prisma.TestQuestionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestQuestionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestQuestionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestQuestionsPayload>[]
          }
          upsert: {
            args: Prisma.TestQuestionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestQuestionsPayload>
          }
          aggregate: {
            args: Prisma.TestQuestionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestQuestions>
          }
          groupBy: {
            args: Prisma.TestQuestionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestQuestionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestQuestionsCountArgs<ExtArgs>
            result: $Utils.Optional<TestQuestionsCountAggregateOutputType> | number
          }
        }
      }
      TestResults: {
        payload: Prisma.$TestResultsPayload<ExtArgs>
        fields: Prisma.TestResultsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestResultsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestResultsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultsPayload>
          }
          findFirst: {
            args: Prisma.TestResultsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestResultsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultsPayload>
          }
          findMany: {
            args: Prisma.TestResultsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultsPayload>[]
          }
          create: {
            args: Prisma.TestResultsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultsPayload>
          }
          createMany: {
            args: Prisma.TestResultsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestResultsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultsPayload>[]
          }
          delete: {
            args: Prisma.TestResultsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultsPayload>
          }
          update: {
            args: Prisma.TestResultsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultsPayload>
          }
          deleteMany: {
            args: Prisma.TestResultsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestResultsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestResultsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultsPayload>[]
          }
          upsert: {
            args: Prisma.TestResultsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultsPayload>
          }
          aggregate: {
            args: Prisma.TestResultsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestResults>
          }
          groupBy: {
            args: Prisma.TestResultsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestResultsGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestResultsCountArgs<ExtArgs>
            result: $Utils.Optional<TestResultsCountAggregateOutputType> | number
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
    mentor?: MentorOmit
    test?: TestOmit
    testQuestions?: TestQuestionsOmit
    testResults?: TestResultsOmit
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
   * Count Type TestCountOutputType
   */

  export type TestCountOutputType = {
    questions: number
    attempts: number
  }

  export type TestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | TestCountOutputTypeCountQuestionsArgs
    attempts?: boolean | TestCountOutputTypeCountAttemptsArgs
  }

  // Custom InputTypes
  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCountOutputType
     */
    select?: TestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestQuestionsWhereInput
  }

  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeCountAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestResultsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Mentor
   */

  export type AggregateMentor = {
    _count: MentorCountAggregateOutputType | null
    _min: MentorMinAggregateOutputType | null
    _max: MentorMaxAggregateOutputType | null
  }

  export type MentorMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    mobile: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    mobile: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MentorCountAggregateOutputType = {
    id: number
    email: number
    name: number
    mobile: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MentorMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    mobile?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    mobile?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MentorCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    mobile?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MentorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mentor to aggregate.
     */
    where?: MentorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mentors to fetch.
     */
    orderBy?: MentorOrderByWithRelationInput | MentorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MentorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mentors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mentors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mentors
    **/
    _count?: true | MentorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MentorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MentorMaxAggregateInputType
  }

  export type GetMentorAggregateType<T extends MentorAggregateArgs> = {
        [P in keyof T & keyof AggregateMentor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMentor[P]>
      : GetScalarType<T[P], AggregateMentor[P]>
  }




  export type MentorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MentorWhereInput
    orderBy?: MentorOrderByWithAggregationInput | MentorOrderByWithAggregationInput[]
    by: MentorScalarFieldEnum[] | MentorScalarFieldEnum
    having?: MentorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MentorCountAggregateInputType | true
    _min?: MentorMinAggregateInputType
    _max?: MentorMaxAggregateInputType
  }

  export type MentorGroupByOutputType = {
    id: string
    email: string
    name: string | null
    mobile: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: MentorCountAggregateOutputType | null
    _min: MentorMinAggregateOutputType | null
    _max: MentorMaxAggregateOutputType | null
  }

  type GetMentorGroupByPayload<T extends MentorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MentorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MentorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MentorGroupByOutputType[P]>
            : GetScalarType<T[P], MentorGroupByOutputType[P]>
        }
      >
    >


  export type MentorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    mobile?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mentor"]>

  export type MentorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    mobile?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mentor"]>

  export type MentorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    mobile?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mentor"]>

  export type MentorSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    mobile?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MentorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "mobile" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["mentor"]>

  export type $MentorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mentor"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      mobile: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mentor"]>
    composites: {}
  }

  type MentorGetPayload<S extends boolean | null | undefined | MentorDefaultArgs> = $Result.GetResult<Prisma.$MentorPayload, S>

  type MentorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MentorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MentorCountAggregateInputType | true
    }

  export interface MentorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mentor'], meta: { name: 'Mentor' } }
    /**
     * Find zero or one Mentor that matches the filter.
     * @param {MentorFindUniqueArgs} args - Arguments to find a Mentor
     * @example
     * // Get one Mentor
     * const mentor = await prisma.mentor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MentorFindUniqueArgs>(args: SelectSubset<T, MentorFindUniqueArgs<ExtArgs>>): Prisma__MentorClient<$Result.GetResult<Prisma.$MentorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mentor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MentorFindUniqueOrThrowArgs} args - Arguments to find a Mentor
     * @example
     * // Get one Mentor
     * const mentor = await prisma.mentor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MentorFindUniqueOrThrowArgs>(args: SelectSubset<T, MentorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MentorClient<$Result.GetResult<Prisma.$MentorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mentor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorFindFirstArgs} args - Arguments to find a Mentor
     * @example
     * // Get one Mentor
     * const mentor = await prisma.mentor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MentorFindFirstArgs>(args?: SelectSubset<T, MentorFindFirstArgs<ExtArgs>>): Prisma__MentorClient<$Result.GetResult<Prisma.$MentorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mentor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorFindFirstOrThrowArgs} args - Arguments to find a Mentor
     * @example
     * // Get one Mentor
     * const mentor = await prisma.mentor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MentorFindFirstOrThrowArgs>(args?: SelectSubset<T, MentorFindFirstOrThrowArgs<ExtArgs>>): Prisma__MentorClient<$Result.GetResult<Prisma.$MentorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mentors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mentors
     * const mentors = await prisma.mentor.findMany()
     * 
     * // Get first 10 Mentors
     * const mentors = await prisma.mentor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mentorWithIdOnly = await prisma.mentor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MentorFindManyArgs>(args?: SelectSubset<T, MentorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mentor.
     * @param {MentorCreateArgs} args - Arguments to create a Mentor.
     * @example
     * // Create one Mentor
     * const Mentor = await prisma.mentor.create({
     *   data: {
     *     // ... data to create a Mentor
     *   }
     * })
     * 
     */
    create<T extends MentorCreateArgs>(args: SelectSubset<T, MentorCreateArgs<ExtArgs>>): Prisma__MentorClient<$Result.GetResult<Prisma.$MentorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mentors.
     * @param {MentorCreateManyArgs} args - Arguments to create many Mentors.
     * @example
     * // Create many Mentors
     * const mentor = await prisma.mentor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MentorCreateManyArgs>(args?: SelectSubset<T, MentorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mentors and returns the data saved in the database.
     * @param {MentorCreateManyAndReturnArgs} args - Arguments to create many Mentors.
     * @example
     * // Create many Mentors
     * const mentor = await prisma.mentor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mentors and only return the `id`
     * const mentorWithIdOnly = await prisma.mentor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MentorCreateManyAndReturnArgs>(args?: SelectSubset<T, MentorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mentor.
     * @param {MentorDeleteArgs} args - Arguments to delete one Mentor.
     * @example
     * // Delete one Mentor
     * const Mentor = await prisma.mentor.delete({
     *   where: {
     *     // ... filter to delete one Mentor
     *   }
     * })
     * 
     */
    delete<T extends MentorDeleteArgs>(args: SelectSubset<T, MentorDeleteArgs<ExtArgs>>): Prisma__MentorClient<$Result.GetResult<Prisma.$MentorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mentor.
     * @param {MentorUpdateArgs} args - Arguments to update one Mentor.
     * @example
     * // Update one Mentor
     * const mentor = await prisma.mentor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MentorUpdateArgs>(args: SelectSubset<T, MentorUpdateArgs<ExtArgs>>): Prisma__MentorClient<$Result.GetResult<Prisma.$MentorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mentors.
     * @param {MentorDeleteManyArgs} args - Arguments to filter Mentors to delete.
     * @example
     * // Delete a few Mentors
     * const { count } = await prisma.mentor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MentorDeleteManyArgs>(args?: SelectSubset<T, MentorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mentors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mentors
     * const mentor = await prisma.mentor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MentorUpdateManyArgs>(args: SelectSubset<T, MentorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mentors and returns the data updated in the database.
     * @param {MentorUpdateManyAndReturnArgs} args - Arguments to update many Mentors.
     * @example
     * // Update many Mentors
     * const mentor = await prisma.mentor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Mentors and only return the `id`
     * const mentorWithIdOnly = await prisma.mentor.updateManyAndReturn({
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
    updateManyAndReturn<T extends MentorUpdateManyAndReturnArgs>(args: SelectSubset<T, MentorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MentorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mentor.
     * @param {MentorUpsertArgs} args - Arguments to update or create a Mentor.
     * @example
     * // Update or create a Mentor
     * const mentor = await prisma.mentor.upsert({
     *   create: {
     *     // ... data to create a Mentor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mentor we want to update
     *   }
     * })
     */
    upsert<T extends MentorUpsertArgs>(args: SelectSubset<T, MentorUpsertArgs<ExtArgs>>): Prisma__MentorClient<$Result.GetResult<Prisma.$MentorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mentors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorCountArgs} args - Arguments to filter Mentors to count.
     * @example
     * // Count the number of Mentors
     * const count = await prisma.mentor.count({
     *   where: {
     *     // ... the filter for the Mentors we want to count
     *   }
     * })
    **/
    count<T extends MentorCountArgs>(
      args?: Subset<T, MentorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MentorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mentor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MentorAggregateArgs>(args: Subset<T, MentorAggregateArgs>): Prisma.PrismaPromise<GetMentorAggregateType<T>>

    /**
     * Group by Mentor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MentorGroupByArgs} args - Group by arguments.
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
      T extends MentorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MentorGroupByArgs['orderBy'] }
        : { orderBy?: MentorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MentorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMentorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mentor model
   */
  readonly fields: MentorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mentor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MentorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Mentor model
   */
  interface MentorFieldRefs {
    readonly id: FieldRef<"Mentor", 'String'>
    readonly email: FieldRef<"Mentor", 'String'>
    readonly name: FieldRef<"Mentor", 'String'>
    readonly mobile: FieldRef<"Mentor", 'String'>
    readonly password: FieldRef<"Mentor", 'String'>
    readonly createdAt: FieldRef<"Mentor", 'DateTime'>
    readonly updatedAt: FieldRef<"Mentor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Mentor findUnique
   */
  export type MentorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mentor
     */
    select?: MentorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mentor
     */
    omit?: MentorOmit<ExtArgs> | null
    /**
     * Filter, which Mentor to fetch.
     */
    where: MentorWhereUniqueInput
  }

  /**
   * Mentor findUniqueOrThrow
   */
  export type MentorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mentor
     */
    select?: MentorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mentor
     */
    omit?: MentorOmit<ExtArgs> | null
    /**
     * Filter, which Mentor to fetch.
     */
    where: MentorWhereUniqueInput
  }

  /**
   * Mentor findFirst
   */
  export type MentorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mentor
     */
    select?: MentorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mentor
     */
    omit?: MentorOmit<ExtArgs> | null
    /**
     * Filter, which Mentor to fetch.
     */
    where?: MentorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mentors to fetch.
     */
    orderBy?: MentorOrderByWithRelationInput | MentorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mentors.
     */
    cursor?: MentorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mentors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mentors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mentors.
     */
    distinct?: MentorScalarFieldEnum | MentorScalarFieldEnum[]
  }

  /**
   * Mentor findFirstOrThrow
   */
  export type MentorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mentor
     */
    select?: MentorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mentor
     */
    omit?: MentorOmit<ExtArgs> | null
    /**
     * Filter, which Mentor to fetch.
     */
    where?: MentorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mentors to fetch.
     */
    orderBy?: MentorOrderByWithRelationInput | MentorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mentors.
     */
    cursor?: MentorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mentors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mentors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mentors.
     */
    distinct?: MentorScalarFieldEnum | MentorScalarFieldEnum[]
  }

  /**
   * Mentor findMany
   */
  export type MentorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mentor
     */
    select?: MentorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mentor
     */
    omit?: MentorOmit<ExtArgs> | null
    /**
     * Filter, which Mentors to fetch.
     */
    where?: MentorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mentors to fetch.
     */
    orderBy?: MentorOrderByWithRelationInput | MentorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mentors.
     */
    cursor?: MentorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mentors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mentors.
     */
    skip?: number
    distinct?: MentorScalarFieldEnum | MentorScalarFieldEnum[]
  }

  /**
   * Mentor create
   */
  export type MentorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mentor
     */
    select?: MentorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mentor
     */
    omit?: MentorOmit<ExtArgs> | null
    /**
     * The data needed to create a Mentor.
     */
    data: XOR<MentorCreateInput, MentorUncheckedCreateInput>
  }

  /**
   * Mentor createMany
   */
  export type MentorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mentors.
     */
    data: MentorCreateManyInput | MentorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mentor createManyAndReturn
   */
  export type MentorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mentor
     */
    select?: MentorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mentor
     */
    omit?: MentorOmit<ExtArgs> | null
    /**
     * The data used to create many Mentors.
     */
    data: MentorCreateManyInput | MentorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mentor update
   */
  export type MentorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mentor
     */
    select?: MentorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mentor
     */
    omit?: MentorOmit<ExtArgs> | null
    /**
     * The data needed to update a Mentor.
     */
    data: XOR<MentorUpdateInput, MentorUncheckedUpdateInput>
    /**
     * Choose, which Mentor to update.
     */
    where: MentorWhereUniqueInput
  }

  /**
   * Mentor updateMany
   */
  export type MentorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mentors.
     */
    data: XOR<MentorUpdateManyMutationInput, MentorUncheckedUpdateManyInput>
    /**
     * Filter which Mentors to update
     */
    where?: MentorWhereInput
    /**
     * Limit how many Mentors to update.
     */
    limit?: number
  }

  /**
   * Mentor updateManyAndReturn
   */
  export type MentorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mentor
     */
    select?: MentorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mentor
     */
    omit?: MentorOmit<ExtArgs> | null
    /**
     * The data used to update Mentors.
     */
    data: XOR<MentorUpdateManyMutationInput, MentorUncheckedUpdateManyInput>
    /**
     * Filter which Mentors to update
     */
    where?: MentorWhereInput
    /**
     * Limit how many Mentors to update.
     */
    limit?: number
  }

  /**
   * Mentor upsert
   */
  export type MentorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mentor
     */
    select?: MentorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mentor
     */
    omit?: MentorOmit<ExtArgs> | null
    /**
     * The filter to search for the Mentor to update in case it exists.
     */
    where: MentorWhereUniqueInput
    /**
     * In case the Mentor found by the `where` argument doesn't exist, create a new Mentor with this data.
     */
    create: XOR<MentorCreateInput, MentorUncheckedCreateInput>
    /**
     * In case the Mentor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MentorUpdateInput, MentorUncheckedUpdateInput>
  }

  /**
   * Mentor delete
   */
  export type MentorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mentor
     */
    select?: MentorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mentor
     */
    omit?: MentorOmit<ExtArgs> | null
    /**
     * Filter which Mentor to delete.
     */
    where: MentorWhereUniqueInput
  }

  /**
   * Mentor deleteMany
   */
  export type MentorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mentors to delete
     */
    where?: MentorWhereInput
    /**
     * Limit how many Mentors to delete.
     */
    limit?: number
  }

  /**
   * Mentor without action
   */
  export type MentorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mentor
     */
    select?: MentorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mentor
     */
    omit?: MentorOmit<ExtArgs> | null
  }


  /**
   * Model Test
   */

  export type AggregateTest = {
    _count: TestCountAggregateOutputType | null
    _avg: TestAvgAggregateOutputType | null
    _sum: TestSumAggregateOutputType | null
    _min: TestMinAggregateOutputType | null
    _max: TestMaxAggregateOutputType | null
  }

  export type TestAvgAggregateOutputType = {
    duration: number | null
    noOfQuestions: number | null
    noOfAttempts: number | null
  }

  export type TestSumAggregateOutputType = {
    duration: number | null
    noOfQuestions: number | null
    noOfAttempts: number | null
  }

  export type TestMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    conceptsCovered: string | null
    type: $Enums.TestType | null
    status: $Enums.TestStatus | null
    duration: number | null
    noOfQuestions: number | null
    noOfAttempts: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TestMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    conceptsCovered: string | null
    type: $Enums.TestType | null
    status: $Enums.TestStatus | null
    duration: number | null
    noOfQuestions: number | null
    noOfAttempts: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TestCountAggregateOutputType = {
    id: number
    name: number
    description: number
    conceptsCovered: number
    type: number
    status: number
    duration: number
    noOfQuestions: number
    noOfAttempts: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TestAvgAggregateInputType = {
    duration?: true
    noOfQuestions?: true
    noOfAttempts?: true
  }

  export type TestSumAggregateInputType = {
    duration?: true
    noOfQuestions?: true
    noOfAttempts?: true
  }

  export type TestMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    conceptsCovered?: true
    type?: true
    status?: true
    duration?: true
    noOfQuestions?: true
    noOfAttempts?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TestMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    conceptsCovered?: true
    type?: true
    status?: true
    duration?: true
    noOfQuestions?: true
    noOfAttempts?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TestCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    conceptsCovered?: true
    type?: true
    status?: true
    duration?: true
    noOfQuestions?: true
    noOfAttempts?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Test to aggregate.
     */
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     */
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tests
    **/
    _count?: true | TestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestMaxAggregateInputType
  }

  export type GetTestAggregateType<T extends TestAggregateArgs> = {
        [P in keyof T & keyof AggregateTest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTest[P]>
      : GetScalarType<T[P], AggregateTest[P]>
  }




  export type TestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestWhereInput
    orderBy?: TestOrderByWithAggregationInput | TestOrderByWithAggregationInput[]
    by: TestScalarFieldEnum[] | TestScalarFieldEnum
    having?: TestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestCountAggregateInputType | true
    _avg?: TestAvgAggregateInputType
    _sum?: TestSumAggregateInputType
    _min?: TestMinAggregateInputType
    _max?: TestMaxAggregateInputType
  }

  export type TestGroupByOutputType = {
    id: string
    name: string | null
    description: string | null
    conceptsCovered: string | null
    type: $Enums.TestType | null
    status: $Enums.TestStatus | null
    duration: number | null
    noOfQuestions: number | null
    noOfAttempts: number | null
    createdAt: Date
    updatedAt: Date
    _count: TestCountAggregateOutputType | null
    _avg: TestAvgAggregateOutputType | null
    _sum: TestSumAggregateOutputType | null
    _min: TestMinAggregateOutputType | null
    _max: TestMaxAggregateOutputType | null
  }

  type GetTestGroupByPayload<T extends TestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestGroupByOutputType[P]>
            : GetScalarType<T[P], TestGroupByOutputType[P]>
        }
      >
    >


  export type TestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    conceptsCovered?: boolean
    type?: boolean
    status?: boolean
    duration?: boolean
    noOfQuestions?: boolean
    noOfAttempts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    questions?: boolean | Test$questionsArgs<ExtArgs>
    attempts?: boolean | Test$attemptsArgs<ExtArgs>
    _count?: boolean | TestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["test"]>

  export type TestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    conceptsCovered?: boolean
    type?: boolean
    status?: boolean
    duration?: boolean
    noOfQuestions?: boolean
    noOfAttempts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["test"]>

  export type TestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    conceptsCovered?: boolean
    type?: boolean
    status?: boolean
    duration?: boolean
    noOfQuestions?: boolean
    noOfAttempts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["test"]>

  export type TestSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    conceptsCovered?: boolean
    type?: boolean
    status?: boolean
    duration?: boolean
    noOfQuestions?: boolean
    noOfAttempts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "conceptsCovered" | "type" | "status" | "duration" | "noOfQuestions" | "noOfAttempts" | "createdAt" | "updatedAt", ExtArgs["result"]["test"]>
  export type TestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | Test$questionsArgs<ExtArgs>
    attempts?: boolean | Test$attemptsArgs<ExtArgs>
    _count?: boolean | TestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Test"
    objects: {
      questions: Prisma.$TestQuestionsPayload<ExtArgs>[]
      attempts: Prisma.$TestResultsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      description: string | null
      conceptsCovered: string | null
      type: $Enums.TestType | null
      status: $Enums.TestStatus | null
      duration: number | null
      noOfQuestions: number | null
      noOfAttempts: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["test"]>
    composites: {}
  }

  type TestGetPayload<S extends boolean | null | undefined | TestDefaultArgs> = $Result.GetResult<Prisma.$TestPayload, S>

  type TestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestCountAggregateInputType | true
    }

  export interface TestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Test'], meta: { name: 'Test' } }
    /**
     * Find zero or one Test that matches the filter.
     * @param {TestFindUniqueArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestFindUniqueArgs>(args: SelectSubset<T, TestFindUniqueArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Test that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestFindUniqueOrThrowArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestFindUniqueOrThrowArgs>(args: SelectSubset<T, TestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Test that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindFirstArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestFindFirstArgs>(args?: SelectSubset<T, TestFindFirstArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Test that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindFirstOrThrowArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestFindFirstOrThrowArgs>(args?: SelectSubset<T, TestFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tests
     * const tests = await prisma.test.findMany()
     * 
     * // Get first 10 Tests
     * const tests = await prisma.test.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testWithIdOnly = await prisma.test.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestFindManyArgs>(args?: SelectSubset<T, TestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Test.
     * @param {TestCreateArgs} args - Arguments to create a Test.
     * @example
     * // Create one Test
     * const Test = await prisma.test.create({
     *   data: {
     *     // ... data to create a Test
     *   }
     * })
     * 
     */
    create<T extends TestCreateArgs>(args: SelectSubset<T, TestCreateArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tests.
     * @param {TestCreateManyArgs} args - Arguments to create many Tests.
     * @example
     * // Create many Tests
     * const test = await prisma.test.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestCreateManyArgs>(args?: SelectSubset<T, TestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tests and returns the data saved in the database.
     * @param {TestCreateManyAndReturnArgs} args - Arguments to create many Tests.
     * @example
     * // Create many Tests
     * const test = await prisma.test.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tests and only return the `id`
     * const testWithIdOnly = await prisma.test.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestCreateManyAndReturnArgs>(args?: SelectSubset<T, TestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Test.
     * @param {TestDeleteArgs} args - Arguments to delete one Test.
     * @example
     * // Delete one Test
     * const Test = await prisma.test.delete({
     *   where: {
     *     // ... filter to delete one Test
     *   }
     * })
     * 
     */
    delete<T extends TestDeleteArgs>(args: SelectSubset<T, TestDeleteArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Test.
     * @param {TestUpdateArgs} args - Arguments to update one Test.
     * @example
     * // Update one Test
     * const test = await prisma.test.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestUpdateArgs>(args: SelectSubset<T, TestUpdateArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tests.
     * @param {TestDeleteManyArgs} args - Arguments to filter Tests to delete.
     * @example
     * // Delete a few Tests
     * const { count } = await prisma.test.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestDeleteManyArgs>(args?: SelectSubset<T, TestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tests
     * const test = await prisma.test.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestUpdateManyArgs>(args: SelectSubset<T, TestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tests and returns the data updated in the database.
     * @param {TestUpdateManyAndReturnArgs} args - Arguments to update many Tests.
     * @example
     * // Update many Tests
     * const test = await prisma.test.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tests and only return the `id`
     * const testWithIdOnly = await prisma.test.updateManyAndReturn({
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
    updateManyAndReturn<T extends TestUpdateManyAndReturnArgs>(args: SelectSubset<T, TestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Test.
     * @param {TestUpsertArgs} args - Arguments to update or create a Test.
     * @example
     * // Update or create a Test
     * const test = await prisma.test.upsert({
     *   create: {
     *     // ... data to create a Test
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Test we want to update
     *   }
     * })
     */
    upsert<T extends TestUpsertArgs>(args: SelectSubset<T, TestUpsertArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCountArgs} args - Arguments to filter Tests to count.
     * @example
     * // Count the number of Tests
     * const count = await prisma.test.count({
     *   where: {
     *     // ... the filter for the Tests we want to count
     *   }
     * })
    **/
    count<T extends TestCountArgs>(
      args?: Subset<T, TestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Test.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TestAggregateArgs>(args: Subset<T, TestAggregateArgs>): Prisma.PrismaPromise<GetTestAggregateType<T>>

    /**
     * Group by Test.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestGroupByArgs} args - Group by arguments.
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
      T extends TestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestGroupByArgs['orderBy'] }
        : { orderBy?: TestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Test model
   */
  readonly fields: TestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Test.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    questions<T extends Test$questionsArgs<ExtArgs> = {}>(args?: Subset<T, Test$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestQuestionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attempts<T extends Test$attemptsArgs<ExtArgs> = {}>(args?: Subset<T, Test$attemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestResultsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Test model
   */
  interface TestFieldRefs {
    readonly id: FieldRef<"Test", 'String'>
    readonly name: FieldRef<"Test", 'String'>
    readonly description: FieldRef<"Test", 'String'>
    readonly conceptsCovered: FieldRef<"Test", 'String'>
    readonly type: FieldRef<"Test", 'TestType'>
    readonly status: FieldRef<"Test", 'TestStatus'>
    readonly duration: FieldRef<"Test", 'Int'>
    readonly noOfQuestions: FieldRef<"Test", 'Int'>
    readonly noOfAttempts: FieldRef<"Test", 'Int'>
    readonly createdAt: FieldRef<"Test", 'DateTime'>
    readonly updatedAt: FieldRef<"Test", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Test findUnique
   */
  export type TestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Test to fetch.
     */
    where: TestWhereUniqueInput
  }

  /**
   * Test findUniqueOrThrow
   */
  export type TestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Test to fetch.
     */
    where: TestWhereUniqueInput
  }

  /**
   * Test findFirst
   */
  export type TestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Test to fetch.
     */
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     */
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tests.
     */
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tests.
     */
    distinct?: TestScalarFieldEnum | TestScalarFieldEnum[]
  }

  /**
   * Test findFirstOrThrow
   */
  export type TestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Test to fetch.
     */
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     */
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tests.
     */
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tests.
     */
    distinct?: TestScalarFieldEnum | TestScalarFieldEnum[]
  }

  /**
   * Test findMany
   */
  export type TestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Tests to fetch.
     */
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     */
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tests.
     */
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     */
    skip?: number
    distinct?: TestScalarFieldEnum | TestScalarFieldEnum[]
  }

  /**
   * Test create
   */
  export type TestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * The data needed to create a Test.
     */
    data: XOR<TestCreateInput, TestUncheckedCreateInput>
  }

  /**
   * Test createMany
   */
  export type TestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tests.
     */
    data: TestCreateManyInput | TestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Test createManyAndReturn
   */
  export type TestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * The data used to create many Tests.
     */
    data: TestCreateManyInput | TestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Test update
   */
  export type TestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * The data needed to update a Test.
     */
    data: XOR<TestUpdateInput, TestUncheckedUpdateInput>
    /**
     * Choose, which Test to update.
     */
    where: TestWhereUniqueInput
  }

  /**
   * Test updateMany
   */
  export type TestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tests.
     */
    data: XOR<TestUpdateManyMutationInput, TestUncheckedUpdateManyInput>
    /**
     * Filter which Tests to update
     */
    where?: TestWhereInput
    /**
     * Limit how many Tests to update.
     */
    limit?: number
  }

  /**
   * Test updateManyAndReturn
   */
  export type TestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * The data used to update Tests.
     */
    data: XOR<TestUpdateManyMutationInput, TestUncheckedUpdateManyInput>
    /**
     * Filter which Tests to update
     */
    where?: TestWhereInput
    /**
     * Limit how many Tests to update.
     */
    limit?: number
  }

  /**
   * Test upsert
   */
  export type TestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * The filter to search for the Test to update in case it exists.
     */
    where: TestWhereUniqueInput
    /**
     * In case the Test found by the `where` argument doesn't exist, create a new Test with this data.
     */
    create: XOR<TestCreateInput, TestUncheckedCreateInput>
    /**
     * In case the Test was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestUpdateInput, TestUncheckedUpdateInput>
  }

  /**
   * Test delete
   */
  export type TestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter which Test to delete.
     */
    where: TestWhereUniqueInput
  }

  /**
   * Test deleteMany
   */
  export type TestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tests to delete
     */
    where?: TestWhereInput
    /**
     * Limit how many Tests to delete.
     */
    limit?: number
  }

  /**
   * Test.questions
   */
  export type Test$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestQuestions
     */
    select?: TestQuestionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestQuestions
     */
    omit?: TestQuestionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestQuestionsInclude<ExtArgs> | null
    where?: TestQuestionsWhereInput
    orderBy?: TestQuestionsOrderByWithRelationInput | TestQuestionsOrderByWithRelationInput[]
    cursor?: TestQuestionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestQuestionsScalarFieldEnum | TestQuestionsScalarFieldEnum[]
  }

  /**
   * Test.attempts
   */
  export type Test$attemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResults
     */
    select?: TestResultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResults
     */
    omit?: TestResultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultsInclude<ExtArgs> | null
    where?: TestResultsWhereInput
    orderBy?: TestResultsOrderByWithRelationInput | TestResultsOrderByWithRelationInput[]
    cursor?: TestResultsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestResultsScalarFieldEnum | TestResultsScalarFieldEnum[]
  }

  /**
   * Test without action
   */
  export type TestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
  }


  /**
   * Model TestQuestions
   */

  export type AggregateTestQuestions = {
    _count: TestQuestionsCountAggregateOutputType | null
    _min: TestQuestionsMinAggregateOutputType | null
    _max: TestQuestionsMaxAggregateOutputType | null
  }

  export type TestQuestionsMinAggregateOutputType = {
    id: string | null
    question: string | null
    answer: string | null
    createdAt: Date | null
    updatedAt: Date | null
    testId: string | null
  }

  export type TestQuestionsMaxAggregateOutputType = {
    id: string | null
    question: string | null
    answer: string | null
    createdAt: Date | null
    updatedAt: Date | null
    testId: string | null
  }

  export type TestQuestionsCountAggregateOutputType = {
    id: number
    question: number
    options: number
    answer: number
    createdAt: number
    updatedAt: number
    testId: number
    _all: number
  }


  export type TestQuestionsMinAggregateInputType = {
    id?: true
    question?: true
    answer?: true
    createdAt?: true
    updatedAt?: true
    testId?: true
  }

  export type TestQuestionsMaxAggregateInputType = {
    id?: true
    question?: true
    answer?: true
    createdAt?: true
    updatedAt?: true
    testId?: true
  }

  export type TestQuestionsCountAggregateInputType = {
    id?: true
    question?: true
    options?: true
    answer?: true
    createdAt?: true
    updatedAt?: true
    testId?: true
    _all?: true
  }

  export type TestQuestionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestQuestions to aggregate.
     */
    where?: TestQuestionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestQuestions to fetch.
     */
    orderBy?: TestQuestionsOrderByWithRelationInput | TestQuestionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestQuestionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestQuestions
    **/
    _count?: true | TestQuestionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestQuestionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestQuestionsMaxAggregateInputType
  }

  export type GetTestQuestionsAggregateType<T extends TestQuestionsAggregateArgs> = {
        [P in keyof T & keyof AggregateTestQuestions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestQuestions[P]>
      : GetScalarType<T[P], AggregateTestQuestions[P]>
  }




  export type TestQuestionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestQuestionsWhereInput
    orderBy?: TestQuestionsOrderByWithAggregationInput | TestQuestionsOrderByWithAggregationInput[]
    by: TestQuestionsScalarFieldEnum[] | TestQuestionsScalarFieldEnum
    having?: TestQuestionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestQuestionsCountAggregateInputType | true
    _min?: TestQuestionsMinAggregateInputType
    _max?: TestQuestionsMaxAggregateInputType
  }

  export type TestQuestionsGroupByOutputType = {
    id: string
    question: string | null
    options: string[]
    answer: string | null
    createdAt: Date
    updatedAt: Date
    testId: string
    _count: TestQuestionsCountAggregateOutputType | null
    _min: TestQuestionsMinAggregateOutputType | null
    _max: TestQuestionsMaxAggregateOutputType | null
  }

  type GetTestQuestionsGroupByPayload<T extends TestQuestionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestQuestionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestQuestionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestQuestionsGroupByOutputType[P]>
            : GetScalarType<T[P], TestQuestionsGroupByOutputType[P]>
        }
      >
    >


  export type TestQuestionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question?: boolean
    options?: boolean
    answer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    testId?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testQuestions"]>

  export type TestQuestionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question?: boolean
    options?: boolean
    answer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    testId?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testQuestions"]>

  export type TestQuestionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question?: boolean
    options?: boolean
    answer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    testId?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testQuestions"]>

  export type TestQuestionsSelectScalar = {
    id?: boolean
    question?: boolean
    options?: boolean
    answer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    testId?: boolean
  }

  export type TestQuestionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "question" | "options" | "answer" | "createdAt" | "updatedAt" | "testId", ExtArgs["result"]["testQuestions"]>
  export type TestQuestionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }
  export type TestQuestionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }
  export type TestQuestionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }

  export type $TestQuestionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestQuestions"
    objects: {
      test: Prisma.$TestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      question: string | null
      options: string[]
      answer: string | null
      createdAt: Date
      updatedAt: Date
      testId: string
    }, ExtArgs["result"]["testQuestions"]>
    composites: {}
  }

  type TestQuestionsGetPayload<S extends boolean | null | undefined | TestQuestionsDefaultArgs> = $Result.GetResult<Prisma.$TestQuestionsPayload, S>

  type TestQuestionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestQuestionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestQuestionsCountAggregateInputType | true
    }

  export interface TestQuestionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestQuestions'], meta: { name: 'TestQuestions' } }
    /**
     * Find zero or one TestQuestions that matches the filter.
     * @param {TestQuestionsFindUniqueArgs} args - Arguments to find a TestQuestions
     * @example
     * // Get one TestQuestions
     * const testQuestions = await prisma.testQuestions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestQuestionsFindUniqueArgs>(args: SelectSubset<T, TestQuestionsFindUniqueArgs<ExtArgs>>): Prisma__TestQuestionsClient<$Result.GetResult<Prisma.$TestQuestionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestQuestions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestQuestionsFindUniqueOrThrowArgs} args - Arguments to find a TestQuestions
     * @example
     * // Get one TestQuestions
     * const testQuestions = await prisma.testQuestions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestQuestionsFindUniqueOrThrowArgs>(args: SelectSubset<T, TestQuestionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestQuestionsClient<$Result.GetResult<Prisma.$TestQuestionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestQuestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestQuestionsFindFirstArgs} args - Arguments to find a TestQuestions
     * @example
     * // Get one TestQuestions
     * const testQuestions = await prisma.testQuestions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestQuestionsFindFirstArgs>(args?: SelectSubset<T, TestQuestionsFindFirstArgs<ExtArgs>>): Prisma__TestQuestionsClient<$Result.GetResult<Prisma.$TestQuestionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestQuestions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestQuestionsFindFirstOrThrowArgs} args - Arguments to find a TestQuestions
     * @example
     * // Get one TestQuestions
     * const testQuestions = await prisma.testQuestions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestQuestionsFindFirstOrThrowArgs>(args?: SelectSubset<T, TestQuestionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestQuestionsClient<$Result.GetResult<Prisma.$TestQuestionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestQuestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestQuestionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestQuestions
     * const testQuestions = await prisma.testQuestions.findMany()
     * 
     * // Get first 10 TestQuestions
     * const testQuestions = await prisma.testQuestions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testQuestionsWithIdOnly = await prisma.testQuestions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestQuestionsFindManyArgs>(args?: SelectSubset<T, TestQuestionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestQuestionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestQuestions.
     * @param {TestQuestionsCreateArgs} args - Arguments to create a TestQuestions.
     * @example
     * // Create one TestQuestions
     * const TestQuestions = await prisma.testQuestions.create({
     *   data: {
     *     // ... data to create a TestQuestions
     *   }
     * })
     * 
     */
    create<T extends TestQuestionsCreateArgs>(args: SelectSubset<T, TestQuestionsCreateArgs<ExtArgs>>): Prisma__TestQuestionsClient<$Result.GetResult<Prisma.$TestQuestionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestQuestions.
     * @param {TestQuestionsCreateManyArgs} args - Arguments to create many TestQuestions.
     * @example
     * // Create many TestQuestions
     * const testQuestions = await prisma.testQuestions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestQuestionsCreateManyArgs>(args?: SelectSubset<T, TestQuestionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TestQuestions and returns the data saved in the database.
     * @param {TestQuestionsCreateManyAndReturnArgs} args - Arguments to create many TestQuestions.
     * @example
     * // Create many TestQuestions
     * const testQuestions = await prisma.testQuestions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TestQuestions and only return the `id`
     * const testQuestionsWithIdOnly = await prisma.testQuestions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestQuestionsCreateManyAndReturnArgs>(args?: SelectSubset<T, TestQuestionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestQuestionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TestQuestions.
     * @param {TestQuestionsDeleteArgs} args - Arguments to delete one TestQuestions.
     * @example
     * // Delete one TestQuestions
     * const TestQuestions = await prisma.testQuestions.delete({
     *   where: {
     *     // ... filter to delete one TestQuestions
     *   }
     * })
     * 
     */
    delete<T extends TestQuestionsDeleteArgs>(args: SelectSubset<T, TestQuestionsDeleteArgs<ExtArgs>>): Prisma__TestQuestionsClient<$Result.GetResult<Prisma.$TestQuestionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestQuestions.
     * @param {TestQuestionsUpdateArgs} args - Arguments to update one TestQuestions.
     * @example
     * // Update one TestQuestions
     * const testQuestions = await prisma.testQuestions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestQuestionsUpdateArgs>(args: SelectSubset<T, TestQuestionsUpdateArgs<ExtArgs>>): Prisma__TestQuestionsClient<$Result.GetResult<Prisma.$TestQuestionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestQuestions.
     * @param {TestQuestionsDeleteManyArgs} args - Arguments to filter TestQuestions to delete.
     * @example
     * // Delete a few TestQuestions
     * const { count } = await prisma.testQuestions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestQuestionsDeleteManyArgs>(args?: SelectSubset<T, TestQuestionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestQuestionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestQuestions
     * const testQuestions = await prisma.testQuestions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestQuestionsUpdateManyArgs>(args: SelectSubset<T, TestQuestionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestQuestions and returns the data updated in the database.
     * @param {TestQuestionsUpdateManyAndReturnArgs} args - Arguments to update many TestQuestions.
     * @example
     * // Update many TestQuestions
     * const testQuestions = await prisma.testQuestions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TestQuestions and only return the `id`
     * const testQuestionsWithIdOnly = await prisma.testQuestions.updateManyAndReturn({
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
    updateManyAndReturn<T extends TestQuestionsUpdateManyAndReturnArgs>(args: SelectSubset<T, TestQuestionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestQuestionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TestQuestions.
     * @param {TestQuestionsUpsertArgs} args - Arguments to update or create a TestQuestions.
     * @example
     * // Update or create a TestQuestions
     * const testQuestions = await prisma.testQuestions.upsert({
     *   create: {
     *     // ... data to create a TestQuestions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestQuestions we want to update
     *   }
     * })
     */
    upsert<T extends TestQuestionsUpsertArgs>(args: SelectSubset<T, TestQuestionsUpsertArgs<ExtArgs>>): Prisma__TestQuestionsClient<$Result.GetResult<Prisma.$TestQuestionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestQuestionsCountArgs} args - Arguments to filter TestQuestions to count.
     * @example
     * // Count the number of TestQuestions
     * const count = await prisma.testQuestions.count({
     *   where: {
     *     // ... the filter for the TestQuestions we want to count
     *   }
     * })
    **/
    count<T extends TestQuestionsCountArgs>(
      args?: Subset<T, TestQuestionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestQuestionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestQuestionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TestQuestionsAggregateArgs>(args: Subset<T, TestQuestionsAggregateArgs>): Prisma.PrismaPromise<GetTestQuestionsAggregateType<T>>

    /**
     * Group by TestQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestQuestionsGroupByArgs} args - Group by arguments.
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
      T extends TestQuestionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestQuestionsGroupByArgs['orderBy'] }
        : { orderBy?: TestQuestionsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TestQuestionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestQuestionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestQuestions model
   */
  readonly fields: TestQuestionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestQuestions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestQuestionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    test<T extends TestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestDefaultArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TestQuestions model
   */
  interface TestQuestionsFieldRefs {
    readonly id: FieldRef<"TestQuestions", 'String'>
    readonly question: FieldRef<"TestQuestions", 'String'>
    readonly options: FieldRef<"TestQuestions", 'String[]'>
    readonly answer: FieldRef<"TestQuestions", 'String'>
    readonly createdAt: FieldRef<"TestQuestions", 'DateTime'>
    readonly updatedAt: FieldRef<"TestQuestions", 'DateTime'>
    readonly testId: FieldRef<"TestQuestions", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TestQuestions findUnique
   */
  export type TestQuestionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestQuestions
     */
    select?: TestQuestionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestQuestions
     */
    omit?: TestQuestionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestQuestionsInclude<ExtArgs> | null
    /**
     * Filter, which TestQuestions to fetch.
     */
    where: TestQuestionsWhereUniqueInput
  }

  /**
   * TestQuestions findUniqueOrThrow
   */
  export type TestQuestionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestQuestions
     */
    select?: TestQuestionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestQuestions
     */
    omit?: TestQuestionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestQuestionsInclude<ExtArgs> | null
    /**
     * Filter, which TestQuestions to fetch.
     */
    where: TestQuestionsWhereUniqueInput
  }

  /**
   * TestQuestions findFirst
   */
  export type TestQuestionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestQuestions
     */
    select?: TestQuestionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestQuestions
     */
    omit?: TestQuestionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestQuestionsInclude<ExtArgs> | null
    /**
     * Filter, which TestQuestions to fetch.
     */
    where?: TestQuestionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestQuestions to fetch.
     */
    orderBy?: TestQuestionsOrderByWithRelationInput | TestQuestionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestQuestions.
     */
    cursor?: TestQuestionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestQuestions.
     */
    distinct?: TestQuestionsScalarFieldEnum | TestQuestionsScalarFieldEnum[]
  }

  /**
   * TestQuestions findFirstOrThrow
   */
  export type TestQuestionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestQuestions
     */
    select?: TestQuestionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestQuestions
     */
    omit?: TestQuestionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestQuestionsInclude<ExtArgs> | null
    /**
     * Filter, which TestQuestions to fetch.
     */
    where?: TestQuestionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestQuestions to fetch.
     */
    orderBy?: TestQuestionsOrderByWithRelationInput | TestQuestionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestQuestions.
     */
    cursor?: TestQuestionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestQuestions.
     */
    distinct?: TestQuestionsScalarFieldEnum | TestQuestionsScalarFieldEnum[]
  }

  /**
   * TestQuestions findMany
   */
  export type TestQuestionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestQuestions
     */
    select?: TestQuestionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestQuestions
     */
    omit?: TestQuestionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestQuestionsInclude<ExtArgs> | null
    /**
     * Filter, which TestQuestions to fetch.
     */
    where?: TestQuestionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestQuestions to fetch.
     */
    orderBy?: TestQuestionsOrderByWithRelationInput | TestQuestionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestQuestions.
     */
    cursor?: TestQuestionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestQuestions.
     */
    skip?: number
    distinct?: TestQuestionsScalarFieldEnum | TestQuestionsScalarFieldEnum[]
  }

  /**
   * TestQuestions create
   */
  export type TestQuestionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestQuestions
     */
    select?: TestQuestionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestQuestions
     */
    omit?: TestQuestionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestQuestionsInclude<ExtArgs> | null
    /**
     * The data needed to create a TestQuestions.
     */
    data: XOR<TestQuestionsCreateInput, TestQuestionsUncheckedCreateInput>
  }

  /**
   * TestQuestions createMany
   */
  export type TestQuestionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestQuestions.
     */
    data: TestQuestionsCreateManyInput | TestQuestionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestQuestions createManyAndReturn
   */
  export type TestQuestionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestQuestions
     */
    select?: TestQuestionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestQuestions
     */
    omit?: TestQuestionsOmit<ExtArgs> | null
    /**
     * The data used to create many TestQuestions.
     */
    data: TestQuestionsCreateManyInput | TestQuestionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestQuestionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestQuestions update
   */
  export type TestQuestionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestQuestions
     */
    select?: TestQuestionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestQuestions
     */
    omit?: TestQuestionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestQuestionsInclude<ExtArgs> | null
    /**
     * The data needed to update a TestQuestions.
     */
    data: XOR<TestQuestionsUpdateInput, TestQuestionsUncheckedUpdateInput>
    /**
     * Choose, which TestQuestions to update.
     */
    where: TestQuestionsWhereUniqueInput
  }

  /**
   * TestQuestions updateMany
   */
  export type TestQuestionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestQuestions.
     */
    data: XOR<TestQuestionsUpdateManyMutationInput, TestQuestionsUncheckedUpdateManyInput>
    /**
     * Filter which TestQuestions to update
     */
    where?: TestQuestionsWhereInput
    /**
     * Limit how many TestQuestions to update.
     */
    limit?: number
  }

  /**
   * TestQuestions updateManyAndReturn
   */
  export type TestQuestionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestQuestions
     */
    select?: TestQuestionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestQuestions
     */
    omit?: TestQuestionsOmit<ExtArgs> | null
    /**
     * The data used to update TestQuestions.
     */
    data: XOR<TestQuestionsUpdateManyMutationInput, TestQuestionsUncheckedUpdateManyInput>
    /**
     * Filter which TestQuestions to update
     */
    where?: TestQuestionsWhereInput
    /**
     * Limit how many TestQuestions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestQuestionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestQuestions upsert
   */
  export type TestQuestionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestQuestions
     */
    select?: TestQuestionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestQuestions
     */
    omit?: TestQuestionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestQuestionsInclude<ExtArgs> | null
    /**
     * The filter to search for the TestQuestions to update in case it exists.
     */
    where: TestQuestionsWhereUniqueInput
    /**
     * In case the TestQuestions found by the `where` argument doesn't exist, create a new TestQuestions with this data.
     */
    create: XOR<TestQuestionsCreateInput, TestQuestionsUncheckedCreateInput>
    /**
     * In case the TestQuestions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestQuestionsUpdateInput, TestQuestionsUncheckedUpdateInput>
  }

  /**
   * TestQuestions delete
   */
  export type TestQuestionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestQuestions
     */
    select?: TestQuestionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestQuestions
     */
    omit?: TestQuestionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestQuestionsInclude<ExtArgs> | null
    /**
     * Filter which TestQuestions to delete.
     */
    where: TestQuestionsWhereUniqueInput
  }

  /**
   * TestQuestions deleteMany
   */
  export type TestQuestionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestQuestions to delete
     */
    where?: TestQuestionsWhereInput
    /**
     * Limit how many TestQuestions to delete.
     */
    limit?: number
  }

  /**
   * TestQuestions without action
   */
  export type TestQuestionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestQuestions
     */
    select?: TestQuestionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestQuestions
     */
    omit?: TestQuestionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestQuestionsInclude<ExtArgs> | null
  }


  /**
   * Model TestResults
   */

  export type AggregateTestResults = {
    _count: TestResultsCountAggregateOutputType | null
    _avg: TestResultsAvgAggregateOutputType | null
    _sum: TestResultsSumAggregateOutputType | null
    _min: TestResultsMinAggregateOutputType | null
    _max: TestResultsMaxAggregateOutputType | null
  }

  export type TestResultsAvgAggregateOutputType = {
    score: number | null
  }

  export type TestResultsSumAggregateOutputType = {
    score: number | null
  }

  export type TestResultsMinAggregateOutputType = {
    id: string | null
    userEmail: string | null
    userMobile: string | null
    userName: string | null
    score: number | null
    status: $Enums.TesResultStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    testId: string | null
  }

  export type TestResultsMaxAggregateOutputType = {
    id: string | null
    userEmail: string | null
    userMobile: string | null
    userName: string | null
    score: number | null
    status: $Enums.TesResultStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    testId: string | null
  }

  export type TestResultsCountAggregateOutputType = {
    id: number
    userEmail: number
    userMobile: number
    userName: number
    score: number
    status: number
    createdAt: number
    updatedAt: number
    testId: number
    _all: number
  }


  export type TestResultsAvgAggregateInputType = {
    score?: true
  }

  export type TestResultsSumAggregateInputType = {
    score?: true
  }

  export type TestResultsMinAggregateInputType = {
    id?: true
    userEmail?: true
    userMobile?: true
    userName?: true
    score?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    testId?: true
  }

  export type TestResultsMaxAggregateInputType = {
    id?: true
    userEmail?: true
    userMobile?: true
    userName?: true
    score?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    testId?: true
  }

  export type TestResultsCountAggregateInputType = {
    id?: true
    userEmail?: true
    userMobile?: true
    userName?: true
    score?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    testId?: true
    _all?: true
  }

  export type TestResultsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestResults to aggregate.
     */
    where?: TestResultsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestResults to fetch.
     */
    orderBy?: TestResultsOrderByWithRelationInput | TestResultsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestResultsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestResults
    **/
    _count?: true | TestResultsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestResultsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestResultsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestResultsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestResultsMaxAggregateInputType
  }

  export type GetTestResultsAggregateType<T extends TestResultsAggregateArgs> = {
        [P in keyof T & keyof AggregateTestResults]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestResults[P]>
      : GetScalarType<T[P], AggregateTestResults[P]>
  }




  export type TestResultsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestResultsWhereInput
    orderBy?: TestResultsOrderByWithAggregationInput | TestResultsOrderByWithAggregationInput[]
    by: TestResultsScalarFieldEnum[] | TestResultsScalarFieldEnum
    having?: TestResultsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestResultsCountAggregateInputType | true
    _avg?: TestResultsAvgAggregateInputType
    _sum?: TestResultsSumAggregateInputType
    _min?: TestResultsMinAggregateInputType
    _max?: TestResultsMaxAggregateInputType
  }

  export type TestResultsGroupByOutputType = {
    id: string
    userEmail: string
    userMobile: string | null
    userName: string | null
    score: number | null
    status: $Enums.TesResultStatus | null
    createdAt: Date
    updatedAt: Date
    testId: string
    _count: TestResultsCountAggregateOutputType | null
    _avg: TestResultsAvgAggregateOutputType | null
    _sum: TestResultsSumAggregateOutputType | null
    _min: TestResultsMinAggregateOutputType | null
    _max: TestResultsMaxAggregateOutputType | null
  }

  type GetTestResultsGroupByPayload<T extends TestResultsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestResultsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestResultsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestResultsGroupByOutputType[P]>
            : GetScalarType<T[P], TestResultsGroupByOutputType[P]>
        }
      >
    >


  export type TestResultsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userEmail?: boolean
    userMobile?: boolean
    userName?: boolean
    score?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    testId?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testResults"]>

  export type TestResultsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userEmail?: boolean
    userMobile?: boolean
    userName?: boolean
    score?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    testId?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testResults"]>

  export type TestResultsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userEmail?: boolean
    userMobile?: boolean
    userName?: boolean
    score?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    testId?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testResults"]>

  export type TestResultsSelectScalar = {
    id?: boolean
    userEmail?: boolean
    userMobile?: boolean
    userName?: boolean
    score?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    testId?: boolean
  }

  export type TestResultsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userEmail" | "userMobile" | "userName" | "score" | "status" | "createdAt" | "updatedAt" | "testId", ExtArgs["result"]["testResults"]>
  export type TestResultsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }
  export type TestResultsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }
  export type TestResultsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }

  export type $TestResultsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestResults"
    objects: {
      test: Prisma.$TestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userEmail: string
      userMobile: string | null
      userName: string | null
      score: number | null
      status: $Enums.TesResultStatus | null
      createdAt: Date
      updatedAt: Date
      testId: string
    }, ExtArgs["result"]["testResults"]>
    composites: {}
  }

  type TestResultsGetPayload<S extends boolean | null | undefined | TestResultsDefaultArgs> = $Result.GetResult<Prisma.$TestResultsPayload, S>

  type TestResultsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestResultsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestResultsCountAggregateInputType | true
    }

  export interface TestResultsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestResults'], meta: { name: 'TestResults' } }
    /**
     * Find zero or one TestResults that matches the filter.
     * @param {TestResultsFindUniqueArgs} args - Arguments to find a TestResults
     * @example
     * // Get one TestResults
     * const testResults = await prisma.testResults.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestResultsFindUniqueArgs>(args: SelectSubset<T, TestResultsFindUniqueArgs<ExtArgs>>): Prisma__TestResultsClient<$Result.GetResult<Prisma.$TestResultsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestResults that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestResultsFindUniqueOrThrowArgs} args - Arguments to find a TestResults
     * @example
     * // Get one TestResults
     * const testResults = await prisma.testResults.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestResultsFindUniqueOrThrowArgs>(args: SelectSubset<T, TestResultsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestResultsClient<$Result.GetResult<Prisma.$TestResultsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultsFindFirstArgs} args - Arguments to find a TestResults
     * @example
     * // Get one TestResults
     * const testResults = await prisma.testResults.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestResultsFindFirstArgs>(args?: SelectSubset<T, TestResultsFindFirstArgs<ExtArgs>>): Prisma__TestResultsClient<$Result.GetResult<Prisma.$TestResultsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestResults that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultsFindFirstOrThrowArgs} args - Arguments to find a TestResults
     * @example
     * // Get one TestResults
     * const testResults = await prisma.testResults.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestResultsFindFirstOrThrowArgs>(args?: SelectSubset<T, TestResultsFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestResultsClient<$Result.GetResult<Prisma.$TestResultsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestResults
     * const testResults = await prisma.testResults.findMany()
     * 
     * // Get first 10 TestResults
     * const testResults = await prisma.testResults.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testResultsWithIdOnly = await prisma.testResults.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestResultsFindManyArgs>(args?: SelectSubset<T, TestResultsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestResultsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestResults.
     * @param {TestResultsCreateArgs} args - Arguments to create a TestResults.
     * @example
     * // Create one TestResults
     * const TestResults = await prisma.testResults.create({
     *   data: {
     *     // ... data to create a TestResults
     *   }
     * })
     * 
     */
    create<T extends TestResultsCreateArgs>(args: SelectSubset<T, TestResultsCreateArgs<ExtArgs>>): Prisma__TestResultsClient<$Result.GetResult<Prisma.$TestResultsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestResults.
     * @param {TestResultsCreateManyArgs} args - Arguments to create many TestResults.
     * @example
     * // Create many TestResults
     * const testResults = await prisma.testResults.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestResultsCreateManyArgs>(args?: SelectSubset<T, TestResultsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TestResults and returns the data saved in the database.
     * @param {TestResultsCreateManyAndReturnArgs} args - Arguments to create many TestResults.
     * @example
     * // Create many TestResults
     * const testResults = await prisma.testResults.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TestResults and only return the `id`
     * const testResultsWithIdOnly = await prisma.testResults.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestResultsCreateManyAndReturnArgs>(args?: SelectSubset<T, TestResultsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestResultsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TestResults.
     * @param {TestResultsDeleteArgs} args - Arguments to delete one TestResults.
     * @example
     * // Delete one TestResults
     * const TestResults = await prisma.testResults.delete({
     *   where: {
     *     // ... filter to delete one TestResults
     *   }
     * })
     * 
     */
    delete<T extends TestResultsDeleteArgs>(args: SelectSubset<T, TestResultsDeleteArgs<ExtArgs>>): Prisma__TestResultsClient<$Result.GetResult<Prisma.$TestResultsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestResults.
     * @param {TestResultsUpdateArgs} args - Arguments to update one TestResults.
     * @example
     * // Update one TestResults
     * const testResults = await prisma.testResults.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestResultsUpdateArgs>(args: SelectSubset<T, TestResultsUpdateArgs<ExtArgs>>): Prisma__TestResultsClient<$Result.GetResult<Prisma.$TestResultsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestResults.
     * @param {TestResultsDeleteManyArgs} args - Arguments to filter TestResults to delete.
     * @example
     * // Delete a few TestResults
     * const { count } = await prisma.testResults.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestResultsDeleteManyArgs>(args?: SelectSubset<T, TestResultsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestResults
     * const testResults = await prisma.testResults.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestResultsUpdateManyArgs>(args: SelectSubset<T, TestResultsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestResults and returns the data updated in the database.
     * @param {TestResultsUpdateManyAndReturnArgs} args - Arguments to update many TestResults.
     * @example
     * // Update many TestResults
     * const testResults = await prisma.testResults.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TestResults and only return the `id`
     * const testResultsWithIdOnly = await prisma.testResults.updateManyAndReturn({
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
    updateManyAndReturn<T extends TestResultsUpdateManyAndReturnArgs>(args: SelectSubset<T, TestResultsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestResultsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TestResults.
     * @param {TestResultsUpsertArgs} args - Arguments to update or create a TestResults.
     * @example
     * // Update or create a TestResults
     * const testResults = await prisma.testResults.upsert({
     *   create: {
     *     // ... data to create a TestResults
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestResults we want to update
     *   }
     * })
     */
    upsert<T extends TestResultsUpsertArgs>(args: SelectSubset<T, TestResultsUpsertArgs<ExtArgs>>): Prisma__TestResultsClient<$Result.GetResult<Prisma.$TestResultsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultsCountArgs} args - Arguments to filter TestResults to count.
     * @example
     * // Count the number of TestResults
     * const count = await prisma.testResults.count({
     *   where: {
     *     // ... the filter for the TestResults we want to count
     *   }
     * })
    **/
    count<T extends TestResultsCountArgs>(
      args?: Subset<T, TestResultsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestResultsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TestResultsAggregateArgs>(args: Subset<T, TestResultsAggregateArgs>): Prisma.PrismaPromise<GetTestResultsAggregateType<T>>

    /**
     * Group by TestResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultsGroupByArgs} args - Group by arguments.
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
      T extends TestResultsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestResultsGroupByArgs['orderBy'] }
        : { orderBy?: TestResultsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TestResultsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestResultsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestResults model
   */
  readonly fields: TestResultsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestResults.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestResultsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    test<T extends TestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestDefaultArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TestResults model
   */
  interface TestResultsFieldRefs {
    readonly id: FieldRef<"TestResults", 'String'>
    readonly userEmail: FieldRef<"TestResults", 'String'>
    readonly userMobile: FieldRef<"TestResults", 'String'>
    readonly userName: FieldRef<"TestResults", 'String'>
    readonly score: FieldRef<"TestResults", 'Int'>
    readonly status: FieldRef<"TestResults", 'TesResultStatus'>
    readonly createdAt: FieldRef<"TestResults", 'DateTime'>
    readonly updatedAt: FieldRef<"TestResults", 'DateTime'>
    readonly testId: FieldRef<"TestResults", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TestResults findUnique
   */
  export type TestResultsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResults
     */
    select?: TestResultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResults
     */
    omit?: TestResultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultsInclude<ExtArgs> | null
    /**
     * Filter, which TestResults to fetch.
     */
    where: TestResultsWhereUniqueInput
  }

  /**
   * TestResults findUniqueOrThrow
   */
  export type TestResultsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResults
     */
    select?: TestResultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResults
     */
    omit?: TestResultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultsInclude<ExtArgs> | null
    /**
     * Filter, which TestResults to fetch.
     */
    where: TestResultsWhereUniqueInput
  }

  /**
   * TestResults findFirst
   */
  export type TestResultsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResults
     */
    select?: TestResultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResults
     */
    omit?: TestResultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultsInclude<ExtArgs> | null
    /**
     * Filter, which TestResults to fetch.
     */
    where?: TestResultsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestResults to fetch.
     */
    orderBy?: TestResultsOrderByWithRelationInput | TestResultsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestResults.
     */
    cursor?: TestResultsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestResults.
     */
    distinct?: TestResultsScalarFieldEnum | TestResultsScalarFieldEnum[]
  }

  /**
   * TestResults findFirstOrThrow
   */
  export type TestResultsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResults
     */
    select?: TestResultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResults
     */
    omit?: TestResultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultsInclude<ExtArgs> | null
    /**
     * Filter, which TestResults to fetch.
     */
    where?: TestResultsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestResults to fetch.
     */
    orderBy?: TestResultsOrderByWithRelationInput | TestResultsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestResults.
     */
    cursor?: TestResultsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestResults.
     */
    distinct?: TestResultsScalarFieldEnum | TestResultsScalarFieldEnum[]
  }

  /**
   * TestResults findMany
   */
  export type TestResultsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResults
     */
    select?: TestResultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResults
     */
    omit?: TestResultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultsInclude<ExtArgs> | null
    /**
     * Filter, which TestResults to fetch.
     */
    where?: TestResultsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestResults to fetch.
     */
    orderBy?: TestResultsOrderByWithRelationInput | TestResultsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestResults.
     */
    cursor?: TestResultsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestResults.
     */
    skip?: number
    distinct?: TestResultsScalarFieldEnum | TestResultsScalarFieldEnum[]
  }

  /**
   * TestResults create
   */
  export type TestResultsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResults
     */
    select?: TestResultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResults
     */
    omit?: TestResultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultsInclude<ExtArgs> | null
    /**
     * The data needed to create a TestResults.
     */
    data: XOR<TestResultsCreateInput, TestResultsUncheckedCreateInput>
  }

  /**
   * TestResults createMany
   */
  export type TestResultsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestResults.
     */
    data: TestResultsCreateManyInput | TestResultsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestResults createManyAndReturn
   */
  export type TestResultsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResults
     */
    select?: TestResultsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestResults
     */
    omit?: TestResultsOmit<ExtArgs> | null
    /**
     * The data used to create many TestResults.
     */
    data: TestResultsCreateManyInput | TestResultsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestResults update
   */
  export type TestResultsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResults
     */
    select?: TestResultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResults
     */
    omit?: TestResultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultsInclude<ExtArgs> | null
    /**
     * The data needed to update a TestResults.
     */
    data: XOR<TestResultsUpdateInput, TestResultsUncheckedUpdateInput>
    /**
     * Choose, which TestResults to update.
     */
    where: TestResultsWhereUniqueInput
  }

  /**
   * TestResults updateMany
   */
  export type TestResultsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestResults.
     */
    data: XOR<TestResultsUpdateManyMutationInput, TestResultsUncheckedUpdateManyInput>
    /**
     * Filter which TestResults to update
     */
    where?: TestResultsWhereInput
    /**
     * Limit how many TestResults to update.
     */
    limit?: number
  }

  /**
   * TestResults updateManyAndReturn
   */
  export type TestResultsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResults
     */
    select?: TestResultsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestResults
     */
    omit?: TestResultsOmit<ExtArgs> | null
    /**
     * The data used to update TestResults.
     */
    data: XOR<TestResultsUpdateManyMutationInput, TestResultsUncheckedUpdateManyInput>
    /**
     * Filter which TestResults to update
     */
    where?: TestResultsWhereInput
    /**
     * Limit how many TestResults to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestResults upsert
   */
  export type TestResultsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResults
     */
    select?: TestResultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResults
     */
    omit?: TestResultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultsInclude<ExtArgs> | null
    /**
     * The filter to search for the TestResults to update in case it exists.
     */
    where: TestResultsWhereUniqueInput
    /**
     * In case the TestResults found by the `where` argument doesn't exist, create a new TestResults with this data.
     */
    create: XOR<TestResultsCreateInput, TestResultsUncheckedCreateInput>
    /**
     * In case the TestResults was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestResultsUpdateInput, TestResultsUncheckedUpdateInput>
  }

  /**
   * TestResults delete
   */
  export type TestResultsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResults
     */
    select?: TestResultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResults
     */
    omit?: TestResultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultsInclude<ExtArgs> | null
    /**
     * Filter which TestResults to delete.
     */
    where: TestResultsWhereUniqueInput
  }

  /**
   * TestResults deleteMany
   */
  export type TestResultsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestResults to delete
     */
    where?: TestResultsWhereInput
    /**
     * Limit how many TestResults to delete.
     */
    limit?: number
  }

  /**
   * TestResults without action
   */
  export type TestResultsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResults
     */
    select?: TestResultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResults
     */
    omit?: TestResultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultsInclude<ExtArgs> | null
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


  export const MentorScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    mobile: 'mobile',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MentorScalarFieldEnum = (typeof MentorScalarFieldEnum)[keyof typeof MentorScalarFieldEnum]


  export const TestScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    conceptsCovered: 'conceptsCovered',
    type: 'type',
    status: 'status',
    duration: 'duration',
    noOfQuestions: 'noOfQuestions',
    noOfAttempts: 'noOfAttempts',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TestScalarFieldEnum = (typeof TestScalarFieldEnum)[keyof typeof TestScalarFieldEnum]


  export const TestQuestionsScalarFieldEnum: {
    id: 'id',
    question: 'question',
    options: 'options',
    answer: 'answer',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    testId: 'testId'
  };

  export type TestQuestionsScalarFieldEnum = (typeof TestQuestionsScalarFieldEnum)[keyof typeof TestQuestionsScalarFieldEnum]


  export const TestResultsScalarFieldEnum: {
    id: 'id',
    userEmail: 'userEmail',
    userMobile: 'userMobile',
    userName: 'userName',
    score: 'score',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    testId: 'testId'
  };

  export type TestResultsScalarFieldEnum = (typeof TestResultsScalarFieldEnum)[keyof typeof TestResultsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TestType'
   */
  export type EnumTestTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TestType'>
    


  /**
   * Reference to a field of type 'TestType[]'
   */
  export type ListEnumTestTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TestType[]'>
    


  /**
   * Reference to a field of type 'TestStatus'
   */
  export type EnumTestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TestStatus'>
    


  /**
   * Reference to a field of type 'TestStatus[]'
   */
  export type ListEnumTestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TestStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'TesResultStatus'
   */
  export type EnumTesResultStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TesResultStatus'>
    


  /**
   * Reference to a field of type 'TesResultStatus[]'
   */
  export type ListEnumTesResultStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TesResultStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type MentorWhereInput = {
    AND?: MentorWhereInput | MentorWhereInput[]
    OR?: MentorWhereInput[]
    NOT?: MentorWhereInput | MentorWhereInput[]
    id?: StringFilter<"Mentor"> | string
    email?: StringFilter<"Mentor"> | string
    name?: StringNullableFilter<"Mentor"> | string | null
    mobile?: StringNullableFilter<"Mentor"> | string | null
    password?: StringNullableFilter<"Mentor"> | string | null
    createdAt?: DateTimeFilter<"Mentor"> | Date | string
    updatedAt?: DateTimeFilter<"Mentor"> | Date | string
  }

  export type MentorOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    mobile?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    mobile?: string
    AND?: MentorWhereInput | MentorWhereInput[]
    OR?: MentorWhereInput[]
    NOT?: MentorWhereInput | MentorWhereInput[]
    name?: StringNullableFilter<"Mentor"> | string | null
    password?: StringNullableFilter<"Mentor"> | string | null
    createdAt?: DateTimeFilter<"Mentor"> | Date | string
    updatedAt?: DateTimeFilter<"Mentor"> | Date | string
  }, "id" | "email" | "mobile">

  export type MentorOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    mobile?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MentorCountOrderByAggregateInput
    _max?: MentorMaxOrderByAggregateInput
    _min?: MentorMinOrderByAggregateInput
  }

  export type MentorScalarWhereWithAggregatesInput = {
    AND?: MentorScalarWhereWithAggregatesInput | MentorScalarWhereWithAggregatesInput[]
    OR?: MentorScalarWhereWithAggregatesInput[]
    NOT?: MentorScalarWhereWithAggregatesInput | MentorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Mentor"> | string
    email?: StringWithAggregatesFilter<"Mentor"> | string
    name?: StringNullableWithAggregatesFilter<"Mentor"> | string | null
    mobile?: StringNullableWithAggregatesFilter<"Mentor"> | string | null
    password?: StringNullableWithAggregatesFilter<"Mentor"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Mentor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Mentor"> | Date | string
  }

  export type TestWhereInput = {
    AND?: TestWhereInput | TestWhereInput[]
    OR?: TestWhereInput[]
    NOT?: TestWhereInput | TestWhereInput[]
    id?: StringFilter<"Test"> | string
    name?: StringNullableFilter<"Test"> | string | null
    description?: StringNullableFilter<"Test"> | string | null
    conceptsCovered?: StringNullableFilter<"Test"> | string | null
    type?: EnumTestTypeNullableFilter<"Test"> | $Enums.TestType | null
    status?: EnumTestStatusNullableFilter<"Test"> | $Enums.TestStatus | null
    duration?: IntNullableFilter<"Test"> | number | null
    noOfQuestions?: IntNullableFilter<"Test"> | number | null
    noOfAttempts?: IntNullableFilter<"Test"> | number | null
    createdAt?: DateTimeFilter<"Test"> | Date | string
    updatedAt?: DateTimeFilter<"Test"> | Date | string
    questions?: TestQuestionsListRelationFilter
    attempts?: TestResultsListRelationFilter
  }

  export type TestOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    conceptsCovered?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    noOfQuestions?: SortOrderInput | SortOrder
    noOfAttempts?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    questions?: TestQuestionsOrderByRelationAggregateInput
    attempts?: TestResultsOrderByRelationAggregateInput
  }

  export type TestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestWhereInput | TestWhereInput[]
    OR?: TestWhereInput[]
    NOT?: TestWhereInput | TestWhereInput[]
    name?: StringNullableFilter<"Test"> | string | null
    description?: StringNullableFilter<"Test"> | string | null
    conceptsCovered?: StringNullableFilter<"Test"> | string | null
    type?: EnumTestTypeNullableFilter<"Test"> | $Enums.TestType | null
    status?: EnumTestStatusNullableFilter<"Test"> | $Enums.TestStatus | null
    duration?: IntNullableFilter<"Test"> | number | null
    noOfQuestions?: IntNullableFilter<"Test"> | number | null
    noOfAttempts?: IntNullableFilter<"Test"> | number | null
    createdAt?: DateTimeFilter<"Test"> | Date | string
    updatedAt?: DateTimeFilter<"Test"> | Date | string
    questions?: TestQuestionsListRelationFilter
    attempts?: TestResultsListRelationFilter
  }, "id">

  export type TestOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    conceptsCovered?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    noOfQuestions?: SortOrderInput | SortOrder
    noOfAttempts?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TestCountOrderByAggregateInput
    _avg?: TestAvgOrderByAggregateInput
    _max?: TestMaxOrderByAggregateInput
    _min?: TestMinOrderByAggregateInput
    _sum?: TestSumOrderByAggregateInput
  }

  export type TestScalarWhereWithAggregatesInput = {
    AND?: TestScalarWhereWithAggregatesInput | TestScalarWhereWithAggregatesInput[]
    OR?: TestScalarWhereWithAggregatesInput[]
    NOT?: TestScalarWhereWithAggregatesInput | TestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Test"> | string
    name?: StringNullableWithAggregatesFilter<"Test"> | string | null
    description?: StringNullableWithAggregatesFilter<"Test"> | string | null
    conceptsCovered?: StringNullableWithAggregatesFilter<"Test"> | string | null
    type?: EnumTestTypeNullableWithAggregatesFilter<"Test"> | $Enums.TestType | null
    status?: EnumTestStatusNullableWithAggregatesFilter<"Test"> | $Enums.TestStatus | null
    duration?: IntNullableWithAggregatesFilter<"Test"> | number | null
    noOfQuestions?: IntNullableWithAggregatesFilter<"Test"> | number | null
    noOfAttempts?: IntNullableWithAggregatesFilter<"Test"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Test"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Test"> | Date | string
  }

  export type TestQuestionsWhereInput = {
    AND?: TestQuestionsWhereInput | TestQuestionsWhereInput[]
    OR?: TestQuestionsWhereInput[]
    NOT?: TestQuestionsWhereInput | TestQuestionsWhereInput[]
    id?: StringFilter<"TestQuestions"> | string
    question?: StringNullableFilter<"TestQuestions"> | string | null
    options?: StringNullableListFilter<"TestQuestions">
    answer?: StringNullableFilter<"TestQuestions"> | string | null
    createdAt?: DateTimeFilter<"TestQuestions"> | Date | string
    updatedAt?: DateTimeFilter<"TestQuestions"> | Date | string
    testId?: StringFilter<"TestQuestions"> | string
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
  }

  export type TestQuestionsOrderByWithRelationInput = {
    id?: SortOrder
    question?: SortOrderInput | SortOrder
    options?: SortOrder
    answer?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    testId?: SortOrder
    test?: TestOrderByWithRelationInput
  }

  export type TestQuestionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestQuestionsWhereInput | TestQuestionsWhereInput[]
    OR?: TestQuestionsWhereInput[]
    NOT?: TestQuestionsWhereInput | TestQuestionsWhereInput[]
    question?: StringNullableFilter<"TestQuestions"> | string | null
    options?: StringNullableListFilter<"TestQuestions">
    answer?: StringNullableFilter<"TestQuestions"> | string | null
    createdAt?: DateTimeFilter<"TestQuestions"> | Date | string
    updatedAt?: DateTimeFilter<"TestQuestions"> | Date | string
    testId?: StringFilter<"TestQuestions"> | string
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
  }, "id">

  export type TestQuestionsOrderByWithAggregationInput = {
    id?: SortOrder
    question?: SortOrderInput | SortOrder
    options?: SortOrder
    answer?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    testId?: SortOrder
    _count?: TestQuestionsCountOrderByAggregateInput
    _max?: TestQuestionsMaxOrderByAggregateInput
    _min?: TestQuestionsMinOrderByAggregateInput
  }

  export type TestQuestionsScalarWhereWithAggregatesInput = {
    AND?: TestQuestionsScalarWhereWithAggregatesInput | TestQuestionsScalarWhereWithAggregatesInput[]
    OR?: TestQuestionsScalarWhereWithAggregatesInput[]
    NOT?: TestQuestionsScalarWhereWithAggregatesInput | TestQuestionsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TestQuestions"> | string
    question?: StringNullableWithAggregatesFilter<"TestQuestions"> | string | null
    options?: StringNullableListFilter<"TestQuestions">
    answer?: StringNullableWithAggregatesFilter<"TestQuestions"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TestQuestions"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TestQuestions"> | Date | string
    testId?: StringWithAggregatesFilter<"TestQuestions"> | string
  }

  export type TestResultsWhereInput = {
    AND?: TestResultsWhereInput | TestResultsWhereInput[]
    OR?: TestResultsWhereInput[]
    NOT?: TestResultsWhereInput | TestResultsWhereInput[]
    id?: StringFilter<"TestResults"> | string
    userEmail?: StringFilter<"TestResults"> | string
    userMobile?: StringNullableFilter<"TestResults"> | string | null
    userName?: StringNullableFilter<"TestResults"> | string | null
    score?: IntNullableFilter<"TestResults"> | number | null
    status?: EnumTesResultStatusNullableFilter<"TestResults"> | $Enums.TesResultStatus | null
    createdAt?: DateTimeFilter<"TestResults"> | Date | string
    updatedAt?: DateTimeFilter<"TestResults"> | Date | string
    testId?: StringFilter<"TestResults"> | string
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
  }

  export type TestResultsOrderByWithRelationInput = {
    id?: SortOrder
    userEmail?: SortOrder
    userMobile?: SortOrderInput | SortOrder
    userName?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    testId?: SortOrder
    test?: TestOrderByWithRelationInput
  }

  export type TestResultsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestResultsWhereInput | TestResultsWhereInput[]
    OR?: TestResultsWhereInput[]
    NOT?: TestResultsWhereInput | TestResultsWhereInput[]
    userEmail?: StringFilter<"TestResults"> | string
    userMobile?: StringNullableFilter<"TestResults"> | string | null
    userName?: StringNullableFilter<"TestResults"> | string | null
    score?: IntNullableFilter<"TestResults"> | number | null
    status?: EnumTesResultStatusNullableFilter<"TestResults"> | $Enums.TesResultStatus | null
    createdAt?: DateTimeFilter<"TestResults"> | Date | string
    updatedAt?: DateTimeFilter<"TestResults"> | Date | string
    testId?: StringFilter<"TestResults"> | string
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
  }, "id">

  export type TestResultsOrderByWithAggregationInput = {
    id?: SortOrder
    userEmail?: SortOrder
    userMobile?: SortOrderInput | SortOrder
    userName?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    testId?: SortOrder
    _count?: TestResultsCountOrderByAggregateInput
    _avg?: TestResultsAvgOrderByAggregateInput
    _max?: TestResultsMaxOrderByAggregateInput
    _min?: TestResultsMinOrderByAggregateInput
    _sum?: TestResultsSumOrderByAggregateInput
  }

  export type TestResultsScalarWhereWithAggregatesInput = {
    AND?: TestResultsScalarWhereWithAggregatesInput | TestResultsScalarWhereWithAggregatesInput[]
    OR?: TestResultsScalarWhereWithAggregatesInput[]
    NOT?: TestResultsScalarWhereWithAggregatesInput | TestResultsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TestResults"> | string
    userEmail?: StringWithAggregatesFilter<"TestResults"> | string
    userMobile?: StringNullableWithAggregatesFilter<"TestResults"> | string | null
    userName?: StringNullableWithAggregatesFilter<"TestResults"> | string | null
    score?: IntNullableWithAggregatesFilter<"TestResults"> | number | null
    status?: EnumTesResultStatusNullableWithAggregatesFilter<"TestResults"> | $Enums.TesResultStatus | null
    createdAt?: DateTimeWithAggregatesFilter<"TestResults"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TestResults"> | Date | string
    testId?: StringWithAggregatesFilter<"TestResults"> | string
  }

  export type MentorCreateInput = {
    id?: string
    email: string
    name?: string | null
    mobile?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    mobile?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    mobile?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MentorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MentorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestCreateInput = {
    id?: string
    name?: string | null
    description?: string | null
    conceptsCovered?: string | null
    type?: $Enums.TestType | null
    status?: $Enums.TestStatus | null
    duration?: number | null
    noOfQuestions?: number | null
    noOfAttempts?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: TestQuestionsCreateNestedManyWithoutTestInput
    attempts?: TestResultsCreateNestedManyWithoutTestInput
  }

  export type TestUncheckedCreateInput = {
    id?: string
    name?: string | null
    description?: string | null
    conceptsCovered?: string | null
    type?: $Enums.TestType | null
    status?: $Enums.TestStatus | null
    duration?: number | null
    noOfQuestions?: number | null
    noOfAttempts?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: TestQuestionsUncheckedCreateNestedManyWithoutTestInput
    attempts?: TestResultsUncheckedCreateNestedManyWithoutTestInput
  }

  export type TestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    conceptsCovered?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumTestTypeFieldUpdateOperationsInput | $Enums.TestType | null
    status?: NullableEnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    noOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    noOfAttempts?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: TestQuestionsUpdateManyWithoutTestNestedInput
    attempts?: TestResultsUpdateManyWithoutTestNestedInput
  }

  export type TestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    conceptsCovered?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumTestTypeFieldUpdateOperationsInput | $Enums.TestType | null
    status?: NullableEnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    noOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    noOfAttempts?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: TestQuestionsUncheckedUpdateManyWithoutTestNestedInput
    attempts?: TestResultsUncheckedUpdateManyWithoutTestNestedInput
  }

  export type TestCreateManyInput = {
    id?: string
    name?: string | null
    description?: string | null
    conceptsCovered?: string | null
    type?: $Enums.TestType | null
    status?: $Enums.TestStatus | null
    duration?: number | null
    noOfQuestions?: number | null
    noOfAttempts?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    conceptsCovered?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumTestTypeFieldUpdateOperationsInput | $Enums.TestType | null
    status?: NullableEnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    noOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    noOfAttempts?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    conceptsCovered?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumTestTypeFieldUpdateOperationsInput | $Enums.TestType | null
    status?: NullableEnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    noOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    noOfAttempts?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestQuestionsCreateInput = {
    id?: string
    question?: string | null
    options?: TestQuestionsCreateoptionsInput | string[]
    answer?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    test: TestCreateNestedOneWithoutQuestionsInput
  }

  export type TestQuestionsUncheckedCreateInput = {
    id?: string
    question?: string | null
    options?: TestQuestionsCreateoptionsInput | string[]
    answer?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    testId: string
  }

  export type TestQuestionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: NullableStringFieldUpdateOperationsInput | string | null
    options?: TestQuestionsUpdateoptionsInput | string[]
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    test?: TestUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type TestQuestionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: NullableStringFieldUpdateOperationsInput | string | null
    options?: TestQuestionsUpdateoptionsInput | string[]
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testId?: StringFieldUpdateOperationsInput | string
  }

  export type TestQuestionsCreateManyInput = {
    id?: string
    question?: string | null
    options?: TestQuestionsCreateoptionsInput | string[]
    answer?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    testId: string
  }

  export type TestQuestionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: NullableStringFieldUpdateOperationsInput | string | null
    options?: TestQuestionsUpdateoptionsInput | string[]
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestQuestionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: NullableStringFieldUpdateOperationsInput | string | null
    options?: TestQuestionsUpdateoptionsInput | string[]
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testId?: StringFieldUpdateOperationsInput | string
  }

  export type TestResultsCreateInput = {
    id?: string
    userEmail: string
    userMobile?: string | null
    userName?: string | null
    score?: number | null
    status?: $Enums.TesResultStatus | null
    createdAt?: Date | string
    updatedAt?: Date | string
    test: TestCreateNestedOneWithoutAttemptsInput
  }

  export type TestResultsUncheckedCreateInput = {
    id?: string
    userEmail: string
    userMobile?: string | null
    userName?: string | null
    score?: number | null
    status?: $Enums.TesResultStatus | null
    createdAt?: Date | string
    updatedAt?: Date | string
    testId: string
  }

  export type TestResultsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userMobile?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumTesResultStatusFieldUpdateOperationsInput | $Enums.TesResultStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    test?: TestUpdateOneRequiredWithoutAttemptsNestedInput
  }

  export type TestResultsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userMobile?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumTesResultStatusFieldUpdateOperationsInput | $Enums.TesResultStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testId?: StringFieldUpdateOperationsInput | string
  }

  export type TestResultsCreateManyInput = {
    id?: string
    userEmail: string
    userMobile?: string | null
    userName?: string | null
    score?: number | null
    status?: $Enums.TesResultStatus | null
    createdAt?: Date | string
    updatedAt?: Date | string
    testId: string
  }

  export type TestResultsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userMobile?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumTesResultStatusFieldUpdateOperationsInput | $Enums.TesResultStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestResultsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userMobile?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumTesResultStatusFieldUpdateOperationsInput | $Enums.TesResultStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testId?: StringFieldUpdateOperationsInput | string
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MentorCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    mobile?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    mobile?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MentorMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    mobile?: SortOrder
    password?: SortOrder
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

  export type EnumTestTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.TestType | EnumTestTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.TestType[] | ListEnumTestTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TestType[] | ListEnumTestTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTestTypeNullableFilter<$PrismaModel> | $Enums.TestType | null
  }

  export type EnumTestStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.TestStatus | EnumTestStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.TestStatus[] | ListEnumTestStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TestStatus[] | ListEnumTestStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTestStatusNullableFilter<$PrismaModel> | $Enums.TestStatus | null
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

  export type TestQuestionsListRelationFilter = {
    every?: TestQuestionsWhereInput
    some?: TestQuestionsWhereInput
    none?: TestQuestionsWhereInput
  }

  export type TestResultsListRelationFilter = {
    every?: TestResultsWhereInput
    some?: TestResultsWhereInput
    none?: TestResultsWhereInput
  }

  export type TestQuestionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestResultsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    conceptsCovered?: SortOrder
    type?: SortOrder
    status?: SortOrder
    duration?: SortOrder
    noOfQuestions?: SortOrder
    noOfAttempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestAvgOrderByAggregateInput = {
    duration?: SortOrder
    noOfQuestions?: SortOrder
    noOfAttempts?: SortOrder
  }

  export type TestMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    conceptsCovered?: SortOrder
    type?: SortOrder
    status?: SortOrder
    duration?: SortOrder
    noOfQuestions?: SortOrder
    noOfAttempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    conceptsCovered?: SortOrder
    type?: SortOrder
    status?: SortOrder
    duration?: SortOrder
    noOfQuestions?: SortOrder
    noOfAttempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestSumOrderByAggregateInput = {
    duration?: SortOrder
    noOfQuestions?: SortOrder
    noOfAttempts?: SortOrder
  }

  export type EnumTestTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TestType | EnumTestTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.TestType[] | ListEnumTestTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TestType[] | ListEnumTestTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTestTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.TestType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumTestTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumTestTypeNullableFilter<$PrismaModel>
  }

  export type EnumTestStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TestStatus | EnumTestStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.TestStatus[] | ListEnumTestStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TestStatus[] | ListEnumTestStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTestStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.TestStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumTestStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumTestStatusNullableFilter<$PrismaModel>
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type TestScalarRelationFilter = {
    is?: TestWhereInput
    isNot?: TestWhereInput
  }

  export type TestQuestionsCountOrderByAggregateInput = {
    id?: SortOrder
    question?: SortOrder
    options?: SortOrder
    answer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    testId?: SortOrder
  }

  export type TestQuestionsMaxOrderByAggregateInput = {
    id?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    testId?: SortOrder
  }

  export type TestQuestionsMinOrderByAggregateInput = {
    id?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    testId?: SortOrder
  }

  export type EnumTesResultStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.TesResultStatus | EnumTesResultStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.TesResultStatus[] | ListEnumTesResultStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TesResultStatus[] | ListEnumTesResultStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTesResultStatusNullableFilter<$PrismaModel> | $Enums.TesResultStatus | null
  }

  export type TestResultsCountOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    userMobile?: SortOrder
    userName?: SortOrder
    score?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    testId?: SortOrder
  }

  export type TestResultsAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type TestResultsMaxOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    userMobile?: SortOrder
    userName?: SortOrder
    score?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    testId?: SortOrder
  }

  export type TestResultsMinOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    userMobile?: SortOrder
    userName?: SortOrder
    score?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    testId?: SortOrder
  }

  export type TestResultsSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type EnumTesResultStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TesResultStatus | EnumTesResultStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.TesResultStatus[] | ListEnumTesResultStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TesResultStatus[] | ListEnumTesResultStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTesResultStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.TesResultStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumTesResultStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumTesResultStatusNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TestQuestionsCreateNestedManyWithoutTestInput = {
    create?: XOR<TestQuestionsCreateWithoutTestInput, TestQuestionsUncheckedCreateWithoutTestInput> | TestQuestionsCreateWithoutTestInput[] | TestQuestionsUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestQuestionsCreateOrConnectWithoutTestInput | TestQuestionsCreateOrConnectWithoutTestInput[]
    createMany?: TestQuestionsCreateManyTestInputEnvelope
    connect?: TestQuestionsWhereUniqueInput | TestQuestionsWhereUniqueInput[]
  }

  export type TestResultsCreateNestedManyWithoutTestInput = {
    create?: XOR<TestResultsCreateWithoutTestInput, TestResultsUncheckedCreateWithoutTestInput> | TestResultsCreateWithoutTestInput[] | TestResultsUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestResultsCreateOrConnectWithoutTestInput | TestResultsCreateOrConnectWithoutTestInput[]
    createMany?: TestResultsCreateManyTestInputEnvelope
    connect?: TestResultsWhereUniqueInput | TestResultsWhereUniqueInput[]
  }

  export type TestQuestionsUncheckedCreateNestedManyWithoutTestInput = {
    create?: XOR<TestQuestionsCreateWithoutTestInput, TestQuestionsUncheckedCreateWithoutTestInput> | TestQuestionsCreateWithoutTestInput[] | TestQuestionsUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestQuestionsCreateOrConnectWithoutTestInput | TestQuestionsCreateOrConnectWithoutTestInput[]
    createMany?: TestQuestionsCreateManyTestInputEnvelope
    connect?: TestQuestionsWhereUniqueInput | TestQuestionsWhereUniqueInput[]
  }

  export type TestResultsUncheckedCreateNestedManyWithoutTestInput = {
    create?: XOR<TestResultsCreateWithoutTestInput, TestResultsUncheckedCreateWithoutTestInput> | TestResultsCreateWithoutTestInput[] | TestResultsUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestResultsCreateOrConnectWithoutTestInput | TestResultsCreateOrConnectWithoutTestInput[]
    createMany?: TestResultsCreateManyTestInputEnvelope
    connect?: TestResultsWhereUniqueInput | TestResultsWhereUniqueInput[]
  }

  export type NullableEnumTestTypeFieldUpdateOperationsInput = {
    set?: $Enums.TestType | null
  }

  export type NullableEnumTestStatusFieldUpdateOperationsInput = {
    set?: $Enums.TestStatus | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TestQuestionsUpdateManyWithoutTestNestedInput = {
    create?: XOR<TestQuestionsCreateWithoutTestInput, TestQuestionsUncheckedCreateWithoutTestInput> | TestQuestionsCreateWithoutTestInput[] | TestQuestionsUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestQuestionsCreateOrConnectWithoutTestInput | TestQuestionsCreateOrConnectWithoutTestInput[]
    upsert?: TestQuestionsUpsertWithWhereUniqueWithoutTestInput | TestQuestionsUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: TestQuestionsCreateManyTestInputEnvelope
    set?: TestQuestionsWhereUniqueInput | TestQuestionsWhereUniqueInput[]
    disconnect?: TestQuestionsWhereUniqueInput | TestQuestionsWhereUniqueInput[]
    delete?: TestQuestionsWhereUniqueInput | TestQuestionsWhereUniqueInput[]
    connect?: TestQuestionsWhereUniqueInput | TestQuestionsWhereUniqueInput[]
    update?: TestQuestionsUpdateWithWhereUniqueWithoutTestInput | TestQuestionsUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: TestQuestionsUpdateManyWithWhereWithoutTestInput | TestQuestionsUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: TestQuestionsScalarWhereInput | TestQuestionsScalarWhereInput[]
  }

  export type TestResultsUpdateManyWithoutTestNestedInput = {
    create?: XOR<TestResultsCreateWithoutTestInput, TestResultsUncheckedCreateWithoutTestInput> | TestResultsCreateWithoutTestInput[] | TestResultsUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestResultsCreateOrConnectWithoutTestInput | TestResultsCreateOrConnectWithoutTestInput[]
    upsert?: TestResultsUpsertWithWhereUniqueWithoutTestInput | TestResultsUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: TestResultsCreateManyTestInputEnvelope
    set?: TestResultsWhereUniqueInput | TestResultsWhereUniqueInput[]
    disconnect?: TestResultsWhereUniqueInput | TestResultsWhereUniqueInput[]
    delete?: TestResultsWhereUniqueInput | TestResultsWhereUniqueInput[]
    connect?: TestResultsWhereUniqueInput | TestResultsWhereUniqueInput[]
    update?: TestResultsUpdateWithWhereUniqueWithoutTestInput | TestResultsUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: TestResultsUpdateManyWithWhereWithoutTestInput | TestResultsUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: TestResultsScalarWhereInput | TestResultsScalarWhereInput[]
  }

  export type TestQuestionsUncheckedUpdateManyWithoutTestNestedInput = {
    create?: XOR<TestQuestionsCreateWithoutTestInput, TestQuestionsUncheckedCreateWithoutTestInput> | TestQuestionsCreateWithoutTestInput[] | TestQuestionsUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestQuestionsCreateOrConnectWithoutTestInput | TestQuestionsCreateOrConnectWithoutTestInput[]
    upsert?: TestQuestionsUpsertWithWhereUniqueWithoutTestInput | TestQuestionsUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: TestQuestionsCreateManyTestInputEnvelope
    set?: TestQuestionsWhereUniqueInput | TestQuestionsWhereUniqueInput[]
    disconnect?: TestQuestionsWhereUniqueInput | TestQuestionsWhereUniqueInput[]
    delete?: TestQuestionsWhereUniqueInput | TestQuestionsWhereUniqueInput[]
    connect?: TestQuestionsWhereUniqueInput | TestQuestionsWhereUniqueInput[]
    update?: TestQuestionsUpdateWithWhereUniqueWithoutTestInput | TestQuestionsUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: TestQuestionsUpdateManyWithWhereWithoutTestInput | TestQuestionsUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: TestQuestionsScalarWhereInput | TestQuestionsScalarWhereInput[]
  }

  export type TestResultsUncheckedUpdateManyWithoutTestNestedInput = {
    create?: XOR<TestResultsCreateWithoutTestInput, TestResultsUncheckedCreateWithoutTestInput> | TestResultsCreateWithoutTestInput[] | TestResultsUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestResultsCreateOrConnectWithoutTestInput | TestResultsCreateOrConnectWithoutTestInput[]
    upsert?: TestResultsUpsertWithWhereUniqueWithoutTestInput | TestResultsUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: TestResultsCreateManyTestInputEnvelope
    set?: TestResultsWhereUniqueInput | TestResultsWhereUniqueInput[]
    disconnect?: TestResultsWhereUniqueInput | TestResultsWhereUniqueInput[]
    delete?: TestResultsWhereUniqueInput | TestResultsWhereUniqueInput[]
    connect?: TestResultsWhereUniqueInput | TestResultsWhereUniqueInput[]
    update?: TestResultsUpdateWithWhereUniqueWithoutTestInput | TestResultsUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: TestResultsUpdateManyWithWhereWithoutTestInput | TestResultsUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: TestResultsScalarWhereInput | TestResultsScalarWhereInput[]
  }

  export type TestQuestionsCreateoptionsInput = {
    set: string[]
  }

  export type TestCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<TestCreateWithoutQuestionsInput, TestUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: TestCreateOrConnectWithoutQuestionsInput
    connect?: TestWhereUniqueInput
  }

  export type TestQuestionsUpdateoptionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TestUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<TestCreateWithoutQuestionsInput, TestUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: TestCreateOrConnectWithoutQuestionsInput
    upsert?: TestUpsertWithoutQuestionsInput
    connect?: TestWhereUniqueInput
    update?: XOR<XOR<TestUpdateToOneWithWhereWithoutQuestionsInput, TestUpdateWithoutQuestionsInput>, TestUncheckedUpdateWithoutQuestionsInput>
  }

  export type TestCreateNestedOneWithoutAttemptsInput = {
    create?: XOR<TestCreateWithoutAttemptsInput, TestUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: TestCreateOrConnectWithoutAttemptsInput
    connect?: TestWhereUniqueInput
  }

  export type NullableEnumTesResultStatusFieldUpdateOperationsInput = {
    set?: $Enums.TesResultStatus | null
  }

  export type TestUpdateOneRequiredWithoutAttemptsNestedInput = {
    create?: XOR<TestCreateWithoutAttemptsInput, TestUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: TestCreateOrConnectWithoutAttemptsInput
    upsert?: TestUpsertWithoutAttemptsInput
    connect?: TestWhereUniqueInput
    update?: XOR<XOR<TestUpdateToOneWithWhereWithoutAttemptsInput, TestUpdateWithoutAttemptsInput>, TestUncheckedUpdateWithoutAttemptsInput>
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

  export type NestedEnumTestTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.TestType | EnumTestTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.TestType[] | ListEnumTestTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TestType[] | ListEnumTestTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTestTypeNullableFilter<$PrismaModel> | $Enums.TestType | null
  }

  export type NestedEnumTestStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.TestStatus | EnumTestStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.TestStatus[] | ListEnumTestStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TestStatus[] | ListEnumTestStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTestStatusNullableFilter<$PrismaModel> | $Enums.TestStatus | null
  }

  export type NestedEnumTestTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TestType | EnumTestTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.TestType[] | ListEnumTestTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TestType[] | ListEnumTestTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTestTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.TestType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumTestTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumTestTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTestStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TestStatus | EnumTestStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.TestStatus[] | ListEnumTestStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TestStatus[] | ListEnumTestStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTestStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.TestStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumTestStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumTestStatusNullableFilter<$PrismaModel>
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

  export type NestedEnumTesResultStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.TesResultStatus | EnumTesResultStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.TesResultStatus[] | ListEnumTesResultStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TesResultStatus[] | ListEnumTesResultStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTesResultStatusNullableFilter<$PrismaModel> | $Enums.TesResultStatus | null
  }

  export type NestedEnumTesResultStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TesResultStatus | EnumTesResultStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.TesResultStatus[] | ListEnumTesResultStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TesResultStatus[] | ListEnumTesResultStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTesResultStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.TesResultStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumTesResultStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumTesResultStatusNullableFilter<$PrismaModel>
  }

  export type TestQuestionsCreateWithoutTestInput = {
    id?: string
    question?: string | null
    options?: TestQuestionsCreateoptionsInput | string[]
    answer?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestQuestionsUncheckedCreateWithoutTestInput = {
    id?: string
    question?: string | null
    options?: TestQuestionsCreateoptionsInput | string[]
    answer?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestQuestionsCreateOrConnectWithoutTestInput = {
    where: TestQuestionsWhereUniqueInput
    create: XOR<TestQuestionsCreateWithoutTestInput, TestQuestionsUncheckedCreateWithoutTestInput>
  }

  export type TestQuestionsCreateManyTestInputEnvelope = {
    data: TestQuestionsCreateManyTestInput | TestQuestionsCreateManyTestInput[]
    skipDuplicates?: boolean
  }

  export type TestResultsCreateWithoutTestInput = {
    id?: string
    userEmail: string
    userMobile?: string | null
    userName?: string | null
    score?: number | null
    status?: $Enums.TesResultStatus | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestResultsUncheckedCreateWithoutTestInput = {
    id?: string
    userEmail: string
    userMobile?: string | null
    userName?: string | null
    score?: number | null
    status?: $Enums.TesResultStatus | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestResultsCreateOrConnectWithoutTestInput = {
    where: TestResultsWhereUniqueInput
    create: XOR<TestResultsCreateWithoutTestInput, TestResultsUncheckedCreateWithoutTestInput>
  }

  export type TestResultsCreateManyTestInputEnvelope = {
    data: TestResultsCreateManyTestInput | TestResultsCreateManyTestInput[]
    skipDuplicates?: boolean
  }

  export type TestQuestionsUpsertWithWhereUniqueWithoutTestInput = {
    where: TestQuestionsWhereUniqueInput
    update: XOR<TestQuestionsUpdateWithoutTestInput, TestQuestionsUncheckedUpdateWithoutTestInput>
    create: XOR<TestQuestionsCreateWithoutTestInput, TestQuestionsUncheckedCreateWithoutTestInput>
  }

  export type TestQuestionsUpdateWithWhereUniqueWithoutTestInput = {
    where: TestQuestionsWhereUniqueInput
    data: XOR<TestQuestionsUpdateWithoutTestInput, TestQuestionsUncheckedUpdateWithoutTestInput>
  }

  export type TestQuestionsUpdateManyWithWhereWithoutTestInput = {
    where: TestQuestionsScalarWhereInput
    data: XOR<TestQuestionsUpdateManyMutationInput, TestQuestionsUncheckedUpdateManyWithoutTestInput>
  }

  export type TestQuestionsScalarWhereInput = {
    AND?: TestQuestionsScalarWhereInput | TestQuestionsScalarWhereInput[]
    OR?: TestQuestionsScalarWhereInput[]
    NOT?: TestQuestionsScalarWhereInput | TestQuestionsScalarWhereInput[]
    id?: StringFilter<"TestQuestions"> | string
    question?: StringNullableFilter<"TestQuestions"> | string | null
    options?: StringNullableListFilter<"TestQuestions">
    answer?: StringNullableFilter<"TestQuestions"> | string | null
    createdAt?: DateTimeFilter<"TestQuestions"> | Date | string
    updatedAt?: DateTimeFilter<"TestQuestions"> | Date | string
    testId?: StringFilter<"TestQuestions"> | string
  }

  export type TestResultsUpsertWithWhereUniqueWithoutTestInput = {
    where: TestResultsWhereUniqueInput
    update: XOR<TestResultsUpdateWithoutTestInput, TestResultsUncheckedUpdateWithoutTestInput>
    create: XOR<TestResultsCreateWithoutTestInput, TestResultsUncheckedCreateWithoutTestInput>
  }

  export type TestResultsUpdateWithWhereUniqueWithoutTestInput = {
    where: TestResultsWhereUniqueInput
    data: XOR<TestResultsUpdateWithoutTestInput, TestResultsUncheckedUpdateWithoutTestInput>
  }

  export type TestResultsUpdateManyWithWhereWithoutTestInput = {
    where: TestResultsScalarWhereInput
    data: XOR<TestResultsUpdateManyMutationInput, TestResultsUncheckedUpdateManyWithoutTestInput>
  }

  export type TestResultsScalarWhereInput = {
    AND?: TestResultsScalarWhereInput | TestResultsScalarWhereInput[]
    OR?: TestResultsScalarWhereInput[]
    NOT?: TestResultsScalarWhereInput | TestResultsScalarWhereInput[]
    id?: StringFilter<"TestResults"> | string
    userEmail?: StringFilter<"TestResults"> | string
    userMobile?: StringNullableFilter<"TestResults"> | string | null
    userName?: StringNullableFilter<"TestResults"> | string | null
    score?: IntNullableFilter<"TestResults"> | number | null
    status?: EnumTesResultStatusNullableFilter<"TestResults"> | $Enums.TesResultStatus | null
    createdAt?: DateTimeFilter<"TestResults"> | Date | string
    updatedAt?: DateTimeFilter<"TestResults"> | Date | string
    testId?: StringFilter<"TestResults"> | string
  }

  export type TestCreateWithoutQuestionsInput = {
    id?: string
    name?: string | null
    description?: string | null
    conceptsCovered?: string | null
    type?: $Enums.TestType | null
    status?: $Enums.TestStatus | null
    duration?: number | null
    noOfQuestions?: number | null
    noOfAttempts?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attempts?: TestResultsCreateNestedManyWithoutTestInput
  }

  export type TestUncheckedCreateWithoutQuestionsInput = {
    id?: string
    name?: string | null
    description?: string | null
    conceptsCovered?: string | null
    type?: $Enums.TestType | null
    status?: $Enums.TestStatus | null
    duration?: number | null
    noOfQuestions?: number | null
    noOfAttempts?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attempts?: TestResultsUncheckedCreateNestedManyWithoutTestInput
  }

  export type TestCreateOrConnectWithoutQuestionsInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutQuestionsInput, TestUncheckedCreateWithoutQuestionsInput>
  }

  export type TestUpsertWithoutQuestionsInput = {
    update: XOR<TestUpdateWithoutQuestionsInput, TestUncheckedUpdateWithoutQuestionsInput>
    create: XOR<TestCreateWithoutQuestionsInput, TestUncheckedCreateWithoutQuestionsInput>
    where?: TestWhereInput
  }

  export type TestUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: TestWhereInput
    data: XOR<TestUpdateWithoutQuestionsInput, TestUncheckedUpdateWithoutQuestionsInput>
  }

  export type TestUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    conceptsCovered?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumTestTypeFieldUpdateOperationsInput | $Enums.TestType | null
    status?: NullableEnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    noOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    noOfAttempts?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: TestResultsUpdateManyWithoutTestNestedInput
  }

  export type TestUncheckedUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    conceptsCovered?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumTestTypeFieldUpdateOperationsInput | $Enums.TestType | null
    status?: NullableEnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    noOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    noOfAttempts?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: TestResultsUncheckedUpdateManyWithoutTestNestedInput
  }

  export type TestCreateWithoutAttemptsInput = {
    id?: string
    name?: string | null
    description?: string | null
    conceptsCovered?: string | null
    type?: $Enums.TestType | null
    status?: $Enums.TestStatus | null
    duration?: number | null
    noOfQuestions?: number | null
    noOfAttempts?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: TestQuestionsCreateNestedManyWithoutTestInput
  }

  export type TestUncheckedCreateWithoutAttemptsInput = {
    id?: string
    name?: string | null
    description?: string | null
    conceptsCovered?: string | null
    type?: $Enums.TestType | null
    status?: $Enums.TestStatus | null
    duration?: number | null
    noOfQuestions?: number | null
    noOfAttempts?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: TestQuestionsUncheckedCreateNestedManyWithoutTestInput
  }

  export type TestCreateOrConnectWithoutAttemptsInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutAttemptsInput, TestUncheckedCreateWithoutAttemptsInput>
  }

  export type TestUpsertWithoutAttemptsInput = {
    update: XOR<TestUpdateWithoutAttemptsInput, TestUncheckedUpdateWithoutAttemptsInput>
    create: XOR<TestCreateWithoutAttemptsInput, TestUncheckedCreateWithoutAttemptsInput>
    where?: TestWhereInput
  }

  export type TestUpdateToOneWithWhereWithoutAttemptsInput = {
    where?: TestWhereInput
    data: XOR<TestUpdateWithoutAttemptsInput, TestUncheckedUpdateWithoutAttemptsInput>
  }

  export type TestUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    conceptsCovered?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumTestTypeFieldUpdateOperationsInput | $Enums.TestType | null
    status?: NullableEnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    noOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    noOfAttempts?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: TestQuestionsUpdateManyWithoutTestNestedInput
  }

  export type TestUncheckedUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    conceptsCovered?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableEnumTestTypeFieldUpdateOperationsInput | $Enums.TestType | null
    status?: NullableEnumTestStatusFieldUpdateOperationsInput | $Enums.TestStatus | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    noOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    noOfAttempts?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: TestQuestionsUncheckedUpdateManyWithoutTestNestedInput
  }

  export type TestQuestionsCreateManyTestInput = {
    id?: string
    question?: string | null
    options?: TestQuestionsCreateoptionsInput | string[]
    answer?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestResultsCreateManyTestInput = {
    id?: string
    userEmail: string
    userMobile?: string | null
    userName?: string | null
    score?: number | null
    status?: $Enums.TesResultStatus | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestQuestionsUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: NullableStringFieldUpdateOperationsInput | string | null
    options?: TestQuestionsUpdateoptionsInput | string[]
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestQuestionsUncheckedUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: NullableStringFieldUpdateOperationsInput | string | null
    options?: TestQuestionsUpdateoptionsInput | string[]
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestQuestionsUncheckedUpdateManyWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: NullableStringFieldUpdateOperationsInput | string | null
    options?: TestQuestionsUpdateoptionsInput | string[]
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestResultsUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userMobile?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumTesResultStatusFieldUpdateOperationsInput | $Enums.TesResultStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestResultsUncheckedUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userMobile?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumTesResultStatusFieldUpdateOperationsInput | $Enums.TesResultStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestResultsUncheckedUpdateManyWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    userMobile?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumTesResultStatusFieldUpdateOperationsInput | $Enums.TesResultStatus | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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