"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/auth";
import { LoadingSpinner } from "@/components/LoadingSpinner";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }

    setAllowed(true);
  }, [router]);

  if (!allowed) {
    return <LoadingSpinner label="Checking session..." />;
  }

  return children;
}
