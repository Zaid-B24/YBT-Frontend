import { useEffect, useRef } from "react";

export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 1.0,
  rootMargin = "0px",
}) => {
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const currentRef = loadMoreRef.current;

    if (!currentRef || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, threshold, rootMargin]);

  return { loadMoreRef };
};
