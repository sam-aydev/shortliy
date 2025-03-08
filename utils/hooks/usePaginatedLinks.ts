import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPaginatedLinks } from "../actions/client";

export function usePaginatedLinks({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  const queryClient = useQueryClient();
  const {
    data: links,
    error: linksError,
    isLoading: isLoadingLinks,
  } = useQuery({
    queryFn: () => getPaginatedLinks(page, pageSize),
    queryKey: ["Links", page],
    placeholderData: (prevData) => prevData,
    staleTime: 0,
    refetchInterval: 0.5,
  });

  queryClient.prefetchQuery({
    queryKey: ["Links", page + 1],
    queryFn: () => getPaginatedLinks(page + 1),
  });

  return {
    links,
    linksError,
    isLoadingLinks,
  };
}
