import { observer } from "mobx-react-lite";
import Grid from "@mui/material/Grid";
import { MediaItem } from "../MediaItem/MediaItem";
import { Media } from "../../store/Media";
import { MediaEntry } from "../../types/MediaItem";

interface Props {
  media: Media;
  onEditMedia: (mediaItem: MediaEntry) => void;
}

export const MediaList = observer(({ media, onEditMedia }: Props) => {
  return (
    <Grid container gap={3} direction="column">
      {media.data.map((item) => (
        <MediaItem item={item} key={item.id} onEditMedia={onEditMedia} />
      ))}
    </Grid>
  );
});
