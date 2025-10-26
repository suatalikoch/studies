import { Card, CardContent } from "@/components/UI";
import { Rocket, Star, ToolCase } from "lucide-react";

export default function AboutClient() {
  return (
    <div className="flex flex-col items-center justify-center px-3 sm:px-6 py-6 sm:py-12">
      <div className="flex flex-col gap-6 w-full bg-white dark:bg-neutral-950 p-6 sm:p-8">
        <h1 className="sm:text-3xl font-bold text-center">
          About This Project
        </h1>
        <p className="text-muted-foreground sm:text-lg leading-relaxed">
          This project is a{" "}
          <span className="font-semibold">Notes Dashboard</span>
          &nbsp;built with{" "}
          <span className="text-primary">Next.js (React + TypeScript)</span>
          and <span className="text-primary">Tailwind CSS</span>. It provides an
          all-in-one space for managing notes, editing content, organizing
          subjects, and keeping track of recent activity.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <Card className="bg-indigo-50 dark:bg-indigo-200 border border-indigo-100">
            <CardContent>
              <div className="flex items-center gap-2">
                <Star className="text-indigo-700" />
                <h3 className="font-semibold text-indigo-700">Features</h3>
              </div>
              <ul className="flex flex-col gap-1 list-disc list-inside text-neutral-700 mt-2">
                <li>List & Grid views for notes</li>
                <li>Edit titles, subjects, content</li>
                <li>Tag management</li>
                <li>Favorites toggle</li>
                <li>Recent notes preview</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-green-50 dark:bg-green-200 border border-green-100">
            <CardContent>
              <div className="flex items-center gap-2">
                <ToolCase className="text-green-700" />
                <h3 className="font-semibold text-green-700">Tech Stack</h3>
              </div>
              <ul className="flex flex-col gap-1 list-disc list-inside text-neutral-700 mt-2">
                <li>Next.js + TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Supabase (backend & DB)</li>
                <li>Shadcn/ui components</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto flex justify-center items-center gap-2">
          <Rocket className="text-muted-foreground" />
          <p className="text-muted-foreground text-xs sm:text-sm">
            <b>Work in progress</b> - more features like collaboration, study
            planning, and syncing are on the way!
          </p>
        </div>
      </div>
    </div>
  );
}
