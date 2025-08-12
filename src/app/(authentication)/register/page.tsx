import { Metadata } from "next";
import RegisterClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Register",
};

export default function RegisterPage() {
  return <RegisterClient />;
}
