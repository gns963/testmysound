// Entry point for Hostinger's Node.js App manager (Phusion Passenger), which
// runs this file directly and expects it to listen on process.env.PORT —
// `next start` alone doesn't work under Passenger, so this wraps the Next.js
// request handler in a plain http server instead.
const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

const CANONICAL_HOST = "testmysound.com";

app.prepare().then(() => {
  createServer((req, res) => {
    const host = (req.headers.host || "").split(":")[0];
    if (host === `www.${CANONICAL_HOST}`) {
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
