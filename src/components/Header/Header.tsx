import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { MediaForm } from "../MediaForm/MediaForm";
import React, { useState } from "react";

export function Header({ onAddMedia }: any) {
  return (
    <Grid container item justifyContent="space-between" alignItems="center">
      <Grid item>Crunchyroll assignment</Grid>
      <Grid item>
        <Button onClick={onAddMedia} variant="contained">
          Add Media
        </Button>
      </Grid>
    </Grid>
  );
}
