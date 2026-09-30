const routes = new Map();

export function route(method, path, handler, options = {}) {
  routes.set(`${method.toUpperCase()} ${path}`, {
    method: method.toUpperCase(),
    path,
    handler,
    auth: options.auth ?? false
  });
}

export function matchRoute(method, pathname) {
  return routes.get(`${method.toUpperCase()} ${pathname}`) || null;
}

export function listRoutes() {
  return [...routes.values()].map(({ method, path, auth }) => ({ method, path, auth }));
}
