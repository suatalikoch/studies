import { Metadata } from "next";
import AssignmentsClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Assignments",
};

export default function AssignmentsPage() {
  return <AssignmentsClient />;
}
