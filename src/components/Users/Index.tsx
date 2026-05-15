"use client";
import { useState } from "react";
import {
  RiSearchLine,
  RiFilterLine,
  RiUserLine,
  RiMoreLine,
  RiEditLine,
  RiDeleteBinLine,
  RiEyeLine,
} from "react-icons/ri";

const users = [
  { id: 1, name: "Aarav Shah", email: "aarav@email.com", phone: "+91 98765 43210", plan: "Pro", status: "Active", joined: "May 13, 2024", location: "Mumbai" },
  { id: 2, name: "Priya Mehta", email: "priya@email.com", phone: "+91 87654 32109", plan: "Free", status: "Active", joined: "May 12, 2024", location: "Delhi" },
  { id: 3, name: "Ravi Kumar", email: "ravi@email.com", phone: "+91 76543 21098", plan: "Pro", status: "Inactive", joined: "May 10, 2024", location: "Bangalore" },
  { id: 4, name: "Neha Joshi", email: "neha@email.com", phone: "+91 65432 10987", plan: "Free", status: "Active", joined: "May 9, 2024", location: "Pune" },
  { id: 5, name: "Sanjay Patel", email: "sanjay@email.com", phone: "+91 54321 09876", plan: "Pro", status: "Active", joined: "May 8, 2024", location: "Ahmedabad" },
  { id: 6, name: "Deepika Rao", email: "deepika@email.com", phone: "+91 43210 98765", plan: "Pro", status: "Active", joined: "May 7, 2024", location: "Chennai" },
  { id: 7, name: "Manish Gupta", email: "manish@email.com", phone: "+91 32109 87654", plan: "Free", status: "Inactive", joined: "May 6, 2024", location: "Kolkata" },
  { id: 8, name: "Kavya Nair", email: "kavya@email.com", phone: "+91 21098 76543", plan: "Pro", status: "Active", joined: "May 5, 2024", location: "Hyderabad" },
];

export default function UsersComponent() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPlan, setFilterPlan] = useState("All");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || u.status === filterStatus;
    const matchPlan = filterPlan === "All" || u.plan === filterPlan;
    return matchSearch && matchStatus && matchPlan;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-xl">User Management</h2>
          <p className="text-text-muted text-sm mt-0.5">{users.length} total registered users</p>
        </div>
        <button className="flex items-center gap-2 bg-deep-blue hover:bg-deep-blue/90 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-glow-blue">
          <RiUserLine className="text-base" /> Add User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-surface border border-border-color rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-dark-navy border border-border-color rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-text-muted/50 focus:outline-none focus:border-deep-blue focus:ring-1 focus:ring-deep-blue transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <RiFilterLine className="text-text-muted text-lg" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-dark-navy border border-border-color rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-deep-blue transition-all"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="bg-dark-navy border border-border-color rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-deep-blue transition-all"
          >
            <option value="All">All Plans</option>
            <option value="Pro">Pro</option>
            <option value="Free">Free</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border-color rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-color">
                <th className="text-left text-text-muted font-medium px-5 py-3.5 text-xs">User</th>
                <th className="text-left text-text-muted font-medium px-5 py-3.5 text-xs">Phone</th>
                <th className="text-left text-text-muted font-medium px-5 py-3.5 text-xs">Location</th>
                <th className="text-left text-text-muted font-medium px-5 py-3.5 text-xs">Plan</th>
                <th className="text-left text-text-muted font-medium px-5 py-3.5 text-xs">Status</th>
                <th className="text-left text-text-muted font-medium px-5 py-3.5 text-xs">Joined</th>
                <th className="text-left text-text-muted font-medium px-5 py-3.5 text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border-color/50 hover:bg-white/2 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-deep-blue to-teal flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{user.name}</p>
                        <p className="text-text-muted text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-text-muted text-xs">{user.phone}</td>
                  <td className="px-5 py-3.5 text-text-muted text-xs">{user.location}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                        user.plan === "Pro"
                          ? "bg-deep-blue/20 text-deep-blue"
                          : "bg-white/5 text-text-muted"
                      }`}
                    >
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`flex items-center gap-1.5 text-xs font-medium w-fit px-2.5 py-1 rounded-lg ${
                        user.status === "Active"
                          ? "bg-teal/10 text-teal"
                          : "bg-danger/10 text-danger"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-teal animate-pulse-slow" : "bg-danger"}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-text-muted text-xs">{user.joined}</td>
                  <td className="px-5 py-3.5">
                    <div className="relative">
                      <button
                        onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-muted hover:text-white transition-all"
                      >
                        <RiMoreLine />
                      </button>
                      {activeMenu === user.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-surface border border-border-color rounded-xl shadow-card z-20 overflow-hidden animate-fade-in">
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-text-muted hover:text-white hover:bg-white/5 transition-all">
                            <RiEyeLine /> View Profile
                          </button>
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-text-muted hover:text-white hover:bg-white/5 transition-all">
                            <RiEditLine /> Edit User
                          </button>
                          <div className="border-t border-border-color my-0.5" />
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-danger hover:bg-danger/10 transition-all">
                            <RiDeleteBinLine /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-text-muted text-sm">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-border-color">
          <p className="text-text-muted text-xs">
            Showing {filtered.length} of {users.length} users
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-white/5 text-text-muted text-xs hover:bg-white/10 transition-all disabled:opacity-40" disabled>
              ← Prev
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-deep-blue text-white text-xs font-semibold">1</button>
            <button className="px-3 py-1.5 rounded-lg bg-white/5 text-text-muted text-xs hover:bg-white/10 transition-all">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
