import SignUpForm from "@/components/SignUpPage";
import NavBar from "@/components/NavBar";

export default function Page() {
  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center h-screen">
        <div className="w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
          <div className="text-center pb-4">
            <h2 className="text-2xl font-semibold">
              Create An Account With Shortliy
            </h2>
            <p>Welcome to Shortliy!</p>
          </div>

          <SignUpForm />
        </div>
      </div>
    </>
  );
}

export function generateMetadata() {
  return {
    title: "Create An Account with Shortliy",
  };
}
