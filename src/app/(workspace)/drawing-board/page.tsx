import { Metadata } from "next";
import DrawingBoardClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Drawing Board",
};

export default function DrawingBoardPage() {
  return <DrawingBoardClient />;
}
