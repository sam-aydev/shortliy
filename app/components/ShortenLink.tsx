"use client";
export default function ShortenLink() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full">
        <form className="flex flex-col space-y-2 w-3/4 mx-auto">
          <input
            type="text"
            placeholder="Your Original link..."
            className="p-2 border-2 border-black rounded-md"
          />
          <button className="hover:bg-slate-800 bg-black rounded-md text-white py-2">
            Shorten Link
          </button>
        </form>
      </div>
    </div>
  );
}
