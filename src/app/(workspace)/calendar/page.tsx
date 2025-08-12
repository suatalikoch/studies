import { Metadata } from "next";
import CalendarClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Calendar",
};

export default function CalendarPage() {
  return <CalendarClient />;
}
