import { getUser } from "@/utils/actions/server";
import { redirect } from "next/navigation";
import Dashboard from "../components/Dashboard";

export default async function Page() {
  const data = await getUser();
 
  if (!data) redirect("/login");
     
  return <Dashboard user={data}/> ;
}

export function generateMetadata() {
  return {
    title: "Shortliy",
  };
}
