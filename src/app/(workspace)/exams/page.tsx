import { Metadata } from "next";
import ExamsClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Exams",
};

export default function ExamsPage() {
  return <ExamsClient />;
}
