import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Settings,
  LogOut,
  CreditCard,
  UserPen,
  Key,
  Users,
  UserPlus,
  Github,
  MessageCircle,
  Mail,
  Ellipsis,
  Router,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/UI";

export interface UserDropdownMenuProps {
  align?: "center" | "start" | "end" | undefined;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function UserDropdownMenu({
  align,
  onLogout,
  children,
}: UserDropdownMenuProps) {
  const supabase = createClient();

  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) return;

      const userId = user.id;

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("user_id", userId)
        .single();

      if (profile) setUsername(profile.username);
    };

    fetchUser();
  }, [supabase]);

  return (
    <DropdownMenu onOpenChange={() => setFlyoutOpen(!flyoutOpen)}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Link
              href={`/profile/${username}`}
              className="w-full flex items-center"
            >
              <UserPen className="w-4 h-4 mr-2" />
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/pricing/billing" className="w-full flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/shortcuts" className="w-full flex items-center">
              <Key className="w-4 h-4 mr-2" />
              Keyboard Shortcuts
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/settings" className="w-full flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/team" className="w-full flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Team
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer">
              <Link
                href="/create/team/new"
                className="w-full flex items-center"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Users
              </Link>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  <Link
                    href="/invite/email"
                    className="w-full flex items-center"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link
                    href="/invite/message"
                    className="w-full flex items-center"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  <Link
                    href="/invite/more"
                    className="w-full flex items-center"
                  >
                    <Ellipsis className="w-4 h-4 mr-2" />
                    More
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/create/team/new" className="w-full flex items-center">
              <Users className="w-4 h-4 mr-2" />
              New Team
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Link
              href="https://github.com/suatalikoch/studies"
              target="_blank"
              className="w-full flex items-center"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/support" className="w-full flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Support
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" disabled>
            <Link href="/api" className="w-full flex items-center">
              <Router className="w-4 h-4 mr-2" />
              API
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <button
              onClick={onLogout}
              className="w-full flex items-center cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
