import { useQuery } from "@tanstack/react-query";
import { getLinkById } from "../actions/client";

export function useLink(id: number) {
  const {
    data: link,
    error: linkError,
    isLoading: isLoadingLink,
  } = useQuery({
    queryFn: () => getLinkById(id),
    queryKey: ["Links", id],
    staleTime: 0,
    // refetchInterval: 0.5,
  });
  return {
    link,
    linkError,
    isLoadingLink,
  };
}
