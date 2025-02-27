import Link from "next/link";

export default function NavBar() {
  return (
    <div className="bg-transparent fixed w-full bg-gradient-to-t from-white  to-slate-300 flex justify-between items-center p-4">
      <div>
        <Link href={"/"}>
          <h2 className="font-bold text-2xl">Shortl.iy</h2>
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link href="/signup">
          <button className="hover:bg-black duration-300 hover:text-white bg-white rounded-md p-2">
            Sign Up
          </button>
        </Link>
        <Link href="/login">
          <button className="hover:text-white hover:bg-black duration-300 rounded-md p-2">
            Login
          </button>
        </Link>
        {/* <HiMenu className="size-8 p-1 bg-white rounded" /> */}
      </div>
    </div>
  );
}
