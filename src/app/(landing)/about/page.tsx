import { Metadata } from "next";
import AboutClient from "./client";

export const metadata: Metadata = {
  title: "Studies | About",
};

export default function AboutPage() {
  return <AboutClient />;
}
