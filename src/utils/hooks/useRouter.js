import queryString from 'query-string';
import { useMemo } from 'react';
import {
  matchPath,
  matchRoutes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

// Example
// https://codesandbox.io/s/userouter-hook-67n9n3?file=/src/useRouter.js

export const useRouter = () => {
  const params = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const path = useMemo(() => {
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
  }, [pathname, params]);

  const match = matchPath({ path }, pathname);

  return useMemo(() => {
    return {
      pathname,
      // path: getRoutePath(location, params),
      path,
      params,
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
      location,
      navigate,
      match,
    };
  }, [params, location, navigate]);
};

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
