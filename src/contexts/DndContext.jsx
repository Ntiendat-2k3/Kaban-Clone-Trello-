// BEFORE (bị lỗi): useDndMonitor dùng ngay trong component cung cấp context
// AFTER (đúng): tách thành CursorMonitor và render dưới CoreDndContext

import {
  DndContext as CoreDndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  useDndMonitor,
} from "@dnd-kit/core";
import PropTypes from "prop-types";

function CursorMonitor() {
  useDndMonitor({
    onDragStart() {
      document.body.style.cursor = "grabbing";
    },
    onDragEnd() {
      document.body.style.cursor = "";
    },
    onDragCancel() {
      document.body.style.cursor = "";
    },
  });
  return null;
}

export default function DndContext({ children, onDragEnd }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  return (
    <CoreDndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={onDragEnd}
    >
      {/* Hook monitor phải nằm BÊN TRONG provider */}
      <CursorMonitor />
      {children}
    </CoreDndContext>
  );
}
DndContext.propTypes = { children: PropTypes.node, onDragEnd: PropTypes.func };
