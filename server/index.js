// Serverless entry for Vercel. Exports the Express app instead of
// starting a listener (Vercel invokes it as a function).
// For local development use `npm run dev` (server.js) which calls listen.
module.exports = require('./app');
