import { useRouter } from "next/navigation";
import { LectureCardProps } from "@/types";
import { BookType, Calendar, Clock } from "lucide-react";
import { Badge, Card, CardContent, Checkbox } from "@/components/UI";

export default function LectureCard({ lecture }: LectureCardProps) {
  const router = useRouter();

  return (
    <Card
      key={lecture.id}
      onClick={() => router.push(`/lectures/${lecture.id}?from=lectures`)}
      className="p-4 hover:border-primary dark:hover:border-primary transition-colors duration-300 hover:shadow-md cursor-pointer"
    >
      <CardContent className="p-0">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold flex-1">{lecture.title}</h3>
          <div className="flex items-center gap-3">
            <BookType className="w-5 h-5 text-indigo-600 dark:text-indigo-500" />
            <Checkbox checked={lecture.attended} />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {lecture.subject} • {lecture.professor}
        </p>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{lecture.type}</Badge>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(lecture.date).toLocaleDateString()}</span>
            </div>
            {lecture.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{lecture.duration}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {lecture.tags?.map((tag, idx) => (
            <Badge key={idx} variant="outline">
              #{tag}
            </Badge>
          ))}
          <Badge variant="outline">+2</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
