import ViewCMSComponent from "@/components/CMS/View";

export default async function ViewCMSPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ViewCMSComponent id={id} />;
}
