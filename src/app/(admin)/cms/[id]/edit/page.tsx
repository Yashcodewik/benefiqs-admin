import EditCMSComponent from "@/components/CMS/Edit";

export default async function EditCMSPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditCMSComponent id={id} />;
}
