// NOT what runs in production on Hostinger. Hostinger auto-detects this repo
// as a Next.js app and deploys via `output: "standalone"`, which generates
// and runs its OWN server.js (next/dist/server/lib/start-server) — this file
// is never invoked. Confirmed by inspecting the live file via Hostinger's
// File Manager (hbuilds/current/nodejs/server.js is the standalone-generated
// one, not this one). Host-based redirects belong in next.config.ts
// (redirects()), not here. Kept only in case the Passenger deploy path is
// ever switched back to a custom entry point.
const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`> Ready on port ${port}`);
  });
});
