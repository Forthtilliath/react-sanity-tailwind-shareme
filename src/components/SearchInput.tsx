import React from 'react';
import { IoMdSearch } from 'react-icons/io';

import { useSearchContext } from 'utils/contexts/SearchContext';
import { useRouter } from 'utils/hooks/useRouter';

const mainRoutes = ['/category/:categoryId', '/'];

const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useSearchContext();
  const { navigate, path } = useRouter();

  const inMainRoute = React.useMemo(() => mainRoutes.includes(path), [path]);

  return (
    <div className="flex items-center justify-start w-full px-2 bg-white border-none rounded-md outline-none focus-within:shadow-sm focus-within:outline-2 focus-within:outline-red-500">
      <IoMdSearch fontSize={21} className="ml-1" />
      <input
        type="text"
        // Tab only works in search route ! To not be redirected on focus
        // tabIndex={'/search' === pathname ? 0 : -1}
        // Tab only works in categories route and home route
        tabIndex={inMainRoute ? 0 : -1}
        // tabIndex={0}
        onChange={(e) => setSearchTerm(e.target.value)}
        //
        value={searchTerm}
        placeholder="Search"
        // onFocus={() => navigate('/search')}
        // onFocus={() => navigate('/')}
        onFocus={() => !inMainRoute && navigate('/')}
        className="w-full p-2 bg-white outline-none"
      />
    </div>
  );
};

export default SearchInput;
