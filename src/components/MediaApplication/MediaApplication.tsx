import Grid from "@mui/material/Grid";
import { media } from "../../store";
import { MediaList } from "../MediaList/MediaList";
import { Header } from "../Header/Header";
import { FilterBar } from "../FilterBar/FilterBar";
import { MediaForm } from "../MediaForm/MediaForm";
import { useState } from "react";
import { Box } from "@mui/material";
import { MediaEntry } from "../../types/MediaItem";

export function MediaApplication() {
  const [open, setOpen] = useState(false);
  const [mediaEntryToEdit, setMediaEntryToEdit] = useState<MediaEntry | undefined>(undefined);

  function onAddMedia() {
    setMediaEntryToEdit(undefined);
    setOpen(true);
  }

  function onEditMedia(mediaEntry: MediaEntry) {
    setMediaEntryToEdit(mediaEntry);
    setOpen(true);
  }

  const handleClose = () => {
    setMediaEntryToEdit(undefined);
    setOpen(false);
  };

  return (
    <Grid container>
      <Grid item container m={3}>
        <Header onAddMedia={onAddMedia} />
        <Box my={1} flex={1}>
          <FilterBar />
        </Box>
        <MediaList media={media} onEditMedia={onEditMedia} />
      </Grid>
      <MediaForm open={open} handleClose={handleClose} mediaEntryToEdit={mediaEntryToEdit} />
    </Grid>
  );
}
