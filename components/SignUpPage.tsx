"use client";

import { signup } from "@/utils/actions/server";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import NavBar from "./NavBar";

export default function SignUpForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!email || !password || !username) {
      toast.error("Please fill in all the details!");
      return;
    }
    console.log(email, password, username);
    try {
      setIsLoading(true);
      const { data, error } = await signup({
        email,
        username,
        password,
      });
      if (error) {
        toast.error(error);
        console.log(error);
      }
      if (data) {
        toast.success("You have successfully registered!");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2 w-full">
        <div className="">
          <label className="block">Username:</label>
          <input
            type="text"
            disabled={isLoading}
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
            placeholder="Your username..."
            className="p-2 border-black border-2 rounded w-full"
          />
        </div>
        <div className="">
          <label className="block">Email:</label>
          <input
            disabled={isLoading}
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            type="email"
            placeholder="Your email..."
            className="p-2 border-black border-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Password:</label>
          <input
            value={password}
            disabled={isLoading}
            onChange={(e: any) => setPassword(e.target.value)}
            type="password"
            placeholder="Your password..."
            className="p-2 border-black border-2 rounded w-full"
          />
        </div>
        <button className="bg-black p-2 text-white rounded flex justify-center space-x-2 items-center hover:bg-slate-900">
          <ClipLoader color="#fffff" loading={isLoading} size={15} />
          <span className="px-[2px]">Sign Up With Shortliy! </span>
        </button>
        <p>
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="hover:text-green-600 hover:underline "
          >
            Login!
          </Link>
        </p>
      </form>
    </>
  );
}
