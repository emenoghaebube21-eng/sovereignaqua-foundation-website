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
  if (!authenticationConfigured()) {
    return {
      ok: false,
      status: 503,
      error: "authentication_not_configured"
    };
  }

  const token = getBearerToken(req);
  if (!token) {
    return {
      ok: false,
      status: 401,
      error: "authentication_required"
    };
  }

  return {
    ok: false,
    status: 501,
    error: "token_verification_not_implemented"
  };
}
