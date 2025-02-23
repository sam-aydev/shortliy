import { PropsWithChildren } from "react";
import AppLayout from "../components/AppLayout";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <AppLayout />
      <div>{children}</div>
    </div>
  );
}
