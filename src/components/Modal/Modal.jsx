import PropTypes from "prop-types";
import { Dialog } from "@mui/material";
export default function Modal({ open, onClose, children, ...rest }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" {...rest}>
      {children}
    </Dialog>
  );
}
Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};
