import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@material-ui/core";
import { ReactNode } from "react";
import styled from "styled-components";

export type SimpleDialogProps = Omit<DialogProps, "title"> & {
  title: ReactNode;
};

/**
 * A dialog with a title and a single close button that displays children as content.
 */
export const SimpleDialog = ({
  title,
  onClose = () => {},
  children,
  ...dialogProps
}: SimpleDialogProps) => {
  const manualClose = () => onClose({}, "backdropClick");
  return (
    <Dialog {...dialogProps} onClose={onClose}>
      <RelativeTitle>{title}</RelativeTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={manualClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const RelativeTitle = styled(DialogTitle)`
  position: relative;
`;
