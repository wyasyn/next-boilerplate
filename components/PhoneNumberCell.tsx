"use client";

import { TableCell } from "./ui/table";
import { formatPhoneNumber } from "react-phone-number-input";

export default function PhoneNumberCell({
  phoneNumber,
}: {
  phoneNumber: string;
}) {
  const formattedNumber = formatPhoneNumber(phoneNumber);
  return <TableCell>{formattedNumber}</TableCell>;
}
