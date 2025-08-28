// src/app/CMEGP-Garhwa/dashboard/admin/report/page.tsx
"use client";

import useAdminAuth from "@/hooks/useAdminAuth";
import { FileText, BarChart, Users, Settings } from "lucide-react";

export default function ReportPage() {
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
    <div className="w-full mx-auto px-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Admin Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Application Reports */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-4 border-blue-600 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <FileText className="h-5 w-5 text-blue-600" /> Application Reports
          </h2>
          <div className="space-y-1 text-gray-700">
            <p><span className="font-medium">Total Applications:</span> 0</p>
            <p><span className="font-medium">Approved:</span> 0</p>
            <p><span className="font-medium">Pending:</span> 0</p>
            <p><span className="font-medium">Rejected:</span> 0</p>
          </div>
        </div>

        {/* Performance Reports */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-4 border-green-600 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <BarChart className="h-5 w-5 text-green-600" /> Performance Reports
          </h2>
          <div className="space-y-1 text-gray-700">
            <p><span className="font-medium">Monthly Reports:</span> N/A</p>
            <p><span className="font-medium">Quarterly Reports:</span> N/A</p>
            <p><span className="font-medium">Yearly Reports:</span> N/A</p>
          </div>
        </div>
      </div>

      {/* User/Activity Reports */}
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-4 border-purple-600 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <Users className="h-5 w-5 text-purple-600" /> User & Activity Reports
        </h2>
        <div className="space-y-1 text-gray-700">
          <p><span className="font-medium">Active Users:</span> N/A</p>
          <p><span className="font-medium">Inactive Users:</span> N/A</p>
          <p><span className="font-medium">Recent Activities:</span> N/A</p>
        </div>
      </div>

      {/* System Reports */}
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-4 border-red-600 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <Settings className="h-5 w-5 text-red-600" /> System Reports
        </h2>
        <div className="space-y-1 text-gray-700">
          <p><span className="font-medium">Errors Logged:</span> N/A</p>
          <p><span className="font-medium">System Health:</span> N/A</p>
          <p><span className="font-medium">Last Backup:</span> N/A</p>
        </div>
      </div>
    </div>
  );
}
