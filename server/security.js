import { authenticateRequest, requestFingerprint } from "./auth.js";

export function getBearerToken(req) {
  const value = req.headers.authorization;
  if (typeof value !== "string") return null;
  const match = value.match(/^Bearer\\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

export function authenticationConfigured() {
  return Boolean(process.env.AUTH_ISSUER);
}

export function requireAuthentication(req) {
  const result = authenticateRequest(req);
  if (!result.ok) {
    return { ...result, requestFingerprint: requestFingerprint(req) };
  }
  return result;
}
