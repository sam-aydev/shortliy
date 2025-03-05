import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";



export default async function Page({params}:{
    params: Promise<{ shortenUrl: string }>;
    }) {
      const shortenUrl = (await params).shortenUrl as string;
      const supabase = await createClient()

      const {data, error } = await supabase.from("Links").select("original_link, click_count").eq("shortened_link", `${process.env.NEXT_PUBLIC_BASE_URL}/${shortenUrl}`).single()

      if(error || !data){

        return (
  
          <h1>404 - Link Not Found</h1>
        )
      }

      await supabase.from("Links").update({click_count: data.click_count + 1}).eq("shortened_link", `${process.env.NEXT_PUBLIC_BASE_URL}/${shortenUrl}`)

      let originalUrl = data.original_link
      if(!originalUrl.startsWith("http") || !originalUrl.startsWith("https") ){
        originalUrl = "https://" + originalUrl 
      }
      redirect(originalUrl)
}
    

