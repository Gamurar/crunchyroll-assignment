import { TextField, Paper, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { media } from "../../store";
import { useEffect, useState } from "react";
import { MediaTypeSelect } from "../MediaTypeSelect/MediaTypeSelect";

export function FilterBar() {
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
          <MediaTypeSelect value={type} onChange={setType} />
        </Grid>
        <Grid container item md={5} xs={12} sm={12} justifyContent="end">
          <Button disabled={!touchedFilter} onClick={resetFilter}>
            Clear filter
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
