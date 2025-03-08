import { createClient } from "../supabase/client";

export async function getFiveLink() {
  try {
    const supabase = createClient();

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) {
      return { error: userError.message };
    }
    const { data, error } = await supabase
      .from("Links")
      .select("*")
      .limit(5)
      .eq("user_id", user.user.id);

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

export async function getPaginatedLinks(page = 1, pageSize = 10) {
  try {
    const supabase = createClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) {
      return { error: userError.message };
    }
    const { data, error, count } = await supabase
      .from("Links")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to)
      .eq("user_id", user.user?.id);

    if (error) {
      return { error: error.message };
    }

    return { data: data, count: count };
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

export function timeAgo(timestamp: any) {
  const pastDate: any = new Date(timestamp);
  const now = Date.now();
  const diffMs = now - pastDate;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return diffMinutes === 0 ? "Just now" : `${diffMinutes} min ago`;
  } else if (diffHours >= 1 && diffDays < 1) {
    return diffHours === 1 ? "1 hour ago" : `${diffHours} hrs ago`;
  } else {
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  }
}


export async function getAllLinks() {
  try {
    const supabase = createClient();
    const { data: user, error: userError } = await supabase.auth.getUser();

    if(userError)  return { error: userError.message }
    const { data, error } = await supabase.from("Links").select("*").eq("user_id", user.user?.id);

    if (error) {
      return { error: error.message };
    }

    return { data: data };
  } catch (error: any) {
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occured!",
    };
  }
}