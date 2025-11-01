import PropTypes from "prop-types";
import { Card as MuiCard, CardContent, Typography } from "@mui/material";

/**
 * Component hiển thị một Thẻ (Card)
 */
function Card({ card }) {
  // --- Logic cho dnd-kit (sẽ thêm sau) ---
  // const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });
  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  // };
  // ----------------------------------------

  if (!card) return null;

  return (
    <MuiCard
      // ref={setNodeRef} // Gắn ref cho dnd-kit
      // style={style} // Style cho dnd-kit
      // {...attributes} // Props cho dnd-kit
      // {...listeners} // Props cho dnd-kit
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Typography>{card.title}</Typography>
      </CardContent>
    </MuiCard>
  );
}

// --- Định nghĩa PropTypes như bạn yêu cầu ---
Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    // Thêm các trường khác như 'description', 'order' sau
  }).isRequired,
};

export default Card;
