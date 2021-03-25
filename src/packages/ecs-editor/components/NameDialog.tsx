import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

export type NameDialogProps = Pick<DialogProps, "open" | "onClose"> & {
  /**
   * The dialog title
   */
  title: string;
  /**
   * The default value of the TextField in the dialog.
   */
  defaultValue: string;
  /**
   * Called when the dialog wants to save the entered name.
   * @param newValue The value of the TextField
   */
  onSave: (newValue: string) => void;
};

/**
 * A dialog with a single TextField for entering or editing a name.
 * The TextField is reset to the defaultValue every time the dialog is opened.
 */
export const NameDialog = ({
  open,
  title,
  defaultValue,
  onClose = noop,
  onSave,
  ...dialogProps
}: NameDialogProps) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState("");

  const manualClose = () => onClose({}, "backdropClick");

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      saveAndClose();
    }
  };

  const saveAndClose = () => {
    if (!value.trim()) {
      setError("You must enter a name");
      return;
    }
    onSave(value);
    manualClose();
  };

  // Reset to default value every time dialog is opened
  useEffect(() => {
    if (open) {
      setValue(defaultValue);
    }
  }, [open, defaultValue]);

  return (
    <Dialog
      {...dialogProps}
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <TextField
          value={value}
          error={!!error}
          helperText={error}
          onChange={handleValueChange}
          onKeyUp={handleKeyUp}
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={manualClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={saveAndClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const noop = () => {};
