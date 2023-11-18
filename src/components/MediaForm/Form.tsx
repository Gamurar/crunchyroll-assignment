import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { MediaItemInputs } from "./MediaForm";
import { DatePicker } from "@mui/x-date-pickers";
import { mediaTypeToLabel } from "../../utils/mediaTypeToLabel";

type Props = {
  control: Control<MediaItemInputs, unknown>;
};

export function Form({ control }: Props) {
  return (
    <Grid container my={2} direction="column" spacing={2}>
      <Grid item>
        <Controller
          control={control}
          name="title"
          rules={{ required: true }}
          render={({ field: { value, ...field }, formState: { errors } }) => (
            <TextField
              {...field}
              value={value || ""}
              variant="outlined"
              label="Title"
              error={!!errors.title}
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="type"
          rules={{ required: true }}
          render={({ field: { value, ...field } }) => (
            <FormControl fullWidth>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                {...field}
                fullWidth
                label="Type"
                value={value}
                labelId="type-label"
              >
                <MenuItem value="movie">{mediaTypeToLabel("movie")}</MenuItem>
                <MenuItem value="tv-show">
                  {mediaTypeToLabel("tv-show")}
                </MenuItem>
                <MenuItem value="game">{mediaTypeToLabel("game")}</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="genre"
          rules={{ required: true }}
          render={({ field: { value, ...field } }) => (
            <FormControl fullWidth>
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                {...field}
                label="Genre"
                value={value}
                labelId="genre-label"
              >
                <MenuItem value="Action">Action</MenuItem>
                <MenuItem value="Drama">Drama</MenuItem>
                <MenuItem value="None">None</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Grid item mt={2}>
          <Controller
            name="releaseYear"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, ...field }, formState: { errors } }) => (
              <DatePicker
                {...field}
                views={["year"]}
                value={value || null}
                sx={{ width: "100%" }}
                label="Release Year"
                disableFuture
                slotProps={{
                  textField: {
                    error: !!errors.releaseYear,
                  },
                }}
                disableHighlightToday
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Typography component="legend">Rating</Typography>
        <Controller
          control={control}
          name="rating"
          rules={{ required: true }}
          render={({ field: { value, ...field } }) => (
            <Rating {...field} name="rating" value={value} max={10} />
          )}
        />
      </Grid>
    </Grid>
  );
}
