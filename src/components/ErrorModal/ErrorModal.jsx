import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const ErrorModal = ({ message, onClose, open }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
