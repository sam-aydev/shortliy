import { createClient } from "../supabase/client";

export async function getFiveLink() {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("Links").select("*").limit(5);

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

export async function getLinks() {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("Links").select("*");

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

export async function getLinkById(id: number) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("Links")
      .select("*")
      .eq("id", id)
      .single();

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
