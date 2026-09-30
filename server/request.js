const DEFAULT_MAX_BODY_BYTES = 1024 * 1024;

export function parseJsonBody(req, maxBytes = DEFAULT_MAX_BODY_BYTES) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let body = "";

    req.setEncoding("utf8");

    req.on("data", chunk => {
      size += Buffer.byteLength(chunk, "utf8");
      if (size > maxBytes) {
        const error = new Error("request_body_too_large");
        error.statusCode = 413;
        reject(error);
        req.destroy();
        return;
      }
      body += chunk;
    });

    req.on("end", () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        const error = new Error("invalid_json");
        error.statusCode = 400;
        reject(error);
      }
    });

    req.on("error", reject);
  });
}
