import {
  SkeletonCardWrapper,
  SkeletonImage,
  SkeletonContent,
  SkeletonTitle,
  SkeletonDescription,
  SkeletonText,
} from "../../styles/EventStyles";

export const EventCardSkeleton = () => (
  <SkeletonCardWrapper>
    <SkeletonImage />
    <SkeletonContent>
      <SkeletonTitle />
      <SkeletonDescription />
      <SkeletonDescription style={{ width: "80%" }} />
      <SkeletonText width="40%" marginTop="1rem" />
      <SkeletonText width="50%" marginTop="1rem" />
    </SkeletonContent>
  </SkeletonCardWrapper>
);
