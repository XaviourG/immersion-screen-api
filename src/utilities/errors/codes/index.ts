export const ERROR_CODES = [
  // 500 class errors -> something went wrong with the server
  ['InternalServerError', 500], // generic error
  ['NotImplemented', 501], // self explanatory
  ['ServiceUnavailible', 503], // cannot handle request (temporarily unavailible)
  ['InsufficentStorage', 507], // not enough memory to complete request
  ['LoopDetected', 508], // got stuck in infinite loop,
  ['AuthenticationRequired', 511], // insufficent self-permissions (needs to agree to a waver or something),
  // 400 class errors -> something went wrong with the client
  ['BadRequest', 400], // generic request refused
  ['Unauthorized', 401], // authentication failure
  ['Forbidden', 403], // user is authenticated but lacks permissions,
  ['NotFound', 404], // does not exist
  ['Timeout', 408], // took too long,
  ['Conflict', 409], // request could not go through because of the state of the resource
  ['TooLarge', 413], // request payload is too large
  ['RateLimited', 429], // too many requests by this user
  ['SessionTimeout', 440] // user session has expired (microsoft standard)
] as const;

export type ErrorCodeName = (typeof ERROR_CODES)[number][0];
export type ErrorCode = (typeof ERROR_CODES)[number][1];
