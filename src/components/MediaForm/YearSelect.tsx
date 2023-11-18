import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type Props = {
  label: string;
  error: boolean;
  value: number | null;
  onChange: (value?: number) => void;
}

export function YearSelect({ value, error, label, onChange }: Props) {
  return (
    <DatePicker
      disableFuture
      disableHighlightToday
      views={["year"]}
      value={dayjs().set("year", value || 2020)}
      sx={{ width: "100%" }}
      label={label}
      slotProps={{ textField: { error } }}
      onChange={(date) => onChange(date?.year())}
    />
  );
}
