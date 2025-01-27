import { convertArabicToRomanNumeral } from "../route";
import { GET } from "../route";

describe("Test Arabic numeral to Roman numeral conversion", () => {
  describe("test conversion", () => {
    test("test conversion for 1 successful", () => {
      expect(convertArabicToRomanNumeral(1)).toBe("I");
    });

    test("test conversion for 3999 successful", () => {
      expect(convertArabicToRomanNumeral(3999)).toBe("MMMCMXCIX");
    });

    test("test conversion for 2025 successful", () => {
      expect(convertArabicToRomanNumeral(2025)).toBe("MMXXV");
    });

    test("test conversion for 26 successful", () => {
      expect(convertArabicToRomanNumeral(26)).toBe("XXVI");
    });
  });
});

describe("Test request and response", () => {
  describe("Invalid input", () => {
    test("test string input", async () => {
      const testRequest = new Request(
        "http://localhost:8080/romannumeral?query=badinput"
      );
      const response = await GET(testRequest);
      expect(response.status).toBe(400);
      expect((await response.json()).errorCode).toBe("1");
    });

    test("test numeric mixed with string input", async () => {
      const testRequest = new Request(
        "http://localhost:8080/romannumeral?query=123badinput"
      );
      const response = await GET(testRequest);
      expect(response.status).toBe(400);
      expect((await response.json()).errorCode).toBe("1");
    });

    test("test random input", async () => {
      const testRequest = new Request(
        "http://localhost:8080/romannumeral?query=1h23kf8"
      );
      const response = await GET(testRequest);
      expect(response.status).toBe(400);
      expect((await response.json()).errorCode).toBe("1");
    });

    test("test input contains digits", async () => {
      const testRequest = new Request(
        "http://localhost:8080/romannumeral?query=1.22"
      );
      const response = await GET(testRequest);
      expect(response.status).toBe(400);
      expect((await response.json()).errorCode).toBe("1");
    });

    test("test integer outside of range", async () => {
      const testRequest = new Request(
        "http://localhost:8080/romannumeral?query=0"
      );
      const response = await GET(testRequest);
      expect(response.status).toBe(400);
      expect((await response.json()).errorCode).toBe("2");
    });

    test("test integer outside of range", async () => {
      const testRequest = new Request(
        "http://localhost:8080/romannumeral?query=4000"
      );
      const response = await GET(testRequest);
      expect(response.status).toBe(400);
      expect((await response.json()).errorCode).toBe("2");
    });
  });
});
