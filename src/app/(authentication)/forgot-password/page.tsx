import { Metadata } from "next";
import ForgotPasswordClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Forgot Password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
