import { useState } from "react";
import { Box, Card, CardContent, TextField, IconButton } from "@mui/material";
import PropTypes from "prop-types";

export default function CreateNewList({ onCreate }) {
  const [title, setTitle] = useState("");
  return (
    <Box sx={{ width: 300, flex: "0 0 300px" }}>
      <Card>
        <CardContent sx={{ display: "flex", gap: 1 }}>
          <TextField
            size="small"
            placeholder="Danh sách mới"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ flex: 1 }}
          />
          <IconButton
            color="primary"
            onClick={() => {
              if (!title.trim()) return;
              onCreate(title);
              setTitle("");
            }}
          >
            +
          </IconButton>
        </CardContent>
      </Card>
    </Box>
  );
}
CreateNewList.propTypes = { onCreate: PropTypes.func };
