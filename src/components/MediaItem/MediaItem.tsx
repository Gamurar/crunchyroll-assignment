import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { media } from "../../store";
import { MediaEntry } from "../../types/MediaItem";
import { Card, CardActions, CardContent, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { mediaTypeToLabel } from "../../utils/mediaTypeToLabel";

type Props = {
  item: MediaEntry;
  onEditMedia: (mediaEntry: MediaEntry) => void;
};

export function MediaItem({ item, onEditMedia }: Props) {
  function onEdit() {
    onEditMedia(item);
  }

  function onDelete() {
    media.remove({ id: item.id });
  }

  return (
    <Card>
      <CardContent sx={{ pb: 0 }}>
        <Box textAlign="left">
          <Typography variant="h5">{item.title}</Typography>
          <Typography color="text.secondary">
            {mediaTypeToLabel(item.type)}
          </Typography>
          <Typography variant="body2">Genre: {item.genre}</Typography>
          <Typography variant="body2">
            Release year: {item.releaseYear}
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            Rating: {item.rating}
            <StarIcon color="warning" fontSize="small" />
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          onClick={onEdit}
          size="small"
          variant="contained"
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
        <Button
          onClick={onDelete}
          color="error"
          size="small"
          variant="contained"
          startIcon={<DeleteOutlineIcon />}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}
