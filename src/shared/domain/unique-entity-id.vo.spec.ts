import InvalidUuidError from "../errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

describe("UniqueEntityId Unit Test", () => {
  let validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
  beforeEach(() => {
    jest.clearAllMocks();
    validateSpy.mockClear();
  });

  it("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityId("fake")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "84b204a3-2711-4483-be04-1bdec8bfac12";
    const vo = new UniqueEntityId(uuid);
    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const vo = new UniqueEntityId();
    expect(uuidValidate(vo.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
