"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Clock,
  Play,
  Pause,
  RefreshCw,
  Star,
  CheckCircle,
  Award,
  Zap,
} from "lucide-react";
import { Exam } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
  Progress,
  Button,
  Badge,
  CardContent,
  Card,
} from "@/components/UI";

interface RevisionSessionProps {
  examsDb: Exam[];
}

export default function RevisionSessionClient({
  examsDb,
}: RevisionSessionProps) {
  const [open, setOpen] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState<number>(25 * 60);
  const [cyclesCompleted, setCyclesCompleted] = useState<number>(0);
  const [totalCycles, setTotalCycles] = useState<number>(4);
  const [breakTime, setBreakTime] = useState<number>(5 * 60);
  const [onBreak, setOnBreak] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [streak, setStreak] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [showEmojis, setShowEmojis] = useState(false); // for emoji confetti

  const nearestExam = useMemo(() => {
    return examsDb.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )[0];
  }, [examsDb]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0) {
          clearInterval(timer);

          if (!onBreak) {
            // Completed a focus cycle
            const newPoints = points + 10;
            const newStreak = streak + 1;
            setPoints(newPoints);
            setStreak(newStreak);
            triggerConfetti();

            setCyclesCompleted((prev) => prev + 1);
            if (cyclesCompleted + 1 === totalCycles) {
              setIsRunning(false);
              setShowCompletion(true);
            } else {
              // start break
              setOnBreak(true);
              setTimeLeft(breakTime);
              setIsRunning(true);
            }
          } else {
            // finish break
            setOnBreak(false);
            setTimeLeft(totalTime);
            setIsRunning(true);
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    isRunning,
    onBreak,
    cyclesCompleted,
    totalTime,
    breakTime,
    totalCycles,
    points,
    streak,
  ]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const startSession = () => {
    setSessionStarted(true);
    setIsRunning(true);
    setTotalTime(25 * 60);
    setTimeLeft(25 * 60);
    setCyclesCompleted(0);
    setOnBreak(false);
    setShowCompletion(false);
    if (!selectedExam) setSelectedExam(nearestExam?.subject || "");
  };

  const resetSession = () => {
    setTimeLeft(totalTime);
    setIsRunning(false);
    setSessionStarted(false);
    setSelectedExam("");
    setCyclesCompleted(0);
    setOnBreak(false);
    setShowCompletion(false);
    setPoints(0);
    setStreak(0);
  };

  const percentageDone = ((totalTime - timeLeft) / totalTime) * 100;
  const endTime = new Date(
    new Date().getTime() + timeLeft * 1000
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Emoji confetti effect
  const triggerConfetti = () => {
    setShowEmojis(true);
    setTimeout(() => setShowEmojis(false), 2000); // hide after 2s
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-4 relative">
      {!sessionStarted && (
        <Button
          variant="secondary"
          className="flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          <Clock className="w-4 h-4" /> Start Revision Session
        </Button>
      )}
      {sessionStarted && (
        <Card className="bg-primary text-white shadow-xl rounded-2xl w-full max-w-md relative overflow-hidden">
          <CardContent className="flex flex-col items-center p-6 space-y-6">
            {showEmojis && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                {Array.from({ length: 20 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute text-2xl animate-float"
                    style={{
                      left: `${Math.random() * 90}%`,
                      top: `${Math.random() * 80}%`,
                      animationDuration: `${Math.random() * 2 + 1}s`,
                    }}
                  >
                    🎉
                  </span>
                ))}
              </div>
            )}
            {showCompletion && (
              <div className="absolute inset-0 bg-white/50 flex flex-col items-center justify-center animate-fadeIn z-10">
                <Award className="w-16 h-16 text-yellow-400 animate-bounce" />
                <h2 className="text-3xl font-bold mt-4 text-gray-900">
                  All Cycles Complete!
                </h2>
              </div>
            )}
            <div className="flex flex-col items-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold">{selectedExam}</h2>
              <Badge
                variant="secondary"
                className="text-lg px-4 py-1 flex items-center gap-1"
              >
                <Star className="w-4 h-4" />{" "}
                {onBreak ? "Break Time" : "Focus Mode"}
              </Badge>
            </div>
            <div className="text-6xl md:text-7xl font-extrabold">
              {formatTime(timeLeft)}
            </div>
            <Progress
              value={percentageDone}
              className="h-4 rounded-full bg-white/30 w-full"
            />
            <div className="flex flex-col md:flex-row gap-4 justify-between w-full mt-4">
              <Card className="flex-1 bg-white/20 rounded-lg p-4 text-center shadow-md">
                <h3 className="text-sm uppercase font-medium">Cycle</h3>
                <p className="text-2xl font-bold">
                  {cyclesCompleted + (onBreak ? 0 : 1)} / {totalCycles}
                </p>
              </Card>
              <Card className="flex-1 bg-white/20 rounded-lg p-4 text-center shadow-md">
                <h3 className="text-sm uppercase font-medium">Remaining</h3>
                <p className="text-2xl font-bold">
                  {Math.floor(timeLeft / 60)} min
                </p>
              </Card>
              <Card className="flex-1 bg-white/20 rounded-lg p-4 text-center shadow-md">
                <h3 className="text-sm uppercase font-medium">Ends At</h3>
                <p className="text-2xl font-bold">{endTime}</p>
              </Card>
            </div>
            <div className="flex gap-4 mt-4 w-full justify-center">
              <Badge
                variant="secondary"
                className="flex items-center gap-2 px-4 py-2"
              >
                <Zap className="w-4 h-4" /> Streak: {streak}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-2 px-4 py-2"
              >
                <Star className="w-4 h-4" /> Points: {points}
              </Badge>
            </div>
            <div className="flex gap-4 mt-4">
              <Button
                variant="default"
                className="flex items-center gap-2"
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                {isRunning ? "Pause" : "Start"}
              </Button>
              <Button
                variant="secondary"
                className="flex items-center gap-2"
                onClick={resetSession}
              >
                <RefreshCw className="w-5 h-5" /> Reset
              </Button>
            </div>
            <Badge
              variant="secondary"
              className="mt-2 text-lg flex items-center gap-1"
            >
              {isRunning ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Pause className="w-4 h-4" />
              )}{" "}
              {isRunning ? "Running" : "Paused"}
            </Badge>
          </CardContent>
        </Card>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start Revision Session</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Choose subject to revise:
            </p>
            <Select
              value={selectedExam || nearestExam?.subject}
              onValueChange={(value) => setSelectedExam(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {examsDb.map((exam) => (
                  <SelectItem key={exam.subject} value={exam.subject}>
                    {exam.subject} — {new Date(exam.date).toLocaleDateString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              onClick={startSession}
              className="w-full flex items-center gap-2 justify-center"
            >
              <Play className="w-4 h-4" /> Start Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
