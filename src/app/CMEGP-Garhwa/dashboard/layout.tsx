"use client";

import { ReactNode, useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  GraduationCap,
  FileText,
  UserCircle,
  Mail,
  Users,
  Settings,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (status === "unauthenticated") router.replace("/CMEGP-Garhwa/login");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-2xl font-bold text-[#063970]">Loading...</span>
      </div>
    );
  }

  if (!session) return null;

  const userName = session.user?.name || session.user?.email || "user";
  const userRole = session.user?.role || "employee";

  const handleLogout = () => {
    signOut({ callbackUrl: "/CMEGP-Garhwa/login" });
  };

   // Sidebar navigation (role-based)
const employeeNav = [
  { name: "Dashboard", href: "/CMEGP-Garhwa/dashboard", icon: GraduationCap },
  { name: "Data Entry", href: "/CMEGP-Garhwa/dashboard/dataentry", icon: FileText },
  { name: "Application Status", href: "/CMEGP-Garhwa/dashboard/status", icon: FileText },
  { name: "Profile", href: "/CMEGP-Garhwa/dashboard/profile", icon: UserCircle },
  { name: "Contact Us", href: "/CMEGP-Garhwa/dashboard/contact", icon: Mail },
];

const adminNav = [
  { name: "Admin Dashboard", href: "/CMEGP-Garhwa/dashboard", icon: GraduationCap },
  { name: "Report", href: "/CMEGP-Garhwa/dashboard/admin/report", icon: FileText },   // ✅ Only Admin
  { name: "Sanction", href: "/CMEGP-Garhwa/dashboard/admin/sanction", icon: Settings }, // ✅ Only Admin
  { name: "Data Entry", href: "/CMEGP-Garhwa/dashboard/dataentry", icon: FileText },
  { name: "Profile", href: "/CMEGP-Garhwa/dashboard/profile", icon: UserCircle },
  { name: "Manage Users", href: "/CMEGP-Garhwa/dashboard/admin/users", icon: Users },
  { name: "Settings", href: "/CMEGP-Garhwa/dashboard/admin/settings", icon: Settings },
];
  

  const navigation = userRole === "admin" ? adminNav : employeeNav;

  const getMenuItemClass = (href: string) =>
    pathname === href
      ? "flex items-center px-3 py-2 rounded bg-blue-100 text-blue-600 transition"
      : "flex items-center px-3 py-2 rounded hover:bg-gray-100 text-gray-700 transition";

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      {/* Sidebar */}
      <aside
        className={`hidden lg:flex lg:flex-col bg-white border-r border-r-gray-200 shadow-lg transition-all duration-300
          ${sidebarCollapsed ? "lg:w-16" : "lg:w-64"} w-64`}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-b-gray-200">
          {!sidebarCollapsed && (
            <span className="font-bold text-gray-800">
              {userRole === "admin" ? "Admin Panel" : "Employee Portal"}
            </span>
          )}
          <button
            className="hidden lg:block"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <Menu className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className={getMenuItemClass(item.href)}>
              <item.icon
                className={`${sidebarCollapsed ? "mx-auto" : "mr-3"} h-5 w-5`}
              />
              {!sidebarCollapsed && item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-b-gray-200 px-4 py-3 flex items-center justify-between flex-wrap gap-2 shadow-b">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              className="lg:hidden text-gray-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-2">
              <img
                src="/Jharkhand_Rajakiya_Chihna.svg"
                alt="Jharkhand Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div className="text-gray-900">
                <h1 className="text-xs lg:text-sm font-semibold">CMEGP Garhwa</h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-600 flex-wrap justify-end">
            <span className="hidden sm:inline">
              Hi, {userName} ({userRole})
            </span>
            <button
              className="px-3 py-1 sm:px-4 sm:py-2 text-white rounded-full bg-blue-600 hover:bg-blue-700 transition text-sm sm:text-base"
              onClick={() => setLogoutModalOpen(true)}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-md border-b border-b-gray-200 overflow-y-auto max-h-96 animate-slideDown">
            <nav className="flex flex-col">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={
                    pathname === item.href
                      ? "flex items-center px-4 py-3 border-b border-b-gray-200 bg-blue-100 text-blue-600 transition"
                      : "flex items-center px-4 py-3 border-b border-b-gray-200 hover:bg-gray-100 text-gray-700 transition"
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}

        {/* Main area */}
        <main className="flex-1 my-6 overflow-y-auto px-4 lg:px-6 transition-all duration-300">
          <div className="w-full mx-auto">{children}</div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-t-gray-200 px-4 py-3 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CMEGP Garhwa. All rights reserved.
        </footer>
      </div>

      {/* Logout Modal */}
      {logoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setLogoutModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-lg max-w-sm w-full p-6 z-50">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Logout</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to logout? You will be redirected to the login page.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-200 transition"
                onClick={() => setLogoutModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
