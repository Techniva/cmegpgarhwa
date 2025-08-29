"use client";

import { useEffect, useState } from "react";
import useAdminAuth from "@/hooks/useAdminAuth";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "employee";
}

interface UserForm {
  name: string;
  email: string;
  password: string;
  role: "admin" | "employee";
}

export default function ManageUsersPage() {
  const { session, status } = useAdminAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch users
  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then((data: User[]) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  const openAddModal = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", password: "", role: "employee" });
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, password: "", role: user.role });
    setIsModalOpen(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      // Update user locally (replace with API PATCH call in production)
      setUsers(prev =>
        prev.map(u => (u.id === editingUser.id ? { ...u, ...form } : u))
      );
    } else {
      // Add new user locally (replace with API POST call in production)
      const newUser: User = {
        id: users.length + 1,
        name: form.name,
        email: form.email,
        role: form.role,
      };
      setUsers(prev => [...prev, newUser]);
    }

    setIsModalOpen(false);
    setForm({ name: "", email: "", password: "", role: "employee" });
    setEditingUser(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          Add User
        </button>
      </div>
      <p className="text-gray-700 mb-6">
        Only admins can access this page. Here you can add, edit, or remove users.
      </p>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Role</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">{user.id}</td>
                  <td className="border border-gray-300 px-3 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-3 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-3 py-2 capitalize">{user.role}</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="px-4 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-lg p-6 w-[500px] max-w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {editingUser ? "Edit User" : "Add New User"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password with Toggle */}
              <div className="relative flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 transition"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">Role</label>
                <select
                  value={form.role}
                  onChange={e =>
                    setForm(prev => ({ ...prev, role: e.target.value as "admin" | "employee" }))
                  }
                  className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUser}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  {editingUser ? "Save Changes" : "Add User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
