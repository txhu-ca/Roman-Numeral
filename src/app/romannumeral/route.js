export async function GET(request) {
  // DevOps - add loggings for request, can extract user data for future
  // analysis, like request time (for usage pattern), browser size and
  // device type (for responsive UI and test coverage), etc.
  const url = new URL(request.url);
  const params = url.searchParams;

  // DevOps - add loggings for input errors, could be used for further
  // improving user experience
  const input = params.get("query");
  if (!/^[0-9]+$/.test(input)) {
    return Response.json(
      { errorCode: "1", errorMessage: "Not a valid number." },
      { status: 400 }
    );
  }

  const number = parseInt(input);
  if (number < 1 || number > 3999) {
    return Response.json(
      { errorCode: "2", errorMessage: "Number out of range." },
      { status: 400 }
    );
  }

  // DevOps - add loggings for usage (which numbers are mostly converted?),
  // this can be used for providing default user inputs and caching
  const output = convertArabicToRomanNumeral(number);

  return Response.json({ input: number, output: output });
}

export const convertArabicToRomanNumeral = (arabicNumber) => {
  // Check https://en.wikipedia.org/wiki/Roman_numerals for conversion table
  const THOUSANDS = {
    0: "",
    1: "M",
    2: "MM",
    3: "MMM",
  };
  const HUNDREDS = {
    0: "",
    1: "C",
    2: "CC",
    3: "CCC",
    4: "CD",
    5: "D",
    6: "DC",
    7: "DCC",
    8: "DCCC",
    9: "CM",
  };
  const TENS = {
    0: "",
    1: "X",
    2: "XX",
    3: "XXX",
    4: "XL",
    5: "L",
    6: "LX",
    7: "LXX",
    8: "LXXX",
    9: "XC",
  };
  const UNITS = {
    0: "",
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
  };

  let input = arabicNumber;
  const thousandDigit = Math.floor(input / 1000);
  input = input % 1000;
  const hundredDigit = Math.floor(input / 100);
  input = input % 100;
  const tenDigit = Math.floor(input / 10);
  input = input % 10;
  const unitsDigit = input;

  const result =
    THOUSANDS[thousandDigit] +
    HUNDREDS[hundredDigit] +
    TENS[tenDigit] +
    UNITS[unitsDigit];

  return result;
};
