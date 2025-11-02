// đổi tên hàm:
export default function createDragEndHandler(board, setBoard) {
  return async ({ active, over }) => {
    if (!active || !over || active.id === over.id) return;
    const [type] = String(active.id).split(":");
    const [overType] = String(over.id).split(":");

    if (type === "list" && overType === "list") {
      const { arrayMove } = await import("@dnd-kit/sortable");
      const fromIndex = board.lists.findIndex(
        (l) => `list:${l.id}` === active.id
      );
      const toIndex = board.lists.findIndex((l) => `list:${l.id}` === over.id);
      const newLists = arrayMove(board.lists, fromIndex, toIndex).map(
        (l, idx) => ({ ...l, position: idx })
      );
      setBoard({ ...board, lists: newLists });
      try {
        const { listApi } = await import("../../../api");
        await Promise.all(
          newLists.map((l) => listApi.update(l.id, { position: l.position }))
        );
      } catch (e) {
        console.error(e);
      }
      return;
    }

    if (type === "card") {
      const srcList = board.lists.find((l) =>
        l.cards.some((c) => `card:${c.id}` === active.id)
      );
      const dstList =
        board.lists.find((l) =>
          l.cards.some((c) => `card:${c.id}` === over.id)
        ) || srcList;
      const srcCards = [...srcList.cards];
      const activeIdx = srcCards.findIndex((c) => `card:${c.id}` === active.id);

      let dstCards = srcCards;
      if (srcList.id !== dstList.id) {
        dstCards = [...dstList.cards];
        srcCards.splice(activeIdx, 1);
      }
      const overIdx = dstCards.findIndex((c) => `card:${c.id}` === over.id);
      const movedCard = srcList.cards[activeIdx];
      const { arrayMove } = await import("@dnd-kit/sortable");
      const base =
        srcList.id === dstList.id ? srcCards : [...dstCards, movedCard];
      const newDstCards = arrayMove(
        base,
        srcList.id === dstList.id ? activeIdx : dstCards.length,
        overIdx
      ).map((c, i) => ({ ...c, position: i, listId: dstList.id }));

      const newLists = board.lists.map((l) => {
        if (l.id === srcList.id)
          return {
            ...l,
            cards:
              srcList.id === dstList.id
                ? newDstCards
                : srcCards.map((c, i) => ({ ...c, position: i })),
          };
        if (l.id === dstList.id) return { ...l, cards: newDstCards };
        return l;
      });
      setBoard({ ...board, lists: newLists });
      try {
        const { cardApi } = await import("../../../api");
        const changedCards = [
          ...(srcList.id === dstList.id ? newDstCards : srcCards),
          ...(srcList.id === dstList.id ? [] : newDstCards),
        ];
        await Promise.all(
          changedCards.map((c) =>
            cardApi.update(c.id, { position: c.position, listId: c.listId })
          )
        );
      } catch (e) {
        console.error(e);
      }
    }
  };
}
