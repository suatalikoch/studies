import { Metadata } from "next";
import LecturesClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Lectures",
};

export default function LecturesPage() {
  return <LecturesClient />;
}
