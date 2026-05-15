import { EmptyState } from "../../styles/EventStyles";

export const EventEmptyState = () => (
  <EmptyState>
    <p
      style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#6c757d",
        marginBottom: "16px",
      }}
    >
      We're cooking up something special! 🍳
    </p>
    <p style={{ fontSize: "1rem", color: "#6c757d" }}>
      Check back soon for new events.
    </p>
  </EmptyState>
);
