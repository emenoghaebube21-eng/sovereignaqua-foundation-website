import crypto from "node:crypto";
import { getBearerToken } from "./security.js";

function base64urlDecode(value) {
  return Buffer.from(value.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
}

function parseJwtPayload(token) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    return JSON.parse(base64urlDecode(parts[1]));
  } catch {
    return null;
  }
}

export function authMode() {
  return process.env.AUTH_MODE || "external";
}

export function verifyExternalToken(token) {
  if (!token) return { ok: false, status: 401, error: "authentication_required" };

  // The external-provider adapter is intentionally fail-closed.
  // JWT parsing alone is never treated as authentication.
  if (authMode() !== "external") {
    return { ok: false, status: 503, error: "unsupported_auth_mode" };
  }

  const payload = parseJwtPayload(token);
  if (!payload) return { ok: false, status: 401, error: "invalid_token" };

  return {
    ok: false,
    status: 501,
    error: "external_token_verifier_not_configured",
    metadata: {
      issuerConfigured: Boolean(process.env.AUTH_ISSUER),
      clientConfigured: Boolean(process.env.AUTH_CLIENT_ID),
      parsedClaimsAvailable: true
    }
  };
}

export function authenticateRequest(req) {
  if (!process.env.AUTH_ISSUER) {
    return { ok: false, status: 503, error: "authentication_not_configured" };
  }

  const token = getBearerToken(req);
  return verifyExternalToken(token);
}

export function requestFingerprint(req) {
  const forwarded = req.headers["x-forwarded-for"];
  const value = typeof forwarded === "string" ? forwarded.split(",")[0].trim() : req.socket.remoteAddress || "";
  return crypto.createHash("sha256").update(value).digest("hex");
}
