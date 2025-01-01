import { optional, required } from "./core";

describe("core", () => {
  describe("required", () => {
    it("should return the string value if it is defined", () => {
      const subject = required;
      const expectedString = "test";
      const actual = subject(expectedString);
      expect(actual).toEqual(expectedString);
    });

    it("should return the number value if it is defined", () => {
      const subject = required;
      const expectedNumber = 123;
      const actual = subject(expectedNumber);
      expect(actual).toEqual(expectedNumber);
    });

    it("should return the boolean value if it is defined", () => {
      const subject = required;
      const expectedBoolean = true;
      const actual = subject(expectedBoolean);
      expect(actual).toEqual(expectedBoolean);
    });

    it("should throw an error if the value is null", () => {
      const subject = required;
      expect(() => subject(null)).toThrow("Value must be defined");
    });

    it("should throw an error if the value is undefined", () => {
      const subject = required;
      expect(() => subject(undefined)).toThrow("Value must be defined");
    });
  });

  describe("optional", () => {
    it("should return the string value if it is defined", () => {
      const subject = optional;
      const expectedString = "test";
      const actual = subject(expectedString);
      expect(actual).toEqual(expectedString);
    });

    it("should return the number value if it is defined", () => {
      const subject = optional;
      const expectedNumber = 123;
      const actual = subject(expectedNumber);
      expect(actual).toEqual(expectedNumber);
    });

    it("should return the boolean value if it is defined", () => {
      const subject = optional;
      const expectedBoolean = true;
      const actual = subject(expectedBoolean);
      expect(actual).toEqual(expectedBoolean);
    });

    it("should return undefined if the value is null", () => {
      const subject = optional;
      const expected = undefined;
      const actual = subject(null);
      expect(actual).toEqual(expected);
    });

    it("should return undefined if the value is undefined", () => {
      const subject = optional;
      const expected = undefined;
      const actual = subject(undefined);
      expect(actual).toEqual(expected);
    });
  });
});
