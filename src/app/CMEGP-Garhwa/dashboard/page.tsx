"use client";

import { useSession, signOut } from "next-auth/react";
import { Bell, Link, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardHomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users
  if (status === "loading") {
    return <p className="p-6">Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.replace("/CMEGP-Garhwa/login");
    return null;
  }

  const userName = session?.user?.name || session?.user?.email || "User";

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-600 hover:shadow-xl transition flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Welcome, {userName}!</h1>
          <p className="mt-2 text-gray-700">
            This is your employee dashboard. Use the sidebar to navigate to different sections like Employee Info, Data Entry, Contact, and more.
          </p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/CMEGP-Garhwa/login" })}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Updates */}
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-green-600 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <Bell className="h-5 w-5 text-green-600" /> Recent Updates
          </h2>
          <p className="mt-2 text-gray-700">No new announcements at the moment.</p>
        </div>

        {/* Quick Links */}
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-purple-600 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <Link className="h-5 w-5 text-purple-600" /> Quick Links
          </h2>
          <ul className="mt-2 list-disc list-inside text-blue-600 space-y-1">
            <li>
              <a href="/CMEGP-Garhwa/dashboard/profile" className="hover:underline">
                View Employee Info
              </a>
            </li>
            <li>
              <a href="/CMEGP-Garhwa/dashboard/dataentry" className="hover:underline">
                Enter CMEGP Data
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
