import type { RouteObject } from "react-router-dom";

export function createRoutes(routes: RouteObject[]): RouteObject[] {
  return routes
    .map((route) => {
      if (route.index) {
        return {
          index: true,
          element: route.element,
        };
      }

      return {
        path: route.path,
        element: route.element,
        children: route.children ? createRoutes(route.children) : undefined,
        errorElement: route.errorElement,
      };
    })
    .filter((route) => route !== undefined);
}
