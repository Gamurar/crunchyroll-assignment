import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { MediaEntry } from "../../types/MediaItem";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { media } from "../../store";
import { useEffect } from "react";
import { Form } from "./Form";

type Props = {
  handleClose: () => void;
  open: boolean;
  mediaEntryToEdit?: MediaEntry;
};

export type MediaItemInputs = Omit<MediaEntry, "id, releaseYear"> & {
  releaseYear: Dayjs;
};

export function MediaForm({ handleClose, open, mediaEntryToEdit }: Props) {
  const defaultValues = {
    title: "",
    type: "movie",
    genre: "Action",
    rating: 7,
  };

  const { handleSubmit, control, reset } = useForm<MediaItemInputs>({
    defaultValues: mediaEntryToEdit || defaultValues,
  });

  function onSubmit(data: MediaItemInputs) {
    const formData = {
      ...data,
      releaseYear: data.releaseYear.year(),
    };

    if (mediaEntryToEdit) {
      media.update({ id: mediaEntryToEdit.id, data: formData });
    } else {
      media.create(formData);
    }

    onClose();
  }

  useEffect(() => {
    if (!mediaEntryToEdit) return;
    const date = "01-01-" + mediaEntryToEdit?.releaseYear;
    reset({
      ...mediaEntryToEdit,
      releaseYear: dayjs(date, "MM-DD-YYYY"),
    });
  }, [mediaEntryToEdit, reset]);

  function onClose() {
    reset(defaultValues);
    handleClose();
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog onClose={onClose} open={open} fullWidth>
        <DialogTitle>
          {mediaEntryToEdit ? "Edit media" : "Add new media"}
        </DialogTitle>
        <DialogContent>
         <Form control={control} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
