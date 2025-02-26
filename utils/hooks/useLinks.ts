import { useQuery } from "@tanstack/react-query";
import { getLinks } from "../actions/client";

export function useLinks() {
  const {
    data: links,
    error: linksError,
    isLoading: isLoadingLinks,
  } = useQuery({
    queryFn: getLinks,
    queryKey: ["Links"],
    staleTime: 0,
    // refetchInterval: 0.5,
  });
  return {
    links,
    linksError,
    isLoadingLinks,
  };
}
