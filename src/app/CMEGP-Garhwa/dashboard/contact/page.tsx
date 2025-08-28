"use client";

import { useSession } from "next-auth/react";
import { Mail, Phone, Users } from "lucide-react";

export default function ContactPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || session?.user?.email || "User";

  return (
    <div className="w-full mx-auto px-4 space-y-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-600 hover:shadow-xl transition">
        <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
        <p className="mt-2 text-gray-700">
          Hi {userName}, you can reach out to us using the form below or via the provided contact details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Form */}
        <form className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-4 border-green-600 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <Users className="h-5 w-5 text-green-600" /> Send a Message
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <textarea
            placeholder="Your Message"
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Information */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-4 border-purple-600 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <Mail className="h-5 w-5 text-purple-600" /> Our Technical Team
          </h2>
          <div className="space-y-2 text-gray-700">
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-green-600" /> +91 9xx xxxx xxxx</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-blue-600" /> support@technical.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
