import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { MediaEntry } from "../../types/MediaItem";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { media } from "../../store";
import { useEffect } from "react";
import { Form } from "./Form";
import { observer } from "mobx-react-lite";

type Props = {
  handleClose: () => void;
  open: boolean;
};

export type MediaItemInputs = Omit<MediaEntry, "id">

export const MediaForm = observer(({ handleClose, open }: Props) => {
  const editMediaId = media.editMediaId;
  const editMediaEntry = media.data.find((item) => item.id === editMediaId);

  const defaultValues: MediaItemInputs = {
    title: "",
    type: "movie",
    genre: "Action",
    rating: 7,
    releaseYear: 2020
  };

  const { handleSubmit, control, reset } = useForm<MediaItemInputs>({
    defaultValues: editMediaEntry || defaultValues,
  });

  function onSubmit(data: MediaItemInputs) {
    if (editMediaId) {
      media.update({ id: editMediaId, data });
    } else {
      media.create(data);
    }

    onClose();
  }

  useEffect(() => {
    if (!editMediaEntry) return;
    reset(editMediaEntry);
  }, [editMediaEntry, reset]);

  function onClose() {
    reset(defaultValues);
    handleClose();
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog onClose={onClose} open={open} fullWidth>
        <DialogTitle>
          {editMediaEntry ? "Edit media" : "Add new media"}
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
});
