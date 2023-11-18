import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

type Props = {
  onAddMedia: () => void;
}

export function Header({ onAddMedia }: Props) {
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
