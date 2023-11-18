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
import { YearSelect } from "./YearSelect";
import { MediaTypeSelect } from "../MediaTypeSelect/MediaTypeSelect";

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
          render={({ field: { value, onChange } }) => (
            <MediaTypeSelect value={value} onChange={onChange} />
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
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <YearSelect
                error={!!errors.releaseYear}
                value={value}
                label="Release year"
                onChange={onChange}
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
