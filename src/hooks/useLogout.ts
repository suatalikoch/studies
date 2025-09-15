"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export function useLogout() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = useCallback(async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Error logging out: " + error.message);
    } else {
      // optional: also clear any global user state/context if you keep one
      router.push("/login");
    }

    setLoading(false);
  }, [supabase, router]);

  return { logout, loading };
}
