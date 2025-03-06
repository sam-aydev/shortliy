import {useQuery } from "@tanstack/react-query";
import { getPaginatedLinks } from "../actions/client";

export function useLinks({page, pageSize}: {
  page: number;
  pageSize: number; 
}
) {
  const {
    data: links,
    error: linksError,
    isLoading: isLoadingLinks,
  } = useQuery({
    queryFn: () => getPaginatedLinks(page, pageSize),
    queryKey: ["Links", page],
    placeholderData: (prevData)=> prevData,
    staleTime: 0,
    refetchInterval: 0.5,
  });

  
  return {
    links,
    linksError,
    isLoadingLinks,
  };
}
