import { Metadata } from "next";
import NotesClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Notes",
};

export default function NotesPage() {
  return <NotesClient />;
}
