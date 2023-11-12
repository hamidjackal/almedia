export function success(result: object | object[]): SuccessResponse {
  const response: SuccessResponse = {
    success: true,
    result,
  };
  return response;
}
