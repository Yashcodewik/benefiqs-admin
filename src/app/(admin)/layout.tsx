import AdminLayout from "@/components/Layouts/AdminLayout/Index";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
