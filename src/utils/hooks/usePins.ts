import { useQuery } from '@tanstack/react-query';

import { SearchQueryData, SearchQueryKey, TPin } from '@types';

import { fetchFeed } from 'utils/queries';

export default function usePins(
  datas: SearchQueryData
  //   cb?: (data: TPin[]) => void
) {
  // 34:20
  // 46:54
  return useQuery<Promise<TPin[]>, Error, TPin[], SearchQueryKey>(
    ['feed', datas],
    fetchFeed
    // ,{
    //   onSuccess(data) {
    //     cb && cb(data);
    //   },
    // }
  );
}
