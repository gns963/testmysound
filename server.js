// Entry point for Hostinger's Node.js App manager (Phusion Passenger), which
// runs this file directly and expects it to listen on process.env.PORT —
// `next start` alone doesn't work under Passenger, so this wraps the Next.js
// request handler in a plain http server instead.
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
