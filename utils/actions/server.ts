"use server";

import { NextResponse } from "next/server";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";
import { customAlphabet } from "nanoid";
import QRCode from "qrcode"

export async function signup({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });
    if (error) {
      return { error: error.message };
    }
    return { data };
  } catch (error: any) {
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occured",
    };
  }
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { error: error.message };
    }
    return { data };
  } catch (error: any) {
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occured",
    };
  }
}

export async function getUser() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return { error: error.message };
    }

    return { data: data.user };
  } catch (error: any) {
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occured!",
    };
  }
}

export async function signOut() {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return { error: error.message };
    }

    return { message: "You are successfully logged out!" };
  } catch (error: any) {
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occured!",
    };
  }
}

export async function LinkShortener({
  original_link,
  user_id,
}: {
  original_link: string;
  user_id: string;
}) {
  try {
    const nanoid = customAlphabet(
      "ghgaguiuiy2688787b8pbv565srkljkzftreaqpdsjalccagj",
      6
    );
    const alias = nanoid();
    const shortened_link = `${process.env.NEXT_PUBLIC_BASE_URL}/${alias}`;

    const qrBuffer = await QRCode.toBuffer(shortened_link)

    const filePath = `/${alias}`

    const supabase = await createClient();

    const { data: qrImage, error: qrImageError } = await supabase.storage.from("qr_codes").upload(filePath, qrBuffer, { contentType: "image/png"})

    if(qrImageError) { return { error: qrImageError.message }}
    
    const {data: publicUrlData} = await supabase.storage.from("qr_codes").getPublicUrl(filePath)
   
    const { data, error } = await supabase.from("Links").insert({
      original_link,
      shortened_link,
      user_id,
      qr_code_url: publicUrlData.publicUrl
    });

    if (error) {
      return { error: error.message };
    }

    return { data: data };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occured!",
    };
  }
}

export async function deleteLinkById(id: number) {
  try {
    const supabase = await createClient();

    // const {error: bucketError} = await supabase.storage.from("qr_codes").remove(["qr_codes/alias.png"])

    const { error } = await supabase.from("Links").delete().eq("id", id);

    if (error) {
      return { error: error.message };
    }

    return { message: "Link deleted!" };
  } catch (error: any) {
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occured!",
    };
  }
}


export async function sendResetLink(email: string){
  try{
    const supabase = await createClient();

    const resetLink= `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`
    const { data, error } : any = await supabase.auth.resetPasswordForEmail(email, 
      {redirectTo: resetLink}
    )

    if(error) return { error : error.message}


    return { message: "Reset email sent!" };

  }catch (error: any) {
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occured!",
    };
  }
} 


export async function updateUser(password: string){
  try{
    const supabase = await createClient();

    const { data, error } : any = await supabase.auth.updateUser({password})

    if(error) return { error : error.message}


    return { message: "Password has been reset" };

  }catch (error: any) {
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occured!",
    };
  }
}