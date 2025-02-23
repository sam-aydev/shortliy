"use server";

import { NextResponse } from "next/server";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";

export async function signup({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) {
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
    return { error };
  }
  return { data };
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    return { error };
  }
  return { data };
}
