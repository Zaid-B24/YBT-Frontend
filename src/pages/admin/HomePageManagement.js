import styled, { css } from "styled-components";
import HeroSlideForm from "../../components/forms/HeroSlideForm";
import { toast, ToastContainer, Slide } from "react-toastify";
import { Plus, Save, X, GripVertical } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import HeroSlideList from "../../components/admin/HeroSlideList";

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: #fff;
  padding-top: 80px;
`;

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const ControlsSection = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const BaseButton = styled.button`
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
`;

const AddButton = styled.button`
  background: #fff;
  color: #000;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const ReorderButton = styled(BaseButton)`
  background: #333;
  color: #fff;
  &:hover {
    background: #444;
  }
`;

const SaveButton = styled(BaseButton)`
  background: #0af253; // Green
  color: #000;
  &:hover {
    opacity: 0.8;
  }
`;

const ReorderContainer = styled.div`
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  margin-top: 1rem;

  /* Style it when reordering is active */
  ${(props) =>
    props.$isReordering &&
    css`
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid #444;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    `}
`;

const StyledToastContainer = styled(ToastContainer).attrs({
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "dark",
  transition: Slide,
})`
  /* Custom toast styles here */
`;

const fetchAdminHeroSlides = async () => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("No admin token found");

  const response = await fetch(`${process.env.REACT_APP_API_URL}/homeslide`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch slides");
  }

  return data.data;
};

const deleteHeroSlide = async (slideId) => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("No admin token found");

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/homeslide/${slideId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete slide");
  }

  return data;
};

const createHeroSlide = async (slideData) => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    throw new Error("No admin token found. Please log in.");
  }

  const response = await fetch(`${process.env.REACT_APP_API_URL}/homeslide`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(slideData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! Status: ${response.status}`);
  }
  return data;
};

const updateHeroSlide = async ({ slideId, slideData }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("No admin token found");

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/homeslide/${slideId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(slideData),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update slide");
  }
  return data;
};

const reorderHeroSlides = async (slideOrder) => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("No admin token found");

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/homeslide/reorder`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ slideOrder }),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to reorder slides");
  }
  return data;
};

const HomePageManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [isReorderMode, setIsReorderMode] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: slides,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["adminHeroSlides"],
    queryFn: fetchAdminHeroSlides,
    enabled: !showForm,
  });

  const createMutation = useMutation({
    mutationFn: createHeroSlide,
    onSuccess: (data) => {
      toast.success(data.message || "Slide created successfully!");
      handleSuccess();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create slide.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteHeroSlide,
    onSuccess: (data) => {
      toast.success(data.message || "Slide deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["adminHeroSlides"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete slide.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateHeroSlide,
    onSuccess: (data) => {
      toast.success(data.message || "Slide updated successfully!");
      handleSuccess();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update slide.");
    },
  });

  const reorderMutation = useMutation({
    mutationFn: reorderHeroSlides,
    onSuccess: (data) => {
      toast.success(data.message || "Order updated!");
      queryClient.invalidateQueries({ queryKey: ["adminHeroSlides"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reorder");
      queryClient.invalidateQueries({ queryKey: ["adminHeroSlides"] });
    },
  });

  const handleDelete = (slideId) => {
    if (window.confirm("Are you sure you want to delete this slide?")) {
      deleteMutation.mutate(slideId);
    }
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingSlide(null);
    queryClient.invalidateQueries({ queryKey: ["adminHeroSlides"] });
  };

  const handleBack = () => {
    setShowForm(false);
    setEditingSlide(null);
  };

  const handleEditClick = (slide) => {
    setEditingSlide(slide);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setEditingSlide(null);
    setShowForm(true);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(slides);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    queryClient.setQueryData(["adminHeroSlides"], items);
  };

  const handleSaveOrder = () => {
    const currentSlides = queryClient.getQueryData(["adminHeroSlides"]);
    const slideOrderIds = currentSlides.map((slide) => slide.id);
    reorderMutation.mutate(slideOrderIds);
    setIsReorderMode(false);
  };

  const handleCancelReorder = () => {
    setIsReorderMode(false);

    queryClient.invalidateQueries({ queryKey: ["adminHeroSlides"] });
  };

  return (
    <PageWrapper>
      <StyledToastContainer />
      <PageContainer>
        {showForm ? (
          <HeroSlideForm
            onSuccess={handleSuccess}
            onBack={handleBack}
            slideToEdit={editingSlide}
            onCreate={createMutation.mutate}
            onUpdate={updateMutation.mutate}
            isSaving={createMutation.isPending || updateMutation.isPending}
          />
        ) : (
          <>
            <ControlsSection>
              {isReorderMode ? (
                <>
                  <ReorderButton onClick={handleCancelReorder}>
                    <X size={20} />
                    Cancel
                  </ReorderButton>
                  <SaveButton
                    onClick={handleSaveOrder}
                    disabled={reorderMutation.isPending}
                  >
                    <Save size={20} />
                    {reorderMutation.isPending ? "Saving..." : "Save Order"}
                  </SaveButton>
                </>
              ) : (
                <>
                  <ReorderButton onClick={() => setIsReorderMode(true)}>
                    <GripVertical size={20} />
                    Reorder Slides
                  </ReorderButton>
                </>
              )}
              <AddButton onClick={handleAddClick}>
                <Plus size={20} />
                Add New Slide
              </AddButton>
            </ControlsSection>

            <h2>Current Hero Slides</h2>
            {isLoading && <p>Loading slides...</p>}
            {isError && <p>Error: {error.message}</p>}

            <ReorderContainer $isReordering={isReorderMode}>
              <HeroSlideList
                slides={slides}
                onDragEnd={handleOnDragEnd}
                onEdit={handleEditClick}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
                isReorderMode={isReorderMode}
              />
            </ReorderContainer>
          </>
        )}
      </PageContainer>
    </PageWrapper>
  );
};

export default HomePageManagement;
