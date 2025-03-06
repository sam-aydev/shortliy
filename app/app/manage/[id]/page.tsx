import LinkItem from "@/app/components/LinkItem";
import { Metadata } from "next";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id as string;

  return <LinkItem id={id} />;
}

export const metadata: Metadata = {
  title: "Snp.iy",
  description: "Link Info!",
};
