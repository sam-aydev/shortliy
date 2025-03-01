import ManageLink from "@/app/components/ManageLink";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id as string;

  return <ManageLink id={id} />;
}
