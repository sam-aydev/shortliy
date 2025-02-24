import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4 mx-auto text-center">
        <p>Landing Page Coming Soon </p>
        <Link href="/signup">
          <button className="p-2 hover:bg-slate-900 bg-black text-white rounded">
            Continue To Register
          </button>
        </Link>
      </div>
    </div>
  );
}
