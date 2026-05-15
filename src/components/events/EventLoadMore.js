import { LoadMoreContainer } from "../../styles/EventStyles";

export const EventLoadMore = ({
  loadMoreRef,
  isFetchingNextPage,
  hasNextPage,
  eventsLength,
}) => {
  return (
    <LoadMoreContainer ref={loadMoreRef}>
      {isFetchingNextPage ? (
        <p>Loading more...</p>
      ) : !hasNextPage && eventsLength > 0 ? (
        <p>You've reached the end!</p>
      ) : null}
    </LoadMoreContainer>
  );
};
