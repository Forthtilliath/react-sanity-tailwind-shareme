import { useQuery } from '@tanstack/react-query';

import { TUserDB, UserQueryData, UserQueryKey } from '@types';

import { fetchUser2 } from 'utils/queries';

export default function useUser(userId: UserQueryData) {
  // 34:20
  // 46:54
  return useQuery<Promise<TUserDB>, Error, TUserDB, UserQueryKey>(
    ['user', userId],
    fetchUser2
  );
}

// export default function useUser<T, U>(
//   userId: T
//   // cb?: (data: T) => void
// ) {
//   // 34:20
//   // 46:54
//   return useQuery<Promise<U>, Error, U, QueryKey<T>>(
//     ['user', userId],
//     fetchUser
//     // ,{
//     //   onSuccess(data) {
//     //     cb && cb(data);
//     //   },
//     // }
//   );
// }
