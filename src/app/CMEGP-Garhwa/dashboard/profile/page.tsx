"use client";

import { useSession } from "next-auth/react";
import { User, Phone, Briefcase } from "lucide-react";

export default function EmployeeInfoPage() {
  const { data: session } = useSession();

  const name = session?.user?.name || "Unknown";
  const email = session?.user?.email || "No email provided";

  return (
    <div className="w-full mx-auto space-y-6">
      <h1 className="text-xl font-bold text-gray-800">Employee Information</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-4 border-blue-600 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <User className="h-5 w-5 text-blue-600" /> Personal Details
          </h2>
          <div className="space-y-1 text-gray-700">
            <p><span className="font-medium">Name:</span> {name}</p>
            <p><span className="font-medium">Email:</span> {email}</p>
            <p><span className="font-medium">Employee Id:</span> 1</p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-4 border-green-600 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <Phone className="h-5 w-5 text-green-600" /> Contact Details
          </h2>
          <div className="space-y-1 text-gray-700">
            <p><span className="font-medium">Phone:</span> Not provided</p>
            <p><span className="font-medium">Address:</span> Not provided</p>
            <p><span className="font-medium">City:</span> N/A</p>
            <p><span className="font-medium">State:</span> N/A</p>
          </div>
        </div>
      </div>

    </div>
  );
}
