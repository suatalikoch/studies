import { Metadata } from "next";
import LoginClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Login",
};

export default function LoginPage() {
  return <LoginClient />;
}
