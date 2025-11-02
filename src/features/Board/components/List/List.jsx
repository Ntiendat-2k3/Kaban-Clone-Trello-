import PropTypes from "prop-types";
import {
  Box,
  Card as MUICard,
  CardHeader,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Card from "../Card/Card";
import { useState } from "react";
import { useDndMonitor } from "@dnd-kit/core";

export default function List({ list, onAddCard }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `list:${list.id}` });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? "grabbing" : "grab",
  };
  const [title, setTitle] = useState("");

  // --- State hiển thị vạch preview ---
  const [overId, setOverId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  useDndMonitor({
    onDragStart: ({ active }) => {
      setActiveId(active?.id || null);
    },
    onDragOver: ({ over }) => {
      setOverId(over?.id || null);
    },
    onDragEnd: () => {
      setOverId(null);
      setActiveId(null);
    },
    onDragCancel: () => {
      setOverId(null);
      setActiveId(null);
    },
  });

  // Tính index vạch preview trong list hiện tại
  const cardIds = list.cards.map((c) => `card:${c.id}`);
  const isDraggingCardHere =
    activeId?.toString().startsWith("card:") &&
    overId &&
    (cardIds.includes(overId) || overId === `list:${list.id}`);

  const previewIndex = isDraggingCardHere
    ? overId === `list:${list.id}`
      ? list.cards.length // nếu đang hover vùng trống cuối list
      : Math.max(0, cardIds.indexOf(overId))
    : -1;

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, width: 300, flex: "0 0 300px" }}
      {...attributes}
      {...listeners}
    >
      <MUICard sx={{ mr: 2, bgcolor: "#fdfdfd" }}>
        <CardHeader
          title={list.title}
          action={
            <IconButton size="small">
              <DeleteOutline fontSize="small" />
            </IconButton>
          }
        />
        <Box sx={{ px: 2, pb: 2 }}>
          {/* Sortable theo trục dọc cho CARD */}
          <SortableContext
            items={cardIds}
            strategy={verticalListSortingStrategy}
          >
            <Stack spacing={1}>
              {list.cards.map((c, idx) => (
                <div key={c.id}>
                  {/* Vạch preview trước vị trí card */}
                  {previewIndex === idx && (
                    <div
                      style={{
                        height: 8,
                        borderRadius: 4,
                        background: "rgba(25,118,210,0.35)",
                        margin: "4px 0",
                      }}
                    />
                  )}
                  <Card card={c} />
                </div>
              ))}
              {/* Nếu preview ở cuối danh sách */}
              {previewIndex === list.cards.length && (
                <div
                  style={{
                    height: 8,
                    borderRadius: 4,
                    background: "rgba(25,118,210,0.35)",
                    margin: "4px 0",
                  }}
                />
              )}
            </Stack>
          </SortableContext>

          {/* Thêm nhanh card */}
          <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
            <TextField
              size="small"
              placeholder="Thêm thẻ..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ flex: 1 }}
            />
            <IconButton
              onClick={() => {
                if (!title.trim()) return;
                onAddCard(list.id, title);
                setTitle("");
              }}
              color="primary"
            >
              +
            </IconButton>
          </Box>
        </Box>
      </MUICard>
    </div>
  );
}
List.propTypes = { list: PropTypes.object, onAddCard: PropTypes.func };
