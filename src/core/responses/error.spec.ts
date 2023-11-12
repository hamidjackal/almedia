import { error } from "./error";

describe("error", () => {
  it("should return an error response", () => {
    const result = error("error");
    expect(result).toEqual({
      success: false,
      error: "error",
    });
  });
});
