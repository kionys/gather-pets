import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const usePostsInfinite = () => {
  const fetchPosts = async ({ pageParam = 1 }) => {
    const { data } = await axios.get("/api/post", {
      params: {
        limit: 4,
        page: pageParam,
        // userId: 3, -- 특정 유저의 id로 모든 게시글을 볼 때 사용예정
      },
    });
    console.log(data);
    return data;
  };

  const {
    data: posts,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
    refetch: mutate,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    getNextPageParam: lastPage => {
      return lastPage.data?.length > 0 ? lastPage.page + 1 : undefined;
    },
  });

  return {
    posts,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
    mutate,
  };
};
