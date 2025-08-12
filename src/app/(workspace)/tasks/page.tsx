import { Metadata } from "next";
import TasksClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Tasks",
};

export default function Tasks() {
  return <TasksClient />;
}
