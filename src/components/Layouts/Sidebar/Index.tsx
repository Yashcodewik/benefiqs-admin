"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiDashboardLine,
  RiUserLine,
  RiFileTextLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiBankCardLine,
  RiAddCircleLine,
} from "react-icons/ri";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: RiDashboardLine,
  },
  {
    label: "Users",
    href: "/users",
    icon: RiUserLine,
  },
  {
    label: "Subscriptions",
    href: "/subscriptions",
    icon: RiBankCardLine,
    children: [
      { label: "All Plans", href: "/subscriptions", icon: RiBankCardLine },
      { label: "Create Plan", href: "/subscriptions/create", icon: RiAddCircleLine },
    ],
  },
  {
    label: "CMS",
    href: "/cms",
    icon: RiFileTextLine,
    children: [
      { label: "View All", href: "/cms", icon: RiFileTextLine },
      { label: "Add Content", href: "/cms/create", icon: RiAddCircleLine },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>("Subscriptions");

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside
      className={`flex flex-col h-screen bg-surface border-r border-border-color transition-all duration-300 ${
        collapsed ? "w-[70px]" : "w-[250px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border-color">
        <div
          className={`rounded-xl border border-border-color bg-dark-navy flex items-center justify-center flex-shrink-0 shadow-glow-blue transition-all duration-300 ${
            collapsed ? "w-9 h-9 p-1" : "h-10 w-36 px-3 py-2"
          }`}
        >
       <Image
  src="/logo.png"
  alt="Benefiqs"
  width={2000}
  height={500}
  priority
  className="h-[120px] w-[400px] object-contain"
/>
        </div>
      
      </div>

      {/* Nav */}
      <nav className="flex-1 py-5 overflow-y-auto space-y-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = openSub === item.label;

          return (
            <div key={item.label}>
              {hasChildren ? (
                <>
                  <button
                    onClick={() => setOpenSub(isOpen ? null : item.label)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? "bg-deep-blue text-white shadow-glow-blue"
                        : "text-text-muted hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="text-lg flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        <span
                          className={`text-xs transition-transform duration-200 ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        >
                          ▶
                        </span>
                      </>
                    )}
                  </button>
                  {!collapsed && isOpen && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-border-color pl-3">
                      {item.children!.map((child) => {
                        const ChildIcon = child.icon;
                        const childActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                              childActive
                                ? "bg-deep-blue/20 text-teal"
                                : "text-text-muted hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <ChildIcon className="text-base flex-shrink-0" />
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-deep-blue text-white shadow-glow-blue"
                      : "text-text-muted hover:bg-white/5 hover:text-white"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="text-lg flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-border-color p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-text-muted hover:bg-white/5 hover:text-white transition-all text-sm"
        >
          {collapsed ? (
            <RiMenuUnfoldLine className="text-lg" />
          ) : (
            <>
              <RiMenuFoldLine className="text-lg" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
