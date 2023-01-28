// SEARCH
export type SearchQueryData = {
  searchTerm?: string;
  category?: string;
};

export type SearchQueryKey = readonly [key:string, data:SearchQueryData];

export type SearchQueryType = (
  queryKey: QueryFunctionContext<SearchQueryKey>
) => Promise<TPin[]>;

// USER
export type UserQueryData = {
  userId?: string;
};

export type UserQueryKey = readonly [key: string, data: UserQueryData];

export type UserQueryType = (
  queryKey: QueryFunctionContext<UserQueryKey>
) => Promise<TUserDB>;

// ALL
// export type QueryKey<T> = readonly [key: string, data: T];

// export type QueryType<T, U> = (
//   queryKey: QueryFunctionContext<QueryKey<T>>
// ) => Promise<U>;
