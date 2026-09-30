import { listRoutes, matchRoute, route } from "./router.js";
import { parseJsonBody } from "./request.js";
import { requireAuthentication } from "./security.js";
import {
  listPublicOrganizations,
  listPublicProjects,
  listPublicPartnerships,
  listImpactSummaries
} from "./repository.js";

const NOT_IMPLEMENTED = "route_not_implemented_until_production_dependencies_are_connected";

const publicList = loader => async ({ req }) => {
  const url = new URL(req.url || "/", "http://api.local");
  return { status: 200, body: { data: await loader({ limit: url.searchParams.get("limit") }) } };
};

route("GET", "/api/organizations", publicList(listPublicOrganizations));
route("GET", "/api/projects", publicList(listPublicProjects));
route("GET", "/api/partnerships", publicList(listPublicPartnerships));
route("GET", "/api/impact", publicList(listImpactSummaries));
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
