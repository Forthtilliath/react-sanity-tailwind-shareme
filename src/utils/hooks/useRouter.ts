// https://www.npmjs.com/package/query-string
import queryString from 'query-string';
import { useMemo } from 'react';
import {
  NavigateFunction,
  Params,
  PathMatch,
  matchPath,
  matchRoutes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

export type Return = {
  /** A URL pathname, beginning with a /. */
  pathname: string;
  /** A value of arbitrary data associated with this location. */
  state: any;
  /** A URL pathname, using keys of the dynamic params from the current URL */
  path: string;
  /** Returns an object of key/value pairs of the dynamic params from the current URL that were matched by the route path. */
  params: Readonly<Params<string>>;
  /** Returns an object of key/value pairs from query parameters */
  query: queryString.ParsedQuery<string>;
  /** Returns the current location object, which represents the current URL in web browsers. */
  location: Location;
  /** Returns an imperative method for changing the location. Used by s, but may also be used by other elements to change the location. */
  navigate: NavigateFunction;
  /** Performs pattern matching on a URL pathname and returns information about the match. */
  match: PathMatch<any> | null;
  /** Returns an object from the hash. */
  hash: queryString.ParsedQuery<string>;
};

// Example
// https://codesandbox.io/s/userouter-hook-67n9n3?file=/src/useRouter.js

export const useRouter = () => {
  const params = useParams();
  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  const getPath = () => {
    if (!Object.keys(params).length) {
      return pathname; // we don't need to replace anything
    }

    let path = pathname;
    Object.entries(params).forEach(([paramName, paramValue]) => {
      if (paramValue) {
        path = path.replace(paramValue, `:${paramName}`);
      }
    });

    return path;
  };

  const path = getPath();

  const match = matchPath({ path }, pathname);

  return useMemo((): Return => {
    return {
      pathname,
      state,
      path,
      params,
      // query: {
      //   ...queryString.parse(location.search),
      //   ...params,
      // },
      query: queryString.parse(location.search),
      hash: queryString.parse(location.hash),
      location,
      navigate,
      match,
    };
  }, [params, location, navigate, pathname]);
};

/**
 * NOTE : Not updated
 */
export const useRouterWithRoutes = (routes = []) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [{ route }] = matchRoutes(routes, location) ?? [
    { route: { path: null } },
  ];

  return useMemo(() => {
    return {
      pathname: location.pathname,
      path: route.path,
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
      location,
      navigate,
    };
  }, [params, location, navigate, route.path]);
};
