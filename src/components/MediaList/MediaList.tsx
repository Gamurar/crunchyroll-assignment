import { observer } from "mobx-react-lite";
import Grid from "@mui/material/Grid";
import { MediaItem } from "../MediaItem/MediaItem";
import { media } from "../../store";

type Props = {
  onEditMedia: () => void;
}

export const MediaList = observer(({ onEditMedia }: Props) => {
  return (
    <Grid container gap={3} direction="column">
      {media.data.map((item) => (
        <MediaItem item={item} key={item.id} onEditMedia={onEditMedia} />
      ))}
    </Grid>
  );
});
