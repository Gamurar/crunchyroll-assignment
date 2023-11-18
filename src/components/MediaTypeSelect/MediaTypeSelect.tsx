import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { mediaTypeToLabel } from "../../utils/mediaTypeToLabel";

type Props = {
  value?: string;
  onChange: (value: string) => void;
}

export function MediaTypeSelect({ value, onChange }: Props) {
  return (
    <FormControl fullWidth>
      <InputLabel>Type</InputLabel>
      <Select
        value={value}
        label="Type"
        sx={{ textAlign: "left" }}
        onChange={({ target: { value } }) => {
          onChange(value);
        }}
      >
        <MenuItem value="movie">{mediaTypeToLabel("movie")}</MenuItem>
        <MenuItem value="tv-show">{mediaTypeToLabel("tv-show")}</MenuItem>
        <MenuItem value="game">{mediaTypeToLabel("game")}</MenuItem>
      </Select>
    </FormControl>
  );
}
