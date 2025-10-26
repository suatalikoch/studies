import Image from "next/image";
import { Profile } from "@/types";
import { Header } from "@/components/Layout";
import { randomInt } from "crypto";
import Link from "next/link";
import { Badge, Button, Card, CardContent } from "@/components/UI";

export interface ProfileClientProps {
  profile: Profile;
}

export default function ProfileClient({ profile }: ProfileClientProps) {
  return (
    <div className="max-w-[120rem] h-screen mx-auto">
      <Header />
      <main className="flex flex-col gap-6 py-6 px-4 sm:px-6">
        <Card className="p-0">
          <CardContent className="flex flex-col items-center md:items-start p-6 gap-4 overflow-hidden">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-primary">
                  <Image
                    src={
                      profile.avatar_url ||
                      "https://avatar.iran.liara.run/public/boy"
                    }
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold">{profile.display_name}</h1>
                  <p className="text-sm text-primary">@{profile.username}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Link href="#">
                  <Badge
                    variant="secondary"
                    className="w-20 flex flex-col items-start gap-0"
                  >
                    <p className="text-sm text-muted-foreground">Posts</p>
                    <p className="text-sm font-bold">
                      {new Intl.NumberFormat("en", {
                        notation: "compact",
                        compactDisplay: "short",
                        maximumFractionDigits: 1,
                      }).format(randomInt(0, 99))}
                    </p>
                  </Badge>
                </Link>
                <Link href="#">
                  <Badge
                    variant="secondary"
                    className="w-20 flex flex-col items-start gap-0"
                  >
                    <p className="text-sm text-muted-foreground">Followers</p>
                    <p className="text-sm font-bold">
                      {new Intl.NumberFormat("en", {
                        notation: "compact",
                        compactDisplay: "short",
                        maximumFractionDigits: 1,
                      }).format(randomInt(0, 1000000000))}
                    </p>
                  </Badge>
                </Link>
                <Link href="#">
                  <Badge
                    variant="secondary"
                    className="w-20 flex flex-col items-start gap-0"
                  >
                    <p className="text-sm text-muted-foreground">Following</p>
                    <p className="text-sm font-bold">
                      {new Intl.NumberFormat("en", {
                        notation: "compact",
                        compactDisplay: "short",
                        maximumFractionDigits: 1,
                      }).format(randomInt(0, 7501))}
                    </p>
                  </Badge>
                </Link>
              </div>
            </div>
            <div className="max-w-2xl flex-1 text-left">
              <p className="text-md">{profile.bio || "No biography"}</p>
              {profile.website && (
                <p className="mt-4">
                  <Link
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/50 transition-colors duration-300"
                  >
                    {profile.website}
                  </Link>
                </p>
              )}
              {profile.social && (
                <ul className="pl-4 list-disc mt-4">
                  {profile.social.map((social) => {
                    return (
                      <li key={social} className="text-muted-foreground">
                        {social}
                      </li>
                    );
                  })}
                </ul>
              )}
              <div className="mt-6 flex justify-center md:justify-start gap-3">
                <Button>Message</Button>
                <Button variant="outline">Follow</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
