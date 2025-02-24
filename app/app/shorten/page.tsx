import ShortenLink from "@/app/components/ShortenLink";
import { getUser } from "@/utils/actions";
import { redirect } from "next/navigation";

export default async function Page() {
  const { data, error }: any = await getUser();

  if (!data || error) redirect("/login");

  return <ShortenLink />;
}

export function generateMetadata() {
  return {
    title: "Shorten your links!",
  };
}
