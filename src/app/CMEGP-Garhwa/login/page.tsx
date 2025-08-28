"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/CMEGP-Garhwa/dashboard");
    }
  }, [status, router]);

  const [form, setForm] = useState({ email: "", password: "", role: "employee" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // role should match database enum: 'admin' or 'employee'
    const normalizedRole = form.role.toLowerCase();

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      role: normalizedRole,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email, password, or role");
    } else {
      if (normalizedRole === "admin") {
        router.replace("/CMEGP-Garhwa/dashboard");
      } else {
        router.replace("/CMEGP-Garhwa/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-lime-50 p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side - Image & Info */}
        <div className="md:w-1/2 bg-gradient-to-b from-green-600 to-lime-500 text-white flex flex-col justify-center items-center p-8">
          <Image
            src="/Jharkhand_Rajakiya_Chihna.svg"
            alt="Govt Logo"
            width={100}
            height={100}
            className="mb-6"
          />
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">CMEGP-Garhwa</h1>
          <p className="text-center text-sm md:text-base">
            Welcome! Please login to access your account. Employees and Admins can login here.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
            {form.role === "admin" ? "Admin Login" : "Employee Login"}
          </h2>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium mb-1">Login as</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value.toLowerCase() })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password with Toggle */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition disabled:bg-gray-400"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-4">
            <Link href="/CMEGP-Garhwa/forgot-password" className="text-green-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <div className="text-center text-sm text-gray-500 mt-2">
            <Link href="/" className="text-green-600 hover:underline">
              Go to Main Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
