"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RiBellLine, RiSearchLine, RiUserLine, RiLogoutBoxLine, RiSettings3Line } from "react-icons/ri";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/users": "User Management",
  "/subscriptions": "Subscription Plans",
  "/subscriptions/create": "Create Subscription Plan",
  "/cms": "Content Management",
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications] = useState(3);

  const title = pageTitles[pathname] ?? "Admin Panel";

  return (
    <header className="h-16 bg-surface border-b border-border-color flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Page Title */}
      <div>
        <h2 className="text-white font-semibold text-lg leading-tight">{title}</h2>
        <p className="text-text-muted text-xs">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:flex items-center">
          <RiSearchLine className="absolute left-3 text-text-muted text-base" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-dark-navy border border-border-color rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-text-muted/50 focus:outline-none focus:border-deep-blue focus:ring-1 focus:ring-deep-blue w-52 transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-dark-navy border border-border-color flex items-center justify-center text-text-muted hover:text-white hover:border-deep-blue transition-all">
          <RiBellLine className="text-lg" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-deep-blue text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 bg-dark-navy border border-border-color rounded-xl px-3 py-2 hover:border-deep-blue transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-deep-blue to-teal flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-white text-xs font-semibold leading-tight">Admin</p>
              <p className="text-text-muted text-[10px]">Super Admin</p>
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border-color rounded-xl shadow-card overflow-hidden z-50 animate-fade-in">
              <div className="px-4 py-3 border-b border-border-color">
                <p className="text-white text-sm font-semibold">Admin User</p>
                <p className="text-text-muted text-xs">admin@benefiqs.com</p>
              </div>
              <div className="p-1">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-all">
                  <RiUserLine className="text-base" /> Profile
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-all">
                  <RiSettings3Line className="text-base" /> Settings
                </button>
                <div className="border-t border-border-color my-1" />
                <button
                  onClick={() => router.push("/")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-danger hover:bg-danger/10 rounded-lg transition-all"
                >
                  <RiLogoutBoxLine className="text-base" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
