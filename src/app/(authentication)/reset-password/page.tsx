import { Metadata } from "next";
import ResetPasswordClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Reset Password",
};

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
