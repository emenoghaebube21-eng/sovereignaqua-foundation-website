import { listRoutes, matchRoute, route } from "./router.js";
import { parseJsonBody } from "./request.js";
import { requireAuthentication } from "./security.js";

const NOT_IMPLEMENTED = "route_not_implemented_until_production_dependencies_are_connected";

const publicPlaceholder = () => async () => ({
  status: 501,
  body: { error: NOT_IMPLEMENTED }
});

route("GET", "/api/organizations", publicPlaceholder());
route("GET", "/api/projects", publicPlaceholder());
route("GET", "/api/partnerships", publicPlaceholder());
route("GET", "/api/impact", publicPlaceholder());
route("POST", "/api/organizations/onboard", async ({ req }) => {
  await parseJsonBody(req);
  return { status: 501, body: { error: NOT_IMPLEMENTED } };
});
route("POST", "/api/funding/intake", async ({ req }) => {
  await parseJsonBody(req);
  return { status: 501, body: { error: NOT_IMPLEMENTED } };
});
route("POST", "/api/partnerships/requests", protectedPlaceholder(), { auth: true });
route("GET", "/api/funding/me", protectedPlaceholder(), { auth: true });


function protectedPlaceholder() {
  return async ({ req }) => {
    const auth = requireAuthentication(req);
    if (!auth.ok) return { status: auth.status, body: { error: auth.error } };
    return { status: 501, body: { error: NOT_IMPLEMENTED } };
  };
}

route("GET", "/api/auth/me", protectedPlaceholder(), { auth: true });
route("GET", "/api/membership/me", protectedPlaceholder(), { auth: true });
route("GET", "/api/documents", protectedPlaceholder(), { auth: true });
route("GET", "/api/projects", async () => ({
  status: 501,
  body: { error: NOT_IMPLEMENTED }
}));
route("POST", "/api/membership/applications", async ({ req }) => {
  const auth = requireAuthentication(req);
  if (!auth.ok) return { status: auth.status, body: { error: auth.error } };
  await parseJsonBody(req);
  return { status: 501, body: { error: NOT_IMPLEMENTED } };
}, { auth: true });

route("POST", "/api/requests", protectedPlaceholder(), { auth: true });
route("GET", "/api/admin/membership/applications", protectedPlaceholder(), { auth: true });
route("GET", "/api/admin/requests", protectedPlaceholder(), { auth: true });

export function getApiRoute(method, pathname) {
  return matchRoute(method, pathname);
}

export function apiRouteIndex() {
  return listRoutes();
}
