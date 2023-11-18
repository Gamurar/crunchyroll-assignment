import {
  TextField,
  Paper,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { media } from "../../store";
import { useEffect, useState } from "react";
import { mediaTypeToLabel } from "../../utils/mediaTypeToLabel";

export const FilterBar = () => {
  const [search, setSearch] = useState<string>("");
  const [type, setType] = useState<string>("");
  const touchedFilter = search || type;
  const resetFilter = () => {
    setSearch("");
    setType("");
  };

  useEffect(() => {
    media.fetchData({
      type: type ? [type] : undefined,
      search,
    });
  }, [search, type]);

  return (
    <Paper sx={{ p: 1 }} elevation={4}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item md={4} xs={12} sm={6}>
          <TextField
            fullWidth
            label="Search..."
            value={search}
            onChange={({ target: { value } }) => {
              setSearch(value);
            }}
          />
        </Grid>
        <Grid item md={3} xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              label="Type"
              sx={{ textAlign: "left" }}
              onChange={({ target: { value } }) => {
                setType(value);
              }}
            >
              <MenuItem value="movie">{mediaTypeToLabel("movie")}</MenuItem>
              <MenuItem value="tv-show">{mediaTypeToLabel("tv-show")}</MenuItem>
              <MenuItem value="game">{mediaTypeToLabel("game")}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid container item md={5} xs={12} sm={12} justifyContent="end">
          <Button disabled={!touchedFilter} onClick={resetFilter}>
            Clear filter
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
