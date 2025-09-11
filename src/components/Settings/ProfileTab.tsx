import { ProfileTabProps } from "@/types";
import { Input, Label, Skeleton } from "@/components/UI";
import { Mail, User } from "lucide-react";
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
    <div className="bg-neutral-100 dark:bg-gray-950 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
        <User className="w-6 h-6 text-indigo-600" />
        Profile Information
      </h2>
      <div className="flex items-center gap-6 mb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
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
          className={`text-sm bg-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer hover:opacity-90 transition ${
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
          <Label
            htmlFor="fullName"
            className="text-gray-700 dark:text-gray-400 mb-2"
          >
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
          <Label
            htmlFor="emailAddress"
            className="text-gray-700 dark:text-gray-400 mb-2"
          >
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2 w-5 h-5 text-gray-400" />
            <Input
              id="emailAddress"
              type="text"
              className="pl-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
