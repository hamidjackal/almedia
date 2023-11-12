export function error(err): ErrorResponse {
  const error = err?.response?.message || err?.stack || err;
  return {
    success: false,
    error: error,
  };
}
