import { success } from "./success";

describe("success", () => {
  it("should return a success response", () => {
    const result = success({ foo: "bar" });
    expect(result).toEqual({
      success: true,
      result: { foo: "bar" },
    });
  });
});
