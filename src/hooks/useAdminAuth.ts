// src/hooks/useAdminAuth.ts
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function useAdminAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // wait until session is resolved

    if (!session) {
      router.replace("/CMEGP-Garhwa/login");
    } else if (session.user?.role !== "admin") {
      router.replace("/CMEGP-Garhwa/dashboard"); // redirect non-admin users
    }
  }, [session, status, router]);

  return { session, status };
}
