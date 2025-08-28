// src/app/CMEGP-Garhwa/dashboard/admin/users/page.tsx
"use client";

import useAdminAuth from "@/hooks/useAdminAuth";

export default function ManageUsersPage() {
  const { session, status } = useAdminAuth();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <p className="text-gray-700">
        Only admins can access this page. Here you can add, edit, or remove users.
      </p>
    </div>
  );
}
