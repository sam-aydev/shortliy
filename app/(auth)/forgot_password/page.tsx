import NavBar from "@/components/NavBar";
import ForgotPassword from "@/components/ForgotPassword";

export default function Page() {
  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center h-screen">
        <div className="w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
          <div className="text-center pb-4">
            <h2 className="text-2xl font-semibold">Reset Your Password</h2>
          </div>

          <ForgotPassword />
        </div>
      </div>
    </>
  );
}
