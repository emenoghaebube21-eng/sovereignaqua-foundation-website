import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "./index.js";

async function withServer(fn) {
  const server = createServer();
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  try {
    await fn(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

test("health endpoint reports service status", async () => {
  await withServer(async base => {
    const response = await fetch(`${base}/api/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, "ok");
    assert.equal(body.service, "sovereignaqua-global-institute-api");
    assert.ok(response.headers.get("x-request-id"));
    assert.equal(response.headers.get("cache-control"), "no-store");
  });
});

test("unknown API route returns a structured 404", async () => {
  await withServer(async base => {
    const response = await fetch(`${base}/api/does-not-exist`);
    const body = await response.json();

    assert.equal(response.status, 404);
    assert.equal(body.error, "not_found");
    assert.ok(body.requestId);
  });
});

test("public project route is explicit about missing production implementation", async () => {
  await withServer(async base => {
    const response = await fetch(`${base}/api/projects`);
    const body = await response.json();

    assert.equal(response.status, 501);
    assert.equal(body.error, "route_not_implemented_until_production_dependencies_are_connected");
  });
});
