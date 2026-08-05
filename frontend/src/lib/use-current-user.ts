"use client";

import { useCallback, useEffect, useState } from "react";

import { getCurrentUser, type CurrentUser } from "@/services/auth.services";
import { getErrorMessage } from "@/lib/error";

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getCurrentUser();
      setUser(response.data);
      setError(null);
    } catch (e) {
      setError(getErrorMessage(e, "Failed to load profile"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    getCurrentUser()
      .then((response) => {
        if (!cancelled) {
          setUser(response.data);
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(getErrorMessage(e, "Failed to load profile"));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { user, loading, error, refetch };
}
