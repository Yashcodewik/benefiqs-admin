"use client";
import Sidebar from "@/components/Layouts/Sidebar/Index";
import Header from "@/components/Layouts/Header/Index";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-dark-navy overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 page-enter">
          {children}
        </main>
      </div>
    </div>
  );
}
