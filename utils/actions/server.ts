"use server";

import { NextResponse } from "next/server";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";
import { customAlphabet } from "nanoid";

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
      console.log(error);
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
      console.log(error);
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

    const supabase = await createClient();

    const { data, error } = await supabase.from("Links").insert({
      original_link,
      shortened_link,
      user_id,
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
