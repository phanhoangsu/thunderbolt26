"use client";

import type { Badge, Checkpoint, UserProfile } from "@/lib/types";
import { useEffect, useState } from "react";

export function useApiData() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [p, j, b] = await Promise.all([
          fetch("/api/profile").then((r) => r.json()),
          fetch("/api/journey").then((r) => r.json()),
          fetch("/api/badges").then((r) => r.json()),
        ]);
        if (!cancelled) {
          setProfile(p);
          setCheckpoints(j);
          setBadges(b);
        }
      } catch {
        /* fallback handled by context */
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { profile, checkpoints, badges, loading };
}
