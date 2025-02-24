import { PropsWithChildren } from "react";
import AppLayout from "../components/AppLayout";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <AppLayout />
      <div className="md:w-[70%] lg:w-[80%]">{children}</div>
    </div>
  );
}
