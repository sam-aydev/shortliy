import { useQuery } from "@tanstack/react-query";
import { getFiveLink } from "../actions/client";

export function useFiveLinks() {
  const {
    data: fiveLinks,
    error: fiveLinksError,
    isLoading: isLoadingFiveLinks,
  } = useQuery({
    queryFn: getFiveLink,
    queryKey: ["Links"],
    staleTime: 0,
    refetchInterval: 0.5,
  });
  return {
    fiveLinks,
    fiveLinksError,
    isLoadingFiveLinks,
  };
}
