import { Heading, Form, TextField, Button, Text } from "@adobe/react-spectrum";
import { useState } from "react";

/**
 * Converter - handles main logic for converting Arabic numbers
 * to Roman numerals. Accepting user's input and will call backend
 * API for converting results.
 * Arabic numbers must be in [1, 3999].
 */
export default function Converter() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    const url = `/romannumeral?query=${number}`;
    // DevOps - track total response time for performance monitoring,
    // should have a SLA before release and validate if the SLA is
    // reasonabe upon release
    try {
      const response = await fetch(url);
      const json = await response.json();

      if (!response.ok) {
        setErrors({ input: json.errorMessage });
      }

      setResult(json.output);
    } catch (error) {
      // DevOps - use dedicated error component for internal server
      // error (timeouts, etc). Log errors, setup a error rate for tracking,
      // alerting oncall to investigate if error rate spike is over limit
      console.error(error.message);
    }
    setNumber("");
  };

  return (
    // DevOps - track initial loading time for performance monitoring,
    // should have a SLA before release and validate if the SLA is
    // reasonabe upon release. If initial loading time is noticeably slow,
    // consider add a spinner or other visual clues to comfort users
    <div>
      <Heading level={2}>Roman numeral converter</Heading>
      <Form onSubmit={onSubmit} maxWidth="size-3000" validationErrors={errors}>
        <TextField
          data-testid="input"
          name="input"
          label="Enter a number (1 - 3999)"
          value={number}
          onChange={setNumber}
        ></TextField>
        <Button
          data-testid="submit"
          type="submit"
          variant="primary"
          onSubmit={onSubmit}
          marginY={16}
        >
          Convert to roman numeral
        </Button>
      </Form>
      <Text marginY={12} data-testid="result">
        Roman numeral: {result}
      </Text>
    </div>
  );
}
