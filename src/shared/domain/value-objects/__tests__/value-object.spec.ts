import ValueObject from "../value-object";

class StubValueObject extends ValueObject {}

describe("ValueObject Unit Test", () => {
  it("should set value", () => {
    let vo = new StubValueObject("string value");
    expect(vo.value).toBe("string value");

    vo = new StubValueObject({ prop1: "value1" });
    expect(vo.value).toStrictEqual({ prop1: "value1" });
  });

  it("should convert to a string", () => {
    const date = new Date();
    let arrange = [
      { received: "", expect: "" },
      { received: "fake test", expect: "fake test" },
      { received: 0, expect: "0" },
      { received: 1, expect: "1" },
      { received: 5, expect: "5" },
      { received: true, expect: "true" },
      { received: false, expect: "false" },
      { received: date, expect: date.toString() },
      {
        received: { prop1: "value1" },
        expect: JSON.stringify({ prop1: "value1" }),
      },
    ];

    arrange.forEach((value) => {
      const vo = new StubValueObject(value.received);
      expect(vo + "").toBe(value.expect);
    });
  });

  it("should be a immutable object", () => {
    const obj = {
      prop1: "value1",
      deep: { prop2: "value2", prop3: new Date() },
    };

    const vo = new StubValueObject(obj);

    expect(() => {
      (vo as any).value.prop1 = "test 1";
    }).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    );

    expect(() => {
      (vo as any).value.deep.prop2 = "test 2";
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    );

    expect(vo.value.deep.prop3).toBeInstanceOf(Date);
  });
});
