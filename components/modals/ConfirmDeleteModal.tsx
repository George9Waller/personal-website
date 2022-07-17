import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  open: boolean;
  itemDescription: string;
  onClose: () => void;
  onDelete: () => void;
}

export const ConfirmDeleteModal = ({
  open,
  itemDescription,
  onClose,
  onDelete,
}: Props) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <DialogTitle id="modal-title">Delete project</DialogTitle>
    <DialogContent>
      <DialogContentText id="modal-description">
        Are you sure you want to delete {itemDescription} This action cannot be
        undone
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <button className="btn btn-success modal-action" onClick={onClose}>
        Close
      </button>
      <button className="btn btn-error modal-action" onClick={onDelete}>
        Delete
      </button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDeleteModal;
