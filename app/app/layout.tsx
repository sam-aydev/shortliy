import { PropsWithChildren } from "react";
import AppLayout from "../components/AppLayout";

import DesktopSidebar from "../components/DesktopSidebar";
import { getUser } from "@/utils/actions/server";

export default async function Layout({ children }: PropsWithChildren) {
  const data = await getUser()
  return (
    <div>
      <AppLayout user={data} />

      <div className="md:grid md:grid-cols-12 ">
        <DesktopSidebar />
        <div className="md:px-4 md:grid md:col-span-8 lg:col-span-9 ">
          {children}
        </div>
      </div>
    </div>
  );
}
