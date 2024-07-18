"use client";
import "react-phone-number-input/style.css";
import PhoneInput, { Value } from "react-phone-number-input";
import { useState } from "react";

// Define a type for the value state
type E164Number = string | undefined;

export function PhoneInputComponent() {
  // Use E164Number type for value state
  const [value, setValue] = useState<E164Number>(undefined);

  // Handle change with additional logic if needed
  const handleChange = (phoneNumber: Value) => {
    setValue(phoneNumber as E164Number);
    // Additional logic can be added here if needed
  };

  return (
    <PhoneInput
      defaultCountry="UG"
      placeholder="Enter phone number"
      international
      withCountryCallingCode
      value={value}
      onChange={handleChange}
    />
  );
}
