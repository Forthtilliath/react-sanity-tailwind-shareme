/**
 * Simplifed version of setter of useState hook
 * @param **T** - Type of the value of useState hook
 */
export type TSetter<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * Convert a tuple to an object with values. Can even set a prefix value.
 * @param **K** - Tuple
 * @param **T** - String used as prefix of values
 *
 * @example
 * const tupleRoles = ['user', 'moderator', 'admin'] as const;
 *
 * TupleToObject<typeof tupleRoles, 'role_'> = {
 *  user: "role_user";
 *  moderator: "role_moderator";
 *  admin: "role_admin";
 * }
 */
type TupleToObject<K extends readonly any[], T extends string = ''> = {
  [P in K[number]]: `${T}${P}`;
};

/**
 * Get all keys of an object
 * @param T Object
 *
 * @example
 * type TRoles = {
 *  user: "role_user";
 *  moderator: "role_moderator";
 *  admin: "role_admin";
 * }
 *
 * AllKeys<TRoles> = "user" | "moderator" | "admin"
 */
type AllKeys<T> = T extends any ? keyof T : never;

/**
 * Get the type from key of an object
 * @param T Object
 * @param K Key of the object
 *
 * @example
 * type TRoles = {
 *  user: "role_user";
 *  moderator: "role_moderator";
 *  admin: "role_admin";
 * }
 *
 * PickType<TRoles, "user"> = "role_user"
 */
type PickType<T, K extends AllKeys<T>> = T extends { [k in K]?: any }
  ? T[K]
  : undefined;

/**
 * Merge multiple types as one
 * @param T Type objects
 *
 * @example
 * type Product = {
 *  id: string;
 *  name: string;
 *  description: string;
 *  price: number;
 * }
 * type Cart = {
 *   quantity: number;
 * }
 *
 * type T = Merge<Product & Cart>
 * // Equals to
 * type T = {
 *  id: string;
 *  name: string;
 *  description: string;
 *  price: number;
 *  quantity: number;
 * }
 */
type Merge<T extends object> = {
  [k in AllKeys<T>]: T[k];
};