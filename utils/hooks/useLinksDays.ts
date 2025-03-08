import { useQuery, } from "@tanstack/react-query";
import { getDaysData, getPaginatedLinks } from "../actions/client";

export function useDaysData({
  start,
  end,
}: any) {
  const {
    data: linksDays,
    error: linksDaysError,
    isLoading: isLoadingLinksDays,
  } = useQuery({
    queryFn: () => getDaysData({start, end}),
    queryKey: ["Links", start, end],
    placeholderData: (prevData) => prevData,
    staleTime: 0,
    refetchInterval: 0.5,
  });


  return {
    linksDays,
    linksDaysError,
    isLoadingLinksDays,
  };
}
