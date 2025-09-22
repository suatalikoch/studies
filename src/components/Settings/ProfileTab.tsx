import { ProfileTabProps } from "@/types";
import { Input, Label, Skeleton } from "@/components/UI";
import { User } from "lucide-react";
import Image from "next/image";

export default function ProfileTab({
  isFetching,
  avatar,
  name,
  email,
  loading,
  setName,
  setEmail,
  handleAvatarChange,
}: ProfileTabProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
        <User className="w-6 h-6 text-primary" />
        Profile Information
      </h2>
      <div className="flex items-center gap-6 mb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-neutral-200 flex items-center justify-center">
          {isFetching ? (
            <div>
              <Skeleton />
            </div>
          ) : (
            <Image
              src={avatar || "/images/avatar.png"}
              alt="Avatar"
              width={80}
              height={80}
              className="object-cover"
            />
          )}
        </div>
        <label
          className={`text-sm bg-primary text-white px-4 py-2 rounded-md cursor-pointer hover:opacity-90 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Change Avatar
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
            disabled={loading}
          />
        </label>
      </div>
      <div className="space-y-5 max-w-lg">
        <div>
          <Label htmlFor="fullName" className="text-muted-foreground mb-2">
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div>
          <Label htmlFor="emailAddress" className="text-muted-foreground mb-2">
            Email Address
          </Label>
          <Input
            id="emailAddress"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>
      </div>
    </div>
  );
}
