import PropTypes from "prop-types";
import { Card as MUICard, CardContent, Typography } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Card({ card }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `card:${card.id}` });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? "grabbing" : "grab",
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <MUICard sx={{ mb: 1 }}>
        <CardContent sx={{ py: 1.5 }}>
          <Typography variant="body2">{card.title}</Typography>
        </CardContent>
      </MUICard>
    </div>
  );
}
Card.propTypes = { card: PropTypes.object };
