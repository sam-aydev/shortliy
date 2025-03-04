import SignInForm from "@/app/components/SignInPage";
import { getUser } from "@/utils/actions/server";
import { redirect } from "next/navigation";
import NavBar from "@/app/components/NavBar";

export default async function Page() {
  const { data, error }: any = await getUser();

  if (data) redirect("/app");

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center h-screen">
        <div className="w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
          <div className="text-center pb-4">
            <h2 className="text-2xl font-semibold">Login To Shortliy</h2>
            <p>Welcome to Shortliy</p>
          </div>

          <SignInForm />
        </div>
      </div>
    </>
  );
}

export function generateMetadata() {
  return {
    title: "Login To Shortliy",
  };
}
