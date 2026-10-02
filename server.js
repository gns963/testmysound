// Entry point for Hostinger's Node.js App manager (Phusion Passenger), which
// runs this file directly and expects it to listen on process.env.PORT —
// `next start` alone doesn't work under Passenger, so this wraps the Next.js
// request handler in a plain http server instead.
const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

const APEX_HOST = "testmysound.com";
const CANONICAL_HOST = `www.${APEX_HOST}`;

app.prepare().then(() => {
  createServer((req, res) => {
    const host = (req.headers.host || "").split(":")[0];
    if (host === APEX_HOST) {
      res.writeHead(301, {
        Location: `https://${CANONICAL_HOST}${req.url}`,
      });
      res.end();
      return;
    }
    handle(req, res);
  }).listen(port, () => {
    console.log(`> Ready on port ${port}`);
  });
});
