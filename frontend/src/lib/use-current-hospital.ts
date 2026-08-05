"use client";

import { useCallback, useEffect, useState } from "react";

import { getCurrentHospital, type CurrentHospital } from "@/services/auth.services";
import { getErrorMessage } from "@/lib/error";

export function useCurrentHospital() {
  const [hospital, setHospital] = useState<CurrentHospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getCurrentHospital();
      setHospital(response.data);
      setError(null);
    } catch (e) {
      setError(getErrorMessage(e, "Failed to load hospital profile"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    getCurrentHospital()
      .then((response) => {
        if (!cancelled) {
          setHospital(response.data);
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(getErrorMessage(e, "Failed to load hospital profile"));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { hospital, loading, error, refetch };
}
