export function Logger2Middleware(req, res, next) {
  console.log(`Request is fired...`);
  next();
}