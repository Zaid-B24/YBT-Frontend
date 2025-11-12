import React from "react";
import styled, { css } from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Edit, GripVertical, Trash2 } from "lucide-react";

const SlidesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const SlideCard = styled.div`
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;
  overflow: hidden;
  color: #fff;
  position: relative; // Needed for the drag handle
  transition: all 0.2s ease-in-out; // Add transition for hover

  /* Style for when it's actively being dragged */
  ${(props) =>
    props.isDragging &&
    css`
      background: #2a2a2a;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `}

  /* Style for when reorder is on AND you hover over it */
  ${(props) =>
    props.isReorderMode &&
    !props.isDragging &&
    css`
      &:hover {
        background: #252525;
        border-color: #555;
        transform: translateY(-3px);
      }
    `}
`;

const CardImage = styled.div`
  height: 200px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-color: #333;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
`;

const CardBadge = styled.span`
  background: ${(props) => (props.$active ? "#0af253" : "#555")};
  color: ${(props) => (props.$active ? "#000" : "#fff")};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
`;

const CardInfo = styled.p`
  font-size: 0.9rem;
  color: #ccc;
  margin: 0.75rem 0 0 0;
  strong {
    color: #fff;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0 1.5rem 1.5rem 1.5rem;
`;

const ActionButton = styled.button`
  background: #333;
  color: #fff;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #444;
  }

  &.delete {
    background: #5c1a1a;
    &:hover {
      background: #8b2828;
    }
  }
`;

const DragHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  color: black;
  cursor: grab;
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;

  &:hover {
    color: #fff;
    background: rgba(0, 0, 0, 0.7);
  }
`;

const HeroSlideList = ({
  slides,
  onDragEnd,
  onEdit,
  onDelete,
  isDeleting,
  isReorderMode,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {slides && slides.length > 0 ? (
        <Droppable droppableId="slides">
          {(provided) => (
            <SlidesGrid {...provided.droppableProps} ref={provided.innerRef}>
              {slides.map((slide, index) => (
                <Draggable
                  key={slide.id}
                  draggableId={slide.id.toString()}
                  index={index}
                  isDragDisabled={!isReorderMode}
                >
                  {(provided, snapshot) => (
                    <SlideCard
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      isDragging={snapshot.isDragging}
                      isReorderMode={isReorderMode}
                    >
                      {isReorderMode && (
                        <DragHandle {...provided.dragHandleProps}>
                          <GripVertical size={20} />
                        </DragHandle>
                      )}

                      <CardImage
                        imageUrl={
                          slide.customAssetUrl ||
                          slide.car?.thumbnail ||
                          slide.event?.primaryImage
                        }
                      />
                      <CardContent>
                        <CardHeader>
                          <CardTitle>
                            {slide.customTitle ||
                              slide.car?.title ||
                              slide.event?.title ||
                              "Untitled Slide"}
                          </CardTitle>
                          <CardBadge $active={slide.isActive}>
                            {slide.isActive ? "Active" : "Inactive"}
                          </CardBadge>
                        </CardHeader>
                        <CardInfo>
                          <strong>Order:</strong> {slide.order}
                        </CardInfo>
                        <CardInfo>
                          <strong>Links to:</strong>{" "}
                          {slide.carId
                            ? "Car"
                            : slide.eventId
                            ? "Event"
                            : "Custom"}
                        </CardInfo>
                      </CardContent>
                      <CardActions>
                        <ActionButton
                          title="Edit Slide"
                          onClick={() => onEdit(slide)}
                        >
                          <Edit size={16} />
                        </ActionButton>
                        <ActionButton
                          title="Delete Slide"
                          className="delete"
                          onClick={() => onDelete(slide.id)}
                          disabled={isDeleting}
                        >
                          <Trash2 size={16} />
                        </ActionButton>
                      </CardActions>
                    </SlideCard>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </SlidesGrid>
          )}
        </Droppable>
      ) : (
        <p>No slides found. Add one to begin reordering.</p>
      )}
    </DragDropContext>
  );
};

export default HeroSlideList;
