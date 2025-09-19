"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    let isMounted = true;

    // Get session immediately on mount
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: listener } = createClient().auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;

        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return { user, loading };
}
