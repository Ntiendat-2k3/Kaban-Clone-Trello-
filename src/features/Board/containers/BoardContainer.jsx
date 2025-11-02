import { useEffect, useMemo, useState } from "react";
import { Box, Container } from "@mui/material";
import DndContext from "../../../contexts/DndContext";
import useBoard from "../hooks/useBoard";
import { DEFAULT_BOARD_ID } from "../../../config/constants";
import Spinner from "../../../components/Spinner/Spinner";
import BoardHeader from "../components/BoardHeader";
import List from "../components/List/List";
import CreateNewList from "../components/CreateNewList";
import axiosClient from "../../../api/axiosClient";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import createDragEndHandler from "../hooks/useDragEnd";

export default function BoardContainer() {
  const { data, isLoading } = useBoard(DEFAULT_BOARD_ID);
  const [board, setBoard] = useState(null);

  useEffect(() => {
    if (data) {
      Promise.all(
        (data.lists || []).map(async (l) => {
          const cards = (
            await axiosClient.get(
              `/cards?listId=${l.id}&_sort=position&_order=asc`
            )
          ).data;
          return { ...l, cards };
        })
      ).then((lists) => setBoard({ ...data, lists }));
    }
  }, [data]);

  const handleAddList = async (title) => {
    const res = (
      await axiosClient.post("/lists", {
        boardId: data.id,
        title,
        position: board.lists.length,
      })
    ).data;
    setBoard({ ...board, lists: [...board.lists, { ...res, cards: [] }] });
  };
  const handleAddCard = async (listId, title) => {
    const list = board.lists.find((l) => l.id === listId);
    const res = (
      await axiosClient.post("/cards", {
        listId,
        title,
        position: list.cards.length,
      })
    ).data;
    const newLists = board.lists.map((l) =>
      l.id === listId ? { ...l, cards: [...l.cards, res] } : l
    );
    setBoard({ ...board, lists: newLists });
  };

  const onDragEnd = useMemo(
    () => (board ? createDragEndHandler(board, setBoard) : () => {}),
    [board]
  );

  if (isLoading || !board) return <Spinner />;
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <BoardHeader title={board.title} />
      <Container maxWidth={false} sx={{ overflowX: "auto", py: 2 }}>
        <DndContext onDragEnd={onDragEnd}>
          {/* Bọc các list bằng SortableContext để sắp xếp ngang */}
          <SortableContext
            items={board.lists.map((l) => `list:${l.id}`)}
            strategy={horizontalListSortingStrategy}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              {board.lists
                .sort((a, b) => a.position - b.position)
                .map((l) => (
                  <List key={l.id} list={l} onAddCard={handleAddCard} />
                ))}
              <CreateNewList onCreate={handleAddList} />
            </Box>
          </SortableContext>
        </DndContext>
      </Container>
    </Box>
  );
}
