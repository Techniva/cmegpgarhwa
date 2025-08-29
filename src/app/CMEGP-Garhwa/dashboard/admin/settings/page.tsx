// src/app/CMEGP-Garhwa/dashboard/admin/settings/page.tsx
"use client";

import useAdminAuth from "@/hooks/useAdminAuth";
import { Settings, Shield, Database, Bell } from "lucide-react";

export default function AdminSettingsPage() {
  const { session, status } = useAdminAuth();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (!session || session.user?.role !== "admin") return null;

  return (
    <div className="w-full mx-auto space-y-6">
      <h1 className="text-xl font-bold text-gray-800">Admin Settings</h1>
      <p className="text-gray-600">
        Configure system-wide settings and preferences for administrators only.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-4 border-blue-600 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <Settings className="h-5 w-5 text-blue-600" /> General Settings
          </h2>
          <div className="space-y-1 text-gray-700">
            <p><span className="font-medium">Site Name:</span> CMEGP-Garhwa</p>
            <p><span className="font-medium">Theme:</span> Default</p>
            <p><span className="font-medium">Timezone:</span> IST</p>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-4 border-green-600 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <Shield className="h-5 w-5 text-green-600" /> Security Settings
          </h2>
          <div className="space-y-1 text-gray-700">
            <p><span className="font-medium">Two-Factor Auth:</span> Disabled</p>
            <p><span className="font-medium">Password Policy:</span> Strong</p>
            <p><span className="font-medium">Session Timeout:</span> 30 mins</p>
          </div>
        </div>
      </div>

      {/* Database & Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Database Settings */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-4 border-purple-600 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <Database className="h-5 w-5 text-purple-600" /> Database Settings
          </h2>
          <div className="space-y-1 text-gray-700">
            <p><span className="font-medium">Backup:</span> Enabled</p>
            <p><span className="font-medium">Last Backup:</span> N/A</p>
            <p><span className="font-medium">Storage Used:</span> N/A</p>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-4 border-red-600 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <Bell className="h-5 w-5 text-red-600" /> Notification Settings
          </h2>
          <div className="space-y-1 text-gray-700">
            <p><span className="font-medium">Email Alerts:</span> Enabled</p>
            <p><span className="font-medium">SMS Alerts:</span> Disabled</p>
            <p><span className="font-medium">System Alerts:</span> Enabled</p>
          </div>
        </div>
      </div>
    </div>
  );
}
