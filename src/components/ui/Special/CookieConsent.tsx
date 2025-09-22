"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Switch,
  Label,
  Button,
  Card,
  CardContent,
  Separator,
} from "@/components/UI";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const handleConsent = (choice: "accepted" | "declined") => {
    localStorage.setItem("cookie-consent", choice);
    setVisible(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem(
      "cookie-preferences",
      JSON.stringify({ analytics, marketing })
    );
    localStorage.setItem("cookie-consent", "custom");
    setSettingsOpen(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 right-8 w-full max-w-sm z-50">
      <Card className="py-4">
        <CardContent className="px-5">
          <div className="flex flex-col gap-3">
            <p className="text-sm flex-1">
              We use cookies to collect data and improve our services.{" "}
              <Link
                href="/privacy#information-collect-use"
                className="text-primary underline"
              >
                Learn more
              </Link>
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleConsent("accepted")}
                className="text-xs"
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleConsent("declined")}
                className="text-xs"
              >
                Opt out
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSettingsOpen(true)}
                className="text-xs"
              >
                Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="p-0 gap-0">
          <DialogHeader className="p-4">
            <DialogTitle>Privacy Settings</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="flex items-center justify-between gap-6 p-4">
            <Switch
              id="analytics"
              checked={analytics}
              onCheckedChange={setAnalytics}
              className="cursor-pointer"
              disabled
            />
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="analytics"
                className="text-muted-foreground font-bold"
              >
                Essential
              </Label>
              <p className="text-sm text-muted-foreground">
                These technologies are necessary for Student Hub to function.{" "}
                <Link href="/" className="text-primary underline">
                  Learn more
                </Link>
              </p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-6 p-4">
            <Switch
              id="marketing"
              checked={marketing}
              onCheckedChange={setMarketing}
              className="cursor-pointer"
            />
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="marketing"
                className="text-muted-foreground font-bold"
              >
                Analytics and Marketing
              </Label>
              <p className="text-sm text-muted-foreground">
                By opting in to sharing telemetry data, Student Hub can analyze
                usage patterns to enhance user experience and use it for
                marketing and advertising purposes.{" "}
                <Link href="/" className="text-primary underline">
                  Learn more
                </Link>
              </p>
            </div>
          </div>
          <Separator />
          <DialogFooter className="p-4">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setSettingsOpen(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveSettings}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
