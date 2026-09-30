import test from "node:test";
import assert from "node:assert/strict";
import { verifyExternalToken } from "./auth.js";
import { hasPermission } from "./authorization.js";

test("JWT-shaped input is never accepted as authenticated by parsing alone", () => {
  const token = "eyJhbGciOiJub25lIn0.eyJzdWIiOiJ1c2VyLTEyMyJ9.signature";
  const result = verifyExternalToken(token);
  assert.equal(result.ok, false);
  assert.equal(result.status, 501);
});

test("member permissions are narrowly scoped", () => {
  assert.equal(hasPermission("member", "project.read"), true);
  assert.equal(hasPermission("member", "audit.read"), false);
});

test("administrator permissions include governance review", () => {
  assert.equal(hasPermission("administrator", "governance.read"), true);
  assert.equal(hasPermission("administrator", "audit.read"), true);
});
