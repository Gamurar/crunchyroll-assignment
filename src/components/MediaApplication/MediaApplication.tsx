import Grid from "@mui/material/Grid";
import { media } from "../../store";
import { MediaList } from "../MediaList/MediaList";
import { Header } from "../Header/Header";
import { FilterBar } from "../FilterBar/FilterBar";
import { MediaForm } from "../MediaForm/MediaForm";
import { useState } from "react";
import { Box } from "@mui/material";

export function MediaApplication() {
  const [open, setOpen] = useState(false);

  function onAddMedia() {
    media.clearEditMediaId();
    setOpen(true);
  }

  function onEditMedia() {
    setOpen(true);
  }

  const handleClose = () => {
    media.clearEditMediaId();
    setOpen(false);
  };

  return (
    <Grid container>
      <Grid item container m={3}>
        <Header onAddMedia={onAddMedia} />
        <Box my={1} flex={1}>
          <FilterBar />
        </Box>
        <MediaList onEditMedia={onEditMedia} />
      </Grid>
      <MediaForm open={open} handleClose={handleClose} />
    </Grid>
  );
}
