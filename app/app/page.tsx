import { getUser } from "@/utils/actions/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const { data, error }: any = await getUser();

  if (!data || error) redirect("/login");
  return <div>Hello whatsxo</div>;
}

export function generateMetadata() {
  return {
    title: "Shortliy",
  };
}
