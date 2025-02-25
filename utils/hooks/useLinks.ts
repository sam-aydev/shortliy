import { useQuery } from "@tanstack/react-query";
import { getLinks } from "../actions/client";

export function useLinks() {
  const {
    data: fiveLinks,
    error: fiveLinksError,
    isLoading: isLoadingFiveLinks,
  } = useQuery({
    queryFn: getLinks,
    queryKey: ["Links"],
    staleTime: 0,
    // refetchInterval: 0.5,
  });
  return {
    fiveLinks,
    fiveLinksError,
    isLoadingFiveLinks,
  };
}
